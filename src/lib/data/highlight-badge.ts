import type { ComponentType } from 'react'
import { Trophy, Star, Sparkles } from 'lucide-react'

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
