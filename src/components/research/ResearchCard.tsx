'use client'

import { useState, useRef, useCallback, useMemo } from 'react'
import Image from 'next/image'
import { motion, AnimatePresence } from 'framer-motion'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { BookMarked, CalendarDays, ChevronDown, ChevronUp } from 'lucide-react'
import { staggerItem } from '@/lib/constants'
import { getPublicationsByTopic, formatPublicationCitation } from '@/lib/data'
import type { ResearchTopic } from '@/types'
export default function ResearchCard({ topic }: { topic: ResearchTopic }) {
  const [expanded, setExpanded] = useState(false)

  // 动态查询该 topic 关联的论文（通过 publications.ts 中的 topicIds）
  const papers = useMemo(() => getPublicationsByTopic(topic.id), [topic.id])
  const publicationYears = papers.map((paper) => paper.year)
  const publicationYearRange = publicationYears.length === 0
    ? '—'
    : (() => {
        const firstYear = Math.min(...publicationYears)
        const lastYear = Math.max(...publicationYears)
        return firstYear === lastYear ? String(firstYear) : `${firstYear}–${lastYear}`
      })()

  // 3D tilt effect
  const cardRef = useRef<HTMLDivElement>(null)
  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    const el = cardRef.current
    if (!el) return
    const rect = el.getBoundingClientRect()
    const x = (e.clientX - rect.left) / rect.width
    const y = (e.clientY - rect.top) / rect.height
    const rotateX = (y - 0.5) * -2 // max 1 degree
    const rotateY = (x - 0.5) * 2  // max 1 degree
    el.style.transform = `perspective(800px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`
  }, [])
  const handleMouseLeave = useCallback(() => {
    const el = cardRef.current
    if (!el) return
    el.style.transform = 'perspective(800px) rotateX(0deg) rotateY(0deg)'
  }, [])

  return (
    <motion.div variants={staggerItem} id={topic.id} className="scroll-mt-20">
      <Card ref={cardRef} onMouseMove={handleMouseMove} onMouseLeave={handleMouseLeave} className="overflow-hidden border-border/60 hover:shadow-lg transition-[shadow,transform] duration-300 ease-out group">
        <div className="grid md:grid-cols-[380px_1fr] gap-0">
          <div className="relative h-52 md:h-auto md:min-h-[260px] overflow-hidden bg-muted/30">
            <Image
              src={topic.image}
              alt={topic.title}
              fill
              className="object-contain group-hover:scale-105 transition-transform duration-700 p-4"
            />
          </div>

          <CardContent className="p-5 md:p-6 flex flex-col">
            {/* Title + Publication Year Range */}
            <div className="flex items-center justify-between mb-2">
              <div>
                <h3 className="font-bold tracking-tight text-xl">{topic.title}</h3>
                <motion.div
                  className="decorative-line-blue w-16 mt-1.5"
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: 1 }}
                  style={{ transformOrigin: 'left' }}
                  transition={{ duration: 0.5, delay: 0.15, ease: 'easeOut' }}
                />
              </div>
              <div className="flex items-center gap-2">
                <Badge
                  title="Publication years"
                  className="text-[10px] px-2 py-0.5 bg-primary/10 text-primary/70 border-primary/10 font-medium"
                >
                  <CalendarDays className="w-3 h-3 mr-1" />
                  {publicationYearRange}
                </Badge>
              </div>
            </div>
            <p className="text-sm text-muted-foreground leading-relaxed">
              {topic.description}
            </p>
            {papers.length > 0 && (
              <div className="mt-4 flex-1">
                <button
                  onClick={() => setExpanded(!expanded)}
                  className="flex items-center gap-1.5 text-xs font-medium text-primary/70 hover:text-primary transition-colors"
                >
                  <BookMarked className="w-3.5 h-3.5" />
                  {expanded ? 'Hide' : 'Show'} Paper{papers.length > 1 ? 's' : ''} ({papers.length})
                  {expanded ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
                </button>
                <AnimatePresence>
                  {expanded && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      className="overflow-hidden"
                    >
                      <div className="mt-3 space-y-2 max-h-64 overflow-y-auto custom-scrollbar">
                        {papers.map((pub, i) => (
                          <div key={i} className="text-xs text-muted-foreground leading-relaxed bg-muted/50 rounded-lg p-2.5">
                            <span className="font-medium text-foreground/70">[{i + 1}]</span>{' '}
                            {formatPublicationCitation(pub)}
                            {pub.link && (
                              <a href={pub.link} target="_blank" rel="noopener noreferrer" className="academic-link ml-1 text-xs">[Link]</a>
                            )}
                          </div>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            )}

          </CardContent>
        </div>
      </Card>
    </motion.div>
  )
}
