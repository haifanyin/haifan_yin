'use client'

import { useState, useRef, useCallback, useMemo } from 'react'
import Image from 'next/image'
import { motion, AnimatePresence } from 'framer-motion'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { BookMarked, ChevronDown, ChevronUp, ExternalLink } from 'lucide-react'
import Link from 'next/link'
import { staggerItem } from '@/lib/constants'
import { getPublicationsByTopic, formatPublicationCitation } from '@/lib/data'
import type { ResearchTopic } from '@/types'
export default function ResearchCard({ topic, index, compact = false, hasChildren = false, childCount = 0 }: { topic: ResearchTopic; index: number; compact?: boolean; hasChildren?: boolean; childCount?: number }) {
  const [expanded, setExpanded] = useState(false)

  // 动态查询该 topic 关联的论文
  const topicPubs = useMemo(() => getPublicationsByTopic(topic.id), [topic.id])

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
        <div className={`grid md:grid-cols-[${compact ? '280px' : '380px'}_1fr] gap-0`}>
          <div className={`relative overflow-hidden bg-muted/30 ${compact ? 'h-44 md:h-auto md:min-h-[200px]' : 'h-52 md:h-auto md:min-h-[260px]'}`}>
            <Image
              src={topic.image}
              alt={topic.title}
              fill
              className="object-contain group-hover:scale-105 transition-transform duration-700 p-4"
            />
          </div>

          <CardContent className={`${compact ? 'p-4 md:p-5' : 'p-5 md:p-6'} flex flex-col`}>
            {/* Title + Paper Count */}
            <div className="flex items-center justify-between mb-2">
              <div>
                <h3 className={`font-bold tracking-tight ${compact ? 'text-base' : 'text-xl'}`}>{topic.title}</h3>
                <div className="decorative-line-blue w-12 mt-1.5" />
              </div>
              <div className="flex items-center gap-2">
                {hasChildren && (
                  <Link
                    href={`/research/${topic.id}`}
                    className="flex items-center gap-1 text-[10px] px-2 py-0.5 rounded-md bg-primary/5 text-primary/60 border border-primary/10 hover:bg-primary/10 transition-colors font-medium"
                  >
                    {childCount} sub-topic{childCount !== 1 ? 's' : ''}
                  </Link>
                )}
                <Badge className="text-[10px] px-2 py-0.5 bg-primary/10 text-primary/70 border-primary/10 font-medium">
                  <BookMarked className="w-3 h-3 mr-1" />
                  {topicPubs.length}
                </Badge>
              </div>
            </div>
            <p className={`${compact ? 'text-xs' : 'text-sm'} text-muted-foreground leading-relaxed`}>
              {topic.description}
            </p>
            {/* Top Collaborator */}

            {topicPubs.length > 0 && (
              <div className="mt-4 flex-1">
                <button
                  onClick={() => setExpanded(!expanded)}
                  className="flex items-center gap-1.5 text-xs font-medium text-primary/70 hover:text-primary transition-colors"
                >
                  <BookMarked className="w-3.5 h-3.5" />
                  {expanded ? 'Hide' : 'Show'} Key Papers ({topicPubs.length})
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
                        {topicPubs.map((pub, i) => (
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

            {topic.blogPosts && topic.blogPosts.length > 0 && (
              <div className="mt-4 pt-3 border-t border-border/50">
                <p className="text-xs font-medium text-muted-foreground mb-2">Blog Posts:</p>
                <div className="flex flex-wrap gap-2">
                  {topic.blogPosts.map((post, i) => (
                    <a
                      key={i}
                      href={post.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-xs academic-link flex items-center gap-1"
                    >
                      {post.title}
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  ))}
                </div>
              </div>
            )}
          </CardContent>
        </div>
      </Card>
    </motion.div>
  )
}
