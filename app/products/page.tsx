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
          className="max-w-5xl mx-auto mb-16 relative"
          initial="hidden"
          animate={heroInView ? "visible" : "hidden"}
          variants={staggerContainer}
        >
          {/* Notebook perforation holes */}
          <div className="absolute left-0 top-0 bottom-0 w-8 flex flex-col justify-start gap-8 pt-4 pointer-events-none">
            {[...Array(8)].map((_, i) => (
              <div key={i} className="w-4 h-4 bg-walnut/20 rounded-full shadow-inner" />
            ))}
          </div>

          {/* Left margin line */}
          <div className="absolute left-12 top-0 bottom-0 w-px bg-bulgarian-red/40" />

          <div className="ml-16">
            <motion.div variants={fadeInVariants} className="mb-6">
              <span className="inline-block bg-bulgarian-red text-white px-6 py-2 font-mono text-sm tracking-wider border-2 border-walnut/30">
                НАШИТЕ ПРОДУКТИ
              </span>
            </motion.div>

            <motion.h1
              className="font-handwritten text-5xl md:text-7xl text-walnut mb-6 leading-tight"
              variants={fadeInVariants}
              style={{ textShadow: '2px 2px 0px rgba(0,0,0,0.05)' }}
            >
              Истински млечни продукти
            </motion.h1>

            <motion.p
              className="font-serif text-xl md:text-2xl text-walnut/80 mb-8 max-w-2xl leading-relaxed"
              variants={fadeInVariants}
            >
              Направени по традиционни български рецепти от крави на свободен избор.
              Без консерванти, без компромиси.
            </motion.p>

            {/* Washi tape decoration */}
            <motion.div
              className="absolute -top-4 right-8 w-24 h-12 bg-sunflower/30 border-l-4 border-r-4 border-sunflower/50 transform rotate-12"
              variants={fadeInVariants}
              style={{ opacity: 0.6 }}
            />
          </div>
        </motion.div>

        {/* Category Filter */}
        <motion.div
          className="max-w-7xl mx-auto mb-12 relative"
          initial="hidden"
          animate={heroInView ? "visible" : "hidden"}
          variants={fadeInVariants}
        >
          <div className="ml-16 flex flex-wrap gap-3 justify-center md:justify-start">
            {categories.map((category) => (
              <motion.button
                key={category.key || 'all'}
                onClick={() => setSelectedCategory(category.key)}
                className={`
                  px-6 py-3 font-mono text-sm tracking-wider border-2 transition-all duration-300
                  ${selectedCategory === category.key
                    ? 'bg-bulgarian-red text-white border-walnut/30 shadow-lg'
                    : 'bg-white text-walnut border-walnut/20 hover:border-bulgarian-red/50 hover:shadow-md'
                  }
                `}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {category.label}
              </motion.button>
            ))}
          </div>

          {/* Product count */}
          <div className="ml-16 mt-4 text-center md:text-left">
            <span className="font-serif text-walnut/60 text-sm">
              Намерени продукти: <span className="font-bold text-bulgarian-red">{products.length}</span>
            </span>
          </div>
        </motion.div>

        {/* Products Grid */}
        <motion.div
          ref={productsRef}
          className="max-w-7xl mx-auto relative"
          initial="hidden"
          animate={productsInView ? "visible" : "hidden"}
          variants={staggerContainer}
        >
          {/* Left margin for grid section */}
          <div className="absolute left-0 top-0 bottom-0 w-px bg-bulgarian-red/40 ml-12" />

          <div className="ml-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-12">
            {products.map((product: Product, index: number) => (
              <motion.div
                key={product.id}
                variants={fadeInVariants}
                custom={index}
              >
                <Link href={`/products/${product.slug}`}>
                  <motion.div
                    className="group cursor-pointer"
                    whileHover={{ y: -8 }}
                    transition={{ duration: 0.3 }}
                  >
                    {/* Polaroid-style product card */}
                    <div className="bg-white p-4 shadow-2xl border-2 border-walnut/20 relative">
                      {/* Washi tape at top */}
                      <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 w-20 h-6 bg-faded-denim/40 border-l-2 border-r-2 border-faded-denim/60" />

                      {/* Image container */}
                      <div className="relative aspect-square mb-4 overflow-hidden bg-old-paper/50">
                        <Image
                          src={product.image}
                          alt={product.name}
                          fill
                          className="object-cover transition-all duration-500 group-hover:scale-105"
                          style={{ filter: 'sepia(0.15) contrast(1.1)' }}
                        />

                        {/* Category badge */}
                        <div className="absolute top-3 right-3 bg-bulgarian-red text-white px-3 py-1 text-xs font-mono tracking-wider border border-walnut/30">
                          {getCategoryLabel(product.category)}
                        </div>
                      </div>

                      {/* Handwritten product name */}
                      <div className="bg-white pt-2 pb-4 px-2">
                        <h3 className="font-handwritten text-2xl md:text-3xl text-walnut mb-2 text-center leading-tight">
                          {product.name}
                        </h3>

                        {/* Horizontal line like notebook */}
                        <div className="w-full h-px bg-faded-denim/30 mb-3" />

                        <p className="font-serif text-walnut/70 text-sm text-center leading-relaxed line-clamp-3">
                          {product.shortDescription}
                        </p>

                        {/* Size options indicator */}
                        <div className="mt-4 flex justify-center gap-2">
                          {product.sizes.map((size) => (
                            <span
                              key={size.size}
                              className="text-xs font-mono text-walnut/60 bg-old-paper/50 px-2 py-1 border border-walnut/20"
                            >
                              {size.size}
                            </span>
                          ))}
                        </div>

                        {/* View details hint */}
                        <div className="mt-4 text-center">
                          <span className="inline-block font-mono text-xs text-bulgarian-red tracking-wider group-hover:underline">
                            ВИЖ ПОВЕЧЕ →
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Shadow effect */}
                    <div
                      className="absolute inset-0 bg-walnut/10 transform translate-x-1 translate-y-1 -z-10"
                      style={{ filter: 'blur(4px)' }}
                    />
                  </motion.div>
                </Link>
              </motion.div>
            ))}
          </div>

          {/* Bottom note */}
          <motion.div
            className="mt-16 ml-16 max-w-2xl"
            variants={fadeInVariants}
          >
            <div className="bg-sunflower/20 p-6 border-l-4 border-sunflower relative">
              <div className="absolute top-3 right-3 w-3 h-3 bg-bulgarian-red rounded-full" />
              <p className="font-handwritten text-xl text-walnut/90 leading-relaxed">
                Всички продукти са направени в България от местно мляко.
                Търсете ни в магазините из цялата страна!
              </p>
              <Link href="/where-to-buy">
                <motion.button
                  className="mt-4 bg-bulgarian-red text-white px-6 py-3 font-mono text-sm tracking-wider border-2 border-walnut/30 hover:bg-walnut transition-colors duration-300"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  НАМЕРИ МАГАЗИН →
                </motion.button>
              </Link>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}
