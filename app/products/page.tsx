"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { useScrollAnimation, fadeInVariants, staggerContainer } from "@/hooks/use-scroll-animation";
import { getAllProducts, Product } from "@/lib/products-data";
import Link from "next/link";
import Image from "next/image";

export default function ProductsPage() {
  const { ref: heroRef, isInView: heroInView } = useScrollAnimation(0.1);
  const { ref: productsRef, isInView: productsInView } = useScrollAnimation(0.1);

  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const allProducts = getAllProducts();
  const products = selectedCategory
    ? allProducts.filter(p => p.category === selectedCategory)
    : allProducts;

  const categories = [
    { key: null, label: "Всички" },
    { key: "cheese", label: "Сирена" },
    { key: "yogurt", label: "Кисели млека" },
    { key: "drinks", label: "Напитки" },
    { key: "other", label: "Други" }
  ];

  const getCategoryLabel = (category: string) => {
    const labels: Record<string, string> = {
      cheese: "Сирена",
      yogurt: "Кисели млека",
      drinks: "Напитки",
      other: "Други млечни продукти"
    };
    return labels[category] || category;
  };

  return (
    <div className="min-h-screen bg-old-paper relative overflow-hidden">
      {/* Paper texture */}
      <div className="absolute inset-0 bg-vintage-paper opacity-40 pointer-events-none" />

      {/* Coffee stains */}
      <div className="absolute top-20 right-10 w-32 h-32 bg-walnut/5 rounded-full blur-2xl pointer-events-none" />
      <div className="absolute bottom-40 left-20 w-40 h-40 bg-walnut/5 rounded-full blur-3xl pointer-events-none" />

      <div className="relative pt-32 pb-16 px-4 sm:px-6 lg:px-8">
        {/* Hero Section */}
        <motion.div
          ref={heroRef}
          className="max-w-5xl mx-auto mb-20 text-center"
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
            <span className="inline-block bg-bulgarian-red text-white px-6 py-2 font-handwritten text-sm tracking-wider">
              НАШИТЕ ПРОДУКТИ
            </span>
          </motion.div>

          <motion.h1
            className="font-handwritten text-5xl md:text-7xl text-bulgarian-red mb-6 leading-tight"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            Истински млечни продукти
          </motion.h1>

          <motion.p
            className="font-handwritten text-xl md:text-2xl text-walnut/80 max-w-3xl mx-auto leading-relaxed"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            Направени по традиционни български рецепти от крави на свободен избор.
            Без консерванти, без компромиси.
          </motion.p>
        </motion.div>

        {/* Category Filter */}
        <motion.div
          className="max-w-5xl mx-auto mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <div className="flex flex-wrap gap-3 justify-center mb-6">
            {categories.map((category) => (
              <button
                key={category.key || 'all'}
                onClick={() => setSelectedCategory(category.key)}
                className={`
                  px-6 py-3 font-handwritten text-sm tracking-wider border-2 transition-all duration-300
                  ${selectedCategory === category.key
                    ? 'bg-bulgarian-red text-white border-bulgarian-red'
                    : 'bg-white text-walnut border-walnut/30 hover:border-bulgarian-red'
                  }
                `}
              >
                {category.label}
              </button>
            ))}
          </div>

          {/* Product count */}
          <div className="text-center">
            <span className="font-handwritten text-walnut/60 text-sm tracking-wider">
              НАМЕРЕНИ ПРОДУКТИ: <span className="font-bold text-bulgarian-red">{products.length}</span>
            </span>
          </div>
        </motion.div>

        {/* Products Grid */}
        <motion.div
          ref={productsRef}
          className="max-w-6xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {products.map((product: Product, index: number) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
              >
                <Link href={`/products/${product.slug}`}>
                  <div className="group cursor-pointer bg-white border-2 border-walnut/20 overflow-hidden hover:shadow-xl transition-all duration-300 hover:-translate-y-2">
                    {/* Image container */}
                    <div className="relative aspect-square overflow-hidden bg-old-paper/30">
                      <Image
                        src={product.image}
                        alt={product.name}
                        fill
                        className="object-cover transition-all duration-500 group-hover:scale-105"
                      />

                      {/* Category badge */}
                      <div className="absolute top-3 right-3 bg-bulgarian-red text-white px-3 py-1 text-xs font-handwritten tracking-wider">
                        {getCategoryLabel(product.category)}
                      </div>
                    </div>

                    {/* Product info */}
                    <div className="p-6">
                      <h3 className="font-handwritten text-3xl text-walnut mb-3 text-center leading-tight">
                        {product.name}
                      </h3>

                      <p className="font-handwritten text-walnut/70 text-base text-center leading-relaxed line-clamp-3 mb-4">
                        {product.shortDescription}
                      </p>

                      {/* Size options */}
                      <div className="flex justify-center gap-2 mb-4">
                        {product.sizes.map((size) => (
                          <span
                            key={size.size}
                            className="text-xs font-handwritten text-walnut/60 bg-old-paper px-3 py-1 border border-walnut/20"
                          >
                            {size.size}
                          </span>
                        ))}
                      </div>

                      {/* View details */}
                      <div className="text-center">
                        <span className="inline-block font-handwritten text-xs text-bulgarian-red tracking-wider group-hover:underline">
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
          className="max-w-4xl mx-auto mt-20 text-center bg-gradient-to-br from-sunflower/20 to-sunflower/10 p-12 border-2 border-sunflower/30"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
        >
          <p className="font-handwritten text-3xl md:text-4xl text-walnut mb-4 leading-relaxed">
            Всички продукти са направени в България от местно мляко.
          </p>
          <p className="font-handwritten text-xl text-walnut/80 mb-6 leading-relaxed">
            Търсете ни в магазините из цялата страна!
          </p>
          <Link href="/where-to-buy">
            <button className="bg-bulgarian-red text-white px-8 py-4 font-handwritten text-sm tracking-wider hover:bg-walnut transition-colors duration-300">
              НАМЕРИ МАГАЗИН →
            </button>
          </Link>
        </motion.div>
      </div>
    </div>
  );
}
