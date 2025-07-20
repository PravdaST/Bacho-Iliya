import { Metadata } from "next";
import Header from "@/components/ui/header";
import HeroSection from "@/components/ui/hero-section";
import QuizSection from "@/components/ui/quiz-section";
import AboutSection from "@/components/ui/about-section";
import RecipesSection from "@/components/ui/recipes-section";
import ProductsSection from "@/components/ui/products-section";
import Footer from "@/components/ui/footer";

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
  openGraph: {
    title: "Бачо Илия - Революцията на истинския вкус",
    description: "Присъедини се към революцията на истинския български вкус!",
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
  },
  alternates: {
    canonical: "https://bacho-iliya.bg",
  },
};

export default function HomePage() {
  return (
    <main className="min-h-screen bg-cream">
      <Header />
      <HeroSection />
      <QuizSection />
      <AboutSection />
      <RecipesSection />
      <ProductsSection />
      <Footer />
    </main>
  );
}