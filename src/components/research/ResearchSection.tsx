'use client'

import { useState, useMemo } from 'react'
import { motion } from 'framer-motion'
import { Search, X } from 'lucide-react'
import { Input } from '@/components/ui/input'
import { researchTopics } from '@/lib/data'
import { getPublicationsByTopic } from '@/lib/data'
import { fadeInUp, staggerItem } from '@/lib/constants'
import SectionWrapper from '@/components/layout/SectionWrapper'
import SectionTitle from '@/components/layout/SectionTitle'
import ResearchCard from '@/components/research/ResearchCard'
export default function ResearchSection({ hideTitle = false }: { hideTitle?: boolean } = {}) {
  const [searchQuery, setSearchQuery] = useState('')
  const totalPapers = useMemo(() =>
    researchTopics.reduce((acc, t) => acc + getPublicationsByTopic(t.id).length, 0), [])
  const avgPapers = useMemo(() => Math.round(totalPapers / researchTopics.length), [totalPapers])
  const filteredTopics = useMemo(() => {
    if (!searchQuery.trim()) return researchTopics
    const q = searchQuery.toLowerCase()
    return researchTopics.filter(t =>
      t.title.toLowerCase().includes(q) ||
      (t.subtitle || '').toLowerCase().includes(q) ||
      t.description.toLowerCase().includes(q) ||
      getPublicationsByTopic(t.id).some(p =>
        p.title.toLowerCase().includes(q) ||
        p.authors.some(a => a.toLowerCase().includes(q))
      )
    )
  }, [searchQuery])

  return (
    <SectionWrapper id="research" className={hideTitle ? '!pt-2 md:!pt-4' : 'bg-muted/30'}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {!hideTitle && (
          <SectionTitle subtitle="Exploring the frontiers of wireless communications and signal processing">
            Research
          </SectionTitle>
        )}

        {/* Search + Expand/Collapse */}
        <motion.div variants={fadeInUp} className="mb-4 flex flex-col sm:flex-row items-start sm:items-center gap-3">
          <div className="relative flex-1 w-full sm:max-w-xs">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-muted-foreground/50" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search research topics..."
              className="w-full pl-9 pr-3 py-2 text-sm rounded-lg bg-card border border-border/60 outline-none focus:border-primary/40 focus:ring-1 focus:ring-primary/10 placeholder:text-muted-foreground/40 transition-all"
            />
            {searchQuery && (
              <button onClick={() => setSearchQuery('')} className="absolute right-2 top-1/2 -translate-y-1/2 p-0.5 rounded hover:bg-accent transition-colors">
                <X className="w-3 h-3 text-muted-foreground" />
              </button>
            )}
          </div>
          <div className="flex items-center gap-2">
            {searchQuery && (
              <span className="text-xs text-muted-foreground">{filteredTopics.length} result{filteredTopics.length !== 1 ? 's' : ''}</span>
            )}
          </div>
        </motion.div>

        <div className="space-y-6">
          {filteredTopics.length > 0 ? (
            filteredTopics.map((topic, i) => (
              <ResearchCard key={topic.id} topic={topic} index={i} />
            ))
          ) : (
            <motion.div variants={staggerItem} className="text-center py-16">
              <Search className="w-8 h-8 text-muted-foreground/20 mx-auto mb-3" />
              <p className="text-sm text-muted-foreground">No research topics match "{searchQuery}"</p>
              <button onClick={() => setSearchQuery('')} className="mt-2 text-xs text-primary/70 hover:text-primary transition-colors">Clear search</button>
            </motion.div>
          )}
        </div>
      </div>
    </SectionWrapper>
  )
}
