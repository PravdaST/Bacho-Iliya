'use client';

import { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { recipes } from '@/lib/recipes-data';
import { ClockIcon, PlateIcon } from '@/components/icons/RecipeIcons';

export default function RecipesPage() {
  return (
    <div className="bg-old-paper relative min-h-screen overflow-hidden py-12">
      {/* Vintage Paper Texture */}
      <div className="bg-vintage-paper absolute inset-0 opacity-30" />

      <div className="relative container mx-auto max-w-7xl px-4">
        {/* Header - Handwritten Title */}
        <motion.div
          className="mb-12 text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1
            className="font-handwritten text-bulgarian-red mb-4"
            style={{ fontSize: '56px', lineHeight: 1.2 }}
          >
            Бабините рецепти
          </h1>
          <p className="font-handwritten text-walnut mx-auto max-w-3xl text-xl">
            Открийте вкуса на детството с автентични рецепти, направени с натурални млечни продукти
            - точно както бабите правеха преди 30+ години.
          </p>
        </motion.div>

        {/* Story Section - Notebook Page */}
        <motion.div
          className="border-walnut/40 relative mx-auto mb-12 max-w-4xl overflow-hidden border-4 bg-white p-8 shadow-2xl md:p-12"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
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

          {/* Content */}
          <div className="relative">
            <h2 className="font-handwritten text-bulgarian-red mb-6 text-3xl md:text-4xl">
              Вкусът от Детството
            </h2>
            <p className="font-handwritten text-walnut mb-6 text-xl leading-relaxed md:text-2xl">
              Всяка рецепта тук е създадена с любов и носи духа на българската традиция. Тайната на
              автентичния вкус е в качествените продукти - произведени по бабини рецепти, без
              консерванти и химия, точно както трябва да бъдат.
            </p>
            <p className="font-handwritten text-walnut mb-6 text-xl leading-relaxed md:text-2xl">
              От хрупкавата баница до класическата шопска салата, всяко ястие е усъвършенствано през
              годините. Бяло сирене, кашкавал и кисело мляко направени от щастливи крави връщат
              спомените от бабината кухня.
            </p>
            <div className="bg-old-paper/60 border-bulgarian-red mt-8 border-l-4 p-4">
              <p className="font-handwritten text-walnut text-xl leading-relaxed italic md:text-2xl">
                "Традицията не е да пазим пепелта, а да предаваме огъня." - Всяка рецепта е мост
                между поколенията.
              </p>
            </div>
          </div>

          {/* Coffee Stain */}
          <div className="bg-walnut/10 absolute right-6 bottom-6 h-20 w-20 rounded-full opacity-40 blur-sm" />
        </motion.div>

        {/* Recipes Grid - Polaroid Style */}
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 md:gap-12 lg:grid-cols-3">
          {recipes.map((recipe, index) => {
            const rotations = ['-2deg', '1.5deg', '-1deg', '2deg', '-1.5deg', '1deg'];
            const rotation = rotations[index % rotations.length];

            return (
              <motion.div
                key={recipe.slug}
                initial={{ opacity: 0, y: 30, rotate: 0 }}
                whileInView={{ opacity: 1, y: 0, rotate: parseFloat(rotation) }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                style={{ transform: `rotate(${rotation})` }}
              >
                <Link href={`/recipes/${recipe.slug}`} className="group block">
                  {/* Polaroid Card */}
                  <div className="hover:shadow-vintage-lg bg-white p-5 shadow-2xl transition-all hover:scale-105">
                    {/* Recipe Photo with Sepia */}
                    <div
                      className="border-walnut/20 relative mb-4 h-64 overflow-hidden border-2 md:h-80"
                      style={{
                        filter: 'sepia(0.4) contrast(1.05)',
                      }}
                    >
                      <Image
                        src={recipe.image}
                        alt={`${recipe.titleBg} - традиционна българска рецепта`}
                        fill
                        className="object-cover transition-transform duration-700 group-hover:scale-110"
                        unoptimized
                      />

                      {/* Photo Corners */}
                      <div className="border-walnut/60 absolute top-0 left-0 h-6 w-6 border-t-2 border-l-2" />
                      <div className="border-walnut/60 absolute top-0 right-0 h-6 w-6 border-t-2 border-r-2" />
                      <div className="border-walnut/60 absolute bottom-0 left-0 h-6 w-6 border-b-2 border-l-2" />
                      <div className="border-walnut/60 absolute right-0 bottom-0 h-6 w-6 border-r-2 border-b-2" />

                      {/* Difficulty Badge */}
                      <div className="bg-bulgarian-red/90 font-handwritten absolute top-3 right-3 border-2 border-white px-3 py-1 text-xs font-bold tracking-wide text-white shadow-lg">
                        {recipe.difficulty}
                      </div>
                    </div>

                    {/* Handwritten Recipe Title */}
                    <h3 className="font-handwritten text-walnut group-hover:text-bulgarian-red mb-3 text-center text-2xl transition-colors md:text-3xl">
                      {recipe.titleBg}
                    </h3>

                    {/* Description */}
                    <p className="font-handwritten text-walnut mb-4 line-clamp-2 text-center text-lg leading-relaxed">
                      {recipe.descriptionBg}
                    </p>

                    {/* Bacho Products Tags */}
                    <div className="mb-4 flex flex-wrap justify-center gap-2">
                      {recipe.bachoProducts.map((product, idx) => (
                        <span
                          key={idx}
                          className="bg-old-paper text-walnut border-walnut/40 font-handwritten border px-2 py-1 text-xs"
                        >
                          {product}
                        </span>
                      ))}
                    </div>

                    {/* Meta Info */}
                    <div className="text-walnut border-walnut/30 font-handwritten flex items-center justify-center gap-6 border-t border-dashed pt-4 text-sm">
                      <span className="flex items-center gap-1">
                        <ClockIcon className="h-4 w-4" /> {recipe.prepTime}
                      </span>
                      <span className="flex items-center gap-1">
                        <PlateIcon className="h-4 w-4" /> {recipe.servings} порции
                      </span>
                    </div>

                    {/* Washi Tape at top */}
                    <div
                      className="bg-sunflower/30 absolute -top-3 left-1/2 h-8 w-24 -translate-x-1/2 opacity-60"
                      style={{ transform: 'translateX(-50%) rotate(-2deg)' }}
                    />
                  </div>
                </Link>
              </motion.div>
            );
          })}
        </div>

        {/* Bottom CTA - Notebook Card */}
        <motion.div
          className="mx-auto mt-16 max-w-4xl"
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div
            className="border-bulgarian-red/40 relative overflow-hidden border-4 bg-white p-8 shadow-2xl md:p-12"
            style={{ transform: 'rotate(-1deg)' }}
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

            {/* Content */}
            <div className="relative text-center">
              <h2 className="font-handwritten text-bulgarian-red mb-6 text-4xl md:text-5xl">
                Готови да Опитате Автентичния Вкус?
              </h2>
              <p className="font-handwritten text-walnut mx-auto mb-8 max-w-2xl text-xl leading-relaxed md:text-2xl">
                Спечелете натурални млечни продукти - бяло сирене, кашкавал и кисело мляко без
                консерванти, направени по традиционни рецепти.
              </p>
              <Link
                href="/"
                className="bg-bulgarian-red font-handwritten group relative inline-block overflow-hidden border-4 border-dashed border-white px-10 py-5 text-xl font-bold text-white uppercase shadow-2xl transition-all hover:scale-105 md:text-2xl"
              >
                <span className="relative z-10">Участвай в Раздаването →</span>
                {/* Hover effect */}
                <div className="from-bulgarian-red via-sunflower/20 to-bulgarian-red absolute inset-0 bg-gradient-to-r opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
              </Link>
            </div>

            {/* Coffee Stains */}
            <div className="bg-walnut/10 absolute top-4 right-4 h-16 w-16 rounded-full opacity-40 blur-sm" />
            <div className="bg-walnut/10 absolute bottom-4 left-4 h-20 w-20 rounded-full opacity-40 blur-sm" />

            {/* Washi Tape diagonal */}
            <div
              className="bg-sunflower/30 absolute -top-4 -right-2 h-8 w-32 opacity-60"
              style={{ transform: 'rotate(45deg)' }}
            />
          </div>
        </motion.div>
      </div>
    </div>
  );
}
