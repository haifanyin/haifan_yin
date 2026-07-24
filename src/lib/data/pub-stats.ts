import type { Publication } from '@/types'

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
