import { NextRequest, NextResponse } from 'next/server';
import { supabaseAdmin, isSupabaseConfigured } from '@/lib/supabase';
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

// Schema for incrementing share count
const shareRequestSchema = z.object({
  entryId: z.string().min(1, 'Entry ID is required'),
});

export async function POST(request: NextRequest) {
  try {
    console.log('📢 Share tracking API called');

    // Parse request body
    let body;
    try {
      body = await request.json();
      console.log('📦 Request body:', body);
    } catch (parseError) {
      console.error('❌ Failed to parse request body:', parseError);
      return jsonResponse({
        success: false,
        error: 'Невалидни данни в заявката'
      }, 400);
    }

    // Validate input data
    let validatedData;
    try {
      validatedData = shareRequestSchema.parse(body);
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
        error: 'Базата данни не е конфигурирана'
      }, 503);
    }

    // Increment share count in database
    try {
      console.log('💾 Incrementing share count for entry:', validatedData.entryId);

      // First, get the current entry
      const { data: currentEntry, error: fetchError } = await supabaseAdmin
        .from('giveaway_entries')
        .select('share_count')
        .eq('entry_id', validatedData.entryId)
        .single();

      if (fetchError) {
        console.error('❌ Failed to fetch entry:', fetchError);
        return jsonResponse({
          success: false,
          error: 'Участието не е намерено'
        }, 404);
      }

      // Increment share count
      const newShareCount = (currentEntry.share_count || 0) + 1;

      const { data, error } = await supabaseAdmin
        .from('giveaway_entries')
        .update({ share_count: newShareCount })
        .eq('entry_id', validatedData.entryId)
        .select()
        .single();

      if (error) {
        console.error('❌ Supabase update error:', error);
        return jsonResponse({
          success: false,
          error: 'Грешка при актуализиране на броя споделяния',
          details: process.env.NODE_ENV === 'development' ? error.message : undefined
        }, 500);
      }

      console.log('✅ Share count incremented successfully:', newShareCount);

      return jsonResponse({
        success: true,
        message: 'Споделянето беше записано успешно!',
        data: {
          entryId: validatedData.entryId,
          shareCount: newShareCount,
        }
      }, 200);

    } catch (dbError) {
      console.error('❌ Failed to update share count:', dbError);
      const errorMessage = dbError instanceof Error ? dbError.message : 'Unknown error';
      return jsonResponse({
        success: false,
        error: 'Грешка при актуализиране на базата данни',
        details: process.env.NODE_ENV === 'development' ? errorMessage : undefined
      }, 500);
    }

  } catch (error) {
    // Final catch-all to ensure we ALWAYS return JSON
    console.error('❌ Unexpected error in Share API:', error);
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';

    return jsonResponse({
      success: false,
      error: 'Вътрешна грешка на сървъра',
      details: process.env.NODE_ENV === 'development' ? errorMessage : undefined
    }, 500);
  }
}

// GET endpoint to check share count
export async function GET(request: NextRequest) {
  try {
    const entryId = request.nextUrl.searchParams.get('entryId');

    if (!entryId) {
      return jsonResponse({
        success: false,
        error: 'Entry ID is required'
      }, 400);
    }

    if (!isSupabaseConfigured()) {
      return jsonResponse({
        success: false,
        error: 'Базата данни не е конфигурирана'
      }, 503);
    }

    const { data, error } = await supabaseAdmin
      .from('giveaway_entries')
      .select('share_count')
      .eq('entry_id', entryId)
      .single();

    if (error) {
      return jsonResponse({
        success: false,
        error: 'Участието не е намерено'
      }, 404);
    }

    return jsonResponse({
      success: true,
      data: {
        entryId,
        shareCount: data.share_count || 0,
      }
    }, 200);

  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    return jsonResponse({
      success: false,
      error: 'Вътрешна грешка на сървъра',
      details: process.env.NODE_ENV === 'development' ? errorMessage : undefined
    }, 500);
  }
}
