import { supabaseAdmin } from '@/lib/supabase';
import Link from 'next/link';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Образователни статии | Бачо Илия',
  description: 'Научете повече за млечните продукти, традиционни рецепти и здравословно хранене от експертите на Бачо Илия',
  openGraph: {
    title: 'Образователни статии | Бачо Илия',
    description: 'Научете повече за млечните продукти, традиционни рецепти и здравословно хранене',
    type: 'website',
  },
};

type CategoryFilter = 'all' | 'dairy-products' | 'recipes' | 'health' | 'culture' | 'products' | 'tradition';

// Bulgarian display names for categories (must match backend CATEGORY_LABELS)
const CATEGORY_LABELS_BG: Record<string, string> = {
  'Млечни продукти': 'Млечни продукти',
  'Рецепти': 'Рецепти',
  'Здраве': 'Здраве',
  'Култура': 'Култура',
  'Продукти': 'Продукти',
  'Традиции': 'Традиции',
  'Гид-ове': 'Гид-ове'
};

// Reverse mapping: Bulgarian -> English slug
const CATEGORY_SLUG_MAP: Record<string, string> = {
  'Млечни продукти': 'dairy-products',
  'Рецепти': 'recipes',
  'Здраве': 'health',
  'Култура': 'culture',
  'Продукти': 'products',
  'Традиции': 'tradition',
  'Гид-ове': 'guides'
};

// English slug -> Bulgarian display name
const CATEGORY_LABELS: Record<CategoryFilter, string> = {
  all: 'Всички',
  'dairy-products': 'Млечни продукти',
  recipes: 'Рецепти',
  health: 'Здраве',
  culture: 'Култура',
  products: 'Продукти',
  tradition: 'Традиции',
};

// Category emoji icons for placeholder images
const CATEGORY_EMOJIS: Record<string, string> = {
  'Млечни продукти': '🥛',
  'Рецепти': '🍲',
  'Здраве': '💪',
  'Култура': '🏛️',
  'Продукти': '🧀',
  'Традиции': '🌾',
};

