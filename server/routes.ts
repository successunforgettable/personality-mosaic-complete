import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertAssessmentResultSchema } from "@shared/schema";
import { ZodError } from "zod";

import { setupAuth, isAuthenticated } from "./replitAuth";

export async function registerRoutes(app: Express): Promise<Server> {
  // Setup Replit Authentication
  await setupAuth(app);
  
  // Save state distribution
  app.post("/api/assessment/state-distribution", isAuthenticated, async (req: any, res) => {
    try {
      // Get the authenticated user ID from the session
      const userId = req.user.claims.sub;
      const { stateDistribution } = req.body;
      
      if (!stateDistribution) {
        return res.status(400).json({ message: "Missing required fields: stateDistribution" });
      }
      
      // Ensure we have the required state distribution properties (5-state system)
      if (typeof stateDistribution.veryGood !== 'number' || 
          typeof stateDistribution.good !== 'number' || 
          typeof stateDistribution.average !== 'number' ||
          typeof stateDistribution.belowAverage !== 'number' ||
          typeof stateDistribution.destructive !== 'number') {
        return res.status(400).json({ message: "Invalid state distribution format" });
      }
      
      // Calculate total to ensure it's 100%
      const total = stateDistribution.veryGood + 
                    stateDistribution.good + 
                    stateDistribution.average + 
                    stateDistribution.belowAverage + 
                    stateDistribution.destructive;
                    
      if (Math.abs(total - 100) > 0.01) { // Allow small rounding errors
        return res.status(400).json({ message: "State distribution must sum to 100%" });
      }
      
      // Save as temporary assessment result with minimal data
      const tempResult = await storage.createAssessmentResult({
        userId,
        personalityType: "pending", // Will be updated after full assessment
        influence: "pending", // Will be updated after full assessment
        stateDistribution,
        subtypeDistribution: { selfPreservation: 0, oneToOne: 0, social: 0 } // Placeholder
      });
      
      res.status(201).json({ success: true, stateDistributionId: tempResult.id });
    } catch (error) {
      console.error("Error saving state distribution:", error);
      res.status(500).json({ message: "Failed to save state distribution" });
    }
  });
  
  // Allow saving assessment results for both authenticated and guest users
  app.post("/api/assessment/results", async (req, res) => {
    try {
      // For guest users, userId is provided in the request
      // For authenticated users, userId comes from the session if available
      let userId = req.body.userId;
      
      if (req.isAuthenticated() && req.user) {
        const user = req.user as any;
        userId = user.claims.sub;
      }
      
      if (!userId) {
        return res.status(400).json({ message: "User ID is required" });
      }
      
      // Validate the request body
      const validatedData = insertAssessmentResultSchema.parse({
        ...req.body,
        userId
      });
      
      // Save the assessment result
      const result = await storage.createAssessmentResult(validatedData);
      
      res.status(201).json(result);
    } catch (error) {
      if (error instanceof ZodError) {
        res.status(400).json({ message: "Invalid assessment data", errors: error.errors });
      } else {
        console.error("Error creating assessment result:", error);
        res.status(500).json({ message: "Failed to save assessment result" });
      }
    }
  });

  // Get assessment results for the current authenticated user
  app.get("/api/my/assessment/results", isAuthenticated, async (req: any, res) => {
    try {
      const userId = req.user.claims.sub;
      
      if (!userId) {
        return res.status(400).json({ message: "Invalid user ID" });
      }
      
      const results = await storage.getAssessmentResultsByUserId(userId);
      
      res.json(results);
    } catch (error) {
      console.error("Error fetching assessment results:", error);
      res.status(500).json({ message: "Failed to retrieve assessment results" });
    }
  });

  // Get a specific assessment result
  app.get("/api/assessment/results/:id", async (req, res) => {
    try {
      const resultId = parseInt(req.params.id);
      
      if (isNaN(resultId)) {
        return res.status(400).json({ message: "Invalid result ID" });
      }
      
      const result = await storage.getAssessmentResult(resultId);
      
      if (!result) {
        return res.status(404).json({ message: "Assessment result not found" });
      }
      
      // If user is authenticated, check if this result belongs to them
      if (req.isAuthenticated() && req.user) {
        const user = req.user as any;
        if (result.userId !== user.claims.sub) {
          return res.status(403).json({ message: "Unauthorized access to assessment result" });
        }
      }
      
      res.json(result);
    } catch (error) {
      console.error("Error fetching assessment result:", error);
      res.status(500).json({ message: "Failed to retrieve assessment result" });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
