import { NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase';

/**
 * GET /api/admin/learn-content/list-pillars?clusterSlug=xxx
 *
 * Fetches existing pillars for a specific cluster
 * Used to determine which suggested pillars have already been created
 */
export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const clusterSlug = searchParams.get('clusterSlug');

    if (!clusterSlug) {
      return NextResponse.json(
        { error: 'clusterSlug parameter is required' },
        { status: 400 }
      );
    }

    const supabase = supabaseAdmin;

    // Fetch all pillars for this cluster
    const { data: pillars, error } = await supabase
      .from('blog_posts')
      .select('id, title, slug, is_published, created_at, view_count')
      .eq('category', 'learn-guide')
      .eq('guide_type', 'pillar')
      .eq('parent_cluster_slug', clusterSlug)
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Error fetching pillars:', error);
      return NextResponse.json(
        { error: 'Failed to fetch pillars', details: error.message },
        { status: 500 }
      );
    }

    return NextResponse.json({
      pillars: pillars || [],
      total: pillars?.length || 0,
      clusterSlug
    });
  } catch (error) {
    console.error('Unexpected error in list-pillars:', error);
    return NextResponse.json(
      { error: 'Internal server error', details: String(error) },
      { status: 500 }
    );
  }
}
