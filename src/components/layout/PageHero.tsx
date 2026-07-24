'use client'

import { motion } from 'framer-motion'
import { pageInfoMap } from '@/lib/constants'
import type { PageName } from '@/types'
export default function PageHero({ page }: { page: Exclude<PageName, 'home'> }) {
  const info = pageInfoMap[page]
  return (
    <div className="page-hero-gradient relative overflow-hidden pt-16 md:pt-20">
      {/* Floating Orbs */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden" aria-hidden="true">
        <div className="hero-orb-1 absolute top-[10%] left-[5%] w-[200px] h-[200px] rounded-full bg-primary/5 blur-3xl" />
        <div className="hero-orb-2 absolute bottom-[10%] right-[5%] w-[300px] h-[300px] rounded-full bg-primary/3 blur-3xl" />
        <div className="hero-orb-3 absolute top-[40%] left-[50%] w-[150px] h-[150px] rounded-full bg-accent/4 blur-3xl" />
      </div>
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-3 pb-0 md:pt-4 md:pb-0 min-w-0">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
          className="flex items-center gap-3 mb-1"
        >
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[oklch(0.45_0.12_260)] to-[oklch(0.35_0.08_220)] flex items-center justify-center shadow-sm">
            <info.icon className="w-5 h-5 text-white" />
          </div>
          <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold tracking-tight gradient-text leading-tight">
            {info.title}
          </h1>
        </motion.div>
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: 'easeOut', delay: 0.1 }}
          className="text-muted-foreground text-sm md:text-base max-w-2xl leading-relaxed md:ml-16"
        >
          {info.subtitle}
        </motion.p>
        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 0.6, ease: 'easeOut', delay: 0.2 }}
          className="decorative-line w-20 mt-2 mb-3 md:ml-16"
        />
      </div>
    </div>
  )
}
