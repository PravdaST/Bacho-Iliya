
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { insertQuizResponseSchema } from "@/shared/schema";
import { neon } from '@neondatabase/serverless';
import { drizzle } from 'drizzle-orm/neon-http';
import { quizResponses } from '@/shared/schema';

// Use HTTP connection for better compatibility with serverless
const sql = neon(process.env.DATABASE_URL!);
const db = drizzle(sql, { schema: { quizResponses } });

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
