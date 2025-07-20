"use client";

import { ChevronDown } from "lucide-react";

export default function HeroSection() {
  const scrollToQuiz = () => {
    const quizElement = document.getElementById('quiz');
    if (quizElement) {
      quizElement.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background with traditional Bulgarian dairy farm imagery */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `linear-gradient(rgba(43, 30, 23, 0.7), rgba(43, 30, 23, 0.5)), url('https://images.unsplash.com/photo-1500595046743-cd271d694d30?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&h=1080')`
        }}
      />
      
      <div className="relative z-10 text-center text-cream px-4 max-w-5xl mx-auto">
        <h1 className="font-playfair text-6xl md:text-8xl font-bold mb-8 leading-tight revolution-text">
          Революцията на<br />
          истинския вкус<br />
          <span className="text-warm-beige">започна.</span>
        </h1>
        <p className="text-2xl md:text-3xl mb-16 font-semibold revolution-text">
          Време е да избереш страна.
        </p>
        <button 
          onClick={scrollToQuiz}
          className="animate-bounce hover:animate-none transition-all duration-300"
          aria-label="Scroll to quiz section"
        >
          <ChevronDown size={60} className="text-warm-beige hover:text-cream" />
        </button>
      </div>
    </section>
  );
}