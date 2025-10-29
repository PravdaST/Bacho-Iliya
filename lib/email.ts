import { Resend } from 'resend';

// Initialize Resend (will be null if API key is not set)
let resend: Resend | null = null;

function getResendInstance() {
  if (!resend && process.env.RESEND_API_KEY) {
    resend = new Resend(process.env.RESEND_API_KEY);
  }
  return resend;
}

// Check if email service is available
export const isEmailAvailable = () => {
  return !!process.env.RESEND_API_KEY;
};

// ============================================
// GIVEAWAY WELCOME EMAIL
// ============================================
export async function sendGiveawayWelcomeEmail(data: {
  email: string;
  name: string;
  entryId: string;
  selectedProducts: string[];
}) {
  const resendInstance = getResendInstance();

  if (!resendInstance) {
    console.warn('⚠️ Resend API key not configured. Skipping email.');
    return { success: false, error: 'Email service not configured' };
  }

  try {
    const facebookUrl = 'https://www.facebook.com/Bacho.Iliya/'; // TODO: Update with direct post URL when available

    const result = await resendInstance.emails.send({
      from: 'Бачо Илия <noreply@bacho-iliya.eu>',
      to: [data.email],
      subject: 'Благодарим за участието в раздаването!',
      html: `
        <!DOCTYPE html>
        <html>
        <head>
          <meta charset="UTF-8">
          <style>
            body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
            .container { max-width: 600px; margin: 0 auto; padding: 20px; background: #fff; }
            .header { background: linear-gradient(135deg, #f59e0b, #ea580c); color: white; padding: 40px 20px; text-align: center; border-radius: 10px 10px 0 0; }
            .content { background: #fffbeb; padding: 30px; }
            .greeting { font-size: 18px; color: #78350f; margin-bottom: 20px; }
            .task-section { background: white; border: 2px solid #fed7aa; border-radius: 8px; padding: 20px; margin: 20px 0; }
            .task-item { display: flex; align-items: start; margin: 15px 0; }
            .task-icon { font-size: 24px; margin-right: 12px; }
            .task-text { flex: 1; }
            .task-number { background: #f59e0b; color: white; width: 28px; height: 28px; border-radius: 50%; display: inline-flex; align-items: center; justify-content: center; font-weight: bold; margin-right: 12px; }
            .cta-button { display: inline-block; background: linear-gradient(135deg, #f59e0b, #ea580c); color: white; padding: 15px 40px; text-decoration: none; border-radius: 8px; font-weight: bold; margin: 20px 0; }
            .products-box { background: #fef3c7; border-left: 4px solid #f59e0b; padding: 15px; margin: 20px 0; }
            .entry-info { background: #f3f4f6; padding: 12px; border-radius: 6px; margin: 20px 0; font-size: 14px; color: #6b7280; text-align: center; }
            .footer { background: #f9fafb; padding: 20px; text-align: center; border-radius: 0 0 10px 10px; color: #6b7280; font-size: 14px; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1 style="margin: 0; font-size: 28px;">Благодарим за участието!</h1>
              <p style="margin: 10px 0 0 0; font-size: 16px; opacity: 0.9;">Голямото раздаване на Бачо Илия</p>
            </div>

            <div class="content">
              <p class="greeting"><strong>Здравей, ${data.name}!</strong></p>

              <p>Благодарим ти, че се регистрира в нашето раздаване! Твоята регистрация беше приета успешно.</p>

              <div class="products-box">
                <h3 style="margin-top: 0; color: #78350f;">Твоите избрани продукти:</h3>
                <ul style="margin: 10px 0;">
                  ${data.selectedProducts.map((p) => `<li><strong>${p}</strong></li>`).join('')}
                </ul>
              </div>

              <div class="task-section">
                <h3 style="margin-top: 0; color: #ea580c;">Следващи стъпки за участие:</h3>
                <p style="margin-bottom: 20px;">За да завършиш участието си, моля изпълни следните задачи във Facebook:</p>

                <div class="task-item">
                  <span class="task-number">1</span>
                  <div class="task-text">
                    <strong>Харесай поста</strong><br>
                    <span style="color: #6b7280;">Отвори нашата Facebook страница и натисни LIKE на поста за раздаването</span>
                  </div>
                </div>

                <div class="task-item">
                  <span class="task-number">2</span>
                  <div class="task-text">
                    <strong>Коментирай "Искам Бачо Илия"</strong><br>
                    <span style="color: #6b7280;">Остави коментар под поста: <strong>"Искам Бачо Илия"</strong></span>
                  </div>
                </div>

                <div class="task-item">
                  <span class="task-number">3</span>
                  <div class="task-text">
                    <strong>Сподели за бонус участия</strong><br>
                    <span style="color: #6b7280;">Всяко споделяне ти дава допълнително участие в раздаването!</span>
                  </div>
                </div>

                <center>
                  <a href="${facebookUrl}" class="cta-button">Отвори Facebook страницата →</a>
                </center>
              </div>

              <div class="entry-info">
                Твоят номер за потвърждение: <strong>${data.entryId}</strong>
              </div>

              <p style="margin-top: 30px; color: #78350f;">
                <strong>Желаем ти успех!</strong><br>
                <span style="color: #6b7280;">Екип Бачо Илия</span>
              </p>
            </div>

            <div class="footer">
              <p style="margin: 5px 0;"><strong>Бачо Илия</strong> - Истински млечни продукти по традиционни рецепти</p>
              <p style="margin: 15px 0 5px 0; font-size: 12px; color: #9ca3af;">
                Ако не си се регистрирал/а за раздаването, моля игнорирай този имейл.
              </p>
            </div>
          </div>
        </body>
        </html>
      `,
    });

    console.log('✅ Welcome email sent successfully:', result);
    return { success: true, data: result };
  } catch (error) {
    console.error('❌ Failed to send welcome email:', error);
    return { success: false, error };
  }
}

