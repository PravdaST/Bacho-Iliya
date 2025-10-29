'use client';

import { motion } from 'framer-motion';

interface TicketCardProps {
  ticketCount: number;
  entryId: string;
  size?: 'small' | 'large';
}

export default function TicketCard({ ticketCount, entryId, size = 'large' }: TicketCardProps) {
  const isLarge = size === 'large';

  return (
    <div className="bg-old-paper border-bulgarian-red relative overflow-hidden border border-dashed p-3">
      {/* Perforation Holes - Left Side */}
      <div className="absolute top-0 bottom-0 left-0 flex w-4 flex-col justify-around py-2">
        {[...Array(8)].map((_, i) => (
          <div key={i} className="bg-walnut/30 ml-1.5 h-1.5 w-1.5 rounded-full" />
        ))}
      </div>

      {/* Perforation Holes - Right Side */}
      <div className="absolute top-0 right-0 bottom-0 flex w-4 flex-col justify-around py-2">
        {[...Array(8)].map((_, i) => (
          <div key={i} className="bg-walnut/30 mr-1.5 h-1.5 w-1.5 rounded-full" />
        ))}
      </div>

      {/* Ticket Content */}
      <div className="relative z-10 mx-3 text-center">
        {/* Ticket Header */}
        <div className="border-bulgarian-red/50 mb-2 border-b border-dashed pb-2">
          <p className="font-handwritten text-walnut/70 text-xs uppercase md:text-sm">
            Томболен билет № {entryId}
          </p>
        </div>

        {/* Ticket Count - Main Feature */}
        <div className="my-3">
          <div className="inline-flex items-center justify-center gap-2">
            <span className="text-2xl md:text-3xl">🎟️</span>
            <div className="text-left">
              <p className="font-handwritten text-bulgarian-red text-3xl font-bold md:text-4xl">
                {ticketCount}
              </p>
              <p className="font-handwritten text-walnut text-base md:text-lg">
                {ticketCount === 1 ? 'билет' : 'билета'}
              </p>
            </div>
          </div>
        </div>

        {/* Explanation */}
        <div className="border-bulgarian-red/50 mt-2 border-t border-dashed pt-2">
          <p className="font-handwritten text-walnut text-xs md:text-sm">
            {ticketCount === 1 ? (
              <>
                Имаш <strong className="text-bulgarian-red">1 билет</strong> от регистрация
              </>
            ) : (
              <>
                Всеки билет = <strong className="text-bulgarian-red">1 участие</strong> в томболата
              </>
            )}
          </p>
          <p className="font-handwritten text-walnut/70 mt-1 text-xs">
            Покани приятели → <strong>+3 билета</strong> всеки!
          </p>
        </div>
      </div>
    </div>
  );
}
