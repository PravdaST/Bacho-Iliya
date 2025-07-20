import HeroSection from "@/components/HeroSection";
import QuizSection from "@/components/QuizSection";
import AboutSection from "@/components/AboutSection";
import RecipesSection from "@/components/RecipesSection";
import ProductsSection from "@/components/ProductsSection";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <div className="min-h-screen">
      <HeroSection />
      <QuizSection />
      <AboutSection />
      <RecipesSection />
      <ProductsSection />
      <Footer />
    </div>
  );
}