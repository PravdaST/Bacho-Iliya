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
    <div className="bg-old-paper relative min-h-screen overflow-hidden px-4 py-32 sm:px-6 lg:px-8">
      {/* Paper texture */}
      <div className="bg-vintage-paper pointer-events-none absolute inset-0 opacity-20" />

      <div className="relative mx-auto max-w-lg">
        {/* Page Header */}
        <motion.div
          className="mb-16 text-center"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="font-handwritten text-bulgarian-red mb-6 text-6xl md:text-7xl">
            Влез в профила си
          </h1>
          <p className="text-walnut text-xl md:text-2xl">Виж билетите си и статистика</p>
        </motion.div>

        {/* Error from redirect */}
        {redirectError && (
          <motion.div
            className="mb-8 rounded-lg border-l-4 border-red-500 bg-red-50 p-6 shadow-md"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <div className="flex items-start gap-3">
              <span className="text-2xl">⚠️</span>
              <p className="text-lg leading-relaxed text-red-700">
                {getErrorMessage(redirectError)}
              </p>
            </div>
          </motion.div>
        )}

        {/* Success Message */}
        {success && (
          <motion.div
            className="relative mb-10 rounded-lg border-l-4 border-green-500 bg-green-50 p-8 shadow-lg"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
          >
            <div className="bg-vintage-paper pointer-events-none absolute inset-0 rounded-lg opacity-10" />
            <div className="relative z-10 text-center">
              <span className="mb-5 block text-6xl">✅</span>
              <h3 className="font-handwritten mb-4 text-3xl font-bold text-green-700 md:text-4xl">
                Magic link изпратен!
              </h3>
              <p className="mb-3 text-lg leading-relaxed text-green-700">
                Провери имейла си и кликни на линка за да влезеш.
              </p>
              <p className="text-base text-green-600">
                Линкът е валиден 15 минути
              </p>
            </div>
          </motion.div>
        )}

        {/* Login Form */}
        <motion.div
          className="relative rounded-xl border-2 border-bulgarian-red/30 bg-white p-10 shadow-lg"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <div className="bg-vintage-paper pointer-events-none absolute inset-0 rounded-xl opacity-15" />

          <div className="relative z-10">
            <h2 className="font-handwritten text-bulgarian-red mb-8 text-center text-4xl font-bold">
              Въведи имейла си
            </h2>

            <p className="text-walnut mb-10 text-center text-lg leading-relaxed">
              Ще ти изпратим magic link на имейла с който си се регистрирал
            </p>

            {error && (
              <motion.div
                className="mb-8 rounded-lg border-l-4 border-red-500 bg-red-50 p-5"
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
              >
                <div className="flex items-start gap-3">
                  <span className="text-xl">⚠️</span>
                  <p className="text-base leading-relaxed text-red-700">{error}</p>
                </div>
              </motion.div>
            )}

            <form onSubmit={handleSubmit} className="space-y-8">
              <div>
                <label
                  htmlFor="email"
                  className="text-walnut mb-3 block text-lg font-semibold"
                >
                  Имейл адрес
                </label>
                <input
                  type="email"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  disabled={loading || success}
                  className="focus:ring-bulgarian-red focus:border-bulgarian-red bg-old-paper border-walnut/30 text-walnut w-full rounded-lg border-2 px-5 py-4 text-lg transition-all focus:outline-none focus:ring-2 disabled:cursor-not-allowed disabled:opacity-50"
                  placeholder="твоят@email.com"
                />
              </div>

              <button
                type="submit"
                disabled={loading || success}
                className="bg-bulgarian-red hover:bg-dark-walnut font-handwritten w-full rounded-lg px-8 py-5 text-2xl font-bold text-white shadow-lg transition-all hover:shadow-xl disabled:cursor-not-allowed disabled:opacity-50"
              >
                {loading ? (
                  <span className="flex items-center justify-center gap-3">
                    <svg className="h-6 w-6 animate-spin" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Изпраща се...
                  </span>
                ) : (
                  'Изпрати Magic Link'
                )}
              </button>
            </form>

            <div className="border-walnut/20 mt-10 border-t pt-8">
              <p className="text-walnut/70 mb-4 text-center text-base">
                Нямаш регистрация?
              </p>
              <Link
                href="/"
                className="bg-sunflower text-dark-walnut hover:bg-sunflower/90 block rounded-lg px-6 py-4 text-center text-lg font-semibold shadow-md transition-all hover:shadow-lg"
              >
                Регистрирай се за раздаването
              </Link>
            </div>
          </div>
        </motion.div>

        {/* Info Box */}
        <motion.div
          className="bg-sunflower/10 border-sunflower/30 mt-10 rounded-lg border-2 p-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <h3 className="font-handwritten text-dark-walnut mb-4 text-2xl font-bold">
            Какво е Magic Link?
          </h3>
          <p className="text-walnut text-base leading-relaxed">
            Magic Link е сигурен начин за вход без парола. След като въведеш имейла си, ще получиш
            линк който работи само веднъж. Кликни на линка в имейла и веднага ще влезеш в профила
            си.
          </p>
        </motion.div>

        {/* Back to Home */}
        <motion.div
          className="mt-10 text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
        >
          <Link
            href="/"
            className="border-dark-walnut text-dark-walnut hover:bg-old-paper inline-flex items-center gap-2 rounded-lg border-2 bg-white px-6 py-3 text-base font-medium shadow-sm transition-all hover:shadow-md"
          >
            <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Обратно към началото
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
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
          >
            <div className="font-handwritten text-bulgarian-red mb-6 text-5xl">Зареждане...</div>
            <div className="border-bulgarian-red mx-auto h-16 w-16 animate-spin rounded-full border-4 border-t-transparent"></div>
          </motion.div>
        </div>
      }
    >
      <LoginForm />
    </Suspense>
  );
}
