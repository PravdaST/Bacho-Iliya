import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/db'
import { quizResponses } from '@/shared/schema'

export async function GET(request: NextRequest) {
  try {
    const responses = await db.select().from(quizResponses)
    return NextResponse.json({ success: true, data: responses })
  } catch (error) {
    console.error('Error fetching quiz responses:', error)
    return NextResponse.json({ 
      success: false, 
      message: "Internal server error" 
    }, { status: 500 })
  }
}