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
    <div className="w-full mb-8">
      {/* Communist-Era Official Document / Raffle Ticket */}
      <div className="relative bg-old-paper border-4 border-walnut p-6 shadow-xl">
        {/* Document Header */}
        <div className="text-center mb-6 pb-4 border-b-2 border-dashed border-walnut/30">
          <div className="flex items-center justify-center gap-3 mb-2">
            <div className="text-bulgarian-red text-2xl">★</div>
            <p className="font-mono text-xs uppercase tracking-widest text-walnut font-bold">
              ФОРМУЛЯР ЗА УЧАСТИЕ
            </p>
            <div className="text-bulgarian-red text-2xl">★</div>
          </div>
          <p className="font-mono text-xs text-walnut/60">
            №{documentNumber}
          </p>
        </div>

        {/* Perforated Left Edge */}
        <div className="absolute left-0 top-0 bottom-0 w-4 flex flex-col justify-around py-4">
          {[...Array(12)].map((_, i) => (
            <div key={i} className="w-2 h-2 bg-walnut rounded-full ml-1" />
          ))}
        </div>

        {/* Perforated Right Edge */}
        <div className="absolute right-0 top-0 bottom-0 w-4 flex flex-col justify-around py-4">
          {[...Array(12)].map((_, i) => (
            <div key={i} className="w-2 h-2 bg-walnut rounded-full mr-1" />
          ))}
        </div>

        {/* Steps Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
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
                <div className={`
                  relative bg-white border-2 p-4 transition-all
                  ${isCurrent ? 'border-bulgarian-red shadow-lg' : 'border-walnut/30'}
                  ${isPending ? 'opacity-50' : 'opacity-100'}
                `}>
                  {/* Step Label */}
                  <div className="text-center">
                    <p className="font-mono text-sm text-walnut font-bold tracking-wide">
                      {step.labelBg}
                    </p>
                  </div>

                  {/* Completed Stamp */}
                  {isCompleted && (
                    <motion.div
                      className="absolute -top-2 -right-2"
                      initial={{ scale: 0, rotate: -45 }}
                      animate={{ scale: 1, rotate: 12 }}
                      transition={{ type: "spring", stiffness: 200 }}
                    >
                      <div className="w-12 h-12 rounded-full border-3 border-bulgarian-red bg-white flex items-center justify-center">
                        <svg className="w-6 h-6 text-bulgarian-red" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
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
        <div className="text-center pt-4 border-t-2 border-dashed border-walnut/30">
          <p className="font-mono text-sm text-walnut">
            <span className="font-bold text-bulgarian-red">{steps[currentStep - 1]?.label}</span>
            {currentStep < totalSteps && ' — Моля, продължете'}
            {currentStep === totalSteps && ' — Участието завършено!'}
          </p>
        </div>

        {/* Vintage Paper Texture Overlay */}
        <div className="absolute inset-0 bg-vintage-paper opacity-20 pointer-events-none" />

        {/* Official Seal (Bottom Right) */}
        <div className="absolute bottom-4 right-8 opacity-20">
          <div className="w-16 h-16 rounded-full border-4 border-bulgarian-red flex items-center justify-center">
            <div className="text-bulgarian-red text-2xl">★</div>
          </div>
        </div>
      </div>
    </div>
  );
}
