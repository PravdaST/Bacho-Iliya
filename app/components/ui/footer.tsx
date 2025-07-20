import { Heart } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-warm-brown text-natural-white py-12">
      <div className="container mx-auto px-4 max-w-6xl">
        <div className="text-center">
          <div className="mb-6">
            <h3 className="font-playfair text-2xl font-bold mb-2">Бачо Илия</h3>
            <p className="text-soft-beige">Революцията на истинския вкус</p>
          </div>
          
          <div className="border-t border-warm-brown/30 pt-6">
            <p className="flex items-center justify-center text-soft-beige">
              Създадено с <Heart className="w-4 h-4 mx-1 text-tradition-red" fill="currentColor" /> 
              за автентичния български вкус
            </p>
            <p className="text-sm text-soft-beige mt-2">
              © 2025 Бачо Илия. Всички права запазени.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}