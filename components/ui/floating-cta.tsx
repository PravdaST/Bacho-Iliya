"use client"

import { motion } from "framer-motion"
import { ArrowUp, MessageCircle, Phone } from "lucide-react"
import { Button } from "./button"

export default function FloatingCTA() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const scrollToQuiz = () => {
    const quizSection = document.getElementById('quiz')
    if (quizSection) {
      quizSection.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col gap-3">
      {/* Scroll to Top Button */}
      <motion.div
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.5 }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
      >
        <Button
          onClick={scrollToTop}
          size="icon"
          className="bg-brand-red hover:bg-red-700 text-white rounded-full w-12 h-12 shadow-lg"
        >
          <ArrowUp className="h-5 w-5" />
        </Button>
      </motion.div>

      {/* Quiz CTA Button */}
      <motion.div
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.7 }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
      >
        <Button
          onClick={scrollToQuiz}
          size="icon"
          className="bg-brand-red hover:bg-red-700 text-white rounded-full w-12 h-12 shadow-lg"
        >
          <MessageCircle className="h-5 w-5" />
        </Button>
      </motion.div>

      {/* Contact Button */}
      <motion.div
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.9 }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
      >
        <Button
          size="icon"
          className="bg-brand-red hover:bg-red-700 text-white rounded-full w-12 h-12 shadow-lg"
        >
          <Phone className="h-5 w-5" />
        </Button>
      </motion.div>
    </div>
  )
}