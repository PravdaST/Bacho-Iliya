'use client';

import { useRef, useState, useEffect } from 'react';
import ProductCard from './ProductCard';
import { Product } from '@/lib/store';

interface Props {
  products: Product[];
  selectedProducts: string[];
  onToggle: (productId: string) => void;
}

export default function ProductCarouselScroll({ products, selectedProducts, onToggle }: Props) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  // Track scroll position to update active index
  useEffect(() => {
    const handleScroll = () => {
      if (!scrollRef.current) return;

      const scrollLeft = scrollRef.current.scrollLeft;
      const cardWidth = scrollRef.current.offsetWidth * 0.85; // 85vw cards
      const newIndex = Math.round(scrollLeft / cardWidth);

      setActiveIndex(newIndex);
    };

    const scrollElement = scrollRef.current;
    if (scrollElement) {
      scrollElement.addEventListener('scroll', handleScroll);
      return () => scrollElement.removeEventListener('scroll', handleScroll);
    }
  }, []);

  const scrollToIndex = (index: number) => {
    if (!scrollRef.current) return;

    const cardWidth = scrollRef.current.offsetWidth * 0.85;
    scrollRef.current.scrollTo({
      left: index * cardWidth,
      behavior: 'smooth',
    });
  };

  return (
    <div className="relative bg-gradient-to-b from-gray-50 to-white py-12">
      {/* Header */}
      <div className="mb-8 text-center">
        <p className="font-medium text-gray-600">Scroll или кликни точките</p>
        <p className="mt-1 text-xs text-gray-400">Native Scroll Snap Style</p>
      </div>

      {/* Scroll Container */}
      <div
        ref={scrollRef}
        className="hide-scrollbar flex snap-x snap-mandatory gap-6 overflow-x-auto scroll-smooth px-8"
        style={{
          scrollbarWidth: 'none', // Firefox
          msOverflowStyle: 'none', // IE/Edge
        }}
      >
        {products.map((product, index) => {
          const isCentered = index === activeIndex;

          return (
            <div key={product.id} className="w-[85vw] flex-shrink-0 snap-center md:w-96">
              <div
                className={`transition-all duration-300 ${
                  isCentered ? 'scale-100 opacity-100 shadow-2xl' : 'scale-95 opacity-70 shadow-lg'
                }`}
              >
                <ProductCard
                  product={product}
                  isSelected={selectedProducts.includes(product.id)}
                  onToggle={() => onToggle(product.id)}
                />

                {/* Centered indicator */}
                {isCentered && (
                  <div className="mt-4 text-center">
                    <span className="bg-bulgarian-red inline-block rounded-full px-4 py-1 text-xs font-bold text-white">
                      ⭐ На фокус
                    </span>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Dots navigation */}
      <div className="mt-8 flex justify-center gap-2">
        {products.map((_, idx) => (
          <button
            key={idx}
            onClick={() => scrollToIndex(idx)}
            className={`h-2.5 rounded-full transition-all duration-300 ${
              idx === activeIndex ? 'bg-bulgarian-red w-10' : 'w-2.5 bg-gray-300 hover:bg-gray-400'
            }`}
            aria-label={`Scroll to product ${idx + 1}`}
          />
        ))}
      </div>

      {/* Hint */}
      <p className="mt-6 flex items-center justify-center gap-2 text-center text-sm text-gray-500">
        <span>←</span>
        <span>Scroll естествено</span>
        <span>→</span>
      </p>

      {/* Hide scrollbar CSS */}
      <style jsx>{`
        .hide-scrollbar::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </div>
  );
}
