'use client'


export default function TimelineItem({ period, title, subtitle, isLast = false, Icon }: { period: string; title: string; subtitle: string; isLast?: boolean; Icon?: React.ComponentType<{ className?: string }> }) {
  return (
    <div className="flex gap-4">
      <div className="flex flex-col items-center">
        <div className="w-3 h-3 rounded-full bg-primary/20 border-2 border-primary/40 mt-1.5 flex-shrink-0" />
        {!isLast && <div className="w-px flex-1 bg-border mt-1.5" />}
      </div>
      <div className="pb-6">
        <p className="text-xs font-medium text-primary/60 mb-0.5 tabular-nums">{period}</p>
        <p className="text-sm font-semibold">{title}</p>
        <p className="text-sm text-muted-foreground">{subtitle}</p>
      </div>
    </div>
  )
}
