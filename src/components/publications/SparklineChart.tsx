'use client'

import { useState, useRef } from 'react'
export default function SparklineChart({ yearDist, maxCount }: { yearDist: { year: string; count: number }[]; maxCount: number }) {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)
  const containerRef = useRef<HTMLDivElement>(null)

  return (
    <div ref={containerRef} className="relative">
      <div className="flex items-center gap-0.5 h-9" aria-label="Publications by year mini chart">
        {yearDist.map((d, idx) => (
          <div
            key={d.year}
            className="flex-1 flex flex-col items-center justify-end h-full relative cursor-pointer"
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
            {/* Hover year label */}
            {hoveredIndex === idx && (
              <span className="absolute -top-5 left-1/2 -translate-x-1/2 text-[9px] font-medium text-foreground tabular-nums whitespace-nowrap bg-card px-1.5 py-0.5 rounded shadow-sm border border-border/40">
                {d.year}
              </span>
            )}
          </div>
        ))}
      </div>
      {/* Hover tooltip */}
      {hoveredIndex !== null && yearDist[hoveredIndex] && (
        <div className="absolute -top-1 left-1/2 -translate-x-1/2 z-20 pointer-events-none">
          <div className="bg-foreground text-background text-[11px] font-medium px-2.5 py-1.5 rounded-lg shadow-lg flex items-center gap-2 whitespace-nowrap">
            <span className="tabular-nums">{yearDist[hoveredIndex].year}</span>
            <span className="w-px h-3 bg-background/30" />
            <span className="text-primary-foreground/80">{yearDist[hoveredIndex].count} papers</span>
          </div>
        </div>
      )}
      <div className="flex justify-between mt-1.5">
        <span className="text-[9px] text-muted-foreground/50 tabular-nums">{yearDist[0]?.year}</span>
        <span className="text-[9px] text-muted-foreground/50 tabular-nums">{yearDist[yearDist.length - 1]?.year}</span>
      </div>
    </div>
  )
}