// ============================================
// QUIZ COMPLETION EMAIL
// ============================================
export async function sendQuizCompletionEmail(data: {
  email: string;
  city: string;
  weapon: string;
  motivation: string;
}) {
  const resendInstance = getResendInstance();

  if (!resendInstance) {
    console.warn('⚠️ Resend API key not configured. Skipping email.');
    return { success: false, error: 'Email service not configured' };
  }

  try {
    const result = await resendInstance.emails.send({
      from: 'Бачо Илия <noreply@bacho-iliya.eu>',
      to: [data.email],
      subject: 'Добре дошъл в движението!',
      html: `
        <!DOCTYPE html>
        <html>
        <head>
          <meta charset="UTF-8">
          <style>
            body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
            .container { max-width: 600px; margin: 0 auto; padding: 20px; }
            .header { background: linear-gradient(135deg, #E22526, #ff4757); color: white; padding: 30px; text-align: center; border-radius: 10px 10px 0 0; }
            .content { background: #FFF8DC; padding: 30px; }
            .quote { background: white; padding: 20px; border-left: 4px solid #E22526; margin: 20px 0; font-style: italic; }
            .footer { background: #f8f9fa; padding: 20px; text-align: center; border-radius: 0 0 10px 10px; color: #666; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1>Благодарим за подкрепата!</h1>
            </div>

            <div class="content">
              <p>Добре дошъл в движението от <strong>${data.city}</strong> с твоето ${data.weapon}!</p>

              <div class="quote">
                <h3>Твоята мотивация:</h3>
                <p>"${data.motivation}"</p>
              </div>

              <p>Заедно за истински български млечни продукти!</p>

              <p style="margin-top: 30px;">
                <strong>С уважение,</strong><br>
                Екипът на Бачо Илия
              </p>
            </div>

            <div class="footer">
              <p>Движението продължава!</p>
            </div>
          </div>
        </body>
        </html>
      `,
    });

    console.log('✅ Quiz email sent successfully:', result);
    return { success: true, data: result };
  } catch (error) {
    console.error('❌ Failed to send quiz email:', error);
    return { success: false, error };
  }
}

