'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useGiveawayStore, products } from '@/lib/store';
import ProgressBar from '@/components/ProgressBar';

export default function RegisterPage() {
  const router = useRouter();

  // Giveaway ended - redirect to home
  return (
    <div className="bg-old-paper relative min-h-screen overflow-hidden px-4 py-24 flex items-center justify-center">
      <div className="bg-white p-8 md:p-12 rounded-lg shadow-xl text-center max-w-md">
        <h1 className="font-handwritten text-3xl md:text-4xl text-gray-600 mb-4">
          Играта приключи
        </h1>
        <p className="text-gray-500 mb-6">
          Благодарим на всички участници! Победителите са изтеглени.
        </p>
        <a
          href="/"
          className="inline-block bg-gray-400 text-white px-8 py-3 rounded-lg font-semibold"
        >
          Към началната страница
        </a>
      </div>
    </div>
  );

  /* Original code - Giveaway ended
  const {
    selectedProducts,
    userData,
    setUserData,
    setCurrentStep,
    entryId,
    generateEntryId,
    referredBy,
  } = useGiveawayStore();

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
  */

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
      const currentEntryId =
        entryId ||
        `BI-${Date.now().toString(36)}-${Math.random().toString(36).substring(2, 7).toUpperCase()}`;

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
      setSubmitError(
        error instanceof Error ? error.message : 'Възникна грешка. Моля опитайте отново.'
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleBack = () => {
    router.push('/');
  };

  return (
    <div className="bg-old-paper relative min-h-screen overflow-hidden px-4 py-24">
      {/* Vintage Paper Texture */}
      <div className="bg-vintage-paper absolute inset-0 opacity-30" />

      <div className="relative mx-auto max-w-4xl">
        {/* Progress Bar */}
        <div className="mb-8">
          <ProgressBar currentStep={2} totalSteps={4} />
        </div>

        {/* Notebook Form Card */}
        <form
          onSubmit={handleSubmit}
          className="border-walnut/40 relative overflow-hidden border-4 bg-white p-8 shadow-2xl md:p-12"
        >
          {/* Notebook Lines */}
          <div className="pointer-events-none absolute inset-0">
            {[...Array(25)].map((_, i) => (
              <div
                key={i}
                className="border-faded-denim/15 absolute right-0 left-0 border-b"
                style={{ top: `${(i + 1) * 4}%` }}
              />
            ))}
          </div>

          {/* Left Margin Line */}
          <div className="bg-bulgarian-red/30 absolute top-0 bottom-0 left-16 w-px" />

          {/* Perforation Holes */}
          <div className="absolute top-0 bottom-0 left-0 hidden w-12 flex-col justify-around py-8 md:flex">
            {[...Array(20)].map((_, i) => (
              <div
                key={i}
                className="bg-walnut/20 border-walnut/10 ml-4 h-3 w-3 rounded-full border-2"
              />
            ))}
          </div>

          {/* Paper Texture */}
          <div className="bg-vintage-paper pointer-events-none absolute inset-0 opacity-20" />

          {/* Form Header */}
          <div className="border-walnut/30 relative mb-8 border-b-2 border-dashed pb-6">
            <h1 className="font-handwritten text-bulgarian-red mb-2 text-4xl md:text-5xl">
              Формуляр за регистрация
            </h1>
            <p className="font-handwritten text-walnut text-lg">
              Попълнете внимателно всички полета
            </p>
          </div>

          {/* Selected Products */}
          {selectedProductsList.length > 0 && (
            <div className="bg-bulgarian-red/5 border-bulgarian-red relative mb-8 border-l-4 p-4">
              <p className="font-handwritten text-walnut/60 mb-2 text-xs uppercase">
                Избрани продукти:
              </p>
              <div className="flex flex-wrap gap-2">
                {selectedProductsList.map((product) => (
                  <span
                    key={product.id}
                    className="font-handwritten text-walnut border-walnut/20 border bg-white px-3 py-1 text-sm"
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
              <label htmlFor="name" className="font-handwritten text-walnut mb-3 block text-xl">
                Име и фамилия:
              </label>
              <input
                id="name"
                type="text"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className={`font-handwritten text-walnut w-full border-0 border-b-2 bg-transparent px-2 py-2 text-xl transition-all ${errors.name ? 'border-bulgarian-red' : 'border-walnut/30 focus:border-bulgarian-red'} placeholder:text-walnut/40 focus:outline-none`}
                placeholder="__________________________"
              />
              {errors.name && (
                <p className="font-handwritten text-bulgarian-red mt-2 text-sm">{errors.name}</p>
              )}
            </div>

            {/* Email */}
            <div>
              <label htmlFor="email" className="font-handwritten text-walnut mb-3 block text-xl">
                Email адрес:
              </label>
              <input
                id="email"
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className={`font-handwritten text-walnut w-full border-0 border-b-2 bg-transparent px-2 py-2 text-xl transition-all ${errors.email ? 'border-bulgarian-red' : 'border-walnut/30 focus:border-bulgarian-red'} placeholder:text-walnut/40 focus:outline-none`}
                placeholder="__________________________"
              />
              {errors.email && (
                <p className="font-handwritten text-bulgarian-red mt-2 text-sm">{errors.email}</p>
              )}
            </div>

            {/* Phone */}
            <div>
              <label htmlFor="phone" className="font-handwritten text-walnut mb-3 block text-xl">
                Телефон:
              </label>
              <input
                id="phone"
                type="tel"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                className={`font-handwritten text-walnut w-full border-0 border-b-2 bg-transparent px-2 py-2 text-xl transition-all ${errors.phone ? 'border-bulgarian-red' : 'border-walnut/30 focus:border-bulgarian-red'} placeholder:text-walnut/40 focus:outline-none`}
                placeholder="__________________________"
              />
              {errors.phone && (
                <p className="font-handwritten text-bulgarian-red mt-2 text-sm">{errors.phone}</p>
              )}
              <p className="font-handwritten text-walnut/60 mt-2 text-xs">
                Формат: 10 цифри (напр. 0888123456)
              </p>
            </div>
          </div>

          {/* Error Message */}
          {submitError && (
            <div className="bg-bulgarian-red/10 border-bulgarian-red relative mt-8 border-l-4 p-6">
              <p className="font-handwritten text-bulgarian-red text-lg">{submitError}</p>
            </div>
          )}

          {/* Buttons */}
          <div className="border-walnut/30 relative mt-12 flex flex-col gap-4 border-t-2 border-dashed pt-8 sm:flex-row">
            <button
              type="button"
              onClick={handleBack}
              disabled={isSubmitting}
              className="border-walnut/40 text-walnut font-handwritten hover:bg-walnut/5 flex-1 border-4 px-8 py-4 text-lg font-bold transition-all disabled:cursor-not-allowed disabled:opacity-50"
            >
              ← НАЗАД
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="bg-bulgarian-red border-walnut/40 font-handwritten relative flex-1 overflow-hidden border-4 px-8 py-4 text-lg font-bold text-white shadow-xl transition-all hover:scale-105 disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:scale-100"
            >
              {/* Vintage texture */}
              <div className="bg-vintage-paper pointer-events-none absolute inset-0 opacity-10" />
              <span className="relative">{isSubmitting ? 'ЗАПИСВАНЕ...' : 'ПРОДЪЛЖИ →'}</span>
            </button>
          </div>

          {/* Coffee Stain */}
          <div className="bg-walnut/10 pointer-events-none absolute right-8 bottom-8 h-24 w-24 rounded-full opacity-30 blur-lg" />
        </form>
      </div>
    </div>
  );
}
