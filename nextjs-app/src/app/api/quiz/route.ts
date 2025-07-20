
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { insertQuizResponseSchema } from "../../../shared/schema";
import { Pool, neonConfig } from '@neondatabase/serverless';
import { drizzle } from 'drizzle-orm/neon-serverless';
import { quizResponses } from '../../../shared/schema';
import ws from "ws";

neonConfig.webSocketConstructor = ws;

// Initialize database connection for Next.js
const pool = new Pool({ connectionString: process.env.DATABASE_URL });
const db = drizzle({ client: pool, schema: { quizResponses } });

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const validatedData = insertQuizResponseSchema.parse(body);
    
    // Save to PostgreSQL database
    const [response] = await db
      .insert(quizResponses)
      .values({
        ...validatedData,
        userAgent: request.headers.get('user-agent') || null
      })
      .returning();
    
    return NextResponse.json({ success: true, data: response });
  } catch (error) {
    console.error('Database error:', error);
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
        message: "Internal server error" 
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
