'use client'

import { useState, useEffect, useRef, useMemo } from 'react'
import { motion, useInView, useMotionValue, animate } from 'framer-motion'
import type { LucideIcon } from 'lucide-react'
import { BarChart3, FileText, TrendingUp } from 'lucide-react'
import { journalPapers, conferencePapers, citationStats } from '@/lib/data'
import { getYearDistribution } from '@/lib/data'
import SparklineChart from '@/components/publications/SparklineChart'

/** Single stats tile with count-up animation, matching Gallery design. */
function StatTile({ icon: Icon, count, label, accent, iconClass, iconGrad }: {
  icon: LucideIcon
  count: number
  label: string
  accent: string
  iconClass: string
  iconGrad: string
}) {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })
  const mv = useMotionValue(0)
  const [display, setDisplay] = useState(0)

  useEffect(() => {
    if (!inView) return
    const controls = animate(mv, count, {
      duration: 0.9,
      ease: 'easeOut',
      onUpdate: (v) => setDisplay(Math.round(v)),
      onComplete: () => setDisplay(count),
    })
    return () => controls.stop()
  }, [inView, count, mv])

  return (
    <div ref={ref} className="team-stat-tile group relative flex items-center gap-3 rounded-xl border border-border/60 bg-card p-3.5 shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:shadow-md hover:border-border overflow-hidden">
      <div className={`absolute inset-x-0 top-0 h-[2px] bg-gradient-to-r ${accent} opacity-70`} />
      <div className={`flex-shrink-0 w-10 h-10 rounded-lg flex items-center justify-center bg-gradient-to-br ${iconGrad}`}>
        <Icon className={`w-4 h-4 ${iconClass}`} />
      </div>
      <div className="min-w-0">
        <div className="text-2xl font-bold tracking-tight tabular-nums leading-none">{display}</div>
        <div className="text-xs font-medium text-muted-foreground mt-1.5">{label}</div>
      </div>
    </div>
  )
}

export default function PubStatsBar() {
  const allPubs = useMemo(() => [...journalPapers, ...conferencePapers], [])
  const yearDist = useMemo(() => getYearDistribution(allPubs), [allPubs])
  const maxCount = useMemo(() => Math.max(...yearDist.map(d => d.count)), [yearDist])

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: 'easeOut' }}
      className="mb-6"
    >
      <div className="bg-card rounded-xl border border-border/60 p-4 shadow-sm">
        <div className="flex flex-col lg:flex-row items-stretch gap-4 lg:gap-6 min-w-0">
          {/* Left: Stat tiles grid */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 flex-shrink-0">
            <StatTile
              icon={FileText}
              count={allPubs.length}
              label="Total Pubs"
              accent="from-violet-500 to-violet-400"
              iconClass="text-violet-700 dark:text-violet-400"
              iconGrad="from-violet-500/15 to-violet-400/10"
            />
            <StatTile
              icon={TrendingUp}
              count={citationStats.totalCitations}
              label="Citations"
              accent="from-emerald-500 to-emerald-400"
              iconClass="text-emerald-700 dark:text-emerald-400"
              iconGrad="from-emerald-500/15 to-emerald-400/10"
            />
            <StatTile
              icon={BarChart3}
              count={citationStats.hIndex}
              label="h-index"
              accent="from-amber-500 to-amber-400"
              iconClass="text-amber-700 dark:text-amber-400"
              iconGrad="from-amber-500/15 to-amber-400/10"
            />
          </div>

          {/* Right: Sparkline year bar */}
          <div className="flex-1 min-w-0 flex flex-col justify-center">
            <SparklineChart yearDist={yearDist} maxCount={maxCount} />
          </div>
        </div>
      </div>
    </motion.div>
  )
}
