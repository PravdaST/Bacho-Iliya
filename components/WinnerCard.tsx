'use client';

interface Winner {
  entry_id: string;
  name: string;
  email: string;
  phone?: string;
  total_entries?: number;
  draw_position: number;
  isGuaranteed?: boolean;
}

interface WinnerCardProps {
  winner: Winner;
  isNew?: boolean;
}

export default function WinnerCard({ winner, isNew = false }: WinnerCardProps) {
  const isTop3 = winner.draw_position <= 3;

  return (
    <div
      className={`
        relative bg-white rounded-lg p-1.5 pl-8 md:p-2 md:pl-10 shadow-sm border
        transition-all duration-500
        ${isTop3 ? 'border-[#DAA520] bg-gradient-to-r from-white to-amber-50' : 'border-[#F5E6D3]'}
        ${isNew ? 'animate-fade-in-up ring-1 md:ring-2 ring-[#DAA520] ring-offset-1' : ''}
      `}
    >
      {/* Position badge */}
      <div className={`absolute left-1 md:left-1.5 top-1/2 -translate-y-1/2 w-6 h-6 md:w-7 md:h-7 rounded-full flex items-center justify-center shadow-md ${isTop3 ? 'bg-gradient-to-br from-[#DAA520] to-[#B8860B]' : 'bg-[#8B4513]'}`}>
        <span className="text-white font-bold text-xs md:text-sm">{winner.draw_position}</span>
      </div>

      {/* Winner info */}
      <div>
        <div className="flex items-center justify-between gap-1">
          <h3 className={`font-bold font-['Amatic_SC'] text-base md:text-xl truncate ${isTop3 ? 'text-[#DAA520]' : 'text-[#2D1810]'}`}>
            {winner.name}
          </h3>
          {winner.total_entries && (
            <span className={`text-[9px] md:text-xs font-semibold shrink-0 ${isTop3 ? 'text-[#DAA520]' : 'text-[#8B4513]'}`}>{winner.total_entries} бил.</span>
          )}
        </div>

        {/* Prize items - всички продукти с x5 */}
        <div className="flex flex-wrap gap-0.5 md:gap-1 mt-0.5 md:mt-1">
          <span className="px-1 py-0.5 md:px-1.5 bg-[#F5E6D3] rounded text-[8px] md:text-[10px]">Сирене x5</span>
          <span className="px-1 py-0.5 md:px-1.5 bg-[#F5E6D3] rounded text-[8px] md:text-[10px]">Кашкавал x5</span>
          <span className="px-1 py-0.5 md:px-1.5 bg-[#F5E6D3] rounded text-[8px] md:text-[10px]">Мляко x5</span>
          <span className="px-1 py-0.5 md:px-1.5 bg-[#F5E6D3] rounded text-[8px] md:text-[10px]">Айрян x5</span>
          <span className="px-1 py-0.5 md:px-1.5 bg-[#F5E6D3] rounded text-[8px] md:text-[10px]">Прот. мляко x5</span>
          <span className="px-1 py-0.5 md:px-1.5 bg-[#F5E6D3] rounded text-[8px] md:text-[10px]">Сметана x5</span>
        </div>
      </div>
    </div>
  );
}
