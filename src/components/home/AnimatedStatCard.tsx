'use client'

import { useAnimatedCounter } from '@/hooks/useAnimatedCounter'
export default function AnimatedStatCard({ stat }: { stat: { label: string; value: number; icon: React.ComponentType<{ className?: string }>; accent: string; iconGrad: string; iconClass: string } }) {
  const { count, ref } = useAnimatedCounter(stat.value)
  return (
    <div ref={ref} className="team-stat-tile group relative flex items-center gap-3 rounded-xl border border-border/60 bg-card p-3.5 shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:shadow-md hover:border-border overflow-hidden">
      <div className={`absolute inset-x-0 top-0 h-[2px] bg-gradient-to-r ${stat.accent} opacity-70`} />
      <div className={`flex-shrink-0 w-10 h-10 rounded-lg flex items-center justify-center bg-gradient-to-br ${stat.iconGrad}`}>
        <stat.icon className={`w-4 h-4 ${stat.iconClass}`} />
      </div>
      <div className="min-w-0">
        <div className="text-2xl font-bold tracking-tight tabular-nums leading-none">{count}</div>
        <div className="text-xs font-medium text-muted-foreground mt-1.5">{stat.label}</div>
      </div>
    </div>
  )
}
