import type { Publication } from '@/types'
import type { ComponentType } from 'react'
import { Trophy, Star, Sparkles } from 'lucide-react'

// ============ BibTeX Generator ============
export function generateBibTeX(pub: Publication): string {
  // Generate ID in format: firstAuthorLastName + year + firstTitleWord (e.g., "han2026power")
  const firstAuthor = pub.authors[0].split(' ').pop()?.toLowerCase() || 'unknown'
  const yearStr = pub.year.toString()
  const firstTitleWord = pub.title.split(' ').find(w => w.length > 2)?.toLowerCase().replace(/[^a-z]/g, '') || 'paper'
  const id = `${firstAuthor}${yearStr}${firstTitleWord}`

  const isConference = !!pub.booktitle
  const entryType = isConference ? '@inproceedings' : '@article'
  const entryKey = isConference ? 'booktitle' : 'journal'
  const venueName = pub.journal || pub.booktitle || ''

  const lines = [
    `${entryType}{${id},`,
    `  author = {${pub.authors.join(', ')}},`,
    `  title = {${pub.title}},`,
    `  ${entryKey} = {${venueName}},`,
  ]
  if (!isConference && pub.volume) lines.push(`  volume = {${pub.volume}},`)
  if (!isConference && pub.number) lines.push(`  number = {${pub.number}},`)
  if (pub.pages) lines.push(`  pages = {${pub.pages}},`)
  lines.push(`  year = {${yearStr}}`)
  if (pub.link) lines.push(`  url = {${pub.link}}`)
  lines.push('}')
  return lines.join('\n')
}

// ============ Publication Stats ============
export function getYearDistribution(pubs: Publication[]): { year: string; count: number }[] {
  const yearMap = new Map<string, number>()
  pubs.forEach(p => {
    const y = p.year.toString()
    yearMap.set(y, (yearMap.get(y) || 0) + 1)
  })
  return Array.from(yearMap.entries())
    .map(([year, count]) => ({ year, count }))
    .sort((a, b) => a.year.localeCompare(b.year))
}

// ============ Publication Highlight Badge Helper ============
export function getHighlightBadge(highlight: string): { icon: ComponentType<{ className?: string }>; label: string; colorClass: string; borderClass: string } | null {
  const h = highlight.toLowerCase()
  if (h.includes('prize')) {
    return { icon: Trophy, label: highlight, colorClass: 'bg-amber-50 text-amber-700 border-amber-200 dark:bg-amber-900/20 dark:text-amber-400 dark:border-amber-800/30', borderClass: 'border-l-amber-400 dark:border-l-amber-500' }
  }
  if (h.includes('esi') || h.includes('highly cited')) {
    return { icon: Star, label: highlight, colorClass: 'bg-amber-50 text-amber-700 border-amber-200 dark:bg-amber-900/20 dark:text-amber-400 dark:border-amber-800/30', borderClass: 'border-l-amber-400 dark:border-l-amber-500' }
  }
  if (h.includes('invited')) {
    return { icon: Sparkles, label: highlight, colorClass: 'bg-violet-50 text-violet-700 border-violet-200 dark:bg-violet-900/20 dark:text-violet-400 dark:border-violet-800/30', borderClass: 'border-l-violet-400 dark:border-l-violet-500' }
  }
  return null
}

