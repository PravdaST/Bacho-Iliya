import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertQuizResponseSchema } from "@shared/schema";
import { z } from "zod";
import * as nodemailer from "nodemailer";

// Email sending function
async function sendThankYouEmail(email: string, city: string) {
  console.log(`Attempting to send email to: ${email} from city: ${city}`);
  console.log(`EMAIL_USER: ${process.env.EMAIL_USER ? 'Set' : 'Not set'}`);
  console.log(`EMAIL_PASS: ${process.env.EMAIL_PASS ? 'Set' : 'Not set'}`);
  
  const transporter = nodemailer.createTransport({
    host: 'server6.aleana-wa.eu',
    port: 587, // STARTTLS port
    secure: false, // true for 465, false for other ports
    auth: {
      user: process.env.EMAIL_USER, // contact@bacho-iliya.eu
      pass: process.env.EMAIL_PASS
    },
    tls: {
      rejectUnauthorized: false,
      ciphers: 'SSLv3'
    }
  });
  
  console.log('Transporter created, testing connection...');
  
  try {
    await transporter.verify();
    console.log('SMTP connection verified successfully');
  } catch (verifyError) {
    console.error('SMTP connection verification failed:', verifyError);
    throw new Error(`SMTP verification failed: ${verifyError.message}`);
  }

  const mailOptions = {
    from: '"Бачо Илия" <contact@bacho-iliya.eu>',
    to: email,
    subject: 'Благодарим ти за присъединяването към движението!',
    html: `
      <div style="font-family: 'Georgia', serif; max-width: 600px; margin: 0 auto; background-color: #f9f7f4; padding: 30px; border-radius: 10px;">
        <div style="text-align: center; margin-bottom: 30px;">
          <h1 style="color: #8B4513; font-size: 28px; margin: 0;">Бачо Илия</h1>
          <p style="color: #D2691E; font-style: italic; margin: 5px 0;">Истинският български вкус</p>
        </div>

        <h2 style="color: #8B4513; text-align: center;">Добре дошъл в движението за истинския вкус!</h2>

        <p style="color: #5D4037; font-size: 16px; line-height: 1.6;">Здравей от <strong>${city}</strong>,</p>

        <p style="color: #5D4037; font-size: 16px; line-height: 1.6;">
          Благодарим ти, че се присъедини към нашето движение за защита на истинския български вкус! 
          Твоят глас е важен в борбата за качествени храни, произведени с любов и традиция.
        </p>

        <div style="background-color: #fff; padding: 20px; border-radius: 8px; margin: 20px 0; border-left: 4px solid #D2691E;">
          <p style="color: #5D4037; margin: 0; font-style: italic;">
            "Качеството не е случайност - то е резултат от високи намерения, искрени усилия, 
            интелигентна посока и умело изпълнение."
          </p>
        </div>

        <p style="color: #5D4037; font-size: 16px; line-height: 1.6;">
          Скоро ще получиш повече информация за нашите продукти и как можеш да участваш в революцията на вкуса.
        </p>

        <div style="text-align: center; margin: 30px 0;">
          <p style="color: #8B4513; font-weight: bold; margin: 0;">С уважение и вяра в истинското,</p>
          <p style="color: #D2691E; font-size: 18px; margin: 5px 0;">Екипът на Бачо Илия</p>
        </div>

        <div style="text-align: center; margin-top: 30px; padding-top: 20px; border-top: 1px solid #D2691E;">
          <p style="color: #8B4513; font-size: 14px; margin: 0;">
            Този имейл е изпратен защото се записахте за движението на Бачо Илия.
          </p>
        </div>
      </div>
    `
  };

  console.log('Sending email with options:', {
    from: mailOptions.from,
    to: mailOptions.to,
    subject: mailOptions.subject,
    htmlLength: mailOptions.html.length
  });
  
  try {
    const result = await transporter.sendMail(mailOptions);
    console.log('Email sent successfully:', {
      messageId: result.messageId,
      response: result.response,
      accepted: result.accepted,
      rejected: result.rejected
    });
    return result;
  } catch (sendError) {
    console.error('Failed to send email:', sendError);
    throw new Error(`Email sending failed: ${sendError.message}`);
  }
}

export async function registerRoutes(app: Express): Promise<Server> {
  // Submit quiz response
  app.post("/api/quiz", async (req, res) => {
    try {
      const validatedData = insertQuizResponseSchema.parse(req.body);
      const response = await storage.createQuizResponse(validatedData);
      
      // Send thank you email
      try {
        await sendThankYouEmail(validatedData.email, validatedData.city);
        console.log(`Thank you email sent to: ${validatedData.email}`);
      } catch (emailError) {
        console.error('Failed to send email:', emailError);
        // Continue even if email fails - don't fail the entire request
      }
      
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

  // Test email endpoint for debugging
  app.post("/api/test-email", async (req, res) => {
    try {
      const { email, city } = req.body;
      if (!email || !city) {
        return res.status(400).json({ 
          success: false, 
          message: "Email and city are required" 
        });
      }
      
      console.log(`Testing email send to: ${email} from city: ${city}`);
      await sendThankYouEmail(email, city);
      
      res.json({ 
        success: true, 
        message: "Test email sent successfully",
        recipient: email,
        city: city
      });
    } catch (error) {
      console.error('Test email failed:', error);
      res.status(500).json({ 
        success: false, 
        message: "Test email failed",
        error: error instanceof Error ? error.message : 'Unknown error'
      });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
