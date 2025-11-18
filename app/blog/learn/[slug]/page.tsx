import { supabaseAdmin } from '@/lib/supabase';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { ClockIcon } from '@/components/ui/Icon';
import { Metadata } from 'next';
import TTSPlayerWrapper from '@/components/TTSPlayerWrapper';
import LearnSidebar from '@/components/LearnSidebar';

type Props = {
  params: Promise<{ slug: string }>;
};

// Generate metadata for SEO
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const supabase = supabaseAdmin;
  const { slug } = await params;

  const { data: guide } = await supabase
    .from('blog_posts')
    .select('title, meta_title, meta_description, featured_image_url, excerpt')
    .eq('slug', slug)
    .eq('category', 'learn-guide')
    .eq('is_published', true)
    .single();

  console.log('--- METADATA ---');
  console.log('Guide object in generateMetadata:', guide);
  console.log('Guide title in generateMetadata:', guide?.title);
  console.log('--- END METADATA ---');

  if (!guide) {
    return {
      title: 'Статия не е намерена | Бачо Илия',
    };
  }

  return {
    title: guide.meta_title || guide.title,
    description: guide.excerpt || guide.meta_description,
    openGraph: {
      title: guide.meta_title || guide.title,
      description: guide.excerpt || guide.meta_description,
      images: guide.featured_image_url ? [
        {
          url: guide.featured_image_url,
          width: 1200,
          height: 630,
          alt: guide.title,
        }
      ] : [],
      type: 'article',
      siteName: 'Бачо Илия',
      locale: 'bg_BG',
    },
    twitter: {
      card: 'summary_large_image',
      title: guide.meta_title || guide.title,
      description: guide.excerpt || guide.meta_description,
      images: guide.featured_image_url ? [guide.featured_image_url] : [],
    },
  };
}

