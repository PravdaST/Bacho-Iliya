"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ClockIcon } from "@/components/ui/Icon";

const blogPosts = [
  {
    id: 1,
    title: "Тайната на истинското кисело мляко",
    excerpt: "От селското огнище до вашата трапеза - как Бачо Илия запазва традицията на автентичното българско кисело мляко вече 50 години.",
    slug: "taynata-na-kiseloto-mlyako",
    category: "Традиции",
    date: "15 Октомври 2024",
    readTime: "5 мин четене",
    image: "/blog/kiselo-mlyako.webp",
  },
  {
    id: 2,
    title: "Баницата - българската кулинарна емблема",
    excerpt: "Защо баницата е повече от храна и как да я направите перфектна с продуктите на Бачо Илия. Рецепти от нашите баби.",
    slug: "banicata-bulgarska-emblema",
    category: "Рецепти",
    date: "10 Октомври 2024",
    readTime: "8 мин четене",
    image: "/blog/banica.webp",
  },
  {
    id: 3,
    title: "Историята на Бачо Илия",
    excerpt: "От малка селска ферма в Родопите до национална марка - пътят на Бачо Илия през годините на традиция и качество.",
    slug: "istoriyata-na-bacho-iliya",
    category: "За нас",
    date: "5 Октомври 2024",
    readTime: "6 мин четене",
    image: "/blog/rodopi.webp",
  },
  {
    id: 4,
    title: "Сирене - българското бяло злато",
    excerpt: "Какво прави българското сирене толкова специално? Разгадаваме мистерията зад неговия уникален вкус и аромат.",
    slug: "sirene-byalo-zlato",
    category: "Продукти",
    date: "1 Октомври 2024",
    readTime: "7 мин четене",
    image: "/blog/sirene.webp",
  },
  {
    id: 5,
    title: "Таратор - летният българин символ",
    excerpt: "Студената супа, която завладява света. История, рецепта и здравни ползи на най-любимото ни лятно ястие.",
    slug: "tarator-leten-simvol",
    category: "Рецепти",
    date: "25 Септември 2024",
    readTime: "5 мин четене",
    image: "/blog/tarator.webp",
  },
  {
    id: 6,
    title: "Кашкавал - вкусът на България",
    excerpt: "От овчето мляко до масата - как се прави истинският български кашкавал и защо продуктите на Бачо Илия са различни.",
    slug: "kashkaval-vkusat-na-bulgaria",
    category: "Продукти",
    date: "20 Септември 2024",
    readTime: "6 мин четене",
    image: "/blog/kashkaval.webp",
  },
];

const categories = ["Всички", "Традиции", "Рецепти", "За нас", "Продукти"];

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
            className="inline-block bg-bulgarian-red text-white px-6 py-2 font-mono text-sm tracking-wider mb-6"
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
                  <div className="absolute top-3 left-3 bg-bulgarian-red text-white px-3 py-1 text-xs font-mono tracking-wider">
                    {post.category}
                  </div>
                </div>

                {/* Content */}
                <div className="p-6">
                  {/* Date & Read Time */}
                  <div className="flex items-center gap-3 mb-3 text-walnut/60 text-sm font-mono">
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
            <p className="font-serif text-walnut/70">
              Работим по нови статии за вас. Следете блога за още рецепти, традиции и новини от Бачо Илия.
            </p>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
