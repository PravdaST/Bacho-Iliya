import { NextRequest, NextResponse } from 'next/server';
import { db, isDatabaseAvailable } from '@/lib/db';
import { quizResponses, insertQuizResponseSchema } from '@/lib/schema';
import { sendQuizCompletionEmail } from '@/lib/email';
import { z } from 'zod';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    console.log('📊 Quiz API called. Request body:', body);

    // Validate input data
    const validatedData = insertQuizResponseSchema.parse({
      city: body.city,
      weapon: body.weapon,
      motivation: body.motivation,
      email: body.email,
      userAgent: request.headers.get('user-agent') || undefined,
      ipAddress: request.headers.get('x-forwarded-for') || request.headers.get('x-real-ip') || undefined,
    });

    // Save to database (if available)
    if (isDatabaseAvailable() && db) {
      try {
        const dbResult = await db.insert(quizResponses).values({
          city: validatedData.city,
          weapon: validatedData.weapon,
          motivation: validatedData.motivation,
          email: validatedData.email,
          userAgent: validatedData.userAgent || null,
          ipAddress: validatedData.ipAddress || null,
        }).returning();

        console.log('✅ Quiz data saved to database:', dbResult[0]);
      } catch (dbError) {
        console.error('❌ Failed to save quiz to database:', dbError);
        return NextResponse.json({
          success: false,
          error: 'Грешка при записване в базата данни'
        }, { status: 500 });
      }
    } else {
      console.warn('⚠️ Database not available. Quiz response not persisted.');
    }

    // Send completion email (if Resend is configured)
    try {
      const emailResult = await sendQuizCompletionEmail({
        email: validatedData.email,
        city: validatedData.city,
        weapon: validatedData.weapon,
        motivation: validatedData.motivation,
      });

      if (emailResult.success) {
        console.log('✅ Quiz completion email sent successfully');
      } else {
        console.warn('⚠️ Quiz email not sent:', emailResult.error);
      }
    } catch (emailError) {
      console.error('❌ Failed to send quiz email:', emailError);
      // Continue execution even if email fails
    }

    // Return success response
    return NextResponse.json({
      success: true,
      message: 'Успешно се присъедини към движението!',
      data: {
        city: validatedData.city,
        email: validatedData.email,
      }
    });

  } catch (error) {
    console.error('❌ Quiz API error:', error);

    if (error instanceof z.ZodError) {
      return NextResponse.json({
        success: false,
        error: 'Невалидни данни',
        details: error.issues
      }, { status: 400 });
    }

    return NextResponse.json({
      success: false,
      error: 'Вътрешна грешка на сървъра'
    }, { status: 500 });
  }
}

// GET endpoint to check if API is working
export async function GET() {
  return NextResponse.json({
    status: 'OK',
    message: 'Quiz API is running',
    database: isDatabaseAvailable() ? 'Connected' : 'Not configured',
    timestamp: new Date().toISOString(),
  });
}
