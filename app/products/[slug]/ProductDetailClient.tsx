"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { Check, ShoppingBasket } from "lucide-react";
import { useScrollAnimation, fadeInVariants, staggerContainer } from "@/hooks/use-scroll-animation";
import type { Product } from "@/lib/products-data";

interface ProductDetailClientProps {
  product: Product;
}

export default function ProductDetailClient({ product }: ProductDetailClientProps) {
  const { ref: heroRef, isInView: heroInView } = useScrollAnimation(0.1);
  const { ref: detailsRef, isInView: detailsInView } = useScrollAnimation(0.1);
  const { ref: nutritionRef, isInView: nutritionInView } = useScrollAnimation(0.1);
  const { ref: testimonialsRef, isInView: testimonialsInView } = useScrollAnimation(0.1);
  const { ref: recipesRef, isInView: recipesInView} = useScrollAnimation(0.1);

  const [selectedSize, setSelectedSize] = useState(product.sizes[0]);

  const scrollToGiveaway = () => {
    window.location.href = "/#giveaway";
  };

  const getCategoryLabel = (category: string) => {
    const labels: Record<string, string> = {
      cheese: 'СИРЕНА',
      yogurt: 'КИСЕЛИ МЛЕКА',
      drinks: 'НАПИТКИ',
      other: 'МЛЕЧНИ ПРОДУКТИ'
    };
    return labels[category] || category.toUpperCase();
  };

  return (
    <div className="min-h-screen bg-old-paper relative overflow-hidden">
      {/* Paper texture */}
      <div className="absolute inset-0 bg-vintage-paper opacity-40 pointer-events-none" />

      {/* Coffee stains */}
      <div className="absolute top-40 right-20 w-40 h-40 bg-walnut/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-60 left-10 w-32 h-32 bg-walnut/5 rounded-full blur-2xl pointer-events-none" />

      <div className="relative pt-32 pb-16 px-4 sm:px-6 lg:px-8">
        {/* Back navigation */}
        <div className="max-w-7xl mx-auto mb-8">
          <Link href="/products">
            <motion.div
              className="inline-flex items-center gap-2 text-bulgarian-red hover:text-walnut font-mono text-sm tracking-wider transition-colors duration-300"
              whileHover={{ x: -5 }}
            >
              ← ВСИЧКИ ПРОДУКТИ
            </motion.div>
          </Link>
        </div>

        {/* Hero Section with Product Image */}
        <motion.div
          ref={heroRef}
          className="max-w-7xl mx-auto mb-16 relative"
          initial="hidden"
          animate={heroInView ? "visible" : "hidden"}
          variants={staggerContainer}
        >
          {/* Notebook perforation holes */}
          <div className="absolute left-0 top-0 bottom-0 w-8 hidden lg:flex flex-col justify-start gap-8 pt-4 pointer-events-none">
            {[...Array(12)].map((_, i) => (
              <div key={i} className="w-4 h-4 bg-walnut/20 rounded-full shadow-inner" />
            ))}
          </div>

          {/* Left margin line */}
          <div className="absolute left-12 top-0 bottom-0 w-px bg-bulgarian-red/40 hidden lg:block" />

          <div className="lg:ml-16 grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
            {/* Left: Polaroid Image */}
            <motion.div variants={fadeInVariants}>
              <div className="bg-white p-6 shadow-2xl border-2 border-walnut/20 relative max-w-md mx-auto lg:mx-0">
                {/* Washi tape at top */}
                <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 w-24 h-8 bg-sunflower/40 border-l-2 border-r-2 border-sunflower/60" />

                <div className="relative aspect-square overflow-hidden bg-old-paper/50 mb-6">
                  <Image
                    src={selectedSize.image || product.image}
                    alt={`${product.name} - ${selectedSize.size}`}
                    fill
                    className="object-cover"
                    style={{ filter: 'sepia(0.15) contrast(1.1)' }}
                    priority
                    key={selectedSize.size} // Force re-render on size change
                  />
                </div>

                <div className="bg-white px-4 py-2">
                  <p className="font-handwritten text-xl text-walnut/80 text-center leading-relaxed">
                    {selectedSize.description || product.shortDescription}
                  </p>
                </div>
              </div>
            </motion.div>

            {/* Right: Product Details */}
            <motion.div variants={fadeInVariants} className="space-y-6">
              <div>
                <motion.span
                  className="inline-block bg-bulgarian-red text-white px-4 py-1 font-mono text-xs tracking-wider border border-walnut/30 mb-4"
                  variants={fadeInVariants}
                >
                  {getCategoryLabel(product.category)}
                </motion.span>

                <motion.h1
                  className="font-handwritten text-5xl md:text-6xl text-walnut mb-6 leading-tight"
                  variants={fadeInVariants}
                  style={{ textShadow: '2px 2px 0px rgba(0,0,0,0.05)' }}
                >
                  {product.name}
                </motion.h1>

                <motion.p
                  className="font-handwritten text-lg text-walnut/80 leading-relaxed mb-8"
                  variants={fadeInVariants}
                >
                  {product.fullDescription}
                </motion.p>
              </div>

              {/* Size Selection */}
              <motion.div variants={fadeInVariants}>
                <h3 className="font-handwritten text-2xl text-walnut mb-4">
                  Избери опаковка:
                </h3>
                <div className="flex flex-wrap gap-3">
                  {product.sizes.map((size) => (
                    <motion.button
                      key={size.size}
                      onClick={() => setSelectedSize(size)}
                      className={`px-6 py-3 font-mono text-sm tracking-wider border-2 transition-all duration-300 ${
                        selectedSize.size === size.size
                          ? 'bg-bulgarian-red text-white border-walnut/50'
                          : 'bg-white text-walnut border-walnut/30 hover:border-bulgarian-red'
                      }`}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      {size.size} - {size.weight}
                    </motion.button>
                  ))}
                </div>
              </motion.div>

              {/* CTA Button */}
              <motion.div variants={fadeInVariants}>
                <motion.button
                  onClick={scrollToGiveaway}
                  className="w-full bg-bulgarian-red text-white px-8 py-4 font-handwritten text-2xl border-4 border-walnut/40 shadow-xl hover:bg-walnut transition-colors duration-300 relative overflow-hidden"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <span className="relative z-10 flex items-center justify-center gap-3">
                    <ShoppingBasket className="w-6 h-6" />
                    Участвай в раздаването
                  </span>
                  <div className="absolute inset-0 bg-vintage-paper opacity-10 pointer-events-none" />
                </motion.button>
              </motion.div>

              {/* Bacho Tip */}
              {product.bachoTip && (
                <motion.div
                  variants={fadeInVariants}
                  className="bg-sunflower/20 p-6 border-l-4 border-sunflower relative mt-8"
                >
                  <div className="absolute top-3 right-3 w-3 h-3 bg-bulgarian-red rounded-full" />
                  <p className="font-mono text-xs tracking-wider text-walnut/60 mb-2">
                    СЪВЕТ ОТ БАЧО ИЛИЯ
                  </p>
                  <p className="font-handwritten text-lg text-walnut/90 leading-relaxed">
                    {product.bachoTip}
                  </p>
                </motion.div>
              )}
            </motion.div>
          </div>
        </motion.div>

        {/* Product Details Grid */}
        <motion.div
          ref={detailsRef}
          className="max-w-7xl mx-auto mb-16 relative"
          initial="hidden"
          animate={detailsInView ? "visible" : "hidden"}
          variants={staggerContainer}
        >
          <div className="absolute left-12 top-0 bottom-0 w-px bg-bulgarian-red/40 hidden lg:block" />

          <div className="lg:ml-16 grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Ingredients */}
            <motion.div
              variants={fadeInVariants}
              className="bg-white p-8 shadow-xl border-2 border-walnut/20 relative"
            >
              <div className="absolute -top-2 left-6 w-16 h-4 bg-faded-denim/40 border-l border-r border-faded-denim/60" />

              <h3 className="font-handwritten text-3xl text-walnut mb-6">
                Съставки:
              </h3>
              <ul className="space-y-3">
                {product.ingredients.map((ingredient, idx) => (
                  <li key={idx} className="flex items-start gap-3">
                    <Check className="w-5 h-5 text-bulgarian-red flex-shrink-0 mt-1" />
                    <span className="font-handwritten text-walnut/80 leading-relaxed">
                      {ingredient}
                    </span>
                  </li>
                ))}
              </ul>
            </motion.div>

            {/* Storage & Shelf Life */}
            <motion.div
              variants={fadeInVariants}
              className="bg-white p-8 shadow-xl border-2 border-walnut/20 relative"
            >
              <div className="absolute -top-2 right-6 w-16 h-4 bg-sunflower/40 border-l border-r border-sunflower/60" />

              <h3 className="font-handwritten text-3xl text-walnut mb-6">
                Съхранение:
              </h3>
              <div className="space-y-4">
                <div>
                  <p className="font-mono text-xs tracking-wider text-walnut/60 mb-2">
                    НАЧИН НА СЪХРАНЕНИЕ
                  </p>
                  <p className="font-handwritten text-walnut/80 leading-relaxed">
                    {product.storage}
                  </p>
                </div>
                <div className="w-full h-px bg-faded-denim/30" />
                <div>
                  <p className="font-mono text-xs tracking-wider text-walnut/60 mb-2">
                    ГОДНОСТ
                  </p>
                  <p className="font-handwritten text-walnut/80 leading-relaxed">
                    {product.shelfLife}
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        </motion.div>

        {/* Nutrition Facts Table */}
        <motion.div
          ref={nutritionRef}
          className="max-w-7xl mx-auto mb-16 relative"
          initial="hidden"
          animate={nutritionInView ? "visible" : "hidden"}
          variants={staggerContainer}
        >
          <div className="absolute left-12 top-0 bottom-0 w-px bg-bulgarian-red/40 hidden lg:block" />

          <motion.div variants={fadeInVariants} className="lg:ml-16">
            <h2 className="font-handwritten text-4xl text-walnut mb-8">
              Хранителна информация (на 100г):
            </h2>

            <div className="bg-white shadow-xl border-4 border-walnut/30 overflow-hidden">
              <table className="w-full">
                <thead>
                  <tr className="bg-bulgarian-red text-white">
                    <th className="px-6 py-4 text-left font-handwritten text-xl border-r-2 border-walnut/30">
                      Хранителна стойност
                    </th>
                    <th className="px-6 py-4 text-right font-mono text-sm tracking-wider">
                      КОЛИЧЕСТВО
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b-2 border-walnut/20">
                    <td className="px-6 py-4 font-handwritten text-walnut/80">Енергийна стойност</td>
                    <td className="px-6 py-4 text-right font-mono text-walnut">{product.nutritionPer100g.energy}</td>
                  </tr>
                  <tr className="border-b-2 border-walnut/20">
                    <td className="px-6 py-4 font-handwritten text-walnut/80">Мазнини</td>
                    <td className="px-6 py-4 text-right font-mono text-walnut">{product.nutritionPer100g.fat}</td>
                  </tr>
                  <tr className="border-b-2 border-walnut/20 bg-old-paper/30">
                    <td className="px-6 py-4 pl-12 font-handwritten text-sm text-walnut/70">от които наситени</td>
                    <td className="px-6 py-4 text-right font-mono text-sm text-walnut/80">{product.nutritionPer100g.saturatedFat}</td>
                  </tr>
                  <tr className="border-b-2 border-walnut/20">
                    <td className="px-6 py-4 font-handwritten text-walnut/80">Въглехидрати</td>
                    <td className="px-6 py-4 text-right font-mono text-walnut">{product.nutritionPer100g.carbohydrates}</td>
                  </tr>
                  <tr className="border-b-2 border-walnut/20 bg-old-paper/30">
                    <td className="px-6 py-4 pl-12 font-handwritten text-sm text-walnut/70">от които захари</td>
                    <td className="px-6 py-4 text-right font-mono text-sm text-walnut/80">{product.nutritionPer100g.sugars}</td>
                  </tr>
                  <tr className="border-b-2 border-walnut/20">
                    <td className="px-6 py-4 font-handwritten text-walnut/80">Белтъчини</td>
                    <td className="px-6 py-4 text-right font-mono text-walnut">{product.nutritionPer100g.protein}</td>
                  </tr>
                  <tr>
                    <td className="px-6 py-4 font-handwritten text-walnut/80">Сол</td>
                    <td className="px-6 py-4 text-right font-mono text-walnut">{product.nutritionPer100g.salt}</td>
                  </tr>
                  {product.nutritionPer100g.calcium && (
                    <tr className="bg-old-paper/30">
                      <td className="px-6 py-4 font-handwritten text-walnut/80">Калций</td>
                      <td className="px-6 py-4 text-right font-mono text-walnut">{product.nutritionPer100g.calcium}</td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </motion.div>
        </motion.div>

        {/* Product Features */}
        <motion.div
          className="max-w-7xl mx-auto mb-16 relative"
          initial="hidden"
          animate={detailsInView ? "visible" : "hidden"}
          variants={staggerContainer}
        >
          <div className="absolute left-12 top-0 bottom-0 w-px bg-bulgarian-red/40 hidden lg:block" />

          <motion.div variants={fadeInVariants} className="lg:ml-16">
            <h2 className="font-handwritten text-4xl text-walnut mb-8">
              Защо да избереш именно този продукт:
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {product.features.map((feature, idx) => (
                <motion.div
                  key={idx}
                  variants={fadeInVariants}
                  custom={idx}
                  className="bg-white p-6 shadow-lg border-l-4 border-bulgarian-red relative"
                >
                  <div className="absolute top-4 right-4 w-2 h-2 bg-sunflower rounded-full" />
                  <p className="font-handwritten text-walnut/80 leading-relaxed">
                    {feature}
                  </p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </motion.div>

        {/* Testimonials */}
        {product.testimonials && product.testimonials.length > 0 && (
          <motion.div
            ref={testimonialsRef}
            className="max-w-7xl mx-auto mb-16 relative"
            initial="hidden"
            animate={testimonialsInView ? "visible" : "hidden"}
            variants={staggerContainer}
          >
            <div className="absolute left-12 top-0 bottom-0 w-px bg-bulgarian-red/40 hidden lg:block" />

            <motion.div variants={fadeInVariants} className="lg:ml-16">
              <h2 className="font-handwritten text-4xl text-walnut mb-8">
                Какво казват нашите клиенти:
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {product.testimonials.map((testimonial, idx) => (
                  <motion.div
                    key={idx}
                    variants={fadeInVariants}
                    custom={idx}
                    className="bg-sunflower/10 p-8 border-2 border-walnut/20 shadow-lg relative"
                  >
                    <div className="absolute -top-3 left-8 w-20 h-6 bg-faded-denim/40 border-l-2 border-r-2 border-faded-denim/60" />

                    <p className="font-handwritten text-walnut/80 italic leading-relaxed mb-4 text-lg">
                      "{testimonial.quote}"
                    </p>

                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 bg-bulgarian-red/20 border-2 border-bulgarian-red/30 flex items-center justify-center">
                        <span className="font-handwritten text-2xl text-walnut">
                          {testimonial.name[0]}
                        </span>
                      </div>
                      <div>
                        <p className="font-handwritten text-lg text-walnut">
                          {testimonial.name}
                        </p>
                        <p className="font-mono text-xs text-walnut/60 tracking-wider">
                          {testimonial.location}
                        </p>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </motion.div>
        )}

        {/* Related Recipes */}
        {product.relatedRecipes && product.relatedRecipes.length > 0 && (
          <motion.div
            ref={recipesRef}
            className="max-w-7xl mx-auto relative"
            initial="hidden"
            animate={recipesInView ? "visible" : "hidden"}
            variants={staggerContainer}
          >
            <div className="absolute left-12 top-0 bottom-0 w-px bg-bulgarian-red/40 hidden lg:block" />

            <motion.div variants={fadeInVariants} className="lg:ml-16">
              <h2 className="font-handwritten text-4xl text-walnut mb-8">
                Опитай тези рецепти с {product.name}:
              </h2>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {product.relatedRecipes.map((recipeSlug, idx) => (
                  <motion.div
                    key={recipeSlug}
                    variants={fadeInVariants}
                    custom={idx}
                  >
                    <Link href={`/recipes/${recipeSlug}`}>
                      <motion.div
                        className="bg-white p-4 shadow-xl border-2 border-walnut/20 hover:shadow-2xl transition-shadow duration-300 cursor-pointer relative"
                        whileHover={{ y: -5 }}
                      >
                        <div className="absolute -top-2 left-1/2 transform -translate-x-1/2 w-12 h-4 bg-bulgarian-red/40 border-l border-r border-bulgarian-red/60" />

                        <p className="font-handwritten text-xl text-walnut text-center">
                          {recipeSlug.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')}
                        </p>

                        <div className="mt-4 text-center">
                          <span className="inline-block font-mono text-xs text-bulgarian-red tracking-wider">
                            ВИЖ РЕЦЕПТАТА →
                          </span>
                        </div>
                      </motion.div>
                    </Link>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </motion.div>
        )}
      </div>
    </div>
  );
}
