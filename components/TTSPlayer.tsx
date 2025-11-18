'use client';

import { useState, useEffect, useCallback } from 'react';
import { PlayIcon, PauseIcon, StopIcon } from '@/components/ui/Icon'; // Assuming you have these icons

interface TTSPlayerProps {
  text: string;
}

export default function TTSPlayer({ text }: TTSPlayerProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [utterance, setUtterance] = useState<SpeechSynthesisUtterance | null>(null);
  const [selectedVoice, setSelectedVoice] = useState<SpeechSynthesisVoice | null>(null);
  const [voices, setVoices] = useState<SpeechSynthesisVoice[]>([]);

  // Get available voices
  useEffect(() => {
    const getVoices = () => {
      const availableVoices = window.speechSynthesis.getVoices();
      setVoices(availableVoices);
      // Try to find a Bulgarian voice automatically
      const bgVoice = availableVoices.find(voice => voice.lang === 'bg-BG');
      if (bgVoice) {
        setSelectedVoice(bgVoice);
      } else if (availableVoices.length > 0) {
        setSelectedVoice(availableVoices[0]);
      }
    };

    // Voices are loaded asynchronously
    if (typeof window !== 'undefined' && window.speechSynthesis) {
      getVoices();
      window.speechSynthesis.onvoiceschanged = getVoices;
    }

    return () => {
      if (typeof window !== 'undefined' && window.speechSynthesis) {
        window.speechSynthesis.onvoiceschanged = null;
      }
    };
  }, []);

  useEffect(() => {
    if (typeof window === 'undefined' || !window.speechSynthesis) {
      return;
    }

    const ut = new SpeechSynthesisUtterance(text);
    if (selectedVoice) {
      ut.voice = selectedVoice;
    }
    ut.rate = 1;
    ut.pitch = 1;
    ut.onstart = () => {
      setIsPlaying(true);
      setIsPaused(false);
    };
    ut.onpause = () => {
      setIsPlaying(false);
      setIsPaused(true);
    };
    ut.onresume = () => {
      setIsPlaying(true);
      setIsPaused(false);
    };
    ut.onend = () => {
      setIsPlaying(false);
      setIsPaused(false);
    };
    setUtterance(ut);

    // Cleanup on component unmount
    return () => {
      window.speechSynthesis.cancel();
    };
  }, [text, selectedVoice]);

  const handlePlay = useCallback(() => {
    if (!utterance || typeof window === 'undefined' || !window.speechSynthesis) return;

    if (isPaused) {
      console.log('Resuming speech...');
      window.speechSynthesis.resume();
    } else {
      console.log('Starting speech...');
      window.speechSynthesis.cancel(); // Cancel any previous speech
      window.speechSynthesis.speak(utterance);
    }
  }, [utterance, isPaused]);

  const handlePause = useCallback(() => {
    if (typeof window === 'undefined' || !window.speechSynthesis) return;
    console.log('Pausing speech...');
    window.speechSynthesis.pause();
  }, []);

  const handleStop = useCallback(() => {
    if (typeof window === 'undefined' || !window.speechSynthesis) return;
    console.log('Stopping speech...');
    setIsPlaying(false);
    setIsPaused(false);
    window.speechSynthesis.cancel();
  }, []);

  const handleVoiceChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedVoiceName = event.target.value;
    const voice = voices.find(v => v.name === selectedVoiceName);
    if (voice) {
      setSelectedVoice(voice);
      // If playing, stop and restart with new voice
      if (isPlaying || isPaused) {
        handleStop();
      }
    }
  };
  
  // Don't render the player if speech synthesis is not supported
  if (typeof window === 'undefined' || !window.speechSynthesis) {
    return null;
  }

  return (
    <div className="my-6 p-4 bg-gray-50 border border-gray-200 rounded-lg flex items-center gap-4 shadow-sm">
      <div className="flex items-center gap-2">
        {!isPlaying && (
          <button
            onClick={handlePlay}
            title={isPaused ? "Продължи" : "Пусни"}
            className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors disabled:bg-gray-400"
            disabled={!utterance}
          >
            <PlayIcon className="w-5 h-5" />
            <span>{isPaused ? "Продължи" : "Чуй статията"}</span>
          </button>
        )}

        {isPlaying && (
          <button
            onClick={handlePause}
            title="Пауза"
            className="flex items-center gap-2 px-4 py-2 bg-yellow-500 text-white rounded-lg hover:bg-yellow-600 transition-colors"
          >
            <PauseIcon className="w-5 h-5" />
            <span>Пауза</span>
          </button>
        )}

        <button
          onClick={handleStop}
          title="Спри"
          className="flex items-center gap-2 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors disabled:bg-gray-300"
          disabled={!isPlaying && !isPaused}
        >
          <StopIcon className="w-5 h-5" />
          <span>Спри</span>
        </button>
      </div>
      
      <div className="flex-grow">
        <select 
          value={selectedVoice?.name || ''} 
          onChange={handleVoiceChange}
          className="w-full p-2 border border-gray-300 rounded-lg bg-white text-sm"
          disabled={voices.length === 0}
        >
          {voices.length > 0 ? (
            voices
              .filter(v => v.lang.startsWith('bg') || v.lang.startsWith('en')) // Filter for BG and EN voices
              .map(voice => (
                <option key={voice.name} value={voice.name}>
                  {voice.name} ({voice.lang})
                </option>
              ))
          ) : (
            <option>Зареждане на гласове...</option>
          )}
        </select>
      </div>
    </div>
  );
}
