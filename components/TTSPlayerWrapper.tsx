'use client';

import dynamic from 'next/dynamic';

// Dynamic import for TTSPlayer to avoid SSR issues with window.speechSynthesis
const TTSPlayer = dynamic(() => import('@/components/TTSPlayer'), {
  ssr: false,
  loading: () => (
    <div className="my-6 p-4 bg-gray-50 border border-gray-200 rounded-lg flex items-center gap-4 shadow-sm">
      <div className="flex items-center gap-2 text-gray-600">
        <span className="text-sm">Зареждане на аудио плейър...</span>
      </div>
    </div>
  )
});

interface TTSPlayerWrapperProps {
  text: string;
}

export default function TTSPlayerWrapper({ text }: TTSPlayerWrapperProps) {
  return <TTSPlayer text={text} />;
}
