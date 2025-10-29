'use client';

import { Suspense, useState } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';

function LoginForm() {
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
    <div className="bg-old-paper relative min-h-screen overflow-hidden px-4 py-24 sm:px-6 lg:px-8">
      {/* Paper texture */}
      <div className="bg-vintage-paper pointer-events-none absolute inset-0 opacity-30" />

      <div className="relative mx-auto max-w-md">
        {/* Page Header */}
        <motion.div
          className="mb-12 text-center"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="font-handwritten text-bulgarian-red mb-4 text-5xl md:text-6xl">
            🎟️ Влез в профила си
          </h1>
          <p className="font-handwritten text-walnut text-xl">Виж билетите си и статистика</p>
        </motion.div>

        {/* Error from redirect */}
        {redirectError && (
          <motion.div
            className="mb-6 border-2 border-red-300 bg-red-50 p-4"
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
            className="relative mb-6 border-4 border-green-400 bg-green-50 p-8 shadow-xl"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
          >
            <div className="bg-vintage-paper pointer-events-none absolute inset-0 opacity-20" />
            <div className="relative z-10 text-center">
              <span className="mb-4 block text-6xl">✅</span>
              <h3 className="font-handwritten mb-3 text-2xl font-bold text-green-700 md:text-3xl">
                Magic link изпратен!
              </h3>
              <p className="font-handwritten text-lg text-green-600">
                Провери имейла си и кликни на линка за да влезеш.
              </p>
              <p className="font-handwritten mt-3 text-base text-green-600/70">
                Линкът е валиден 15 минути
              </p>
            </div>
          </motion.div>
        )}

        {/* Login Form */}
        <motion.div
          className="border-bulgarian-red/40 relative border-4 bg-white p-8 shadow-xl"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <div className="bg-vintage-paper pointer-events-none absolute inset-0 opacity-20" />

          <div className="relative z-10">
            <h2 className="font-handwritten text-bulgarian-red mb-6 text-center text-3xl font-bold">
              Въведи имейла си
            </h2>

            <p className="font-handwritten text-walnut mb-6 text-center text-lg">
              Ще ти изпратим magic link на имейла с който си се регистрирал
            </p>

            {error && (
              <motion.div
                className="mb-6 border-2 border-red-300 bg-red-50 p-4"
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
                  className="font-handwritten text-walnut mb-2 block text-xl font-bold"
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
                  className="bg-old-paper border-walnut/30 font-handwritten text-walnut focus:ring-bulgarian-red w-full border-2 px-4 py-3 text-lg focus:ring-2 focus:outline-none disabled:opacity-50"
                  placeholder="example@email.com"
                />
              </div>

              <button
                type="submit"
                disabled={loading || success}
                className="bg-bulgarian-red font-handwritten hover:bg-dark-walnut w-full px-8 py-4 text-2xl font-bold text-white shadow-xl transition-all disabled:cursor-not-allowed disabled:opacity-50"
              >
                {loading ? 'Изпраща се...' : 'Изпрати Magic Link 🔐'}
              </button>
            </form>

            <div className="border-walnut/30 mt-8 border-t-2 border-dashed pt-6">
              <p className="font-handwritten text-walnut/70 mb-4 text-center text-base">
                Нямаш регистрация?
              </p>
              <Link
                href="/"
                className="bg-sunflower text-dark-walnut font-handwritten block px-6 py-3 text-center text-xl font-bold transition-all hover:shadow-md"
              >
                Регистрирай се за раздаването →
              </Link>
            </div>
          </div>
        </motion.div>

        {/* Info Box */}
        <motion.div
          className="bg-sunflower/20 border-sunflower/50 mt-8 border-2 p-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <h3 className="font-handwritten text-dark-walnut mb-3 text-xl font-bold">
            ℹ️ Какво е Magic Link?
          </h3>
          <p className="font-handwritten text-walnut text-base leading-relaxed">
            Magic Link е сигурен начин за вход без парола. След като въведеш имейла си, ще получиш
            линк който работи само веднъж. Кликни на линка в имейла и веднага ще влезеш в профила
            си.
          </p>
        </motion.div>

        {/* Back to Home */}
        <motion.div
          className="mt-8 text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
        >
          <Link
            href="/"
            className="border-dark-walnut text-dark-walnut font-handwritten hover:bg-old-paper inline-flex items-center gap-2 border-2 bg-white px-6 py-3 text-lg font-bold transition-all"
          >
            ← Обратно към началото
          </Link>
        </motion.div>
      </div>
    </div>
  );
}

export default function LoginPage() {
  return (
    <Suspense
      fallback={
        <div className="bg-old-paper flex min-h-screen items-center justify-center px-4 py-24 sm:px-6 lg:px-8">
          <motion.div
            className="text-center"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
          >
            <div className="font-handwritten text-bulgarian-red mb-4 text-4xl">Зареждане...</div>
            <div className="border-bulgarian-red mx-auto h-16 w-16 animate-spin rounded-full border-4 border-t-transparent"></div>
          </motion.div>
        </div>
      }
    >
      <LoginForm />
    </Suspense>
  );
}
