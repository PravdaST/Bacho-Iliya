'use client';

import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { ClockIcon, FlameIcon, PlateIcon } from '@/components/icons/RecipeIcons';
import type { Recipe } from '@/lib/recipes-data';

interface RecipeDetailClientProps {
  recipe: Recipe;
}

export default function RecipeDetailClient({ recipe }: RecipeDetailClientProps) {
  return (
    <div className="bg-old-paper relative min-h-screen overflow-hidden">
      {/* Vintage Paper Texture */}
      <div className="bg-vintage-paper absolute inset-0 opacity-30" />

      {/* Hero Section - Polaroid Style */}
      <div className="relative">
        <div className="relative container mx-auto max-w-5xl px-4 py-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            {/* Back Button */}
            <div className="mb-6">
              <Link
                href="/recipes"
                className="font-handwritten text-walnut hover:text-bulgarian-red inline-flex items-center gap-2 transition-colors"
              >
                ← Всички рецепти
              </Link>
            </div>

            {/* Recipe Photo - Polaroid */}
            <div
              className="mx-auto max-w-4xl bg-white p-6 shadow-2xl md:p-8"
              style={{ transform: 'rotate(-1deg)' }}
            >
              <div
                className="border-walnut/20 relative mb-6 h-[400px] overflow-hidden border-4 md:h-[500px]"
                style={{
                  filter: 'sepia(0.3) contrast(1.05)',
                }}
              >
                <Image
                  src={recipe.image}
                  alt={`${recipe.titleBg} - традиционна българска рецепта`}
                  fill
                  className="object-cover"
                  priority
                  unoptimized
                />

                {/* Photo Corners */}
                <div className="border-walnut/60 absolute top-0 left-0 h-8 w-8 border-t-4 border-l-4" />
                <div className="border-walnut/60 absolute top-0 right-0 h-8 w-8 border-t-4 border-r-4" />
                <div className="border-walnut/60 absolute bottom-0 left-0 h-8 w-8 border-b-4 border-l-4" />
                <div className="border-walnut/60 absolute right-0 bottom-0 h-8 w-8 border-r-4 border-b-4" />

                {/* Difficulty Badge */}
                <div className="bg-bulgarian-red/90 font-handwritten absolute top-4 right-4 border-2 border-white px-4 py-2 text-sm font-bold tracking-wide text-white shadow-lg">
                  {recipe.difficulty}
                </div>
              </div>

              {/* Handwritten Title & Description */}
              <h1 className="font-handwritten text-bulgarian-red mb-4 text-center text-4xl md:text-5xl lg:text-6xl">
                {recipe.titleBg}
              </h1>
              <p className="font-handwritten text-walnut mx-auto max-w-3xl text-center text-xl leading-relaxed md:text-2xl">
                {recipe.descriptionBg}
              </p>

              {/* Washi Tape */}
              <div
                className="bg-sunflower/30 absolute -top-4 left-1/2 h-10 w-32 -translate-x-1/2 opacity-60"
                style={{ transform: 'translateX(-50%) rotate(-2deg)' }}
              />
            </div>
          </motion.div>
        </div>
      </div>

      {/* Main Content */}
      <div className="relative container mx-auto max-w-5xl px-4 py-12">
        {/* Quick Info - Notebook Cards */}
        <motion.div
          className="mb-12 grid grid-cols-1 gap-6 md:grid-cols-3"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <div
            className="border-sunflower/40 relative border-4 bg-white p-6 text-center shadow-2xl"
            style={{ transform: 'rotate(-1deg)' }}
          >
            <div className="mb-2 flex justify-center">
              <ClockIcon className="text-walnut h-10 w-10" />
            </div>
            <div className="font-handwritten text-walnut/70 mb-1 text-xs uppercase">Подготовка</div>
            <div className="font-handwritten text-bulgarian-red text-2xl">{recipe.prepTime}</div>
            <div className="bg-vintage-paper pointer-events-none absolute inset-0 opacity-20" />
          </div>
          <div
            className="border-bulgarian-red/40 relative border-4 bg-white p-6 text-center shadow-2xl"
            style={{ transform: 'rotate(1deg)' }}
          >
            <div className="mb-2 flex justify-center">
              <FlameIcon className="text-bulgarian-red h-10 w-10" />
            </div>
            <div className="font-handwritten text-walnut/70 mb-1 text-xs uppercase">Готвене</div>
            <div className="font-handwritten text-bulgarian-red text-2xl">{recipe.cookTime}</div>
            <div className="bg-vintage-paper pointer-events-none absolute inset-0 opacity-20" />
          </div>
          <div
            className="border-faded-denim/40 relative border-4 bg-white p-6 text-center shadow-2xl"
            style={{ transform: 'rotate(-0.5deg)' }}
          >
            <div className="mb-2 flex justify-center">
              <PlateIcon className="text-walnut h-10 w-10" />
            </div>
            <div className="font-handwritten text-walnut/70 mb-1 text-xs uppercase">Порции</div>
            <div className="font-handwritten text-bulgarian-red text-2xl">{recipe.servings}</div>
            <div className="bg-vintage-paper pointer-events-none absolute inset-0 opacity-20" />
          </div>
        </motion.div>

        <div className="mb-12 grid grid-cols-1 gap-8 lg:grid-cols-3">
          {/* Ingredients - Notebook List */}
          <motion.div
            className="lg:col-span-1"
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <div
              className="border-walnut/40 relative sticky top-24 overflow-hidden border-4 bg-white p-6 shadow-2xl"
              style={{ transform: 'rotate(-1deg)' }}
            >
              {/* Notebook Lines */}
              <div className="pointer-events-none absolute inset-0">
                {[...Array(20)].map((_, i) => (
                  <div
                    key={i}
                    className="border-faded-denim/15 absolute right-0 left-0 border-b"
                    style={{ top: `${(i + 1) * 5}%` }}
                  />
                ))}
              </div>

              {/* Left Margin Line */}
              <div className="bg-bulgarian-red/30 absolute top-0 bottom-0 left-10 w-px" />

              {/* Paper Texture */}
              <div className="bg-vintage-paper pointer-events-none absolute inset-0 opacity-20" />

              <h2 className="font-handwritten text-bulgarian-red relative mb-6 text-3xl">
                Необходими продукти
              </h2>
              <ul className="relative space-y-3">
                {recipe.ingredients.map((ingredient, idx) => (
                  <li key={idx} className="flex items-start gap-3">
                    <span className="text-bulgarian-red text-xl font-bold">✓</span>
                    <span className="font-handwritten text-walnut text-lg leading-relaxed">
                      {ingredient.itemBg}
                    </span>
                  </li>
                ))}
              </ul>

              {/* Coffee Stain */}
              <div className="bg-walnut/10 absolute right-4 bottom-4 h-16 w-16 rounded-full opacity-40 blur-sm" />
            </div>
          </motion.div>

          {/* Instructions - Notebook Steps */}
          <motion.div
            className="lg:col-span-2"
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
          >
            <div
              className="border-walnut/40 relative mb-8 overflow-hidden border-4 bg-white p-8 shadow-2xl"
              style={{ transform: 'rotate(0.5deg)' }}
            >
              {/* Notebook Lines */}
              <div className="pointer-events-none absolute inset-0">
                {[...Array(30)].map((_, i) => (
                  <div
                    key={i}
                    className="border-faded-denim/15 absolute right-0 left-0 border-b"
                    style={{ top: `${(i + 1) * 3.33}%` }}
                  />
                ))}
              </div>

              {/* Left Margin Line */}
              <div className="bg-bulgarian-red/30 absolute top-0 bottom-0 left-12 w-px" />

              {/* Paper Texture */}
              <div className="bg-vintage-paper pointer-events-none absolute inset-0 opacity-20" />

              <h2 className="font-handwritten text-bulgarian-red relative mb-8 text-4xl">
                Приготвяне
              </h2>
              <div className="relative space-y-6">
                {recipe.instructions.map((instruction, idx) => (
                  <div
                    key={idx}
                    className="border-walnut/30 flex gap-4 border-b border-dashed pb-6 last:border-0 last:pb-0"
                  >
                    <div
                      className="bg-bulgarian-red font-handwritten border-walnut/20 flex h-10 w-10 flex-shrink-0 items-center justify-center border-2 font-bold"
                      style={{ color: '#ffffff' }}
                    >
                      {idx + 1}
                    </div>
                    <div className="flex-1">
                      <p className="font-handwritten text-walnut text-lg leading-relaxed md:text-xl">
                        {instruction.stepBg}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Coffee Stains */}
              <div className="bg-walnut/10 absolute top-6 right-6 h-16 w-16 rounded-full opacity-40 blur-sm" />
              <div className="bg-walnut/10 absolute bottom-8 left-8 h-20 w-20 rounded-full opacity-40 blur-sm" />
            </div>

            {/* Tips - Notebook Notes */}
            <div
              className="bg-old-paper border-bulgarian-red/40 relative overflow-hidden border-4 p-8 shadow-2xl"
              style={{ transform: 'rotate(-0.5deg)' }}
            >
              {/* Notebook Lines */}
              <div className="pointer-events-none absolute inset-0">
                {[...Array(15)].map((_, i) => (
                  <div
                    key={i}
                    className="border-faded-denim/15 absolute right-0 left-0 border-b"
                    style={{ top: `${(i + 1) * 6.66}%` }}
                  />
                ))}
              </div>

              {/* Paper Texture */}
              <div className="bg-vintage-paper pointer-events-none absolute inset-0 opacity-20" />

              <h2 className="font-handwritten text-bulgarian-red relative mb-6 text-3xl">
                Бабини Съвети
              </h2>
              <div className="relative space-y-4">
                {recipe.tips.map((tip, idx) => (
                  <div
                    key={idx}
                    className="border-bulgarian-red relative border-l-4 bg-white/60 p-4"
                  >
                    <p className="font-handwritten text-walnut text-lg leading-relaxed italic">
                      {tip.tipBg}
                    </p>
                  </div>
                ))}
              </div>

              {/* Washi Tape */}
              <div
                className="bg-sunflower/30 absolute -top-3 right-8 h-8 w-24 opacity-60"
                style={{ transform: 'rotate(15deg)' }}
              />
            </div>
          </motion.div>
        </div>

        {/* Story Section - Notebook Page */}
        <motion.div
          className="border-walnut/40 relative mx-auto mb-12 max-w-4xl overflow-hidden border-4 bg-white p-8 shadow-2xl md:p-12"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          style={{ transform: 'rotate(-0.5deg)' }}
        >
          {/* Notebook Lines */}
          <div className="pointer-events-none absolute inset-0">
            {[...Array(15)].map((_, i) => (
              <div
                key={i}
                className="border-faded-denim/15 absolute right-0 left-0 border-b"
                style={{ top: `${(i + 1) * 6.66}%` }}
              />
            ))}
          </div>

          {/* Left Margin Line */}
          <div className="bg-bulgarian-red/30 absolute top-0 bottom-0 left-12 w-px" />

          {/* Perforation Holes */}
          <div className="absolute top-0 bottom-0 left-0 hidden w-10 flex-col justify-around py-8 md:flex">
            {[...Array(12)].map((_, i) => (
              <div
                key={i}
                className="bg-walnut/20 border-walnut/10 ml-3.5 h-2.5 w-2.5 rounded-full border"
              />
            ))}
          </div>

          {/* Paper Texture */}
          <div className="bg-vintage-paper pointer-events-none absolute inset-0 opacity-20" />

          <div className="relative">
            <h2 className="font-handwritten text-bulgarian-red mb-6 text-4xl">
              Историята зад рецептата
            </h2>
            <p className="font-handwritten text-walnut mb-8 text-xl leading-relaxed md:text-2xl">
              {recipe.storyBg}
            </p>
            <div className="border-walnut/30 mt-8 border-t border-dashed pt-6">
              <p className="font-handwritten text-walnut text-lg">
                Всички продукти са направени по традиционни рецепти, без консерванти и химия, точно
                както бабите правеха преди 30+ години. Вкусът от детството на вашата трапеза!
              </p>
            </div>
          </div>

          {/* Coffee Stain */}
          <div className="bg-walnut/10 absolute right-6 bottom-6 h-20 w-20 rounded-full opacity-40 blur-sm" />
        </motion.div>

        {/* CTA Section - Notebook Card */}
        <motion.div
          className="mx-auto max-w-4xl"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.7 }}
        >
          <div
            className="border-bulgarian-red/40 relative overflow-hidden border-4 bg-white p-8 text-center shadow-2xl md:p-12"
            style={{ transform: 'rotate(1deg)' }}
          >
            {/* Notebook Lines */}
            <div className="pointer-events-none absolute inset-0">
              {[...Array(10)].map((_, i) => (
                <div
                  key={i}
                  className="border-faded-denim/15 absolute right-0 left-0 border-b"
                  style={{ top: `${(i + 1) * 10}%` }}
                />
              ))}
            </div>

            {/* Paper Texture */}
            <div className="bg-vintage-paper pointer-events-none absolute inset-0 opacity-20" />

            <div className="relative">
              <h2 className="font-handwritten text-bulgarian-red mb-6 text-4xl md:text-5xl">
                Искате да Опитате Автентичните Продукти?
              </h2>
              <p className="font-handwritten text-walnut mx-auto mb-8 max-w-2xl text-xl leading-relaxed md:text-2xl">
                Участвайте в нашето голямо раздаване и спечелете натурални млечни продукти - бяло
                сирене, кашкавал и кисело мляко направени от щастливи крави!
              </p>
              <div className="flex flex-col justify-center gap-4 sm:flex-row">
                <Link
                  href="/"
                  className="bg-bulgarian-red font-handwritten border-bulgarian-red group relative inline-block overflow-hidden border-4 border-dashed px-10 py-5 text-xl font-bold text-white uppercase shadow-2xl transition-all hover:scale-105"
                >
                  <span className="relative z-10">Участвай в Раздаването →</span>
                  <div className="from-bulgarian-red via-sunflower/20 to-bulgarian-red absolute inset-0 bg-gradient-to-r opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
                </Link>
                <Link
                  href="/recipes"
                  className="border-walnut text-walnut font-handwritten hover:bg-old-paper inline-block border-4 bg-white px-10 py-5 text-xl font-bold uppercase shadow-xl transition-all hover:scale-105"
                >
                  Още Рецепти
                </Link>
              </div>
            </div>

            {/* Coffee Stains */}
            <div className="bg-walnut/10 absolute top-4 right-4 h-16 w-16 rounded-full opacity-40 blur-sm" />
            <div className="bg-walnut/10 absolute bottom-4 left-4 h-20 w-20 rounded-full opacity-40 blur-sm" />

            {/* Washi Tape diagonal */}
            <div
              className="bg-sunflower/30 absolute -top-4 -left-2 h-8 w-32 opacity-60"
              style={{ transform: 'rotate(-45deg)' }}
            />
          </div>
        </motion.div>
      </div>
    </div>
  );
}