// ============================================
// GIVEAWAY REMINDER: DAY 3
// ============================================
export async function sendDay3Reminder(data: { email: string; name: string; entryId: string }) {
  const resendInstance = getResendInstance();

  if (!resendInstance) {
    console.warn('⚠️ Resend API key not configured. Skipping email.');
    return { success: false, error: 'Email service not configured' };
  }

  try {
    const facebookUrl = 'https://www.facebook.com/Bacho.Iliya/';

    const result = await resendInstance.emails.send({
      from: 'Бачо Илия <noreply@bacho-iliya.eu>',
      to: [data.email],
      subject: '🎁 Не забрави да завършиш участието си!',
      html: `
        <!DOCTYPE html>
        <html>
        <head>
          <meta charset="UTF-8">
          <style>
            body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
            .container { max-width: 600px; margin: 0 auto; padding: 20px; background: #fff; }
            .header { background: linear-gradient(135deg, #f59e0b, #ea580c); color: white; padding: 40px 20px; text-align: center; border-radius: 10px 10px 0 0; }
            .content { background: #fffbeb; padding: 30px; }
            .reminder-box { background: white; border: 3px solid #f59e0b; border-radius: 8px; padding: 25px; margin: 20px 0; text-align: center; }
            .cta-button { display: inline-block; background: linear-gradient(135deg, #f59e0b, #ea580c); color: white; padding: 15px 40px; text-decoration: none; border-radius: 8px; font-weight: bold; margin: 20px 0; font-size: 16px; }
            .footer { background: #f9fafb; padding: 20px; text-align: center; border-radius: 0 0 10px 10px; color: #6b7280; font-size: 14px; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1 style="margin: 0; font-size: 28px;">Не забрави да завършиш!</h1>
              <p style="margin: 10px 0 0 0; font-size: 16px; opacity: 0.9;">Раздаването на Бачо Илия продължава</p>
            </div>

            <div class="content">
              <p style="font-size: 18px; color: #78350f;"><strong>Здравей, ${data.name}!</strong></p>

              <p>Преди 3 дни се регистрира за нашето раздаване, но не завърши всички стъпки. Не пропускай шанса си да спечелиш автентични млечни продукти от Бачо Илия!</p>

              <div class="reminder-box">
                <h2 style="color: #ea580c; margin-top: 0;">📢 ВАЖНО!</h2>
                <p style="font-size: 18px; color: #78350f; font-weight: bold; margin: 15px 0;">
                  Коментирай "Искам Бачо Илия"<br>под поста във Facebook!
                </p>
                <p style="color: #6b7280; margin: 15px 0;">
                  Това е задължително условие за валидно участие. Без коментар, не можеш да спечелиш! 🎁
                </p>
                <a href="${facebookUrl}" class="cta-button">Коментирай сега →</a>
              </div>

              <p style="color: #78350f; margin-top: 25px;">
                <strong>Твоят номер за потвърждение:</strong><br>
                <span style="font-family: monospace; background: #fef3c7; padding: 8px 12px; border-radius: 4px; display: inline-block; margin-top: 5px;">${data.entryId}</span>
              </p>

              <p style="margin-top: 30px; color: #6b7280;">
                <strong>Успех!</strong><br>
                Екип Бачо Илия
              </p>
            </div>

            <div class="footer">
              <p style="margin: 5px 0;"><strong>Бачо Илия</strong> - Истински млечни продукти по традиционни рецепти</p>
            </div>
          </div>
        </body>
        </html>
      `,
    });

    console.log('✅ Day 3 reminder sent successfully:', result);
    return { success: true, data: result };
  } catch (error) {
    console.error('❌ Failed to send Day 3 reminder:', error);
    return { success: false, error };
  }
}

