import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Бачо Илия - Автентични Български Млечни Продукти',
  description: 'Открийте вкуса на истинските български млечни продукти от "Бачо Илия". Традиционно сирене, кашкавал и кисело мляко от най-високо качество.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="bg">
      <body className={inter.className}>{children}</body>
    </html>
  )
}