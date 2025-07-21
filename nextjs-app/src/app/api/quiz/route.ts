
import { NextRequest, NextResponse } from 'next/server';
import { Resend } from 'resend';
import { z } from 'zod';
import { db } from '@/lib/db';
import { quizResponses } from '@/shared/schema';

// Initialize Resend only when needed
let resend: Resend | null = null;

function getResendInstance() {
  if (!resend && process.env.RESEND_API_KEY) {
    resend = new Resend(process.env.RESEND_API_KEY);
  }
  return resend;
}

const quizSchema = z.object({
  city: z.string().min(1, "Градът е задължителен"),
  weapon: z.string().min(1, "Избери оръжие"),
  motivation: z.string().min(1, "Мотивацията е задължителна"),
  email: z.string().email("Невалиден имейл адрес")
});

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    // Validate input
    const validatedData = quizSchema.parse(body);
    
    console.log('Quiz API called. Request body:', validatedData);

    // Save to database
    try {
      const dbResult = await db.insert(quizResponses).values({
        city: validatedData.city,
        weapon: validatedData.weapon,
        motivation: validatedData.motivation,
        email: validatedData.email,
        userAgent: request.headers.get('user-agent') || null,
      }).returning();
      
      console.log('Data saved to database:', dbResult[0]);
    } catch (dbError) {
      console.error('Failed to save to database:', dbError);
      return NextResponse.json({
        success: false,
        error: 'Грешка при записване в базата данни'
      }, { status: 500 });
    }

    // Send welcome email using Resend
    try {
      const resendInstance = getResendInstance();
      if (!resendInstance) {
        console.log('Resend not configured, skipping email');
        throw new Error('Resend API key not configured');
      }
      
      const emailResult = await resendInstance.emails.send({
        from: 'Бачо Илия <onboarding@resend.dev>', // Use Resend's default sender
        to: [validatedData.email],
        subject: 'Благодарим ти за присъединяването към движението!',
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
            <div style="text-align: center; margin-bottom: 30px;">
              <h1 style="color: #E22526; font-size: 28px;">🇧🇬 Добре дошъл в движението! 🇧🇬</h1>
            </div>
            
            <div style="background: linear-gradient(135deg, #E22526, #ff4757); color: white; padding: 20px; border-radius: 10px; margin-bottom: 20px;">
              <h2 style="margin: 0; font-size: 22px;">Благодарим ти, ${validatedData.email}!</h2>
              <p style="margin: 10px 0 0 0; font-size: 16px;">Присъедини се към нас от ${validatedData.city} с твоето ${validatedData.weapon}!</p>
            </div>
            
            <div style="background-color: #f8f9fa; padding: 20px; border-radius: 8px; margin-bottom: 20px;">
              <h3 style="color: #E22526; margin-top: 0;">Твоята мотивация:</h3>
              <p style="font-style: italic; color: #555; font-size: 16px;">"${validatedData.motivation}"</p>
            </div>
            
            <div style="text-align: center; margin: 30px 0;">
              <p style="font-size: 18px; color: #333; margin-bottom: 15px;">🥛 Заедно за традиционните български млечни продукти! 🧀</p>
              <div style="background-color: #28a745; color: white; padding: 15px; border-radius: 8px; display: inline-block;">
                <strong>Движението продължава!</strong>
              </div>
            </div>
            
            <div style="text-align: center; margin-top: 30px; padding-top: 20px; border-top: 2px solid #E22526;">
              <p style="color: #777; font-size: 14px;">
                С уважение,<br>
                <strong style="color: #E22526;">Екипът на Бачо Илия</strong>
              </p>
            </div>
          </div>
        `
      });

      console.log('Email sent successfully via Resend:', emailResult);

    } catch (emailError) {
      console.error('Failed to send email via Resend:', emailError);
      // Continue execution even if email fails
    }

    // Return success response
    return NextResponse.json({
      success: true,
      message: 'Успешно се присъедини към движението!',
      data: validatedData
    });

  } catch (error) {
    console.error('Quiz API error:', error);
    
    if (error instanceof z.ZodError) {
      return NextResponse.json({
        success: false,
        error: 'Валидационна грешка',
        details: error.errors
      }, { status: 400 });
    }
    
    return NextResponse.json({
      success: false,
      error: 'Вътрешна грешка на сървъра'
    }, { status: 500 });
  }
}
