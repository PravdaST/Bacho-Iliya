import { supabaseAdmin } from '@/lib/supabase';
import { NextRequest, NextResponse } from 'next/server';

/**
 * Check for duplicate content in blog_posts
 * Checks: title similarity, slug, and content similarity
 */
export async function POST(request: NextRequest) {
  const supabase = supabaseAdmin;

  try {
    const body = await request.json();
    const { title, slug, content, excludeId, parentClusterSlug } = body;

    if (!title && !slug && !content) {
      return NextResponse.json(
        { error: 'Трябва да предоставите поне едно поле за проверка (title, slug, или content)' },
        { status: 400 }
      );
    }

    // --- NEW: Fetch parent cluster title if slug is provided ---
    let parentClusterTitle: string | null = null;
    if (parentClusterSlug) {
      const { data: parentCluster, error: parentError } = await supabase
        .from('blog_posts')
        .select('title')
        .eq('slug', parentClusterSlug)
        .single();

      if (parentError) {
        console.error('[Check Duplicates] Error fetching parent cluster:', parentError);
        // Not a fatal error, so we just log it and continue
      } else if (parentCluster) {
        parentClusterTitle = parentCluster.title;
        console.log(`[Check Duplicates] Will exclude parent cluster title: "${parentClusterTitle}"`);
      }
    }

    const duplicates: {
      exactTitleMatch: any[];
      similarTitles: any[];
      exactSlugMatch: any[];
      similarContent: any[];
    } = {
      exactTitleMatch: [],
      similarTitles: [],
      exactSlugMatch: [],
      similarContent: []
    };

    // 1. Check for exact title match
    if (title) {
      let query = supabase
        .from('blog_posts')
        .select('id, title, slug, category, guide_type, is_published')
        .eq('category', 'learn-guide')
        .ilike('title', title);

      if (excludeId) {
        query = query.neq('id', excludeId);
      }

      const { data, error } = await query;

      if (error) {
        console.error('[Check Duplicates] Error checking title:', error);
      } else if (data && data.length > 0) {
        duplicates.exactTitleMatch = data;
      }
    }

    // 2. Check for similar titles (fuzzy matching)
    if (title && duplicates.exactTitleMatch.length === 0) {
      const normalizedTitle = title
        .toLowerCase()
        .replace(/[:\-–—,\.!?]/g, '')
        .trim();

      const keywords = normalizedTitle.split(/\s+/).filter((w: string) => w.length > 3);

      if (keywords.length > 0) {
        let query = supabase
          .from('blog_posts')
          .select('id, title, slug, category, guide_type, is_published')
          .eq('category', 'learn-guide');

        if (excludeId) {
          query = query.neq('id', excludeId);
        }

        const { data, error } = await query;

        if (!error && data) {
          const similar = data.filter(post => {
            // --- MODIFICATION: Exclude parent cluster from similarity check ---
            if (parentClusterTitle && post.title === parentClusterTitle) {
              return false;
            }

            const postTitleNormalized = post.title
              .toLowerCase()
              .replace(/[:\-–—,\.!?]/g, '')
              .trim();

            const matchingKeywords = keywords.filter((kw: string) =>
              postTitleNormalized.includes(kw)
            );

            return matchingKeywords.length >= Math.min(2, keywords.length);
          });

          if (similar.length > 0) {
            duplicates.similarTitles = similar;
          }
        }
      }
    }

    // 3. Check for exact slug match
    if (slug) {
      let query = supabase
        .from('blog_posts')
        .select('id, title, slug, category, guide_type, is_published')
        .eq('category', 'learn-guide')
        .eq('slug', slug);

      if (excludeId) {
        query = query.neq('id', excludeId);
      }

      const { data, error } = await query;

      if (error) {
        console.error('[Check Duplicates] Error checking slug:', error);
      } else if (data && data.length > 0) {
        duplicates.exactSlugMatch = data;
      }
    }

    // 4. Check for similar content (if content provided)
    if (content && content.length > 100) {
      const contentSample = content.substring(0, 500).toLowerCase();
      const contentKeywords = contentSample
        .replace(/[^\wа-яА-Я\s]/g, ' ')
        .split(/\s+/)
        .filter((w: string) => w.length > 4)
        .slice(0, 10);

      if (contentKeywords.length > 0) {
        let query = supabase
          .from('blog_posts')
          .select('id, title, slug, category, guide_type, is_published, content')
          .eq('category', 'learn-guide');

        if (excludeId) {
          query = query.neq('id', excludeId);
        }

        const { data, error } = await query;

        if (!error && data) {
          const similar = data.filter(post => {
            if (!post.content) return false;

            const postContentSample = post.content.substring(0, 500).toLowerCase();
            const matchingWords = contentKeywords.filter((kw: string) =>
              postContentSample.includes(kw)
            );

            return matchingWords.length >= contentKeywords.length * 0.5;
          });

          if (similar.length > 0) {
            duplicates.similarContent = similar.map(({ content, ...rest }) => rest);
          }
        }
      }
    }

    const totalDuplicates =
      duplicates.exactTitleMatch.length +
      duplicates.similarTitles.length +
      duplicates.exactSlugMatch.length +
      duplicates.similarContent.length;

    const hasDuplicates = totalDuplicates > 0;

    return NextResponse.json({
      success: true,
      hasDuplicates,
      totalDuplicates,
      duplicates,
      message: hasDuplicates
        ? `⚠️ Открити ${totalDuplicates} потенциални дублирания`
        : '✅ Няма открити дублирания'
    });

  } catch (error: any) {
    console.error('[Check Duplicates] Error:', error);
    return NextResponse.json(
      { error: error.message || 'Грешка при проверка за дублирания' },
      { status: 500 }
    );
  }
}
