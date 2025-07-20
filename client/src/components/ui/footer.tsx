import { Facebook, Instagram, Youtube, Mail } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-warm-brown text-cream py-12">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-3 gap-8">
          <div>
            <div className="flex items-center space-x-2 mb-4">
              <span className="font-playfair font-bold text-2xl">Бачо Илия</span>
            </div>
            <p className="text-cream/80">
              Движението за истински вкус. Без компромиси.
            </p>
          </div>
          
          <div>
            <h4 className="font-semibold mb-4">Контакт</h4>
            <p className="text-cream/80 mb-2 flex items-center gap-2">
              <Mail size={16} />
              kauza@bachoiliya.bg
            </p>
          </div>
          
          <div>
            <h4 className="font-semibold mb-4">Последвай движението</h4>
            <div className="flex space-x-4">
              <a href="#" className="text-cream/80 hover:text-soft-beige transition-colors">
                <Facebook size={24} />
              </a>
              <a href="#" className="text-cream/80 hover:text-soft-beige transition-colors">
                <Instagram size={24} />
              </a>
              <a href="#" className="text-cream/80 hover:text-soft-beige transition-colors">
                <Youtube size={24} />
              </a>
            </div>
          </div>
        </div>
        
        <div className="border-t border-warm-brown/40 mt-8 pt-8 text-center text-cream/70">
          <p>© 2025 Бачо Илия. Всички права запазени. Движението тепърва започва.</p>
        </div>
      </div>
    </footer>
  );
}
