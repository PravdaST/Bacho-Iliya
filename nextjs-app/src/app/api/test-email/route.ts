
import { NextRequest, NextResponse } from "next/server";
import nodemailer from 'nodemailer';

// Email sending function
async function sendTestEmail(email: string) {
  const transporter = nodemailer.createTransport({
    host: 'server6.aleana-wa.eu',
    port: 587, // STARTTLS port
    secure: false, // true for 465, false for other ports
    auth: {
      user: process.env.EMAIL_USER, // contact@bacho-iliya.eu
      pass: process.env.EMAIL_PASS
    },
    tls: {
      rejectUnauthorized: false,
      ciphers: 'SSLv3'
    }
  });

  const mailOptions = {
    from: '"Бачо Илия" <contact@bacho-iliya.eu>',
    to: email,
    subject: 'Тест имейл - Бачо Илия',
    html: `
      <div style="font-family: 'Georgia', serif; max-width: 600px; margin: 0 auto; background-color: #f9f7f4; padding: 30px; border-radius: 10px;">
        <div style="text-align: center; margin-bottom: 30px;">
          <h1 style="color: #8B4513; font-size: 28px; margin: 0;">Бачо Илия</h1>
          <p style="color: #D2691E; font-style: italic; margin: 5px 0;">Истинският български вкус</p>
        </div>

        <h2 style="color: #8B4513; text-align: center;">Тест имейл успешен!</h2>

        <p style="color: #5D4037; font-size: 16px; line-height: 1.6;">
          Този имейл е изпратен за тестване на email функционалността на уебсайта на Бачо Илия.
        </p>

        <div style="background-color: #fff; padding: 20px; border-radius: 8px; margin: 20px 0; border-left: 4px solid #D2691E;">
          <p style="color: #5D4037; margin: 0; font-style: italic;">
            "Ако получавате този имейл, значи всичко работи отлично!"
          </p>
        </div>

        <div style="text-align: center; margin: 30px 0;">
          <p style="color: #8B4513; font-weight: bold; margin: 0;">С уважение,</p>
          <p style="color: #D2691E; font-size: 18px; margin: 5px 0;">Екипът на Бачо Илия</p>
        </div>

        <hr style="border: none; height: 1px; background-color: #D2691E; margin: 20px 0;">

        <p style="color: #8B7355; font-size: 12px; text-align: center; margin: 0;">
          Направено с любов в България 🇧🇬
        </p>
      </div>
    `
  };

  return transporter.sendMail(mailOptions);
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { email } = body;

    if (!email) {
      return NextResponse.json(
        { success: false, message: "Email is required" },
        { status: 400 }
      );
    }

    console.log('Sending test email to:', email);

    await sendTestEmail(email);
    console.log('Test email sent successfully');

    return NextResponse.json({ 
      success: true, 
      message: "Test email sent successfully!" 
    });

  } catch (error) {
    console.error('Error sending test email:', error);
    return NextResponse.json(
      { 
        success: false, 
        message: "Failed to send test email",
        error: error instanceof Error ? error.message : String(error)
      },
      { status: 500 }
    );
  }
}
