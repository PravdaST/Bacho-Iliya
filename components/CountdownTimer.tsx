'use client';

import { useState, useEffect } from 'react';

interface CountdownTimerProps {
  targetDate: Date;
}

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

export default function CountdownTimer({ targetDate }: CountdownTimerProps) {
  const [timeLeft, setTimeLeft] = useState<TimeLeft>({ days: 0, hours: 0, minutes: 0, seconds: 0 });

  useEffect(() => {
    const calculateTimeLeft = (): TimeLeft => {
      const difference = targetDate.getTime() - new Date().getTime();

      if (difference > 0) {
        return {
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((difference / 1000 / 60) % 60),
          seconds: Math.floor((difference / 1000) % 60),
        };
      }

      return { days: 0, hours: 0, minutes: 0, seconds: 0 };
    };

    // Initial calculation
    setTimeLeft(calculateTimeLeft());

    // Update every second
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearInterval(timer);
  }, [targetDate]);

  const timeUnits = [
    { value: timeLeft.days, label: 'Дни', labelSingle: 'Ден' },
    { value: timeLeft.hours, label: 'Часа', labelSingle: 'Час' },
    { value: timeLeft.minutes, label: 'Минути', labelSingle: 'Минута' },
    { value: timeLeft.seconds, label: 'Секунди', labelSingle: 'Секунда' },
  ];

  return (
    <div className="bg-bulgarian-red rounded-2xl p-3 sm:p-4 md:p-6 text-white shadow-xl">
      <h3 className="text-base sm:text-lg md:text-xl font-bold text-center mb-3 sm:mb-4">До раздаването остават:</h3>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 sm:gap-3">
        {timeUnits.map((unit, index) => (
          <div key={index} className="text-center">
            <div className="bg-white/20 backdrop-blur-sm rounded-xl p-2 sm:p-3 mb-1.5">
              <div className="text-xl sm:text-2xl md:text-3xl font-bold tabular-nums">
                {unit.value.toString().padStart(2, '0')}
              </div>
            </div>
            <div className="text-[10px] sm:text-xs font-medium opacity-90">
              {unit.value === 1 ? unit.labelSingle : unit.label}
            </div>
          </div>
        ))}
      </div>

      <p className="text-center mt-3 sm:mt-4 text-xs sm:text-sm opacity-90">
        Печелившите ще бъдат обявени на {targetDate.toLocaleDateString('bg-BG', {
          day: 'numeric',
          month: 'long',
          year: 'numeric'
        })}
      </p>
    </div>
  );
}
