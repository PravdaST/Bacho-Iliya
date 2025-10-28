'use client';

import { useEffect, Suspense } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useGiveawayStore, products } from '@/lib/store';
import { recipes as allRecipes } from '@/lib/recipes-data';
import ReferralDetector from '@/components/ReferralDetector';
import ProgressBar from '@/components/ProgressBar';
import ProductCard from '@/components/ProductCard';
import FAQ from '@/components/FAQ';
import BachoStory from '@/components/BachoStory';
import StickyCTA from '@/components/StickyCTA';
// import VideoCarousel from '@/components/VideoCarousel'; // Temporarily disabled until video files are added
import { motion } from 'framer-motion';
import { Heart, Award, Clock, Users } from 'lucide-react';
import { ClockIcon } from '@/components/ui/Icon';
// SEO Schema Components
import { OrganizationSchema, GiveawayEventSchema } from '@/components/seo';

export default function Home() {
  const router = useRouter();
  const { selectedProducts, toggleProduct, setCurrentStep } = useGiveawayStore();

  const handleContinue = () => {
    if (selectedProducts.length === 0) {
      alert('Моля, изберете поне един продукт');
      return;
    }
    setCurrentStep(2);
    router.push('/register');
  };

  // Use recipes from recipes-data.ts with correct structure and slugs
  const recipes = allRecipes.slice(0, 12).map(recipe => {
    // Calculate total time
    const prepMinutes = parseInt(recipe.prepTime) || 0;
    const cookMinutes = parseInt(recipe.cookTime) || 0;
    const totalMinutes = prepMinutes + cookMinutes;
    const timeDisplay = totalMinutes > 0 ? `${totalMinutes} мин` : recipe.difficulty;

    return {
      title: recipe.titleBg,
      image: recipe.image,
      time: timeDisplay,
      slug: recipe.slug,
      bachoTip: recipe.tips[0]?.tipBg || recipe.descriptionBg
    };
  });

  return (
    <>
      {/* Referral Detection (wrapped in Suspense for Next.js 15) */}
      <Suspense fallback={null}>
        <ReferralDetector />
      </Suspense>

      {/* SEO Schema.org Structured Data */}
      <OrganizationSchema />
      <GiveawayEventSchema
        giveaway={{
          name: "Голямо раздаване на Бачо Илия продукти",
          description: "Участвай в нашето раздаване и спечели автентични български млечни продукти! Избери любимите си продукти, сподели с приятели и увеличи шансовете си за печалба.",
          image: "/og-image.jpg",
          startDate: new Date().toISOString(),
          endDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(), // 30 days from now
        }}
      />

      {/* Hero - Asymmetric Video + Image Layout: Warm & Nostalgic */}
      <section className="relative min-h-[85vh] bg-cream overflow-hidden" style={{ position: 'relative', zIndex: 10 }}>
        <div className="grid lg:grid-cols-[55fr_45fr] min-h-[85vh]">

          {/* Left Column - Video Storytelling (55%) */}
          <motion.div
            className="relative h-[40vh] lg:h-auto overflow-hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.2 }}
          >
            {/* Video Background */}
            <video
              autoPlay
              loop
              muted
              playsInline
              poster="/bacho-video-poster.webp"
              className="absolute inset-0 w-full h-full object-cover"
            >
              <source src="/bacho-video.mp4" type="video/mp4" />
            </video>

            {/* Subtle overlay for depth - REDUCED for better video visibility */}
            <div className="absolute inset-0 bg-dark-walnut/10" />
          </motion.div>

          {/* Right Column - Clean & Focused Content (45%) */}
          <div className="relative bg-cream px-6 sm:px-8 lg:px-12 py-12 lg:py-16 flex flex-col justify-center">
            <div className="max-w-xl mx-auto lg:mx-0 space-y-8 lg:space-y-12">

              {/* Main Headline - BIGGER & More Impact */}
              <motion.h1
                className="font-heading text-5xl sm:text-6xl lg:text-7xl text-dark-walnut leading-tight"
                initial={{ y: 30, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.4 }}
              >
                Спечели вкуса от детството
              </motion.h1>

              {/* Subtitle - Connected to headline */}
              <motion.p
                className="font-body text-xl sm:text-2xl text-dark-walnut leading-relaxed"
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.6 }}
              >
                Истински млечни продукти, направени точно както баба ги правеше
              </motion.p>

              {/* CTA Button - BIGGER & More Prominent */}
              <motion.div
                initial={{ y: 20, opacity: 0, scale: 0.95 }}
                animate={{ y: 0, opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: 0.8, type: "spring" }}
              >
                <motion.a
                  href="#giveaway"
                  className="inline-block w-full sm:w-auto bg-heritage-red px-12 py-6 sm:px-16 sm:py-8 hover:scale-105 hover:bg-dark-walnut transition-all duration-300 text-center"
                  aria-label="Играй безплатно за продукти Бачо Илия"
                  animate={{
                    boxShadow: [
                      '0 20px 25px -5px rgba(164, 46, 46, 0.3), 0 10px 10px -5px rgba(164, 46, 46, 0.2)',
                      '0 25px 35px -5px rgba(164, 46, 46, 0.5), 0 15px 15px -5px rgba(164, 46, 46, 0.4)',
                      '0 20px 25px -5px rgba(164, 46, 46, 0.3), 0 10px 10px -5px rgba(164, 46, 46, 0.2)',
                    ],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: 'easeInOut',
                  }}
                >
                  <p className="font-heading text-2xl sm:text-3xl font-bold uppercase tracking-wider" style={{ color: '#ffffff' }}>
                    ИГРАЙ БЕЗПЛАТНО →
                  </p>
                </motion.a>
              </motion.div>

              {/* Trust Badge - Subtle, below button */}
              <motion.div
                className="flex items-center justify-center sm:justify-start gap-3 text-dark-walnut"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.6, delay: 1 }}
              >
                <div className="flex items-center gap-1">
                  <span className="text-accent-gold text-lg">★★★★★</span>
                </div>
                <span className="font-body text-base sm:text-lg">
                  Над 2,500 семейства вече участват
                </span>
              </motion.div>

              {/* Heritage Badge - Minimal */}
              <motion.div
                className="text-center sm:text-left"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.6, delay: 1.2 }}
              >
                <p className="font-heading text-sm text-dark-walnut/70 uppercase tracking-widest">
                  Традиция от 1999
                </p>
              </motion.div>

            </div>
          </div>

        </div>
      </section>

      {/* Bacho Story Section - BUILD EMOTIONAL CONNECTION FIRST */}
      <div id="story">
        <BachoStory />
      </div>

      {/* Video Section */}
      <section className="relative w-full bg-cream overflow-hidden">
        <div className="relative w-full" style={{ paddingBottom: '56.25%' }}>
          <video
            autoPlay
            loop
            muted
            playsInline
            className="absolute inset-0 w-full h-full object-cover"
            poster="/bacho-video-poster.webp"
          >
            <source src="/bacho.mp4" type="video/mp4" />
          </video>
          <div className="absolute inset-0 bg-dark-walnut/10" />
        </div>
      </section>

      {/* How It Works - Step-by-Step Journey (MOVED UP FOR BETTER CONVERSION) */}
      <section className="py-20 px-4 bg-walnut/5 relative overflow-hidden">
        {/* Vintage Texture */}
        <div className="absolute inset-0 bg-vintage-paper opacity-20" />

        {/* Dotted Path Background */}
        <div className="absolute left-1/2 top-0 bottom-0 w-1 border-l-4 border-dashed border-walnut/20 hidden md:block" />

        <div className="max-w-5xl mx-auto relative">
          {/* Title */}
          <motion.div
            className="text-center mb-20"
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
            className="mb-24 md:grid md:grid-cols-2 md:gap-12 items-center"
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="order-1">
              <div className="relative bg-old-paper border-4 border-walnut p-8 shadow-xl" style={{ transform: 'rotate(-1deg)' }}>
                {/* Left vintage dots */}
                <div className="absolute left-0 top-0 bottom-0 w-4 flex flex-col justify-around py-4">
                  {[...Array(12)].map((_, i) => (
                    <div key={`left-${i}`} className="w-2 h-2 bg-walnut rounded-full ml-1" />
                  ))}
                </div>

                {/* Right vintage dots */}
                <div className="absolute right-0 top-0 bottom-0 w-4 flex flex-col justify-around py-4">
                  {[...Array(12)].map((_, i) => (
                    <div key={`right-${i}`} className="w-2 h-2 bg-walnut rounded-full mr-1" />
                  ))}
                </div>

                {/* Vintage texture overlay */}
                <div className="absolute inset-0 bg-vintage-paper opacity-20 pointer-events-none" />

                {/* Step Number Badge */}
                <div className="absolute -top-8 -left-8 w-20 h-20 rounded-full bg-bulgarian-red border-4 border-white flex items-center justify-center shadow-xl">
                  <span className="font-handwritten text-3xl font-bold" style={{ color: '#ffffff' }}>01</span>
                </div>

                {/* Content */}
                <div className="relative z-10">
                  <h3 className="font-handwritten text-2xl md:text-3xl font-bold text-walnut mb-4 mt-4">
                    Избери продуктите
                  </h3>
                  <p className="font-handwritten text-walnut text-lg leading-relaxed">
                    Маркирай продуктите които искаш да спечелиш
                  </p>
                </div>
              </div>
            </div>
            <div className="order-2 hidden md:block">
              <div className="text-9xl opacity-10 font-handwritten text-walnut">01</div>
            </div>
          </motion.div>

          {/* Step 2 - Right */}
          <motion.div
            className="mb-24 md:grid md:grid-cols-2 md:gap-12 items-center"
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <div className="order-2 md:order-1 hidden md:block">
              <div className="text-9xl opacity-10 font-handwritten text-walnut text-right">02</div>
            </div>
            <div className="order-1 md:order-2">
              <div className="relative bg-old-paper border-4 border-walnut p-8 shadow-xl ml-auto" style={{ transform: 'rotate(1deg)' }}>
                {/* Left vintage dots */}
                <div className="absolute left-0 top-0 bottom-0 w-4 flex flex-col justify-around py-4">
                  {[...Array(12)].map((_, i) => (
                    <div key={`left-02-${i}`} className="w-2 h-2 bg-walnut rounded-full ml-1" />
                  ))}
                </div>

                {/* Right vintage dots */}
                <div className="absolute right-0 top-0 bottom-0 w-4 flex flex-col justify-around py-4">
                  {[...Array(12)].map((_, i) => (
                    <div key={`right-02-${i}`} className="w-2 h-2 bg-walnut rounded-full mr-1" />
                  ))}
                </div>

                {/* Vintage texture overlay */}
                <div className="absolute inset-0 bg-vintage-paper opacity-20 pointer-events-none" />

                {/* Step Number Badge */}
                <div className="absolute -top-8 -right-8 w-20 h-20 rounded-full bg-bulgarian-red border-4 border-white flex items-center justify-center shadow-xl">
                  <span className="font-handwritten text-3xl font-bold" style={{ color: '#ffffff' }}>02</span>
                </div>

                {/* Content */}
                <div className="relative z-10">
                  <h3 className="font-handwritten text-2xl md:text-3xl font-bold text-walnut mb-4 mt-4">
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
            className="mb-12 md:grid md:grid-cols-2 md:gap-12 items-center"
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <div className="order-1">
              <div className="relative bg-old-paper border-4 border-walnut p-8 shadow-xl" style={{ transform: 'rotate(-0.5deg)' }}>
                {/* Left vintage dots */}
                <div className="absolute left-0 top-0 bottom-0 w-4 flex flex-col justify-around py-4">
                  {[...Array(12)].map((_, i) => (
                    <div key={`left-03-${i}`} className="w-2 h-2 bg-walnut rounded-full ml-1" />
                  ))}
                </div>

                {/* Right vintage dots */}
                <div className="absolute right-0 top-0 bottom-0 w-4 flex flex-col justify-around py-4">
                  {[...Array(12)].map((_, i) => (
                    <div key={`right-03-${i}`} className="w-2 h-2 bg-walnut rounded-full mr-1" />
                  ))}
                </div>

                {/* Vintage texture overlay */}
                <div className="absolute inset-0 bg-vintage-paper opacity-20 pointer-events-none" />

                {/* Step Number Badge */}
                <div className="absolute -top-8 -left-8 w-20 h-20 rounded-full bg-bulgarian-red border-4 border-white flex items-center justify-center shadow-xl">
                  <span className="font-handwritten text-3xl font-bold" style={{ color: '#ffffff' }}>03</span>
                </div>

                {/* Content */}
                <div className="relative z-10">
                  <h3 className="font-handwritten text-2xl md:text-3xl font-bold text-walnut mb-4 mt-4">
                    Сподели и тагни
                  </h3>
                  <p className="font-handwritten text-walnut text-lg leading-relaxed">
                    Сподели във Facebook и тагни приятел
                  </p>
                </div>
              </div>
            </div>
            <div className="order-2 hidden md:block">
              <div className="text-9xl opacity-10 font-handwritten text-walnut">03</div>
            </div>
          </motion.div>

        </div>
      </section>

      {/* Giveaway Section - PRIMARY CONVERSION POINT (MOVED UP) */}
      <section id="giveaway" className="py-12 px-4 aged-paper relative">
        <div className="max-w-6xl mx-auto">
          {/* Urgency Banner - Vintage Stamp Style */}
          <motion.div
            initial={{ opacity: 0, y: -20, scale: 0.9 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            viewport={{ once: true }}
            animate={{
              scale: [1, 1.02, 1],
              rotate: [-1, -0.5, -1]
            }}
            transition={{
              opacity: { duration: 0.5 },
              y: { duration: 0.5 },
              scale: { duration: 2, repeat: Infinity, ease: "easeInOut" },
              rotate: { duration: 2, repeat: Infinity, ease: "easeInOut" }
            }}
            whileHover={{
              scale: 1.05,
              rotate: 0,
              transition: { duration: 0.3 }
            }}
            className="mb-6 max-w-2xl mx-auto cursor-pointer"
            style={{ transform: 'rotate(-1deg)' }}
          >
            <div className="bg-bulgarian-red px-8 py-5 text-center shadow-2xl border-4 border-walnut/30 relative hover:shadow-[0_0_30px_rgba(164,46,46,0.5)] transition-shadow duration-300">
              <p className="font-handwritten text-xl font-bold uppercase tracking-wide" style={{ color: '#ffffff' }}>
                Участвай в раздаването сега
              </p>

              {/* Vintage texture overlay */}
              <div className="absolute inset-0 bg-vintage-paper opacity-10 pointer-events-none" />
            </div>
          </motion.div>

          {/* Emotional Header */}
          <div className="text-center mb-6 max-w-3xl mx-auto">
            <h2 className="font-handwritten text-bulgarian-red mb-6 text-2xl sm:text-3xl md:text-4xl lg:text-5xl">
              Кои продукти искаш за твоето семейство?
            </h2>
            <p className="font-handwritten text-walnut text-xl leading-relaxed mb-4">
              Знаем колко е трудно да намериш храна, на която да се довериш.
              Затова искаме да ти дадем шанс да опиташ нашите <span className="relative inline-block font-bold text-bulgarian-red"> продукти - напълно безплатно
                <svg className="absolute left-0 -bottom-2 w-full" viewBox="0 0 200 10" preserveAspectRatio="none">
                  <path d="M0,7 Q50,3 100,7 T200,7" stroke="currentColor" strokeWidth="2.5" fill="none" strokeLinecap="round" />
                </svg>
              </span>.
            </p>
            <div className="flex items-center justify-center gap-2 mb-3">
              <div className="relative w-8 h-8 flex-shrink-0">
                <Image
                  src="/Bachi ilia head logo_.webp"
                  alt="Бачо Илия"
                  width={32}
                  height={32}
                  className="object-contain rounded-full"
                  style={{ width: 'auto', height: 'auto', maxWidth: '100%', maxHeight: '100%' }}
                />
              </div>
              <p className="font-handwritten text-walnut text-lg font-semibold">Бачо Илия казва:</p>
            </div>
            <p className="font-handwritten text-walnut text-xl italic leading-relaxed">
              "Хиляди семейства вече се радват на истинския вкус. Дойде ред и на твоето!"
            </p>
          </div>
          {/* Products - Scattered Vintage Photos */}
          <div className="relative">
            {/* Mobile Navigation Arrows */}
            <button
              onClick={() => {
                const container = document.getElementById('products-container');
                if (container) container.scrollBy({ left: -300, behavior: 'smooth' });
              }}
              className="md:hidden absolute left-0 top-1/2 -translate-y-1/2 z-10 w-10 h-10 bg-bulgarian-red text-white rounded-full flex items-center justify-center shadow-xl hover:bg-dark-walnut transition-colors"
              aria-label="Предишен продукт"
            >
              ←
            </button>
            <button
              onClick={() => {
                const container = document.getElementById('products-container');
                if (container) container.scrollBy({ left: 300, behavior: 'smooth' });
              }}
              className="md:hidden absolute right-0 top-1/2 -translate-y-1/2 z-10 w-10 h-10 bg-bulgarian-red text-white rounded-full flex items-center justify-center shadow-xl hover:bg-dark-walnut transition-colors"
              aria-label="Следващ продукт"
            >
              →
            </button>

            <div id="products-container" className="flex md:grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12 overflow-x-auto md:overflow-x-visible px-4 snap-x snap-mandatory md:snap-none scroll-smooth pb-4">
              {products.map((product) => (
                <div key={product.id} className="flex-shrink-0 w-[75vw] sm:w-[70vw] md:w-auto snap-center">
                  <ProductCard
                    product={product}
                    isSelected={selectedProducts.includes(product.id)}
                    onToggle={() => toggleProduct(product.id)}
                  />
                </div>
              ))}
            </div>

            {/* Mobile scroll indicator dots */}
            <div className="md:hidden flex justify-center gap-2 mb-6">
              {products.map((_, index) => (
                <div
                  key={index}
                  className="w-2 h-2 rounded-full bg-walnut/30"
                />
              ))}
            </div>
          </div>

          {/* Continue Button */}
          <div className="text-center">
            <button
              onClick={handleContinue}
              disabled={selectedProducts.length === 0}
              aria-label="Продължи към регистрация"
              className={`
                px-8 py-5 sm:px-12 sm:py-4 rounded-full text-lg font-bold transition-all duration-300 shadow-lg min-h-[56px] focus:outline-none focus:ring-4 focus:ring-sunflower focus:ring-offset-2
                ${
                  selectedProducts.length > 0
                    ? 'bg-bulgarian-red text-white hover:bg-red-700 hover:shadow-2xl hover:scale-105'
                    : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                }
              `}
            >
              {selectedProducts.length > 0
                ? `Участвай сега (${selectedProducts.length} продукта) →`
                : 'Избери продукти за да продължиш'}
            </button>
            {selectedProducts.length === 0 && (
              <p className="mt-4 text-sm text-gray-600">
                → Можеш да избереш повече от един продукт
              </p>
            )}
            {selectedProducts.length > 0 && (
              <p className="mt-4 text-sm text-green-600 font-semibold">
                ✓ Супер! Още само 2 минути до участието
              </p>
            )}
          </div>

          {/* Trust Badge - Vintage Medal */}
          <div className="mt-12 text-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.9, rotate: 0 }}
              whileInView={{ opacity: 1, scale: 1, rotate: -2 }}
              viewport={{ once: true }}
              className="inline-block"
              style={{ transform: 'rotate(-2deg)' }}
            >
              <div className="bg-old-paper px-8 py-4 shadow-2xl border-4 border-faded-denim/40 relative">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full border-4 border-bulgarian-red bg-old-paper flex items-center justify-center">
                    <span className="text-bulgarian-red text-xl font-bold">✓</span>
                  </div>
                  <span className="font-handwritten text-walnut text-lg font-semibold">Над 2,500 семейства вече участват</span>
                </div>

                {/* Corner decorations */}

                {/* Vintage texture */}
                <div className="absolute inset-0 bg-vintage-paper opacity-20 pointer-events-none" />
              </div>
            </motion.div>
          </div>
        </div>
      </section>


      {/* Video Carousel Section - Temporarily disabled until video files are added */}
      {/* <VideoCarousel /> */}

      {/* Value Proposition - Asymmetric Vintage Layout */}
      <section className="py-20 px-4 bg-old-paper relative overflow-hidden">
        {/* Vintage Texture */}
        <div className="absolute inset-0 bg-vintage-paper opacity-30" />

        <div className="max-w-7xl mx-auto relative">
          {/* Handwritten Title */}
          <motion.div
            className="text-center mb-16 border-shevitsa-top pt-8"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="font-handwritten text-bulgarian-red mb-4 text-3xl md:text-4xl lg:text-5xl">
              Защо Бачо Илия?
            </h2>
            <p className="font-handwritten text-walnut text-xl max-w-3xl mx-auto">
              Семейството ти заслужава продукти направени с любов, без химия, точно като бабините
            </p>
          </motion.div>

          {/* Two Column Grid Layout */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-start">
            {/* Left Column - Notebook Page Card */}
            <motion.div
              initial={{ opacity: 0, x: -50, rotate: -2 }}
              whileInView={{ opacity: 1, x: 0, rotate: -1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="flex justify-center lg:justify-start"
            >
              <div className="bg-white p-8 md:p-10 shadow-2xl border-4 border-walnut/40 max-w-2xl w-full relative overflow-hidden" style={{ transform: 'rotate(-1deg)' }}>
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
                <div className="absolute left-0 top-0 bottom-0 w-10 hidden md:flex flex-col justify-around py-6">
                  {[...Array(12)].map((_, i) => (
                    <div key={i} className="w-2.5 h-2.5 bg-walnut/20 rounded-full ml-3.5 border border-walnut/10" />
                  ))}
                </div>

                {/* Paper Texture */}
                <div className="absolute inset-0 bg-vintage-paper opacity-20 pointer-events-none" />

                {/* Content */}
                <div className="relative">
                  <div className="flex items-start gap-4 mb-6">
                    <div className="text-bulgarian-red text-5xl">♥</div>
                    <h3 className="font-handwritten text-3xl font-bold text-walnut">Какво получаваш:</h3>
                  </div>

                  <div className="space-y-5">
                    <div className="flex items-start gap-4">
                      <div className="w-8 h-8 rounded-full bg-bulgarian-red flex items-center justify-center flex-shrink-0 mt-1">
                        <span className="text-white font-bold">✓</span>
                      </div>
                      <p className="font-handwritten text-walnut text-lg md:text-xl leading-relaxed">
                        <span className="relative inline-block">
                          <strong className="text-bulgarian-red">Истински продукти</strong>
                          <svg className="absolute left-0 -bottom-1.5 w-full" viewBox="0 0 200 10" preserveAspectRatio="none">
                            <path d="M0,7 Q50,3 100,7 T200,7" stroke="currentColor" strokeWidth="1.5" fill="none" strokeLinecap="round" className="text-bulgarian-red" />
                          </svg>
                        </span> от щастливи крави.
                      </p>
                    </div>

                    <div className="flex items-start gap-4">
                      <div className="w-8 h-8 rounded-full bg-bulgarian-red flex items-center justify-center flex-shrink-0 mt-1">
                        <span className="text-white font-bold">✓</span>
                      </div>
                      <p className="font-handwritten text-walnut text-lg md:text-xl leading-relaxed">
                        <span className="relative inline-block">
                          <strong className="text-bulgarian-red">Без консерванти и химия</strong>
                          <svg className="absolute left-0 -bottom-1.5 w-full" viewBox="0 0 200 10" preserveAspectRatio="none">
                            <path d="M0,7 Q50,3 100,7 T200,7" stroke="currentColor" strokeWidth="1.5" fill="none" strokeLinecap="round" className="text-bulgarian-red" />
                          </svg>
                        </span> - както бабините, направено с време и любов.
                      </p>
                    </div>

                    <div className="flex items-start gap-4">
                      <div className="w-8 h-8 rounded-full bg-bulgarian-red flex items-center justify-center flex-shrink-0 mt-1">
                        <span className="text-white font-bold">✓</span>
                      </div>
                      <p className="font-handwritten text-walnut text-lg md:text-xl leading-relaxed">
                        <span className="relative inline-block">
                          <strong className="text-bulgarian-red">Храна на която да се довериш</strong>
                          <svg className="absolute left-0 -bottom-1.5 w-full" viewBox="0 0 200 10" preserveAspectRatio="none">
                            <path d="M0,7 Q50,3 100,7 T200,7" stroke="currentColor" strokeWidth="1.5" fill="none" strokeLinecap="round" className="text-bulgarian-red" />
                          </svg>
                        </span> - ако не бих дал на внуците си, няма да го продам на теб.
                      </p>
                    </div>

                    <div className="flex items-start gap-4">
                      <div className="w-8 h-8 rounded-full bg-bulgarian-red flex items-center justify-center flex-shrink-0 mt-1">
                        <span className="text-white font-bold">✓</span>
                      </div>
                      <p className="font-handwritten text-walnut text-lg md:text-xl leading-relaxed">
                      <span className="relative inline-block">
                        <strong className="text-bulgarian-red">Здрави деца и спокойствие</strong>
                        <svg className="absolute left-0 -bottom-1.5 w-full" viewBox="0 0 200 10" preserveAspectRatio="none">
                          <path d="M0,7 Q50,3 100,7 T200,7" stroke="currentColor" strokeWidth="1.5" fill="none" strokeLinecap="round" className="text-bulgarian-red" />
                        </svg>
                      </span> за теб като родител.
                      </p>
                    </div>
                  </div>

                  {/* Coffee Stain */}
                  <div className="absolute bottom-4 right-4 w-16 h-16 rounded-full bg-walnut/10 blur-lg opacity-30" />
                </div>
              </div>
            </motion.div>

            {/* Right Column - Image */}
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
                  className="w-full h-auto rounded-lg shadow-2xl"
                  priority={false}
                />
              </div>
            </motion.div>

          </div>
        </div>
      </section>

      {/* Photo Album Timeline - SOCIAL PROOF (MOVED UP BEFORE RECIPES) */}
      <section className="py-20 px-4 bg-old-paper relative overflow-hidden">
        {/* Vintage Paper Texture */}
        <div className="absolute inset-0 bg-vintage-paper opacity-40" />

        <div className="max-w-6xl mx-auto relative">
          {/* Handwritten Title */}
          <div className="text-center mb-16">
            <motion.h2
              className="font-handwritten text-bulgarian-red mb-4 text-3xl md:text-4xl lg:text-5xl xl:text-6xl"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              Семейни спомени...
            </motion.h2>
            <p className="font-handwritten text-walnut text-xl max-w-2xl mx-auto">
              Истории от родители, след като опитаха продуктите на Бачо Илия
            </p>
          </div>

          {/* Polaroid Photos - Diagonal Layout */}
          <div className="space-y-20">
            {/* Photo 1 - Left aligned, rotated */}
            <motion.div
              className="max-w-md ml-0 md:ml-12"
              initial={{ opacity: 0, x: -50, rotate: -8 }}
              whileInView={{ opacity: 1, x: 0, rotate: -3 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <div className="bg-white p-4 shadow-2xl" style={{ transform: 'rotate(-3deg)' }}>
                {/* Polaroid Photo */}
                <div className="relative h-64 bg-gray-100 mb-4">
                  <Image
                    src="/мария-софия.webp"
                    alt="Мария от София - Бачо Илия"
                    fill
                    sizes="(max-width: 768px) 100vw, 400px"
                    className="object-cover"
                    loading="lazy"
                  />
                </div>

                {/* Handwritten Caption */}
                <div className="font-handwritten text-walnut text-xl mb-3">
                  Мария, София
                </div>

                {/* Handwritten Quote */}
                <p className="font-handwritten text-bulgarian-red text-lg leading-relaxed">
                  "Децата ми отказваха всяко сирене...
                  5-годишната ми дъщеря сега иска само Бачо Илия!"
                </p>

                {/* Washi Tape at top */}
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 w-24 h-8 bg-sunflower/30 opacity-60"
                  style={{ transform: 'translateX(-50%) rotate(-2deg)' }} />
              </div>
            </motion.div>

            {/* Photo 2 - Right aligned, rotated opposite */}
            <motion.div
              className="max-w-md ml-auto mr-0 md:mr-12"
              initial={{ opacity: 0, x: 50, rotate: 8 }}
              whileInView={{ opacity: 1, x: 0, rotate: 4 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <div className="bg-white p-4 shadow-2xl" style={{ transform: 'rotate(4deg)' }}>
                {/* Polaroid Photo */}
                <div className="relative h-64 bg-gray-100 mb-4">
                  <Image
                    src="/иван пловдивс.webp"
                    alt="Иван от Пловдив - Бачо Илия"
                    fill
                    sizes="(max-width: 768px) 100vw, 400px"
                    className="object-cover"
                    loading="lazy"
                  />
                </div>

                {/* Handwritten Caption */}
                <div className="font-handwritten text-walnut text-xl mb-3">
                  Иван, Пловдив
                </div>

                {/* Handwritten Quote */}
                <p className="font-handwritten text-bulgarian-red text-lg leading-relaxed">
                  "От години търсех истинския вкус...
                  случайно попаднах на сиренето на Бачо Илия и му станах фен"
                </p>

                {/* Washi Tape at top-right corner */}
                <div className="absolute -top-3 right-8 w-20 h-8 bg-bulgarian-red/20 opacity-60"
                  style={{ transform: 'rotate(12deg)' }} />
              </div>
            </motion.div>

            {/* Photo 3 - Center, slightly tilted */}
            <motion.div
              className="max-w-md mx-auto"
              initial={{ opacity: 0, y: 50, rotate: 0 }}
              whileInView={{ opacity: 1, y: 0, rotate: -2 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              <div className="bg-white p-4 shadow-2xl" style={{ transform: 'rotate(-2deg)' }}>
                {/* Polaroid Photo */}
                <div className="relative h-64 bg-gray-100 mb-4">
                  <Image
                    src="/Qdemqlkoto.webp"
                    alt="Елена от Варна - Бачо Илия"
                    fill
                    sizes="(max-width: 768px) 100vw, 400px"
                    className="object-cover"
                    loading="lazy"
                  />
                </div>

                {/* Handwritten Caption */}
                <div className="font-handwritten text-walnut text-xl mb-3">
                  Елена, Варна
                </div>

                {/* Handwritten Quote */}
                <p className="font-handwritten text-bulgarian-red text-lg leading-relaxed">
                  "Четях етикети като луда...
                  Доверявам се само на Бачо Илия, Истинско мляко като едно време"
                </p>

                {/* Washi Tape diagonal */}
                <div className="absolute -top-4 -right-2 w-28 h-8 bg-faded-denim/20 opacity-60"
                  style={{ transform: 'rotate(45deg)' }} />
              </div>
            </motion.div>
          </div>

          {/* Vintage Counter Badges - Achievement Medals */}
          <div className="mt-24 flex flex-wrap justify-center gap-8">
            {/* Medal 1 */}
            <motion.div
              className="relative"
              initial={{ opacity: 0, scale: 0.8, rotate: -10 }}
              whileInView={{ opacity: 1, scale: 1, rotate: -5 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              style={{ transform: 'rotate(-5deg)' }}
            >
              <div className="w-40 h-40 rounded-full border-8 border-bulgarian-red bg-old-paper shadow-2xl flex flex-col items-center justify-center relative">
                {/* Number */}
                <div className="font-handwritten text-5xl font-bold text-bulgarian-red mb-1">98%</div>

                {/* Label */}
                <div className="font-handwritten text-xs text-walnut text-center leading-tight px-2">
                  КУПУВАТ<br/>ОТНОВО
                </div>

                {/* Distressed Texture */}
                <div className="absolute inset-0 rounded-full opacity-20 mix-blend-multiply pointer-events-none bg-gradient-radial from-transparent to-walnut/40" />
              </div>
            </motion.div>

            {/* Medal 2 */}
            <motion.div
              className="relative"
              initial={{ opacity: 0, scale: 0.8, rotate: 0 }}
              whileInView={{ opacity: 1, scale: 1, rotate: 2 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
              style={{ transform: 'rotate(2deg)' }}
            >
              <div className="w-40 h-40 rounded-full border-8 border-sunflower bg-old-paper shadow-2xl flex flex-col items-center justify-center relative">
                {/* Number */}
                <div className="font-handwritten text-4xl font-bold text-walnut mb-1">2,500+</div>

                {/* Label */}
                <div className="font-handwritten text-xs text-walnut text-center leading-tight px-2">
                  ДОВОЛНИ<br/>СЕМЕЙСТВА
                </div>

                {/* Distressed Texture */}
                <div className="absolute inset-0 rounded-full opacity-20 mix-blend-multiply pointer-events-none bg-gradient-radial from-transparent to-walnut/40" />
              </div>
            </motion.div>

            {/* Medal 3 */}
            <motion.div
              className="relative"
              initial={{ opacity: 0, scale: 0.8, rotate: 10 }}
              whileInView={{ opacity: 1, scale: 1, rotate: 5 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
              style={{ transform: 'rotate(5deg)' }}
            >
              <div className="w-40 h-40 rounded-full border-8 border-faded-denim bg-old-paper shadow-2xl flex flex-col items-center justify-center relative">
                {/* Number */}
                <div className="font-handwritten text-5xl font-bold text-walnut mb-1">4.9</div>

                {/* Label */}
                <div className="font-handwritten text-xs text-walnut text-center leading-tight px-2">
                  СРЕДНА<br/>ОЦЕНКА
                </div>

                {/* Distressed Texture */}
                <div className="absolute inset-0 rounded-full opacity-20 mix-blend-multiply pointer-events-none bg-gradient-radial from-transparent to-walnut/40" />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Recipes Section - CONTENT MARKETING (MOVED TO END) */}
      <section className="py-20 px-4 bg-walnut/5 relative overflow-hidden">
        {/* Vintage Texture */}
        <div className="absolute inset-0 bg-vintage-paper opacity-30" />

        <div className="max-w-7xl mx-auto relative">
          {/* Handwritten Title with Rushnik Border */}
          <motion.div
            className="text-center mb-16 border-rushnik pb-8"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="font-handwritten text-bulgarian-red mb-4 text-3xl md:text-4xl lg:text-5xl">
              Бабините рецепти
            </h2>
            <p className="font-handwritten text-walnut text-xl max-w-3xl mx-auto">
              Традиционни български ястия, направени с любов и продукти Бачо Илия
            </p>
          </motion.div>

          {/* Staggered Recipe Cards - Asymmetric Layout */}
          <div className="relative">
            {/* Mobile Navigation Arrows */}
            <button
              onClick={() => {
                const container = document.getElementById('recipes-container');
                if (container) container.scrollBy({ left: -300, behavior: 'smooth' });
              }}
              className="md:hidden absolute left-0 top-1/2 -translate-y-1/2 z-10 w-10 h-10 bg-bulgarian-red text-white rounded-full flex items-center justify-center shadow-xl hover:bg-dark-walnut transition-colors"
              aria-label="Предишна рецепта"
            >
              ←
            </button>
            <button
              onClick={() => {
                const container = document.getElementById('recipes-container');
                if (container) container.scrollBy({ left: 300, behavior: 'smooth' });
              }}
              className="md:hidden absolute right-0 top-1/2 -translate-y-1/2 z-10 w-10 h-10 bg-bulgarian-red text-white rounded-full flex items-center justify-center shadow-xl hover:bg-dark-walnut transition-colors"
              aria-label="Следваща рецепта"
            >
              →
            </button>

            <div id="recipes-container" className="flex md:grid md:grid-cols-2 gap-6 md:gap-12 mb-16 overflow-x-auto md:overflow-x-visible px-4 md:px-0 snap-x snap-mandatory md:snap-none scroll-smooth pb-4">
              {recipes.map((recipe, index) => {
                const rotations = ['-2deg', '1.5deg', '-1deg', '2deg'];
                const rotation = rotations[index % rotations.length];

                return (
                  <div key={index} className="flex-shrink-0 w-[75vw] sm:w-[70vw] md:w-auto snap-center">
                  <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    className="md:[&>*]:rotate-0"
                  >
                    <Link
                      href={`/recipes/${recipe.slug}`}
                      className="block group"
                    >
                    {/* Aged Recipe Card with Tablecloth Pattern */}
                    <div
                      className="bg-old-paper border-4 border-walnut/30 shadow-2xl p-4 sm:p-6 relative hover:shadow-vintage-lg transition-all hover:scale-105 overflow-hidden"
                      style={{ transform: `rotate(${rotation})` }}
                    >
                      {/* Tablecloth pattern overlay */}
                      <div className="absolute inset-0 bg-tablecloth opacity-30 pointer-events-none" />
                      <div className="relative z-10">
                      {/* Recipe Photo with Sepia */}
                      <div className="relative h-64 md:h-80 overflow-hidden mb-6 border-2 border-walnut/20" style={{
                        filter: 'sepia(0.4) contrast(1.05)',
                      }}>
                        <Image
                          src={recipe.image}
                          alt={`${recipe.title} - Традиционна българска рецепта с продукти Бачо Илия`}
                          fill
                          sizes="(max-width: 768px) 100vw, 50vw"
                          className="object-cover group-hover:scale-110 transition-transform duration-700"
                          loading="lazy"
                          quality={85}
                        />

                        {/* Photo Corners */}
                        <div className="absolute top-0 left-0 w-6 h-6 border-t-2 border-l-2 border-walnut/60" />
                        <div className="absolute top-0 right-0 w-6 h-6 border-t-2 border-r-2 border-walnut/60" />
                        <div className="absolute bottom-0 left-0 w-6 h-6 border-b-2 border-l-2 border-walnut/60" />
                        <div className="absolute bottom-0 right-0 w-6 h-6 border-b-2 border-r-2 border-walnut/60" />

                        {/* Time Badge - Vintage Stamp Style */}
                        <div className="absolute top-3 right-3 bg-bulgarian-red/90 px-3 py-1 text-xs font-handwritten font-bold tracking-wide border-2 border-white shadow-lg z-10 flex items-center gap-1" style={{ color: '#ffffff' }}>
                          <ClockIcon size={14} className="text-white" />
                          {recipe.time}
                        </div>
                      </div>

                      {/* Handwritten Recipe Title */}
                      <h3 className="font-handwritten text-walnut text-3xl md:text-4xl mb-4 text-center group-hover:text-bulgarian-red transition-colors">
                        {recipe.title}
                      </h3>

                      {/* Bacho's Tip - Prominently Displayed */}
                      {recipe.bachoTip && (
                        <div className="bg-white/60 p-4 border-l-4 border-bulgarian-red relative">
                          <div className="flex items-start gap-3">
                            <div className="relative w-10 h-10 flex-shrink-0">
                              <Image
                                src="/Bachi ilia head logo_.webp"
                                alt="Бачо Илия"
                                width={40}
                                height={40}
                                className="object-contain rounded-full"
                              />
                            </div>
                            <div>
                              <p className="font-handwritten text-xs text-walnut/70 uppercase tracking-wide mb-1">Бачов съвет:</p>
                              <p className="font-handwritten text-walnut text-xl leading-relaxed">
                                "{recipe.bachoTip}"
                              </p>
                            </div>
                          </div>
                        </div>
                      )}

                      {/* Coffee Stain (alternating positions) */}
                      {index % 2 === 0 ? (
                        <div className="absolute bottom-4 right-4 w-16 h-16 rounded-full bg-walnut/10 blur-sm opacity-50" />
                      ) : (
                        <div className="absolute top-4 left-4 w-12 h-12 rounded-full bg-walnut/10 blur-sm opacity-40" />
                      )}

                      {/* Torn Edge Effect (top right corner) */}
                      <div className="absolute -top-1 -right-1 w-8 h-8 bg-walnut/5" style={{
                        clipPath: 'polygon(100% 0, 100% 100%, 0 0)',
                      }} />

                      {/* View Recipe Indicator */}
                      <div className="absolute inset-0 bg-bulgarian-red/0 group-hover:bg-bulgarian-red/5 transition-colors pointer-events-none" />
                      </div>
                    </div>
                  </Link>
                  </motion.div>
                </div>
              );
            })}
            </div>

            {/* Mobile scroll indicator dots */}
            <div className="md:hidden flex justify-center gap-2 mb-6">
              {recipes.map((_, index) => (
                <div
                  key={index}
                  className="w-2 h-2 rounded-full bg-walnut/30"
                />
              ))}
            </div>
          </div>

          {/* CTA Section - Recipe Book Style */}
          <motion.div
            className="text-center space-y-8"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.5 }}
          >
            {/* View All Recipes Button - Vintage Stamp Style */}
            <Link
              href="/recipes"
              className="inline-block relative group"
            >
              <div className="bg-bulgarian-red px-10 py-5 border-4 border-dashed border-white shadow-2xl relative overflow-hidden">
                <p className="font-handwritten text-xl md:text-2xl font-bold uppercase tracking-wide relative z-10" style={{ color: '#ffffff' }}>
                  Виж Всички Рецепти →
                </p>

                {/* Stamp Perforations */}
                <div className="absolute -top-8 left-0 right-0 h-4 flex justify-between px-2">
                  {[...Array(10)].map((_, i) => (
                    <div key={i} className="w-2 h-2 bg-walnut/20 rounded-full" />
                  ))}
                </div>
                <div className="absolute -bottom-8 left-0 right-0 h-4 flex justify-between px-2">
                  {[...Array(10)].map((_, i) => (
                    <div key={i} className="w-2 h-2 bg-walnut/20 rounded-full" />
                  ))}
                </div>

                {/* Hover effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-bulgarian-red via-sunflower/20 to-bulgarian-red opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              </div>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* FAQ Section */}
      <FAQ />

      {/* Sticky CTA */}
      <StickyCTA />
    </>
  );
}
