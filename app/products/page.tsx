'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { useScrollAnimation, fadeInVariants, staggerContainer } from '@/hooks/use-scroll-animation';
import { getAllProducts, Product } from '@/lib/products-data';
import Link from 'next/link';
import Image from 'next/image';

export default function ProductsPage() {
  const { ref: heroRef, isInView: heroInView } = useScrollAnimation(0.1);
  const { ref: productsRef, isInView: productsInView } = useScrollAnimation(0.1);

  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const allProducts = getAllProducts();
  const products = selectedCategory
    ? allProducts.filter((p) => p.category === selectedCategory)
    : allProducts;

  const categories = [
    { key: null, label: 'Всички' },
    { key: 'cheese', label: 'Сирена' },
    { key: 'yogurt', label: 'Кисели млека' },
    { key: 'drinks', label: 'Напитки' },
    { key: 'other', label: 'Други' },
  ];

  const getCategoryLabel = (category: string) => {
    const labels: Record<string, string> = {
      cheese: 'Сирена',
      yogurt: 'Кисели млека',
      drinks: 'Напитки',
      other: 'Други млечни продукти',
    };
    return labels[category] || category;
  };

  return (
    <div className="bg-old-paper relative min-h-screen overflow-hidden">
      {/* Paper texture */}
      <div className="bg-vintage-paper pointer-events-none absolute inset-0 opacity-40" />

      {/* Coffee stains */}
      <div className="bg-walnut/5 pointer-events-none absolute top-20 right-10 h-32 w-32 rounded-full blur-2xl" />
      <div className="bg-walnut/5 pointer-events-none absolute bottom-40 left-20 h-40 w-40 rounded-full blur-3xl" />

      <div className="relative px-4 pt-32 pb-16 sm:px-6 lg:px-8">
        {/* Hero Section */}
        <motion.div
          ref={heroRef}
          className="mx-auto mb-20 max-w-5xl text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-6"
          >
            <span className="bg-bulgarian-red font-handwritten inline-block px-6 py-2 text-sm tracking-wider text-white">
              НАШИТЕ ПРОДУКТИ
            </span>
          </motion.div>

          <motion.h1
            className="font-handwritten text-bulgarian-red mb-6 text-5xl leading-tight md:text-7xl"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            Истински млечни продукти
          </motion.h1>

          <motion.p
            className="font-handwritten text-walnut/80 mx-auto max-w-3xl text-xl leading-relaxed md:text-2xl"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            Направени по традиционни български рецепти от крави на свободен избор. Без консерванти,
            без компромиси.
          </motion.p>
        </motion.div>

        {/* Category Filter */}
        <motion.div
          className="mx-auto mb-16 max-w-5xl"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <div className="mb-6 flex flex-wrap justify-center gap-3">
            {categories.map((category) => (
              <button
                key={category.key || 'all'}
                onClick={() => setSelectedCategory(category.key)}
                className={`font-handwritten border-2 px-6 py-3 text-sm tracking-wider transition-all duration-300 ${
                  selectedCategory === category.key
                    ? 'bg-bulgarian-red border-bulgarian-red text-white'
                    : 'text-walnut border-walnut/30 hover:border-bulgarian-red bg-white'
                } `}
              >
                {category.label}
              </button>
            ))}
          </div>

          {/* Product count */}
          <div className="text-center">
            <span className="font-handwritten text-walnut/60 text-sm tracking-wider">
              НАМЕРЕНИ ПРОДУКТИ:{' '}
              <span className="text-bulgarian-red font-bold">{products.length}</span>
            </span>
          </div>
        </motion.div>

        {/* Products Grid */}
        <motion.div
          ref={productsRef}
          className="mx-auto max-w-6xl"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
            {products.map((product: Product, index: number) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
              >
                <Link href={`/products/${product.slug}`}>
                  <div className="group border-walnut/20 cursor-pointer overflow-hidden border-2 bg-white transition-all duration-300 hover:-translate-y-2 hover:shadow-xl">
                    {/* Image container */}
                    <div className="bg-old-paper/30 relative aspect-square overflow-hidden">
                      <Image
                        src={product.image}
                        alt={product.name}
                        fill
                        className="object-cover transition-all duration-500 group-hover:scale-105"
                      />

                      {/* Category badge */}
                      <div className="bg-bulgarian-red font-handwritten absolute top-3 right-3 px-3 py-1 text-xs tracking-wider text-white">
                        {getCategoryLabel(product.category)}
                      </div>
                    </div>

                    {/* Product info */}
                    <div className="p-6">
                      <h3 className="font-handwritten text-walnut mb-3 text-center text-3xl leading-tight">
                        {product.name}
                      </h3>

                      <p className="font-handwritten text-walnut/70 mb-4 line-clamp-3 text-center text-base leading-relaxed">
                        {product.shortDescription}
                      </p>

                      {/* View details */}
                      <div className="text-center">
                        <span className="font-handwritten text-bulgarian-red inline-block text-xs tracking-wider group-hover:underline">
                          ВИЖ ПОВЕЧЕ →
                        </span>
                      </div>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Bottom CTA */}
        <motion.div
          className="from-sunflower/20 to-sunflower/10 border-sunflower/30 mx-auto mt-20 max-w-4xl border-2 bg-gradient-to-br p-12 text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
        >
          <p className="font-handwritten text-walnut mb-4 text-3xl leading-relaxed md:text-4xl">
            Всички продукти са направени в България от местно мляко.
          </p>
          <p className="font-handwritten text-walnut/80 mb-6 text-xl leading-relaxed">
            Търсете ни в магазините из цялата страна!
          </p>
          <Link href="/where-to-buy">
            <button className="bg-bulgarian-red font-handwritten hover:bg-walnut px-8 py-4 text-sm tracking-wider text-white transition-colors duration-300">
              НАМЕРИ МАГАЗИН →
            </button>
          </Link>
        </motion.div>
      </div>
    </div>
  );
}