// ============================================
// GIVEAWAY REMINDER: DAY 7 (REFERRAL BOOST)
// ============================================
export async function sendDay7ReferralReminder(data: {
  email: string;
  name: string;
  entryId: string;
  referralCount: number;
}) {
  const resendInstance = getResendInstance();

  if (!resendInstance) {
    console.warn('⚠️ Resend API key not configured. Skipping email.');
    return { success: false, error: 'Email service not configured' };
  }

  try {
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://www.bacho-iliya.eu';
    const referralLink = `${baseUrl}/?ref=${data.entryId}`;

    const result = await resendInstance.emails.send({
      from: 'Бачо Илия <noreply@bacho-iliya.eu>',
      to: [data.email],
      subject: '🚀 Увеличи шансовете си! +3 участия за всеки приятел',
      html: `
        <!DOCTYPE html>
        <html>
        <head>
          <meta charset="UTF-8">
          <style>
            body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
            .container { max-width: 600px; margin: 0 auto; padding: 20px; background: #fff; }
            .header { background: linear-gradient(135deg, #f59e0b, #ea580c); color: white; padding: 40px 20px; text-align: center; border-radius: 10px 10px 0 0; }
            .content { background: #fffbeb; padding: 30px; }
            .stats-box { background: white; border-left: 4px solid #22c55e; padding: 20px; margin: 20px 0; }
            .referral-box { background: #fef3c7; border: 2px solid #f59e0b; border-radius: 8px; padding: 25px; margin: 20px 0; }
            .link-box { background: white; border: 1px dashed #f59e0b; padding: 15px; border-radius: 6px; margin: 15px 0; word-break: break-all; font-family: monospace; font-size: 14px; color: #78350f; }
            .cta-button { display: inline-block; background: linear-gradient(135deg, #22c55e, #16a34a); color: white; padding: 15px 40px; text-decoration: none; border-radius: 8px; font-weight: bold; margin: 15px 5px; font-size: 16px; }
            .footer { background: #f9fafb; padding: 20px; text-align: center; border-radius: 0 0 10px 10px; color: #6b7280; font-size: 14px; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1 style="margin: 0; font-size: 28px;">Увеличи шансовете си!</h1>
              <p style="margin: 10px 0 0 0; font-size: 16px; opacity: 0.9;">Покани приятели = Повече участия</p>
            </div>

            <div class="content">
              <p style="font-size: 18px; color: #78350f;"><strong>Здравей, ${data.name}!</strong></p>

              <p>Благодарим ти за участието! Искаме да споделим страхотна новина:</p>

              ${
                data.referralCount > 0
                  ? `
                <div class="stats-box">
                  <h3 style="color: #22c55e; margin-top: 0;">🎉 Браво!</h3>
                  <p style="font-size: 20px; color: #78350f; font-weight: bold; margin: 10px 0;">
                    ${data.referralCount} ${data.referralCount === 1 ? 'приятел' : 'приятели'} вече се ${data.referralCount === 1 ? 'регистрира' : 'регистрираха'} през твоя линк!
                  </p>
                  <p style="color: #6b7280; margin: 10px 0;">
                    Това означава <strong>+${data.referralCount * 3} допълнителни участия</strong> в томболата! 🚀
                  </p>
                </div>
              `
                  : ''
              }

              <div class="referral-box">
                <h2 style="color: #ea580c; margin-top: 0; text-align: center;">💰 Как да спечелиш още участия?</h2>
                <p style="text-align: center; font-size: 16px; color: #78350f; margin: 15px 0;">
                  <strong>Всеки приятел = +3 участия!</strong>
                </p>
                <p style="text-align: center; color: #6b7280; margin: 15px 0;">
                  Копирай твоя уникален линк и го изпрати на приятели във Viber, WhatsApp или Facebook:
                </p>
                <div class="link-box">
                  ${referralLink}
                </div>
                <p style="text-align: center; font-size: 14px; color: #6b7280; margin-top: 15px;">
                  Колкото повече приятели поканиш, толкова по-големи са шансовете ти! 🎁
                </p>
              </div>

              <p style="margin-top: 30px; color: #6b7280;">
                <strong>Успех!</strong><br>
                Екип Бачо Илия
              </p>
            </div>

            <div class="footer">
              <p style="margin: 5px 0;"><strong>Бачо Илия</strong> - Истински млечни продукти по традиционни рецепти</p>
            </div>
          </div>
        </body>
        </html>
      `,
    });

    console.log('✅ Day 7 referral reminder sent successfully:', result);
    return { success: true, data: result };
  } catch (error) {
    console.error('❌ Failed to send Day 7 referral reminder:', error);
    return { success: false, error };
  }
}

