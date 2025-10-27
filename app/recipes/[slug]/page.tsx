'use client';

import { use } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import { motion } from 'framer-motion';
import { getRecipeBySlug } from '@/lib/recipes-data';
import { ClockIcon, FlameIcon, PlateIcon, CheckIcon } from '@/components/icons/RecipeIcons';
import { RecipeSchema, BreadcrumbSchema } from '@/components/seo';

type Props = {
  params: Promise<{ slug: string }>;
};

export default function RecipePage({ params }: Props) {
  const { slug } = use(params);
  const recipe = getRecipeBySlug(slug);

  if (!recipe) {
    notFound();
  }

  return (
    <>
      {/* Google 2025 Compliant Recipe Schema */}
      <RecipeSchema recipe={recipe} />

      {/* Breadcrumb Schema for better SERP display */}
      <BreadcrumbSchema
        items={[
          { name: 'Начало', url: '/' },
          { name: 'Рецепти', url: '/recipes' },
          { name: recipe.titleBg, url: `/recipes/${slug}` },
        ]}
      />

      <div className="min-h-screen bg-old-paper relative overflow-hidden">
        {/* Vintage Paper Texture */}
        <div className="absolute inset-0 bg-vintage-paper opacity-30" />

        {/* Hero Section - Polaroid Style */}
        <div className="relative">
          <div className="container mx-auto px-4 max-w-5xl py-12 relative">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              {/* Back Button */}
              <div className="mb-6">
                <Link
                  href="/recipes"
                  className="font-handwritten text-walnut hover:text-bulgarian-red transition-colors inline-flex items-center gap-2"
                >
                  ← Всички рецепти
                </Link>
              </div>

              {/* Recipe Photo - Polaroid */}
              <div className="bg-white p-6 md:p-8 shadow-2xl max-w-4xl mx-auto" style={{ transform: 'rotate(-1deg)' }}>
                <div className="relative h-[400px] md:h-[500px] overflow-hidden border-4 border-walnut/20 mb-6" style={{
                  filter: 'sepia(0.3) contrast(1.05)',
                }}>
                  <Image
                    src={recipe.image}
                    alt={`${recipe.titleBg} - традиционна българска рецепта`}
                    fill
                    className="object-cover"
                    priority
                    unoptimized
                  />

                  {/* Photo Corners */}
                  <div className="absolute top-0 left-0 w-8 h-8 border-t-4 border-l-4 border-walnut/60" />
                  <div className="absolute top-0 right-0 w-8 h-8 border-t-4 border-r-4 border-walnut/60" />
                  <div className="absolute bottom-0 left-0 w-8 h-8 border-b-4 border-l-4 border-walnut/60" />
                  <div className="absolute bottom-0 right-0 w-8 h-8 border-b-4 border-r-4 border-walnut/60" />

                  {/* Difficulty Badge */}
                  <div className="absolute top-4 right-4 bg-bulgarian-red/90 px-4 py-2 text-sm font-handwritten text-white font-bold tracking-wide border-2 border-white shadow-lg">
                    {recipe.difficulty}
                  </div>
                </div>

                {/* Handwritten Title & Description */}
                <h1 className="font-handwritten text-bulgarian-red text-4xl md:text-5xl lg:text-6xl mb-4 text-center">
                  {recipe.titleBg}
                </h1>
                <p className="font-handwritten text-walnut text-xl md:text-2xl leading-relaxed text-center max-w-3xl mx-auto">
                  {recipe.descriptionBg}
                </p>

                {/* Washi Tape */}
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 w-32 h-10 bg-sunflower/30 opacity-60"
                  style={{ transform: 'translateX(-50%) rotate(-2deg)' }} />
              </div>
            </motion.div>
          </div>
        </div>

        {/* Main Content */}
        <div className="container mx-auto px-4 max-w-5xl py-12 relative">
          {/* Quick Info - Notebook Cards */}
          <motion.div
            className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <div className="bg-white border-4 border-sunflower/40 p-6 text-center shadow-2xl relative" style={{ transform: 'rotate(-1deg)' }}>
              <div className="flex justify-center mb-2">
                <ClockIcon className="w-10 h-10 text-walnut" />
              </div>
              <div className="font-handwritten text-xs text-walnut/70 uppercase mb-1">Подготовка</div>
              <div className="font-handwritten text-2xl text-bulgarian-red">{recipe.prepTime}</div>
              {/* Paper texture */}
              <div className="absolute inset-0 bg-vintage-paper opacity-20 pointer-events-none" />
            </div>
            <div className="bg-white border-4 border-bulgarian-red/40 p-6 text-center shadow-2xl relative" style={{ transform: 'rotate(1deg)' }}>
              <div className="flex justify-center mb-2">
                <FlameIcon className="w-10 h-10 text-bulgarian-red" />
              </div>
              <div className="font-handwritten text-xs text-walnut/70 uppercase mb-1">Готвене</div>
              <div className="font-handwritten text-2xl text-bulgarian-red">{recipe.cookTime}</div>
              {/* Paper texture */}
              <div className="absolute inset-0 bg-vintage-paper opacity-20 pointer-events-none" />
            </div>
            <div className="bg-white border-4 border-faded-denim/40 p-6 text-center shadow-2xl relative" style={{ transform: 'rotate(-0.5deg)' }}>
              <div className="flex justify-center mb-2">
                <PlateIcon className="w-10 h-10 text-walnut" />
              </div>
              <div className="font-handwritten text-xs text-walnut/70 uppercase mb-1">Порции</div>
              <div className="font-handwritten text-2xl text-bulgarian-red">{recipe.servings}</div>
              {/* Paper texture */}
              <div className="absolute inset-0 bg-vintage-paper opacity-20 pointer-events-none" />
            </div>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
            {/* Ingredients - Notebook List */}
            <motion.div
              className="lg:col-span-1"
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              <div className="bg-white border-4 border-walnut/40 p-6 shadow-2xl sticky top-24 relative overflow-hidden" style={{ transform: 'rotate(-1deg)' }}>
                {/* Notebook Lines */}
                <div className="absolute inset-0 pointer-events-none">
                  {[...Array(20)].map((_, i) => (
                    <div
                      key={i}
                      className="absolute left-0 right-0 border-b border-faded-denim/15"
                      style={{ top: `${(i + 1) * 5}%` }}
                    />
                  ))}
                </div>

                {/* Left Margin Line */}
                <div className="absolute left-10 top-0 bottom-0 w-px bg-bulgarian-red/30" />

                {/* Paper Texture */}
                <div className="absolute inset-0 bg-vintage-paper opacity-20 pointer-events-none" />

                <h2 className="font-handwritten text-bulgarian-red text-3xl mb-6 relative">
                  Необходими продукти
                </h2>
                <ul className="space-y-3 relative">
                  {recipe.ingredients.map((ingredient, idx) => (
                    <li
                      key={idx}
                      className="flex items-start gap-3"
                    >
                      <span className="text-bulgarian-red font-bold text-xl">✓</span>
                      <span className="font-handwritten text-walnut text-lg leading-relaxed">{ingredient.itemBg}</span>
                    </li>
                  ))}
                </ul>

                {/* Coffee Stain */}
                <div className="absolute bottom-4 right-4 w-16 h-16 rounded-full bg-walnut/10 blur-sm opacity-40" />
              </div>
            </motion.div>

            {/* Instructions - Notebook Steps */}
            <motion.div
              className="lg:col-span-2"
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
            >
              <div className="bg-white border-4 border-walnut/40 p-8 shadow-2xl mb-8 relative overflow-hidden" style={{ transform: 'rotate(0.5deg)' }}>
                {/* Notebook Lines */}
                <div className="absolute inset-0 pointer-events-none">
                  {[...Array(30)].map((_, i) => (
                    <div
                      key={i}
                      className="absolute left-0 right-0 border-b border-faded-denim/15"
                      style={{ top: `${(i + 1) * 3.33}%` }}
                    />
                  ))}
                </div>

                {/* Left Margin Line */}
                <div className="absolute left-12 top-0 bottom-0 w-px bg-bulgarian-red/30" />

                {/* Paper Texture */}
                <div className="absolute inset-0 bg-vintage-paper opacity-20 pointer-events-none" />

                <h2 className="font-handwritten text-bulgarian-red text-4xl mb-8 relative">
                  Приготвяне
                </h2>
                <div className="space-y-6 relative">
                  {recipe.instructions.map((instruction, idx) => (
                    <div
                      key={idx}
                      className="flex gap-4 pb-6 border-b border-dashed border-walnut/30 last:border-0 last:pb-0"
                    >
                      <div className="flex-shrink-0 w-10 h-10 bg-bulgarian-red text-white flex items-center justify-center font-handwritten font-bold border-2 border-walnut/20">
                        {idx + 1}
                      </div>
                      <div className="flex-1">
                        <p className="font-handwritten text-walnut text-lg md:text-xl leading-relaxed">
                          {instruction.stepBg}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Coffee Stains */}
                <div className="absolute top-6 right-6 w-16 h-16 rounded-full bg-walnut/10 blur-sm opacity-40" />
                <div className="absolute bottom-8 left-8 w-20 h-20 rounded-full bg-walnut/10 blur-sm opacity-40" />
              </div>

              {/* Tips - Notebook Notes */}
              <div className="bg-old-paper border-4 border-bulgarian-red/40 p-8 shadow-2xl relative overflow-hidden" style={{ transform: 'rotate(-0.5deg)' }}>
                {/* Notebook Lines */}
                <div className="absolute inset-0 pointer-events-none">
                  {[...Array(15)].map((_, i) => (
                    <div
                      key={i}
                      className="absolute left-0 right-0 border-b border-faded-denim/15"
                      style={{ top: `${(i + 1) * 6.66}%` }}
                    />
                  ))}
                </div>

                {/* Paper Texture */}
                <div className="absolute inset-0 bg-vintage-paper opacity-20 pointer-events-none" />

                <h2 className="font-handwritten text-bulgarian-red text-3xl mb-6 relative">
                  Бабини Съвети
                </h2>
                <div className="space-y-4 relative">
                  {recipe.tips.map((tip, idx) => (
                    <div
                      key={idx}
                      className="bg-white/60 border-l-4 border-bulgarian-red p-4 relative"
                    >
                      <p className="font-handwritten text-walnut text-lg leading-relaxed italic">{tip.tipBg}</p>
                    </div>
                  ))}
                </div>

                {/* Washi Tape */}
                <div className="absolute -top-3 right-8 w-24 h-8 bg-sunflower/30 opacity-60"
                  style={{ transform: 'rotate(15deg)' }} />
              </div>
            </motion.div>
          </div>

          {/* Story Section - Notebook Page */}
          <motion.div
            className="bg-white border-4 border-walnut/40 p-8 md:p-12 mb-12 shadow-2xl relative overflow-hidden max-w-4xl mx-auto"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            style={{ transform: 'rotate(-0.5deg)' }}
          >
            {/* Notebook Lines */}
            <div className="absolute inset-0 pointer-events-none">
              {[...Array(15)].map((_, i) => (
                <div
                  key={i}
                  className="absolute left-0 right-0 border-b border-faded-denim/15"
                  style={{ top: `${(i + 1) * 6.66}%` }}
                />
              ))}
            </div>

            {/* Left Margin Line */}
            <div className="absolute left-12 top-0 bottom-0 w-px bg-bulgarian-red/30" />

            {/* Perforation Holes */}
            <div className="absolute left-0 top-0 bottom-0 w-10 hidden md:flex flex-col justify-around py-8">
              {[...Array(12)].map((_, i) => (
                <div key={i} className="w-2.5 h-2.5 bg-walnut/20 rounded-full ml-3.5 border border-walnut/10" />
              ))}
            </div>

            {/* Paper Texture */}
            <div className="absolute inset-0 bg-vintage-paper opacity-20 pointer-events-none" />

            <div className="relative">
              <h2 className="font-handwritten text-bulgarian-red text-4xl mb-6">
                Историята зад рецептата
              </h2>
              <p className="font-handwritten text-walnut text-xl md:text-2xl leading-relaxed mb-8">
                {recipe.storyBg}
              </p>
              <div className="mt-8 pt-6 border-t border-dashed border-walnut/30">
                <p className="font-handwritten text-walnut text-lg">
                  Всички продукти са направени по традиционни рецепти, без консерванти
                  и химия, точно както бабите правеха преди 30+ години. Вкусът от детството
                  на вашата трапеза!
                </p>
              </div>
            </div>

            {/* Coffee Stain */}
            <div className="absolute bottom-6 right-6 w-20 h-20 rounded-full bg-walnut/10 blur-sm opacity-40" />
          </motion.div>

          {/* CTA Section - Notebook Card */}
          <motion.div
            className="max-w-4xl mx-auto"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.7 }}
          >
            <div className="bg-white border-4 border-bulgarian-red/40 p-8 md:p-12 text-center shadow-2xl relative overflow-hidden" style={{ transform: 'rotate(1deg)' }}>
              {/* Notebook Lines */}
              <div className="absolute inset-0 pointer-events-none">
                {[...Array(10)].map((_, i) => (
                  <div
                    key={i}
                    className="absolute left-0 right-0 border-b border-faded-denim/15"
                    style={{ top: `${(i + 1) * 10}%` }}
                  />
                ))}
              </div>

              {/* Paper Texture */}
              <div className="absolute inset-0 bg-vintage-paper opacity-20 pointer-events-none" />

              <div className="relative">
                <h2 className="font-handwritten text-bulgarian-red text-4xl md:text-5xl mb-6">
                  Искате да Опитате Автентичните Продукти?
                </h2>
                <p className="font-handwritten text-walnut text-xl md:text-2xl leading-relaxed mb-8 max-w-2xl mx-auto">
                  Участвайте в нашето голямо раздаване и спечелете натурални млечни продукти -
                  бяло сирене, кашкавал и кисело мляко направени от щастливи крави!
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Link
                    href="/"
                    className="inline-block bg-bulgarian-red text-white px-10 py-5 font-handwritten text-xl font-bold uppercase shadow-2xl hover:scale-105 transition-all border-4 border-dashed border-bulgarian-red relative overflow-hidden group"
                  >
                    <span className="relative z-10">Участвай в Раздаването →</span>
                    <div className="absolute inset-0 bg-gradient-to-r from-bulgarian-red via-sunflower/20 to-bulgarian-red opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  </Link>
                  <Link
                    href="/recipes"
                    className="inline-block bg-white border-4 border-walnut text-walnut px-10 py-5 font-handwritten text-xl font-bold uppercase hover:bg-old-paper transition-all hover:scale-105 shadow-xl"
                  >
                    Още Рецепти
                  </Link>
                </div>
              </div>

              {/* Coffee Stains */}
              <div className="absolute top-4 right-4 w-16 h-16 rounded-full bg-walnut/10 blur-sm opacity-40" />
              <div className="absolute bottom-4 left-4 w-20 h-20 rounded-full bg-walnut/10 blur-sm opacity-40" />

              {/* Washi Tape diagonal */}
              <div className="absolute -top-4 -left-2 w-32 h-8 bg-sunflower/30 opacity-60"
                style={{ transform: 'rotate(-45deg)' }} />
            </div>
          </motion.div>
        </div>
      </div>
    </>
  );
}
