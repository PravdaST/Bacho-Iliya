
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { insertQuizResponseSchema } from "@/shared/schema";
import { Pool, neonConfig } from '@neondatabase/serverless';
import { drizzle } from 'drizzle-orm/neon-serverless';
import { quizResponses } from '@/shared/schema';

// Configure WebSocket for Neon in serverless environment
if (typeof window === 'undefined') {
  const ws = require('ws');
  neonConfig.webSocketConstructor = ws;
}

// Initialize database connection for Next.js
const pool = new Pool({ connectionString: process.env.DATABASE_URL });
const db = drizzle({ client: pool, schema: { quizResponses } });

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
    
    // Save to PostgreSQL database
    const [response] = await db
      .insert(quizResponses)
      .values({
        ...validatedData,
        userAgent: request.headers.get('user-agent') || null
      })
      .returning();
    
    console.log('Database insert successful:', response);
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
