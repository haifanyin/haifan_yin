'use client'

import { motion } from 'framer-motion'
import PageHero from '@/components/layout/PageHero'
import StudentsSection from '@/components/team/StudentsSection'
import { professorInfo } from '@/lib/data'

export default function TeamPage() {
  return (
    <main>
      <PageHero page="team" />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6 pb-2">
        <motion.div
          variants={{ hidden: { opacity: 0, y: 30 }, visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } } }}
          initial="hidden" animate="visible"
          className="relative overflow-hidden rounded-xl border border-blue-200/60 dark:border-blue-800/30 bg-gradient-to-r from-blue-50 dark:from-blue-950/20 via-blue-100/50 dark:via-blue-900/10 to-blue-50/50 dark:to-blue-950/10 shadow-sm"
        >
          <div className="absolute left-0 top-0 bottom-0 w-1.5 bg-gradient-to-b from-blue-600 to-blue-400 rounded-r-full" />
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-6 p-5 sm:p-6 pl-6 sm:pl-7">
            <div className="flex items-start gap-4 flex-1 min-w-0">
              <div className="flex-shrink-0 w-11 h-11 rounded-xl bg-gradient-to-br from-blue-100 to-blue-50 dark:from-blue-900/20 dark:to-blue-800/10 flex items-center justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5 text-blue-600 dark:text-blue-400"><rect width="20" height="16" x="2" y="4" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/></svg>
              </div>
              <div className="space-y-1.5 min-w-0">
                <p className="text-sm sm:text-base font-semibold text-foreground leading-snug">We are actively recruiting self-motivated Ph.D. students, Master students, and Post-doc researchers!</p>
                <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">Students from Mathematics, Physics, Optoelectronics and other disciplines are highly encouraged to apply.</p>
              </div>
            </div>
            <a href={`mailto:${professorInfo.email}`} className="flex-shrink-0 inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-blue-600 text-white text-sm font-medium hover:bg-blue-700 transition-colors shadow-sm hover:shadow-md">
              Contact Us
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>
            </a>
          </div>
        </motion.div>
      </div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <StudentsSection hideTitle />
      </div>
    </main>
  )
}