// ============================================
// GIVEAWAY REMINDER: FINAL (3 DAYS BEFORE END)
// ============================================
export async function sendFinalReminder(data: {
  email: string;
  name: string;
  entryId: string;
  drawDate: string;
}) {
  const resendInstance = getResendInstance();

  if (!resendInstance) {
    console.warn('⚠️ Resend API key not configured. Skipping email.');
    return { success: false, error: 'Email service not configured' };
  }

  try {
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://www.bacho-iliya.eu';
    const referralLink = `${baseUrl}/?ref=${data.entryId}`;

    const result = await resendInstance.emails.send({
      from: 'Бачо Илия <noreply@bacho-iliya.eu>',
      to: [data.email],
      subject: '⏰ Последен шанс! Раздаването завършва скоро',
      html: `
        <!DOCTYPE html>
        <html>
        <head>
          <meta charset="UTF-8">
          <style>
            body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
            .container { max-width: 600px; margin: 0 auto; padding: 20px; background: #fff; }
            .header { background: linear-gradient(135deg, #dc2626, #ea580c); color: white; padding: 40px 20px; text-align: center; border-radius: 10px 10px 0 0; }
            .content { background: #fffbeb; padding: 30px; }
            .urgency-box { background: #fef2f2; border: 3px solid #dc2626; border-radius: 8px; padding: 25px; margin: 20px 0; text-align: center; }
            .countdown { font-size: 36px; font-weight: bold; color: #dc2626; margin: 15px 0; }
            .cta-button { display: inline-block; background: linear-gradient(135deg, #dc2626, #ea580c); color: white; padding: 15px 40px; text-decoration: none; border-radius: 8px; font-weight: bold; margin: 20px 0; font-size: 16px; }
            .footer { background: #f9fafb; padding: 20px; text-align: center; border-radius: 0 0 10px 10px; color: #6b7280; font-size: 14px; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1 style="margin: 0; font-size: 28px;">⏰ Последен шанс!</h1>
              <p style="margin: 10px 0 0 0; font-size: 16px; opacity: 0.9;">Раздаването завършва скоро</p>
            </div>

            <div class="content">
              <p style="font-size: 18px; color: #78350f;"><strong>Здравей, ${data.name}!</strong></p>

              <p>Искаме да те напомним, че нашето голямо раздаване приключва съвсем скоро!</p>

              <div class="urgency-box">
                <h2 style="color: #dc2626; margin-top: 0;">🔥 ПОСЛЕДНИ ДНИ!</h2>
                <p style="color: #78350f; font-size: 18px; margin: 15px 0;">
                  Теглене на победителите:
                </p>
                <div class="countdown">${data.drawDate}</div>
                <p style="color: #6b7280; margin: 20px 0;">
                  Това е последният ти шанс да увеличиш участията си! 🚀
                </p>
              </div>

              <h3 style="color: #ea580c; margin-top: 30px;">💡 Последна възможност:</h3>
              <p style="color: #78350f; margin: 15px 0;">
                Сподели твоя уникален линк с приятели и получи <strong>+3 участия</strong> за всеки, който се регистрира:
              </p>
              <div style="background: #fef3c7; border: 1px dashed #f59e0b; padding: 12px; border-radius: 6px; margin: 15px 0; word-break: break-all; font-family: monospace; font-size: 14px; color: #78350f; text-align: center;">
                ${referralLink}
              </div>

              <p style="color: #6b7280; margin-top: 25px;">
                <strong>Твоят номер за потвърждение:</strong><br>
                <span style="font-family: monospace; background: #fef3c7; padding: 8px 12px; border-radius: 4px; display: inline-block; margin-top: 5px;">${data.entryId}</span>
              </p>

              <p style="margin-top: 30px; color: #78350f;">
                <strong>Желаем ти късмет! 🍀</strong><br>
                <span style="color: #6b7280;">Екип Бачо Илия</span>
              </p>
            </div>

            <div class="footer">
              <p style="margin: 5px 0;"><strong>Бачо Илия</strong> - Истински млечни продукти по традиционни рецепти</p>
            </div>
          </div>
        </body>
        </html>
      `,
    });

    console.log('✅ Final reminder sent successfully:', result);
    return { success: true, data: result };
  } catch (error) {
    console.error('❌ Failed to send final reminder:', error);
    return { success: false, error };
  }
}

