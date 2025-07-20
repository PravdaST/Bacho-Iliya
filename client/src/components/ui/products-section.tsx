const products = [
  {
    id: 1,
    name: 'Сирене "Бачо Илия"',
    description: "Истинският вкус. Без компромис.",
    features: ["100% мляко", "Без добавки", "Традиционна рецепта"],
    image: "https://images.unsplash.com/photo-1486297678162-eb2a19b0a32d?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&h=300"
  },
  {
    id: 2,
    name: 'Кашкавал "Бачо Илия"',
    description: "Силата на традицията.",
    features: ["Зреене минимум 60 дни", "Естествен цвят", "Богат вкус"],
    image: "https://images.unsplash.com/photo-1552767059-ce182ead6c1b?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&h=300"
  },
  {
    id: 3,
    name: 'Кисело мляко "Бачо Илия"',
    description: "Чиста енергия. Без добавки.",
    features: ["Lactobacillus bulgaricus", "Натурална закваска", "Пълномаслено"],
    image: "https://images.unsplash.com/photo-1563636619-e9143da7973b?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&h=300"
  }
];

export default function ProductsSection() {
  return (
    <section className="py-20 bg-cream" id="produkti">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="font-playfair text-4xl md:text-5xl font-bold text-forest mb-6">
            СИЛАТА НА ИСТИНСКОТО
          </h2>
          <p className="text-xl text-warm-gray max-w-2xl mx-auto">
            Истинският вкус се постига с истински продукти.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {products.map((product) => (
            <div key={product.id} className="bg-white rounded-2xl p-8 text-center shadow-lg hover:shadow-xl transition-shadow">
              <img 
                src={product.image} 
                alt={product.name} 
                className="w-32 h-32 object-cover rounded-xl mx-auto mb-6"
              />
              <h3 className="font-playfair text-2xl font-bold text-forest mb-4">
                {product.name}
              </h3>
              <p className="text-warm-gray mb-6">
                {product.description}
              </p>
              <div className="space-y-2 text-sm text-warm-gray/80">
                {product.features.map((feature, index) => (
                  <p key={index}>✓ {feature}</p>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
