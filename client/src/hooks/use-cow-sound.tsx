import { useEffect, useRef } from 'react';

export const useCowSound = () => {
  const audioContextRef = useRef<AudioContext | null>(null);
  const hasPlayedRef = useRef(false);

  const generateCowSound = () => {
    if (hasPlayedRef.current) return;
    
    try {
      // Check if user has interacted with the page (required for autoplay)
      const AudioContext = window.AudioContext || (window as any).webkitAudioContext;
      if (!AudioContext) return;

      const audioContext = new AudioContext();
      audioContextRef.current = audioContext;

      // Create a more realistic cow sound using multiple frequencies
      const now = audioContext.currentTime;
      const duration = 1.5; // 1.5 seconds

      // Main "Moo" frequency sweep
      const oscillator1 = audioContext.createOscillator();
      const gainNode1 = audioContext.createGain();
      
      oscillator1.connect(gainNode1);
      gainNode1.connect(audioContext.destination);
      
      // Start with a low frequency and sweep up slightly
      oscillator1.frequency.setValueAtTime(80, now);
      oscillator1.frequency.exponentialRampToValueAtTime(120, now + 0.3);
      oscillator1.frequency.exponentialRampToValueAtTime(90, now + duration);
      
      oscillator1.type = 'sawtooth'; // More natural sound
      
      // Volume envelope for natural "Moo" shape
      gainNode1.gain.setValueAtTime(0, now);
      gainNode1.gain.exponentialRampToValueAtTime(0.3, now + 0.1);
      gainNode1.gain.setValueAtTime(0.3, now + 0.5);
      gainNode1.gain.exponentialRampToValueAtTime(0.1, now + duration - 0.2);
      gainNode1.gain.exponentialRampToValueAtTime(0.001, now + duration);

      // Add harmonic for richer sound
      const oscillator2 = audioContext.createOscillator();
      const gainNode2 = audioContext.createGain();
      
      oscillator2.connect(gainNode2);
      gainNode2.connect(audioContext.destination);
      
      oscillator2.frequency.setValueAtTime(160, now);
      oscillator2.frequency.exponentialRampToValueAtTime(200, now + 0.3);
      oscillator2.frequency.exponentialRampToValueAtTime(150, now + duration);
      oscillator2.type = 'triangle';
      
      gainNode2.gain.setValueAtTime(0, now);
      gainNode2.gain.exponentialRampToValueAtTime(0.15, now + 0.1);
      gainNode2.gain.exponentialRampToValueAtTime(0.05, now + duration - 0.2);
      gainNode2.gain.exponentialRampToValueAtTime(0.001, now + duration);

      // Start the oscillators
      oscillator1.start(now);
      oscillator1.stop(now + duration);
      
      oscillator2.start(now);
      oscillator2.stop(now + duration);

      hasPlayedRef.current = true;
      
      // Store in localStorage to prevent replay on refresh
      localStorage.setItem('cowSoundPlayed', 'true');
      
    } catch (error) {
      console.log('Cow sound failed to play:', error);
    }
  };

  const playOnUserInteraction = () => {
    // Check if sound has already been played
    if (localStorage.getItem('cowSoundPlayed') === 'true' || hasPlayedRef.current) {
      return;
    }

    // Add a small delay to let the page load completely
    setTimeout(() => {
      generateCowSound();
    }, 800);
  };

  useEffect(() => {
    // Play sound after a delay when component mounts
    const timer = setTimeout(() => {
      playOnUserInteraction();
    }, 1000);

    // Also try to play on first user interaction
    const handleFirstInteraction = () => {
      playOnUserInteraction();
      document.removeEventListener('click', handleFirstInteraction);
      document.removeEventListener('keydown', handleFirstInteraction);
      document.removeEventListener('scroll', handleFirstInteraction);
    };

    document.addEventListener('click', handleFirstInteraction);
    document.addEventListener('keydown', handleFirstInteraction);
    document.addEventListener('scroll', handleFirstInteraction);

    return () => {
      clearTimeout(timer);
      document.removeEventListener('click', handleFirstInteraction);
      document.removeEventListener('keydown', handleFirstInteraction);
      document.removeEventListener('scroll', handleFirstInteraction);
      
      if (audioContextRef.current && audioContextRef.current.state !== 'closed') {
        audioContextRef.current.close();
      }
    };
  }, []);

  return null;
};