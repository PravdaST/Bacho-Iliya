
import Link from 'next/link'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Страницата не е намерена - Бачо Илия',
  description: 'Търсената страница не съществува.'
}

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-amber-50 to-orange-100">
      <div className="text-center p-8">
        <h1 className="text-6xl font-bold text-amber-800 mb-4">404</h1>
        <h2 className="text-2xl font-semibold text-amber-700 mb-4">
          Страницата не е намерена
        </h2>
        <p className="text-amber-600 mb-8">
          Извинете, но страницата която търсите не съществува.
        </p>
        <Link 
          href="/" 
          className="bg-amber-600 hover:bg-amber-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors"
        >
          Върни се към началото
        </Link>
      </div>
    </div>
  )
}
