import { ArrowRight, ChefHat } from "lucide-react";
import { motion } from "framer-motion";
import { useScrollAnimation, fadeInVariants, staggerContainer } from "@/hooks/use-scroll-animation";

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
  const { ref, isInView } = useScrollAnimation(0.2);

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
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8"
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
                  <motion.img 
                    src={recipe.image} 
                    alt={recipe.title} 
                    className="w-full h-48 object-cover transition-transform duration-500 group-hover:scale-110"
                    whileHover={{ scale: 1.1 }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-warm-brown/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
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
    </motion.section>
  );
}