export default async function LearnGuidePage({ params }: Props) {
  const supabase = supabaseAdmin;
  const { slug } = await params;

  // Fetch the guide
  const { data: guide, error } = await supabase
    .from('blog_posts')
    .select('*')
    .eq('slug', slug)
    .eq('category', 'learn-guide')
    .eq('is_published', true)
    .single();

  if (error || !guide) {
    notFound();
  }

  console.log('--- PAGE COMPONENT ---');
  console.log('Guide object in LearnGuidePage:', guide);
  console.log('Guide title in LearnGuidePage:', guide?.title);
  console.log('--- END PAGE COMPONENT ---');

  // Increment view count
  await supabase.rpc('increment_blog_post_views', { post_slug: slug });

  // Fetch related guides (same category)
  const { data: relatedGuidesData } = await supabase
    .from('blog_posts')
    .select('title, slug, excerpt, featured_image_url, guide_type')
    .eq('category', 'learn-guide')
    .eq('guide_category', guide.guide_category)
    .eq('is_published', true)
    .neq('slug', slug)
    .limit(3);

  const relatedGuides = relatedGuidesData || [];

  // --- TTS Data Preparation ---
  // Extract plain text for the TTS player
  const plainTextContent = guide.content
    .replace(/<[^>]*>/g, ' ') // Replace all HTML tags with a space
    .replace(/\s+/g, ' ')      // Collapse whitespace
    .trim();
  
  // Calculate read time (rough estimate: 200 words per minute)
  const wordCount = plainTextContent.split(' ').length;
  const readTime = Math.ceil(wordCount / 200);

  // --- Content Modification for Ingredients ---
  let content = guide.content;
  const ingredientsRegex = /(<h2[^>]*>Необходими продукти:?<\/h2>\s*<ul[^>]*>[\s\S]*?<\/ul>)/i;
  content = content.replace(ingredientsRegex, (match: string) => {
    // This wraps the matched ingredients section (h2 + ul) in a styled div
    return `<div class="ingredients-section bg-amber-50 bg-opacity-50 p-6 rounded-lg shadow-inner border border-amber-200">${match}</div>`;
  });

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#F5E6D3] to-white">
      {/* Breadcrumbs */}
      <div className="container mx-auto px-4 py-6">
        <nav className="flex items-center gap-2 text-sm text-gray-600">
          <Link href="/" className="hover:text-[#8B4513] transition-colors">
            Начало
          </Link>
          <span>/</span>
          <Link href="/blog" className="hover:text-[#8B4513] transition-colors">
            Блог
          </Link>
          <span>/</span>
          <Link href="/blog/learn" className="hover:text-[#8B4513] transition-colors">
            Образователни статии
          </Link>
          <span>/</span>
          <span className="text-gray-900 font-medium">{guide.title}</span>
        </nav>
      </div>

      {/* Two-column layout: Sidebar + Content */}
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-[320px_1fr] gap-8">
          {/* Sidebar - left column */}
          <div className="lg:sticky lg:top-4 lg:self-start">
            <LearnSidebar />
          </div>

          {/* Article Content - right column */}
          <article className="max-w-4xl">
        {/* Category Badge */}
        <div className="mb-4">
          <span className="inline-block px-4 py-2 bg-[#8B4513] text-white rounded-full text-sm font-medium">
            {guide.guide_type === 'cluster' ? '📚 Обзорна статия' : '📖 Задълбочена статия'}
          </span>
        </div>

        {/* Title */}
        <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6 leading-tight font-['Amatic_SC']">
          {guide.title}
        </h1>

        {/* Meta info */}
        <div className="flex items-center gap-6 text-gray-600 mb-8">
          <div className="flex items-center gap-2">
            <ClockIcon className="w-5 h-5" />
            <span>{readTime} мин четене</span>
          </div>
          <span>•</span>
          <span>{new Date(guide.published_at || guide.created_at).toLocaleDateString('bg-BG', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
          })}</span>
          <span>•</span>
          <span>{guide.view_count || 0} прегледа</span>
        </div>

        {/* TTS Player */}
        <TTSPlayerWrapper text={plainTextContent} />

        {/* Featured Image */}
        {guide.featured_image_url && (
          <div className="my-8 rounded-xl overflow-hidden shadow-lg">
            <img
              src={guide.featured_image_url}
              alt={guide.title}
              className="w-full h-auto"
            />
          </div>
        )}

        {/* Content */}
        <div
          className="prose prose-lg max-w-none
            prose-headings:font-['Amatic_SC'] prose-headings:text-[#8B4513] prose-headings:font-bold
            prose-h2:text-3xl md:prose-h2:text-4xl prose-h2:mt-16 prose-h2:mb-8 prose-h2:pt-8 prose-h2:border-t-2 prose-h2:border-[#F5E6D3]
            prose-h3:text-3xl prose-h3:mt-12 prose-h3:mb-6
            prose-p:text-gray-700 prose-p:leading-relaxed prose-p:mb-6 prose-p:text-lg
            prose-a:text-[#8B4513] prose-a:no-underline hover:prose-a:underline
            prose-strong:text-gray-900 prose-strong:font-semibold
            prose-ul:my-8 prose-ul:space-y-3 prose-li:text-gray-700 prose-li:text-lg
            prose-img:rounded-lg prose-img:shadow-md prose-img:my-8
            prose-table:border-collapse prose-table:w-full prose-table:my-8 prose-table:shadow-md
            prose-th:bg-[#8B4513] prose-th:text-white prose-th:p-4 prose-th:text-left prose-th:font-semibold
            prose-td:border prose-td:border-gray-300 prose-td:p-4 prose-td:bg-white
            prose-blockquote:border-l-4 prose-blockquote:border-[#8B4513] prose-blockquote:pl-4 prose-blockquote:italic prose-blockquote:text-gray-600"
          dangerouslySetInnerHTML={{ __html: content }}
        />

        {/* Related Guides */}
        {relatedGuides.length > 0 && (
          <div className="mt-16 pt-8 border-t border-gray-200">
            <h2 className="text-3xl font-bold text-gray-900 mb-6 font-['Amatic_SC']">
              Свързани статии
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {relatedGuides.map((related) => (
                <Link
                  key={related.slug}
                  href={`/blog/learn/${related.slug}`}
                  className="group block bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow"
                >
                  {related.featured_image_url && (
                    <div className="aspect-video overflow-hidden">
                      <img
                        src={related.featured_image_url}
                        alt={related.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                      />
                    </div>
                  )}
                  <div className="p-4">
                    <h3 className="font-bold text-lg mb-2 group-hover:text-[#8B4513] transition-colors">
                      {related.title}
                    </h3>
                    {related.excerpt && (
                      <p className="text-sm text-gray-600 line-clamp-2">
                        {related.excerpt}
                      </p>
                    )}
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}

        {/* Back to Learn */}
        <div className="mt-12 text-center">
          <Link
            href="/blog/learn"
            className="inline-block px-8 py-3 bg-[#8B4513] text-white rounded-lg font-medium hover:bg-[#6D3610] transition-colors"
          >
            ← Всички образователни статии
          </Link>
        </div>
          </article>
        </div>
      </div>
    </div>
  );
}

