import { NextRequest, NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase';

export async function DELETE(request: NextRequest) {
  try {
    const { id } = await request.json();

    if (!id) {
      return NextResponse.json(
        { error: 'Article ID is required' },
        { status: 400 }
      );
    }

    // First, get the article to check if it has a featured image
    const { data: article, error: fetchError } = await supabaseAdmin
      .from('blog_posts')
      .select('featured_image_url')
      .eq('id', id)
      .single();

    if (fetchError) {
      console.error('Error fetching article:', fetchError);
      return NextResponse.json(
        { error: 'Article not found' },
        { status: 404 }
      );
    }

    // Delete the article from database
    const { error: deleteError } = await supabaseAdmin
      .from('blog_posts')
      .delete()
      .eq('id', id);

    if (deleteError) {
      console.error('Error deleting article:', deleteError);
      return NextResponse.json(
        { error: 'Failed to delete article' },
        { status: 500 }
      );
    }

    // Optionally delete the featured image from storage if it exists
    if (article.featured_image_url) {
      try {
        // Extract the file path from the URL
        // Example URL: https://lrtbkvbmciqalpfvxxrh.supabase.co/storage/v1/object/public/blog-images/learn-guides/filename.png
        const urlParts = article.featured_image_url.split('/blog-images/');
        if (urlParts.length === 2) {
          const filePath = urlParts[1];

          const { error: storageError } = await supabaseAdmin.storage
            .from('blog-images')
            .remove([filePath]);

          if (storageError) {
            console.warn('Failed to delete image from storage:', storageError);
            // Don't fail the request if image deletion fails
          }
        }
      } catch (err) {
        console.warn('Error deleting image:', err);
        // Don't fail the request if image deletion fails
      }
    }

    return NextResponse.json(
      { success: true, message: 'Article deleted successfully' },
      { status: 200 }
    );
  } catch (error) {
    console.error('Delete article error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
