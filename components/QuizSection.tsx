'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MapPin, Sword, Mail, Send, CheckCircle } from 'lucide-react';

export default function QuizSection() {
  const [mounted, setMounted] = useState(false);
  const [formData, setFormData] = useState({
    city: '',
    weapon: '',
    motivation: '',
    email: ''
  });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    setMounted(true);
  }, []);

  const cities = [
    'София', 'Пловдив', 'Варна', 'Бургас', 'Русе', 'Стара Загора', 
    'Плевен', 'Сливен', 'Добрич', 'Шумен', 'Перник', 'Хасково', 
    'Ямбол', 'Пазарджик', 'Благоевград', 'Велико Търново', 'Враца', 
    'Габрово', 'Асеновград', 'Видин', 'Казанлък', 'Кърджали', 
    'Кюстендил', 'Монтана', 'Димитровград', 'Търговище', 'Силистра', 
    'Ловech', 'Гоце Делчев', 'Дупница', 'Разград', 'Свиленград'
  ];

  const weapons = [
    { id: 'sirene', name: 'Сирене', description: 'Истинското българско сирене' },
    { id: 'kashkaval', name: 'Кашкавал', description: 'Силата на традицията' },
    { id: 'kiselo-mlqko', name: 'Кисело мляко', description: 'Чиста енергия без добавки' }
  ];

  const motivations = [
    { id: 'childhood', name: 'За спомените от детството', icon: '👶' },
    { id: 'family', name: 'За здравето на семейството', icon: '👨‍👩‍👧‍👦' },
    { id: 'hate-fake', name: 'Защото мразя подправките', icon: '😤' }
  ];

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    
    if (!formData.city.trim()) newErrors.city = 'Градът е задължителен';
    if (!formData.weapon.trim()) newErrors.weapon = 'Оръжието е задължително';
    if (!formData.motivation.trim()) newErrors.motivation = 'Мотивацията е задължителна';
    if (!formData.email.trim()) newErrors.email = 'Email-ът е задължителен';
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) newErrors.email = 'Невалиден email адрес';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;

    setIsLoading(true);
    
    try {
      const response = await fetch('/api/quiz', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setIsSubmitted(true);
      } else {
        throw new Error('Грешка при изпращането');
      }
    } catch (error) {
      console.error('Error submitting quiz:', error);
      setErrors({ general: 'Възникна грешка. Моля опитайте отново.' });
    } finally {
      setIsLoading(false);
    }
  };

  const resetForm = () => {
    setIsSubmitted(false);
    setFormData({ city: '', weapon: '', motivation: '', email: '' });
    setErrors({});
  };

  if (!mounted) {
    return (
      <section id="quiz" className="py-20 lg:py-32 bg-gradient-to-br from-green-50 to-blue-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white/50 backdrop-blur-sm rounded-3xl p-8 lg:p-12 shadow-2xl h-96 animate-pulse"></div>
        </div>
      </section>
    );
  }

  if (isSubmitted) {
    return (
      <section id="quiz" className="py-20 lg:py-32 bg-gradient-to-br from-green-50 to-blue-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
            className="bg-white/90 backdrop-blur-sm rounded-3xl p-12 shadow-2xl border border-green-200"
          >
            <CheckCircle className="text-green-600 mx-auto mb-6" size={80} />
            <h2 className="text-3xl font-playfair font-bold text-green-800 mb-4">
              Добре дошъл в движението!
            </h2>
            <p className="text-lg text-green-700 mb-8">
              Твоите данни са записани. Войната срещу компромиса тепърва започва!
            </p>
            <button
              onClick={resetForm}
              className="bg-red-600 text-white px-8 py-3 rounded-xl hover:bg-red-500 transition-colors duration-300 font-semibold shadow-lg"
            >
              Присъедини друг войн
            </button>
          </motion.div>
        </div>
      </section>
    );
  }

  return (
    <section id="quiz" className="py-20 lg:py-32 bg-gradient-to-br from-green-50 to-blue-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={mounted ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl sm:text-5xl font-playfair font-bold text-green-800 mb-6">
            Чий вкус ще защитиш?
          </h2>
          <p className="text-xl text-green-700 max-w-3xl mx-auto leading-relaxed">
            Стани част от движението. Кажи ни къде цениш истинския вкус, за да го защитим заедно.
          </p>
        </motion.div>

        <motion.form
          onSubmit={handleSubmit}
          className="bg-white/90 backdrop-blur-sm rounded-3xl p-8 lg:p-12 shadow-2xl border border-green-200"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <div className="space-y-8">
            {/* Question 1: City */}
            <div>
              <label className="flex items-center gap-3 text-lg font-semibold text-green-800 mb-4">
                <MapPin className="text-red-500" size={24} />
                В кой град цениш истинския вкус?
              </label>
              <select
                value={formData.city}
                onChange={(e) => handleInputChange('city', e.target.value)}
                className={`w-full bg-white text-green-800 border ${errors.city ? 'border-red-500' : 'border-green-300'} rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-green-400 focus:border-transparent transition-all duration-300`}
              >
                <option value="">Избери град...</option>
                {cities.map((city) => (
                  <option key={city} value={city}>{city}</option>
                ))}
              </select>
              {errors.city && <p className="text-red-400 text-sm mt-2">{errors.city}</p>}
            </div>

            {/* Question 2: Weapon */}
            <div>
              <label className="flex items-center gap-3 text-lg font-semibold text-green-800 mb-4">
                <Sword className="text-red-500" size={24} />
                Кое е твоето оръжие в кухнята?
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {weapons.map((weapon) => (
                  <motion.button
                    key={weapon.id}
                    type="button"
                    onClick={() => handleInputChange('weapon', weapon.id)}
                    className={`p-4 rounded-xl border-2 transition-all duration-300 ${
                      formData.weapon === weapon.id
                        ? 'border-red-500 bg-red-50 text-green-800'
                        : 'border-green-300 bg-white/50 text-green-700 hover:border-green-400'
                    }`}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <div className="font-semibold mb-1">{weapon.name}</div>
                    <div className="text-sm opacity-75">{weapon.description}</div>
                  </motion.button>
                ))}
              </div>
              {errors.weapon && <p className="text-red-400 text-sm mt-2">{errors.weapon}</p>}
            </div>

            {/* Question 3: Motivation */}
            <div>
              <label className="flex items-center gap-3 text-lg font-semibold text-green-800 mb-4">
                <span className="text-red-500 text-xl">⚔️</span>
                Защо се бориш?
              </label>
              <div className="grid grid-cols-1 gap-3">
                {motivations.map((motivation) => (
                  <motion.button
                    key={motivation.id}
                    type="button"
                    onClick={() => handleInputChange('motivation', motivation.id)}
                    className={`flex items-center gap-4 p-4 rounded-xl border-2 transition-all duration-300 text-left ${
                      formData.motivation === motivation.id
                        ? 'border-red-500 bg-red-50 text-green-800'
                        : 'border-green-300 bg-white/50 text-green-700 hover:border-green-400'
                    }`}
                    whileHover={{ scale: 1.01 }}
                    whileTap={{ scale: 0.99 }}
                  >
                    <span className="text-2xl">{motivation.icon}</span>
                    <span className="font-medium">{motivation.name}</span>
                  </motion.button>
                ))}
              </div>
              {errors.motivation && <p className="text-red-400 text-sm mt-2">{errors.motivation}</p>}
            </div>

            {/* Email */}
            <div>
              <label className="flex items-center gap-3 text-lg font-semibold text-green-800 mb-4">
                <Mail className="text-red-500" size={24} />
                Въведи своя имейл, за да се присъединиш:
              </label>
              <input
                type="email"
                value={formData.email}
                onChange={(e) => handleInputChange('email', e.target.value)}
                className={`w-full bg-white text-green-800 border ${errors.email ? 'border-red-500' : 'border-green-300'} rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-green-400 focus:border-transparent transition-all duration-300`}
                placeholder="твоят@имейл.bg"
              />
              {errors.email && <p className="text-red-400 text-sm mt-2">{errors.email}</p>}
            </div>

            {/* Submit Button */}
            <motion.button
              type="submit"
              disabled={isLoading}
              className={`w-full bg-red-600 text-white py-4 px-6 rounded-xl font-bold text-lg transition-all duration-300 flex items-center justify-center gap-3 shadow-lg ${
                isLoading ? 'opacity-75 cursor-not-allowed' : 'hover:bg-red-500 hover:scale-[1.02] hover:shadow-xl'
              }`}
              whileHover={!isLoading ? { scale: 1.02 } : {}}
              whileTap={!isLoading ? { scale: 0.98 } : {}}
            >
              {isLoading ? (
                <div className="w-6 h-6 border-2 border-white/20 border-t-white rounded-full animate-spin"></div>
              ) : (
                <>
                  <Send size={20} />
                  ПРИСЪЕДИНИ СЕ КЪМ ДВИЖЕНИЕТО
                </>
              )}
            </motion.button>

            {errors.general && (
              <p className="text-red-400 text-center">{errors.general}</p>
            )}
          </div>
        </motion.form>
      </div>
    </section>
  );
}