import type { Metadata } from "next";
import StructuredData from "@/components/seo/structured-data";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL('https://bacho-iliya.replit.app'),
  title: "Бачо Илия - Революцията на истинския вкус",
  description: "Присъедини се към революцията на истинския български вкус! Автентични млечни продукти и традиционни деликатеси от Бачо Илия. Защити вкуса на България!",
  keywords: [
    "български млечни продукти",
    "автентични деликатеси", 
    "традиционна храна",
    "Бачо Илия",
    "българска кухня",
    "качествена храна",
    "истински вкус",
    "революция на вкуса",
    "сирене",
    "кашкавал", 
    "кисело мляко",
    "традиционни рецепти",
    "българска млекарница",
    "без консерванти",
    "натурални продукти"
  ],
  authors: [{ name: "Бачо Илия" }],
  creator: "Бачо Илия",
  publisher: "Бачо Илия",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
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
  alternates: {
    canonical: 'https://bacho-iliya.replit.app',
    languages: {
      'bg-BG': 'https://bacho-iliya.replit.app',
    },
  },
  category: 'food',
  icons: {
    icon: [
      { url: "/favicon.ico" },
      { url: "/logo.png", sizes: "any", type: "image/png" },
    ],
    apple: [
      { url: "/logo.png" },
    ],
    shortcut: ["/favicon.ico"],
  },
  openGraph: {
    title: "Бачо Илия - Революцията на истинския вкус",
    description: "Присъедини се към революцията на истинския български вкус!",
    images: [
      {
        url: "/logo.png",
        width: 1200,
        height: 630,
        alt: "Бачо Илия Logo",
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Бачо Илия - Революцията на истинския вкус',
    description: 'Присъедини се към революцията на истинския български вкус! Автентични млечни продукти и традиционни деликатеси.',
    images: ['/logo.png'],
    site: '@BachoIliya',
    creator: '@BachoIliya',
  },
  verification: {
    google: process.env.GOOGLE_SITE_VERIFICATION,
    yandex: process.env.YANDEX_VERIFICATION,
  },
  category: 'food',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="bg">
      <head>
        <StructuredData />
      </head>
      <body>{children}</body>
    </html>
  );
}