"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";

interface Video {
  id: string;
  src: string;
  thumbnail: string;
  title: string;
}

const videos: Video[] = [
  {
    id: "1",
    src: "/videos/testimonial-1.mp4",
    thumbnail: "/videos/thumbnails/testimonial-1.jpg",
    title: "Традиционно сирене от щастливи крави"
  },
  {
    id: "2",
    src: "/videos/testimonial-2.mp4",
    thumbnail: "/videos/thumbnails/testimonial-2.jpg",
    title: "Автентична баница с наши продукти"
  },
  {
    id: "3",
    src: "/videos/testimonial-3.mp4",
    thumbnail: "/videos/thumbnails/testimonial-3.jpg",
    title: "Семейни моменти с Бачо Илия"
  },
  {
    id: "4",
    src: "/videos/testimonial-4.mp4",
    thumbnail: "/videos/thumbnails/testimonial-4.jpg",
    title: "Кисело мляко по бабина рецепта"
  },
  {
    id: "5",
    src: "/videos/testimonial-5.mp4",
    thumbnail: "/videos/thumbnails/testimonial-5.jpg",
    title: "Качествен кашкавал от планината"
  },
  {
    id: "6",
    src: "/videos/testimonial-6.mp4",
    thumbnail: "/videos/thumbnails/testimonial-6.jpg",
    title: "Вкусът от детството с Бачо Илия"
  }
];

export default function VideoCarousel() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    const scrollContainer = scrollRef.current;
    if (!scrollContainer) return;

    let animationFrameId: number;
    let scrollPosition = 0;
    const scrollSpeed = 0.5; // pixels per frame

    const scroll = () => {
      if (!isHovered && scrollContainer) {
        scrollPosition += scrollSpeed;

        // Reset scroll when we've scrolled through all items
        const maxScroll = scrollContainer.scrollWidth / 2;
        if (scrollPosition >= maxScroll) {
          scrollPosition = 0;
        }

        scrollContainer.scrollLeft = scrollPosition;
      }
      animationFrameId = requestAnimationFrame(scroll);
    };

    animationFrameId = requestAnimationFrame(scroll);

    return () => {
      if (animationFrameId) {
        cancelAnimationFrame(animationFrameId);
      }
    };
  }, [isHovered]);

  // Duplicate videos for infinite scroll effect
  const duplicatedVideos = [...videos, ...videos];

  return (
    <section className="py-16 px-4 bg-gradient-to-br from-bulgarian-red to-bulgarian-red relative overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="font-display text-4xl md:text-5xl text-vintage-cream mb-4">
            Вижте Какво Споделят Нашите Клиенти
          </h2>
          <p className="text-xl text-vintage-cream/90 max-w-3xl mx-auto">
            Истински моменти с автентични български млечни продукти
          </p>
        </motion.div>

        <div
          ref={scrollRef}
          className="flex gap-6 overflow-x-hidden scroll-smooth"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {duplicatedVideos.map((video, index) => (
            <motion.div
              key={`${video.id}-${index}`}
              className="flex-shrink-0"
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ scale: 1.05 }}
            >
              <div className="bg-parchment border-4 border-traditional-brown rounded-2xl overflow-hidden shadow-vintage hover:shadow-vintage-lg transition-all duration-300 w-[280px] md:w-[320px]">
                {/* 9:16 Video Container */}
                <div className="relative" style={{ aspectRatio: '9/16' }}>
                  <video
                    className="w-full h-full object-cover"
                    poster={video.thumbnail}
                    controls
                    preload="metadata"
                    playsInline
                  >
                    <source src={video.src} type="video/mp4" />
                    Вашият браузър не поддържа видео тагове.
                  </video>

                  {/* Vintage Frame Effect */}
                  <div className="absolute inset-0 border-8 border-traditional-brown/20 pointer-events-none"></div>
                </div>

                {/* Video Title */}
                <div className="p-4 bg-vintage-cream border-t-2 border-traditional-brown">
                  <p className="text-center text-traditional-brown font-medium text-sm">
                    {video.title}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Decorative Elements */}
        <div className="absolute top-0 left-0 w-32 h-32 opacity-10">
          <svg viewBox="0 0 100 100" className="text-vintage-cream">
            <path d="M50,10 Q10,50 50,90 Q90,50 50,10" fill="currentColor" />
          </svg>
        </div>
        <div className="absolute bottom-0 right-0 w-32 h-32 opacity-10">
          <svg viewBox="0 0 100 100" className="text-vintage-cream">
            <path d="M50,10 Q10,50 50,90 Q90,50 50,10" fill="currentColor" />
          </svg>
        </div>
      </div>

      <style jsx>{`
        div::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </section>
  );
}
