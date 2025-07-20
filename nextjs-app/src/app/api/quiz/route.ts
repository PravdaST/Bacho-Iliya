import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { insertQuizResponseSchema } from "../../../shared/schema";

// Mock storage for now - in production you'd use a database
let quizResponses: any[] = [];

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const validatedData = insertQuizResponseSchema.parse(body);
    
    // Add to mock storage
    const response = {
      id: quizResponses.length + 1,
      ...validatedData,
      submittedAt: new Date(),
      userAgent: request.headers.get('user-agent') || null
    };
    
    quizResponses.push(response);
    
    return NextResponse.json({ success: true, data: response });
  } catch (error) {
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
  return NextResponse.json({ success: true, data: quizResponses });
}