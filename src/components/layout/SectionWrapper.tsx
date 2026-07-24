'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { staggerContainer } from '@/lib/constants'
export default function SectionWrapper({ id, children, className = '' }: { id: string; children: React.ReactNode; className?: string }) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-60px' })

  return (
    <motion.section
      id={id}
      ref={ref}
      initial="hidden"
      animate={isInView ? 'visible' : 'hidden'}
      variants={staggerContainer}
      className={`py-20 md:py-28 ${className}`}
    >
      {children}
    </motion.section>
  )
}
