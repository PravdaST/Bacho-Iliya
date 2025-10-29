'use client';

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';

interface OptimizedVideoProps {
  mobileSrc?: string;
  desktopSrc: string;
  posterSrc?: string;
  className?: string;
  style?: React.CSSProperties;
}

export default function OptimizedVideo({
  mobileSrc,
  desktopSrc,
  posterSrc,
  className = '',
  style,
}: OptimizedVideoProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [shouldLoad, setShouldLoad] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  // Detect mobile device
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);

    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Intersection Observer for lazy loading
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setShouldLoad(true);
            video.play().catch(() => {
              // Autoplay prevented, that's ok
            });
          } else {
            // Pause video when not visible to save battery/data
            video.pause();
          }
        });
      },
      {
        threshold: 0.25, // Load when 25% visible
        rootMargin: '50px', // Start loading slightly before visible
      }
    );

    observer.observe(video);

    return () => observer.disconnect();
  }, []);

  // Handle video loaded
  const handleLoadedData = () => {
    setIsLoaded(true);
  };

  const videoSrc = isMobile && mobileSrc ? mobileSrc : desktopSrc;

  return (
    <div className="relative h-full w-full">
      {/* Mobile: Static poster image only (save data & performance) */}
      {isMobile ? (
        <div className="absolute inset-0">
          <Image
            src={posterSrc || '/bacho-video-poster.webp'}
            alt="Бачо Илия традиция"
            fill
            className={`object-cover ${className}`}
            priority
            quality={85}
            sizes="100vw"
          />
        </div>
      ) : (
        <>
          {/* Desktop: Full video with lazy loading */}
          {/* Loading skeleton */}
          {!isLoaded && (
            <div className="from-vintage-cream to-parchment absolute inset-0 animate-pulse bg-gradient-to-br" />
          )}

          {/* Poster image fallback */}
          {posterSrc && !isLoaded && (
            <div className="absolute inset-0">
              <Image
                src={posterSrc}
                alt="Video background"
                fill
                className="object-cover"
                priority
                quality={50}
                unoptimized
              />
            </div>
          )}

          <video
            ref={videoRef}
            autoPlay
            loop
            muted
            playsInline
            preload="metadata"
            poster={posterSrc}
            onLoadedData={handleLoadedData}
            className={`${className} object-cover ${!isLoaded ? 'opacity-0' : 'opacity-100 transition-opacity duration-500'}`}
            style={style}
          >
            {shouldLoad && <source src={videoSrc} type="video/mp4" />}
            <p>Your browser doesn&apos;t support HTML5 video.</p>
          </video>
        </>
      )}
    </div>
  );
}
