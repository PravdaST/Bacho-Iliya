"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ClockIcon } from "@/components/ui/Icon";

const blogPosts = [
  {
    id: 1,
    title: "Тайните на перфектната домашна лютеница: Вкусът, който ни връща в детството",
    excerpt: "Всяка есен, когато първите студени ветрове започнат да напомнят за себе си, въздухът в българските дворове се изпълва с един неповторим, сладникав и леко опушен аромат. Това е ароматът на лютеницата – не просто зимнина, а истински символ на българския дом.",
    slug: "taynite-na-lyutenicata",
    category: "Бабини рецепти",
    date: "27 Октомври 2024",
    readTime: "5 мин четене",
    image: "/blog/lyutenica.webp",
  },
];

const categories = ["Всички", "Бабини рецепти"];

export default function BlogPage() {
  return (
    <div className="min-h-screen bg-old-paper relative overflow-hidden">
      {/* Paper texture */}
      <div className="absolute inset-0 bg-vintage-paper opacity-20 pointer-events-none" />

      <div className="relative pt-32 pb-20 px-4 sm:px-6 lg:px-8">
        {/* Hero Section */}
        <motion.div
          className="max-w-7xl mx-auto mb-16 text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <motion.div
            className="inline-block bg-bulgarian-red text-white px-6 py-2 font-handwritten text-sm tracking-wider mb-6"
            initial={{ scale: 0.9 }}
            animate={{ scale: 1 }}
          >
            БЛОГ
          </motion.div>

          <h1 className="font-handwritten text-bulgarian-red mb-6 text-5xl md:text-6xl leading-tight">
            Истории от българското село
          </h1>

          <p className="font-handwritten text-walnut text-xl max-w-3xl mx-auto leading-relaxed">
            Традиции, рецепти и тайни от кухнята на Бачо Илия
          </p>
        </motion.div>

        {/* Blog Grid */}
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {blogPosts.map((post, index) => (
              <motion.article
                key={post.id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-white border-2 border-walnut/20 shadow-xl hover:shadow-2xl transition-all duration-300 group overflow-hidden"
              >
                {/* Blog Post Image */}
                <div className="relative h-56 overflow-hidden bg-old-paper">
                  <div className="absolute inset-0 bg-walnut/10" />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="font-handwritten text-walnut/30 text-4xl">
                      {post.title.substring(0, 2)}
                    </span>
                  </div>

                  {/* Category Badge */}
                  <div className="absolute top-3 left-3 bg-bulgarian-red text-white px-3 py-1 text-xs font-handwritten tracking-wider">
                    {post.category}
                  </div>
                </div>

                {/* Content */}
                <div className="p-6">
                  {/* Date & Read Time */}
                  <div className="flex items-center gap-3 mb-3 text-walnut/60 text-sm font-handwritten">
                    <span>{post.date}</span>
                    <span>•</span>
                    <div className="flex items-center gap-1">
                      <ClockIcon size={14} />
                      <span>{post.readTime}</span>
                    </div>
                  </div>

                  {/* Title */}
                  <h2 className="font-handwritten text-2xl text-walnut mb-3 group-hover:text-bulgarian-red transition-colors leading-tight">
                    {post.title}
                  </h2>

                  {/* Excerpt */}
                  <p className="font-handwritten text-walnut/80 text-lg leading-relaxed mb-4">
                    {post.excerpt}
                  </p>

                  {/* Read More Link */}
                  <Link
                    href={`/blog/${post.slug}`}
                    className="inline-flex items-center gap-2 text-bulgarian-red font-handwritten text-base hover:gap-3 transition-all"
                  >
                    <span>Прочети повече</span>
                    <span>→</span>
                  </Link>
                </div>

                {/* Decorative corner */}
                <div className="absolute bottom-2 right-2 w-2 h-2 bg-sunflower/50 rounded-full" />
              </motion.article>
            ))}
          </div>

          {/* Coming Soon Note */}
          <motion.div
            className="mt-16 max-w-2xl mx-auto text-center bg-sunflower/10 p-8 border-2 border-sunflower/30"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
          >
            <p className="font-handwritten text-2xl text-walnut mb-2">
              Скоро още истории!
            </p>
            <p className="font-handwritten text-walnut/70">
              Работим по нови статии за вас. Следете блога за още рецепти, традиции и новини от Бачо Илия.
            </p>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
