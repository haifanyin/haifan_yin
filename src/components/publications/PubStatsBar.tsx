'use client'

import { useMemo } from 'react'
import { motion } from 'framer-motion'
import { BarChart3, Calendar, FileText, TrendingUp } from 'lucide-react'
import { journalPapers, conferencePapers, citationStats } from '@/lib/data'
import { getYearDistribution } from '@/lib/data'
import SparklineChart from '@/components/publications/SparklineChart'
export default function PubStatsBar() {
  const allPubs = useMemo(() => [...journalPapers, ...conferencePapers], [])
  const yearDist = useMemo(() => getYearDistribution(allPubs), [allPubs])
  const maxCount = useMemo(() => Math.max(...yearDist.map(d => d.count)), [yearDist])
  const yearRange = useMemo(() => {
    const years = yearDist.map(d => d.year).filter(y => y !== 'Other')
    if (years.length === 0) return '—'
    return `${years[0]} — ${years[years.length - 1]}`
  }, [yearDist])

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: 'easeOut' }}
      className="mb-6"
    >
      <div className="bg-card rounded-xl border border-border/60 p-4 shadow-sm">
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 sm:gap-8 min-w-0">
          {/* Stats */}
          <div className="flex flex-wrap items-center gap-x-6 gap-y-3">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary/10 to-primary/5 flex items-center justify-center">
                <FileText className="w-4 h-4 text-primary/60" />
              </div>
              <div>
                <div className="text-lg font-bold tracking-tight">{allPubs.length}</div>
                <div className="text-[10px] text-muted-foreground">Total Pubs</div>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary/10 to-primary/5 flex items-center justify-center">
                <Calendar className="w-4 h-4 text-primary/60" />
              </div>
              <div>
                <div className="text-sm font-semibold tracking-tight">{yearRange}</div>
                <div className="text-[10px] text-muted-foreground">Year Range</div>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary/10 to-primary/5 flex items-center justify-center">
                <TrendingUp className="w-4 h-4 text-primary/60" />
              </div>
              <div>
                <div className="text-sm font-semibold tracking-tight">{yearDist.length}</div>
                <div className="text-[10px] text-muted-foreground">Active Years</div>
              </div>
            </div>
          </div>

          {/* Sparkline */}
          <div className="flex-1 min-w-0">
            <SparklineChart yearDist={yearDist} maxCount={maxCount} />
          </div>

          {/* Citation Stats */}
          <div className="hidden sm:flex items-center gap-4 flex-shrink-0">
            <div className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-emerald-50/50 dark:bg-emerald-900/10 border border-emerald-200/30 dark:border-emerald-800/20">
              <TrendingUp className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
              <span className="text-xs font-bold text-emerald-700 dark:text-emerald-400 tabular-nums">{citationStats.totalCitations.toLocaleString()}</span>
              <span className="text-[9px] text-emerald-600/70 dark:text-emerald-400/60">citations</span>
            </div>
            <div className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-violet-50/50 dark:bg-violet-900/10 border border-violet-200/30 dark:border-violet-800/20">
              <BarChart3 className="w-3.5 h-3.5 text-violet-600 dark:text-violet-400" />
              <span className="text-xs font-bold text-violet-700 dark:text-violet-400 tabular-nums">h{citationStats.hIndex}</span>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  )
}
