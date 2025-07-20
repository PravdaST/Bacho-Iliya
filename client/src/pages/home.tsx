import Header from "@/components/ui/header";
import HeroSection from "@/components/ui/hero-section";
import QuizSection from "@/components/ui/quiz-section";
import AboutSection from "@/components/ui/about-section";
import RecipesSection from "@/components/ui/recipes-section";
import ProductsSection from "@/components/ui/products-section";
import Footer from "@/components/ui/footer";
import FloatingCTA from "@/components/ui/floating-cta";

export default function Home() {
  return (
    <div className="min-h-screen">
      <Header />
      <HeroSection />
      <QuizSection />
      <AboutSection />
      <RecipesSection />
      <ProductsSection />
      <Footer />
      <FloatingCTA />
    </div>
  );
}
