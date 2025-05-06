import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { z } from "zod";

// Define contact form schema
const contactFormSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email address"),
  subject: z.string().min(3, "Subject must be at least 3 characters"),
  message: z.string().min(10, "Message must be at least 10 characters"),
});

export async function registerRoutes(app: Express): Promise<Server> {
  // Contact form submission
  app.post("/api/contact", async (req, res) => {
    try {
      // Validate the request body
      const validatedData = contactFormSchema.parse(req.body);
      
      // In a real app, this would save to a database or send an email
      // For demo purposes, we'll just return a success response
      
      console.log("Contact form submission:", validatedData);
      
      res.status(200).json({
        success: true,
        message: "Message received successfully",
      });
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({
          success: false,
          message: "Validation error",
          errors: error.errors,
        });
      }
      
      console.error("Error processing contact form:", error);
      
      res.status(500).json({
        success: false,
        message: "Failed to process your message",
      });
    }
  });

  const httpServer = createServer(app);

  return httpServer;
}
