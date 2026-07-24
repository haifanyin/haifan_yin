'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowUp } from 'lucide-react'
export default function BackToTop() {
  const [visible, setVisible] = useState(false)
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    const handleScroll = () => {
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight
      const currentProgress = totalHeight > 0 ? (window.scrollY / totalHeight) : 0
      setProgress(currentProgress)
      setVisible(window.scrollY > 400)
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const circumference = 2 * Math.PI * 16
  const strokeDashoffset = circumference - progress * circumference

  return (
    <AnimatePresence>
      {visible && (
        <motion.button
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.8 }}
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="fixed bottom-20 md:bottom-6 right-6 z-40 w-11 h-11 rounded-full bg-background border border-border/60 shadow-lg hover:shadow-xl transition-shadow flex items-center justify-center"
          title="Back to top"
        >
          <svg className="absolute inset-0 w-full h-full -rotate-90" viewBox="0 0 44 44">
            <defs>
              <linearGradient id="backToTopGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" style={{ stopColor: 'var(--back-to-top-stop1)' }} />
                <stop offset="100%" style={{ stopColor: 'var(--back-to-top-stop2)' }} />
              </linearGradient>
            </defs>
            <circle cx="22" cy="22" r="16" fill="none" stroke="oklch(0.90 0.01 240)" strokeWidth="2.5" className="dark:stroke-[oklch(0.25_0.01_260)]" />
            <circle
              cx="22" cy="22" r="16" fill="none"
              stroke="url(#backToTopGradient)"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeDasharray={circumference}
              strokeDashoffset={strokeDashoffset}
              className="transition-[stroke-dashoffset] duration-150"
            />
          </svg>
          <ArrowUp className="w-4 h-4 text-foreground/70 relative z-10" />
        </motion.button>
      )}
    </AnimatePresence>
  )
}
