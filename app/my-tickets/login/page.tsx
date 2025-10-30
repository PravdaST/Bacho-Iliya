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
    <div className="grid min-h-screen lg:grid-cols-2">
      {/* Left Column - Hero & Info */}
      <motion.div
        className="bg-bulgarian-red relative flex flex-col justify-center px-8 py-16 lg:px-16 lg:py-24"
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6 }}
      >
        {/* Subtle texture */}
        <div className="bg-vintage-paper pointer-events-none absolute inset-0 opacity-10" />

        <div className="relative z-10 max-w-xl">
          {/* Logo/Brand */}
          <div className="mb-12">
            <Link href="/" className="inline-block">
              <h1 className="font-handwritten mb-3 text-5xl text-white lg:text-6xl">
                Бачо Илия
              </h1>
              <p className="text-lg text-white/90">Автентични млечни продукти</p>
            </Link>
          </div>

          {/* Heading */}
          <h2 className="font-handwritten mb-6 text-4xl text-white lg:text-5xl">
            Влез в профила си
          </h2>
          <p className="mb-12 text-xl leading-relaxed text-white/90">
            Виж билетите си, статистика и шансове за спечелване
          </p>

          {/* Info Card */}
          <div className="rounded-xl border-2 border-white/30 bg-white/10 p-8 backdrop-blur-sm">
            <h3 className="font-handwritten mb-4 text-2xl text-white">
              Какво е Magic Link?
            </h3>
            <p className="leading-relaxed text-white/90">
              Magic Link е сигурен начин за вход без парола. Въведи имейла си и ще получиш линк
              който работи само веднъж. Кликни на линка в имейла и веднага ще влезеш.
            </p>
            <div className="mt-6 space-y-3">
              <div className="flex items-center gap-3 text-white/90">
                <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 20 20">
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                    clipRule="evenodd"
                  />
                </svg>
                <span>Без парола - по-сигурно</span>
              </div>
              <div className="flex items-center gap-3 text-white/90">
                <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 20 20">
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                    clipRule="evenodd"
                  />
                </svg>
                <span>Валиден 15 минути</span>
              </div>
              <div className="flex items-center gap-3 text-white/90">
                <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 20 20">
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                    clipRule="evenodd"
                  />
                </svg>
                <span>Използва се само веднъж</span>
              </div>
            </div>
          </div>

          {/* Back to Home */}
          <div className="mt-12">
            <Link
              href="/"
              className="inline-flex items-center gap-2 text-lg text-white/80 transition-colors hover:text-white"
            >
              <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M10 19l-7-7m0 0l7-7m-7 7h18"
                />
              </svg>
              Обратно към началото
            </Link>
          </div>
        </div>
      </motion.div>

      {/* Right Column - Login Form */}
      <motion.div
        className="bg-old-paper relative flex flex-col justify-center px-8 py-16 lg:px-16 lg:py-24"
        initial={{ opacity: 0, x: 50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
      >
        {/* Paper texture */}
        <div className="bg-vintage-paper pointer-events-none absolute inset-0 opacity-20" />

        <div className="relative z-10 mx-auto w-full max-w-md">
          {/* Page Title - Mobile only */}
          <div className="mb-8 text-center lg:hidden">
            <h1 className="font-handwritten text-bulgarian-red mb-3 text-4xl">
              Влез в профила си
            </h1>
            <p className="text-walnut text-lg">Виж билетите си и статистика</p>
          </div>

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
              className="relative mb-10 rounded-xl border-2 border-green-500 bg-green-50 p-8 shadow-lg"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
            >
              <div className="bg-vintage-paper pointer-events-none absolute inset-0 rounded-xl opacity-10" />
              <div className="relative z-10 text-center">
                <span className="mb-5 block text-6xl">✅</span>
                <h3 className="font-handwritten mb-4 text-3xl font-bold text-green-700">
                  Magic link изпратен!
                </h3>
                <p className="mb-3 text-lg leading-relaxed text-green-700">
                  Провери имейла си и кликни на линка за да влезеш.
                </p>
                <p className="text-base text-green-600">Линкът е валиден 15 минути</p>
              </div>
            </motion.div>
          )}

          {/* Login Form */}
          <div className="relative rounded-xl border-2 border-walnut/20 bg-white p-8 shadow-lg lg:p-10">
            <div className="bg-vintage-paper pointer-events-none absolute inset-0 rounded-xl opacity-15" />

            <div className="relative z-10">
              <h2 className="font-handwritten text-bulgarian-red mb-3 text-3xl font-bold">
                Въведи имейла си
              </h2>

              <p className="text-walnut/70 mb-8 text-base leading-relaxed">
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

            <div className="border-walnut/20 mt-8 border-t pt-6">
              <p className="text-walnut/70 mb-4 text-center text-base">Нямаш регистрация?</p>
              <Link
                href="/"
                className="bg-sunflower text-dark-walnut hover:bg-sunflower/90 block rounded-lg px-6 py-4 text-center text-lg font-semibold shadow-md transition-all hover:shadow-lg"
              >
                Регистрирай се за раздаването
              </Link>
            </div>
          </div>
          </div>

          {/* Back to Home - Mobile only */}
          <div className="mt-8 text-center lg:hidden">
            <Link
              href="/"
              className="border-dark-walnut text-dark-walnut hover:bg-white/50 inline-flex items-center gap-2 rounded-lg border-2 bg-white px-6 py-3 text-base font-medium shadow-sm transition-all"
            >
              <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M10 19l-7-7m0 0l7-7m-7 7h18"
                />
              </svg>
              Обратно към началото
            </Link>
          </div>
        </div>
      </motion.div>
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
