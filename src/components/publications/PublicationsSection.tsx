'use client'

import { useState, useEffect, useRef, useCallback, useMemo } from 'react'
import { motion } from 'framer-motion'
import { BookOpen, Download, FileText, Filter, Search, SortAsc, SortDesc, Users } from 'lucide-react'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { journalPapers, conferencePapers } from '@/lib/data'
import { fadeInUp } from '@/lib/constants'
import { generateBibTeX } from '@/lib/data'
import type { Publication } from '@/types'
import SectionWrapper from '@/components/layout/SectionWrapper'
import SectionTitle from '@/components/layout/SectionTitle'
import PubStatsBar from '@/components/publications/PubStatsBar'
import PublicationItem from '@/components/publications/PublicationItem'
import Toast from '@/components/ui/toast'
export default function PublicationsSection({ fullPage = false, hideTitle = false }: { fullPage?: boolean; hideTitle?: boolean }) {
  const [searchQuery, setSearchQuery] = useState('')
  const [activeTab, setActiveTab] = useState('journal')
  const [yearFilter, setYearFilter] = useState<string>('all')
  const [authorFilter, setAuthorFilter] = useState<string>('all')
  const [sortDesc, setSortDesc] = useState(true)
  const [toastVisible, setToastVisible] = useState(false)
  const [scrollProgress, setScrollProgress] = useState(0)
  const searchRef = useRef<HTMLInputElement>(null)

  // Scroll progress bar (full page only)
  useEffect(() => {
    if (!fullPage) return
    const handleScroll = () => {
      const el = document.getElementById('publications')
      if (!el) return
      const rect = el.getBoundingClientRect()
      const scrolled = -rect.top
      const total = rect.height - window.innerHeight
      const progress = Math.max(0, Math.min(1, total > 0 ? scrolled / total : 0))
      setScrollProgress(progress)
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    handleScroll()
    return () => window.removeEventListener('scroll', handleScroll)
  }, [fullPage])

  // Publication Summary Stats Bar (only on full page)
  const showStatsBar = fullPage

  // Extract top authors
  const topAuthors = useMemo(() => {
    const authorCount = new Map<string, number>()
    const allPubs = [...journalPapers, ...conferencePapers]
    allPubs.forEach(p => {
      p.authors.forEach(a => {
        const trimmed = a.trim()
        if (trimmed && trimmed !== 'et al.') {
          authorCount.set(trimmed, (authorCount.get(trimmed) || 0) + 1)
        }
      })
    })
    // Only show authors with 3+ papers, sort by count, limit to 8
    return Array.from(authorCount.entries())
      .filter(([, count]) => count >= 3)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 8)
      .map(([name, count]) => ({ name, count }))
  }, [])

  // Cmd/Ctrl+K to focus search
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault()
        searchRef.current?.focus()
      }
    }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [])

  const allYears = useMemo(() => {
    const years = new Set<string>()
    journalPapers.forEach(p => years.add(p.year.toString()))
    conferencePapers.forEach(p => years.add(p.year.toString()))
    const sorted = Array.from(years).sort((a, b) => b.localeCompare(a))
    return ['all', ...sorted]
  }, [])

  const filterPubs = useCallback((pubs: Publication[]) => {
    let filtered = pubs
    if (yearFilter !== 'all') {
      filtered = filtered.filter(p => p.year.toString() === yearFilter)
    }
    if (authorFilter !== 'all') {
      filtered = filtered.filter(p => p.authors.includes(authorFilter))
    }
    if (searchQuery) {
      const q = searchQuery.toLowerCase()
      filtered = filtered.filter(
        p => p.title.toLowerCase().includes(q) || p.authors.some(a => a.toLowerCase().includes(q)) || (p.journal || p.booktitle || '').toLowerCase().includes(q)
      )
    }
    if (!sortDesc) {
      filtered = [...filtered].reverse()
    }
    return filtered
  }, [searchQuery, yearFilter, sortDesc, authorFilter])

  const filteredJournals = filterPubs(journalPapers)
  const filteredConferences = filterPubs(conferencePapers)

  const handleExportAllBibTeX = () => {
    const allPubs = [...filteredJournals, ...filteredConferences]
    if (allPubs.length === 0) return
    const allBibTeX = allPubs.map((pub) => generateBibTeX(pub)).join('\n\n')
    const blob = new Blob([allBibTeX], { type: 'text/plain' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = 'all-references.bib'
    a.click()
    URL.revokeObjectURL(url)
    setToastVisible(true)
  }

  return (
    <SectionWrapper id="publications" className="dot-pattern !pt-0 !pb-0">
      {/* Scroll Progress Bar (full page only) */}
      {fullPage && (
        <div className="sticky top-16 md:top-20 z-30 h-0.5 bg-border/30">
          <div
            className="h-full bg-gradient-to-r from-primary to-primary/60 rounded-full progress-bar-animated"
            style={{ width: `${scrollProgress * 100}%` }}
          />
        </div>
      )}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6 md:pt-8 min-w-0">
        {!hideTitle && (
          <SectionTitle subtitle="Selected publications in top-tier journals and conferences">
            Publications
          </SectionTitle>
        )}

        {/* Publication Summary Stats Bar */}
        {showStatsBar && <PubStatsBar />}

        {/* Search & Filter */}
        <motion.div variants={fadeInUp} className="flex flex-col sm:flex-row gap-3 mb-4">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              ref={searchRef}
              placeholder="Search by title, author, venue..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-9 pr-16 bg-card"
            />
            <kbd className="absolute right-3 top-1/2 -translate-y-1/2 hidden sm:inline-flex items-center gap-0.5 px-1.5 py-0.5 text-[10px] font-medium text-muted-foreground/60 bg-muted rounded border border-border/50">
              <span className="text-[9px]">⌘</span>K
            </kbd>
          </div>
          <div className="flex flex-col gap-2 min-w-0 sm:flex-row sm:items-center sm:gap-2">
            <div className="flex items-center gap-2 min-w-0 flex-1">
              <Filter className="w-4 h-4 text-muted-foreground flex-shrink-0" />
              <div className="flex gap-1 overflow-x-auto custom-scrollbar pb-1 min-w-0 flex-1">
                {allYears.map((year) => (
                  <button
                    key={year}
                    onClick={() => setYearFilter(year)}
                    className={`px-2.5 py-1 text-xs rounded-md transition-all shrink-0 ${
                      yearFilter === year
                        ? 'bg-primary text-primary-foreground'
                        : 'bg-muted text-muted-foreground hover:bg-accent hover:text-foreground'
                    }`}
                  >
                    {year === 'all' ? 'All' : year}
                  </button>
                ))}
              </div>
            </div>
            <div className="flex items-center gap-1 flex-shrink-0">
              <div className="w-px h-5 bg-border mx-1 hidden sm:block" />
              <button
                onClick={() => setSortDesc(!sortDesc)}
                className="p-1.5 rounded-md text-muted-foreground hover:text-foreground hover:bg-accent transition-all"
                title={sortDesc ? 'Sort: Newest first' : 'Sort: Oldest first'}
              >
                {sortDesc ? <SortDesc className="w-4 h-4" /> : <SortAsc className="w-4 h-4" />}
              </button>
              {showStatsBar && (
                <button
                  onClick={handleExportAllBibTeX}
                  className="hidden sm:inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-xs font-medium text-muted-foreground hover:text-foreground hover:bg-accent transition-colors border border-border/40"
                  title="Export all publications as BibTeX"
                >
                  <Download className="w-3.5 h-3.5" />
                  Export All
                </button>
              )}
            </div>
          </div>
        </motion.div>

        {/* Author Filter Chips (full page only) */}
        {showStatsBar && topAuthors.length > 0 && (
          <motion.div variants={fadeInUp} className="mb-6">
            <div className="flex items-center gap-2 flex-wrap">
              <Users className="w-3.5 h-3.5 text-muted-foreground flex-shrink-0" />
              <span className="text-[11px] text-muted-foreground font-medium mr-1">Authors:</span>
              <button
                onClick={() => setAuthorFilter('all')}
                className={`px-2.5 py-1 text-[11px] rounded-md transition-all shrink-0 ${
                  authorFilter === 'all'
                    ? 'bg-primary text-primary-foreground'
                    : 'bg-muted/50 text-muted-foreground hover:bg-accent hover:text-foreground'
                }`}
              >
                All
              </button>
              {topAuthors.map(author => (
                <button
                  key={author.name}
                  onClick={() => setAuthorFilter(author.name)}
                  className={`px-2.5 py-1 text-[11px] rounded-md transition-all shrink-0 ${
                    authorFilter === author.name
                      ? 'bg-primary text-primary-foreground'
                      : 'bg-muted/50 text-muted-foreground hover:bg-accent hover:text-foreground'
                  }`}
                >
                  {author.name}
                  <span className="ml-1 opacity-60">{author.count}</span>
                </button>
              ))}
            </div>
          </motion.div>
        )}

        <motion.div variants={fadeInUp} className="min-w-0">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="min-w-0">
            <div className="w-full min-w-0 overflow-x-auto overscroll-x-contain pb-1 -mx-0.5 px-0.5 sm:mx-0 sm:px-0">
              <TabsList className="mb-6 w-max min-w-full justify-between sm:w-fit sm:min-w-0 sm:justify-center">
              <TabsTrigger value="journal" className="gap-1.5">
                <BookOpen className="w-4 h-4" />
                Journal Papers
                <Badge variant="secondary" className="ml-1 text-xs">{filteredJournals.length}</Badge>
              </TabsTrigger>
              <TabsTrigger value="conference" className="gap-1.5">
                <FileText className="w-4 h-4" />
                Conference Papers
                <Badge variant="secondary" className="ml-1 text-xs">{filteredConferences.length}</Badge>
              </TabsTrigger>
            </TabsList>
            </div>

            {/* Result Count */}
            {fullPage && (searchQuery || yearFilter !== 'all' || authorFilter !== 'all') && (
              <motion.div variants={fadeInUp} className="mb-4">
                <p className="text-xs text-muted-foreground/70 flex items-center gap-1.5">
                  <Filter className="w-3 h-3" />
                  {activeTab === 'journal' && <span>Showing {filteredJournals.length} of {journalPapers.length} journal papers</span>}
                  {activeTab === 'conference' && <span>Showing {filteredConferences.length} of {conferencePapers.length} conference papers</span>}
                </p>
              </motion.div>
            )}

            <TabsContent value="journal">
              <div className="bg-card rounded-xl border border-border/60 overflow-hidden shadow-sm">
                <div className={`${fullPage ? '' : 'max-h-[800px]'} overflow-y-auto custom-scrollbar p-2`}>
                  {filteredJournals.map((pub, i) => (
<PublicationItem key={i} pub={pub} index={i} />
                    ))}
                    {filteredJournals.length === 0 && (
                    <div className="flex flex-col items-center justify-center py-12 text-muted-foreground">
                      <Search className="w-8 h-8 mb-3 text-muted-foreground/40" />
                      <p className="text-sm font-medium">No publications match your filters</p>
                      <button
                        onClick={() => { setSearchQuery(''); setYearFilter('all'); setAuthorFilter('all') }}
                        className="mt-2 inline-flex items-center gap-1 text-xs font-medium text-primary/70 hover:text-primary transition-colors"
                      >
                        <Filter className="w-3 h-3" />
                        Clear Filters
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </TabsContent>

            <TabsContent value="conference">
              <div className="bg-card rounded-xl border border-border/60 overflow-hidden shadow-sm">
                <div className={`${fullPage ? '' : 'max-h-[800px]'} overflow-y-auto custom-scrollbar p-2`}>
                  {filteredConferences.map((pub, i) => (
<PublicationItem key={i} pub={pub} index={i} />
                    ))}
                    {filteredConferences.length === 0 && (
                    <div className="flex flex-col items-center justify-center py-12 text-muted-foreground">
                      <Search className="w-8 h-8 mb-3 text-muted-foreground/40" />
                      <p className="text-sm font-medium">No publications match your filters</p>
                      <button
                        onClick={() => { setSearchQuery(''); setYearFilter('all'); setAuthorFilter('all') }}
                        className="mt-2 inline-flex items-center gap-1 text-xs font-medium text-primary/70 hover:text-primary transition-colors"
                      >
                        <Filter className="w-3 h-3" />
                        Clear Filters
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </motion.div>
      </div>
      <Toast message="Downloaded BibTeX file!" visible={toastVisible} onClose={() => setToastVisible(false)} />
    </SectionWrapper>
  )
}
