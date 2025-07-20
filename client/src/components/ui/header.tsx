import { useState } from "react";
import { Menu, X } from "lucide-react";

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setIsMenuOpen(false);
    }
  };

  return (
    <header className="bg-warm-brown/95 backdrop-blur-sm border-b border-warm-brown/30 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          {/* Logo */}
          <div className="flex-shrink-0">
            <h1 className="text-3xl font-bold text-cream font-playfair">Бачо Илия</h1>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-8">
            <button 
              onClick={() => scrollToSection('about')}
              className="text-cream hover:text-warm-beige font-semibold transition-colors text-lg"
            >
              ЗА НАС
            </button>
            <button 
              onClick={() => scrollToSection('recipes')}
              className="text-cream hover:text-warm-beige font-semibold transition-colors text-lg"
            >
              РЕЦЕПТИ
            </button>
            <button 
              onClick={() => scrollToSection('products')}
              className="text-cream hover:text-warm-beige font-semibold transition-colors text-lg"
            >
              ПРОДУКТИ
            </button>
          </nav>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-cream"
            >
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-warm-brown/90 border-t border-warm-brown/30">
              <button
                onClick={() => scrollToSection('about')}
                className="block px-3 py-2 text-cream hover:text-warm-beige font-semibold"
              >
                ЗА НАС
              </button>
              <button
                onClick={() => scrollToSection('recipes')}
                className="block px-3 py-2 text-cream hover:text-warm-beige font-semibold"
              >
                РЕЦЕПТИ
              </button>
              <button
                onClick={() => scrollToSection('products')}
                className="block px-3 py-2 text-cream hover:text-warm-beige font-semibold"
              >
                ПРОДУКТИ
              </button>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
