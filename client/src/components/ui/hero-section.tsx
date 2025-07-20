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
      {/* Background with Bulgarian countryside */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `linear-gradient(rgba(45, 80, 22, 0.6), rgba(139, 69, 19, 0.4)), url('https://images.unsplash.com/photo-1464207687429-7505649dae38?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&h=1080')`
        }}
      />
      
      <div className="relative z-10 text-center text-white px-4 max-w-4xl mx-auto">
        <h1 className="font-playfair text-5xl md:text-7xl font-bold mb-6 leading-tight">
          Революцията на<br />
          <span className="text-warm-beige">истинския вкус</span><br />
          започна.
        </h1>
        <p className="text-xl md:text-2xl mb-12 font-medium">
          Време е да избереш страна.
        </p>
        <button 
          onClick={scrollToQuiz}
          className="animate-bounce hover:animate-none transition-all"
        >
          <ChevronDown size={48} className="text-warm-beige" />
        </button>
      </div>
    </section>
  );
}
