'use client';

import { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [mouseX, setMouseX] = useState(0);
  const [isHoveringNav, setIsHoveringNav] = useState(false);
  const [centerX, setCenterX] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const updateCenter = () => {
      setCenterX(window.innerWidth / 2);
    };
    updateCenter();
    window.addEventListener('resize', updateCenter);
    return () => window.removeEventListener('resize', updateCenter);
  }, []);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden';
      document.body.style.paddingRight = `${window.innerWidth - document.documentElement.clientWidth}px`;
    } else {
      document.body.style.overflow = '';
      document.body.style.paddingRight = '';
    }
    return () => {
      document.body.style.overflow = '';
      document.body.style.paddingRight = '';
    };
  }, [isMenuOpen]);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setIsMenuOpen(false);
    }
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    // Използвай clientX директно за точна позиция на курсора
    setMouseX(e.clientX);
  };

  const navItems = [
    { type: 'link', href: '/products', label: 'ПРОДУКТИ' },
    { type: 'link', href: '/recipes', label: 'РЕЦЕПТИ' },
    { type: 'link', href: '/where-to-buy', label: 'МАГАЗИНИ' },
    { type: 'link', href: '/blog', label: 'БЛОГ' },
    { type: 'link', href: '/my-tickets', label: '🎟️ МОИТЕ БИЛЕТИ', highlight: true },
    { type: 'link', href: '/#giveaway', label: 'РАЗДАВАНЕ' },
  ];

  return (
    <motion.header
      className={`fixed top-0 right-0 left-0 z-50 border-b backdrop-blur-sm transition-all duration-500 ${
        scrolled ? 'border-dark-walnut/20 shadow-lg' : 'border-dark-walnut/10 shadow-md'
      }`}
      style={{
        backgroundColor: scrolled ? '#F5E6D3' : 'rgba(245, 230, 211, 0.98)',
      }}
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: 'easeOut' }}
    >
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Desktop Navigation - Stonyfield Style: Split with Logo in Center */}
        <div
          className="hidden items-center justify-between pt-8 pb-8 lg:flex"
          onMouseMove={handleMouseMove}
          onMouseEnter={() => setIsHoveringNav(true)}
          onMouseLeave={() => setIsHoveringNav(false)}
        >
          {/* Left Navigation */}
          <nav className="flex items-center space-x-6">
            {navItems.slice(0, 3).map((item, index) =>
              item.type === 'link' ? (
                <Link key={item.href} href={item.href!}>
                  <motion.div
                    className="text-dark-walnut hover:text-heritage-red font-heading group relative inline-flex cursor-pointer items-center justify-center px-4 py-3 text-sm font-bold tracking-wider uppercase"
                    initial={{ y: -20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ duration: 0.5, delay: 0.3 + index * 0.1 }}
                    whileHover={{ y: -4 }}
                  >
                    {item.label}
                    <motion.div className="bg-heritage-red absolute -bottom-1 left-0 h-0.5 w-0 transition-all duration-300 group-hover:w-full" />
                  </motion.div>
                </Link>
              ) : (
                <motion.button
                  key={item.label}
                  onClick={() => scrollToSection((item as any).id)}
                  className="text-dark-walnut hover:text-heritage-red font-heading group relative inline-flex items-center justify-center px-4 py-3 text-sm font-bold tracking-wider uppercase"
                  initial={{ y: -20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ duration: 0.5, delay: 0.3 + index * 0.1 }}
                  whileHover={{ y: -4 }}
                >
                  {item.label}
                  <motion.div className="bg-heritage-red absolute -bottom-1 left-0 h-0.5 w-0 transition-all duration-300 group-hover:w-full" />
                </motion.button>
              )
            )}
          </nav>

          {/* Centered Logo */}
          <motion.div
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 transform"
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <Link href="/">
              <motion.div
                className="relative h-12 w-auto cursor-pointer"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Image
                  src="/logo.png"
                  alt="Бачо Илия"
                  width={140}
                  height={48}
                  className="h-full w-auto object-contain"
                  priority
                  unoptimized
                  quality={100}
                />
              </motion.div>
            </Link>
          </motion.div>

          {/* Right Navigation */}
          <nav className="flex items-center space-x-6">
            {navItems.slice(3).map((item, index) =>
              item.type === 'link' ? (
                <Link key={item.href} href={item.href!}>
                  <motion.div
                    className="text-dark-walnut hover:text-heritage-red font-heading group relative inline-flex cursor-pointer items-center justify-center px-4 py-3 text-sm font-bold tracking-wider uppercase"
                    initial={{ y: -20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ duration: 0.5, delay: 0.6 + index * 0.1 }}
                    whileHover={{ y: -4 }}
                  >
                    {item.label}
                    <motion.div className="bg-heritage-red absolute -bottom-1 left-0 h-0.5 w-0 transition-all duration-300 group-hover:w-full" />
                  </motion.div>
                </Link>
              ) : (
                <motion.button
                  key={item.label}
                  onClick={() => scrollToSection((item as any).id)}
                  className="text-dark-walnut hover:text-heritage-red font-heading group relative inline-flex items-center justify-center px-4 py-3 text-sm font-bold tracking-wider uppercase"
                  initial={{ y: -20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ duration: 0.5, delay: 0.6 + index * 0.1 }}
                  whileHover={{ y: -4 }}
                >
                  {item.label}
                  <motion.div className="bg-heritage-red absolute -bottom-1 left-0 h-0.5 w-0 transition-all duration-300 group-hover:w-full" />
                </motion.button>
              )
            )}
          </nav>
        </div>

        {/* Mobile Header */}
        <div className="flex items-center justify-between py-4 lg:hidden">
          {/* Logo */}
          <motion.div
            className="flex-shrink-0"
            initial={{ x: -50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <Link href="/">
              <motion.div
                className="relative h-8 w-auto cursor-pointer sm:h-10"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Image
                  src="/logo.png"
                  alt="Бачо Илия"
                  width={120}
                  height={40}
                  className="h-full w-auto object-contain"
                  priority
                  unoptimized
                  quality={100}
                />
              </motion.div>
            </Link>
          </motion.div>

          {/* Mobile menu button - Heritage Style */}
          <motion.div
            className="lg:hidden"
            initial={{ x: 50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <motion.button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-dark-walnut relative touch-manipulation p-3"
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

        {/* Mobile Navigation - Heritage Style */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              className="lg:hidden"
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              <motion.div
                className="border-dark-walnut/20 relative space-y-2 border-t px-4 pt-4 pb-6"
                style={{
                  backgroundColor: 'rgba(245, 230, 211, 0.98)',
                }}
                initial={{ y: -20 }}
                animate={{ y: 0 }}
                transition={{ duration: 0.3, delay: 0.1 }}
              >
                {navItems.map((item, index) =>
                  item.type === 'link' ? (
                    <Link key={item.href} href={item.href!}>
                      <motion.div
                        className="text-dark-walnut hover:text-heritage-red font-heading hover:border-heritage-red/20 relative z-10 block w-full touch-manipulation border-2 border-transparent px-4 py-4 text-left text-base font-bold tracking-wider uppercase transition-all duration-200"
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
                      className="text-dark-walnut hover:text-heritage-red font-heading hover:border-heritage-red/20 relative z-10 block w-full touch-manipulation border-2 border-transparent px-4 py-4 text-left text-base font-bold tracking-wider uppercase transition-all duration-200"
                      initial={{ x: -20, opacity: 0 }}
                      animate={{ x: 0, opacity: 1 }}
                      transition={{ duration: 0.3, delay: 0.1 + index * 0.05 }}
                      whileHover={{ x: 5 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      {item.label}
                    </motion.button>
                  )
                )}
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* SVG Bump Effect - Follows Mouse */}
      <motion.svg
        className="pointer-events-none absolute bottom-0 hidden translate-y-full transform lg:block"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 400 20"
        width="400"
        height="20"
        fill={scrolled ? '#F5E6D3' : 'rgba(245, 230, 211, 0.98)'}
        style={{
          filter: 'drop-shadow(rgba(58, 42, 26, 0.15) 0px 6px 3px) drop-shadow(rgba(58, 42, 26, 0.1) 0px 0px)'
        }}
        animate={{
          left: isHoveringNav ? mouseX - 200 : centerX - 200,
        }}
        transition={{
          type: 'spring',
          stiffness: 300,
          damping: 30,
        }}
      >
        <path
          d="M100 0 C160 0 160 18 200 18 C240 18 240 0 300 0 Z"
          transform="scale(2,1) translate(-100,0)"
        />
      </motion.svg>
    </motion.header>
  );
}
