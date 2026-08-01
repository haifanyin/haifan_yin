'use client'

import { useState, useRef, useCallback } from 'react'
export default function SparklineChart({ yearDist, maxCount }: { yearDist: { year: string; count: number }[]; maxCount: number }) {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)
  const [tooltipX, setTooltipX] = useState(0)
  const containerRef = useRef<HTMLDivElement>(null)

  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    if (containerRef.current) {
      const rect = containerRef.current.getBoundingClientRect()
      setTooltipX(e.clientX - rect.left)
    }
  }, [])

  return (
    <div ref={containerRef} className="relative w-full min-w-0" onMouseMove={handleMouseMove}>
      <div className="flex items-end gap-0.5 h-16 lg:h-full min-h-[3rem] min-w-0" aria-label="Publications by year mini chart">
        {yearDist.map((d, idx) => (
          <div
            key={d.year}
            className="flex-1 min-w-0 flex flex-col items-center justify-end h-full relative cursor-pointer"
            onMouseEnter={() => setHoveredIndex(idx)}
            onMouseLeave={() => setHoveredIndex(null)}
          >
            <div
              className={`sparkline-bar w-full rounded-t-sm min-h-[2px] transition-all duration-200 ${
                hoveredIndex === idx
                  ? 'bg-gradient-to-t from-primary to-primary/60'
                  : 'bg-gradient-to-t from-primary/40 to-primary/20'
              }`}
              style={{ height: `${(d.count / maxCount) * 100}%` }}
            />
          </div>
        ))}
      </div>
      {/* Hover tooltip */}
      {hoveredIndex !== null && yearDist[hoveredIndex] && (
        <div
          className="absolute top-1/2 z-20 pointer-events-none -translate-y-1/2"
          style={{ left: `${Math.min(Math.max(tooltipX, 0), (containerRef.current?.offsetWidth || 0))}px`, transform: 'translate(-50%, -50%)' }}
        >
          <div className="bg-foreground text-background text-[11px] font-medium px-2.5 py-1.5 rounded-lg shadow-lg flex items-center gap-2 whitespace-nowrap">
            <span className="tabular-nums">{yearDist[hoveredIndex].year}</span>
            <span className="w-px h-3 bg-background/30" />
            <span className="text-primary-foreground/80">{yearDist[hoveredIndex].count} papers</span>
          </div>
        </div>
      )}
      <div className="relative mt-1.5 h-3 text-xs text-muted-foreground/60 tabular-nums leading-none">
        {yearDist[0] && <span className="absolute left-0 top-0 whitespace-nowrap">{yearDist[0].year}</span>}
        {yearDist.length > 1 && (
          <span className="absolute right-0 top-0 whitespace-nowrap">{yearDist[yearDist.length - 1].year}</span>
        )}
      </div>
    </div>
  )
}
