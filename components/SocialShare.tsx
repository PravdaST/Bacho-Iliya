"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Share2, 
  Facebook, 
  Twitter, 
  Linkedin,
  Mail,
  Copy,
  Check,
  MessageCircle,
  Send
} from "lucide-react";

interface SocialShareProps {
  url: string;
  title: string;
  description: string;
  hashtags?: string[];
  className?: string;
  onShare?: (platform: string) => void; // Analytics callback
}

export default function SocialShare({
  url,
  title,
  description,
  hashtags = [],
  className = "",
  onShare,
}: SocialShareProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [copied, setCopied] = useState(false);

  // Encode for URLs
  const encodedUrl = encodeURIComponent(url);
  const encodedTitle = encodeURIComponent(title);
  const encodedDescription = encodeURIComponent(description);
  const hashtagString = hashtags.map(tag => `#${tag}`).join(' ');

  // Pre-filled Bulgarian messages for each platform
  const messages = {
    whatsapp: `🧀 ${title}\n\n${description}\n\n${url}\n\n${hashtagString}`,
    viber: `🧀 ${title}\n\n${description}\n\n${url}`,
    telegram: `🧀 ${title}\n\n${description}\n\n${url}\n\n${hashtagString}`,
    facebook: `${title}\n\n${description}`,
    twitter: `🧀 ${title}\n\n${hashtagString}`,
    linkedin: `${title}\n\n${description}`,
    email: {
      subject: title,
      body: `${description}\n\nВиж повече тук: ${url}`
    }
  };

  // Share URLs for each platform
  const shareUrls = {
    whatsapp: `https://wa.me/?text=${encodeURIComponent(messages.whatsapp)}`,
    viber: `viber://forward?text=${encodeURIComponent(messages.viber)}`,
    telegram: `https://t.me/share/url?url=${encodedUrl}&text=${encodeURIComponent(messages.telegram)}`,
    facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}&quote=${encodeURIComponent(messages.facebook)}`,
    twitter: `https://twitter.com/intent/tweet?url=${encodedUrl}&text=${encodeURIComponent(messages.twitter)}`,
    linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`,
    email: `mailto:?subject=${encodeURIComponent(messages.email.subject)}&body=${encodeURIComponent(messages.email.body)}`,
  };

  const handleShare = (platform: string, shareUrl: string) => {
    // Track share event
    if (onShare) {
      onShare(platform);
    }

    // Open share URL
    window.open(shareUrl, '_blank', 'width=600,height=400');
    setIsOpen(false);
  };

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      
      if (onShare) {
        onShare('copy-link');
      }

      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  const socialButtons = [
    {
      name: 'WhatsApp',
      icon: MessageCircle,
      color: 'bg-[#25D366] hover:bg-[#128C7E]',
      url: shareUrls.whatsapp,
    },
    {
      name: 'Viber',
      icon: MessageCircle,
      color: 'bg-[#7360F2] hover:bg-[#665CAC]',
      url: shareUrls.viber,
    },
    {
      name: 'Telegram',
      icon: Send,
      color: 'bg-[#0088cc] hover:bg-[#006699]',
      url: shareUrls.telegram,
    },
    {
      name: 'Facebook',
      icon: Facebook,
      color: 'bg-[#1877F2] hover:bg-[#145dbf]',
      url: shareUrls.facebook,
    },
    {
      name: 'Twitter',
      icon: Twitter,
      color: 'bg-[#1DA1F2] hover:bg-[#1a8cd8]',
      url: shareUrls.twitter,
    },
    {
      name: 'LinkedIn',
      icon: Linkedin,
      color: 'bg-[#0A66C2] hover:bg-[#004182]',
      url: shareUrls.linkedin,
    },
    {
      name: 'Email',
      icon: Mail,
      color: 'bg-walnut hover:bg-walnut/80',
      url: shareUrls.email,
    },
  ];

  return (
    <div className={`relative ${className}`}>
      {/* Main Share Button */}
      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 bg-bulgarian-red text-white px-6 py-3 font-handwritten text-sm tracking-wider border-2 border-walnut/30 shadow-lg hover:bg-walnut transition-colors duration-300"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        <Share2 className="w-4 h-4" />
        СПОДЕЛИ
      </motion.button>

      {/* Share Options Dropdown */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              className="fixed inset-0 bg-black/20 z-40"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
            />

            {/* Share Menu */}
            <motion.div
              className="absolute top-full right-0 mt-2 bg-white border-2 border-walnut/30 shadow-2xl z-50 min-w-[280px]"
              initial={{ opacity: 0, y: -10, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -10, scale: 0.95 }}
              transition={{ duration: 0.2 }}
            >
              {/* Vintage paper texture */}
              <div className="absolute inset-0 bg-vintage-paper opacity-30 pointer-events-none" />

              <div className="relative p-4">
                {/* Header */}
                <div className="mb-4 pb-3 border-b-2 border-walnut/20">
                  <h3 className="font-handwritten text-2xl text-walnut">
                    Сподели с приятели
                  </h3>
                  <p className="font-handwritten text-xs text-walnut/60 mt-1">
                    Разпространи добрата новина!
                  </p>
                </div>

                {/* Social Buttons Grid */}
                <div className="grid grid-cols-2 gap-2 mb-3">
                  {socialButtons.map((social) => {
                    const Icon = social.icon;
                    return (
                      <motion.button
                        key={social.name}
                        onClick={() => handleShare(social.name.toLowerCase(), social.url)}
                        className={`${social.color} text-white px-4 py-3 flex items-center gap-2 font-handwritten text-xs tracking-wider transition-all duration-200`}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <Icon className="w-4 h-4" />
                        {social.name}
                      </motion.button>
                    );
                  })}
                </div>

                {/* Copy Link Button */}
                <motion.button
                  onClick={handleCopyLink}
                  className="w-full bg-old-paper border-2 border-walnut/30 text-walnut px-4 py-3 flex items-center justify-center gap-2 font-handwritten text-xs tracking-wider hover:bg-sunflower/20 transition-colors duration-200"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  {copied ? (
                    <>
                      <Check className="w-4 h-4 text-bulgarian-red" />
                      КОПИРАНО!
                    </>
                  ) : (
                    <>
                      <Copy className="w-4 h-4" />
                      КОПИРАЙ ЛИНК
                    </>
                  )}
                </motion.button>

                {/* Decorative element */}
                <div className="absolute -top-1 left-6 w-16 h-3 bg-bulgarian-red/40 border-l border-r border-bulgarian-red/60" />
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