// ============ Venue Badge ============
export function getVenueBadge(venue: string): { label: string; colorClass: string } | null {
  const v = venue.toLowerCase()
  const excludedVenues = [
    'ieee open journal of the communications society',
    'china communications',
    'ieee communications surveys & tutorials',
    'ieee systems journal',
    'ieee communications magazine',
    'ieee journal of selected topics in signal processing',
  ]
  if (excludedVenues.some(e => v.includes(e))) return null
  if (v.includes('ieee transactions on wireless communications')) return { label: 'IEEE TWC', colorClass: 'bg-emerald-50 text-emerald-700 border-emerald-200 dark:bg-emerald-900/15 dark:text-emerald-400 dark:border-emerald-800/25' }
  if (v.includes('ieee transactions on communications') && !v.includes('wireless')) return { label: 'IEEE TCOM', colorClass: 'bg-teal-50 text-teal-700 border-teal-200 dark:bg-teal-900/15 dark:text-teal-400 dark:border-teal-800/25' }
  if (v.includes('ieee journal on selected areas')) return { label: 'IEEE JSAC', colorClass: 'bg-violet-50 text-violet-700 border-violet-200 dark:bg-violet-900/15 dark:text-violet-400 dark:border-violet-800/25' }
  if (v.includes('ieee transactions on signal processing')) return { label: 'IEEE TSP', colorClass: 'bg-rose-50 text-rose-700 border-rose-200 dark:bg-rose-900/15 dark:text-rose-400 dark:border-rose-800/25' }
  if (v.includes('ieee transactions on antennas')) return { label: 'IEEE TAP', colorClass: 'bg-amber-50 text-amber-700 border-amber-200 dark:bg-amber-900/15 dark:text-amber-400 dark:border-amber-800/25' }
  if (v.includes('ieee transactions on vehicular')) return { label: 'IEEE TVT', colorClass: 'bg-cyan-50 text-cyan-700 border-cyan-200 dark:bg-cyan-900/15 dark:text-cyan-400 dark:border-cyan-800/25' }
  if (v.includes('ieee wireless communications letters')) return { label: 'IEEE WCL', colorClass: 'bg-lime-50 text-lime-700 border-lime-200 dark:bg-lime-900/15 dark:text-lime-400 dark:border-lime-800/25' }
  // Conference badges
  if (v.includes('globecom')) return { label: 'GLOBECOM', colorClass: 'bg-orange-50 text-orange-700 border-orange-200 dark:bg-orange-900/15 dark:text-orange-400 dark:border-orange-800/25' }
  if (v.includes('international conference on communications') || v.includes('ieee icc')) return { label: 'ICC', colorClass: 'bg-sky-50 text-sky-700 border-sky-200 dark:bg-sky-900/15 dark:text-sky-400 dark:border-sky-800/25' }
  if (v.includes('vehicular technology conference') || v.includes('vtc')) return { label: 'VTC', colorClass: 'bg-blue-50 text-blue-700 border-blue-200 dark:bg-blue-900/15 dark:text-blue-400 dark:border-blue-800/25' }
  if (v.includes('pimrc')) return { label: 'PIMRC', colorClass: 'bg-purple-50 text-purple-700 border-purple-200 dark:bg-purple-900/15 dark:text-purple-400 dark:border-purple-800/25' }
  if (v.includes('wcnc')) return { label: 'WCNC', colorClass: 'bg-red-50 text-red-700 border-red-200 dark:bg-red-900/15 dark:text-red-400 dark:border-red-800/25' }
  if (v.includes('eucap')) return { label: 'EuCAP', colorClass: 'bg-yellow-50 text-yellow-700 border-yellow-200 dark:bg-yellow-900/15 dark:text-yellow-400 dark:border-yellow-800/25' }
  if (v.includes('icassp')) return { label: 'ICASSP', colorClass: 'bg-indigo-50 text-indigo-700 border-indigo-200 dark:bg-indigo-900/15 dark:text-indigo-400 dark:border-indigo-800/25' }
  if (v.includes('spawc')) return { label: 'SPAWC', colorClass: 'bg-fuchsia-50 text-fuchsia-700 border-fuchsia-200 dark:bg-fuchsia-900/15 dark:text-fuchsia-400 dark:border-fuchsia-800/25' }
  if (v.includes('submitted') || v === 'submitted') return { label: 'Submitted', colorClass: 'bg-gray-50 text-gray-600 border-gray-200 dark:bg-gray-800/15 dark:text-gray-400 dark:border-gray-700/25' }
  // Hide badge for unmatched conferences
  if (v.includes('conference') || v.includes('symposium') || v.includes('workshop') || v.includes('asilomar') || v.includes('iswcs') || v.includes('iccc') || v.includes('iwrf')) return null
  const words = venue.split(' ').slice(0, 3).join(' ')
  return { label: words.length > 20 ? words.slice(0, 20) + '…' : words, colorClass: 'bg-neutral-50 text-neutral-600 border-neutral-200 dark:bg-neutral-800/15 dark:text-neutral-400 dark:border-neutral-700/25' }
}