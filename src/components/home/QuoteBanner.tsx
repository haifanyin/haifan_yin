'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Quote } from 'lucide-react'
import SectionWrapper from '@/components/layout/SectionWrapper'
export default function QuoteBanner() {
  const quotes = [
    { text: "When something is important enough, you do it even if the odds are not in your favor.", author: "Elon Musk" },
    { text: "Innovation is the ability to see change as an opportunity — not a threat.", author: "Steve Jobs" },
  ]
  const [currentQuote, setCurrentQuote] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentQuote(prev => (prev + 1) % quotes.length)
    }, 8000)
    return () => clearInterval(interval)
  }, [quotes.length])

  return (
    <SectionWrapper id="quote" className="relative overflow-hidden !py-4 md:!py-6">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentQuote}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.4 }}
          >
            <Quote className="w-5 h-5 text-primary/15 mx-auto mb-2" />
            <blockquote className="text-sm md:text-base font-light leading-relaxed text-foreground/70 italic">
              &ldquo;{quotes[currentQuote].text}&rdquo;
            </blockquote>
            <p className="text-xs text-muted-foreground mt-1.5">— {quotes[currentQuote].author}</p>

            {/* Navigation Dots */}
            <div className="flex justify-center gap-2 mt-3">
              {quotes.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setCurrentQuote(idx)}
                  className={`dot-indicator rounded-full ${
                    currentQuote === idx
                      ? 'w-6 h-2 bg-primary'
                      : 'w-2 h-2 bg-muted-foreground/30 hover:bg-muted-foreground/50'
                  }`}
                  aria-label={`Go to quote ${idx + 1}`}
                />
              ))}
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </SectionWrapper>
  )
}
