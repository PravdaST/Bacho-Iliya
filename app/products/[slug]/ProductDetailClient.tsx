'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
import { Check, ShoppingBasket } from 'lucide-react';
import { useScrollAnimation, fadeInVariants, staggerContainer } from '@/hooks/use-scroll-animation';
import type { Product } from '@/lib/products-data';
import { getRecipeBySlug } from '@/lib/recipes-data';

interface ProductDetailClientProps {
  product: Product;
}

export default function ProductDetailClient({ product }: ProductDetailClientProps) {
  const { ref: heroRef, isInView: heroInView } = useScrollAnimation(0.1);
  const { ref: detailsRef, isInView: detailsInView } = useScrollAnimation(0.1);
  const { ref: nutritionRef, isInView: nutritionInView } = useScrollAnimation(0.1);
  const { ref: testimonialsRef, isInView: testimonialsInView } = useScrollAnimation(0.1);
  const { ref: recipesRef, isInView: recipesInView } = useScrollAnimation(0.1);

  const [selectedSize, setSelectedSize] = useState(product.sizes[0]);

  const scrollToGiveaway = () => {
    window.location.href = '/#giveaway';
  };

  const getCategoryLabel = (category: string) => {
    const labels: Record<string, string> = {
      cheese: 'СИРЕНА',
      yogurt: 'КИСЕЛИ МЛЕКА',
      drinks: 'НАПИТКИ',
      other: 'МЛЕЧНИ ПРОДУКТИ',
    };
    return labels[category] || category.toUpperCase();
  };

  return (
    <div className="bg-old-paper relative min-h-screen overflow-hidden">
      {/* Paper texture */}
      <div className="bg-vintage-paper pointer-events-none absolute inset-0 opacity-40" />

      {/* Coffee stains */}
      <div className="bg-walnut/5 pointer-events-none absolute top-40 right-20 h-40 w-40 rounded-full blur-3xl" />
      <div className="bg-walnut/5 pointer-events-none absolute bottom-60 left-10 h-32 w-32 rounded-full blur-2xl" />

      <div className="relative px-4 pt-32 pb-16 sm:px-6 lg:px-8">
        {/* Back navigation */}
        <div className="mx-auto mb-8 max-w-7xl">
          <Link href="/products">
            <motion.div
              className="text-bulgarian-red hover:text-walnut font-handwritten inline-flex items-center gap-2 text-sm tracking-wider transition-colors duration-300"
              whileHover={{ x: -5 }}
            >
              ← ВСИЧКИ ПРОДУКТИ
            </motion.div>
          </Link>
        </div>

        {/* Hero Section with Product Image */}
        <motion.div
          ref={heroRef}
          className="relative mx-auto mb-16 max-w-7xl"
          initial="hidden"
          animate={heroInView ? 'visible' : 'hidden'}
          variants={staggerContainer}
        >
          {/* Notebook perforation holes */}
          <div className="pointer-events-none absolute top-0 bottom-0 left-0 hidden w-8 flex-col justify-start gap-8 pt-4 lg:flex">
            {[...Array(12)].map((_, i) => (
              <div key={i} className="bg-walnut/20 h-4 w-4 rounded-full shadow-inner" />
            ))}
          </div>

          {/* Left margin line */}
          <div className="bg-bulgarian-red/40 absolute top-0 bottom-0 left-12 hidden w-px lg:block" />

          <div className="grid grid-cols-1 items-start gap-12 lg:ml-16 lg:grid-cols-2">
            {/* Left: Polaroid Image */}
            <motion.div variants={fadeInVariants}>
              <div className="border-walnut/20 relative mx-auto max-w-md border-2 bg-white p-6 shadow-2xl lg:mx-0">
                {/* Washi tape at top */}
                <div className="bg-sunflower/40 border-sunflower/60 absolute -top-3 left-1/2 h-8 w-24 -translate-x-1/2 transform border-r-2 border-l-2" />

                <div className="bg-old-paper/50 relative mb-6 aspect-square overflow-hidden">
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
                  <p className="font-handwritten text-walnut/80 text-center text-xl leading-relaxed">
                    {selectedSize.description || product.shortDescription}
                  </p>
                </div>
              </div>
            </motion.div>

            {/* Right: Product Details */}
            <motion.div variants={fadeInVariants} className="space-y-6">
              <div>
                <motion.span
                  className="bg-bulgarian-red font-handwritten border-walnut/30 mb-4 inline-block border px-4 py-1 text-xs tracking-wider text-white"
                  variants={fadeInVariants}
                >
                  {getCategoryLabel(product.category)}
                </motion.span>

                <motion.h1
                  className="font-handwritten text-walnut mb-6 text-5xl leading-tight md:text-6xl"
                  variants={fadeInVariants}
                  style={{ textShadow: '2px 2px 0px rgba(0,0,0,0.05)' }}
                >
                  {product.name}
                </motion.h1>

                <motion.p
                  className="font-handwritten text-walnut/80 mb-8 text-lg leading-relaxed"
                  variants={fadeInVariants}
                >
                  {product.fullDescription}
                </motion.p>
              </div>

              {/* Size Selection */}
              <motion.div variants={fadeInVariants}>
                <h3 className="font-handwritten text-walnut mb-4 text-2xl">Избери опаковка:</h3>
                <div className="flex flex-wrap gap-3">
                  {product.sizes.map((size) => (
                    <motion.button
                      key={size.size}
                      onClick={() => setSelectedSize(size)}
                      className={`font-handwritten border-2 px-6 py-3 text-sm tracking-wider transition-all duration-300 ${
                        selectedSize.size === size.size
                          ? 'bg-bulgarian-red border-walnut/50 text-white'
                          : 'text-walnut border-walnut/30 hover:border-bulgarian-red bg-white'
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
                  className="bg-bulgarian-red font-handwritten border-walnut/40 hover:bg-walnut relative w-full overflow-hidden border-4 px-8 py-4 text-2xl text-white shadow-xl transition-colors duration-300"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <span className="relative z-10 flex items-center justify-center gap-3">
                    <ShoppingBasket className="h-6 w-6" />
                    Участвай в раздаването
                  </span>
                  <div className="bg-vintage-paper pointer-events-none absolute inset-0 opacity-10" />
                </motion.button>
              </motion.div>

              {/* Bacho Tip */}
              {product.bachoTip && (
                <motion.div
                  variants={fadeInVariants}
                  className="bg-sunflower/20 border-sunflower relative mt-8 border-l-4 p-6"
                >
                  <div className="bg-bulgarian-red absolute top-3 right-3 h-3 w-3 rounded-full" />
                  <p className="font-handwritten text-walnut/60 mb-2 text-xs tracking-wider">
                    СЪВЕТ ОТ БАЧО ИЛИЯ
                  </p>
                  <p className="font-handwritten text-walnut/90 text-lg leading-relaxed">
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
          className="relative mx-auto mb-16 max-w-7xl"
          initial="hidden"
          animate={detailsInView ? 'visible' : 'hidden'}
          variants={staggerContainer}
        >
          <div className="bg-bulgarian-red/40 absolute top-0 bottom-0 left-12 hidden w-px lg:block" />

          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:ml-16">
            {/* Ingredients */}
            <motion.div
              variants={fadeInVariants}
              className="border-walnut/20 relative border-2 bg-white p-8 shadow-xl"
            >
              <div className="bg-faded-denim/40 border-faded-denim/60 absolute -top-2 left-6 h-4 w-16 border-r border-l" />

              <h3 className="font-handwritten text-walnut mb-6 text-3xl">Съставки:</h3>
              <ul className="space-y-3">
                {product.ingredients.map((ingredient, idx) => (
                  <li key={idx} className="flex items-start gap-3">
                    <Check className="text-bulgarian-red mt-1 h-5 w-5 flex-shrink-0" />
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
              className="border-walnut/20 relative border-2 bg-white p-8 shadow-xl"
            >
              <div className="bg-sunflower/40 border-sunflower/60 absolute -top-2 right-6 h-4 w-16 border-r border-l" />

              <h3 className="font-handwritten text-walnut mb-6 text-3xl">Съхранение:</h3>
              <div className="space-y-4">
                <div>
                  <p className="font-handwritten text-walnut/60 mb-2 text-xs tracking-wider">
                    НАЧИН НА СЪХРАНЕНИЕ
                  </p>
                  <p className="font-handwritten text-walnut/80 leading-relaxed">
                    {product.storage}
                  </p>
                </div>
                <div className="bg-faded-denim/30 h-px w-full" />
                <div>
                  <p className="font-handwritten text-walnut/60 mb-2 text-xs tracking-wider">
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
          className="relative mx-auto mb-16 max-w-7xl"
          initial="hidden"
          animate={nutritionInView ? 'visible' : 'hidden'}
          variants={staggerContainer}
        >
          <div className="bg-bulgarian-red/40 absolute top-0 bottom-0 left-12 hidden w-px lg:block" />

          <motion.div variants={fadeInVariants} className="lg:ml-16">
            <h2 className="font-handwritten text-walnut mb-8 text-4xl">
              Хранителна информация (на 100г):
            </h2>

            <div className="border-walnut/30 overflow-hidden border-4 bg-white shadow-xl">
              <table className="w-full">
                <thead>
                  <tr className="bg-bulgarian-red text-white">
                    <th className="font-handwritten border-walnut/30 border-r-2 px-6 py-4 text-left text-xl">
                      Хранителна стойност
                    </th>
                    <th className="font-handwritten px-6 py-4 text-right text-sm tracking-wider">
                      КОЛИЧЕСТВО
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-walnut/20 border-b-2">
                    <td className="font-handwritten text-walnut/80 px-6 py-4">
                      Енергийна стойност
                    </td>
                    <td className="font-handwritten text-walnut px-6 py-4 text-right">
                      {product.nutritionPer100g.energy}
                    </td>
                  </tr>
                  <tr className="border-walnut/20 border-b-2">
                    <td className="font-handwritten text-walnut/80 px-6 py-4">Мазнини</td>
                    <td className="font-handwritten text-walnut px-6 py-4 text-right">
                      {product.nutritionPer100g.fat}
                    </td>
                  </tr>
                  <tr className="border-walnut/20 bg-old-paper/30 border-b-2">
                    <td className="font-handwritten text-walnut/70 px-6 py-4 pl-12 text-sm">
                      от които наситени
                    </td>
                    <td className="font-handwritten text-walnut/80 px-6 py-4 text-right text-sm">
                      {product.nutritionPer100g.saturatedFat}
                    </td>
                  </tr>
                  <tr className="border-walnut/20 border-b-2">
                    <td className="font-handwritten text-walnut/80 px-6 py-4">Въглехидрати</td>
                    <td className="font-handwritten text-walnut px-6 py-4 text-right">
                      {product.nutritionPer100g.carbohydrates}
                    </td>
                  </tr>
                  <tr className="border-walnut/20 bg-old-paper/30 border-b-2">
                    <td className="font-handwritten text-walnut/70 px-6 py-4 pl-12 text-sm">
                      от които захари
                    </td>
                    <td className="font-handwritten text-walnut/80 px-6 py-4 text-right text-sm">
                      {product.nutritionPer100g.sugars}
                    </td>
                  </tr>
                  <tr className="border-walnut/20 border-b-2">
                    <td className="font-handwritten text-walnut/80 px-6 py-4">Белтъчини</td>
                    <td className="font-handwritten text-walnut px-6 py-4 text-right">
                      {product.nutritionPer100g.protein}
                    </td>
                  </tr>
                  <tr>
                    <td className="font-handwritten text-walnut/80 px-6 py-4">Сол</td>
                    <td className="font-handwritten text-walnut px-6 py-4 text-right">
                      {product.nutritionPer100g.salt}
                    </td>
                  </tr>
                  {product.nutritionPer100g.calcium && (
                    <tr className="bg-old-paper/30">
                      <td className="font-handwritten text-walnut/80 px-6 py-4">Калций</td>
                      <td className="font-handwritten text-walnut px-6 py-4 text-right">
                        {product.nutritionPer100g.calcium}
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </motion.div>
        </motion.div>

        {/* Product Features */}
        <motion.div
          className="relative mx-auto mb-16 max-w-7xl"
          initial="hidden"
          animate={detailsInView ? 'visible' : 'hidden'}
          variants={staggerContainer}
        >
          <div className="bg-bulgarian-red/40 absolute top-0 bottom-0 left-12 hidden w-px lg:block" />

          <motion.div variants={fadeInVariants} className="lg:ml-16">
            <h2 className="font-handwritten text-walnut mb-8 text-4xl">
              Защо да избереш именно този продукт:
            </h2>

            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
              {product.features.map((feature, idx) => (
                <motion.div
                  key={idx}
                  variants={fadeInVariants}
                  custom={idx}
                  className="border-bulgarian-red relative border-l-4 bg-white p-6 shadow-lg"
                >
                  <div className="bg-sunflower absolute top-4 right-4 h-2 w-2 rounded-full" />
                  <p className="font-handwritten text-walnut/80 leading-relaxed">{feature}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </motion.div>

        {/* Testimonials */}
        {product.testimonials && product.testimonials.length > 0 && (
          <motion.div
            ref={testimonialsRef}
            className="relative mx-auto mb-16 max-w-7xl"
            initial="hidden"
            animate={testimonialsInView ? 'visible' : 'hidden'}
            variants={staggerContainer}
          >
            <div className="bg-bulgarian-red/40 absolute top-0 bottom-0 left-12 hidden w-px lg:block" />

            <motion.div variants={fadeInVariants} className="lg:ml-16">
              <h2 className="font-handwritten text-walnut mb-8 text-4xl">
                Какво казват нашите клиенти:
              </h2>

              <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
                {product.testimonials.map((testimonial, idx) => (
                  <motion.div
                    key={idx}
                    variants={fadeInVariants}
                    custom={idx}
                    className="bg-sunflower/10 border-walnut/20 relative border-2 p-8 shadow-lg"
                  >
                    <div className="bg-faded-denim/40 border-faded-denim/60 absolute -top-3 left-8 h-6 w-20 border-r-2 border-l-2" />

                    <p className="font-handwritten text-walnut/80 mb-4 text-lg leading-relaxed italic">
                      "{testimonial.quote}"
                    </p>

                    <div className="flex items-center gap-3">
                      <div className="bg-bulgarian-red/20 border-bulgarian-red/30 flex h-12 w-12 items-center justify-center border-2">
                        <span className="font-handwritten text-walnut text-2xl">
                          {testimonial.name[0]}
                        </span>
                      </div>
                      <div>
                        <p className="font-handwritten text-walnut text-lg">{testimonial.name}</p>
                        <p className="font-handwritten text-walnut/60 text-xs tracking-wider">
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
            className="relative mx-auto max-w-7xl"
            initial="hidden"
            animate={recipesInView ? 'visible' : 'hidden'}
            variants={staggerContainer}
          >
            <div className="bg-bulgarian-red/40 absolute top-0 bottom-0 left-12 hidden w-px lg:block" />

            <motion.div variants={fadeInVariants} className="lg:ml-16">
              <h2 className="font-handwritten text-walnut mb-8 text-4xl">
                Опитай тези рецепти с {product.name}:
              </h2>

              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
                {product.relatedRecipes.map((recipeSlug, idx) => {
                  const recipe = getRecipeBySlug(recipeSlug);
                  if (!recipe) return null;

                  return (
                    <motion.div key={recipeSlug} variants={fadeInVariants} custom={idx}>
                      <Link href={`/recipes/${recipeSlug}`}>
                        <motion.div
                          className="border-walnut/20 relative cursor-pointer overflow-hidden border-2 bg-white shadow-xl transition-shadow duration-300 hover:shadow-2xl"
                          whileHover={{ y: -5 }}
                        >
                          <div className="bg-bulgarian-red/40 border-bulgarian-red/60 absolute -top-2 left-1/2 h-4 w-12 -translate-x-1/2 transform border-r border-l z-10" />

                          {/* Recipe Image */}
                          <div className="relative h-48 w-full">
                            <Image
                              src={recipe.image}
                              alt={recipe.titleBg}
                              fill
                              className="object-cover"
                            />
                          </div>

                          {/* Recipe Title */}
                          <div className="p-4">
                            <p className="font-handwritten text-walnut text-center text-xl line-clamp-2">
                              {recipe.titleBg}
                            </p>

                            <div className="mt-4 text-center">
                              <span className="font-handwritten text-bulgarian-red inline-block text-xs tracking-wider">
                                ВИЖ РЕЦЕПТАТА →
                              </span>
                            </div>
                          </div>
                        </motion.div>
                      </Link>
                    </motion.div>
                  );
                })}
              </div>
            </motion.div>
          </motion.div>
        )}
      </div>
    </div>
  );
}