// ============================================
// MAGIC LINK LOGIN EMAIL
// ============================================
export async function sendMagicLinkEmail(data: { email: string; name: string; loginUrl: string }) {
  const resendInstance = getResendInstance();

  if (!resendInstance) {
    console.warn('⚠️ Resend API key not configured. Skipping email.');
    return { success: false, error: 'Email service not configured' };
  }

  try {
    const result = await resendInstance.emails.send({
      from: 'Бачо Илия <noreply@bacho-iliya.eu>',
      to: [data.email],
      subject: '🎟️ Влез в профила си - Моите билети',
      html: `
        <!DOCTYPE html>
        <html>
        <head>
          <meta charset="UTF-8">
          <style>
            body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
            .container { max-width: 600px; margin: 0 auto; padding: 20px; background: #fff; }
            .header { background: linear-gradient(135deg, #f59e0b, #ea580c); color: white; padding: 40px 20px; text-align: center; border-radius: 10px 10px 0 0; }
            .content { background: #fffbeb; padding: 30px; }
            .login-box { background: white; border: 3px solid #f59e0b; border-radius: 8px; padding: 25px; margin: 20px 0; text-align: center; }
            .cta-button { display: inline-block; background: linear-gradient(135deg, #f59e0b, #ea580c); color: white; padding: 15px 40px; text-decoration: none; border-radius: 8px; font-weight: bold; margin: 20px 0; font-size: 18px; }
            .footer { background: #f9fafb; padding: 20px; text-align: center; border-radius: 0 0 10px 10px; color: #6b7280; font-size: 14px; }
            .warning { background: #fef2f2; border-left: 4px solid #dc2626; padding: 15px; margin: 20px 0; color: #991b1b; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1 style="margin: 0; font-size: 28px;">🎟️ Влез в профила си</h1>
              <p style="margin: 10px 0 0 0; font-size: 16px; opacity: 0.9;">Виж билетите си и статистика</p>
            </div>

            <div class="content">
              <p style="font-size: 18px; color: #78350f;"><strong>Здравей, ${data.name}!</strong></p>

              <p>Получи този имейл, защото поиска достъп до профила си в раздаването на Бачо Илия.</p>

              <div class="login-box">
                <h2 style="color: #ea580c; margin-top: 0;">🔐 Влез с един клик</h2>
                <p style="color: #78350f; margin: 15px 0;">
                  Кликни на бутона долу за да видиш билетите си, статистика и класация:
                </p>
                <a href="${data.loginUrl}" class="cta-button">Влез в профила си →</a>
                <p style="color: #6b7280; font-size: 14px; margin-top: 20px;">
                  Този линк работи само веднъж и изтича след 15 минути.
                </p>
              </div>

              <div class="warning">
                <strong>⚠️ Важно:</strong> Ако не си поискал/а този имейл, моля игнорирай го. Никой не може да влезе в профила ти без този линк.
              </div>

              <p style="margin-top: 30px; color: #6b7280;">
                <strong>Успех в раздаването!</strong><br>
                Екип Бачо Илия
              </p>
            </div>

            <div class="footer">
              <p style="margin: 5px 0;"><strong>Бачо Илия</strong> - Истински млечни продукти по традиционни рецепти</p>
            </div>
          </div>
        </body>
        </html>
      `,
    });

    console.log('✅ Magic link email sent successfully:', result);
    return { success: true, data: result };
  } catch (error) {
    console.error('❌ Failed to send magic link email:', error);
    return { success: false, error };
  }
}

