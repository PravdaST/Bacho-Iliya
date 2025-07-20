import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/db'
import { quizResponses } from '@/shared/schema'
import { eq } from 'drizzle-orm'

export async function GET(
  request: NextRequest,
  { params }: { params: { city: string } }
) {
  try {
    const { city } = params
    const responses = await db
      .select()
      .from(quizResponses)
      .where(eq(quizResponses.city, city))
    
    return NextResponse.json({ success: true, data: responses })
  } catch (error) {
    console.error('Error fetching quiz responses by city:', error)
    return NextResponse.json({ 
      success: false, 
      message: "Internal server error" 
    }, { status: 500 })
  }
}