import express, { type Request, Response, NextFunction } from "express";
import { registerRoutes } from "./routes";
import { setupVite, serveStatic, log } from "./vite";
import "dotenv/config"; // Load environment variables
import cookieParser from "cookie-parser";
import helmet from "helmet";

// Configure Replit domains for auth
if (!process.env.REPL_ID) {
  process.env.REPL_ID = "personality-mosaic";
}

if (!process.env.REPLIT_DOMAINS) {
  const hostname = process.env.REPL_SLUG ? 
    `${process.env.REPL_SLUG}.${process.env.REPL_OWNER}.repl.co` : 
    "localhost:5000";
  process.env.REPLIT_DOMAINS = hostname;
}

// Session secret for cookies
if (!process.env.SESSION_SECRET) {
  process.env.SESSION_SECRET = "personality-mosaic-secret-key-change-in-production";
}

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser(process.env.SESSION_SECRET));

// Apply Helmet for security headers (covers HTTPS enforcement and other security headers)
app.use(helmet({
  contentSecurityPolicy: {
    directives: {
      defaultSrc: ["'self'"],
      scriptSrc: ["'self'", "'unsafe-inline'", "'unsafe-eval'"], // For development
      styleSrc: ["'self'", "'unsafe-inline'"],
      imgSrc: ["'self'", "data:", "blob:"],
      connectSrc: ["'self'", "wss:", "ws:"] // For WebSocket connections
    }
  },
  hsts: {
    maxAge: 15552000, // 180 days in seconds
    includeSubDomains: true,
    preload: true
  },
  xssFilter: true,
  noSniff: true,
  referrerPolicy: { policy: 'strict-origin-when-cross-origin' }
}));

// CSRF protection temporarily disabled for development
// In a production environment, proper CSRF protection should be implemented

// Simple token endpoint for client authentication 
app.get('/api/csrf-token', (req, res) => {
  res.json({ csrfToken: 'token-disabled-for-development' });
});

// Comprehensive security and request logging middleware
app.use((req, res, next) => {
  const start = Date.now();
  const path = req.path;
  const requestId = Math.random().toString(36).substring(2, 15);
  
  // Add request ID to response headers for tracking
  res.setHeader('X-Request-ID', requestId);
  
  let capturedJsonResponse: Record<string, any> | undefined = undefined;

  const originalResJson = res.json;
  res.json = function (bodyJson, ...args) {
    capturedJsonResponse = bodyJson;
    return originalResJson.apply(res, [bodyJson, ...args]);
  };

  // Create security context for logging
  const securityContext = {
    requestId,
    ip: req.ip,
    method: req.method,
    path: req.path,
    userAgent: req.headers['user-agent'],
    timestamp: new Date().toISOString()
  };

  // Log security events
  if (path.startsWith("/api/auth")) {
    log(`[SECURITY:AUTH] ${JSON.stringify(securityContext)}`, "security");
  }

  res.on("finish", () => {
    const duration = Date.now() - start;
    if (path.startsWith("/api")) {
      let logLevel = "info";
      if (res.statusCode >= 400) logLevel = "warn";
      if (res.statusCode >= 500) logLevel = "error";
      
      let logLine = `${req.method} ${path} ${res.statusCode} in ${duration}ms`;
      
      // Don't log sensitive data like passwords or tokens
      const sensitiveFields = ['password', 'token', 'secret', 'key'];
      let safeResponseData = capturedJsonResponse;
      
      if (safeResponseData) {
        // Redact sensitive fields
        Object.keys(safeResponseData).forEach(key => {
          if (sensitiveFields.some(field => key.toLowerCase().includes(field))) {
            safeResponseData[key] = '[REDACTED]';
          }
        });
        
        logLine += ` :: ${JSON.stringify(safeResponseData)}`;
      }

      if (logLine.length > 80) {
        logLine = logLine.slice(0, 79) + "…";
      }

      log(logLine, logLevel);
    }
  });

  next();
});

(async () => {
  try {
    // Register all routes (includes auth setup)
    const server = await registerRoutes(app);

    // Global error handler
    app.use((err: any, _req: Request, res: Response, _next: NextFunction) => {
      const status = err.status || err.statusCode || 500;
      const message = err.message || "Internal Server Error";
      
      log(`Error: ${message}`, "error");
      
      res.status(status).json({ message });
    });

    // Set up Vite or static file serving
    if (app.get("env") === "development") {
      await setupVite(app, server);
    } else {
      serveStatic(app);
    }

    // Start the server
    const port = 5000;
    server.listen({
      port,
      host: "0.0.0.0",
      reusePort: true,
    }, () => {
      log(`Server running at http://localhost:${port}`);
      log(`Authentication will use domain: ${process.env.REPLIT_DOMAINS}`);
    });
  } catch (error) {
    console.error("Failed to start server:", error);
    process.exit(1);
  }
})();
