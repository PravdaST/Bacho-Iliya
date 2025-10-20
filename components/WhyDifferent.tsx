'use client';

import { motion } from 'framer-motion';

export default function WhyDifferent() {
  const features = [
    {
      title: 'По бабините рецепти',
      description: 'Всяка рецепта е от моята баба. Нищо не съм променил - защото тя знаеше най-добре. Същата традиция, предавана през поколенията.',
      borderColor: 'border-bulgarian-red/30',
      stampColor: 'border-bulgarian-red',
      rotation: '-2deg'
    },
    {
      title: 'От щастливи крави',
      description: 'Кравите са на свободен избор, ядат трева, не антибиотици. Виждам ги всеки ден. Щастлива крава = качествено мляко.',
      borderColor: 'border-faded-denim/30',
      stampColor: 'border-faded-denim',
      rotation: '1.5deg'
    },
    {
      title: 'Без химия и консерванти',
      description: 'Ако не бих дал на моите внуци, няма да го продам на теб. Проста работа. Само мляко, сол и култура.',
      borderColor: 'border-sunflower/40',
      stampColor: 'border-sunflower',
      rotation: '-1deg'
    }
  ];

  return (
    <section className="py-20 px-4 bg-walnut/5 relative overflow-hidden">
      {/* Vintage Texture */}
      <div className="absolute inset-0 bg-vintage-paper opacity-20" />

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
            Защо хиляди семейства<br className="hidden md:block" /> избират Бачо Илия?
          </h2>
          <p className="font-handwritten text-walnut text-xl max-w-2xl mx-auto">
            Три неща които правят продуктите ни различни
          </p>
        </motion.div>

        {/* Features - Notebook Paper Cards */}
        <div className="grid md:grid-cols-3 gap-8 md:gap-10 mb-16">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30, rotate: 0 }}
              whileInView={{ opacity: 1, y: 0, rotate: parseFloat(feature.rotation) }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.15 }}
              style={{ transform: `rotate(${feature.rotation})` }}
            >
              <div className={`bg-white border-4 ${feature.borderColor} shadow-2xl p-6 md:p-8 relative hover:shadow-vintage-lg transition-all hover:scale-105 group overflow-hidden`}>
                {/* Notebook Lines */}
                <div className="absolute inset-0 pointer-events-none">
                  {[...Array(12)].map((_, i) => (
                    <div
                      key={i}
                      className="absolute left-0 right-0 border-b border-faded-denim/15"
                      style={{ top: `${(i + 1) * 8.33}%` }}
                    />
                  ))}
                </div>

                {/* Left Margin Line */}
                <div className="absolute left-10 top-0 bottom-0 w-px bg-bulgarian-red/30" />

                {/* Perforation Holes - Left Side */}
                <div className="absolute left-0 top-0 bottom-0 w-8 flex flex-col justify-around py-4">
                  {[...Array(8)].map((_, i) => (
                    <div key={i} className="w-2 h-2 bg-walnut/20 rounded-full ml-3 border border-walnut/10" />
                  ))}
                </div>

                {/* Paper Texture */}
                <div className="absolute inset-0 bg-vintage-paper opacity-20 pointer-events-none" />

                {/* Content */}
                <div className="relative">
                  {/* Title - Handwritten */}
                  <h3 className="font-handwritten text-walnut text-2xl md:text-3xl mb-4 group-hover:text-bulgarian-red transition-colors">
                    {feature.title}
                  </h3>

                  {/* Description - Handwritten Style */}
                  <p className="font-handwritten text-walnut text-lg md:text-xl leading-relaxed">
                    {feature.description}
                  </p>
                </div>

                {/* Coffee Stain */}
                <div className="absolute bottom-4 right-4 w-12 h-12 rounded-full bg-walnut/10 blur-md opacity-30" />
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
          className="max-w-3xl mx-auto"
        >
          <div className="bg-white px-8 md:px-12 py-10 shadow-2xl border-4 border-walnut/40 relative overflow-hidden" style={{ transform: 'rotate(-0.5deg)' }}>
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

            {/* Left Margin Line */}
            <div className="absolute left-12 top-0 bottom-0 w-px bg-bulgarian-red/30" />

            {/* Perforation Holes - Left Side */}
            <div className="absolute left-0 top-0 bottom-0 w-10 flex flex-col justify-around py-6">
              {[...Array(8)].map((_, i) => (
                <div key={i} className="w-2.5 h-2.5 bg-walnut/20 rounded-full ml-3.5 border border-walnut/10" />
              ))}
            </div>

            {/* Paper Texture */}
            <div className="absolute inset-0 bg-vintage-paper opacity-20 pointer-events-none" />

            {/* Content */}
            <blockquote className="relative">
              <p className="font-handwritten text-walnut text-2xl md:text-3xl leading-relaxed mb-6 text-center">
                Правя всичко точно както бабата ме научи.
                Защото нейният начин беше правилният.
              </p>

              <cite className="block text-center font-handwritten text-bulgarian-red text-2xl font-bold not-italic">
                — Бачо Илия
              </cite>
            </blockquote>

            {/* Coffee Stain */}
            <div className="absolute bottom-6 right-8 w-20 h-20 rounded-full bg-walnut/10 blur-lg opacity-30" />
          </div>
        </motion.div>
      </div>
    </section>
  );
}
