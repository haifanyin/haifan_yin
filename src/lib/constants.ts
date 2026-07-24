import type { PageName } from '@/types'
import type { ComponentType } from 'react'
import { BookOpen, Microscope, Users, Camera } from 'lucide-react'

export const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } },
}

export const staggerContainer = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.08 } },
}

export const staggerItem = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4 } },
}

export const accentLineMap: Record<string, string> = {
  blue: 'from-blue-600 to-blue-400',
  emerald: 'from-emerald-600 to-emerald-400',
  violet: 'from-violet-600 to-violet-400',
  amber: 'from-amber-600 to-amber-400',
  rose: 'from-rose-600 to-rose-400',
}

export const pageInfoMap: Record<Exclude<PageName, 'home'>, { title: string; subtitle: string; icon: ComponentType<{ className?: string }> }> = {
  publications: { title: 'Publications', subtitle: 'Selected publications in top-tier journals and conferences', icon: BookOpen },
  research: { title: 'Research', subtitle: 'Exploring the frontiers of wireless communications and signal processing', icon: Microscope },
  team: { title: 'Team', subtitle: 'Meet our research group members', icon: Users },
  gallery: { title: 'Gallery', subtitle: 'Moments from our lab activities and events', icon: Camera },
}
