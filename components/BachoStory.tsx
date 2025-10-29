'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';

export default function BachoStory() {
  return (
    <section className="bg-old-paper relative overflow-hidden px-4 py-20">
      {/* Vintage Texture */}
      <div className="bg-vintage-paper absolute inset-0 opacity-30" />

      <div className="relative mx-auto max-w-6xl">
        {/* Header - Handwritten Title */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-16 text-center"
        >
          <h2
            className="font-handwritten text-bulgarian-red mb-4"
            style={{ fontSize: '52px', lineHeight: 1.2 }}
          >
            Познайте Бачо Илия
          </h2>
          <p className="font-handwritten text-walnut text-xl">
            Дядото който върна вкуса от детството
          </p>
        </motion.div>

        {/* Story Content - Overlapping Polaroid Style */}
        <div className="mb-16 grid items-center gap-12 md:grid-cols-2 md:gap-16">
          {/* Image Side - Polaroid Photos */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="relative"
          >
            {/* Main Character Image - Polaroid Style */}
            <div
              className="relative bg-white p-5 shadow-2xl"
              style={{ transform: 'rotate(-2deg)' }}
            >
              <div
                className="border-walnut/20 relative aspect-square overflow-hidden border-2"
                style={{
                  filter: 'sepia(0.15) contrast(1.05)',
                }}
              >
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
              <p className="font-handwritten text-walnut mt-3 text-center text-2xl">
                Бачо в неговата работилница
              </p>

              {/* Washi Tape */}
              <div
                className="bg-sunflower/30 absolute -top-3 left-1/2 h-8 w-32 -translate-x-1/2 opacity-60"
                style={{ transform: 'translateX(-50%) rotate(-3deg)' }}
              />
            </div>

            {/* Small Old Photo Overlay - Vintage Stamp */}
            <motion.div
              className="absolute -right-6 -bottom-6 bg-white p-3 shadow-xl"
              initial={{ opacity: 0, rotate: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, rotate: 8, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.5 }}
              style={{ transform: 'rotate(8deg)' }}
            >
              <div
                className="border-walnut/30 relative h-32 w-32 overflow-hidden border"
                style={{
                  filter: 'sepia(0.8) contrast(1.1)',
                }}
              >
                <Image
                  src="/bacho-ilia-couple.webp"
                  alt="Бачо Илия и съпругата му - 1975г"
                  fill
                  sizes="128px"
                  className="object-cover"
                  quality={85}
                />
              </div>
              <p className="font-handwritten text-walnut mt-2 text-center text-sm">1975г</p>

              {/* Photo Corner Clips */}
              <div className="border-walnut/40 absolute top-1 left-1 h-4 w-4 border-t-2 border-l-2" />
              <div className="border-walnut/40 absolute top-1 right-1 h-4 w-4 border-t-2 border-r-2" />
            </motion.div>
          </motion.div>

          {/* Story Text Side - Old Newspaper Style */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <div className="bg-old-paper border-walnut/20 relative border-2 p-8 shadow-2xl md:p-10">
              {/* Paper texture */}
              <div className="bg-vintage-paper pointer-events-none absolute inset-0 opacity-20" />

              {/* Typewriter lines */}
              <div className="pointer-events-none absolute inset-0">
                {[...Array(15)].map((_, i) => (
                  <div
                    key={i}
                    className="border-faded-denim/10 absolute right-0 left-0 border-b"
                    style={{ top: `${(i + 1) * 6.66}%` }}
                  />
                ))}
              </div>

              {/* Header stamp */}
              <div className="border-walnut/40 relative mb-6 border-t-2 border-b-2 py-3">
                <h3 className="font-handwritten text-walnut text-center text-xs tracking-widest uppercase">
                  СПОМЕНИ ОТ ТРАДИЦИЯТА
                </h3>
              </div>

              <blockquote className="relative space-y-5">
                <p className="font-handwritten text-walnut text-sm leading-loose md:text-base">
                  Преди 30 години, моята баба ме научи как се прави истинско сирене. Не от книга. Не
                  от фабрика. От традиция, предавана от поколения.
                </p>

                <p className="font-handwritten text-walnut text-sm leading-loose md:text-base">
                  Днес правя същото сирене, по същите бабини рецепти, с любов и търпение. Без химия.
                  Без бързане. Точно както тогава.
                </p>

                <p className="font-handwritten text-walnut text-sm leading-loose font-bold md:text-base">
                  Защото някои неща не трябва да се променят.
                </p>

                {/* Signature area */}
                <div className="border-walnut/30 mt-8 border-t border-dashed pt-6">
                  <cite className="font-handwritten text-bulgarian-red block text-right text-2xl not-italic">
                    — Бачо Илия
                  </cite>
                </div>
              </blockquote>

              {/* Coffee ring stains */}
              <div className="border-walnut/20 absolute top-6 right-6 h-12 w-12 rounded-full border-2 opacity-30" />
              <div className="border-walnut/15 absolute bottom-8 left-8 h-16 w-16 rounded-full border-2 opacity-25" />

              {/* Paper clip mark */}
              <div
                className="border-walnut/30 bg-walnut/5 absolute -top-1 right-12 h-10 w-8 border-2"
                style={{
                  clipPath:
                    'polygon(20% 0%, 80% 0%, 100% 20%, 100% 80%, 80% 100%, 20% 100%, 0% 80%, 0% 20%)',
                }}
              />
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
            <div
              className="bg-bulgarian-red/90 border-bulgarian-red relative flex h-36 w-36 flex-col items-center justify-center border-4 shadow-2xl"
              style={{
                clipPath:
                  'polygon(10% 0%, 90% 0%, 100% 10%, 100% 90%, 90% 100%, 10% 100%, 0% 90%, 0% 10%)',
              }}
            >
              <div
                className="font-handwritten mb-1 text-4xl font-bold"
                style={{ color: '#ffffff' }}
              >
                30+
              </div>
              <div
                className="font-handwritten px-3 text-center text-xs leading-tight uppercase"
                style={{ color: '#ffffff' }}
              >
                ГОДИНИ
                <br />
                ТРАДИЦИЯ
              </div>
              <div className="bg-vintage-paper pointer-events-none absolute inset-0 opacity-30 mix-blend-overlay" />
            </div>
          </div>

          {/* Seal 2 */}
          <div className="relative" style={{ transform: 'rotate(2deg)' }}>
            <div
              className="bg-walnut/90 border-walnut relative flex h-36 w-36 flex-col items-center justify-center border-4 shadow-2xl"
              style={{
                clipPath:
                  'polygon(8% 2%, 92% 0%, 98% 12%, 100% 88%, 92% 98%, 8% 100%, 2% 88%, 0% 12%)',
              }}
            >
              <div
                className="font-handwritten mb-1 text-4xl font-bold"
                style={{ color: '#ffffff' }}
              >
                0%
              </div>
              <div
                className="font-handwritten px-3 text-center text-xs leading-tight uppercase"
                style={{ color: '#ffffff' }}
              >
                ХИМИЯ И<br />
                КОНСЕРВАНТИ
              </div>
              <div className="bg-vintage-paper pointer-events-none absolute inset-0 opacity-30 mix-blend-overlay" />
            </div>
          </div>

          {/* Seal 3 */}
          <div className="relative" style={{ transform: 'rotate(-1deg)' }}>
            <div
              className="bg-faded-denim/90 border-faded-denim relative flex h-36 w-36 flex-col items-center justify-center border-4 shadow-2xl"
              style={{
                clipPath:
                  'polygon(12% 0%, 88% 2%, 100% 8%, 98% 92%, 88% 100%, 12% 98%, 0% 92%, 2% 8%)',
              }}
            >
              <div
                className="font-handwritten mb-1 text-4xl font-bold"
                style={{ color: '#ffffff' }}
              >
                100%
              </div>
              <div
                className="font-handwritten px-3 text-center text-xs leading-tight uppercase"
                style={{ color: '#ffffff' }}
              >
                БАБИНИ
                <br />
                РЕЦЕПТИ
              </div>
              <div className="bg-vintage-paper pointer-events-none absolute inset-0 opacity-30 mix-blend-overlay" />
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
