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

  return (
    <motion.div
      className="relative"
      initial={{ opacity: 0, y: 20, rotate: 0 }}
      animate={{ opacity: 1, y: 0, rotate: parseFloat(getRotation()) }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      whileHover={{ scale: 1.05, rotate: 0 }}
      onClick={onToggle}
    >
      {/* White Photo Frame - как в стари снимки */}
      <div className="bg-white p-6 shadow-2xl border-4 border-gray-200 cursor-pointer relative">
        {/* Photo with thick inner border */}
        <div className="relative w-full aspect-square mb-4 border-8 border-walnut/10 bg-old-paper overflow-hidden">
          <Image
            src={product.image}
            alt={`${product.nameBg} - Автентични български млечни продукти от Бачо Илия`}
            fill
            sizes="280px"
            className="object-cover"
            priority={true}
          />

          {/* Vintage Photo Corners - по-големи и по-изразителни */}
          <div className="absolute top-0 left-0 w-12 h-12 border-t-4 border-l-4 border-walnut/60" />
          <div className="absolute top-0 right-0 w-12 h-12 border-t-4 border-r-4 border-walnut/60" />
          <div className="absolute bottom-0 left-0 w-12 h-12 border-b-4 border-l-4 border-walnut/60" />
          <div className="absolute bottom-0 right-0 w-12 h-12 border-b-4 border-r-4 border-walnut/60" />
        </div>

        {/* Product Info - под снимката */}
        <div className="text-center space-y-2">
          {/* Product Name - handwritten style */}
          <h3 className="font-handwritten text-walnut text-2xl">
            {product.nameBg}
          </h3>

          {/* Description - smaller serif */}
          <p className="font-handwritten text-walnut/70 text-sm leading-relaxed">
            {product.description}
          </p>
        </div>

        {/* Aging effect on frame */}
        <div className="absolute inset-0 pointer-events-none opacity-10">
          <div className="absolute top-4 right-4 w-16 h-16 rounded-full bg-walnut blur-xl" />
          <div className="absolute bottom-4 left-4 w-12 h-12 rounded-full bg-walnut blur-lg" />
        </div>

        {/* Stamp "ИЗБРАНО" - Appears when selected */}
        <AnimatePresence>
          {isSelected && (
            <motion.div
              className="absolute top-8 right-8 z-20 pointer-events-none"
              initial={{ scale: 0, rotate: -45, opacity: 0 }}
              animate={{ scale: 1, rotate: 12, opacity: 1 }}
              exit={{ scale: 0, rotate: -45, opacity: 0 }}
              transition={{
                type: "spring",
                stiffness: 200,
                damping: 15
              }}
            >
              {/* Circular Stamp */}
              <div className="relative w-24 h-24">
                {/* Red Circle Background */}
                <div className="absolute inset-0 rounded-full bg-bulgarian-red shadow-lg" />

                {/* Inner Content */}
                <div className="absolute inset-0 flex items-center justify-center">
                  {/* Text */}
                  <div className="font-handwritten text-base font-bold text-white text-center leading-tight">
                    ИЗБРАНО
                  </div>
                </div>

                {/* Stamp Texture */}
                <div className="absolute inset-0 rounded-full opacity-20 mix-blend-overlay pointer-events-none"
                  style={{
                    background: 'radial-gradient(circle, rgba(255,255,255,0.3) 30%, transparent 70%)'
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
