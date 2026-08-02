export default function TimelineItem({ period, title, subtitle, isLast = false, isCurrent = false }: { period: string; title: string; subtitle: string; isLast?: boolean; isCurrent?: boolean }) {
  return (
    <div className="flex gap-4">
      <div className="flex flex-col items-center">
        <div className={`w-3 h-3 rounded-full mt-1.5 flex-shrink-0 ${isCurrent ? 'timeline-dot-current timeline-dot-active' : 'bg-primary/20 border-2 border-primary/40'}`} />
        {!isLast && <div className="w-px flex-1 bg-border mt-1.5" />}
      </div>
      <div className="pb-6">
        <p className="text-[13px] font-medium text-primary/65 mb-0.5 tabular-nums">{period}</p>
        <p className="text-[15px] font-semibold">{title}</p>
        <p className="text-[14px] leading-6 text-muted-foreground">{subtitle}</p>
      </div>
    </div>
  )
}
