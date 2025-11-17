import { supabaseAdmin } from '@/lib/supabase';
import { NextResponse } from 'next/server';

export async function PATCH(request: Request) {
  const supabase = supabaseAdmin;

  try {
    const { id, is_published } = await request.json();

    if (!id) {
      return NextResponse.json(
        { error: 'ID е задължително' },
        { status: 400 }
      );
    }

    // Update publish status
    const { data, error } = await supabase
      .from('blog_posts')
      .update({
        is_published,
        published_at: is_published ? new Date().toISOString() : null,
        updated_at: new Date().toISOString()
      })
      .eq('id', id)
      .select()
      .single();

    if (error) {
      console.error('[Publish] Database error:', error);
      return NextResponse.json(
        { error: 'Грешка при промяна на статус' },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      data
    });

  } catch (error: any) {
    console.error('[Publish] Error:', error);
    return NextResponse.json(
      { error: error.message || 'Неуспешна промяна на статус' },
      { status: 500 }
    );
  }
}
