'use client';

import { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { recipes } from '@/lib/recipes-data';
import { ClockIcon, PlateIcon } from '@/components/icons/RecipeIcons';

export default function RecipesPage() {
  return (
    <div className="min-h-screen bg-old-paper py-12 relative overflow-hidden">
      {/* Vintage Paper Texture */}
      <div className="absolute inset-0 bg-vintage-paper opacity-30" />

      <div className="container mx-auto px-4 max-w-7xl relative">
        {/* Header - Handwritten Title */}
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="font-handwritten text-bulgarian-red mb-4" style={{ fontSize: '56px', lineHeight: 1.2 }}>
            Бабините рецепти
          </h1>
          <p className="font-handwritten text-walnut text-xl max-w-3xl mx-auto">
            Открийте вкуса на детството с автентични рецепти, направени с натурални
            млечни продукти - точно както бабите правеха преди 30+ години.
          </p>
        </motion.div>

        {/* Story Section - Notebook Page */}
        <motion.div
          className="bg-white border-4 border-walnut/40 p-8 md:p-12 mb-12 shadow-2xl relative overflow-hidden max-w-4xl mx-auto"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
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

          {/* Content */}
          <div className="relative">
            <h2 className="font-handwritten text-bulgarian-red text-3xl md:text-4xl mb-6">
              Вкусът от Детството
            </h2>
            <p className="font-handwritten text-walnut text-xl md:text-2xl leading-relaxed mb-6">
              Всяка рецепта тук е създадена с любов и носи духа на българската традиция.
              Тайната на автентичния вкус е в качествените продукти - произведени
              по бабини рецепти, без консерванти и химия, точно както трябва да бъдат.
            </p>
            <p className="font-handwritten text-walnut text-xl md:text-2xl leading-relaxed mb-6">
              От хрупкавата баница до класическата шопска салата, всяко ястие е
              усъвършенствано през годините. Бяло сирене, кашкавал и кисело мляко
              направени от щастливи крави връщат спомените от бабината кухня.
            </p>
            <div className="bg-old-paper/60 border-l-4 border-bulgarian-red p-4 mt-8">
              <p className="font-handwritten text-walnut text-xl md:text-2xl italic leading-relaxed">
                "Традицията не е да пазим пепелта, а да предаваме огъня."
                - Всяка рецепта е мост между поколенията.
              </p>
            </div>
          </div>

          {/* Coffee Stain */}
          <div className="absolute bottom-6 right-6 w-20 h-20 rounded-full bg-walnut/10 blur-sm opacity-40" />
        </motion.div>

        {/* Recipes Grid - Polaroid Style */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-12">
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
                <Link href={`/recipes/${recipe.slug}`} className="block group">
                  {/* Polaroid Card */}
                  <div className="bg-white p-5 shadow-2xl hover:shadow-vintage-lg transition-all hover:scale-105">
                    {/* Recipe Photo with Sepia */}
                    <div className="relative h-64 md:h-80 overflow-hidden border-2 border-walnut/20 mb-4" style={{
                      filter: 'sepia(0.4) contrast(1.05)',
                    }}>
                      <Image
                        src={recipe.image}
                        alt={`${recipe.titleBg} - традиционна българска рецепта`}
                        fill
                        className="object-cover group-hover:scale-110 transition-transform duration-700"
                        unoptimized
                      />

                      {/* Photo Corners */}
                      <div className="absolute top-0 left-0 w-6 h-6 border-t-2 border-l-2 border-walnut/60" />
                      <div className="absolute top-0 right-0 w-6 h-6 border-t-2 border-r-2 border-walnut/60" />
                      <div className="absolute bottom-0 left-0 w-6 h-6 border-b-2 border-l-2 border-walnut/60" />
                      <div className="absolute bottom-0 right-0 w-6 h-6 border-b-2 border-r-2 border-walnut/60" />

                      {/* Difficulty Badge */}
                      <div className="absolute top-3 right-3 bg-bulgarian-red/90 px-3 py-1 text-xs font-mono text-white font-bold tracking-wide border-2 border-white shadow-lg">
                        {recipe.difficulty}
                      </div>
                    </div>

                    {/* Handwritten Recipe Title */}
                    <h3 className="font-handwritten text-walnut text-2xl md:text-3xl mb-3 text-center group-hover:text-bulgarian-red transition-colors">
                      {recipe.titleBg}
                    </h3>

                    {/* Description */}
                    <p className="font-handwritten text-walnut text-lg leading-relaxed mb-4 line-clamp-2 text-center">
                      {recipe.descriptionBg}
                    </p>

                    {/* Bacho Products Tags */}
                    <div className="flex flex-wrap gap-2 mb-4 justify-center">
                      {recipe.bachoProducts.map((product, idx) => (
                        <span
                          key={idx}
                          className="bg-old-paper text-walnut text-xs px-2 py-1 border border-walnut/40 font-mono"
                        >
                          {product}
                        </span>
                      ))}
                    </div>

                    {/* Meta Info */}
                    <div className="flex items-center justify-center gap-6 text-sm text-walnut border-t border-dashed border-walnut/30 pt-4 font-mono">
                      <span className="flex items-center gap-1">
                        <ClockIcon className="w-4 h-4" /> {recipe.prepTime}
                      </span>
                      <span className="flex items-center gap-1">
                        <PlateIcon className="w-4 h-4" /> {recipe.servings} порции
                      </span>
                    </div>

                    {/* Washi Tape at top */}
                    <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-24 h-8 bg-sunflower/30 opacity-60"
                      style={{ transform: 'translateX(-50%) rotate(-2deg)' }} />
                  </div>
                </Link>
              </motion.div>
            );
          })}
        </div>

        {/* Bottom CTA - Notebook Card */}
        <motion.div
          className="mt-16 max-w-4xl mx-auto"
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="bg-white border-4 border-bulgarian-red/40 p-8 md:p-12 shadow-2xl relative overflow-hidden" style={{ transform: 'rotate(-1deg)' }}>
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

            {/* Content */}
            <div className="relative text-center">
              <h2 className="font-handwritten text-bulgarian-red text-4xl md:text-5xl mb-6">
                Готови да Опитате Автентичния Вкус?
              </h2>
              <p className="font-handwritten text-walnut text-xl md:text-2xl leading-relaxed mb-8 max-w-2xl mx-auto">
                Спечелете натурални млечни продукти - бяло сирене, кашкавал и кисело мляко
                без консерванти, направени по традиционни рецепти.
              </p>
              <Link
                href="/"
                className="inline-block bg-bulgarian-red text-white px-10 py-5 font-handwritten text-xl md:text-2xl font-bold uppercase shadow-2xl hover:scale-105 transition-all border-4 border-dashed border-white relative overflow-hidden group"
              >
                <span className="relative z-10">Участвай в Раздаването →</span>
                {/* Hover effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-bulgarian-red via-sunflower/20 to-bulgarian-red opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              </Link>
            </div>

            {/* Coffee Stains */}
            <div className="absolute top-4 right-4 w-16 h-16 rounded-full bg-walnut/10 blur-sm opacity-40" />
            <div className="absolute bottom-4 left-4 w-20 h-20 rounded-full bg-walnut/10 blur-sm opacity-40" />

            {/* Washi Tape diagonal */}
            <div className="absolute -top-4 -right-2 w-32 h-8 bg-sunflower/30 opacity-60"
              style={{ transform: 'rotate(45deg)' }} />
          </div>
        </motion.div>
      </div>
    </div>
  );
}
