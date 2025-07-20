import { ArrowRight, ChefHat, X, Clock, Users } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { useScrollAnimation, fadeInVariants, staggerContainer } from "@/hooks/use-scroll-animation";

const recipes = [
  {
    id: 1,
    title: "Истинска баница",
    description: "С истинско сирене Бачо Илия и домашно тесто.",
    image: "/banica.webp",
    prepTime: "30 мин",
    servings: "6 порции",
    fullRecipe: {
      ingredients: [
        "500г готови кори за баница",
        "400г сирене Бачо Илия",
        "4 яйца",
        "200мл кисело мляко Бачо Илия", 
        "100мл слънчогледово олио",
        "сол на вкус"
      ],
      instructions: [
        "Сиренето се разчупва на малки парчета.",
        "В купа се разбиват яйцата с киселото мляко и олиото.",
        "Добавя се сиренето и се разбърква.",
        "Корите се намазват една по една със сместа.",
        "Навиват се и се нареждат в тава.",
        "Пече се на 180°C за 45 минути до златист цвят."
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
        "1 лук", 
        "150г сирене Бачо Илия",
        "маслини",
        "олио, оцет, сол"
      ],
      instructions: [
        "Доматите се нарязват на кубчета.",
        "Краставиците се белят и нарязват.",
        "Чушките се почистват от семената и нарязват.",
        "Лукът се нарязва на тънки колелца.",
        "Всичко се смесва в салатник.",
        "Поръсва се с натурено сирене Бачо Илия.",
        "Заливаме с олио, оцет и сол на вкус."
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
        "3-4 скилидки чесън",
        "2 супени лъжици олио",
        "орехи, копър, сол"
      ],
      instructions: [
        "Краставиците се белят и нарязват на дребни кубчета.",
        "Чесънът се смачква със сол.",
        "Киселото мляко се разбърква с вода до желаната консистенция.",
        "Добавят се краставиците и чесънът.",
        "Слага се нарязан копър и счукани орехи.",
        "Поливаме с олио и оставяме в хладилника.",
        "Сервира се студен."
      ]
    }
  },
  {
    id: 4,
    title: "Качамак с кашкавал",
    description: "Традиционен качамак с кашкавал Бачо Илия.",
    image: "/kachamak.webp",
    prepTime: "25 мин",
    servings: "4 порции",
    fullRecipe: {
      ingredients: [
        "200г царевична каша",
        "1л вода",
        "200г кашкавал Бачо Илия",
        "100г масло",
        "сол на вкус"
      ],
      instructions: [
        "Водата се довежда до кипене със сол.",
        "Постепенно се добавя кашата, като се бърка.",
        "Готви се на тих огън 15-20 минути.",
        "Добавя се маслото и се бърка.",
        "Кашкавалът се настъргва и се добавя.",
        "Бърка се докато се стопи кашкавалът.",
        "Сервира се горещ."
      ]
    }
  },
  {
    id: 5,
    title: "Сирене по шопски",
    description: "Печено сирене със зеленчуци и продукти Бачо Илия.",
    image: "/sirene-po-shopski.webp",
    prepTime: "35 мин",
    servings: "2 порции",
    fullRecipe: {
      ingredients: [
        "400г сирене Бачо Илия",
        "2 домата",
        "1 чушка",
        "1 яйце",
        "50мл мляко Бачо Илия",
        "магданоз, черен пипер"
      ],
      instructions: [
        "Сиренето се нарязва на дебели филии.",
        "Доматите и чушките се нарязват на кръгове.",
        "В тенджера се нареждат слоеве зеленчуци и сирене.",
        "Яйцето се разбива с млякото.",
        "Поливаме със сместа и посипваме с подправки.",
        "Пече се на 200°C за 25-30 минути.",
        "Сервира се топло с магданоз."
      ]
    }
  },
  {
    id: 6,
    title: "Мляко с ориз",
    description: "Кремообразен десерт с прясно мляко Бачо Илия.",
    image: "/mlqko-s-oriz.webp",
    prepTime: "40 мин",
    servings: "4 порции",
    fullRecipe: {
      ingredients: [
        "1л прясно мляко Бачо Илия",
        "100г ориз",
        "80г захар",
        "1 пръчка ванилия",
        "канела на прах"
      ],
      instructions: [
        "Оризът се измива и слага в мляко да кипи.",
        "Добавя се захар и ванилия.",
        "Готви се на тих огън 30-35 минути.",
        "Бърка се редовно да не се залепи.",
        "Когато е готов, се оставя да се охлади.",
        "Сервира се в чинийки.",
        "Посипва се с канела отгоре."
      ]
    }
  },
  {
    id: 7,
    title: "Кисело зеле с кашкавал",
    description: "Зимна традиция с кашкавал Бачо Илия.",
    image: "/kiselozele.webp",
    prepTime: "45 мин",
    servings: "6 порции",
    fullRecipe: {
      ingredients: [
        "1кг кисело зеле",
        "200г кашкавал Бачо Илия",
        "300г свинско месо",
        "1 лук",
        "червен пипер, лавров лист"
      ],
      instructions: [
        "Месото се нарязва на кубчета и запържва.",
        "Лукът се нарязва и се добавя към месото.",
        "Киселото зеле се почиства и се добавя.",
        "Слагат се подправки и вода да покрие.",
        "Задушава се 30-40 минути.",
        "Кашкавалът се настъргва отгоре.",
        "Сервира се горещо."
      ]
    }
  },
  {
    id: 8,
    title: "Гювеч със сирене",
    description: "Празнично ястие с всички продукти Бачо Илия.",
    image: "/guvech.webp",
    prepTime: "60 мин",
    servings: "6 порции",
    fullRecipe: {
      ingredients: [
        "300г сирене Бачо Илия",
        "200г кашкавал Бачо Илия",
        "4 яйца",
        "200мл мляко Бачо Илия",
        "картофи, моркови, грах"
      ],
      instructions: [
        "Зеленчуците се нарязват на кубчета.",
        "В гювеча се нареждат слоеве зеленчуци.",
        "Сиренето се разчупва и се добавя.",
        "Яйцата се разбиват с млякото.",
        "Поливаме със сместа.",
        "Печем в пещ на 180°C за 50-60 минути.",
        "Посипваме с настърган кашкавал и довършваме."
      ]
    }
  }
];

