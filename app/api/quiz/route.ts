import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';

// Quiz response schema
const QuizResponseSchema = z.object({
  city: z.string().min(1, 'Градът е задължителен'),
  weapon: z.string().min(1, 'Оръжието е задължително'),
  motivation: z.string().min(10, 'Мотивацията трябва да е поне 10 символа'),
  email: z.string().email('Невалиден email адрес'),
});

// In-memory storage for now (in production use database)
let quizResponses: Array<{
  id: number;
  city: string;
  weapon: string;
  motivation: string;
  email: string;
  timestamp: string;
  userAgent: string | null;
}> = [];

let nextId = 1;

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    // Validate the request body
    const validatedData = QuizResponseSchema.parse(body);
    
    // Create new response
    const newResponse = {
      id: nextId++,
      ...validatedData,
      timestamp: new Date().toISOString(),
      userAgent: request.headers.get('user-agent'),
    };
    
    // Store the response
    quizResponses.push(newResponse);
    
    return NextResponse.json({ 
      success: true, 
      message: 'Благодарим ви за отговорите!',
      id: newResponse.id 
    });
    
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { 
          success: false, 
          message: 'Невалидни данни', 
          errors: error.errors 
        },
        { status: 400 }
      );
    }
    
    return NextResponse.json(
      { 
        success: false, 
        message: 'Възникна грешка при записването' 
      },
      { status: 500 }
    );
  }
}

export async function GET() {
  return NextResponse.json({
    success: true,
    data: quizResponses,
    total: quizResponses.length
  });
}