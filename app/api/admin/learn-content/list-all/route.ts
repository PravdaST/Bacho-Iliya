import { supabaseAdmin } from '@/lib/supabase';
import { NextResponse } from 'next/server';

export async function GET() {
  const supabase = supabaseAdmin;

  try {
    // Fetch all learn guides (both published and drafts)
    const { data: articles, error } = await supabase
      .from('blog_posts')
      .select('id, title, slug, category, guide_type, guide_category, is_published, created_at, updated_at, suggested_pillars, parent_cluster_slug')
      .eq('category', 'learn-guide')
      .order('created_at', { ascending: false });

    if (error) {
      console.error('[List All] Database error:', error);
      return NextResponse.json(
        { error: 'Грешка при зареждане на статиите' },
        { status: 500 }
      );
    }

    // Separate into clusters and pillars
    const clusters = articles?.filter(a => a.guide_type === 'cluster') || [];
    const pillars = articles?.filter(a => a.guide_type === 'pillar') || [];

    // Group by published status
    const publishedClusters = clusters.filter(c => c.is_published);
    const draftClusters = clusters.filter(c => !c.is_published);
    const publishedPillars = pillars.filter(p => p.is_published);
    const draftPillars = pillars.filter(p => !p.is_published);

    return NextResponse.json({
      success: true,
      total: articles?.length || 0,
      clusters: {
        total: clusters.length,
        published: publishedClusters.length,
        drafts: draftClusters.length,
        items: clusters
      },
      pillars: {
        total: pillars.length,
        published: publishedPillars.length,
        drafts: draftPillars.length,
        items: pillars
      }
    });

  } catch (error: any) {
    console.error('[List All] Error:', error);
    return NextResponse.json(
      { error: error.message || 'Неуспешно зареждане' },
      { status: 500 }
    );
  }
}