export default async function LearnIndexPage({
  searchParams,
}: {
  searchParams: Promise<{ category?: CategoryFilter }>;
}) {
  const supabase = supabaseAdmin;
  const params = await searchParams;
  const selectedCategory = params.category || 'all';

  // Build query
  let query = supabase
    .from('blog_posts')
    .select('*')
    .eq('category', 'learn-guide')
    .eq('is_published', true)
    .order('published_at', { ascending: false });

  // Filter by category if not 'all'
  // Convert English slug to Bulgarian name for database query
  if (selectedCategory !== 'all') {
    const categoryBg = CATEGORY_LABELS[selectedCategory];
    if (categoryBg) {
      query = query.eq('guide_category', categoryBg);
    }
  }

  const { data: guidesData } = await query;
  const guides = guidesData || [];

  // Count by category (guide_category is in Bulgarian in DB)
  const { data: categoryCountsData } = await supabase
    .from('blog_posts')
    .select('guide_category')
    .eq('category', 'learn-guide')
    .eq('is_published', true);

  const categoryCounts = categoryCountsData || [];

  // Count and convert Bulgarian category names to English slugs
  const counts = categoryCounts.reduce((acc: Record<string, number>, item) => {
    const catBg = item.guide_category || 'other';
    const catSlug = CATEGORY_SLUG_MAP[catBg] || catBg;
    acc[catSlug] = (acc[catSlug] || 0) + 1;
    return acc;
  }, {});

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#F5E6D3] to-white">
      {/* Hero Section */}
      <div className="bg-[#8B4513] text-white py-16">
        <div className="container mx-auto px-4">
          <h1 className="text-5xl md:text-6xl font-bold mb-4 font-['Amatic_SC']">
            📚 Образователни статии
          </h1>
          <p className="text-xl md:text-2xl text-[#F5E6D3] max-w-3xl">
            Научете повече за млечните продукти, традиционни български рецепти и здравословно хранене
          </p>
        </div>
      </div>

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
          <span className="text-gray-900 font-medium">Образователни статии</span>
        </nav>
      </div>

      <div className="container mx-auto px-4 py-12">
        {/* Navigation Tabs */}
        <div className="mb-12 flex justify-center gap-4">
          <Link
            href="/blog"
            className="font-['Amatic_SC'] border-2 border-[#8B4513] text-[#8B4513] bg-white px-8 py-3 text-xl shadow-md transition-all hover:bg-[#8B4513] hover:text-white hover:shadow-lg"
          >
            📖 Блог статии
          </Link>
          <Link
            href="/blog/learn"
            className="font-['Amatic_SC'] bg-[#8B4513] px-8 py-3 text-xl text-white shadow-md transition-all hover:shadow-lg"
          >
            📚 Библиотека
          </Link>
        </div>

        {/* Category Filter */}
        <div className="mb-12">
          <div className="flex flex-wrap gap-3">
            {(Object.keys(CATEGORY_LABELS) as CategoryFilter[]).map((cat) => {
              const count = cat === 'all' ? guides.length : counts[cat] || 0;
              const isActive = selectedCategory === cat;

              return (
                <Link
                  key={cat}
                  href={cat === 'all' ? '/blog/learn' : `/blog/learn?category=${cat}`}
                  className={`px-6 py-3 rounded-full font-medium transition-all ${
                    isActive
                      ? 'bg-[#8B4513] text-white shadow-lg'
                      : 'bg-white text-gray-700 hover:bg-[#F5E6D3] hover:shadow-md'
                  }`}
                >
                  {CATEGORY_LABELS[cat]} ({count})
                </Link>
              );
            })}
          </div>
        </div>

        {/* Guides Grid */}
        {guides.length === 0 ? (
          <div className="text-center py-16">
            <p className="text-xl text-gray-600">
              Все още няма образователни статии в тази категория.
            </p>
            <Link
              href="/blog/learn"
              className="inline-block mt-6 px-6 py-3 bg-[#8B4513] text-white rounded-lg hover:bg-[#6D3610] transition-colors"
            >
              Виж всички статии
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {guides.map((guide) => {
              const wordCount = guide.content.replace(/<[^>]*>/g, '').split(/\s+/).length;
              const readTime = Math.ceil(wordCount / 200);

              return (
                <Link
                  key={guide.slug}
                  href={`/blog/learn/${guide.slug}`}
                  className="group block bg-white rounded-xl shadow-md overflow-hidden hover:shadow-2xl transition-all hover:-translate-y-1"
                >
                  {/* Featured Image */}
                  <div className="aspect-video overflow-hidden bg-gradient-to-br from-[#F5E6D3] to-[#E6D5C3]">
                    {guide.featured_image_url ? (
                      <img
                        src={guide.featured_image_url}
                        alt={guide.title}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-8xl">
                        {CATEGORY_EMOJIS[guide.guide_category] || '📚'}
                      </div>
                    )}
                  </div>

                  <div className="p-6">
                    {/* Badge */}
                    <div className="flex items-center gap-2 mb-3">
                      <span className="px-3 py-1 bg-[#F5E6D3] text-[#8B4513] rounded-full text-xs font-medium">
                        {guide.guide_type === 'cluster' ? '📚 Обзорна' : '📖 Задълбочена'}
                      </span>
                      <span className="px-3 py-1 bg-gray-100 text-gray-600 rounded-full text-xs">
                        {CATEGORY_LABELS_BG[guide.guide_category] || guide.guide_category}
                      </span>
                    </div>

                    {/* Title */}
                    <h2 className="text-2xl font-bold text-gray-900 mb-3 group-hover:text-[#8B4513] transition-colors font-['Amatic_SC'] line-clamp-2">
                      {guide.title}
                    </h2>

                    {/* Excerpt */}
                    {guide.excerpt && (
                      <p className="text-gray-600 mb-4 line-clamp-3">
                        {guide.excerpt}
                      </p>
                    )}

                    {/* Meta */}
                    <div className="flex items-center gap-4 text-sm text-gray-500">
                      <span>{readTime} мин</span>
                      <span>•</span>
                      <span>{guide.view_count || 0} прегледа</span>
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        )}

        {/* CTA Section */}
        <div className="mt-16 bg-[#F5E6D3] rounded-2xl p-8 md:p-12 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4 font-['Amatic_SC']">
            Искате да научите повече?
          </h2>
          <p className="text-lg text-gray-700 mb-6 max-w-2xl mx-auto">
            Следете ни за нови образователни статии за млечните продукти, традиционни рецепти и здравословно хранене
          </p>
          <Link
            href="/blog"
            className="inline-block px-8 py-4 bg-[#8B4513] text-white rounded-lg font-medium hover:bg-[#6D3610] transition-colors"
          >
            Виж блога
          </Link>
        </div>
      </div>
    </div>
  );
}
