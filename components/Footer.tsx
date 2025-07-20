'use client';

import { motion } from 'framer-motion';
import { Heart, Phone, Mail, MapPin } from 'lucide-react';
import Image from 'next/image';

export default function Footer() {
  return (
    <footer className="bg-traditional-red text-white py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {/* Brand Section */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="lg:col-span-2"
          >
            <div className="flex items-center space-x-4 mb-6">
              <Image 
                src="/logo.png" 
                alt="Бачо Илия Logo" 
                width={80} 
                height={80}
                className="rounded-full"
              />
              <div>
                <h3 className="text-3xl font-playfair font-bold mb-2">Бачо Илия</h3>
                <p className="text-white/90">Автентични български млечни продукти</p>
              </div>
            </div>
            <p className="text-white/80 text-lg leading-relaxed mb-6">
              Вече повече от 30 години създаваме най-качествените български млечни продукти, 
              следвайки традиционни рецепти и използвайки най-добрите суровини.
            </p>
            <div className="flex items-center gap-2 text-white/90">
              <Heart size={20} className="text-golden-yellow" />
              <span>Направено с любов в България</span>
            </div>
          </motion.div>

          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            viewport={{ once: true }}
          >
            <h4 className="text-xl font-playfair font-bold mb-6">Контакти</h4>
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <Phone size={18} className="text-golden-yellow" />
                <span className="text-white/90">+359 XX XXX XXX</span>
              </div>
              <div className="flex items-center gap-3">
                <Mail size={18} className="text-golden-yellow" />
                <span className="text-white/90">info@bachoiliya.bg</span>
              </div>
              <div className="flex items-start gap-3">
                <MapPin size={18} className="text-golden-yellow mt-0.5" />
                <span className="text-white/90">
                  Производствена база<br />
                  гр. София, България
                </span>
              </div>
            </div>
          </motion.div>

          {/* Quick Links */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <h4 className="text-xl font-playfair font-bold mb-6">Бързи връзки</h4>
            <div className="space-y-3">
              <a href="#hero" className="block text-white/90 hover:text-golden-yellow transition-colors duration-300">
                Начало
              </a>
              <a href="#about" className="block text-white/90 hover:text-golden-yellow transition-colors duration-300">
                За нас
              </a>
              <a href="#products" className="block text-white/90 hover:text-golden-yellow transition-colors duration-300">
                Продукти
              </a>
              <a href="#recipes" className="block text-white/90 hover:text-golden-yellow transition-colors duration-300">
                Рецепти
              </a>
              <a href="#quiz" className="block text-white/90 hover:text-golden-yellow transition-colors duration-300">
                Тест
              </a>
            </div>
          </motion.div>
        </div>

        {/* Bottom Section */}
        <motion.div
          className="border-t border-white/20 pt-8 flex flex-col md:flex-row justify-between items-center"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          viewport={{ once: true }}
        >
          <p className="text-white/70 text-center md:text-left mb-4 md:mb-0">
            © 2025 Бачо Илия. Всички права запазени.
          </p>
          <div className="flex items-center gap-4 text-white/70">
            <a href="#" className="hover:text-golden-yellow transition-colors duration-300">
              Политика за поверителност
            </a>
            <span>•</span>
            <a href="#" className="hover:text-golden-yellow transition-colors duration-300">
              Общи условия
            </a>
          </div>
        </motion.div>
      </div>
    </footer>
  );
}