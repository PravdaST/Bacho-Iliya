"use client";

import { Clock, Users, ChefHat } from "lucide-react";

export default function RecipesSection() {
  const recipes = [
    {
      title: "Традиционно българско кисело мляко",
      description: "Автентична рецепта за приготвяне на истинско българско кисело мляко у дома",
      time: "24 часа",
      servings: "4-6 порции",
      difficulty: "Лесно"
    },
    {
      title: "Домашно сирене от овче мляко",
      description: "Класическа рецепта за прясно сирене с неповторим вкус и аромат",
      time: "3 часа",
      servings: "8-10 порции",
      difficulty: "Средно"
    },
    {
      title: "Масло от краве мляко",
      description: "Традиционен начин за приготвяне на истинско домашно масло",
      time: "45 минути",
      servings: "500г продукт",
      difficulty: "Лесно"
    }
  ];

  return (
    <section className="py-20 bg-cream" id="recipes">
      <div className="container mx-auto px-4 max-w-6xl">
        <div className="text-center mb-16">
          <h2 className="font-playfair text-4xl md:text-5xl font-bold text-warm-brown mb-6">
            Тайните рецепти на революцията
          </h2>
          <p className="text-xl text-warm-stone max-w-3xl mx-auto">
            Открийте традиционните методи за създаване на автентични български млечни продукти.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {recipes.map((recipe, index) => (
            <div key={index} className="bg-natural-white rounded-2xl shadow-lg hover:shadow-xl transition-shadow p-6 form-field">
              <div className="mb-4">
                <ChefHat className="w-12 h-12 text-warm-brown mb-3" />
                <h3 className="font-playfair text-xl font-bold text-warm-brown mb-2">
                  {recipe.title}
                </h3>
                <p className="text-warm-stone mb-4">
                  {recipe.description}
                </p>
              </div>
              
              <div className="flex items-center justify-between text-sm text-warm-stone border-t border-warm-brown/10 pt-4">
                <div className="flex items-center">
                  <Clock className="w-4 h-4 mr-1" />
                  {recipe.time}
                </div>
                <div className="flex items-center">
                  <Users className="w-4 h-4 mr-1" />
                  {recipe.servings}
                </div>
              </div>
              
              <div className="mt-2 text-sm font-semibold text-tradition-red">
                Ниво: {recipe.difficulty}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}