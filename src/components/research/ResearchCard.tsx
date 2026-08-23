'use client'

import { useState, useRef, useCallback, useMemo } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { ArrowUpRight, BookMarked, BookOpenText, CalendarDays, ChevronDown, ChevronUp } from 'lucide-react'
import { staggerItem } from '@/lib/constants'
import { formatPublicationCitation, getPublicationsByTopic, researchBlogs } from '@/lib/data'
import type { ResearchTopic } from '@/types'
export default function ResearchCard({ topic }: { topic: ResearchTopic }) {
  const [expanded, setExpanded] = useState(false)

  // 动态查询该 topic 关联的论文（通过 publications.ts 中的 topicIds）
  const papers = useMemo(() => getPublicationsByTopic(topic.id), [topic.id])
  const topicBlogs = useMemo(() => researchBlogs.filter((blog) => blog.topicId === topic.id), [topic.id])
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
                  className="relative gap-1.5 rounded-full border border-primary/20 bg-primary/[0.07] px-2.5 py-1 text-[10px] font-semibold tracking-[0.02em] text-primary shadow-sm shadow-primary/5 transition-all duration-300 group-hover:border-primary/35 group-hover:bg-primary/[0.1]"
                >
                  <span className="flex h-4 w-4 items-center justify-center rounded-full bg-primary/10">
                    <CalendarDays className="h-3 w-3" />
                  </span>
                  <span className="tabular-nums">{publicationYearRange}</span>
                  <span className="pointer-events-none absolute inset-x-2 bottom-0 h-px bg-gradient-to-r from-transparent via-primary/40 to-transparent" aria-hidden="true" />
                </Badge>
              </div>
            </div>
            <p className="text-sm text-muted-foreground leading-relaxed">
              {topic.description}
            </p>
            {(papers.length > 0 || topicBlogs.length > 0) && (
              <div className="mt-4 flex-1">
                <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
                  {papers.length > 0 && (
                    <button
                      onClick={() => setExpanded(!expanded)}
                      className="flex items-center gap-1.5 text-xs font-medium text-primary/70 transition-colors hover:text-primary"
                    >
                      <BookMarked className="h-3.5 w-3.5" />
                      {expanded ? 'Hide' : 'Show'} Paper{papers.length > 1 ? 's' : ''} ({papers.length})
                      {expanded ? <ChevronUp className="h-3.5 w-3.5" /> : <ChevronDown className="h-3.5 w-3.5" />}
                    </button>
                  )}
                  {topicBlogs.length > 0 && (
                    <Link
                      href={`/research/${topic.id}/blogs`}
                      className="group/blog inline-flex items-center gap-1.5 rounded-full border border-primary/20 bg-primary/[0.06] px-3 py-1.5 text-xs font-semibold text-primary transition-all hover:border-primary/35 hover:bg-primary/[0.1]"
                    >
                      <BookOpenText className="h-3.5 w-3.5" />
                      Technical Blogs ({topicBlogs.length})
                      <ArrowUpRight className="h-3.5 w-3.5 transition-transform group-hover/blog:translate-x-0.5 group-hover/blog:-translate-y-0.5" />
                    </Link>
                  )}
                </div>
                {papers.length > 0 && (
                  <AnimatePresence>
                    {expanded && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className="overflow-hidden"
                      >
                        <div className="mt-3 max-h-64 space-y-2 overflow-y-auto custom-scrollbar">
                          {papers.map((pub, i) => (
                            <div key={i} className="rounded-lg bg-muted/50 p-2.5 text-xs leading-relaxed text-muted-foreground">
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
                )}
              </div>
            )}
          </CardContent>
        </div>
      </Card>
    </motion.div>
  )
}
