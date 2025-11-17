import { supabaseAdmin } from '@/lib/supabase';
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  const supabase = supabaseAdmin;

  try {
    const { id, isPublished } = await request.json();

    if (!id) {
      return NextResponse.json(
        { error: 'ID е задължително' },
        { status: 400 }
      );
    }

    // Update is_published status
    const { data, error } = await supabase
      .from('blog_posts')
      .update({
        is_published: isPublished,
        updated_at: new Date().toISOString()
      })
      .eq('id', id)
      .select('id, title, slug, is_published')
      .single();

    if (error) {
      console.error('[Toggle Publish] Database error:', error);
      return NextResponse.json(
        { error: 'Грешка при обновяване на статията' },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      data,
      message: isPublished ? 'Статията е публикувана' : 'Статията е премахната от публикуване'
    });

  } catch (error: any) {
    console.error('[Toggle Publish] Error:', error);
    return NextResponse.json(
      { error: error.message || 'Неуспешно обновяване' },
      { status: 500 }
    );
  }
}
