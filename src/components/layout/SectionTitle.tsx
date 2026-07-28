'use client'

import { motion } from 'framer-motion'
import { fadeInUp, accentLineMap } from '@/lib/constants'
export default function SectionTitle({ children, subtitle, accent }: { children: React.ReactNode; subtitle?: string; accent?: string }) {
  const accentClass = accent ? accentLineMap[accent] : null
  return (
    <motion.div variants={fadeInUp} className="mb-12 md:mb-16">
      <h2 className="text-3xl md:text-4xl lg:text-[2.75rem] font-bold tracking-tight gradient-text leading-tight">
        {children}
      </h2>
      <motion.div
        className={accentClass ? `${accentClass} w-20 mt-3 mb-2` : 'decorative-line w-20 mt-3 mb-2'}
        initial={{ scaleX: 0 }}
        animate={{ scaleX: 1 }}
        style={{ transformOrigin: 'left' }}
        transition={{ duration: 0.5, delay: 0.15, ease: 'easeOut' }}
      />
      {subtitle && (
        <p className="text-muted-foreground text-xs sm:text-sm md:text-base mt-3 max-w-2xl leading-relaxed">{subtitle}</p>
      )}
    </motion.div>
  )
}
