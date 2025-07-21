"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useState } from "react";
import dynamic from 'next/dynamic';
import Header from "@/components/ui/header";

// Dynamic imports for components that might use window
const HeroSection = dynamic(() => import("@/components/ui/hero-section"), {
  ssr: false
});
const QuizSection = dynamic(() => import("@/components/ui/quiz-section"), {
  ssr: false
});
const AboutSection = dynamic(() => import("@/components/ui/about-section"), {
  ssr: false
});
const RecipesSection = dynamic(() => import("@/components/ui/recipes-section"), {
  ssr: false
});
const ProductsSection = dynamic(() => import("@/components/ui/products-section"), {
  ssr: false
});
const Footer = dynamic(() => import("@/components/ui/footer"), {
  ssr: false
});
const FloatingCTA = dynamic(() => import("@/components/ui/floating-cta"), {
  ssr: false
});
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