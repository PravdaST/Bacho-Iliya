'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useGiveawayStore, products } from '@/lib/store';
import ProgressBar from '@/components/ProgressBar';

export default function RegisterPage() {
  const router = useRouter();
  const { selectedProducts, userData, setUserData, setCurrentStep, entryId, generateEntryId, referredBy } = useGiveawayStore();

  const [formData, setFormData] = useState({
    name: userData.name || '',
    email: userData.email || '',
    phone: userData.phone || '',
  });

  const [errors, setErrors] = useState({
    name: '',
    email: '',
    phone: '',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState('');
  const [isProductsExpanded, setIsProductsExpanded] = useState(true);

  const selectedProductsList = products.filter((p) => selectedProducts.includes(p.id));

  const validate = () => {
    const newErrors = { name: '', email: '', phone: '' };
    let isValid = true;

    if (!formData.name.trim()) {
      newErrors.name = 'Име е задължително';
      isValid = false;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email.trim()) {
      newErrors.email = 'Email е задължителен';
      isValid = false;
    } else if (!emailRegex.test(formData.email)) {
      newErrors.email = 'Невалиден email адрес';
      isValid = false;
    }

    const phoneRegex = /^[0-9]{10}$/;
    if (!formData.phone.trim()) {
      newErrors.phone = 'Телефон е задължителен';
      isValid = false;
    } else if (!phoneRegex.test(formData.phone.replace(/\s/g, ''))) {
      newErrors.phone = 'Невалиден телефонен номер (10 цифри)';
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitError('');

    if (!validate()) {
      return;
    }

    setIsSubmitting(true);

    try {
      // Generate entry ID if not exists
      if (!entryId) {
        generateEntryId();
      }

      // Get current entry ID
      const currentEntryId = entryId || `BI-${Date.now().toString(36)}-${Math.random().toString(36).substring(2, 7).toUpperCase()}`;

      // Save to Zustand store
      setUserData({
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        selectedProducts,
      });

      // Save to database via API
      const response = await fetch('/api/giveaway', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          entryId: currentEntryId,
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          selectedProducts,
          referredBy: referredBy || undefined, // Include referral code if present
          tasks: {
            facebook: false,
            instagram: false,
            share: false,
          },
        }),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || 'Грешка при регистрация');
      }

      console.log('✅ Registration successful:', result);

      // Move to next step
      setCurrentStep(3);
      router.push('/tasks');
    } catch (error) {
      console.error('❌ Registration error:', error);
      setSubmitError(error instanceof Error ? error.message : 'Възникна грешка. Моля опитайте отново.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleBack = () => {
    router.push('/');
  };

  return (
    <div className="min-h-screen py-24 px-4 bg-old-paper relative overflow-hidden">
      {/* Vintage Paper Texture */}
      <div className="absolute inset-0 bg-vintage-paper opacity-30" />

      <div className="max-w-4xl mx-auto relative">
        {/* Progress Bar */}
        <div className="mb-8">
          <ProgressBar currentStep={2} totalSteps={4} />
        </div>

        {/* Notebook Form Card */}
        <form onSubmit={handleSubmit} className="bg-white shadow-2xl border-4 border-walnut/40 relative overflow-hidden p-8 md:p-12">
          {/* Notebook Lines */}
          <div className="absolute inset-0 pointer-events-none">
            {[...Array(25)].map((_, i) => (
              <div
                key={i}
                className="absolute left-0 right-0 border-b border-faded-denim/15"
                style={{ top: `${(i + 1) * 4}%` }}
              />
            ))}
          </div>

          {/* Left Margin Line */}
          <div className="absolute left-16 top-0 bottom-0 w-px bg-bulgarian-red/30" />

          {/* Perforation Holes */}
          <div className="absolute left-0 top-0 bottom-0 w-12 hidden md:flex flex-col justify-around py-8">
            {[...Array(20)].map((_, i) => (
              <div key={i} className="w-3 h-3 bg-walnut/20 rounded-full ml-4 border-2 border-walnut/10" />
            ))}
          </div>

          {/* Paper Texture */}
          <div className="absolute inset-0 bg-vintage-paper opacity-20 pointer-events-none" />

          {/* Form Header */}
          <div className="relative mb-8 pb-6 border-b-2 border-dashed border-walnut/30">
            <h1 className="font-handwritten text-4xl md:text-5xl text-bulgarian-red mb-2">
              Формуляр за регистрация
            </h1>
            <p className="font-handwritten text-walnut text-lg">
              Попълнете внимателно всички полета
            </p>
          </div>

          {/* Selected Products */}
          {selectedProductsList.length > 0 && (
            <div className="relative mb-8 bg-bulgarian-red/5 border-l-4 border-bulgarian-red p-4">
              <p className="font-mono text-xs text-walnut/60 uppercase mb-2">Избрани продукти:</p>
              <div className="flex flex-wrap gap-2">
                {selectedProductsList.map((product) => (
                  <span
                    key={product.id}
                    className="font-handwritten text-sm text-walnut bg-white px-3 py-1 border border-walnut/20"
                  >
                    {product.nameBg}
                  </span>
                ))}
              </div>
            </div>
          )}
          <div className="relative space-y-8">
            {/* Name */}
            <div>
              <label htmlFor="name" className="block font-handwritten text-xl text-walnut mb-3">
                Име и фамилия:
              </label>
              <input
                id="name"
                type="text"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className={`
                  w-full px-2 py-2 bg-transparent border-0 border-b-2 transition-all font-handwritten text-xl text-walnut
                  ${errors.name ? 'border-bulgarian-red' : 'border-walnut/30 focus:border-bulgarian-red'}
                  focus:outline-none placeholder:text-walnut/40
                `}
                placeholder="__________________________"
              />
              {errors.name && <p className="mt-2 font-mono text-sm text-bulgarian-red">{errors.name}</p>}
            </div>

            {/* Email */}
            <div>
              <label htmlFor="email" className="block font-handwritten text-xl text-walnut mb-3">
                Email адрес:
              </label>
              <input
                id="email"
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className={`
                  w-full px-2 py-2 bg-transparent border-0 border-b-2 transition-all font-handwritten text-xl text-walnut
                  ${errors.email ? 'border-bulgarian-red' : 'border-walnut/30 focus:border-bulgarian-red'}
                  focus:outline-none placeholder:text-walnut/40
                `}
                placeholder="__________________________"
              />
              {errors.email && <p className="mt-2 font-mono text-sm text-bulgarian-red">{errors.email}</p>}
            </div>

            {/* Phone */}
            <div>
              <label htmlFor="phone" className="block font-handwritten text-xl text-walnut mb-3">
                Телефон:
              </label>
              <input
                id="phone"
                type="tel"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                className={`
                  w-full px-2 py-2 bg-transparent border-0 border-b-2 transition-all font-handwritten text-xl text-walnut
                  ${errors.phone ? 'border-bulgarian-red' : 'border-walnut/30 focus:border-bulgarian-red'}
                  focus:outline-none placeholder:text-walnut/40
                `}
                placeholder="__________________________"
              />
              {errors.phone && <p className="mt-2 font-mono text-sm text-bulgarian-red">{errors.phone}</p>}
              <p className="mt-2 font-mono text-xs text-walnut/60">Формат: 10 цифри (напр. 0888123456)</p>
            </div>
          </div>

          {/* Error Message */}
          {submitError && (
            <div className="relative mt-8 p-6 bg-bulgarian-red/10 border-l-4 border-bulgarian-red">
              <p className="font-handwritten text-lg text-bulgarian-red">{submitError}</p>
            </div>
          )}

          {/* Buttons */}
          <div className="relative flex flex-col sm:flex-row gap-4 mt-12 pt-8 border-t-2 border-dashed border-walnut/30">
            <button
              type="button"
              onClick={handleBack}
              disabled={isSubmitting}
              className="flex-1 px-8 py-4 border-4 border-walnut/40 text-walnut font-handwritten font-bold text-lg hover:bg-walnut/5 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            >
              ← НАЗАД
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="flex-1 px-8 py-4 bg-bulgarian-red border-4 border-walnut/40 text-white font-handwritten font-bold text-lg hover:scale-105 transition-all disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 shadow-xl relative overflow-hidden"
            >
              {/* Vintage texture */}
              <div className="absolute inset-0 bg-vintage-paper opacity-10 pointer-events-none" />
              <span className="relative">{isSubmitting ? 'ЗАПИСВАНЕ...' : 'ПРОДЪЛЖИ →'}</span>
            </button>
          </div>

          {/* Coffee Stain */}
          <div className="absolute bottom-8 right-8 w-24 h-24 rounded-full bg-walnut/10 blur-lg opacity-30 pointer-events-none" />
        </form>
      </div>
    </div>
  );
}
