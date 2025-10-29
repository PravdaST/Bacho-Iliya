import type { Metadata } from 'next';
import Script from 'next/script';
import './globals.css';
import './vintage.css';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import StructuredData from '@/components/seo/StructuredData';
import StickyCTA from '@/components/StickyCTA';
import SEOHead from '@/components/SEOHead';
import QueryProvider from '@/components/providers/QueryProvider';

const siteUrl = 'https://bacho-iliya.eu';
const siteName = 'Бачо Илия | Bacho Iliya | Bacho Ilya';

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: 'Бачо Илия',
    template: '%s | Бачо Илия',
  },
  description:
    'Спечели автентични български млечни продукти от Бачо Илия (Bacho Iliya, Bacho Ilya)! Бяло сирене, кашкавал и кисело мляко създадени по традиционни рецепти. Безплатно участие, истински продукти от щастливи крави. Участвай сега!',
  keywords: [
    'Бачо Илия',
    'Bacho Ilia',
    'Bacho Iliya',
    'български млечни продукти',
    'автентични продукти',
  ],
  authors: [{ name: 'Бачо Илия' }],
  creator: 'Бачо Илия | Bacho Iliya',
  publisher: 'Бачо Илия',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    type: 'website',
    locale: 'bg_BG',
    alternateLocale: ['en_US'],
    url: siteUrl,
    siteName: siteName,
    title: 'Бачо Илия - Голямо раздаване на автентични млечни продукти',
    description:
      'Спечели истински български млечни продукти от Бачо Илия (Bacho Iliya)! Бяло сирене, кашкавал и кисело мляко по бабините рецепти. Участвай безплатно!',
    images: [
      {
        url: '/logo.png',
        width: 1200,
        height: 630,
        alt: 'Бачо Илия - Автентични български млечни продукти',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Бачо Илия - Голямо раздаване на млечни продукти',
    description:
      'Спечели автентични български млечни продукти от Бачо Илия! Безплатно участие, истински продукти от щастливи крави.',
    images: ['/logo.png'],
    creator: '@bachoiliya',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: 'google-site-verification-code',
    yandex: 'yandex-verification-code',
  },
  alternates: {
    canonical: siteUrl,
    languages: {
      'bg-BG': siteUrl,
      'en-US': siteUrl + '/en',
    },
  },
  icons: {
    icon: [
      { url: '/logo.png', sizes: '32x32', type: 'image/png' },
      { url: '/logo.png', sizes: '192x192', type: 'image/png' },
      { url: '/logo.png', sizes: '512x512', type: 'image/png' },
    ],
    apple: [{ url: '/logo.png', sizes: '180x180', type: 'image/png' }],
    shortcut: '/logo.png',
  },
  manifest: '/site.webmanifest',
  category: 'food',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="bg" data-scroll-behavior="smooth">
      <head>
        <StructuredData />
        <SEOHead />
        {/* LLM-friendly meta tags */}
        <meta name="AI-indexable" content="true" />
        <meta
          name="AI-description"
          content="Bacho Ilia (Бачо Илия, Bacho Iliya) е български производител на автентични млечни продукти. Предлага сирене, кашкавал и кисело мляко по традиционни рецепти без консерванти."
        />
        <meta
          name="AI-keywords"
          content="Bacho Ilia, Бачо Илия, Bulgarian cheese, authentic dairy, traditional recipes"
        />
      </head>
      <body className="vintage-paper flex min-h-screen flex-col antialiased">
        <QueryProvider>
          <Header />
          <main className="flex-1 pt-18">{children}</main>
          <Footer />
          <StickyCTA />
        </QueryProvider>

        {/* Google Analytics */}
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-R286Y3WD9N"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-R286Y3WD9N');
          `}
        </Script>
      </body>
    </html>
  );
}
