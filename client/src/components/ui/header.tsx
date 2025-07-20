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
    <header className="fixed top-0 w-full z-50 bg-forest/95 backdrop-blur-sm border-b border-warm-brown/20">
      <nav className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 bg-traditional-red rounded-lg flex items-center justify-center shadow-lg">
              <span className="text-cream font-playfair font-bold text-lg">БИ</span>
            </div>
            <span className="text-cream font-playfair font-bold text-2xl tracking-wide">Бачо Илия</span>
          </div>
          
          {/* Desktop Navigation */}
          <div className="hidden md:flex space-x-8">
            <button 
              onClick={() => scrollToSection('za-nas')}
              className="text-cream hover:text-warm-beige transition-colors font-medium"
            >
              ЗА НАС
            </button>
            <button 
              onClick={() => scrollToSection('recepti')}
              className="text-cream hover:text-warm-beige transition-colors font-medium"
            >
              РЕЦЕПТИ
            </button>
            <button 
              onClick={() => scrollToSection('produkti')}
              className="text-cream hover:text-warm-beige transition-colors font-medium"
            >
              ПРОДУКТИ
            </button>
          </div>
          
          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button 
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-cream"
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
        
        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden mt-4 py-4 border-t border-warm-brown/20">
            <div className="flex flex-col space-y-4">
              <button 
                onClick={() => scrollToSection('za-nas')}
                className="text-cream hover:text-warm-beige transition-colors font-medium text-left"
              >
                ЗА НАС
              </button>
              <button 
                onClick={() => scrollToSection('recepti')}
                className="text-cream hover:text-warm-beige transition-colors font-medium text-left"
              >
                РЕЦЕПТИ
              </button>
              <button 
                onClick={() => scrollToSection('produkti')}
                className="text-cream hover:text-warm-beige transition-colors font-medium text-left"
              >
                ПРОДУКТИ
              </button>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
}
