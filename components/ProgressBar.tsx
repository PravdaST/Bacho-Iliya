'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

interface ProgressBarProps {
  currentStep: number;
  totalSteps: number;
}

export default function ProgressBar({ currentStep, totalSteps }: ProgressBarProps) {
  const [documentNumber, setDocumentNumber] = useState<string>('');

  useEffect(() => {
    setDocumentNumber(Math.random().toString(36).substring(2, 9).toUpperCase());
  }, []);
  const steps = [
    { number: 1, label: 'Продукти', labelBg: 'ПРОДУКТИ' },
    { number: 2, label: 'Регистрация', labelBg: 'РЕГИСТРАЦИЯ' },
    { number: 3, label: 'Задачи', labelBg: 'ЗАДАЧИ' },
    { number: 4, label: 'Готово!', labelBg: 'ГОТОВО!' },
  ];

  return (
    <div className="mb-8 w-full">
      {/* Communist-Era Official Document / Raffle Ticket */}
      <div className="bg-old-paper border-walnut relative border-4 p-6 shadow-xl">
        {/* Document Header */}
        <div className="border-walnut/30 mb-6 border-b-2 border-dashed pb-4 text-center">
          <div className="mb-2 flex items-center justify-center gap-3">
            <div className="text-bulgarian-red text-2xl">★</div>
            <p className="font-handwritten text-walnut text-xs font-bold tracking-widest uppercase">
              ФОРМУЛЯР ЗА УЧАСТИЕ
            </p>
            <div className="text-bulgarian-red text-2xl">★</div>
          </div>
          <p className="font-handwritten text-walnut/60 text-xs">№{documentNumber}</p>
        </div>

        {/* Perforated Left Edge */}
        <div className="absolute top-0 bottom-0 left-0 flex w-4 flex-col justify-around py-4">
          {[...Array(12)].map((_, i) => (
            <div key={i} className="bg-walnut ml-1 h-2 w-2 rounded-full" />
          ))}
        </div>

        {/* Perforated Right Edge */}
        <div className="absolute top-0 right-0 bottom-0 flex w-4 flex-col justify-around py-4">
          {[...Array(12)].map((_, i) => (
            <div key={i} className="bg-walnut mr-1 h-2 w-2 rounded-full" />
          ))}
        </div>

        {/* Steps Grid */}
        <div className="mb-4 grid grid-cols-2 gap-4 md:grid-cols-4">
          {steps.map((step) => {
            const isCompleted = step.number < currentStep;
            const isCurrent = step.number === currentStep;
            const isPending = step.number > currentStep;

            return (
              <motion.div
                key={step.number}
                className="relative"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: step.number * 0.1 }}
              >
                <div
                  className={`relative border-2 bg-white p-4 transition-all ${isCurrent ? 'border-bulgarian-red shadow-lg' : 'border-walnut/30'} ${isPending ? 'opacity-50' : 'opacity-100'} `}
                >
                  {/* Step Label */}
                  <div className="text-center">
                    <p className="font-handwritten text-walnut text-sm font-bold tracking-wide">
                      {step.labelBg}
                    </p>
                  </div>

                  {/* Completed Stamp */}
                  {isCompleted && (
                    <motion.div
                      className="absolute -top-2 -right-2"
                      initial={{ scale: 0, rotate: -45 }}
                      animate={{ scale: 1, rotate: 12 }}
                      transition={{ type: 'spring', stiffness: 200 }}
                    >
                      <div className="border-bulgarian-red flex h-12 w-12 items-center justify-center rounded-full border-3 bg-white">
                        <svg
                          className="text-bulgarian-red h-6 w-6"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={3}
                            d="M5 13l4 4L19 7"
                          />
                        </svg>
                      </div>
                    </motion.div>
                  )}
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Document Footer - Current Step Indicator */}
        <div className="border-walnut/30 border-t-2 border-dashed pt-4 text-center">
          <p className="font-handwritten text-walnut text-sm">
            <span className="text-bulgarian-red font-bold">{steps[currentStep - 1]?.label}</span>
            {currentStep < totalSteps && ' — Моля, продължете'}
            {currentStep === totalSteps && ' — Участието завършено!'}
          </p>
        </div>

        {/* Vintage Paper Texture Overlay */}
        <div className="bg-vintage-paper pointer-events-none absolute inset-0 opacity-20" />

        {/* Official Seal (Bottom Right) */}
        <div className="absolute right-8 bottom-4 opacity-20">
          <div className="border-bulgarian-red flex h-16 w-16 items-center justify-center rounded-full border-4">
            <div className="text-bulgarian-red text-2xl">★</div>
          </div>
        </div>
      </div>
    </div>
  );
}
