'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';

export default function LoginPage() {
  const searchParams = useSearchParams();
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  // Check for error from redirect
  const redirectError = searchParams.get('error');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess(false);

    try {
      const response = await fetch('/api/auth/magic-link', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();

      if (data.success) {
        setSuccess(true);
        setEmail('');
      } else {
        setError(data.error || 'Грешка при изпращане на magic link');
      }
    } catch (err) {
      setError('Грешка при свързване със сървъра');
    } finally {
      setLoading(false);
    }
  };

  const getErrorMessage = (errorCode: string | null) => {
    switch (errorCode) {
      case 'missing_token':
        return 'Липсва токен за достъп';
      case 'invalid_token':
        return 'Невалиден или изтекъл токен. Поискай нов magic link.';
      case 'server_error':
        return 'Грешка на сървъра. Моля опитай отново.';
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-old-paper py-24 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      {/* Paper texture */}
      <div className="absolute inset-0 bg-vintage-paper opacity-30 pointer-events-none" />

      <div className="max-w-md mx-auto relative">
        {/* Page Header */}
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="font-handwritten text-5xl md:text-6xl text-bulgarian-red mb-4">
            🎟️ Влез в профила си
          </h1>
          <p className="font-handwritten text-xl text-walnut">
            Виж билетите си и статистика
          </p>
        </motion.div>

        {/* Error from redirect */}
        {redirectError && (
          <motion.div
            className="bg-red-50 border-2 border-red-300 p-4 mb-6"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <p className="font-handwritten text-lg text-red-700">
              ⚠️ {getErrorMessage(redirectError)}
            </p>
          </motion.div>
        )}

        {/* Success Message */}
        {success && (
          <motion.div
            className="bg-green-50 border-4 border-green-400 p-8 mb-6 shadow-xl relative"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
          >
            <div className="absolute inset-0 bg-vintage-paper opacity-20 pointer-events-none" />
            <div className="relative z-10 text-center">
              <span className="text-6xl block mb-4">✅</span>
              <h3 className="font-handwritten text-2xl md:text-3xl text-green-700 font-bold mb-3">
                Magic link изпратен!
              </h3>
              <p className="font-handwritten text-lg text-green-600">
                Провери имейла си и кликни на линка за да влезеш.
              </p>
              <p className="font-handwritten text-base text-green-600/70 mt-3">
                Линкът е валиден 15 минути
              </p>
            </div>
          </motion.div>
        )}

        {/* Login Form */}
        <motion.div
          className="bg-white border-4 border-bulgarian-red/40 p-8 shadow-xl relative"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <div className="absolute inset-0 bg-vintage-paper opacity-20 pointer-events-none" />

          <div className="relative z-10">
            <h2 className="font-handwritten text-3xl text-bulgarian-red mb-6 font-bold text-center">
              Въведи имейла си
            </h2>

            <p className="font-handwritten text-lg text-walnut mb-6 text-center">
              Ще ти изпратим magic link на имейла с който си се регистрирал
            </p>

            {error && (
              <motion.div
                className="bg-red-50 border-2 border-red-300 p-4 mb-6"
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
              >
                <p className="font-handwritten text-lg text-red-700">⚠️ {error}</p>
              </motion.div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label
                  htmlFor="email"
                  className="block font-handwritten text-xl text-walnut mb-2 font-bold"
                >
                  Имейл адрес:
                </label>
                <input
                  type="email"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  disabled={loading || success}
                  className="w-full px-4 py-3 bg-old-paper border-2 border-walnut/30 text-lg font-handwritten text-walnut focus:outline-none focus:ring-2 focus:ring-bulgarian-red disabled:opacity-50"
                  placeholder="example@email.com"
                />
              </div>

              <button
                type="submit"
                disabled={loading || success}
                className="w-full px-8 py-4 bg-bulgarian-red text-white font-handwritten text-2xl font-bold hover:bg-dark-walnut transition-all shadow-xl disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? 'Изпраща се...' : 'Изпрати Magic Link 🔐'}
              </button>
            </form>

            <div className="mt-8 pt-6 border-t-2 border-dashed border-walnut/30">
              <p className="font-handwritten text-base text-walnut/70 text-center mb-4">
                Нямаш регистрация?
              </p>
              <Link
                href="/"
                className="block text-center px-6 py-3 bg-sunflower text-dark-walnut font-handwritten text-xl font-bold hover:shadow-md transition-all"
              >
                Регистрирай се за раздаването →
              </Link>
            </div>
          </div>
        </motion.div>

        {/* Info Box */}
        <motion.div
          className="mt-8 bg-sunflower/20 border-2 border-sunflower/50 p-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <h3 className="font-handwritten text-xl text-dark-walnut font-bold mb-3">
            ℹ️ Какво е Magic Link?
          </h3>
          <p className="font-handwritten text-base text-walnut leading-relaxed">
            Magic Link е сигурен начин за вход без парола. След като въведеш имейла си, ще
            получиш линк който работи само веднъж. Кликни на линка в имейла и веднага ще влезеш в
            профила си.
          </p>
        </motion.div>

        {/* Back to Home */}
        <motion.div
          className="text-center mt-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
        >
          <Link
            href="/"
            className="inline-flex items-center gap-2 px-6 py-3 bg-white border-2 border-dark-walnut text-dark-walnut font-handwritten text-lg font-bold hover:bg-old-paper transition-all"
          >
            ← Обратно към началото
          </Link>
        </motion.div>
      </div>
    </div>
  );
}
