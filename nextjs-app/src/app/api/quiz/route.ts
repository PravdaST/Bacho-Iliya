import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { insertQuizResponseSchema } from "@/shared/schema";
import { neon } from '@neondatabase/serverless';
import { drizzle } from 'drizzle-orm/neon-http';
import { quizResponses } from '@/shared/schema';

// Use HTTP connection for better compatibility with serverless
const sql = neon(process.env.DATABASE_URL!);
const db = drizzle(sql, { schema: { quizResponses } });

// Email sending function
async function sendThankYouEmail(email: string, city: string) {
  const nodemailer = require('nodemailer');

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

        <hr style="border: none; height: 1px; background-color: #D2691E; margin: 20px 0;">

        <p style="color: #8B7355; font-size: 12px; text-align: center; margin: 0;">
          Направено с любов в България 🇧🇬 | Създадено с вярата в истинското
        </p>
      </div>
    `
  };

  return transporter.sendMail(mailOptions);
}


export async function POST(request: NextRequest) {
  try {
    console.log('Quiz API called');

    const body = await request.json();
    console.log('Request body:', body);

    const validatedData = insertQuizResponseSchema.parse(body);
    console.log('Validation successful:', validatedData);

    // Check if DATABASE_URL is available
    if (!process.env.DATABASE_URL) {
      console.error('DATABASE_URL not found');
      return NextResponse.json(
        { 
          success: false, 
          message: "Database configuration error" 
        },
        { status: 500 }
      );
    }

    // Save to PostgreSQL database using HTTP connection
    const [response] = await db
      .insert(quizResponses)
      .values({
        ...validatedData,
        userAgent: request.headers.get('user-agent') || null
      })
      .returning();

    console.log('Database insert successful:', response);

    // Send thank you email
    try {
      if (validatedData.email && validatedData.city) {
        await sendThankYouEmail(validatedData.email, validatedData.city);
        console.log('Thank you email sent successfully');
      } else {
        console.warn('Email or city missing, skipping thank you email');
      }
    } catch (emailError) {
      console.error('Error sending thank you email:', emailError);
      // Optionally, don't fail the whole request if email fails,
      // or add a flag to the response to indicate email sending failure
    }

    return NextResponse.json({ success: true, data: response });
  } catch (error) {
    console.error('API Error:', error);
    console.error('Error stack:', error instanceof Error ? error.stack : 'No stack trace');

    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { 
          success: false, 
          message: "Invalid form data", 
          errors: error.errors 
        },
        { status: 400 }
      );
    }

    return NextResponse.json(
      { 
        success: false, 
        message: "Internal server error",
        error: error instanceof Error ? error.message : String(error)
      },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    const responses = await db.select().from(quizResponses);
    return NextResponse.json({ success: true, data: responses });
  } catch (error) {
    console.error('Database error:', error);
    return NextResponse.json(
      { 
        success: false, 
        message: "Internal server error" 
      },
      { status: 500 }
    );
  }
}