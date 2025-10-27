"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { useScrollAnimation, fadeInVariants, staggerContainer } from "@/hooks/use-scroll-animation";

export default function Footer() {
  const { ref, isInView } = useScrollAnimation(0.1);

  return (
    <motion.footer
      ref={ref}
      className="bg-bulgarian-red text-white py-8 sm:py-12 lg:py-16 relative overflow-hidden px-4 sm:px-6 lg:px-8 border-t-4 border-walnut"
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      variants={staggerContainer}
    >
      {/* Paper texture */}
      <div className="absolute inset-0 bg-vintage-paper opacity-5" />

      <div className="container mx-auto relative z-10">
        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6 sm:gap-8"
          variants={staggerContainer}
        >
          <motion.div
            className="sm:col-span-2 lg:col-span-2"
            variants={fadeInVariants}
          >
            <motion.div
              className="flex items-center gap-3 mb-4"
              whileHover={{ scale: 1.05 }}
            >
              <div className="relative h-12 sm:h-16 w-auto">
                <Image
                  src="/logo.png"
                  alt="Бачо Илия Logo"
                  width={120}
                  height={64}
                  className="h-full w-auto object-contain"
                  style={{ imageRendering: 'crisp-edges' }}
                  unoptimized
                  quality={100}
                  sizes="(max-width: 640px) 48px, 64px"
                />
              </div>
            </motion.div>
            <motion.p
              className="font-handwritten mb-4 sm:mb-6 text-lg sm:text-xl"
              variants={fadeInVariants}
              style={{ color: '#ffffff' }}
            >
              Движението за истински вкус. Без компромиси, без лъжи.
            </motion.p>
            <motion.div
              variants={fadeInVariants}
            >
              <span className="font-handwritten text-lg" style={{ color: '#ffffff' }}>Направено с любов в България</span>
            </motion.div>
          </motion.div>

          <motion.div variants={fadeInVariants}>
            <motion.h4
              className="font-handwritten mb-4 sm:mb-6 text-xl sm:text-2xl"
              style={{ color: '#ffffff' }}
            >
              Навигация
            </motion.h4>
            <ul className="space-y-3">
              {[
                { label: "Продукти", href: "/products" },
                { label: "Рецепти", href: "/recipes" },
                { label: "Магазини", href: "/where-to-buy" },
                { label: "Блог", href: "/blog" }
              ].map((link, index) => (
                <motion.li
                  key={link.href}
                  initial={{ opacity: 0, x: -20 }}
                  animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
                  transition={{ delay: 0.5 + index * 0.1 }}
                >
                  <a
                    href={link.href}
                    className="font-handwritten text-lg transition-colors inline-block"
                    style={{ color: '#ffffff' }}
                  >
                    {link.label}
                  </a>
                </motion.li>
              ))}
            </ul>
          </motion.div>

          <motion.div variants={fadeInVariants}>
            <motion.h4
              className="font-handwritten mb-4 sm:mb-6 text-xl sm:text-2xl"
              style={{ color: '#ffffff' }}
            >
              Правна информация
            </motion.h4>
            <ul className="space-y-3">
              {[
                { label: "Общи условия", href: "/terms" },
                { label: "Поверителност", href: "/privacy" },
                { label: "Бисквитки", href: "/cookies" }
              ].map((link, index) => (
                <motion.li
                  key={link.href}
                  initial={{ opacity: 0, x: -20 }}
                  animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
                  transition={{ delay: 0.5 + index * 0.1 }}
                >
                  <a
                    href={link.href}
                    className="font-handwritten text-base transition-colors inline-block"
                    style={{ color: '#ffffff' }}
                  >
                    {link.label}
                  </a>
                </motion.li>
              ))}
            </ul>
          </motion.div>

          <motion.div variants={fadeInVariants}>
            <motion.h4
              className="font-handwritten mb-4 sm:mb-6 text-xl sm:text-2xl"
              style={{ color: '#ffffff' }}
            >
              Последвай ни
            </motion.h4>
            <motion.div
              className="flex gap-4 mb-6"
              variants={staggerContainer}
              initial="hidden"
              animate={isInView ? "visible" : "hidden"}
            >
              <motion.a
                href="https://www.facebook.com/Bacho.Iliya/"
                target="_blank"
                rel="noopener noreferrer"
                variants={fadeInVariants}
                whileHover={{ scale: 1.1 }}
                className="w-12 h-12 bg-white/20 border-2 border-white/30 flex items-center justify-center cursor-pointer hover:bg-white/40 transition-all duration-300"
                aria-label="Следвай ни във Facebook"
              >
                <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" className="text-white">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                </svg>
              </motion.a>

              <motion.a
                href="https://www.youtube.com/@bachoiliyabg"
                target="_blank"
                rel="noopener noreferrer"
                variants={fadeInVariants}
                whileHover={{ scale: 1.1 }}
                className="w-12 h-12 bg-white/20 border-2 border-white/30 flex items-center justify-center cursor-pointer hover:bg-white/40 transition-all duration-300"
                aria-label="Следвай ни в YouTube"
              >
                <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" className="text-white">
                  <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
                </svg>
              </motion.a>

              <motion.a
                href="https://www.tiktok.com/@bachoiliyabg"
                target="_blank"
                rel="noopener noreferrer"
                variants={fadeInVariants}
                whileHover={{ scale: 1.1 }}
                className="w-12 h-12 bg-white/20 border-2 border-white/30 flex items-center justify-center cursor-pointer hover:bg-white/40 transition-all duration-300"
                aria-label="Следвай ни в TikTok"
              >
                <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" className="text-white">
                  <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z" />
                </svg>
              </motion.a>
            </motion.div>
            <motion.div>
              <p className="font-handwritten text-lg" style={{ color: '#ffffff' }}>contact@bacho-iliya.eu</p>
            </motion.div>
          </motion.div>
        </motion.div>

        {/* Visual divider */}
        <motion.div
          className="w-full h-px bg-gradient-to-r from-transparent via-white/30 to-transparent my-8"
          variants={fadeInVariants}
        />

        <motion.div
          className="text-center"
          variants={fadeInVariants}
        >
          <motion.p
            className="font-handwritten mb-3 sm:mb-4 text-sm sm:text-base"
            style={{ color: '#ffffff' }}
          >
            © 2025 Бачо Илия. Всички права запазени. Движението тепърва започва.
          </motion.p>
          <motion.div>
            <span className="font-handwritten text-base" style={{ color: '#ffffff' }}>Създадено с вярата в истинското</span>
          </motion.div>
        </motion.div>
      </div>
    </motion.footer>
  );
}
