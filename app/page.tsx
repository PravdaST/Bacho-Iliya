'use client';

import { useEffect, Suspense } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useGiveawayStore, products } from '@/lib/store';
import ReferralDetector from '@/components/ReferralDetector';
import ProgressBar from '@/components/ProgressBar';
import ProductCard from '@/components/ProductCard';
import FAQ from '@/components/FAQ';
import BachoStory from '@/components/BachoStory';
import WhyDifferent from '@/components/WhyDifferent';
import StickyCTA from '@/components/StickyCTA';
import OptimizedVideo from '@/components/OptimizedVideo';
import ImagePlaceholder from '@/components/ImagePlaceholder';
// import VideoCarousel from '@/components/VideoCarousel'; // Temporarily disabled until video files are added
import { motion } from 'framer-motion';
import { Heart, Award, Clock, Users } from 'lucide-react';
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

  const recipes = [
    {
      title: "Баница със сирене",
      image: "/banica.webp",
      time: "45 мин",
      slug: "traditional-banitsa",
      bachoTip: "Традиционна баница - трета в света! Разбъркай сиренето на едро с яйца и кисело мляко. Моята баба казваше 'Корите да са маслени, а сиренето - разкъсано с ръце!'"
    },
    {
      title: "Таратор",
      image: "/tarator.webp",
      time: "15 мин",
      slug: "tarator-classic",
      bachoTip: "Рецептата от 1956 от 'Книга за домакинята' - кисело мляко, краставици, копър, чесън. Моят таратор е като от село - гъст и наситен!"
    },
    {
      title: "Снежанка салата",
      image: "/snezhanka.webp",
      time: "20 мин",
      slug: "snezhanka-salad",
      bachoTip: "Създадена през 70-те, но с бабина душа! Цедено кисело мляко, краставици, чесън и орехи. 'Сух таратор' го наричат селяните."
    },
    {
      title: "Шопска салата",
      image: "/shopska.webp",
      time: "10 мин",
      slug: "shopska-salad",
      bachoTip: "Национална гордост! Домати, краставици, чушки и сирене на едро. Сиренето отгоре - не размесвай! Така е правилно."
    },
    {
      title: "Чушки бюрек",
      image: "/chushki-burek.webp",
      time: "35 мин",
      slug: "chushki-burek",
      bachoTip: "Печени чушки, пълнеж от сирене и яйца, панирани и изпържени. Лятна класика - ароматни, сочни, истински!"
    },
    {
      title: "Миш-маш",
      image: "/mish-mash.webp",
      time: "25 мин",
      slug: "mish-mash",
      bachoTip: "Българско national dish! Лук, чушки, домати, сирене и яйца. Бърз обяд или закуска - без месо, но сита."
    },
    {
      title: "Пълнени чушки",
      image: "/palneni-chushki.webp",
      time: "70 мин",
      slug: "palneni-chushki",
      bachoTip: "Класика от бабината трапеза! Кайма с ориз в сладки чушки, задушени в доматен сос. Лято, есен, зима - винаги вкусни! Хапката топи в устата."
    },
    {
      title: "Тиквеник",
      image: "/tikvenik.webp",
      time: "50 мин",
      slug: "tikvenik",
      bachoTip: "Сладката баница за Бъдни вечер! Настъргана тиква, орехи, канела и мед между точени кори. Книгата 'Стари български рецепти' я нарича емблема на България!"
    },
    {
      title: "Мусака",
      image: "/musaka.webp",
      time: "80 мин",
      slug: "musaka-classic",
      bachoTip: "Най-обичаното ястие в България! Кайма с лук, картофи и пухкава заливка от яйца и кисело мляко. Мирише на неделя при баба!"
    },
    {
      title: "Боб яхния",
      image: "/bob-yahnia.webp",
      time: "90 мин",
      slug: "bob-yahnia",
      bachoTip: "Зимна топлина в чиния! Боб на червено с лук, чубрица и лют пипер. Ако искаш по-селски - сложи сушени чушки. Хляб и лютеница задължително!"
    },
    {
      title: "Млечна баница",
      image: "/mlechna-banica.webp",
      time: "45 мин",
      slug: "mlechna-banica",
      bachoTip: "Водеща рецепта във всяка българска готварска книга! Кори, мляко, яйца и масло. Сутрин със захар, обед като основно - винаги работи!"
    },
    {
      title: "Кюфтета",
      image: "/kyufteta.webp",
      time: "30 мин",
      slug: "kyufteta-parzeni",
      bachoTip: "Най-любимото, най-готвеното, най-популярното! Кайма с лук, чесън, чубрица и сода. Пържени до златисто. Със зелена салата и лютеница - рай!"
    },
  ];

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

      {/* Hero - Opening Branded Notebook */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden py-16 px-4" style={{ position: 'relative', zIndex: 10 }}>
        {/* Background Video - Softly Blurred */}
        <div className="absolute inset-0">
          <OptimizedVideo
            desktopSrc="/bacho-video.mp4"
            mobileSrc="/bacho-video-mobile.mp4"
            posterSrc="/bacho-video-poster.webp"
            className="absolute inset-0 w-full h-full object-cover"
            style={{
              filter: 'sepia(0.6) contrast(1.05) brightness(0.4) blur(3px)',
            }}
          />
          <div className="absolute inset-0 bg-walnut/70" />
        </div>

        {/* Opened Notebook - Two Pages */}
        <div className="relative z-10 max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 gap-0 shadow-2xl" style={{ perspective: '2000px' }}>

            {/* LEFT PAGE - Cover/Brand */}
            <div
              className="bg-bulgarian-red border-4 border-walnut/60 relative overflow-hidden min-h-[600px] flex items-center justify-center"
              style={{
                transform: 'rotateY(5deg)',
                transformOrigin: 'right center',
              }}
            >
              {/* Leather Texture */}
              <div className="absolute inset-0 opacity-20 bg-gradient-to-br from-walnut/30 to-transparent" />

              {/* Embossed Design */}
              <div className="relative text-center p-8">
                {/* Logo */}
                <div className="mb-8">
                  <div className="relative w-32 h-32 mx-auto mb-6">
                    <Image
                      src="/Bachi ilia head logo_.webp"
                      alt="Бачо Илия"
                      width={128}
                      height={128}
                      className="object-contain drop-shadow-2xl"
                    />
                  </div>
                </div>

                {/* Brand Name - Embossed */}
                <h1 className="font-serif text-5xl md:text-6xl font-bold text-white mb-4 leading-tight" style={{
                  textShadow: '3px 3px 6px rgba(0,0,0,0.5)'
                }}>
                  БАЧО<br />ИЛИЯ
                </h1>

                <div className="w-20 h-1 bg-sunflower mx-auto my-6" />

                <p className="font-serif text-xl text-white/90 uppercase tracking-widest">
                  Традиция<br />от 1970
                </p>

                {/* Decorative Border */}
                <div className="absolute top-4 left-4 right-4 bottom-4 border-2 border-white/20 pointer-events-none" />
              </div>
            </div>

            {/* RIGHT PAGE - Content with Lines */}
            <div
              className="bg-old-paper border-4 border-walnut/60 border-l-0 relative overflow-hidden min-h-[600px]"
              style={{
                transform: 'rotateY(-5deg)',
                transformOrigin: 'left center',
              }}
            >
              {/* Notebook Lines */}
              <div className="absolute inset-0 pointer-events-none">
                {[...Array(18)].map((_, i) => (
                  <div
                    key={i}
                    className="absolute left-0 right-0 border-b border-faded-denim/15"
                    style={{ top: `${(i + 1) * 5.5}%` }}
                  />
                ))}
              </div>

              {/* Vertical Margin Line */}
              <div className="absolute left-12 top-0 bottom-0 w-px bg-bulgarian-red/30" />

              {/* Paper Texture */}
              <div className="absolute inset-0 bg-vintage-paper opacity-20 pointer-events-none" />

              {/* Content - Handwritten Note */}
              <div className="relative p-8 md:p-12 h-full flex flex-col justify-between">
                {/* Header */}
                <div>
                  <div className="text-right mb-6">
                    <p className="font-mono text-xs text-walnut/60">
                      {new Date().toLocaleDateString('bg-BG')}
                    </p>
                  </div>

                  <h2 className="font-handwritten text-3xl md:text-4xl text-walnut mb-6 leading-relaxed">
                    Скъпи приятелю,
                  </h2>

                  <p className="font-handwritten text-xl md:text-2xl text-walnut leading-relaxed mb-6">
                    Искам да споделя с теб<br />
                    вкуса от детството.
                  </p>

                  <div className="bg-bulgarian-red/10 border-l-4 border-bulgarian-red p-4 mb-6">
                    <p className="font-handwritten text-lg md:text-xl text-bulgarian-red italic leading-relaxed">
                      "Раздавам БЕЗПЛАТНО<br />
                      истински млечни продукти!"
                    </p>
                  </div>
                </div>

                {/* CTA */}
                <div>
                  <a
                    href="#giveaway"
                    className="block w-full bg-bulgarian-red text-white text-center px-8 py-4 shadow-xl hover:scale-105 transition-transform duration-300 mb-6"
                  >
                    <p className="font-serif text-xl md:text-2xl font-bold uppercase">
                      УЧАСТВАЙ СЕГА →
                    </p>
                  </a>

                  {/* Signature */}
                  <div className="text-right">
                    <p className="font-handwritten text-2xl text-walnut mb-1">С уважение,</p>
                    <p className="font-handwritten text-3xl text-bulgarian-red">Бачо Илия</p>
                  </div>
                </div>

                {/* Coffee Ring Stain */}
                <div className="absolute bottom-4 left-4 w-16 h-16 rounded-full bg-walnut/10 blur-md opacity-40" />
              </div>
            </div>

          </div>

          {/* Binding Shadow */}
          <div className="absolute top-0 bottom-0 left-1/2 w-8 -translate-x-1/2 bg-gradient-to-r from-walnut/40 via-walnut/60 to-walnut/40 pointer-events-none"
            style={{ filter: 'blur(8px)' }}
          />
        </div>
      </section>

      {/* Bacho Story Section */}
      <div id="story">
        <BachoStory />
      </div>

      {/* Why Different Section */}
      <WhyDifferent />

      {/* Video Carousel Section - Temporarily disabled until video files are added */}
      {/* <VideoCarousel /> */}

      {/* Value Proposition - Asymmetric Vintage Layout */}
      <section className="py-20 px-4 bg-old-paper relative overflow-hidden">
        {/* Vintage Texture */}
        <div className="absolute inset-0 bg-vintage-paper opacity-30" />

        <div className="max-w-7xl mx-auto relative">
          {/* Handwritten Title */}
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="font-handwritten text-bulgarian-red mb-4 text-3xl md:text-4xl lg:text-5xl">
              Защо Бачо Илия?
            </h2>
            <p className="font-serif text-walnut text-xl max-w-3xl mx-auto">
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
                    <h3 className="font-handwritten text-3xl font-bold text-walnut">Какво получаваш</h3>
                  </div>

                  <div className="space-y-5">
                    <div className="flex items-start gap-4">
                      <div className="w-8 h-8 rounded-full bg-bulgarian-red flex items-center justify-center flex-shrink-0 mt-1">
                        <span className="text-white font-bold">✓</span>
                      </div>
                      <p className="font-handwritten text-walnut text-lg md:text-xl leading-relaxed">
                        <strong>Истински продукти</strong> от щастливи крави на свободен избор
                      </p>
                    </div>

                    <div className="flex items-start gap-4">
                      <div className="w-8 h-8 rounded-full bg-bulgarian-red flex items-center justify-center flex-shrink-0 mt-1">
                        <span className="text-white font-bold">✓</span>
                      </div>
                      <p className="font-handwritten text-walnut text-lg md:text-xl leading-relaxed">
                        <strong>Без консерванти и химия</strong> - както бабините, направено с време и любов
                      </p>
                    </div>

                    <div className="flex items-start gap-4">
                      <div className="w-8 h-8 rounded-full bg-bulgarian-red flex items-center justify-center flex-shrink-0 mt-1">
                        <span className="text-white font-bold">✓</span>
                      </div>
                      <p className="font-handwritten text-walnut text-lg md:text-xl leading-relaxed">
                        <strong>Храна на която да се довериш</strong> - ако не бих дал на внуците си, няма да го продам на теб
                      </p>
                    </div>

                    <div className="flex items-start gap-4">
                      <div className="w-8 h-8 rounded-full bg-bulgarian-red flex items-center justify-center flex-shrink-0 mt-1">
                        <span className="text-white font-bold">✓</span>
                      </div>
                      <p className="font-handwritten text-walnut text-lg md:text-xl leading-relaxed">
                        <strong>Здрави деца и спокойствие</strong> за теб като родител
                      </p>
                    </div>
                  </div>

                  {/* Coffee Stain */}
                  <div className="absolute bottom-4 right-4 w-16 h-16 rounded-full bg-walnut/10 blur-lg opacity-30" />
                </div>
              </div>
            </motion.div>

            {/* Right Column - Small Feature Cards Staggered */}
            <div className="space-y-8">
              <motion.div
                className="bg-sunflower/20 p-6 md:p-8 shadow-xl border-2 border-sunflower/40"
                initial={{ opacity: 0, x: 50, rotate: 2 }}
                whileInView={{ opacity: 1, x: 0, rotate: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2, duration: 0.6 }}
                style={{ transform: 'rotate(1deg)' }}
              >
                <div className="flex items-center gap-3 mb-4">
                  <h4 className="font-mono text-xl font-bold text-walnut uppercase tracking-wide">Безплатно</h4>
                </div>
                <p className="font-handwritten text-walnut text-2xl leading-relaxed">
                  Напълно безплатно участие - без номера, без скрити условия!
                </p>
              </motion.div>

              <motion.div
                className="bg-faded-denim/20 p-6 md:p-8 shadow-xl border-2 border-faded-denim/40 lg:ml-12"
                initial={{ opacity: 0, x: 50, rotate: -2 }}
                whileInView={{ opacity: 1, x: 0, rotate: -1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3, duration: 0.6 }}
                style={{ transform: 'rotate(-1deg)' }}
              >
                <div className="flex items-center gap-3 mb-4">
                  <h4 className="font-mono text-xl font-bold text-walnut uppercase tracking-wide">2 Минути</h4>
                </div>
                <p className="font-handwritten text-walnut text-2xl leading-relaxed">
                  Само 2 минути за регистрация - простичко като боб!
                </p>
              </motion.div>

              <motion.div
                className="bg-bulgarian-red/10 p-6 md:p-8 shadow-xl border-2 border-bulgarian-red/30 lg:ml-6"
                initial={{ opacity: 0, x: 50, rotate: 1 }}
                whileInView={{ opacity: 1, x: 0, rotate: 0.5 }}
                viewport={{ once: true }}
                transition={{ delay: 0.4, duration: 0.6 }}
                style={{ transform: 'rotate(0.5deg)' }}
              >
                <div className="flex items-center gap-3 mb-4">
                  <h4 className="font-mono text-xl font-bold text-walnut uppercase tracking-wide">Бабини Рецепти</h4>
                </div>
                <p className="font-handwritten text-walnut text-2xl leading-relaxed">
                  Традиционни рецепти от преди 50 години - нищо не съм променил
                </p>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* Giveaway Section - MOVED UP */}
      <section id="giveaway" className="py-12 px-4 aged-paper relative">
        <div className="max-w-6xl mx-auto">
          {/* Urgency Banner - Vintage Stamp Style */}
          <motion.div
            initial={{ opacity: 0, y: -20, rotate: 0 }}
            whileInView={{ opacity: 1, y: 0, rotate: -1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="mb-6 max-w-2xl mx-auto"
            style={{ transform: 'rotate(-1deg)' }}
          >
            <div className="bg-bulgarian-red text-white px-8 py-5 text-center shadow-2xl border-4 border-walnut/30 relative">
              <p className="font-serif text-xl font-bold uppercase tracking-wide">Участвай в раздаването сега</p>

              {/* Vintage texture overlay */}
              <div className="absolute inset-0 bg-vintage-paper opacity-10 pointer-events-none" />
            </div>
          </motion.div>

          {/* Emotional Header */}
          <div className="text-center mb-6 max-w-3xl mx-auto">
            <h2 className="font-handwritten text-bulgarian-red mb-6 text-2xl sm:text-3xl md:text-4xl lg:text-5xl">
              Кои продукти искаш за твоето семейство?
            </h2>
            <p className="font-serif text-walnut text-xl leading-relaxed mb-4">
              Знаем колко е трудно да намериш храна, на която да се довериш.
              Затова искаме да ти дадем шанс да опиташ нашите продукти - <strong>напълно безплатно</strong>.
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
              <p className="font-serif text-walnut text-lg font-semibold">Бачо Илия казва:</p>
            </div>
            <p className="font-handwritten text-walnut text-xl italic leading-relaxed">
              "Хиляди семейства вече се радват на истинския вкус. Дойде ред и на твоето!"
            </p>
          </div>

          {/* Progress Bar */}
          <div className="mb-8">
            <ProgressBar currentStep={1} totalSteps={4} />
          </div>

          {/* Products - Scattered Vintage Photos */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12 px-4">
            {products.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                isSelected={selectedProducts.includes(product.id)}
                onToggle={() => toggleProduct(product.id)}
              />
            ))}
          </div>

          {/* Selected count - Vintage Paper Card */}
          {selectedProducts.length > 0 && (
            <motion.div
              initial={{ scale: 0.8, opacity: 0, rotate: 0 }}
              animate={{ scale: 1, opacity: 1, rotate: 1 }}
              transition={{ duration: 0.3 }}
              className="text-center mb-6"
              style={{ transform: 'rotate(1deg)' }}
            >
              <div className="inline-block bg-old-paper px-8 py-4 shadow-2xl border-4 border-sunflower/40 relative">
                <div className="flex items-center gap-3">
                  <span className="text-3xl">✓</span>
                  <p className="font-handwritten text-walnut text-2xl">
                    Избрани: <span className="font-bold text-bulgarian-red">{selectedProducts.length}</span> {selectedProducts.length === 1 ? 'продукт' : 'продукта'}
                  </p>
                </div>

                {/* Stamp corner */}
                <div className="absolute -top-3 -right-3 w-12 h-12 rounded-full border-4 border-bulgarian-red bg-old-paper flex items-center justify-center shadow-xl">
                  <span className="text-sunflower text-xl">★</span>
                </div>

                {/* Aged corners */}
                <div className="absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 border-walnut/40" />
                <div className="absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2 border-walnut/40" />
              </div>
            </motion.div>
          )}

          {/* Continue Button */}
          <div className="text-center">
            <button
              onClick={handleContinue}
              disabled={selectedProducts.length === 0}
              className={`
                px-12 py-4 rounded-full text-lg font-bold transition-all duration-300 shadow-lg
                ${
                  selectedProducts.length > 0
                    ? 'bg-traditional-red text-white hover:bg-red-700 hover:shadow-2xl hover:scale-105'
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
                  <span className="font-serif text-walnut text-lg font-semibold">Над 2,500 семейства вече участват</span>
                </div>

                {/* Star decorations */}
                <div className="absolute -top-2 -left-2 text-sunflower text-2xl">★</div>
                <div className="absolute -bottom-2 -right-2 text-bulgarian-red text-2xl">★</div>

                {/* Vintage texture */}
                <div className="absolute inset-0 bg-vintage-paper opacity-20 pointer-events-none" />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Recipes Section - Aged Recipe Book Cards */}
      <section className="py-20 px-4 bg-walnut/5 relative overflow-hidden">
        {/* Vintage Texture */}
        <div className="absolute inset-0 bg-vintage-paper opacity-30" />

        <div className="max-w-7xl mx-auto relative">
          {/* Handwritten Title */}
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="font-handwritten text-bulgarian-red mb-4 text-3xl md:text-4xl lg:text-5xl">
              Бабините рецепти
            </h2>
            <p className="font-serif text-walnut text-xl max-w-3xl mx-auto">
              Традиционни български ястия, направени с любов и продукти Бачо Илия
            </p>
          </motion.div>

          {/* Staggered Recipe Cards - Asymmetric Layout */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 mb-16">
            {recipes.map((recipe, index) => {
              const rotations = ['-2deg', '1.5deg', '-1deg', '2deg'];
              const rotation = rotations[index % rotations.length];

              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30, rotate: 0 }}
                  whileInView={{ opacity: 1, y: 0, rotate: parseFloat(rotation) }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  style={{ transform: `rotate(${rotation})` }}
                >
                  <Link
                    href={`/recipes/${recipe.slug}`}
                    className="block group"
                  >
                    {/* Aged Recipe Card */}
                    <div className="bg-old-paper border-4 border-walnut/30 shadow-2xl p-6 relative hover:shadow-vintage-lg transition-all hover:scale-105">
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
                        <div className="absolute top-3 right-3 bg-bulgarian-red/90 px-3 py-1 text-xs font-mono text-white font-bold tracking-wide border-2 border-white shadow-lg z-10">
                          ⏱ {recipe.time}
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
                              <p className="font-mono text-xs text-walnut/70 uppercase tracking-wide mb-1">Бачов съвет:</p>
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
                  </Link>
                </motion.div>
              );
            })}
          </div>

          {/* CTA Section - Recipe Book Style */}
          <motion.div
            className="text-center space-y-8"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.5 }}
          >
            {/* Bacho's Quote Card */}
            <div className="inline-block bg-old-paper px-8 py-6 shadow-xl border-4 border-walnut/30 relative max-w-2xl" style={{ transform: 'rotate(-1deg)' }}>
              <div className="flex items-start gap-4 mb-4">
                <div className="relative w-12 h-12 flex-shrink-0">
                  <Image
                    src="/Bachi ilia head logo_.webp"
                    alt="Бачо Илия"
                    width={48}
                    height={48}
                    className="object-contain rounded-full"
                  />
                </div>
                <div>
                  <p className="font-mono text-sm text-walnut uppercase tracking-wide mb-2">Бачо Илия казва:</p>
                  <p className="font-handwritten text-walnut text-2xl md:text-3xl leading-relaxed">
                    "Всяка рецепта е спомен. Всеки залък е връщане у дома."
                  </p>
                </div>
              </div>

              {/* Stamp in corner */}
              <div className="absolute -bottom-4 -right-4 w-16 h-16 rounded-full border-4 border-sunflower bg-old-paper flex items-center justify-center shadow-xl">
                <span className="text-bulgarian-red text-2xl">★</span>
              </div>
            </div>

            {/* View All Recipes Button - Vintage Stamp Style */}
            <Link
              href="/recipes"
              className="inline-block relative group"
            >
              <div className="bg-bulgarian-red px-10 py-5 border-4 border-dashed border-white shadow-2xl relative overflow-hidden">
                <p className="font-serif text-white text-xl md:text-2xl font-bold uppercase tracking-wide relative z-10">
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

      {/* Photo Album Timeline - Family Stories */}
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
            <p className="font-serif text-walnut text-xl max-w-2xl mx-auto">
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
                  <ImagePlaceholder
                    category="people"
                    description="Снимка на Мария"
                    aspectRatio="portrait"
                    size="medium"
                  />
                </div>

                {/* Handwritten Caption */}
                <div className="font-handwritten text-walnut text-xl mb-3">
                  Мария, София 🏡
                </div>

                {/* Handwritten Quote */}
                <p className="font-handwritten text-bulgarian-red text-lg leading-relaxed">
                  "Децата ми отказваха всяко сирене...
                  5-годишната ми дъщеря сега иска само Бачо Илия!"
                </p>

                {/* Stars */}
                <div className="flex gap-2 mt-3 justify-end text-sunflower text-2xl">
                  ★★★★★
                </div>

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
                  <ImagePlaceholder
                    category="people"
                    description="Снимка на Иван"
                    aspectRatio="portrait"
                    size="medium"
                  />
                </div>

                {/* Handwritten Caption */}
                <div className="font-handwritten text-walnut text-xl mb-3">
                  Иван, Пловдив 🌾
                </div>

                {/* Handwritten Quote */}
                <p className="font-handwritten text-bulgarian-red text-lg leading-relaxed">
                  "От години търсех вкуса на бабините сирена...
                  Пробвах Бачо Илия и плаках като малко дете."
                </p>

                {/* Stars */}
                <div className="flex gap-2 mt-3 justify-end text-sunflower text-2xl">
                  ★★★★★
                </div>

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
                  <ImagePlaceholder
                    category="people"
                    description="Снимка на Елена"
                    aspectRatio="portrait"
                    size="medium"
                  />
                </div>

                {/* Handwritten Caption */}
                <div className="font-handwritten text-walnut text-xl mb-3">
                  Елена, Варна 🌊
                </div>

                {/* Handwritten Quote */}
                <p className="font-handwritten text-bulgarian-red text-lg leading-relaxed">
                  "Четях етикети като луда...
                  Бачо Илия: само мляко, сол и култура.
                  Точно това искам!"
                </p>

                {/* Stars */}
                <div className="flex gap-2 mt-3 justify-end text-sunflower text-2xl">
                  ★★★★★
                </div>

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
                {/* Star Decoration */}
                <div className="absolute -top-2 text-sunflower text-3xl">★</div>

                {/* Number */}
                <div className="font-mono text-5xl font-bold text-bulgarian-red mb-1">98%</div>

                {/* Label */}
                <div className="font-mono text-xs text-walnut text-center leading-tight px-2">
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
                {/* Star Decoration */}
                <div className="absolute -top-2 text-bulgarian-red text-3xl">★</div>

                {/* Number */}
                <div className="font-mono text-4xl font-bold text-walnut mb-1">2,500+</div>

                {/* Label */}
                <div className="font-mono text-xs text-walnut text-center leading-tight px-2">
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
                {/* Star Decoration */}
                <div className="absolute -top-2 text-sunflower text-3xl">★</div>

                {/* Number */}
                <div className="font-mono text-5xl font-bold text-walnut mb-1">4.9</div>

                {/* Label */}
                <div className="font-mono text-xs text-walnut text-center leading-tight px-2">
                  СРЕДНА<br/>ОЦЕНКА
                </div>

                {/* Distressed Texture */}
                <div className="absolute inset-0 rounded-full opacity-20 mix-blend-multiply pointer-events-none bg-gradient-radial from-transparent to-walnut/40" />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* How It Works - Step-by-Step Journey */}
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
            <p className="font-serif text-walnut text-xl">
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
              <div className="bg-white p-8 shadow-2xl border-4 border-sunflower/30 relative" style={{ transform: 'rotate(-1deg)' }}>
                {/* Step Number Badge */}
                <div className="absolute -top-8 -left-8 w-20 h-20 rounded-full bg-bulgarian-red border-4 border-white flex items-center justify-center shadow-xl">
                  <span className="font-mono text-white text-3xl font-bold">01</span>
                </div>

                <h3 className="font-serif text-2xl md:text-3xl font-bold text-walnut mb-4 mt-4">
                  Избери продуктите
                </h3>
                <p className="font-serif text-walnut text-lg leading-relaxed mb-4">
                  Маркирай кои млечни продукти искаш да спечелиш за твоето семейство. Можеш да избереш всички - без ограничения!
                </p>
                <div className="flex items-center gap-2 text-sunflower">
                  <span className="text-3xl">🧀</span>
                  <span className="font-handwritten text-xl text-walnut">Бяло сирене, кашкавал, кисело мляко...</span>
                </div>
              </div>
            </div>
            <div className="order-2 hidden md:block">
              <div className="text-9xl opacity-10 font-mono text-walnut">01</div>
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
              <div className="text-9xl opacity-10 font-mono text-walnut text-right">02</div>
            </div>
            <div className="order-1 md:order-2">
              <div className="bg-white p-8 shadow-2xl border-4 border-faded-denim/30 relative ml-auto" style={{ transform: 'rotate(1deg)' }}>
                {/* Step Number Badge */}
                <div className="absolute -top-8 -right-8 w-20 h-20 rounded-full bg-bulgarian-red border-4 border-white flex items-center justify-center shadow-xl">
                  <span className="font-mono text-white text-3xl font-bold">02</span>
                </div>

                <h3 className="font-serif text-2xl md:text-3xl font-bold text-walnut mb-4 mt-4">
                  Регистрирай се
                </h3>
                <p className="font-serif text-walnut text-lg leading-relaxed mb-4">
                  Попълни бързо данните си - име, email, телефон. Отнема само 2 минути. Безплатно е, без скрити условия!
                </p>
                <div className="flex items-center gap-2 text-faded-denim">
                  <span className="text-3xl">⏱️</span>
                  <span className="font-handwritten text-xl text-walnut">Простичко като боб!</span>
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
              <div className="bg-white p-8 shadow-2xl border-4 border-bulgarian-red/30 relative" style={{ transform: 'rotate(-0.5deg)' }}>
                {/* Step Number Badge */}
                <div className="absolute -top-8 -left-8 w-20 h-20 rounded-full bg-bulgarian-red border-4 border-white flex items-center justify-center shadow-xl">
                  <span className="font-mono text-white text-3xl font-bold">03</span>
                </div>

                <h3 className="font-serif text-2xl md:text-3xl font-bold text-walnut mb-4 mt-4">
                  Сподели и участвай
                </h3>
                <p className="font-serif text-walnut text-lg leading-relaxed mb-4">
                  Харесай, коментирай и сподели във Facebook. Всяко споделяне ти дава допълнително участие в раздаването!
                </p>
                <div className="flex items-center gap-2 text-bulgarian-red">
                  <span className="text-3xl">🎁</span>
                  <span className="font-handwritten text-xl text-walnut">Повече споделяния = повече шансове!</span>
                </div>
              </div>
            </div>
            <div className="order-2 hidden md:block">
              <div className="text-9xl opacity-10 font-mono text-walnut">03</div>
            </div>
          </motion.div>

          {/* Big CTA */}
          <motion.div
            className="text-center mt-16"
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.6 }}
          >
            <a
              href="#giveaway"
              className="inline-block relative group"
            >
              <div className="bg-bulgarian-red px-12 py-6 shadow-2xl relative overflow-hidden">
                <div className="relative z-10">
                  <p className="font-serif text-white text-2xl md:text-3xl font-bold uppercase tracking-wide mb-2">
                    Започни сега
                  </p>
                  <p className="font-handwritten text-white/90 text-lg">
                    Безплатно • 2 минути • Без номера
                  </p>
                </div>

                {/* Animated Background */}
                <div className="absolute inset-0 bg-gradient-to-r from-bulgarian-red via-sunflower/20 to-bulgarian-red opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              </div>
            </a>
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
