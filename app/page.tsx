'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChefHat, Heart, Award, Clock, Users, ArrowRight, X, MapPin, Sword, Mail, Send } from 'lucide-react';
import Image from 'next/image';

// Import components
import HeroSection from '../components/HeroSection';
import AboutSection from '../components/AboutSection';
import QuizSection from '../components/QuizSection';
import RecipesSection from '../components/RecipesSection';
import ProductsSection from '../components/ProductsSection';
import Footer from '../components/Footer';

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-cream via-warm-beige/30 to-cream">
      {/* Header Navigation */}
      <header className="bg-traditional-red text-white py-4 shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-4">
              <Image 
                src="/logo.png" 
                alt="Бачо Илия Logo" 
                width={60} 
                height={60}
                className="rounded-full"
              />
              <div>
                <h1 className="text-2xl font-bold font-playfair">Бачо Илия</h1>
                <p className="text-sm opacity-90">Автентични български продукти</p>
              </div>
            </div>
            <nav className="hidden md:flex space-x-8">
              <a href="#hero" className="hover:text-warm-beige transition-colors">Начало</a>
              <a href="#about" className="hover:text-warm-beige transition-colors">За нас</a>
              <a href="#quiz" className="hover:text-warm-beige transition-colors">Тест</a>
              <a href="#recipes" className="hover:text-warm-beige transition-colors">Рецепти</a>
              <a href="#products" className="hover:text-warm-beige transition-colors">Продукти</a>
            </nav>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main>
        <HeroSection />
        <AboutSection />
        <QuizSection />
        <RecipesSection />
        <ProductsSection />
      </main>

      <Footer />
    </div>
  );
}