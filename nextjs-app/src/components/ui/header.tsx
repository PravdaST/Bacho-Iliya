"use client";

import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;

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
    { id: "about", label: "ЗА НАС" },
    { id: "recipes", label: "РЕЦЕПТИ" },
    { id: "products", label: "ПРОДУКТИ" },
  ];

  return (
    <motion.header 
      className={`backdrop-blur-md border-b z-50 transition-all duration-500 ${
        scrolled 
          ? "shadow-xl" 
          : ""
      }`}
      style={{
        backgroundColor: scrolled ? 'rgba(226, 37, 38, 0.95)' : 'rgba(226, 37, 38, 0.90)',
        borderColor: scrolled ? 'rgba(226, 37, 38, 0.50)' : 'rgba(226, 37, 38, 0.30)'
      }}
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          {/* Logo */}
          <motion.div 
            className="flex-shrink-0"
            initial={{ x: -50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <motion.img
              src="/logo.png"
              alt="Бачо Илия"
              className="h-8 sm:h-10 md:h-12 w-auto cursor-pointer"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => typeof window !== "undefined" && window.scrollTo({ top: 0, behavior: 'smooth' })}
            />
          </motion.div>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex space-x-6 xl:space-x-8">
            {navItems.map((item, index) => (
              <motion.button
                key={item.id}
                onClick={() => scrollToSection(item.id)}
                className="relative text-white hover:text-white/80 font-semibold text-base lg:text-lg group px-2 py-1"
                initial={{ y: -20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.3 + index * 0.1 }}
                whileHover={{ y: -2 }}
              >
                {item.label}
                <motion.div
                  className="absolute -bottom-1 left-0 w-0 h-0.5 bg-white group-hover:w-full transition-all duration-300"
                  whileHover={{ width: "100%" }}
                />
              </motion.button>
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

        {/* Mobile Navigation Overlay */}
        <AnimatePresence>
          {isMenuOpen && (
            <>
              {/* Background overlay */}
              <motion.div
                className="lg:hidden fixed inset-0 bg-black/50 z-40"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
                onClick={() => setIsMenuOpen(false)}
              />
              
              {/* Menu content */}
              <motion.div
                className="lg:hidden fixed left-0 right-0 top-16 z-50 backdrop-blur-xl"
                style={{
                  backgroundColor: 'rgba(226, 37, 38, 0.98)',
                  boxShadow: '0 10px 25px rgba(0,0,0,0.25)'
                }}
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.4, ease: "easeOut" }}
              >
                <motion.div 
                  className="px-6 py-8 space-y-1 border-t border-white/20"
                  initial={{ y: -10 }}
                  animate={{ y: 0 }}
                  transition={{ duration: 0.4, delay: 0.1 }}
                >
                  {navItems.map((item, index) => (
                    <motion.button
                      key={item.id}
                      onClick={() => scrollToSection(item.id)}
                      className="group relative block w-full text-left px-6 py-5 text-white font-bold text-xl rounded-2xl transition-all duration-300 touch-manipulation overflow-hidden"
                      initial={{ x: -30, opacity: 0 }}
                      animate={{ x: 0, opacity: 1 }}
                      transition={{ duration: 0.4, delay: 0.15 + index * 0.08 }}
                      whileHover={{ 
                        scale: 1.02,
                        backgroundColor: 'rgba(255, 255, 255, 0.15)'
                      }}
                      whileTap={{ 
                        scale: 0.98,
                        backgroundColor: 'rgba(255, 255, 255, 0.25)'
                      }}
                    >
                      {/* Background hover effect */}
                      <motion.div
                        className="absolute inset-0 bg-gradient-to-r from-white/10 to-white/5 opacity-0 group-hover:opacity-100"
                        initial={{ x: '-100%' }}
                        whileHover={{ x: 0 }}
                        transition={{ duration: 0.3 }}
                      />
                      
                      {/* Text content */}
                      <motion.span
                        className="relative z-10 flex items-center justify-between"
                        whileHover={{ x: 8 }}
                        transition={{ duration: 0.2 }}
                      >
                        {item.label}
                        <motion.div
                          className="w-2 h-2 rounded-full bg-white/60 opacity-0 group-hover:opacity-100"
                          initial={{ scale: 0 }}
                          whileHover={{ scale: 1 }}
                          transition={{ duration: 0.2, delay: 0.1 }}
                        />
                      </motion.span>
                    </motion.button>
                  ))}
                  
                  {/* Bottom decoration */}
                  <motion.div
                    className="mt-6 pt-4 border-t border-white/20 text-center"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.4, delay: 0.5 }}
                  >
                    <motion.div
                      className="inline-flex items-center gap-2 text-white/60 text-sm font-medium"
                      whileHover={{ scale: 1.05, color: 'rgba(255,255,255,0.8)' }}
                    >
                      <motion.div
                        className="w-8 h-0.5 bg-white/40 rounded-full"
                        animate={{ scaleX: [1, 1.2, 1] }}
                        transition={{ duration: 2, repeat: Infinity }}
                      />
                      <span>Бачо Илия</span>
                      <motion.div
                        className="w-8 h-0.5 bg-white/40 rounded-full"
                        animate={{ scaleX: [1, 1.2, 1] }}
                        transition={{ duration: 2, repeat: Infinity, delay: 1 }}
                      />
                    </motion.div>
                  </motion.div>
                </motion.div>
              </motion.div>
            </>
          )}
        </AnimatePresence>
      </div>
    </motion.header>
  );
}