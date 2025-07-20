import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
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
    "революция на вкуса"
  ],
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
    card: "summary_large_image",
    title: "Бачо Илия - Революцията на истинския вкус",
    description: "Присъедини се към революцията на истинския български вкус!",
    images: ["/logo.png"],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="bg">
      <body>{children}</body>
    </html>
  );
}