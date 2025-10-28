import { NextRequest, NextResponse } from 'next/server';
import { supabaseAdmin, isSupabaseConfigured, type GiveawayEntry } from '@/lib/supabase';
import { insertGiveawayEntrySchema } from '@/lib/schema';
import { sendGiveawayWelcomeEmail } from '@/lib/email';
import { sanitizeGiveawayEntry, detectMaliciousPatterns } from '@/lib/sanitization';
import { generateReferralCode } from '@/lib/gamification';
import { z } from 'zod';

// Helper to create JSON response with proper headers
const jsonResponse = (data: any, status: number = 200) => {
  return new NextResponse(JSON.stringify(data), {
    status,
    headers: {
      'Content-Type': 'application/json',
    },
  });
};

export async function POST(request: NextRequest) {
  // Wrap everything in try/catch to ensure we always return JSON
  try {
    console.log('📝 Giveaway API called');

    // Extract UTM parameters from URL for tracking
    const { searchParams } = new URL(request.url);
    const utmSource = searchParams.get('utm_source'); // e.g., "facebook", "direct"
    const utmMedium = searchParams.get('utm_medium'); // e.g., "post_share", "referral"

    if (utmSource || utmMedium) {
      console.log('📊 UTM tracking:', { source: utmSource, medium: utmMedium });
    }

    // Parse request body
    let body;
    try {
      body = await request.json();
      console.log('📦 Request body:', {
        ...body,
        selectedProducts: body.selectedProducts?.length || 0
      });
    } catch (parseError) {
      console.error('❌ Failed to parse request body:', parseError);
      return jsonResponse({
        success: false,
        error: 'Невалидни данни в заявката'
      }, 400);
    }

    // 🔒 SECURITY: Sanitize input data first
    console.log('🧹 Sanitizing input data...');
    const sanitized = sanitizeGiveawayEntry({
      name: body.name || '',
      email: body.email || '',
      phone: body.phone || '',
      selectedProducts: Array.isArray(body.selectedProducts) ? body.selectedProducts : [],
    });

    // Check for sanitization errors
    if (sanitized.errors.length > 0) {
      console.warn('⚠️ Sanitization errors:', sanitized.errors);
      return jsonResponse({
        success: false,
        error: sanitized.errors[0], // Return first error
        details: sanitized.errors,
      }, 400);
    }

    // Check for XSS/malicious patterns
    const fieldsToCheck = [body.name, body.email, body.phone, ...(body.selectedProducts || [])];
    for (const field of fieldsToCheck) {
      if (typeof field === 'string' && detectMaliciousPatterns(field)) {
        console.error('🚨 Malicious pattern detected in input');
        return jsonResponse({
          success: false,
          error: 'Невалиден вход - подозрителен код открит',
        }, 400);
      }
    }

    console.log('✅ Input sanitized successfully');

    // Validate input data (use sanitized values)
    let validatedData;
    try {
      validatedData = insertGiveawayEntrySchema.parse({
        entryId: body.entryId, // Entry ID is generated client-side, validate separately
        name: sanitized.name,
        email: sanitized.email,
        phone: sanitized.phone,
        selectedProducts: sanitized.selectedProducts,
        taskFacebook: body.tasks?.facebook || false,
        taskInstagram: body.tasks?.instagram || false,
        taskShare: body.tasks?.share || false,
        referredBy: body.referredBy || undefined,
        userAgent: request.headers.get('user-agent') || undefined,
        ipAddress: request.headers.get('x-forwarded-for') || request.headers.get('x-real-ip') || undefined,
      });
      console.log('✅ Data validated successfully');
    } catch (validationError) {
      if (validationError instanceof z.ZodError) {
        console.error('❌ Validation error:', validationError.issues);
        return jsonResponse({
          success: false,
          error: 'Невалидни данни',
          details: validationError.issues
        }, 400);
      }
      throw validationError;
    }

    // Check Supabase configuration
    if (!isSupabaseConfigured()) {
      console.error('❌ Supabase not configured');
      return jsonResponse({
        success: false,
        error: 'Базата данни не е конфигурирана',
        details: process.env.NODE_ENV === 'development' ? 'Missing Supabase credentials' : undefined
      }, 503);
    }

    // Process referral if present
    let referrerEntryId = validatedData.referredBy || null;
    if (referrerEntryId) {
      try {
        console.log(`🔗 Processing referral from: ${referrerEntryId}`);

        // Verify referrer exists
        const { data: referrer, error: referrerError } = await supabaseAdmin
          .from('giveaway_entries')
          .select('id, entry_id, referral_count, referral_entries, tickets_count, tickets_history, facebook_post_shares')
          .eq('entry_id', referrerEntryId)
          .single();

        if (referrerError || !referrer) {
          console.warn(`⚠️ Invalid referrer ID: ${referrerEntryId}`);
          referrerEntryId = null; // Invalid referrer, proceed without it
        } else {
          // Calculate tickets based on referral source
          // Facebook post share: +5 for first referral, +3 for subsequent
          // Direct referral: +3 for all
          const isPostShare = utmMedium === 'post_share';
          const isFirstPostShare = isPostShare && (referrer.facebook_post_shares || 0) === 0;
          const ticketsToAdd = isFirstPostShare ? 5 : 3;

          const newTicketsCount = (referrer.tickets_count || 1) + ticketsToAdd;
          const existingHistory = referrer.tickets_history || [];

          const newHistory = [
            ...existingHistory,
            {
              type: 'referral' as const,
              tickets: ticketsToAdd,
              date: new Date().toISOString(),
              description: isPostShare
                ? (isFirstPostShare ? 'Споделяне на Facebook пост (първи път)' : 'Споделяне на Facebook пост')
                : 'Препоръка на приятел',
            },
          ];

          const updateData: any = {
            referral_count: referrer.referral_count + 1,
            referral_entries: referrer.referral_entries + ticketsToAdd,
            tickets_count: newTicketsCount,
            tickets_history: newHistory,
          };

          // Increment facebook_post_shares if this is a post share referral
          if (isPostShare) {
            updateData.facebook_post_shares = (referrer.facebook_post_shares || 0) + 1;
          }

          const { error: updateError } = await supabaseAdmin
            .from('giveaway_entries')
            .update(updateData)
            .eq('id', referrer.id);

          if (updateError) {
            console.error('❌ Failed to update referrer stats:', updateError);
          } else {
            const shareType = isPostShare ? '(Facebook post share)' : '(direct referral)';
            console.log(`✅ Updated referrer stats: +1 referral ${shareType}, +${ticketsToAdd} tickets (total: ${newTicketsCount})`);
          }
        }
      } catch (referralError) {
        console.error('❌ Error processing referral:', referralError);
        referrerEntryId = null; // Continue without referral on error
      }
    }

    // Anti-fraud: Check for duplicate email and phone
    try {
      console.log('🔒 Running anti-fraud checks...');

      // Check for existing email
      const { data: existingEmail, error: emailCheckError } = await supabaseAdmin
        .from('giveaway_entries')
        .select('id, email')
        .eq('email', validatedData.email)
        .maybeSingle();

      if (emailCheckError) {
        console.error('❌ Error checking email:', emailCheckError);
        // Continue execution despite check error
      } else if (existingEmail) {
        console.warn(`⚠️ Duplicate email detected: ${validatedData.email}`);
        return jsonResponse({
          success: false,
          error: 'Този email адрес вече е регистриран в раздаването.',
        }, 409); // 409 Conflict
      }

      // Check for existing phone
      const { data: existingPhone, error: phoneCheckError } = await supabaseAdmin
        .from('giveaway_entries')
        .select('id, phone')
        .eq('phone', validatedData.phone)
        .maybeSingle();

      if (phoneCheckError) {
        console.error('❌ Error checking phone:', phoneCheckError);
        // Continue execution despite check error
      } else if (existingPhone) {
        console.warn(`⚠️ Duplicate phone detected: ${validatedData.phone}`);
        return jsonResponse({
          success: false,
          error: 'Този телефонен номер вече е регистриран в раздаването.',
        }, 409); // 409 Conflict
      }

      console.log('✅ Anti-fraud checks passed');
    } catch (fraudCheckError) {
      console.error('❌ Anti-fraud check error:', fraudCheckError);
      // Continue execution despite check errors
    }

    // 🎮 Generate referral code for gamification
    const referralCode = generateReferralCode(validatedData.email);
    console.log(`🎯 Generated referral code: ${referralCode}`);

    // Save to Supabase
    let savedEntry;
    try {
      console.log('💾 Attempting to save to Supabase...');

      const entryData: Omit<GiveawayEntry, 'id' | 'submitted_at'> = {
        entry_id: validatedData.entryId,
        name: validatedData.name,
        email: validatedData.email,
        phone: validatedData.phone,
        selected_products: JSON.stringify(validatedData.selectedProducts),
        task_facebook: validatedData.taskFacebook || false,
        task_instagram: validatedData.taskInstagram || false,
        task_share: validatedData.taskShare || false,
        share_count: 0, // Initialize share count at 0
        referred_by: referrerEntryId,
        referral_count: 0, // Initialize at 0
        referral_entries: 0, // Initialize at 0
        tickets_count: 1, // Initialize with 1 ticket (base entry)
        tickets_history: [
          {
            type: 'registration' as const,
            tickets: 1,
            date: new Date().toISOString(),
            description: 'Първоначална регистрация',
          },
        ], // JSONB - no stringify needed
        traffic_source: utmSource || null, // UTM tracking: facebook, direct, email, etc
        traffic_medium: utmMedium || null, // UTM tracking: post_share, referral, organic, etc
        facebook_post_shares: 0, // Initialize at 0 (will increment when others use this user's link)
        user_agent: validatedData.userAgent || null,
        ip_address: validatedData.ipAddress || null,
      };

      const { data, error } = await supabaseAdmin
        .from('giveaway_entries')
        .insert(entryData)
        .select()
        .single();

      if (error) {
        console.error('❌ Supabase insert error:', error);
        return jsonResponse({
          success: false,
          error: 'Грешка при записване в базата данни',
          details: process.env.NODE_ENV === 'development' ? error.message : undefined
        }, 500);
      }

      savedEntry = data;
      console.log('✅ Data saved to Supabase:', data.id);
    } catch (dbError) {
      console.error('❌ Failed to save to Supabase:', dbError);
      const errorMessage = dbError instanceof Error ? dbError.message : 'Unknown error';
      return jsonResponse({
        success: false,
        error: 'Грешка при записване в базата данни',
        details: process.env.NODE_ENV === 'development' ? errorMessage : undefined
      }, 500);
    }

    // Send welcome email (if Resend is configured)
    try {
      console.log('📧 Attempting to send welcome email...');
      const productNames = validatedData.selectedProducts;
      const emailResult = await sendGiveawayWelcomeEmail({
        email: validatedData.email,
        name: validatedData.name,
        entryId: validatedData.entryId,
        selectedProducts: productNames,
      });

      if (emailResult.success) {
        console.log('✅ Welcome email sent successfully');
      } else {
        console.warn('⚠️ Welcome email not sent:', emailResult.error);
      }
    } catch (emailError) {
      console.error('❌ Failed to send welcome email:', emailError);
      // Continue execution even if email fails
    }

    // Return success response with gamification data
    console.log('✅ Registration completed successfully');
    return jsonResponse({
      success: true,
      message: 'Успешна регистрация! Провери имейла си.',
      data: {
        entryId: validatedData.entryId,
        name: validatedData.name,
        email: validatedData.email,
        referralCode: referralCode, // 🎮 Include referral code for gamification
        referralCount: savedEntry?.referral_count || 0,
        bonusEntries: savedEntry?.referral_entries || 0,
      }
    }, 200);

  } catch (error) {
    // Final catch-all to ensure we ALWAYS return JSON
    console.error('❌ Unexpected error in Giveaway API:', error);
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';

    return jsonResponse({
      success: false,
      error: 'Вътрешна грешка на сървъра',
      details: process.env.NODE_ENV === 'development' ? errorMessage : undefined
    }, 500);
  }
}

// GET endpoint to check if API is working
export async function GET() {
  const supabaseConfigured = isSupabaseConfigured();

  return jsonResponse({
    status: supabaseConfigured ? 'OK' : 'Warning',
    message: 'Giveaway API is running',
    database: {
      configured: supabaseConfigured,
      type: 'Supabase',
    },
    timestamp: new Date().toISOString(),
  }, supabaseConfigured ? 200 : 503);
}
