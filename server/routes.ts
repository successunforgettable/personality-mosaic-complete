import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertAssessmentResultSchema } from "@shared/schema";
import { ZodError } from "zod";

export async function registerRoutes(app: Express): Promise<Server> {
  // Save assessment results
  app.post("/api/assessment/results", async (req, res) => {
    try {
      // Validate the request body
      const validatedData = insertAssessmentResultSchema.parse(req.body);
      
      // Save the assessment result
      const result = await storage.createAssessmentResult(validatedData);
      
      res.status(201).json(result);
    } catch (error) {
      if (error instanceof ZodError) {
        res.status(400).json({ message: "Invalid assessment data", errors: error.errors });
      } else {
        res.status(500).json({ message: "Failed to save assessment result" });
      }
    }
  });

  // Get assessment results for a user
  app.get("/api/users/:userId/assessment/results", async (req, res) => {
    try {
      const userId = parseInt(req.params.userId);
      
      if (isNaN(userId)) {
        return res.status(400).json({ message: "Invalid user ID" });
      }
      
      const results = await storage.getAssessmentResultsByUserId(userId);
      
      res.json(results);
    } catch (error) {
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
      
      res.json(result);
    } catch (error) {
      res.status(500).json({ message: "Failed to retrieve assessment result" });
    }
  });

  const httpServer = createServer(app);

  return httpServer;
}
