'use client';

import { useState, useEffect, useCallback } from 'react';
import confetti from 'canvas-confetti';

interface WinnerDrumProps {
  names: string[];
  isSpinning: boolean;
  winner: string | null;
  onSpinComplete: () => void;
}

// Fire confetti celebration
const fireConfetti = () => {
  const duration = 3000;
  const end = Date.now() + duration;

  const colors = ['#8B4513', '#DAA520', '#F5E6D3', '#FFD700', '#FFA500'];

  (function frame() {
    confetti({
      particleCount: 5,
      angle: 60,
      spread: 55,
      origin: { x: 0, y: 0.7 },
      colors: colors,
    });
    confetti({
      particleCount: 5,
      angle: 120,
      spread: 55,
      origin: { x: 1, y: 0.7 },
      colors: colors,
    });

    if (Date.now() < end) {
      requestAnimationFrame(frame);
    }
  })();

  // Big burst in the center
  setTimeout(() => {
    confetti({
      particleCount: 100,
      spread: 100,
      origin: { x: 0.5, y: 0.5 },
      colors: colors,
    });
  }, 300);
};

export default function WinnerDrum({
  names,
  isSpinning,
  winner,
  onSpinComplete,
}: WinnerDrumProps) {
  const [displayedNames, setDisplayedNames] = useState<string[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showWinner, setShowWinner] = useState(false);

  // Generate random names for animation
  const getRandomNames = useCallback(() => {
    const shuffled = [...names].sort(() => Math.random() - 0.5);
    return shuffled.slice(0, 5);
  }, [names]);

  useEffect(() => {
    if (!isSpinning) {
      if (winner) {
        setDisplayedNames([winner]);
        setShowWinner(true);
      }
      return;
    }

    setShowWinner(false);
    setDisplayedNames(getRandomNames());

    let speed = 50;
    let iteration = 0;
    const maxIterations = 60;

    const spin = () => {
      iteration++;

      if (iteration > maxIterations * 0.6) {
        speed = Math.min(speed * 1.15, 400);
      }

      setDisplayedNames(getRandomNames());
      setCurrentIndex((prev) => (prev + 1) % 5);

      if (iteration < maxIterations) {
        setTimeout(spin, speed);
      } else {
        if (winner) {
          setDisplayedNames([winner]);
          setShowWinner(true);
          // Fire confetti when winner is revealed
          fireConfetti();
        }
        onSpinComplete();
      }
    };

    const timeout = setTimeout(spin, speed);
    return () => clearTimeout(timeout);
  }, [isSpinning, winner, names, getRandomNames, onSpinComplete]);

  return (
    <div className="relative">
      {/* Vintage frame decoration */}
      <div className="absolute -inset-4 border-4 border-[#8B4513] rounded-xl opacity-30" />
      <div className="absolute -inset-2 border-2 border-[#DAA520] rounded-lg opacity-50" />

      {/* Main drum container */}
      <div
        className={`
          relative bg-gradient-to-b from-[#F5E6D3] to-[#E8D5C4]
          rounded-lg p-4 md:p-8 min-h-[180px] md:min-h-[200px]
          shadow-[inset_0_2px_10px_rgba(0,0,0,0.1)]
          border-2 border-[#8B4513]
          ${showWinner ? 'winner-glow' : ''}
        `}
      >
        {/* Spinning names */}
        <div className="relative h-[140px] md:h-[120px] flex items-center justify-center overflow-hidden">
          {isSpinning ? (
            <div className="flex flex-col items-center gap-1 md:gap-2">
              {displayedNames.map((name, idx) => (
                <div
                  key={`${name}-${idx}`}
                  className={`
                    text-lg md:text-2xl font-bold text-[#2D1810] transition-all duration-100
                    ${idx === 2 ? 'text-xl md:text-3xl text-[#8B4513] scale-110' : 'opacity-50 blur-[1px]'}
                  `}
                  style={{
                    transform: `translateY(${(idx - 2) * 25}px)`,
                  }}
                >
                  {name}
                </div>
              ))}
            </div>
          ) : showWinner ? (
            <div className="text-center winner-reveal px-2">
              <div className="text-3xl md:text-5xl font-bold text-[#8B4513] font-['Amatic_SC'] winner-name break-words">
                {winner}
              </div>
              <div className="text-[#DAA520] text-lg md:text-xl mt-2 font-bold winner-label">
                ПОБЕДИТЕЛ!
              </div>
            </div>
          ) : (
            <div className="text-xl md:text-2xl text-[#8B4513] opacity-50 font-['Amatic_SC'] text-center px-2">
              Натисни бутона за теглене...
            </div>
          )}
        </div>

      </div>

      <style jsx>{`
        .winner-glow {
          animation: glow 1.5s ease-in-out infinite alternate;
          box-shadow: 0 0 20px rgba(218, 165, 32, 0.5);
        }

        @keyframes glow {
          from {
            box-shadow: 0 0 20px rgba(218, 165, 32, 0.3), 0 0 40px rgba(139, 69, 19, 0.2);
          }
          to {
            box-shadow: 0 0 30px rgba(218, 165, 32, 0.6), 0 0 60px rgba(139, 69, 19, 0.4);
          }
        }

        .winner-reveal {
          animation: revealWinner 0.8s ease-out;
        }

        @keyframes revealWinner {
          0% {
            transform: scale(0.5);
            opacity: 0;
          }
          50% {
            transform: scale(1.2);
          }
          100% {
            transform: scale(1);
            opacity: 1;
          }
        }

        .winner-name {
          animation: pulseGold 2s ease-in-out infinite;
        }

        @keyframes pulseGold {
          0%, 100% {
            text-shadow: 0 0 10px rgba(218, 165, 32, 0.5);
          }
          50% {
            text-shadow: 0 0 20px rgba(218, 165, 32, 0.8), 0 0 30px rgba(218, 165, 32, 0.4);
          }
        }

        .winner-label {
          animation: bounceIn 0.6s ease-out 0.3s both;
        }

        @keyframes bounceIn {
          0% {
            transform: translateY(20px);
            opacity: 0;
          }
          60% {
            transform: translateY(-5px);
          }
          100% {
            transform: translateY(0);
            opacity: 1;
          }
        }

      `}</style>
    </div>
  );
}
