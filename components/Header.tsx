"use client";

import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import Image from "next/image";

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
      setIsMenuOpen(false);
    }
  };

  const navItems = [
    { type: "link", href: "/about", label: "ЗА НАС" },
    { type: "link", href: "/products", label: "ПРОДУКТИ" },
    { type: "link", href: "/recipes", label: "РЕЦЕПТИ" },
    { type: "link", href: "/where-to-buy", label: "МАГАЗИНИ" },
    { type: "link", href: "/blog", label: "БЛОГ" },
    { type: "link", href: "/#giveaway", label: "РАЗДАВАНЕ" },
  ];

  return (
    <motion.header
      className={`backdrop-blur-sm border-b-4 border-walnut/30 z-50 transition-all duration-500 fixed top-0 left-0 right-0 ${
        scrolled
          ? "shadow-2xl"
          : "shadow-xl"
      }`}
      style={{
        backgroundColor: scrolled ? '#DC143C' : 'rgba(220, 20, 60, 0.95)',
      }}
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
    >
      {/* Vintage texture overlay */}
      <div className="absolute inset-0 bg-vintage-paper opacity-10 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="flex justify-between items-center py-4">
          {/* Logo */}
          <motion.div
            className="flex-shrink-0"
            initial={{ x: -50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <Link href="/">
              <motion.div
                className="relative h-8 sm:h-10 md:h-12 w-auto cursor-pointer"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Image
                  src="/logo.png"
                  alt="Бачо Илия"
                  width={120}
                  height={48}
                  className="h-full w-auto object-contain"
                  style={{ imageRendering: 'crisp-edges' }}
                  priority
                  unoptimized
                  quality={100}
                  sizes="(max-width: 640px) 32px, (max-width: 768px) 40px, 48px"
                />
              </motion.div>
            </Link>
          </motion.div>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex space-x-6 xl:space-x-8 items-center">
            {navItems.map((item, index) => (
              item.type === "link" ? (
                <Link key={item.href} href={item.href!}>
                  <motion.div
                    className="relative text-white hover:text-old-paper font-handwritten text-base lg:text-lg font-bold group px-2 py-1 cursor-pointer tracking-wide"
                    initial={{ y: -20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ duration: 0.5, delay: 0.3 + index * 0.1 }}
                    whileHover={{ y: -2 }}
                  >
                    {item.label}
                    <motion.div
                      className="absolute -bottom-1 left-0 w-0 h-1 bg-old-paper group-hover:w-full transition-all duration-300"
                      whileHover={{ width: "100%" }}
                    />
                  </motion.div>
                </Link>
              ) : (
                <motion.button
                  key={item.label}
                  onClick={() => scrollToSection((item as any).id)}
                  className="relative text-white hover:text-old-paper font-handwritten text-base lg:text-lg font-bold group px-2 py-1 tracking-wide"
                  initial={{ y: -20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ duration: 0.5, delay: 0.3 + index * 0.1 }}
                  whileHover={{ y: -2 }}
                >
                  {item.label}
                  <motion.div
                    className="absolute -bottom-1 left-0 w-0 h-1 bg-old-paper group-hover:w-full transition-all duration-300"
                    whileHover={{ width: "100%" }}
                  />
                </motion.button>
              )
            ))}
          </nav>

          {/* Mobile menu button */}
          <motion.div
            className="lg:hidden"
            initial={{ x: 50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <motion.button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-white p-3 relative touch-manipulation"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
            >
              <AnimatePresence mode="wait">
                {isMenuOpen ? (
                  <motion.div
                    key="close"
                    initial={{ rotate: -90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: 90, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <X className="h-7 w-7" />
                  </motion.div>
                ) : (
                  <motion.div
                    key="menu"
                    initial={{ rotate: 90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: -90, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <Menu className="h-7 w-7" />
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.button>
          </motion.div>
        </div>

        {/* Mobile Navigation */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              className="lg:hidden"
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              <motion.div
                className="px-4 pt-4 pb-6 space-y-2 border-t-4 border-walnut/30 relative"
                style={{
                  backgroundColor: 'rgba(226, 37, 38, 0.95)',
                }}
                initial={{ y: -20 }}
                animate={{ y: 0 }}
                transition={{ duration: 0.3, delay: 0.1 }}
              >
                {/* Vintage texture overlay for mobile menu */}
                <div className="absolute inset-0 bg-vintage-paper opacity-10 pointer-events-none" />

                {navItems.map((item, index) => (
                  item.type === "link" ? (
                    <Link key={item.href} href={item.href!}>
                      <motion.div
                        className="block w-full text-left px-4 py-4 text-white hover:text-old-paper font-handwritten text-lg font-bold tracking-wide border-2 border-transparent hover:border-old-paper/30 transition-all duration-200 touch-manipulation relative z-10"
                        initial={{ x: -20, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        transition={{ duration: 0.3, delay: 0.1 + index * 0.05 }}
                        whileHover={{ x: 5 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={() => setIsMenuOpen(false)}
                      >
                        {item.label}
                      </motion.div>
                    </Link>
                  ) : (
                    <motion.button
                      key={item.label}
                      onClick={() => scrollToSection((item as any).id)}
                      className="block w-full text-left px-4 py-4 text-white hover:text-old-paper font-handwritten text-lg font-bold tracking-wide border-2 border-transparent hover:border-old-paper/30 transition-all duration-200 touch-manipulation relative z-10"
                      initial={{ x: -20, opacity: 0 }}
                      animate={{ x: 0, opacity: 1 }}
                      transition={{ duration: 0.3, delay: 0.1 + index * 0.05 }}
                      whileHover={{ x: 5 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      {item.label}
                    </motion.button>
                  )
                ))}
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.header>
  );
}
