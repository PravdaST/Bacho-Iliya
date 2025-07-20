'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MapPin, Sword, Mail, Send, CheckCircle } from 'lucide-react';
import Image from 'next/image';

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
    if (formData.motivation.length < 10) newErrors.motivation = 'Мотивацията трябва да е поне 10 символа';
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

      const result = await response.json();

      if (result.success) {
        setIsSubmitted(true);
      } else {
        console.error('Quiz submission failed:', result.message);
        setErrors({ submit: result.message || 'Възникна грешка при записването' });
      }
    } catch (error) {
      console.error('Error submitting quiz:', error);
      setErrors({ submit: 'Възникна грешка при записването' });
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
      <section id="quiz" className="py-20 lg:py-32 bg-gradient-to-br from-forest-green/10 to-warm-beige/20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-8 lg:p-12 shadow-2xl h-96 animate-pulse"></div>
        </div>
      </section>
    );
  }

  if (isSubmitted) {
    return (
      <section id="quiz" className="py-20 lg:py-32 bg-gradient-to-br from-forest-green/10 to-warm-beige/20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
            className="bg-white/80 backdrop-blur-sm rounded-3xl p-12 shadow-2xl"
          >
            <CheckCircle className="text-forest-green mx-auto mb-6" size={80} />
            <h2 className="text-3xl font-playfair font-bold text-warm-brown mb-4">
              Благодарим ви!
            </h2>
            <p className="text-lg text-gray-700 mb-8">
              Вашите отговори са записани успешно. Скоро ще се свържем с вас!
            </p>
            <button
              onClick={resetForm}
              className="bg-traditional-red text-white px-8 py-3 rounded-xl hover:bg-traditional-red/90 transition-colors duration-300 font-semibold"
            >
              Попълни отново
            </button>
          </motion.div>
        </div>
      </section>
    );
  }

  return (
    <section id="quiz" className="py-20 lg:py-32 bg-gradient-to-br from-forest-green/10 to-warm-beige/20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-playfair font-bold text-warm-brown mb-6">
            Тест за познаване
          </h2>
          <p className="text-lg sm:text-xl text-gray-700 max-w-2xl mx-auto">
            Отговорете на няколко въпроса и открийте какви продукти "Бачо Илия" са най-подходящи за вас!
          </p>
        </motion.div>

        <motion.form
          onSubmit={handleSubmit}
          className="bg-white/80 backdrop-blur-sm rounded-3xl p-8 lg:p-12 shadow-2xl"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <div className="space-y-8">
            {/* City Question */}
            <div>
              <label className="flex items-center gap-3 text-lg font-semibold text-warm-brown mb-4">
                <Image src="/products/sirene/BI-sirene-400-metal-480x480.png" alt="Сирене" width={32} height={32} className="rounded" />
                От кой град сте?
              </label>
              <input
                type="text"
                value={formData.city}
                onChange={(e) => handleInputChange('city', e.target.value)}
                className="w-full p-4 border border-warm-beige rounded-xl focus:ring-2 focus:ring-traditional-red focus:border-traditional-red transition-all duration-300 text-lg"
                placeholder="Въведете вашия град..."
              />
              {errors.city && (
                <p className="text-traditional-red text-sm mt-2">{errors.city}</p>
              )}
            </div>

            {/* Weapon Question */}
            <div>
              <label className="flex items-center gap-3 text-lg font-semibold text-warm-brown mb-4">
                <Image src="/products/kashkaval/BI-kashkaval-1500-480x480.png" alt="Кашкавал" width={32} height={32} className="rounded" />
                Какво оръжие бихте избрали за бой?
              </label>
              <select
                value={formData.weapon}
                onChange={(e) => handleInputChange('weapon', e.target.value)}
                className="w-full p-4 border border-warm-beige rounded-xl focus:ring-2 focus:ring-traditional-red focus:border-traditional-red transition-all duration-300 text-lg"
              >
                <option value="">Изберете оръжие...</option>
                <option value="меч">Меч</option>
                <option value="лък">Лък</option>
                <option value="копие">Копие</option>
                <option value="щит">Щит</option>
                <option value="брадва">Брадва</option>
                <option value="катана">Катана</option>
                <option value="кинжал">Кинжал</option>
              </select>
              {errors.weapon && (
                <p className="text-traditional-red text-sm mt-2">{errors.weapon}</p>
              )}
            </div>

            {/* Motivation Question */}
            <div>
              <label className="flex items-center gap-3 text-lg font-semibold text-warm-brown mb-4">
                <Image src="/products/kiselo-mlqko/BI-kiselo-mlyqko-3.6-480x480.jpg" alt="Кисело мляко" width={32} height={32} className="rounded" />
                Каква е вашата мотивация да опитате продуктите на "Бачо Илия"?
              </label>
              <textarea
                value={formData.motivation}
                onChange={(e) => handleInputChange('motivation', e.target.value)}
                className="w-full p-4 border border-warm-beige rounded-xl focus:ring-2 focus:ring-traditional-red focus:border-traditional-red transition-all duration-300 text-lg resize-none"
                rows={4}
                placeholder="Разкажете ни защо искате да опитате нашите продукти..."
              />
              {errors.motivation && (
                <p className="text-traditional-red text-sm mt-2">{errors.motivation}</p>
              )}
            </div>

            {/* Email */}
            <div>
              <label className="flex items-center gap-3 text-lg font-semibold text-warm-brown mb-4">
                <Mail className="text-traditional-red" size={24} />
                Email адрес за контакт
              </label>
              <input
                type="email"
                value={formData.email}
                onChange={(e) => handleInputChange('email', e.target.value)}
                className="w-full p-4 border border-warm-beige rounded-xl focus:ring-2 focus:ring-traditional-red focus:border-traditional-red transition-all duration-300 text-lg"
                placeholder="your@email.com"
              />
              {errors.email && (
                <p className="text-traditional-red text-sm mt-2">{errors.email}</p>
              )}
            </div>

            {errors.submit && (
              <div className="bg-traditional-red/10 border border-traditional-red/20 rounded-xl p-4">
                <p className="text-traditional-red text-center">{errors.submit}</p>
              </div>
            )}

            <motion.button
              type="submit"
              disabled={isLoading}
              className="w-full bg-traditional-red text-white font-semibold py-4 px-8 rounded-xl hover:bg-traditional-red/90 transition-all duration-300 flex items-center justify-center gap-3 text-lg disabled:opacity-50 disabled:cursor-not-allowed"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              {isLoading ? (
                <>
                  <div className="animate-spin w-5 h-5 border-2 border-white border-t-transparent rounded-full"></div>
                  Изпраща се...
                </>
              ) : (
                <>
                  Изпрати отговорите
                  <Send size={20} />
                </>
              )}
            </motion.button>
          </div>
        </motion.form>
      </div>
    </section>
  );
}