
'use client'

import Image from 'next/image'
import { useState } from 'react'
import { Menu, X } from 'lucide-react'

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-sm border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Image
              src="/logo.png"
              alt="Бачо Илия"
              width={120}
              height={40}
              className="h-10 w-auto"
              priority
            />
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-8">
            <a href="#about" className="text-gray-700 hover:text-traditional-red transition-colors">
              ЗА НАС
            </a>
            <a href="#recipes" className="text-gray-700 hover:text-traditional-red transition-colors">
              РЕЦЕПТИ
            </a>
            <a href="#products" className="text-gray-700 hover:text-traditional-red transition-colors">
              ПРОДУКТИ
            </a>
          </nav>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-gray-700 hover:text-traditional-red"
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 bg-white border-t">
              <a href="#about" className="block px-3 py-2 text-gray-700 hover:text-traditional-red">
                ЗА НАС
              </a>
              <a href="#recipes" className="block px-3 py-2 text-gray-700 hover:text-traditional-red">
                РЕЦЕПТИ
              </a>
              <a href="#products" className="block px-3 py-2 text-gray-700 hover:text-traditional-red">
                ПРОДУКТИ
              </a>
            </div>
          </div>
        )}
      </div>
    </header>
  )
}
