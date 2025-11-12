'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { ClockIcon } from '@/components/ui/Icon';
import GiveawayFormClient from '@/components/GiveawayFormClient';

interface Recipe {
  title: string;
  image: string;
  time: string;
  slug: string;
  bachoTip: string;
}

interface HomePageContentProps {
  recipes: Recipe[];
}

export default function HomePageContent({ recipes }: HomePageContentProps) {
  const scrollRecipes = (direction: 'left' | 'right') => {
    const container = document.getElementById('recipes-container');
    if (container) {
      const scrollAmount = direction === 'left' ? -300 : 300;
      container.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  return (
    <>
      {/* Video Section */}
      <section className="bg-cream relative w-full overflow-hidden">
        <div className="relative w-full" style={{ paddingBottom: '56.25%' }}>
          <video
            autoPlay
            loop
            muted
            playsInline
            className="absolute inset-0 h-full w-full object-cover"
            poster="/bacho-video-poster.webp"
          >
            <source src="/bacho.mp4" type="video/mp4" />
          </video>
          <div className="bg-dark-walnut/10 absolute inset-0" />
        </div>
      </section>

      {/* How It Works - Step-by-Step Journey */}
      <section className="bg-walnut/5 relative overflow-hidden px-4 py-20">
        <div className="bg-vintage-paper absolute inset-0 opacity-20" />
        <div className="border-walnut/20 absolute top-0 bottom-0 left-1/2 hidden w-1 border-l-4 border-dashed md:block" />

        <div className="relative mx-auto max-w-5xl">
          <motion.div
            className="mb-20 text-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="font-handwritten text-bulgarian-red mb-4 text-3xl md:text-4xl lg:text-5xl">
              Как се участва?
            </h2>
            <p className="font-handwritten text-walnut text-xl">
              Само 3 прости стъпки до истинските млечни продукти
            </p>
          </motion.div>

          {/* Step 1 - Left */}
          <motion.div
            className="mb-24 items-center md:grid md:grid-cols-2 md:gap-12"
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="order-1">
              <div
                className="bg-old-paper border-walnut relative border-4 p-8 shadow-xl"
                style={{ transform: 'rotate(-1deg)' }}
              >
                <div className="absolute top-0 bottom-0 left-0 flex w-4 flex-col justify-around py-4">
                  {[...Array(12)].map((_, i) => (
                    <div key={`left-${i}`} className="bg-walnut ml-1 h-2 w-2 rounded-full" />
                  ))}
                </div>
                <div className="absolute top-0 right-0 bottom-0 flex w-4 flex-col justify-around py-4">
                  {[...Array(12)].map((_, i) => (
                    <div key={`right-${i}`} className="bg-walnut mr-1 h-2 w-2 rounded-full" />
                  ))}
                </div>
                <div className="bg-vintage-paper pointer-events-none absolute inset-0 opacity-20" />
                <div className="bg-bulgarian-red absolute -top-8 -left-8 flex h-20 w-20 items-center justify-center rounded-full border-4 border-white shadow-xl">
                  <span
                    className="font-handwritten text-3xl font-bold"
                    style={{ color: '#ffffff' }}
                  >
                    01
                  </span>
                </div>
                <div className="relative z-10">
                  <h3 className="font-handwritten text-walnut mt-4 mb-4 text-2xl font-bold md:text-3xl">
                    Избери продуктите
                  </h3>
                  <p className="font-handwritten text-walnut text-lg leading-relaxed">
                    Маркирай продуктите които искаш да спечелиш
                  </p>
                </div>
              </div>
            </div>
            <div className="order-2 hidden md:block">
              <div className="font-handwritten text-walnut text-9xl opacity-10">01</div>
            </div>
          </motion.div>

          {/* Step 2 - Right */}
          <motion.div
            className="mb-24 items-center md:grid md:grid-cols-2 md:gap-12"
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <div className="order-2 hidden md:order-1 md:block">
              <div className="font-handwritten text-walnut text-right text-9xl opacity-10">02</div>
            </div>
            <div className="order-1 md:order-2">
              <div
                className="bg-old-paper border-walnut relative ml-auto border-4 p-8 shadow-xl"
                style={{ transform: 'rotate(1deg)' }}
              >
                <div className="absolute top-0 bottom-0 left-0 flex w-4 flex-col justify-around py-4">
                  {[...Array(12)].map((_, i) => (
                    <div key={`left-02-${i}`} className="bg-walnut ml-1 h-2 w-2 rounded-full" />
                  ))}
                </div>
                <div className="absolute top-0 right-0 bottom-0 flex w-4 flex-col justify-around py-4">
                  {[...Array(12)].map((_, i) => (
                    <div key={`right-02-${i}`} className="bg-walnut mr-1 h-2 w-2 rounded-full" />
                  ))}
                </div>
                <div className="bg-vintage-paper pointer-events-none absolute inset-0 opacity-20" />
                <div className="bg-bulgarian-red absolute -top-8 -right-8 flex h-20 w-20 items-center justify-center rounded-full border-4 border-white shadow-xl">
                  <span
                    className="font-handwritten text-3xl font-bold"
                    style={{ color: '#ffffff' }}
                  >
                    02
                  </span>
                </div>
                <div className="relative z-10">
                  <h3 className="font-handwritten text-walnut mt-4 mb-4 text-2xl font-bold md:text-3xl">
                    Регистрирай се
                  </h3>
                  <p className="font-handwritten text-walnut text-lg leading-relaxed">
                    Попълни данните си за 2 минути
                  </p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Step 3 - Left */}
          <motion.div
            className="mb-12 items-center md:grid md:grid-cols-2 md:gap-12"
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <div className="order-1">
              <div
                className="bg-old-paper border-walnut relative border-4 p-8 shadow-xl"
                style={{ transform: 'rotate(-0.5deg)' }}
              >
                <div className="absolute top-0 bottom-0 left-0 flex w-4 flex-col justify-around py-4">
                  {[...Array(12)].map((_, i) => (
                    <div key={`left-03-${i}`} className="bg-walnut ml-1 h-2 w-2 rounded-full" />
                  ))}
                </div>
                <div className="absolute top-0 right-0 bottom-0 flex w-4 flex-col justify-around py-4">
                  {[...Array(12)].map((_, i) => (
                    <div key={`right-03-${i}`} className="bg-walnut mr-1 h-2 w-2 rounded-full" />
                  ))}
                </div>
                <div className="bg-vintage-paper pointer-events-none absolute inset-0 opacity-20" />
                <div className="bg-bulgarian-red absolute -top-8 -left-8 flex h-20 w-20 items-center justify-center rounded-full border-4 border-white shadow-xl">
                  <span
                    className="font-handwritten text-3xl font-bold"
                    style={{ color: '#ffffff' }}
                  >
                    03
                  </span>
                </div>
                <div className="relative z-10">
                  <h3 className="font-handwritten text-walnut mt-4 mb-4 text-2xl font-bold md:text-3xl">
                    Сподели и тагни
                  </h3>
                  <p className="font-handwritten text-walnut text-lg leading-relaxed">
                    Сподели във Facebook и тагни приятел
                  </p>
                </div>
              </div>
            </div>
            <div className="order-2 hidden md:block">
              <div className="font-handwritten text-walnut text-9xl opacity-10">03</div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Giveaway Section Header with Urgency Banner */}
      <section id="giveaway" className="aged-paper relative px-4 py-12">
        <div className="mx-auto max-w-6xl">
          <motion.div
            initial={{ opacity: 0, y: -20, scale: 0.9 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            viewport={{ once: true }}
            animate={{
              scale: [1, 1.02, 1],
              rotate: [-1, -0.5, -1],
            }}
            transition={{
              opacity: { duration: 0.5 },
              y: { duration: 0.5 },
              scale: { duration: 2, repeat: Infinity, ease: 'easeInOut' },
              rotate: { duration: 2, repeat: Infinity, ease: 'easeInOut' },
            }}
            whileHover={{
              scale: 1.05,
              rotate: 0,
              transition: { duration: 0.3 },
            }}
            className="mx-auto mb-6 max-w-2xl cursor-pointer"
            style={{ transform: 'rotate(-1deg)' }}
          >
            <div className="bg-bulgarian-red border-walnut/30 relative border-4 px-8 py-5 text-center shadow-2xl transition-shadow duration-300 hover:shadow-[0_0_30px_rgba(164,46,46,0.5)]">
              <p
                className="font-handwritten text-xl font-bold tracking-wide uppercase"
                style={{ color: '#ffffff' }}
              >
                Участвай в раздаването сега
              </p>
              <div className="bg-vintage-paper pointer-events-none absolute inset-0 opacity-10" />
            </div>
          </motion.div>

          <div className="mx-auto mb-6 max-w-3xl text-center">
            <h2 className="font-handwritten text-bulgarian-red mb-6 text-2xl sm:text-3xl md:text-4xl lg:text-5xl">
              Кои продукти искаш за твоето семейство?
            </h2>
            <p className="font-handwritten text-walnut mb-4 text-xl leading-relaxed">
              Знаем колко е трудно да намериш храна, на която да се довериш. Затова искаме да ти
              дадем шанс да опиташ нашите{' '}
              <span className="text-bulgarian-red relative inline-block font-bold">
                {' '}
                продукти - напълно безплатно
                <svg
                  className="absolute -bottom-2 left-0 w-full"
                  viewBox="0 0 200 10"
                  preserveAspectRatio="none"
                >
                  <path
                    d="M0,7 Q50,3 100,7 T200,7"
                    stroke="currentColor"
                    strokeWidth="2.5"
                    fill="none"
                    strokeLinecap="round"
                  />
                </svg>
              </span>
              .
            </p>
            <div className="mb-3 flex items-center justify-center gap-2">
              <div className="relative h-8 w-8 flex-shrink-0">
                <Image
                  src="/Bachi ilia head logo_.webp"
                  alt="Бачо Илия"
                  width={32}
                  height={32}
                  className="rounded-full object-contain"
                  style={{ width: 'auto', height: 'auto', maxWidth: '100%', maxHeight: '100%' }}
                />
              </div>
              <p className="font-handwritten text-walnut text-lg font-semibold">Бачо Илия казва:</p>
            </div>
            <p className="font-handwritten text-walnut text-xl leading-relaxed italic">
              "Хиляди семейства вече се радват на истинския вкус. Дойде ред и на твоето!"
            </p>
          </div>

          {/* Products - Interactive Giveaway Form */}
          <GiveawayFormClient />

          {/* Trust Badge - Vintage Medal */}
          <div className="mt-12 text-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.9, rotate: 0 }}
              whileInView={{ opacity: 1, scale: 1, rotate: -2 }}
              viewport={{ once: true }}
              className="inline-block"
              style={{ transform: 'rotate(-2deg)' }}
            >
              <div className="bg-old-paper border-faded-denim/40 relative border-4 px-8 py-4 shadow-2xl">
                <div className="flex items-center gap-3">
                  <div className="border-bulgarian-red bg-old-paper flex h-10 w-10 items-center justify-center rounded-full border-4">
                    <span className="text-bulgarian-red text-xl font-bold">✓</span>
                  </div>
                  <span className="font-handwritten text-walnut text-lg font-semibold">
                    Над 2,500 семейства вече участват
                  </span>
                </div>
                <div className="bg-vintage-paper pointer-events-none absolute inset-0 opacity-20" />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Value Proposition Section */}
      <ValuePropositionSection />

      {/* Photo Album Timeline */}
      <PhotoAlbumSection />

      {/* Recipes Section */}
      <section className="bg-walnut/5 relative overflow-hidden px-4 py-20">
        <div className="bg-vintage-paper absolute inset-0 opacity-30" />

        <div className="relative mx-auto max-w-7xl">
          <motion.div
            className="border-rushnik mb-16 pb-8 text-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="font-handwritten text-bulgarian-red mb-4 text-3xl md:text-4xl lg:text-5xl">
              Бабините рецепти
            </h2>
            <p className="font-handwritten text-walnut mx-auto max-w-3xl text-xl">
              Традиционни български ястия, направени с любов и продукти Бачо Илия
            </p>
          </motion.div>

          <div className="relative">
            <button
              onClick={() => scrollRecipes('left')}
              className="bg-bulgarian-red hover:bg-dark-walnut absolute top-1/2 left-0 z-10 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full text-white shadow-xl transition-colors md:hidden"
              aria-label="Предишна рецепта"
            >
              ←
            </button>
            <button
              onClick={() => scrollRecipes('right')}
              className="bg-bulgarian-red hover:bg-dark-walnut absolute top-1/2 right-0 z-10 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full text-white shadow-xl transition-colors md:hidden"
              aria-label="Следваща рецепта"
            >
              →
            </button>

            <div
              id="recipes-container"
              className="mb-16 flex snap-x snap-mandatory gap-6 overflow-x-auto scroll-smooth px-4 pb-4 md:grid md:snap-none md:grid-cols-2 md:gap-12 md:overflow-x-visible md:px-0"
            >
              {recipes.map((recipe, index) => {
                const rotations = ['-2deg', '1.5deg', '-1deg', '2deg'];
                const rotation = rotations[index % rotations.length];

                return (
                  <div
                    key={index}
                    className="w-[75vw] flex-shrink-0 snap-center sm:w-[70vw] md:w-auto"
                  >
                    <motion.div
                      initial={{ opacity: 0, y: 30 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.5, delay: index * 0.1 }}
                      className="md:[&>*]:rotate-0"
                    >
                      <Link href={`/recipes/${recipe.slug}`} className="group block">
                        <div
                          className="bg-old-paper border-walnut/30 hover:shadow-vintage-lg relative overflow-hidden border-4 p-4 shadow-2xl transition-all hover:scale-105 sm:p-6"
                          style={{ transform: `rotate(${rotation})` }}
                        >
                          <div className="bg-tablecloth pointer-events-none absolute inset-0 opacity-30" />
                          <div className="relative z-10">
                            <div
                              className="border-walnut/20 relative mb-6 h-64 overflow-hidden border-2 md:h-80"
                              style={{
                                filter: 'sepia(0.4) contrast(1.05)',
                              }}
                            >
                              <Image
                                src={recipe.image}
                                alt={`${recipe.title} - Традиционна българска рецепта с продукти Бачо Илия`}
                                fill
                                sizes="(max-width: 768px) 100vw, 50vw"
                                className="object-cover transition-transform duration-700 group-hover:scale-110"
                                loading="lazy"
                                quality={85}
                              />

                              <div className="border-walnut/60 absolute top-0 left-0 h-6 w-6 border-t-2 border-l-2" />
                              <div className="border-walnut/60 absolute top-0 right-0 h-6 w-6 border-t-2 border-r-2" />
                              <div className="border-walnut/60 absolute bottom-0 left-0 h-6 w-6 border-b-2 border-l-2" />
                              <div className="border-walnut/60 absolute right-0 bottom-0 h-6 w-6 border-r-2 border-b-2" />

                              <div
                                className="bg-bulgarian-red/90 font-handwritten absolute top-3 right-3 z-10 flex items-center gap-1 border-2 border-white px-3 py-1 text-xs font-bold tracking-wide shadow-lg"
                                style={{ color: '#ffffff' }}
                              >
                                <ClockIcon size={14} className="text-white" />
                                {recipe.time}
                              </div>
                            </div>

                            <h3 className="font-handwritten text-walnut group-hover:text-bulgarian-red mb-4 text-center text-3xl transition-colors md:text-4xl">
                              {recipe.title}
                            </h3>

                            {recipe.bachoTip && (
                              <div className="border-bulgarian-red relative border-l-4 bg-white/60 p-4">
                                <div className="flex items-start gap-3">
                                  <div className="relative h-10 w-10 flex-shrink-0">
                                    <Image
                                      src="/Bachi ilia head logo_.webp"
                                      alt="Бачо Илия"
                                      width={40}
                                      height={40}
                                      className="rounded-full object-contain"
                                    />
                                  </div>
                                  <div>
                                    <p className="font-handwritten text-walnut/70 mb-1 text-xs tracking-wide uppercase">
                                      Бачов съвет:
                                    </p>
                                    <p className="font-handwritten text-walnut text-xl leading-relaxed">
                                      "{recipe.bachoTip}"
                                    </p>
                                  </div>
                                </div>
                              </div>
                            )}

                            {index % 2 === 0 ? (
                              <div className="bg-walnut/10 absolute right-4 bottom-4 h-16 w-16 rounded-full opacity-50 blur-sm" />
                            ) : (
                              <div className="bg-walnut/10 absolute top-4 left-4 h-12 w-12 rounded-full opacity-40 blur-sm" />
                            )}

                            <div
                              className="bg-walnut/5 absolute -top-1 -right-1 h-8 w-8"
                              style={{
                                clipPath: 'polygon(100% 0, 100% 100%, 0 0)',
                              }}
                            />

                            <div className="bg-bulgarian-red/0 group-hover:bg-bulgarian-red/5 pointer-events-none absolute inset-0 transition-colors" />
                          </div>
                        </div>
                      </Link>
                    </motion.div>
                  </div>
                );
              })}
            </div>

            <div className="mb-6 flex justify-center gap-2 md:hidden">
              {recipes.map((_, index) => (
                <div key={index} className="bg-walnut/30 h-2 w-2 rounded-full" />
              ))}
            </div>

            {/* "Виж всички рецепти" Button */}
            <motion.div
              className="mt-12 flex justify-center"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <Link
                href="/recipes"
                className="bg-bulgarian-red hover:bg-dark-walnut font-handwritten group inline-flex items-center gap-3 border-4 border-walnut px-8 py-4 text-2xl text-white shadow-xl transition-all hover:scale-105 hover:shadow-2xl md:px-12 md:py-5 md:text-3xl"
              >
                <span>Виж всички рецепти</span>
                <span className="text-3xl transition-transform group-hover:translate-x-1 md:text-4xl">
                  →
                </span>
              </Link>
            </motion.div>
          </div>

          <motion.div
            className="space-y-8 text-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.5 }}
          >
            <Link href="/recipes" className="group relative inline-block">
              <div className="bg-bulgarian-red relative overflow-hidden border-4 border-dashed border-white px-10 py-5 shadow-2xl">
                <p
                  className="font-handwritten relative z-10 text-xl font-bold tracking-wide uppercase md:text-2xl"
                  style={{ color: '#ffffff' }}
                >
                  Виж Всички Рецепти →
                </p>

                <div className="absolute -top-8 right-0 left-0 flex h-4 justify-between px-2">
                  {[...Array(10)].map((_, i) => (
                    <div key={i} className="bg-walnut/20 h-2 w-2 rounded-full" />
                  ))}
                </div>
                <div className="absolute right-0 -bottom-8 left-0 flex h-4 justify-between px-2">
                  {[...Array(10)].map((_, i) => (
                    <div key={i} className="bg-walnut/20 h-2 w-2 rounded-full" />
                  ))}
                </div>

                <div className="from-bulgarian-red via-sunflower/20 to-bulgarian-red absolute inset-0 bg-gradient-to-r opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
              </div>
            </Link>
          </motion.div>
        </div>
      </section>
    </>
  );
}

// Value Proposition Component
function ValuePropositionSection() {
  return (
    <section className="bg-old-paper relative overflow-hidden px-4 py-20">
      <div className="bg-vintage-paper absolute inset-0 opacity-30" />

      <div className="relative mx-auto max-w-7xl">
        <motion.div
          className="border-shevitsa-top mb-16 pt-8 text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h2 className="font-handwritten text-bulgarian-red mb-4 text-3xl md:text-4xl lg:text-5xl">
            Защо Бачо Илия?
          </h2>
          <p className="font-handwritten text-walnut mx-auto max-w-3xl text-xl">
            Семейството ти заслужава продукти направени с любов, без химия, точно като бабините
          </p>
        </motion.div>

        <div className="grid grid-cols-1 items-start gap-8 lg:grid-cols-2 lg:gap-12">
          <motion.div
            initial={{ opacity: 0, x: -50, rotate: -2 }}
            whileInView={{ opacity: 1, x: 0, rotate: -1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="flex justify-center lg:justify-start"
          >
            <div
              className="border-walnut/40 relative w-full max-w-2xl overflow-hidden border-4 bg-white p-8 shadow-2xl md:p-10"
              style={{ transform: 'rotate(-1deg)' }}
            >
              <div className="pointer-events-none absolute inset-0">
                {[...Array(15)].map((_, i) => (
                  <div
                    key={i}
                    className="border-faded-denim/15 absolute right-0 left-0 border-b"
                    style={{ top: `${(i + 1) * 6.66}%` }}
                  />
                ))}
              </div>

              <div className="bg-bulgarian-red/30 absolute top-0 bottom-0 left-12 w-px" />

              <div className="absolute top-0 bottom-0 left-0 hidden w-10 flex-col justify-around py-6 md:flex">
                {[...Array(12)].map((_, i) => (
                  <div
                    key={i}
                    className="bg-walnut/20 border-walnut/10 ml-3.5 h-2.5 w-2.5 rounded-full border"
                  />
                ))}
              </div>

              <div className="bg-vintage-paper pointer-events-none absolute inset-0 opacity-20" />

              <div className="relative">
                <div className="mb-6 flex items-start gap-4">
                  <div className="text-bulgarian-red text-5xl">♥</div>
                  <h3 className="font-handwritten text-walnut text-3xl font-bold">
                    Какво получаваш:
                  </h3>
                </div>

                <div className="space-y-5">
                  <div className="flex items-start gap-4">
                    <div className="bg-bulgarian-red mt-1 flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full">
                      <span className="font-bold text-white">✓</span>
                    </div>
                    <p className="font-handwritten text-walnut text-lg leading-relaxed md:text-xl">
                      <span className="relative inline-block">
                        <strong className="text-bulgarian-red">Истински продукти</strong>
                        <svg
                          className="absolute -bottom-1.5 left-0 w-full"
                          viewBox="0 0 200 10"
                          preserveAspectRatio="none"
                        >
                          <path
                            d="M0,7 Q50,3 100,7 T200,7"
                            stroke="currentColor"
                            strokeWidth="1.5"
                            fill="none"
                            strokeLinecap="round"
                            className="text-bulgarian-red"
                          />
                        </svg>
                      </span>{' '}
                      от щастливи крави.
                    </p>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="bg-bulgarian-red mt-1 flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full">
                      <span className="font-bold text-white">✓</span>
                    </div>
                    <p className="font-handwritten text-walnut text-lg leading-relaxed md:text-xl">
                      <span className="relative inline-block">
                        <strong className="text-bulgarian-red">Без консерванти и химия</strong>
                        <svg
                          className="absolute -bottom-1.5 left-0 w-full"
                          viewBox="0 0 200 10"
                          preserveAspectRatio="none"
                        >
                          <path
                            d="M0,7 Q50,3 100,7 T200,7"
                            stroke="currentColor"
                            strokeWidth="1.5"
                            fill="none"
                            strokeLinecap="round"
                            className="text-bulgarian-red"
                          />
                        </svg>
                      </span>{' '}
                      - както бабините, направено с време и любов.
                    </p>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="bg-bulgarian-red mt-1 flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full">
                      <span className="font-bold text-white">✓</span>
                    </div>
                    <p className="font-handwritten text-walnut text-lg leading-relaxed md:text-xl">
                      <span className="relative inline-block">
                        <strong className="text-bulgarian-red">Храна на която да се довериш</strong>
                        <svg
                          className="absolute -bottom-1.5 left-0 w-full"
                          viewBox="0 0 200 10"
                          preserveAspectRatio="none"
                        >
                          <path
                            d="M0,7 Q50,3 100,7 T200,7"
                            stroke="currentColor"
                            strokeWidth="1.5"
                            fill="none"
                            strokeLinecap="round"
                            className="text-bulgarian-red"
                          />
                        </svg>
                      </span>{' '}
                      - ако не бих дал на внуците си, няма да го продам на теб.
                    </p>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="bg-bulgarian-red mt-1 flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full">
                      <span className="font-bold text-white">✓</span>
                    </div>
                    <p className="font-handwritten text-walnut text-lg leading-relaxed md:text-xl">
                      <span className="relative inline-block">
                        <strong className="text-bulgarian-red">Здрави деца и спокойствие</strong>
                        <svg
                          className="absolute -bottom-1.5 left-0 w-full"
                          viewBox="0 0 200 10"
                          preserveAspectRatio="none"
                        >
                          <path
                            d="M0,7 Q50,3 100,7 T200,7"
                            stroke="currentColor"
                            strokeWidth="1.5"
                            fill="none"
                            strokeLinecap="round"
                            className="text-bulgarian-red"
                          />
                        </svg>
                      </span>{' '}
                      за теб като родител.
                    </p>
                  </div>
                </div>

                <div className="bg-walnut/10 absolute right-4 bottom-4 h-16 w-16 rounded-full opacity-30 blur-lg" />
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="flex justify-center lg:justify-end"
          >
            <div className="relative w-full max-w-2xl">
              <Image
                src="/bachoiliya-zashto.png"
                alt="Защо Бачо Илия - Истински млечни продукти"
                width={800}
                height={600}
                className="h-auto w-full rounded-lg shadow-2xl"
                priority={false}
              />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

// Photo Album Component
function PhotoAlbumSection() {
  return (
    <section className="bg-old-paper relative overflow-hidden px-4 py-20">
      <div className="bg-vintage-paper absolute inset-0 opacity-40" />

      <div className="relative mx-auto max-w-6xl">
        <div className="mb-16 text-center">
          <motion.h2
            className="font-handwritten text-bulgarian-red mb-4 text-3xl md:text-4xl lg:text-5xl xl:text-6xl"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            Семейни спомени...
          </motion.h2>
          <p className="font-handwritten text-walnut mx-auto max-w-2xl text-xl">
            Истории от родители, след като опитаха продуктите на Бачо Илия
          </p>
        </div>

        <div className="space-y-20">
          <motion.div
            className="ml-0 max-w-md md:ml-12"
            initial={{ opacity: 0, x: -50, rotate: -8 }}
            whileInView={{ opacity: 1, x: 0, rotate: -3 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="bg-white p-4 shadow-2xl" style={{ transform: 'rotate(-3deg)' }}>
              <div className="relative mb-4 h-64 bg-gray-100">
                <Image
                  src="/maria-sofia.webp"
                  alt="Мария от София споделя мнение за Бачо Илия продукти"
                  fill
                  sizes="(max-width: 768px) 100vw, 400px"
                  className="object-cover"
                  loading="lazy"
                />
              </div>

              <div className="font-handwritten text-walnut mb-3 text-xl">Мария, София</div>

              <p className="font-handwritten text-bulgarian-red text-lg leading-relaxed">
                "Децата ми отказваха всяко сирене... 5-годишната ми дъщеря сега иска само Бачо
                Илия!"
              </p>

              <div
                className="bg-sunflower/30 absolute -top-4 left-1/2 h-8 w-24 -translate-x-1/2 opacity-60"
                style={{ transform: 'translateX(-50%) rotate(-2deg)' }}
              />
            </div>
          </motion.div>

          <motion.div
            className="mr-0 ml-auto max-w-md md:mr-12"
            initial={{ opacity: 0, x: 50, rotate: 8 }}
            whileInView={{ opacity: 1, x: 0, rotate: 4 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <div className="bg-white p-4 shadow-2xl" style={{ transform: 'rotate(4deg)' }}>
              <div className="relative mb-4 h-64 bg-gray-100">
                <Image
                  src="/ivan-plovdiv.webp"
                  alt="Иван от Пловдив споделя опит с Бачо Илия млечни продукти"
                  fill
                  sizes="(max-width: 768px) 100vw, 400px"
                  className="object-cover"
                  loading="lazy"
                />
              </div>

              <div className="font-handwritten text-walnut mb-3 text-xl">Иван, Пловдив</div>

              <p className="font-handwritten text-bulgarian-red text-lg leading-relaxed">
                "От години търсех истинския вкус... случайно попаднах на сиренето на Бачо Илия и му
                станах фен"
              </p>

              <div
                className="bg-bulgarian-red/20 absolute -top-3 right-8 h-8 w-20 opacity-60"
                style={{ transform: 'rotate(12deg)' }}
              />
            </div>
          </motion.div>

          <motion.div
            className="mx-auto max-w-md"
            initial={{ opacity: 0, y: 50, rotate: 0 }}
            whileInView={{ opacity: 1, y: 0, rotate: -2 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <div className="bg-white p-4 shadow-2xl" style={{ transform: 'rotate(-2deg)' }}>
              <div className="relative mb-4 h-64 bg-gray-100">
                <Image
                  src="/elena-varna.webp"
                  alt="Елена от Варна споделя защо избира Бачо Илия"
                  fill
                  sizes="(max-width: 768px) 100vw, 400px"
                  className="object-cover"
                  loading="lazy"
                />
              </div>

              <div className="font-handwritten text-walnut mb-3 text-xl">Елена, Варна</div>

              <p className="font-handwritten text-bulgarian-red text-lg leading-relaxed">
                "Четях етикети като луда... Доверявам се само на Бачо Илия, Истинско мляко като едно
                време"
              </p>

              <div
                className="bg-faded-denim/20 absolute -top-4 -right-2 h-8 w-28 opacity-60"
                style={{ transform: 'rotate(45deg)' }}
              />
            </div>
          </motion.div>
        </div>

        <div className="mt-24 flex flex-wrap justify-center gap-8">
          <motion.div
            className="relative"
            initial={{ opacity: 0, scale: 0.8, rotate: -10 }}
            whileInView={{ opacity: 1, scale: 1, rotate: -5 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            style={{ transform: 'rotate(-5deg)' }}
          >
            <div className="border-bulgarian-red bg-old-paper relative flex h-40 w-40 flex-col items-center justify-center rounded-full border-8 shadow-2xl">
              <div className="font-handwritten text-bulgarian-red mb-1 text-5xl font-bold">98%</div>
              <div className="font-handwritten text-walnut px-2 text-center text-xs leading-tight">
                КУПУВАТ
                <br />
                ОТНОВО
              </div>
              <div className="bg-gradient-radial to-walnut/40 pointer-events-none absolute inset-0 rounded-full from-transparent opacity-20 mix-blend-multiply" />
            </div>
          </motion.div>

          <motion.div
            className="relative"
            initial={{ opacity: 0, scale: 0.8, rotate: 0 }}
            whileInView={{ opacity: 1, scale: 1, rotate: 2 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            style={{ transform: 'rotate(2deg)' }}
          >
            <div className="border-sunflower bg-old-paper relative flex h-40 w-40 flex-col items-center justify-center rounded-full border-8 shadow-2xl">
              <div className="font-handwritten text-walnut mb-1 text-4xl font-bold">2,500+</div>
              <div className="font-handwritten text-walnut px-2 text-center text-xs leading-tight">
                ДОВОЛНИ
                <br />
                СЕМЕЙСТВА
              </div>
              <div className="bg-gradient-radial to-walnut/40 pointer-events-none absolute inset-0 rounded-full from-transparent opacity-20 mix-blend-multiply" />
            </div>
          </motion.div>

          <motion.div
            className="relative"
            initial={{ opacity: 0, scale: 0.8, rotate: 10 }}
            whileInView={{ opacity: 1, scale: 1, rotate: 5 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            style={{ transform: 'rotate(5deg)' }}
          >
            <div className="border-faded-denim bg-old-paper relative flex h-40 w-40 flex-col items-center justify-center rounded-full border-8 shadow-2xl">
              <div className="font-handwritten text-walnut mb-1 text-5xl font-bold">4.9</div>
              <div className="font-handwritten text-walnut px-2 text-center text-xs leading-tight">
                СРЕДНА
                <br />
                ОЦЕНКА
              </div>
              <div className="bg-gradient-radial to-walnut/40 pointer-events-none absolute inset-0 rounded-full from-transparent opacity-20 mix-blend-multiply" />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
