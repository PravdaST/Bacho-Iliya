'use client';

import { motion } from 'framer-motion';
import { Award, Heart, ChefHat } from 'lucide-react';

export default function AboutSection() {
  return (
    <section id="about" className="py-20 lg:py-32 bg-gradient-to-br from-warm-beige/20 to-cream/40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-playfair font-bold text-warm-brown mb-6">
            За нас
          </h2>
          <p className="text-lg sm:text-xl text-gray-700 max-w-3xl mx-auto leading-relaxed">
            "Бачо Илия" носи в себе си традициите на българското селско стопанство и любовта към качествените млечни продукти.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8 lg:gap-12">
          <motion.div
            className="text-center bg-white/60 backdrop-blur-sm rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            viewport={{ once: true }}
            whileHover={{ scale: 1.05 }}
          >
            <div className="w-20 h-20 bg-traditional-red/10 rounded-full flex items-center justify-center mx-auto mb-6">
              <Award className="text-traditional-red" size={40} />
            </div>
            <h3 className="text-xl font-playfair font-bold text-warm-brown mb-4">Качество</h3>
            <p className="text-gray-700">
              Използваме само най-качествени суровини и традиционни методи за производство на нашите продукти.
            </p>
          </motion.div>

          <motion.div
            className="text-center bg-white/60 backdrop-blur-sm rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
            whileHover={{ scale: 1.05 }}
          >
            <div className="w-20 h-20 bg-traditional-red/10 rounded-full flex items-center justify-center mx-auto mb-6">
              <Heart className="text-traditional-red" size={40} />
            </div>
            <h3 className="text-xl font-playfair font-bold text-warm-brown mb-4">Традиция</h3>
            <p className="text-gray-700">
              Нашите рецепти се предават от поколение на поколение, запазвайки автентичния български вкус.
            </p>
          </motion.div>

          <motion.div
            className="text-center bg-white/60 backdrop-blur-sm rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            viewport={{ once: true }}
            whileHover={{ scale: 1.05 }}
          >
            <div className="w-20 h-20 bg-traditional-red/10 rounded-full flex items-center justify-center mx-auto mb-6">
              <ChefHat className="text-traditional-red" size={40} />
            </div>
            <h3 className="text-xl font-playfair font-bold text-warm-brown mb-4">Майсторство</h3>
            <p className="text-gray-700">
              Всеки наш продукт е създаден с внимание към детайла и страст към българската кулинарна култура.
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}