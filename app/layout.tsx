import type { Metadata, Viewport } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";

const inter = Inter({ 
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const playfair = Playfair_Display({ 
  subsets: ["latin"],
  variable: "--font-playfair",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL('https://bacho-iliya.bg'),
  title: {
    default: "Бачо Илия - Революцията на истинския вкус",
    template: "%s | Бачо Илия"
  },
  description: "Присъедини се към революцията на истинския български вкус! Автентични млечни продукти и традиционни деликатеси от Бачо Илия. Защити вкуса на България!",
  keywords: [
    "български млечни продукти",
    "автентични деликатеси", 
    "традиционна храна",
    "Бачо Илия",
    "българска кухня",
    "качествена храна",
    "истински вкус",
    "революция на вкуса"
  ],
  authors: [{ name: "Бачо Илия" }],
  creator: "Бачо Илия",
  publisher: "Бачо Илия",
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
  openGraph: {
    type: "website",
    locale: "bg_BG",
    url: "https://bacho-iliya.bg",
    siteName: "Бачо Илия",
    title: "Бачо Илия - Революцията на истинския вкус",
    description: "Присъедини се към революцията на истинския български вкус! Автентични млечни продукти и традиционни деликатеси.",
    images: [
      {
        url: "/logo/logo.png",
        width: 1200,
        height: 630,
        alt: "Бачо Илия Logo",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Бачо Илия - Революцията на истинския вкус",
    description: "Присъедини се към революцията на истинския български вкус!",
    images: ["/logo/logo.png"],
    creator: "@BachoIliya",
  },
  verification: {
    google: "google-site-verification-code-here",
  },
  alternates: {
    canonical: "https://bacho-iliya.bg",
    languages: {
      'bg-BG': 'https://bacho-iliya.bg',
    },
  },
  category: "food",
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#8B5A3C" },
    { media: "(prefers-color-scheme: dark)", color: "#8B5A3C" }
  ],
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="bg" className={`${inter.variable} ${playfair.variable}`}>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="icon" href="/icon.svg" type="image/svg+xml" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <link rel="manifest" href="/manifest.json" />
      </head>
      <body className={`${inter.className} antialiased`}>
        <div id="root">{children}</div>
      </body>
    </html>
  );
}