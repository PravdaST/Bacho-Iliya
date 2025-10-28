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
    <motion.div
      className={`relative bg-old-paper border-2 border-dashed border-bulgarian-red ${
        isLarge ? 'p-4 md:p-6' : 'p-3 md:p-4'
      } overflow-hidden shadow-xl`}
      initial={{ scale: 0.9, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ duration: 0.5, type: 'spring' }}
    >
      {/* Perforation Holes - Left Side */}
      <div className="absolute left-0 top-0 bottom-0 w-6 flex flex-col justify-around py-3">
        {[...Array(isLarge ? 10 : 6)].map((_, i) => (
          <div
            key={i}
            className="w-2 h-2 bg-walnut/30 rounded-full ml-2 border border-walnut/20"
          />
        ))}
      </div>

      {/* Perforation Holes - Right Side */}
      <div className="absolute right-0 top-0 bottom-0 w-6 flex flex-col justify-around py-3">
        {[...Array(isLarge ? 10 : 6)].map((_, i) => (
          <div
            key={i}
            className="w-2 h-2 bg-walnut/30 rounded-full mr-2 border border-walnut/20"
          />
        ))}
      </div>

      {/* Vintage Paper Texture */}
      <div className="absolute inset-0 bg-vintage-paper opacity-40 pointer-events-none" />

      {/* Ticket Content */}
      <div className="relative z-10 text-center ml-4 mr-4">
        {/* Ticket Header */}
        <div className="mb-3 pb-3 border-b border-dashed border-bulgarian-red/50">
          <p className="font-handwritten text-base md:text-lg text-walnut/70 uppercase tracking-wide">
            Томболен билет
          </p>
          <p className="font-handwritten text-sm md:text-base text-walnut/60">№ {entryId}</p>
        </div>

        {/* Ticket Count - Main Feature */}
        <div className="my-4 md:my-6">
          <motion.div
            className="inline-flex items-center justify-center gap-3"
            animate={{
              scale: [1, 1.05, 1],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          >
            <span className="text-4xl md:text-6xl">🎟️</span>
            <div className="text-left">
              <motion.p
                className={`font-handwritten font-bold text-bulgarian-red ${
                  isLarge ? 'text-4xl md:text-6xl' : 'text-3xl md:text-5xl'
                }`}
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.3, type: 'spring', stiffness: 200 }}
              >
                {ticketCount}
              </motion.p>
              <p className="font-handwritten text-xl md:text-2xl text-walnut">
                {ticketCount === 1 ? 'билет' : 'билета'}
              </p>
            </div>
          </motion.div>
        </div>

        {/* Explanation */}
        <div className="mt-4 pt-3 border-t border-dashed border-bulgarian-red/50">
          <p className="font-handwritten text-base md:text-lg text-walnut leading-relaxed">
            {ticketCount === 1 ? (
              <>
                Имаш <strong className="text-bulgarian-red">1 билет</strong> от
                регистрация
              </>
            ) : (
              <>
                Всеки билет ти дава <strong className="text-bulgarian-red">1 участие</strong> в
                томболата
              </>
            )}
          </p>
          <p className="font-handwritten text-sm md:text-base text-walnut/70 mt-2">
            Покани приятели и получи <strong>+3 билета</strong> за всеки регистриран!
          </p>
        </div>

        {/* Stamp Effect */}
        <div className="absolute -bottom-4 -right-4 w-24 h-24 rounded-full bg-bulgarian-red/10 blur-lg opacity-60" />
        <div className="absolute -top-4 -left-4 w-20 h-20 rounded-full bg-sunflower/10 blur-lg opacity-50" />
      </div>
    </motion.div>
  );
}
