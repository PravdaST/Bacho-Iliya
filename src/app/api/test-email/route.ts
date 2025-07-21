
import { NextRequest, NextResponse } from 'next/server';
import { Resend } from 'resend';

// Initialize Resend only when needed
let resend: Resend | null = null;

function getResendInstance() {
  if (!resend && process.env.RESEND_API_KEY) {
    resend = new Resend(process.env.RESEND_API_KEY);
  }
  return resend;
}

export async function POST(request: NextRequest) {
  try {
    console.log('Test email API called');
    console.log('RESEND_API_KEY present:', !!process.env.RESEND_API_KEY);
    console.log('RESEND_API_KEY length:', process.env.RESEND_API_KEY?.length || 0);
    
    const resendInstance = getResendInstance();
    if (!resendInstance) {
      return NextResponse.json({
        success: false,
        error: 'Resend API key not configured',
        debug: {
          hasApiKey: !!process.env.RESEND_API_KEY,
          keyLength: process.env.RESEND_API_KEY?.length || 0
        }
      }, { status: 500 });
    }

    // Get the email from request body if provided
    const body = await request.json().catch(() => ({}));
    const testEmail = body.email || 'delivered@resend.dev';
    
    const emailResult = await resendInstance.emails.send({
      from: 'info@resend.dev',
      to: [testEmail],
      subject: 'Тест имейл от Resend',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
          <h1 style="color: #E22526;">🧪 Тест имейл</h1>
          <p>Този имейл е изпратен от Resend API за тестване на функционалността.</p>
          <div style="background-color: #f8f9fa; padding: 15px; border-radius: 8px; margin: 20px 0;">
            <strong>Статус:</strong> ✅ Resend функционира правилно!
          </div>
        </div>
      `
    });

    console.log('Test email sent successfully via Resend:', emailResult);

    return NextResponse.json({
      success: true,
      message: 'Тест имейлът беше изпратен успешно!',
      emailId: emailResult.data?.id
    });

  } catch (error) {
    console.error('Test email error:', error);
    
    return NextResponse.json({
      success: false,
      error: 'Грешка при изпращане на тест имейл',
      details: error instanceof Error ? error.message : 'Неизвестна грешка'
    }, { status: 500 });
  }
}
