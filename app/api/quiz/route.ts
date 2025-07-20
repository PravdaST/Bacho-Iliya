import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'
import { insertQuizResponseSchema } from '@/shared/schema'
import { db } from '@/lib/db'
import { quizResponses } from '@/shared/schema'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const validatedData = insertQuizResponseSchema.parse(body)
    
    const [response] = await db
      .insert(quizResponses)
      .values({
        ...validatedData,
        userAgent: validatedData.userAgent || null
      })
      .returning()
    
    return NextResponse.json({ success: true, data: response })
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ 
        success: false, 
        message: "Invalid form data", 
        errors: error.errors 
      }, { status: 400 })
    } else {
      console.error('Quiz submission error:', error)
      return NextResponse.json({ 
        success: false, 
        message: "Internal server error" 
      }, { status: 500 })
    }
  }
}