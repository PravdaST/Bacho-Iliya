import { NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase';

/**
 * GET /api/admin/learn-content/list-clusters
 *
 * Fetches all cluster-type learn content articles for admin UI
 * Returns cluster metadata including suggested pillars
 */
export async function GET() {
  try {
    const supabase = supabaseAdmin;

    // Fetch all clusters with relevant metadata
    const { data: clusters, error } = await supabase
      .from('blog_posts')
      .select('id, title, slug, guide_category, suggested_pillars, is_published, created_at, view_count')
      .eq('category', 'learn-guide')
      .eq('guide_type', 'cluster')
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Error fetching clusters:', error);
      return NextResponse.json(
        { error: 'Failed to fetch clusters', details: error.message },
        { status: 500 }
      );
    }

    // For each cluster, count how many pillars have been created
    const clustersWithPillarCount = await Promise.all(
      (clusters || []).map(async (cluster) => {
        const { count: pillarCount } = await supabase
          .from('blog_posts')
          .select('*', { count: 'exact', head: true })
          .eq('category', 'learn-guide')
          .eq('guide_type', 'pillar')
          .eq('parent_cluster_slug', cluster.slug);

        return {
          ...cluster,
          pillarCount: pillarCount || 0,
          suggestedPillarCount: cluster.suggested_pillars?.length || 0,
        };
      })
    );

    return NextResponse.json({
      clusters: clustersWithPillarCount,
      total: clustersWithPillarCount.length
    });
  } catch (error) {
    console.error('Unexpected error in list-clusters:', error);
    return NextResponse.json(
      { error: 'Internal server error', details: String(error) },
      { status: 500 }
    );
  }
}
