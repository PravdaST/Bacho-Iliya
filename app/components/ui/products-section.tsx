"use client";

import { Award, Leaf, Truck } from "lucide-react";

export default function ProductsSection() {
  const products = [
    {
      name: "Кисело мляко 'Бачо Илия'",
      description: "Традиционно българско кисело мляко, приготвено по автентична рецепта",
      features: ["100% естествено", "Без консерванти", "Богато на пробиотици"],
      icon: Award
    },
    {
      name: "Планинско сирене",
      description: "Прясно сирене от овче и краве мляко от планински пасища",
      features: ["Планински произход", "Ръчно приготвено", "Уникален вкус"],
      icon: Leaf
    },
    {
      name: "Домашно масло",
      description: "Истинско домашно масло, взбито по традиционен начин",
      features: ["Висока млечна мазнина", "Златист цвят", "Натурален аромат"],
      icon: Truck
    }
  ];

  return (
    <section className="py-20 bg-natural-white" id="products">
      <div className="container mx-auto px-4 max-w-6xl">
        <div className="text-center mb-16">
          <h2 className="font-playfair text-4xl md:text-5xl font-bold text-warm-brown mb-6">
            Нашето оръжие срещу фалшивия вкус
          </h2>
          <p className="text-xl text-warm-stone max-w-3xl mx-auto">
            Всеки продукт е грижливо създаден, за да носи автентичността на българската традиция.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {products.map((product, index) => {
            const Icon = product.icon;
            return (
              <div key={index} className="bg-cream rounded-2xl shadow-lg hover:shadow-xl transition-shadow p-8 form-field heritage-pattern">
                <div className="w-16 h-16 bg-warm-brown rounded-full flex items-center justify-center mx-auto mb-6">
                  <Icon size={32} className="text-cream" />
                </div>
                
                <h3 className="font-playfair text-2xl font-bold text-warm-brown mb-4 text-center">
                  {product.name}
                </h3>
                
                <p className="text-warm-stone mb-6 text-center">
                  {product.description}
                </p>
                
                <ul className="space-y-2">
                  {product.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-center text-warm-stone">
                      <div className="w-2 h-2 bg-tradition-red rounded-full mr-3"></div>
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}