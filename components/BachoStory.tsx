'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';

export default function BachoStory() {
  return (
    <section className="py-20 px-4 bg-old-paper relative overflow-hidden">
      {/* Vintage Texture */}
      <div className="absolute inset-0 bg-vintage-paper opacity-30" />

      <div className="max-w-6xl mx-auto relative">
        {/* Header - Handwritten Title */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="font-handwritten text-bulgarian-red mb-4" style={{ fontSize: '52px', lineHeight: 1.2 }}>
            Познайте Бачо Илия
          </h2>
          <p className="font-handwritten text-walnut text-xl">
            Дядото който върна вкуса от детството
          </p>
        </motion.div>

        {/* Story Content - Overlapping Polaroid Style */}
        <div className="grid md:grid-cols-2 gap-12 md:gap-16 items-center mb-16">
          {/* Image Side - Polaroid Photos */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="relative"
          >
            {/* Main Character Image - Polaroid Style */}
            <div className="bg-white p-5 shadow-2xl relative" style={{ transform: 'rotate(-2deg)' }}>
              <div className="relative aspect-square overflow-hidden border-2 border-walnut/20" style={{
                filter: 'sepia(0.15) contrast(1.05)',
              }}>
                <Image
                  src="/bacho-ilia-main.webp"
                  alt="Бачо Илия - Майстор на традиционните млечни продукти"
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className="object-cover"
                  priority
                  quality={90}
                />
              </div>

              {/* Handwritten Caption */}
              <p className="font-handwritten text-walnut text-2xl mt-3 text-center">
                Бачо в неговата работилница
              </p>

              {/* Washi Tape */}
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-32 h-8 bg-sunflower/30 opacity-60"
                style={{ transform: 'translateX(-50%) rotate(-3deg)' }} />
            </div>

            {/* Small Old Photo Overlay - Vintage Stamp */}
            <motion.div
              className="absolute -bottom-6 -right-6 bg-white p-3 shadow-xl"
              initial={{ opacity: 0, rotate: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, rotate: 8, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.5 }}
              style={{ transform: 'rotate(8deg)' }}
            >
              <div className="relative w-32 h-32 overflow-hidden border border-walnut/30" style={{
                filter: 'sepia(0.8) contrast(1.1)',
              }}>
                <Image
                  src="/bacho-ilia-couple.webp"
                  alt="Бачо Илия и съпругата му - 1975г"
                  fill
                  sizes="128px"
                  className="object-cover"
                  quality={85}
                />
              </div>
              <p className="font-handwritten text-walnut text-sm mt-2 text-center">1975г</p>

              {/* Photo Corner Clips */}
              <div className="absolute top-1 left-1 w-4 h-4 border-t-2 border-l-2 border-walnut/40" />
              <div className="absolute top-1 right-1 w-4 h-4 border-t-2 border-r-2 border-walnut/40" />
            </motion.div>
          </motion.div>

          {/* Story Text Side - Old Newspaper Style */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <div className="bg-old-paper p-8 md:p-10 border-2 border-walnut/20 relative shadow-2xl">
              {/* Paper texture */}
              <div className="absolute inset-0 bg-vintage-paper opacity-20 pointer-events-none" />

              {/* Typewriter lines */}
              <div className="absolute inset-0 pointer-events-none">
                {[...Array(15)].map((_, i) => (
                  <div
                    key={i}
                    className="absolute left-0 right-0 border-b border-faded-denim/10"
                    style={{ top: `${(i + 1) * 6.66}%` }}
                  />
                ))}
              </div>

              {/* Header stamp */}
              <div className="border-t-2 border-b-2 border-walnut/40 py-3 mb-6 relative">
                <h3 className="font-handwritten text-walnut text-xs uppercase tracking-widest text-center">
                  СПОМЕНИ ОТ ТРАДИЦИЯТА
                </h3>
              </div>

              <blockquote className="space-y-5 relative">
                <p className="font-handwritten text-walnut text-sm md:text-base leading-loose">
                  Преди 30 години, моята баба ме научи как се прави истинско сирене.
                  Не от книга. Не от фабрика. От традиция, предавана от поколения.
                </p>

                <p className="font-handwritten text-walnut text-sm md:text-base leading-loose">
                  Днес правя същото сирене, по същите бабини рецепти, с любов и търпение.
                  Без химия. Без бързане. Точно както тогава.
                </p>

                <p className="font-handwritten text-walnut text-sm md:text-base leading-loose font-bold">
                  Защото някои неща не трябва да се променят.
                </p>

                {/* Signature area */}
                <div className="border-t border-dashed border-walnut/30 pt-6 mt-8">
                  <cite className="block text-right font-handwritten text-bulgarian-red text-2xl not-italic">
                    — Бачо Илия
                  </cite>
                </div>
              </blockquote>

              {/* Coffee ring stains */}
              <div className="absolute top-6 right-6 w-12 h-12 rounded-full border-2 border-walnut/20 opacity-30" />
              <div className="absolute bottom-8 left-8 w-16 h-16 rounded-full border-2 border-walnut/15 opacity-25" />

              {/* Paper clip mark */}
              <div className="absolute -top-1 right-12 w-8 h-10 border-2 border-walnut/30 bg-walnut/5" style={{ clipPath: 'polygon(20% 0%, 80% 0%, 100% 20%, 100% 80%, 80% 100%, 20% 100%, 0% 80%, 0% 20%)' }} />
            </div>
          </motion.div>
        </div>

        {/* Trust Badges - Wax Seal Style */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.6 }}
          className="flex flex-wrap justify-center gap-8"
        >
          {/* Seal 1 */}
          <div className="relative" style={{ transform: 'rotate(-3deg)' }}>
            <div className="w-36 h-36 bg-bulgarian-red/90 border-4 border-bulgarian-red shadow-2xl flex flex-col items-center justify-center relative"
              style={{
                clipPath: 'polygon(10% 0%, 90% 0%, 100% 10%, 100% 90%, 90% 100%, 10% 100%, 0% 90%, 0% 10%)'
              }}>
              <div className="font-handwritten text-4xl font-bold text-white mb-1">30+</div>
              <div className="font-handwritten text-xs text-white/90 text-center leading-tight uppercase px-3">
                ГОДИНИ<br/>ТРАДИЦИЯ
              </div>
              <div className="absolute inset-0 opacity-30 mix-blend-overlay pointer-events-none bg-vintage-paper" />
            </div>
          </div>

          {/* Seal 2 */}
          <div className="relative" style={{ transform: 'rotate(2deg)' }}>
            <div className="w-36 h-36 bg-walnut/90 border-4 border-walnut shadow-2xl flex flex-col items-center justify-center relative"
              style={{
                clipPath: 'polygon(8% 2%, 92% 0%, 98% 12%, 100% 88%, 92% 98%, 8% 100%, 2% 88%, 0% 12%)'
              }}>
              <div className="font-handwritten text-4xl font-bold text-white mb-1">0%</div>
              <div className="font-handwritten text-xs text-white/90 text-center leading-tight uppercase px-3">
                ХИМИЯ И<br/>КОНСЕРВАНТИ
              </div>
              <div className="absolute inset-0 opacity-30 mix-blend-overlay pointer-events-none bg-vintage-paper" />
            </div>
          </div>

          {/* Seal 3 */}
          <div className="relative" style={{ transform: 'rotate(-1deg)' }}>
            <div className="w-36 h-36 bg-faded-denim/90 border-4 border-faded-denim shadow-2xl flex flex-col items-center justify-center relative"
              style={{
                clipPath: 'polygon(12% 0%, 88% 2%, 100% 8%, 98% 92%, 88% 100%, 12% 98%, 0% 92%, 2% 8%)'
              }}>
              <div className="font-handwritten text-4xl font-bold text-white mb-1">100%</div>
              <div className="font-handwritten text-xs text-white/90 text-center leading-tight uppercase px-3">
                БАБИНИ<br/>РЕЦЕПТИ
              </div>
              <div className="absolute inset-0 opacity-30 mix-blend-overlay pointer-events-none bg-vintage-paper" />
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
