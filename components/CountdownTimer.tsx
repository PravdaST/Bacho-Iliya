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
    <div className="bg-bulgarian-red p-3 text-white">
      <h3 className="mb-2 text-center text-sm font-bold sm:text-base">До раздаването остават:</h3>

      <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
        {timeUnits.map((unit, index) => (
          <div key={index} className="text-center">
            <div className="mb-1 rounded bg-white/20 p-2 backdrop-blur-sm">
              <div className="text-lg font-bold tabular-nums sm:text-xl">
                {unit.value.toString().padStart(2, '0')}
              </div>
            </div>
            <div className="text-[9px] font-medium opacity-90 sm:text-[10px]">
              {unit.value === 1 ? unit.labelSingle : unit.label}
            </div>
          </div>
        ))}
      </div>

      <p className="mt-2 text-center text-[10px] opacity-90 sm:text-xs">
        Печелившите ще бъдат обявени на{' '}
        {targetDate.toLocaleDateString('bg-BG', {
          day: 'numeric',
          month: 'long',
          year: 'numeric',
        })}
      </p>
    </div>
  );
}