export default function RecipesSection() {
  const { ref, isInView } = useScrollAnimation(0.2);
  const [selectedRecipe, setSelectedRecipe] = useState<typeof recipes[0] | null>(null);

  return (
    <motion.section 
      ref={ref}
      className="py-12 sm:py-16 lg:py-20 bg-gradient-to-br from-white via-cream/50 to-white relative px-4 sm:px-6 lg:px-8" 
      id="recipes"
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      variants={staggerContainer}
    >
      <div className="container mx-auto">
        <motion.div 
          className="text-center mb-10 sm:mb-12 lg:mb-16"
          variants={fadeInVariants}
        >
          <motion.div
            className="flex items-center justify-center gap-4 mb-6"
            initial={{ scale: 0, rotate: -180 }}
            animate={isInView ? { scale: 1, rotate: 0 } : { scale: 0, rotate: -180 }}
            transition={{ delay: 0.2, duration: 0.8 }}
          >
            <ChefHat size={48} className="text-warm-brown" />
          </motion.div>
          <motion.h2 
            className="font-playfair text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-bold text-warm-brown mb-4 sm:mb-6"
            variants={fadeInVariants}
          >
            РЕЦЕПТИ ЗА ПОБЕДА
          </motion.h2>
          <motion.p 
            className="text-base sm:text-lg lg:text-xl text-gray-700 max-w-3xl mx-auto px-4"
            variants={fadeInVariants}
          >
            Всяка рецепта е победа. Вдъхнови се за следващата си битка в кухнята.
          </motion.p>
        </motion.div>

        <motion.div 
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 sm:gap-8"
          variants={staggerContainer}
        >
          {recipes.map((recipe, index) => (
            <motion.div 
              key={recipe.id} 
              className="group"
              variants={fadeInVariants}
              whileHover={{ y: -10 }}
              transition={{ duration: 0.3 }}
            >
              <div className="bg-white/80 backdrop-blur-sm rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 border border-warm-beige/20">
                <div className="relative overflow-hidden">
                  <img 
                    src={recipe.image} 
                    alt={recipe.title} 
                    className="w-full h-48 object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </div>
                <div className="p-6">
                  <motion.h3 
                    className="font-playfair text-xl font-bold text-warm-brown mb-3"
                    whileHover={{ x: 5 }}
                  >
                    {recipe.title}
                  </motion.h3>
                  <motion.p 
                    className="text-gray-700 mb-4"
                    initial={{ opacity: 0.7 }}
                    whileHover={{ opacity: 1 }}
                  >
                    {recipe.description}
                  </motion.p>
                  <motion.button 
                    className="text-traditional-red font-semibold hover:text-warm-brown flex items-center gap-2 transition-colors duration-300"
                    whileHover={{ x: 5 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setSelectedRecipe(recipe)}
                  >
                    Виж рецептата 
                    <motion.div
                      animate={{ x: [0, 5, 0] }}
                      transition={{ duration: 1.5, repeat: Infinity }}
                    >
                      <ArrowRight size={16} />
                    </motion.div>
                  </motion.button>
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
              {/* Header */}
              <div className="relative">
                <img 
                  src={selectedRecipe.image} 
                  alt={selectedRecipe.title}
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

              {/* Content */}
              <div className="p-6 space-y-6">
                <p className="text-gray-700 text-lg">{selectedRecipe.description}</p>
                
                {/* Ingredients */}
                <div>
                  <h4 className="font-playfair text-xl font-bold text-warm-brown mb-4">
                    Продукти:
                  </h4>
                  <ul className="space-y-2">
                    {selectedRecipe.fullRecipe.ingredients.map((ingredient, index) => (
                      <motion.li
                        key={index}
                        className="flex items-center gap-3 text-gray-700"
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1 }}
                      >
                        <div className="w-2 h-2 bg-traditional-red rounded-full"></div>
                        {ingredient}
                      </motion.li>
                    ))}
                  </ul>
                </div>

                {/* Instructions */}
                <div>
                  <h4 className="font-playfair text-xl font-bold text-warm-brown mb-4">
                    Приготвяне:
                  </h4>
                  <ol className="space-y-3">
                    {selectedRecipe.fullRecipe.instructions.map((instruction, index) => (
                      <motion.li
                        key={index}
                        className="flex gap-4 text-gray-700"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 }}
                      >
                        <span className="flex-shrink-0 w-8 h-8 bg-traditional-red text-white rounded-full flex items-center justify-center text-sm font-semibold">
                          {index + 1}
                        </span>
                        <span className="pt-1">{instruction}</span>
                      </motion.li>
                    ))}
                  </ol>
                </div>

                {/* CTA */}
                <div className="pt-4 border-t border-gray-200">
                  <p className="text-center text-gray-600 mb-4">
                    Използвайте продукти "Бачо Илия" за истински вкус!
                  </p>
                  <motion.button
                    className="w-full bg-traditional-red text-white font-semibold py-3 px-6 rounded-xl hover:bg-traditional-red/90 transition-colors duration-300"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => setSelectedRecipe(null)}
                  >
                    Затвори рецептата
                  </motion.button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.section>
  );
}
