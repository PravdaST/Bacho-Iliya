import { supabaseAdmin } from '@/lib/supabase';
import Link from 'next/link';

// Mapping of categories to Bulgarian names
const categoryNames: Record<string, string> = {
  'recipes': 'Рецепти',
  'health': 'Здраве',
  'culture': 'Култура',
  'products': 'Продукти',
  'tradition': 'Традиции',
  'guides': 'Ръководства'
};

export default async function LearnSidebar() {
  const supabase = supabaseAdmin;

  // Fetch most viewed articles (топ 5)
  const { data: topArticles } = await supabase
    .from('blog_posts')
    .select('title, slug, view_count, featured_image_url')
    .eq('category', 'learn-guide')
    .eq('is_published', true)
    .order('view_count', { ascending: false })
    .limit(5);

  // Fetch categories with article count
  const { data: categoriesData } = await supabase
    .from('blog_posts')
    .select('guide_category')
    .eq('category', 'learn-guide')
    .eq('is_published', true);

  // Count articles per category
  const categoryCounts = categoriesData?.reduce((acc, post) => {
    const cat = post.guide_category;
    if (cat) {
      acc[cat] = (acc[cat] || 0) + 1;
    }
    return acc;
  }, {} as Record<string, number>);

  const categories = categoryCounts ? Object.entries(categoryCounts) : [];

  return (
    <aside className="space-y-8">
      {/* Най-четени статии */}
      <div className="bg-white rounded-lg shadow-md p-6 border-2 border-[#F5E6D3]">
        <h3 className="text-2xl font-bold text-[#8B4513] mb-4 font-['Amatic_SC']">
          📖 Най-четени
        </h3>
        <div className="space-y-4">
          {topArticles && topArticles.length > 0 ? (
            topArticles.map((article, index) => (
              <Link
                key={article.slug}
                href={`/blog/learn/${article.slug}`}
                className="group block hover:bg-[#F5E6D3] p-2 rounded-lg transition-colors"
              >
                <div className="flex gap-3">
                  <span className="text-2xl font-bold text-[#8B4513] font-['Amatic_SC'] flex-shrink-0">
                    {index + 1}.
                  </span>
                  <div className="flex-1">
                    <p className="text-sm font-medium text-gray-900 group-hover:text-[#8B4513] transition-colors line-clamp-2">
                      {article.title}
                    </p>
                    <p className="text-xs text-gray-500 mt-1">
                      {article.view_count || 0} прегледа
                    </p>
                  </div>
                </div>
              </Link>
            ))
          ) : (
            <p className="text-sm text-gray-500 italic">Няма налични статии</p>
          )}
        </div>
      </div>

      {/* Категории */}
      <div className="bg-white rounded-lg shadow-md p-6 border-2 border-[#F5E6D3]">
        <h3 className="text-2xl font-bold text-[#8B4513] mb-4 font-['Amatic_SC']">
          🏷️ Категории
        </h3>
        <div className="space-y-2">
          {categories && categories.length > 0 ? (
            categories
              .sort((a, b) => b[1] - a[1]) // Sort by count descending
              .map(([cat, count]) => (
                <Link
                  key={cat}
                  href={`/blog/learn?category=${cat}`}
                  className="flex items-center justify-between p-2 rounded-lg hover:bg-[#F5E6D3] transition-colors group"
                >
                  <span className="text-sm font-medium text-gray-700 group-hover:text-[#8B4513] transition-colors">
                    {categoryNames[cat] || cat}
                  </span>
                  <span className="text-xs bg-[#8B4513] text-white px-2 py-1 rounded-full">
                    {count}
                  </span>
                </Link>
              ))
          ) : (
            <p className="text-sm text-gray-500 italic">Няма категории</p>
          )}
        </div>
        <Link
          href="/blog/learn"
          className="block mt-4 pt-4 border-t border-gray-200 text-sm text-center text-[#8B4513] hover:underline font-medium"
        >
          Всички статии →
        </Link>
      </div>

      {/* Форма за абониране */}
      <div className="bg-gradient-to-br from-[#8B4513] to-[#6D3610] rounded-lg shadow-lg p-6 text-white">
        <div className="text-center mb-4">
          <div className="text-4xl mb-2">📬</div>
          <h3 className="text-2xl font-bold font-['Amatic_SC']">
            Абонирай се
          </h3>
          <p className="text-sm text-gray-200 mt-2">
            Получавай нови статии директно в пощата
          </p>
        </div>
        <form
          action="https://submit-form.com/YOUR_FORM_ID"
          method="POST"
          className="space-y-3"
        >
          <input
            type="email"
            name="email"
            required
            placeholder="Твоят имейл"
            className="w-full px-4 py-2 rounded-lg border-2 border-white/30 bg-white/10 text-white placeholder-gray-300 focus:outline-none focus:border-white focus:bg-white/20 transition-colors"
          />
          <button
            type="submit"
            className="w-full px-4 py-2 bg-white text-[#8B4513] rounded-lg font-medium hover:bg-gray-100 transition-colors shadow-md"
          >
            Абонирай се
          </button>
          <p className="text-xs text-center text-gray-300">
            Без спам. Отписване по всяко време.
          </p>
        </form>
      </div>

      {/* Допълнителна информация */}
      <div className="bg-amber-50 bg-opacity-50 rounded-lg p-6 border border-amber-200">
        <h4 className="text-lg font-bold text-[#8B4513] mb-3 font-['Amatic_SC']">
          💡 За тази секция
        </h4>
        <p className="text-sm text-gray-700 leading-relaxed">
          Образователните ни статии са създадени, за да споделят знания за традиционните български млечни продукти,
          рецепти и кулинарни техники.
        </p>
      </div>
    </aside>
  );
}
