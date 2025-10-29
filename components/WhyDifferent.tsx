'use client';

import { motion } from 'framer-motion';

export default function WhyDifferent() {
  const features = [
    {
      title: 'По бабините рецепти',
      description:
        'Всяка рецепта е от моята баба. Нищо не съм променил - защото тя знаеше най-добре. Същата традиция, предавана през поколенията.',
      borderColor: 'border-bulgarian-red/30',
      stampColor: 'border-bulgarian-red',
      rotation: '-2deg',
    },
    {
      title: 'От щастливи крави',
      description:
        'Кравите са на свободен избор, ядат трева, не антибиотици. Виждам ги всеки ден. Щастлива крава = качествено мляко.',
      borderColor: 'border-faded-denim/30',
      stampColor: 'border-faded-denim',
      rotation: '1.5deg',
    },
    {
      title: 'Без химия и консерванти',
      description:
        'Ако не бих дал на моите внуци, няма да го продам на теб. Проста работа. Само мляко, сол и култура.',
      borderColor: 'border-sunflower/40',
      stampColor: 'border-sunflower',
      rotation: '-1deg',
    },
  ];

  return (
    <section className="bg-walnut/5 relative overflow-hidden px-4 py-20">
      {/* Vintage Texture */}
      <div className="bg-vintage-paper absolute inset-0 opacity-20" />

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
            Защо хиляди семейства
            <br className="hidden md:block" /> избират Бачо Илия?
          </h2>
          <p className="font-handwritten text-walnut mx-auto max-w-2xl text-xl">
            Три неща които правят продуктите ни различни
          </p>
        </motion.div>

        {/* Features - Notebook Paper Cards */}
        <div className="mb-16 grid gap-8 md:grid-cols-3 md:gap-10">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30, rotate: 0 }}
              whileInView={{ opacity: 1, y: 0, rotate: parseFloat(feature.rotation) }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.15 }}
              style={{ transform: `rotate(${feature.rotation})` }}
            >
              <div
                className={`border-4 bg-white ${feature.borderColor} hover:shadow-vintage-lg group relative overflow-hidden p-6 shadow-2xl transition-all hover:scale-105 md:p-8`}
              >
                {/* Notebook Lines */}
                <div className="pointer-events-none absolute inset-0">
                  {[...Array(12)].map((_, i) => (
                    <div
                      key={i}
                      className="border-faded-denim/15 absolute right-0 left-0 border-b"
                      style={{ top: `${(i + 1) * 8.33}%` }}
                    />
                  ))}
                </div>

                {/* Left Margin Line */}
                <div className="bg-bulgarian-red/30 absolute top-0 bottom-0 left-10 w-px" />

                {/* Perforation Holes - Left Side */}
                <div className="absolute top-0 bottom-0 left-0 flex w-8 flex-col justify-around py-4">
                  {[...Array(8)].map((_, i) => (
                    <div
                      key={i}
                      className="bg-walnut/20 border-walnut/10 ml-3 h-2 w-2 rounded-full border"
                    />
                  ))}
                </div>

                {/* Paper Texture */}
                <div className="bg-vintage-paper pointer-events-none absolute inset-0 opacity-20" />

                {/* Content */}
                <div className="relative">
                  {/* Title - Handwritten */}
                  <h3 className="font-handwritten text-walnut group-hover:text-bulgarian-red mb-4 text-2xl transition-colors md:text-3xl">
                    {feature.title}
                  </h3>

                  {/* Description - Handwritten Style */}
                  <p className="font-handwritten text-walnut text-lg leading-relaxed md:text-xl">
                    {feature.description}
                  </p>
                </div>

                {/* Coffee Stain */}
                <div className="bg-walnut/10 absolute right-4 bottom-4 h-12 w-12 rounded-full opacity-30 blur-md" />
              </div>
            </motion.div>
          ))}
        </div>

        {/* Bottom Quote - Notebook Paper */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="mx-auto max-w-3xl"
        >
          <div
            className="border-walnut/40 relative overflow-hidden border-4 bg-white px-8 py-10 shadow-2xl md:px-12"
            style={{ transform: 'rotate(-0.5deg)' }}
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

            {/* Left Margin Line */}
            <div className="bg-bulgarian-red/30 absolute top-0 bottom-0 left-12 w-px" />

            {/* Perforation Holes - Left Side */}
            <div className="absolute top-0 bottom-0 left-0 flex w-10 flex-col justify-around py-6">
              {[...Array(8)].map((_, i) => (
                <div
                  key={i}
                  className="bg-walnut/20 border-walnut/10 ml-3.5 h-2.5 w-2.5 rounded-full border"
                />
              ))}
            </div>

            {/* Paper Texture */}
            <div className="bg-vintage-paper pointer-events-none absolute inset-0 opacity-20" />

            {/* Content */}
            <blockquote className="relative">
              <p className="font-handwritten text-walnut mb-6 text-center text-2xl leading-relaxed md:text-3xl">
                Правя всичко точно както бабата ме научи. Защото нейният начин беше правилният.
              </p>

              <cite className="font-handwritten text-bulgarian-red block text-center text-2xl font-bold not-italic">
                — Бачо Илия
              </cite>
            </blockquote>

            {/* Coffee Stain */}
            <div className="bg-walnut/10 absolute right-8 bottom-6 h-20 w-20 rounded-full opacity-30 blur-lg" />
          </div>
        </motion.div>
      </div>
    </section>
  );
}
