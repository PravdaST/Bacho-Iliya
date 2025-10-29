'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { ClockIcon } from '@/components/ui/Icon';

const blogPosts = [
  {
    id: 1,
    title: 'Тайните на перфектната домашна лютеница: Вкусът, който ни връща в детството',
    excerpt:
      'Всяка есен, когато първите студени ветрове започнат да напомнят за себе си, въздухът в българските дворове се изпълва с един неповторим, сладникав и леко опушен аромат. Това е ароматът на лютеницата – не просто зимнина, а истински символ на българския дом.',
    slug: 'taynite-na-lyutenicata',
    category: 'Бабини рецепти',
    date: '27 Октомври 2024',
    readTime: '5 мин четене',
    image: '/blog/lutenitsa-on-bread.png',
  },
];

const categories = ['Всички', 'Бабини рецепти'];

export default function BlogPage() {
  return (
    <div className="bg-old-paper relative min-h-screen overflow-hidden">
      {/* Paper texture */}
      <div className="bg-vintage-paper pointer-events-none absolute inset-0 opacity-20" />

      <div className="relative px-4 pt-32 pb-20 sm:px-6 lg:px-8">
        {/* Hero Section */}
        <motion.div
          className="mx-auto mb-16 max-w-7xl text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <motion.div
            className="bg-bulgarian-red font-handwritten mb-6 inline-block px-6 py-2 text-sm tracking-wider text-white"
            initial={{ scale: 0.9 }}
            animate={{ scale: 1 }}
          >
            БЛОГ
          </motion.div>

          <h1 className="font-handwritten text-bulgarian-red mb-6 text-5xl leading-tight md:text-6xl">
            Истории от българското село
          </h1>

          <p className="font-handwritten text-walnut mx-auto max-w-3xl text-xl leading-relaxed">
            Традиции, рецепти и тайни от кухнята на Бачо Илия
          </p>
        </motion.div>

        {/* Blog Grid */}
        <div className="mx-auto max-w-7xl">
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
            {blogPosts.map((post, index) => (
              <motion.article
                key={post.id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="border-walnut/20 group overflow-hidden border-2 bg-white shadow-xl transition-all duration-300 hover:shadow-2xl"
              >
                {/* Blog Post Image */}
                <div className="relative h-56 overflow-hidden">
                  <img
                    src={post.image}
                    alt={post.title}
                    className="h-full w-full object-cover"
                  />
                  {/* Category Badge */}
                  <div className="bg-bulgarian-red font-handwritten absolute top-3 left-3 px-3 py-1 text-xs tracking-wider text-white">
                    {post.category}
                  </div>
                </div>

                {/* Content */}
                <div className="p-6">
                  {/* Date & Read Time */}
                  <div className="text-walnut/60 font-handwritten mb-3 flex items-center gap-3 text-sm">
                    <span>{post.date}</span>
                    <span>•</span>
                    <div className="flex items-center gap-1">
                      <ClockIcon size={14} />
                      <span>{post.readTime}</span>
                    </div>
                  </div>

                  {/* Title */}
                  <h2 className="font-handwritten text-walnut group-hover:text-bulgarian-red mb-3 text-2xl leading-tight transition-colors">
                    {post.title}
                  </h2>

                  {/* Excerpt */}
                  <p className="font-handwritten text-walnut/80 mb-4 text-lg leading-relaxed">
                    {post.excerpt}
                  </p>

                  {/* Read More Link */}
                  <Link
                    href={`/blog/${post.slug}`}
                    className="text-bulgarian-red font-handwritten inline-flex items-center gap-2 text-base transition-all hover:gap-3"
                  >
                    <span>Прочети повече</span>
                    <span>→</span>
                  </Link>
                </div>

                {/* Decorative corner */}
                <div className="bg-sunflower/50 absolute right-2 bottom-2 h-2 w-2 rounded-full" />
              </motion.article>
            ))}
          </div>

          {/* Coming Soon Note */}
          <motion.div
            className="bg-sunflower/10 border-sunflower/30 mx-auto mt-16 max-w-2xl border-2 p-8 text-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
          >
            <p className="font-handwritten text-walnut mb-2 text-2xl">Скоро още истории!</p>
            <p className="font-handwritten text-walnut/70">
              Работим по нови статии за вас. Следете блога за още рецепти, традиции и новини от Бачо
              Илия.
            </p>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
