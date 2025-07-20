import type { Metadata } from 'next'
import { Inter, Playfair_Display } from 'next/font/google'
import './globals.css'

import { Toaster } from "@/components/ui/toaster"
import { TooltipProvider } from "@/components/ui/tooltip"
import Providers from './providers'

const inter = Inter({ subsets: ['latin'] })
const playfair = Playfair_Display({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Бачо Илия - Автентични Български Млечни Продукти',
  description: 'Открийте традиционните български млечни продукти от най-високо качество. Натурални, автентични и с богата история.',
  keywords: 'български млечни продукти, сирене, кашкавал, мляко, традиционно, автентично',
  openGraph: {
    title: 'Бачо Илия - Автентични Български Млечни Продукти',
    description: 'Открийте традиционните български млечни продукти от най-високо качество.',
    type: 'website',
  }
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="bg">
      <body className={`${inter.className} ${playfair.className}`}>
        <Providers>
          <TooltipProvider>
            {children}
            <Toaster />
          </TooltipProvider>
        </Providers>
      </body>
    </html>
  )
}