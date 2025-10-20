'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import ProductCard from './ProductCard';
import { Product } from '@/lib/store';

interface ProductCarouselProps {
  products: Product[];
  selectedProducts: string[];
  onToggle: (productId: string) => void;
}

export default function ProductCarousel({ products, selectedProducts, onToggle }: ProductCarouselProps) {
  const [centerIndex, setCenterIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  // Auto-rotate every 4 seconds
  useEffect(() => {
    if (!isAutoPlaying) return;

    const interval = setInterval(() => {
      setCenterIndex((prev) => (prev + 1) % products.length);
    }, 4000);

    return () => clearInterval(interval);
  }, [isAutoPlaying, products.length]);

  // Pause auto-play on hover/interaction
  const handleInteraction = () => {
    setIsAutoPlaying(false);
    setTimeout(() => setIsAutoPlaying(true), 10000); // Resume after 10s
  };

  const goToIndex = (index: number) => {
    handleInteraction();
    setCenterIndex(index);
  };

  const goNext = () => {
    goToIndex((centerIndex + 1) % products.length);
  };

  const goPrev = () => {
    goToIndex((centerIndex - 1 + products.length) % products.length);
  };

  // Calculate visible items (5 on desktop, 3 on mobile)
  const getVisibleCount = () => {
    if (typeof window === 'undefined') return 5;
    return window.innerWidth < 768 ? 3 : 5;
  };

  const [visibleCount, setVisibleCount] = useState(getVisibleCount());

  useEffect(() => {
    const handleResize = () => setVisibleCount(getVisibleCount());
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const halfVisible = Math.floor(visibleCount / 2);

  // Get items to display with infinite loop
  const getVisibleItems = () => {
    const items = [];
    for (let i = -halfVisible; i <= halfVisible; i++) {
      const index = (centerIndex + i + products.length) % products.length;
      items.push({
        product: products[index],
        position: i, // -2, -1, 0, 1, 2
        actualIndex: index,
      });
    }
    return items;
  };

  const visibleItems = getVisibleItems();

  // Calculate transform styles based on position
  const getItemStyle = (position: number) => {
    const absPos = Math.abs(position);

    // Scale: center=1.0, ±1=0.85, ±2=0.65
    const scale = position === 0 ? 1.0 : absPos === 1 ? 0.85 : 0.65;

    // Blur: center=0, ±1=3px, ±2=6px
    const blur = position === 0 ? 0 : absPos === 1 ? 3 : 6;

    // Opacity: center=1, ±1=0.75, ±2=0.5
    const opacity = position === 0 ? 1 : absPos === 1 ? 0.75 : 0.5;

    // Z-index: center highest
    const zIndex = 10 - absPos;

    // Translate for spacing
    const translateX = position * (visibleCount === 3 ? 35 : 25);

    return {
      scale,
      filter: `blur(${blur}px)`,
      opacity,
      zIndex,
      x: `${translateX}%`,
    };
  };

  return (
    <div
      className="relative py-12"
      onMouseEnter={handleInteraction}
      onTouchStart={handleInteraction}
    >
      {/* Progress indicator */}
      <div className="text-center mb-8">
        <p className="text-gray-600 text-sm mb-3">
          Продукт {centerIndex + 1} от {products.length}
        </p>
        <div className="flex justify-center gap-2">
          {products.map((_, idx) => (
            <button
              key={idx}
              onClick={() => goToIndex(idx)}
              className={`h-2 rounded-full transition-all duration-300 ${
                idx === centerIndex
                  ? 'w-8 bg-bulgarian-red'
                  : 'w-2 bg-gray-300 hover:bg-gray-400'
              }`}
              aria-label={`Отиди на продукт ${idx + 1}`}
            />
          ))}
        </div>
      </div>

      {/* Carousel container */}
      <div className="relative h-[500px] md:h-[550px] overflow-visible">
        {/* Navigation arrows */}
        <button
          onClick={goPrev}
          className="absolute left-0 md:left-4 top-1/2 -translate-y-1/2 z-20 bg-white/95 hover:bg-white shadow-xl rounded-full p-3 md:p-4 transition-all hover:scale-110 active:scale-95"
          aria-label="Предишен продукт"
        >
          <ChevronLeft className="w-5 h-5 md:w-6 md:h-6 text-traditional-brown" />
        </button>

        <button
          onClick={goNext}
          className="absolute right-0 md:right-4 top-1/2 -translate-y-1/2 z-20 bg-white/95 hover:bg-white shadow-xl rounded-full p-3 md:p-4 transition-all hover:scale-110 active:scale-95"
          aria-label="Следващ продукт"
        >
          <ChevronRight className="w-5 h-5 md:w-6 md:h-6 text-traditional-brown" />
        </button>

        {/* Products */}
        <div className="absolute inset-0 flex items-center justify-center">
          <AnimatePresence mode="sync">
            {visibleItems.map(({ product, position, actualIndex }) => {
              const style = getItemStyle(position);
              const isCentered = position === 0;

              return (
                <motion.div
                  key={`${actualIndex}-${position}`}
                  className="absolute w-72 md:w-80"
                  initial={{ scale: 0.5, opacity: 0 }}
                  animate={{
                    scale: style.scale,
                    x: style.x,
                    opacity: style.opacity,
                    zIndex: style.zIndex,
                    filter: style.filter,
                  }}
                  exit={{ scale: 0.5, opacity: 0 }}
                  transition={{
                    duration: 0.4,
                    ease: [0.25, 0.46, 0.45, 0.94], // Custom easing
                  }}
                  onClick={() => {
                    if (!isCentered) {
                      goToIndex(actualIndex);
                    }
                  }}
                  style={{
                    cursor: isCentered ? 'default' : 'pointer',
                    pointerEvents: 'auto',
                  }}
                >
                  <div className={`transition-all duration-300 ${
                    isCentered ? 'shadow-2xl' : 'shadow-lg'
                  }`}>
                    <ProductCard
                      product={product}
                      isSelected={selectedProducts.includes(product.id)}
                      onToggle={() => onToggle(product.id)}
                    />
                  </div>

                  {/* Center indicator */}
                  {isCentered && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="absolute -bottom-8 left-1/2 -translate-x-1/2 bg-bulgarian-red text-white px-4 py-1 rounded-full text-xs font-bold shadow-lg whitespace-nowrap"
                    >
                      ⭐ На фокус
                    </motion.div>
                  )}
                </motion.div>
              );
            })}
          </AnimatePresence>
        </div>
      </div>

      {/* Auto-play indicator */}
      <div className="text-center mt-16">
        <div className="inline-flex items-center gap-2 bg-gray-100 px-4 py-2 rounded-full text-xs text-gray-600">
          {isAutoPlaying ? (
            <>
              <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
              Автоматично превъртане (4 сек)
            </>
          ) : (
            <>
              <span className="w-2 h-2 bg-gray-400 rounded-full"></span>
              На пауза
            </>
          )}
        </div>
        <p className="text-xs text-gray-500 mt-2 italic">
          Кликни страничните продукти за да ги центрираш
        </p>
      </div>

      {/* Keyboard hint */}
      <div className="hidden md:flex justify-center gap-4 mt-6 text-xs text-gray-500">
        <span>← Предишен</span>
        <span>|</span>
        <span>Следващ →</span>
      </div>
    </div>
  );
}
