"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useState } from "react";
import Header from "@/components/ui/header";
import HeroSection from "@/components/ui/hero-section";
import QuizSection from "@/components/ui/quiz-section";
import AboutSection from "@/components/ui/about-section";
import RecipesSection from "@/components/ui/recipes-section";
import ProductsSection from "@/components/ui/products-section";
import Footer from "@/components/ui/footer";
import FloatingCTA from "@/components/ui/floating-cta";
import { Toaster } from "@/components/ui/toaster";

export default function HomePage() {
  const [queryClient] = useState(() => new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: 60 * 1000,
      },
    },
  }));

  return (
    <QueryClientProvider client={queryClient}>
      <main className="min-h-screen bg-cream">
        <Header />
        <HeroSection />
        <QuizSection />
        <AboutSection />
        <RecipesSection />
        <ProductsSection />
        <Footer />
        <FloatingCTA />
        <Toaster />
      </main>
    </QueryClientProvider>
  );
}