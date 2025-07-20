import { ArrowRight } from "lucide-react";

const recipes = [
  {
    id: 1,
    title: "Истинска баница",
    description: "С истинско сирене Бачо Илия и домашно тесто.",
    image: "https://images.unsplash.com/photo-1571091718767-18b5b1457add?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300"
  },
  {
    id: 2,
    title: "Шопска салата",
    description: "Класиката с натурено сирене от истинско мляко.",
    image: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300"
  },
  {
    id: 3,
    title: "Таратор",
    description: "Освежаващ с кисело мляко Бачо Илия.",
    image: "https://images.unsplash.com/photo-1547592166-23ac45744acd?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300"
  }
];

export default function RecipesSection() {
  return (
    <section className="py-20 bg-natural-white" id="recipes">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="font-playfair text-4xl md:text-5xl font-bold text-warm-brown mb-6">
            РЕЦЕПТИ ЗА ПОБЕДА
          </h2>
          <p className="text-xl text-warm-stone max-w-2xl mx-auto">
            Всяка рецепта е победа. Вдъхнови се за следващата си битка в кухнята.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {recipes.map((recipe) => (
            <div key={recipe.id} className="bg-natural-cream rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow">
              <img 
                src={recipe.image} 
                alt={recipe.title} 
                className="w-full h-48 object-cover"
              />
              <div className="p-6">
                <h3 className="font-playfair text-xl font-bold text-warm-brown mb-3">
                  {recipe.title}
                </h3>
                <p className="text-warm-stone mb-4">
                  {recipe.description}
                </p>
                <button className="text-tradition-red font-semibold hover:underline flex items-center gap-2">
                  Виж рецептата <ArrowRight size={16} />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
