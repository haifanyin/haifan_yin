'use client'

import { useState, useRef, useCallback, useEffect } from 'react'

type YearDistribution = {
  year: string
  count: number
  journalCount: number
  conferenceCount: number
}

export default function SparklineChart({ yearDist, maxCount }: { yearDist: YearDistribution[]; maxCount: number }) {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)
  const [tooltipX, setTooltipX] = useState(0)
  const [containerWidth, setContainerWidth] = useState(0)
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = containerRef.current
    if (!el) return
    const updateWidth = () => setContainerWidth(el.offsetWidth)
    updateWidth()
    const observer = new ResizeObserver(updateWidth)
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    if (containerRef.current) {
      const rect = containerRef.current.getBoundingClientRect()
      setTooltipX(e.clientX - rect.left)
    }
  }, [])

  return (
    <div ref={containerRef} className="relative w-full min-w-0" onMouseMove={handleMouseMove}>
      <div
        className="flex items-end gap-0.5 h-16 lg:h-20 min-h-[3rem] min-w-0"
        aria-label="Publications by year mini chart"
      >
        {yearDist.map((d, idx) => {
          const isHovered = hoveredIndex === idx
          const totalHeight = `${(d.count / maxCount) * 100}%`
          const journalHeight = `${(d.journalCount / d.count) * 100}%`
          const conferenceHeight = `${(d.conferenceCount / d.count) * 100}%`

          return (
            <div
              key={d.year}
              className="flex-1 min-w-0 flex flex-col items-center justify-end h-full relative"
              onMouseEnter={() => setHoveredIndex(idx)}
              onMouseLeave={() => setHoveredIndex(null)}
            >
              <div className="w-full flex flex-col justify-end rounded-t-sm overflow-hidden transition-all duration-200" style={{ height: totalHeight }}>
                {d.conferenceCount > 0 && (
                  <div
                    className={`w-full min-h-[2px] transition-colors duration-200 ${
                      isHovered ? 'bg-sky-600' : 'bg-sky-500/70'
                    }`}
                    style={{ height: conferenceHeight }}
                    aria-hidden="true"
                  />
                )}
                {d.journalCount > 0 && (
                  <div
                    className={`w-full min-h-[2px] transition-colors duration-200 ${
                      isHovered ? 'bg-primary' : 'bg-primary/75'
                    }`}
                    style={{ height: journalHeight }}
                    aria-hidden="true"
                  />
                )}
              </div>
            </div>
          )
        })}
      </div>

      {/* Hover tooltip */}
      {hoveredIndex !== null && yearDist[hoveredIndex] && (
        <div
          className="absolute top-1/2 z-20 pointer-events-none -translate-y-1/2"
          style={{ left: `${Math.min(Math.max(tooltipX, 0), containerWidth)}px`, transform: 'translate(-50%, -50%)' }}
        >
          <div className="bg-foreground text-background text-[11px] font-medium px-2.5 py-1.5 rounded-lg shadow-lg flex items-center gap-2 whitespace-nowrap">
            <span className="tabular-nums">{yearDist[hoveredIndex].year}</span>
            <span className="w-px h-3 bg-background/30" />
            <span className="text-primary-foreground/90">Journal {yearDist[hoveredIndex].journalCount}</span>
            <span className="text-sky-200">Conference {yearDist[hoveredIndex].conferenceCount}</span>
            <span className="text-background/70">Total {yearDist[hoveredIndex].count}</span>
          </div>
        </div>
      )}
      <div className="relative mt-1.5 h-3 text-xs text-muted-foreground/60 tabular-nums leading-none">
        {yearDist[0] && <span className="absolute left-0 top-0 whitespace-nowrap">{yearDist[0].year}</span>}
        <div className="absolute inset-0 flex items-center justify-center gap-3 text-[10px] text-muted-foreground/70 leading-none pointer-events-none">
          <span className="inline-flex items-center gap-1">
            <span className="h-2 w-2 rounded-sm bg-primary/75" aria-hidden="true" />
            Journal
          </span>
          <span className="inline-flex items-center gap-1">
            <span className="h-2 w-2 rounded-sm bg-sky-500/70" aria-hidden="true" />
            Conference
          </span>
        </div>
        {yearDist.length > 1 && (
          <span className="absolute right-0 top-0 whitespace-nowrap">{yearDist[yearDist.length - 1].year}</span>
        )}
      </div>
    </div>
  )
}
