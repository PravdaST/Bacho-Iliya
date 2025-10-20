"use client";

import { useParams } from "next/navigation";
import { motion } from "framer-motion";
import Link from "next/link";
import { ClockIcon } from "@/components/ui/Icon";

const blogPosts = [
  {
    id: 1,
    title: "Тайната на истинското кисело мляко",
    excerpt: "От селското огнище до вашата трапеза - как Бачо Илия запазва традицията.",
    slug: "taynata-na-kiseloto-mlyako",
    category: "Традиции",
    date: "15 Октомври 2024",
    readTime: "5 мин четене",
    image: "/blog/kiselo-mlyako.webp",
    author: "Екипът на Бачо Илия",
    content: "Българското кисело мляко е световно известно. От 1970 година Бачо Илия запазва традицията."
  },
  {
    id: 2,
    title: "Баницата - българската кулинарна емблема",
    excerpt: "Защо баницата е повече от храна и как да я направите перфектна.",
    slug: "banicata-bulgarska-emblema",
    category: "Рецепти",
    date: "10 Октомври 2024",
    readTime: "8 мин четене",
    image: "/blog/banica.webp",
    author: "Екипът на Бачо Илия",
    content: "Баницата е символ на българската кухня. Класическа рецепта с продуктите на Бачо Илия."
  },
  {
    id: 3,
    title: "Историята на Бачо Илия",
    excerpt: "От малка селска ферма в Родопите до национална марка.",
    slug: "istoriyata-na-bacho-iliya",
    category: "За нас",
    date: "5 Октомври 2024",
    readTime: "6 мин четене",
    image: "/blog/rodopi.webp",
    author: "Екипът на Бачо Илия",
    content: "Всичко започна през 1970 година в Родопите. От 3 крави до национална марка."
  },
  {
    id: 4,
    title: "Сирене - българското бяло злато",
    excerpt: "Какво прави българското сирене толкова специално?",
    slug: "sirene-byalo-zlato",
    category: "Продукти",
    date: "1 Октомври 2024",
    readTime: "7 мин четене",
    image: "/blog/sirene.webp",
    author: "Екипът на Бачо Илия",
    content: "Българското бяло сирене е саламурено сирене с векова традиция."
  },
  {
    id: 5,
    title: "Таратор - летният български символ",
    excerpt: "Студената супа, която завладява света.",
    slug: "tarator-leten-simvol",
    category: "Рецепти",
    date: "25 Септември 2024",
    readTime: "5 мин четене",
    image: "/blog/tarator.webp",
    author: "Екипът на Бачо Илия",
    content: "Таратор е студената супа. Класическа рецепта с кисело мляко Бачо Илия."
  },
  {
    id: 6,
    title: "Кашкавал - вкусът на България",
    excerpt: "От овчето мляко до масата - истинският български кашкавал.",
    slug: "kashkaval-vkusat-na-bulgaria",
    category: "Продукти",
    date: "20 Септември 2024",
    readTime: "6 мин четене",
    image: "/blog/kashkaval.webp",
    author: "Екипът на Бачо Илия",
    content: "Българският кашкавал е зряло сирене. Зрее минимум 3 месеца."
  }
];

export default function BlogPostPage() {
  const params = useParams();
  const slug = params.slug as string;
  const post = blogPosts.find(p => p.slug === slug);

  if (!post) {
    return (
      <div className="min-h-screen bg-old-paper flex items-center justify-center pt-32">
        <div className="text-center">
          <h1 className="font-handwritten text-4xl text-walnut mb-4">Статията не е намерена</h1>
          <Link href="/blog" className="text-bulgarian-red font-handwritten hover:underline">
            Обратно към блога
          </Link>
        </div>
      </div>
    );
  }

  const relatedPosts = blogPosts.filter(p => p.id !== post.id).slice(0, 2);

  return (
    <div className="min-h-screen bg-old-paper relative overflow-hidden">
      <div className="absolute inset-0 bg-vintage-paper opacity-20 pointer-events-none" />

      <div className="relative pt-32 pb-20 px-4 sm:px-6 lg:px-8">
        <article className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="mb-8"
          >
            <Link href="/blog" className="inline-flex items-center gap-2 text-bulgarian-red font-handwritten hover:underline">
              <span>←</span>
              <span>Обратно към блога</span>
            </Link>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-8"
          >
            <div className="mb-4">
              <span className="inline-block bg-bulgarian-red text-white px-4 py-1 text-sm font-handwritten tracking-wider">
                {post.category}
              </span>
            </div>

            <h1 className="font-handwritten text-4xl md:text-6xl text-bulgarian-red mb-6 leading-tight">
              {post.title}
            </h1>

            <div className="flex flex-wrap items-center gap-4 text-walnut/70 font-handwritten">
              <span>{post.date}</span>
              <span>•</span>
              <div className="flex items-center gap-2">
                <ClockIcon size={16} />
                <span>{post.readTime}</span>
              </div>
              <span>•</span>
              <span>{post.author}</span>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="mb-12 relative h-[400px] bg-walnut/10 border-2 border-walnut/20 flex items-center justify-center"
          >
            <span className="font-handwritten text-walnut/30 text-6xl">
              {post.title.substring(0, 1)}
            </span>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="prose prose-lg max-w-none mb-16"
          >
            <div className="font-handwritten text-2xl text-walnut/90 leading-relaxed">
              <p>{post.content}</p>
            </div>
          </motion.div>

          <div className="my-16 h-px bg-gradient-to-r from-transparent via-bulgarian-red/30 to-transparent" />

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            <h2 className="font-handwritten text-3xl text-walnut mb-6">Още статии</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {relatedPosts.map(relatedPost => (
                <Link
                  key={relatedPost.id}
                  href={`/blog/${relatedPost.slug}`}
                  className="block bg-white p-6 border-2 border-walnut/20 hover:shadow-xl transition-shadow"
                >
                  <div className="mb-3">
                    <span className="inline-block bg-bulgarian-red text-white px-3 py-1 text-xs font-handwritten tracking-wider">
                      {relatedPost.category}
                    </span>
                  </div>
                  <h3 className="font-handwritten text-2xl text-walnut mb-2">
                    {relatedPost.title}
                  </h3>
                  <p className="font-handwritten text-walnut/70 text-base">
                    {relatedPost.excerpt}
                  </p>
                  <div className="mt-4 flex items-center gap-2 text-bulgarian-red font-handwritten text-base">
                    <span>Прочети повече</span>
                    <span>→</span>
                  </div>
                </Link>
              ))}
            </div>
          </motion.div>
        </article>
      </div>
    </div>
  );
}