// ============================================
// WINNER ANNOUNCEMENT EMAIL
// ============================================
export async function sendWinnerAnnouncement(data: {
  email: string;
  name: string;
  entryId: string;
  selectedProducts: string[];
  isWinner: boolean;
}) {
  const resendInstance = getResendInstance();

  if (!resendInstance) {
    console.warn('⚠️ Resend API key not configured. Skipping email.');
    return { success: false, error: 'Email service not configured' };
  }

  try {
    const result = await resendInstance.emails.send({
      from: 'Бачо Илия <noreply@bacho-iliya.eu>',
      to: [data.email],
      subject: data.isWinner ? '🎉 ПОЗДРАВЛЕНИЯ! Ти си победител!' : '🎁 Благодарим за участието!',
      html: data.isWinner
        ? `
        <!DOCTYPE html>
        <html>
        <head>
          <meta charset="UTF-8">
          <style>
            body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
            .container { max-width: 600px; margin: 0 auto; padding: 20px; background: #fff; }
            .header { background: linear-gradient(135deg, #22c55e, #16a34a); color: white; padding: 50px 20px; text-align: center; border-radius: 10px 10px 0 0; }
            .trophy { font-size: 60px; margin: 20px 0; }
            .content { background: #f0fdf4; padding: 30px; }
            .winner-box { background: white; border: 4px solid #22c55e; border-radius: 8px; padding: 30px; margin: 20px 0; text-align: center; }
            .products-box { background: #fef3c7; border-left: 4px solid #f59e0b; padding: 20px; margin: 20px 0; }
            .footer { background: #f9fafb; padding: 20px; text-align: center; border-radius: 0 0 10px 10px; color: #6b7280; font-size: 14px; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <div class="trophy">🏆</div>
              <h1 style="margin: 0; font-size: 32px;">ПОЗДРАВЛЕНИЯ!</h1>
              <p style="margin: 10px 0 0 0; font-size: 18px; opacity: 0.9;">Ти си победител в раздаването!</p>
            </div>

            <div class="content">
              <div class="winner-box">
                <h2 style="color: #22c55e; margin-top: 0; font-size: 28px;">🎉 ${data.name}, ти спечели!</h2>
                <p style="font-size: 18px; color: #78350f; margin: 20px 0;">
                  Изтеглихме победителите и радваме се да ти съобщим, че <strong>ТИ СПЕЧЕЛИ</strong> автентични млечни продукти от Бачо Илия!
                </p>
              </div>

              <div class="products-box">
                <h3 style="margin-top: 0; color: #78350f;">🎁 Твоите награди:</h3>
                <ul style="margin: 10px 0; font-size: 16px;">
                  ${data.selectedProducts.map((p) => `<li><strong>${p}</strong></li>`).join('')}
                </ul>
              </div>

              <h3 style="color: #22c55e; margin-top: 30px;">📞 Следващи стъпки:</h3>
              <p style="color: #78350f; margin: 15px 0;">
                Нашият екип ще те потърси на телефона, който си посочил при регистрацията, за да уговорим доставката на наградата ти!
              </p>

              <p style="color: #6b7280; margin-top: 25px;">
                <strong>Твоят спечелил номер:</strong><br>
                <span style="font-family: monospace; background: #dcfce7; padding: 8px 12px; border-radius: 4px; display: inline-block; margin-top: 5px; color: #22c55e; font-size: 18px; font-weight: bold;">${data.entryId}</span>
              </p>

              <p style="margin-top: 40px; color: #78350f; font-size: 18px;">
                <strong>Поздравления още веднъж! 🎊</strong><br>
                <span style="color: #6b7280;">Екип Бачо Илия</span>
              </p>
            </div>

            <div class="footer">
              <p style="margin: 5px 0;"><strong>Бачо Илия</strong> - Истински млечни продукти по традиционни рецепти</p>
            </div>
          </div>
        </body>
        </html>
      `
        : `
        <!DOCTYPE html>
        <html>
        <head>
          <meta charset="UTF-8">
          <style>
            body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
            .container { max-width: 600px; margin: 0 auto; padding: 20px; background: #fff; }
            .header { background: linear-gradient(135deg, #f59e0b, #ea580c); color: white; padding: 40px 20px; text-align: center; border-radius: 10px 10px 0 0; }
            .content { background: #fffbeb; padding: 30px; }
            .thank-you-box { background: white; border: 2px solid #f59e0b; border-radius: 8px; padding: 25px; margin: 20px 0; text-align: center; }
            .footer { background: #f9fafb; padding: 20px; text-align: center; border-radius: 0 0 10px 10px; color: #6b7280; font-size: 14px; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1 style="margin: 0; font-size: 28px;">Благодарим за участието!</h1>
              <p style="margin: 10px 0 0 0; font-size: 16px; opacity: 0.9;">Раздаването на Бачо Илия приключи</p>
            </div>

            <div class="content">
              <p style="font-size: 18px; color: #78350f;"><strong>Здравей, ${data.name}!</strong></p>

              <div class="thank-you-box">
                <h2 style="color: #ea580c; margin-top: 0;">🙏 Благодарим ти!</h2>
                <p style="font-size: 16px; color: #78350f; margin: 15px 0;">
                  Раздаването приключи и победителят вече е обявен. За съжаление този път късметът не беше на твоя страна, но се радваме че участва!
                </p>
              </div>

              <p style="color: #78350f; margin: 25px 0;">
                Ще има още раздавания в бъдеще, затова следи нашата Facebook страница за новини! 🎁
              </p>

              <p style="margin-top: 30px; color: #78350f;">
                <strong>Благодарим за подкрепата! 💛</strong><br>
                <span style="color: #6b7280;">Екип Бачо Илия</span>
              </p>
            </div>

            <div class="footer">
              <p style="margin: 5px 0;"><strong>Бачо Илия</strong> - Истински млечни продукти по традиционни рецепти</p>
            </div>
          </div>
        </body>
        </html>
      `,
    });

    console.log('✅ Winner announcement sent successfully:', result);
    return { success: true, data: result };
  } catch (error) {
    console.error('❌ Failed to send winner announcement:', error);
    return { success: false, error };
  }
}
