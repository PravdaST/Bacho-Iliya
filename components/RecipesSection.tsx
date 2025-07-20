'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Clock, Users, ArrowRight, X } from 'lucide-react';
import Image from 'next/image';

const recipes = [
  {
    id: 1,
    title: "Истинска баница",
    description: "С истинско сирене Бачо Илия и домашно тесто.",
    image: "/banica.webp",
    prepTime: "45 мин",
    servings: "6 порции",
    fullRecipe: {
      ingredients: [
        "500г готови кори за баница",
        "400г сирене Бачо Илия",
        "4 броя яйца",
        "200мл прясно мляко Бачо Илия",
        "100мл олио",
        "1 ч.л. сол"
      ],
      instructions: [
        "Смесете сиренето Бачо Илия с яйцата",
        "Добавете млякото и олиото",
        "Намажете всяка кора с плънката",
        "Навийте корите на руло",
        "Печете в загрята фурна на 180°C за 30-35 минути"
      ]
    }
  },
  {
    id: 2,
    title: "Шопска салата",
    description: "Класиката с натурено сирене от истинско мляко.",
    image: "/shopska.webp",
    prepTime: "15 мин",
    servings: "4 порции",
    fullRecipe: {
      ingredients: [
        "4 домата",
        "2 краставици",
        "2 чушки",
        "1 глава лук",
        "200г сирене Бачо Илия",
        "Зехтин и оцет",
        "Магданоз"
      ],
      instructions: [
        "Нарежете зеленчуците на кубчета",
        "Смесете всички зеленчуци в купа",
        "Настъргайте сиренето Бачо Илия отгоре",
        "Поливайте със зехтин и оцет",
        "Поръсете с магданоз"
      ]
    }
  },
  {
    id: 3,
    title: "Таратор",
    description: "Освежаващ с кисело мляко Бачо Илия.",
    image: "/tarator.webp",
    prepTime: "10 мин",
    servings: "4 порции",
    fullRecipe: {
      ingredients: [
        "500мл кисело мляко Бачо Илия",
        "2 краставици",
        "3 скилидки чесън",
        "2 с.л. орехи",
        "2 с.л. олио",
        "Копър и сол"
      ],
      instructions: [
        "Обелете и настъргайте краставиците",
        "Смелете чесъна с орехите",
        "Смесете киселото мляко Бачо Илия с останалите продукти",
        "Добавете студена вода по желание",
        "Поръсете с копър"
      ]
    }
  }
];

export default function RecipesSection() {
  const [mounted, setMounted] = useState(false);
  const [selectedRecipe, setSelectedRecipe] = useState<typeof recipes[0] | null>(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <section id="recipes" className="py-20 lg:py-32 bg-gradient-to-br from-golden-yellow/10 to-warm-beige/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="h-96 bg-white/50 rounded-3xl animate-pulse"></div>
        </div>
      </section>
    );
  }

  return (
    <section id="recipes" className="py-20 lg:py-32 bg-gradient-to-br from-golden-yellow/10 to-warm-beige/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-playfair font-bold text-warm-brown mb-6">
            Рецепти за победа
          </h2>
          <p className="text-lg sm:text-xl text-gray-700 max-w-3xl mx-auto">
            Открийте магията на българската кухня с автентични рецепти, използващи продуктите на "Бачо Илия"
          </p>
        </motion.div>

        <motion.div
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8, staggerChildren: 0.2 }}
          viewport={{ once: true }}
        >
          {recipes.map((recipe, index) => (
            <motion.div
              key={recipe.id}
              className="group cursor-pointer"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              whileHover={{ y: -10 }}
            >
              <div className="bg-white/80 backdrop-blur-sm rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500">
                <div className="relative overflow-hidden">
                  <Image 
                    src={recipe.image} 
                    alt={recipe.title} 
                    width={400}
                    height={250}
                    className="w-full h-48 object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </div>
                <div className="p-6">
                  <h3 className="font-playfair text-xl font-bold text-warm-brown mb-3">
                    {recipe.title}
                  </h3>
                  <p className="text-gray-700 mb-4">
                    {recipe.description}
                  </p>
                  <button 
                    className="text-traditional-red font-semibold hover:text-warm-brown flex items-center gap-2 transition-colors duration-300"
                    onClick={() => setSelectedRecipe(recipe)}
                  >
                    Виж рецептата 
                    <ArrowRight size={16} />
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* Recipe Modal */}
      <AnimatePresence>
        {selectedRecipe && (
          <motion.div
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedRecipe(null)}
          >
            <motion.div
              className="bg-white rounded-3xl max-w-2xl w-full max-h-[90vh] overflow-y-auto"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="relative">
                <Image 
                  src={selectedRecipe.image} 
                  alt={selectedRecipe.title}
                  width={600}
                  height={300}
                  className="w-full h-64 object-cover rounded-t-3xl"
                />
                <button
                  onClick={() => setSelectedRecipe(null)}
                  className="absolute top-4 right-4 w-10 h-10 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white transition-colors duration-300"
                >
                  <X size={20} className="text-gray-700" />
                </button>
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-6">
                  <h3 className="font-playfair text-3xl font-bold text-white mb-2">
                    {selectedRecipe.title}
                  </h3>
                  <div className="flex items-center gap-6 text-white/90">
                    <div className="flex items-center gap-2">
                      <Clock size={16} />
                      <span className="text-sm">{selectedRecipe.prepTime}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Users size={16} />
                      <span className="text-sm">{selectedRecipe.servings}</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="p-6 space-y-6">
                <p className="text-gray-700 text-lg">{selectedRecipe.description}</p>
                
                <div>
                  <h4 className="font-playfair text-xl font-bold text-warm-brown mb-4">
                    Продукти:
                  </h4>
                  <ul className="space-y-2">
                    {selectedRecipe.fullRecipe.ingredients.map((ingredient, index) => (
                      <li key={index} className="flex items-center gap-3 text-gray-700">
                        <div className="w-2 h-2 bg-traditional-red rounded-full"></div>
                        {ingredient}
                      </li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h4 className="font-playfair text-xl font-bold text-warm-brown mb-4">
                    Приготвяне:
                  </h4>
                  <ol className="space-y-3">
                    {selectedRecipe.fullRecipe.instructions.map((instruction, index) => (
                      <li key={index} className="flex gap-4 text-gray-700">
                        <span className="flex-shrink-0 w-8 h-8 bg-traditional-red text-white rounded-full flex items-center justify-center text-sm font-semibold">
                          {index + 1}
                        </span>
                        <span className="pt-1">{instruction}</span>
                      </li>
                    ))}
                  </ol>
                </div>

                <div className="pt-4 border-t border-gray-200">
                  <p className="text-center text-gray-600 mb-4">
                    Използвайте продукти "Бачо Илия" за истински вкус!
                  </p>
                  <button
                    className="w-full bg-traditional-red text-white font-semibold py-3 px-6 rounded-xl hover:bg-traditional-red/90 transition-colors duration-300"
                    onClick={() => setSelectedRecipe(null)}
                  >
                    Затвори рецептата
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}