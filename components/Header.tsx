
'use client'

import Image from 'next/image'
import { useState } from 'react'
import { Menu, X } from 'lucide-react'

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <header className="bg-traditional-red text-white shadow-lg">
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
            <a href="#about" className="text-white hover:text-gray-200 transition-colors font-semibold">
              ЗА НАС
            </a>
            <a href="#recipes" className="text-white hover:text-gray-200 transition-colors font-semibold">
              РЕЦЕПТИ
            </a>
            <a href="#products" className="text-white hover:text-gray-200 transition-colors font-semibold">
              ПРОДУКТИ
            </a>
          </nav>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-white hover:text-gray-200"
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 bg-traditional-red border-t border-red-800">
              <a href="#about" className="block px-3 py-2 text-white hover:text-gray-200 font-semibold">
                ЗА НАС
              </a>
              <a href="#recipes" className="block px-3 py-2 text-white hover:text-gray-200 font-semibold">
                РЕЦЕПТИ
              </a>
              <a href="#products" className="block px-3 py-2 text-white hover:text-gray-200 font-semibold">
                ПРОДУКТИ
              </a>
            </div>
          </div>
        )}
      </div>
    </header>
  )
}
