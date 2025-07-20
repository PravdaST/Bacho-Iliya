"use client";

import { Shield, Heart, Star } from "lucide-react";

export default function AboutSection() {
  return (
    <section className="py-20 bg-natural-white" id="about">
      <div className="container mx-auto px-4 max-w-6xl">
        <div className="text-center mb-16">
          <h2 className="font-playfair text-4xl md:text-5xl font-bold text-warm-brown mb-6">
            Нашият арсенал за истински вкус
          </h2>
          <p className="text-xl text-warm-stone max-w-3xl mx-auto">
            Въоръжени с традиция, опит и безкомпромисно качество, ние защитаваме автентичността в всеки продукт.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          <div className="text-center p-8 bg-cream rounded-2xl shadow-lg hover:shadow-xl transition-shadow heritage-pattern">
            <div className="w-16 h-16 bg-warm-brown rounded-full flex items-center justify-center mx-auto mb-4">
              <Shield size={32} className="text-cream" />
            </div>
            <h3 className="font-playfair text-2xl font-bold text-warm-brown mb-4">
              Защитници на традицията
            </h3>
            <p className="text-warm-stone">
              Пазим вековните рецепти и методи на производство, предавани от поколение на поколение български майстори.
            </p>
          </div>

          <div className="text-center p-8 bg-cream rounded-2xl shadow-lg hover:shadow-xl transition-shadow heritage-pattern">
            <div className="w-16 h-16 bg-tradition-red rounded-full flex items-center justify-center mx-auto mb-4">
              <Heart size={32} className="text-natural-white" />
            </div>
            <h3 className="font-playfair text-2xl font-bold text-warm-brown mb-4">
              Страст към качеството
            </h3>
            <p className="text-warm-stone">
              Всеки продукт е създаден с любов и внимание към детайла, за да донесе истинския български вкус на вашата трапеза.
            </p>
          </div>

          <div className="text-center p-8 bg-cream rounded-2xl shadow-lg hover:shadow-xl transition-shadow heritage-pattern">
            <div className="w-16 h-16 bg-harvest-gold rounded-full flex items-center justify-center mx-auto mb-4">
              <Star size={32} className="text-warm-brown" />
            </div>
            <h3 className="font-playfair text-2xl font-bold text-warm-brown mb-4">
              Превъзходство във вкуса
            </h3>
            <p className="text-warm-stone">
              Стремим се към съвършенство в всеки аспект - от избора на суровини до финалната презентация.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}