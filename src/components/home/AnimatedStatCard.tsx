'use client'

import { useAnimatedCounter } from '@/hooks/useAnimatedCounter'
export default function AnimatedStatCard({ stat }: { stat: { label: string; value: number; icon: React.ComponentType<{ className?: string }>; color: string } }) {
  const { count, ref } = useAnimatedCounter(stat.value)
  return (
    <div ref={ref} className={`stat-card bg-gradient-to-br ${stat.color} rounded-xl p-3.5 border border-border/40 text-center cursor-default`}>
      <stat.icon className="w-4 h-4 text-muted-foreground mx-auto mb-1.5" />
      <div className="text-2xl font-bold tracking-tight">{count}</div>
      <div className="text-[11px] text-muted-foreground mt-0.5">{stat.label}</div>
    </div>
  )
}
