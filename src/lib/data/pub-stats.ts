import type { Publication } from '@/types'

// ============ Publication Stats ============
export function getYearDistribution(pubs: Publication[]): {
  year: string
  count: number
  journalCount: number
  conferenceCount: number
}[] {
  const yearMap = new Map<string, { count: number; journalCount: number; conferenceCount: number }>()
  pubs.forEach(p => {
    const y = p.year.toString()
    const current = yearMap.get(y) || { count: 0, journalCount: 0, conferenceCount: 0 }
    current.count += 1
    if (p.journal) {
      current.journalCount += 1
    } else {
      current.conferenceCount += 1
    }
    yearMap.set(y, current)
  })
  return Array.from(yearMap.entries())
    .map(([year, counts]) => ({ year, ...counts }))
    .sort((a, b) => a.year.localeCompare(b.year))
}
