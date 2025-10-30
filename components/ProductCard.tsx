'use client';

import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { Product } from '@/lib/store';

interface ProductCardProps {
  product: Product;
  isSelected: boolean;
  onToggle: () => void;
}

export default function ProductCard({ product, isSelected, onToggle }: ProductCardProps) {
  // Различна ротация за всеки продукт базирана на ID
  const getRotation = () => {
    const rotations = ['-2deg', '1.5deg', '-1deg', '2deg', '-1.5deg', '1deg'];
    const index = product.id.length % rotations.length;
    return rotations[index];
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      onToggle();
    }
  };

  return (
    <motion.div
      className="relative"
      initial={{ opacity: 0, y: 20, rotate: 0 }}
      animate={{ opacity: 1, y: 0, rotate: parseFloat(getRotation()) }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
      whileHover={{ scale: 1.05, rotate: 0 }}
      onClick={onToggle}
      onKeyDown={handleKeyDown}
      role="button"
      tabIndex={0}
      aria-pressed={isSelected}
      aria-label={`${isSelected ? 'Премахни' : 'Избери'} ${product.nameBg}`}
    >
      {/* White Photo Frame - как в стари снимки */}
      <div className="relative cursor-pointer border-4 border-gray-200 bg-white p-6 shadow-2xl">
        {/* Photo with thick inner border */}
        <div className="border-walnut/10 bg-old-paper relative mb-4 aspect-square w-full overflow-hidden border-8">
          <Image
            src={product.image}
            alt={`${product.nameBg} - Автентични български млечни продукти от Бачо Илия`}
            fill
            sizes="280px"
            className="object-cover"
            priority={true}
          />

          {/* Vintage Photo Corners - по-големи и по-изразителни */}
          <div className="border-walnut/60 absolute top-0 left-0 h-12 w-12 border-t-4 border-l-4" />
          <div className="border-walnut/60 absolute top-0 right-0 h-12 w-12 border-t-4 border-r-4" />
          <div className="border-walnut/60 absolute bottom-0 left-0 h-12 w-12 border-b-4 border-l-4" />
          <div className="border-walnut/60 absolute right-0 bottom-0 h-12 w-12 border-r-4 border-b-4" />
        </div>

        {/* Product Info - под снимката */}
        <div className="space-y-2 text-center">
          {/* Product Name - handwritten style */}
          <h3 className="font-handwritten text-walnut text-2xl">{product.nameBg}</h3>

          {/* Description - smaller serif */}
          <p className="font-handwritten text-walnut/70 text-sm leading-relaxed">
            {product.description}
          </p>
        </div>

        {/* Aging effect on frame */}
        <div className="pointer-events-none absolute inset-0 opacity-10">
          <div className="bg-walnut absolute top-4 right-4 h-16 w-16 rounded-full blur-xl" />
          <div className="bg-walnut absolute bottom-4 left-4 h-12 w-12 rounded-full blur-lg" />
        </div>

        {/* Stamp "ИЗБРАНО" - Appears when selected */}
        <AnimatePresence>
          {isSelected && (
            <motion.div
              className="pointer-events-none absolute top-8 right-8 z-20"
              initial={{ scale: 0, rotate: -45, opacity: 0 }}
              animate={{ scale: 1, rotate: 12, opacity: 1 }}
              exit={{ scale: 0, rotate: -45, opacity: 0 }}
              transition={{
                type: 'spring',
                stiffness: 200,
                damping: 15,
              }}
            >
              {/* Circular Stamp */}
              <div className="relative h-24 w-24">
                {/* Red Circle Background */}
                <div className="bg-bulgarian-red absolute inset-0 rounded-full shadow-lg" />

                {/* Inner Content */}
                <div className="absolute inset-0 flex items-center justify-center">
                  {/* Text */}
                  <div className="font-handwritten text-center text-base leading-tight font-bold text-white">
                    ИЗБРАНО
                  </div>
                </div>

                {/* Stamp Texture */}
                <div
                  className="pointer-events-none absolute inset-0 rounded-full opacity-20 mix-blend-overlay"
                  style={{
                    background:
                      'radial-gradient(circle, rgba(255,255,255,0.3) 30%, transparent 70%)',
                  }}
                />
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
}
