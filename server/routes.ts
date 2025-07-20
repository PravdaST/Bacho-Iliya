import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertQuizResponseSchema } from "@shared/schema";
import { z } from "zod";

export async function registerRoutes(app: Express): Promise<Server> {
  // Submit quiz response
  app.post("/api/quiz", async (req, res) => {
    try {
      const validatedData = insertQuizResponseSchema.parse(req.body);
      const response = await storage.createQuizResponse(validatedData);
      res.json({ success: true, data: response });
    } catch (error) {
      if (error instanceof z.ZodError) {
        res.status(400).json({ 
          success: false, 
          message: "Invalid form data", 
          errors: error.errors 
        });
      } else {
        res.status(500).json({ 
          success: false, 
          message: "Internal server error" 
        });
      }
    }
  });

  // Get all quiz responses (admin endpoint)
  app.get("/api/quiz/responses", async (req, res) => {
    try {
      const responses = await storage.getAllQuizResponses();
      res.json({ success: true, data: responses });
    } catch (error) {
      res.status(500).json({ 
        success: false, 
        message: "Internal server error" 
      });
    }
  });

  // Get quiz responses by city
  app.get("/api/quiz/responses/:city", async (req, res) => {
    try {
      const { city } = req.params;
      const responses = await storage.getQuizResponsesByCity(city);
      res.json({ success: true, data: responses });
    } catch (error) {
      res.status(500).json({ 
        success: false, 
        message: "Internal server error" 
      });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
