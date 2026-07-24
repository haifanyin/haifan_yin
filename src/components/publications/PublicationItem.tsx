'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Braces, Check, ChevronDown, ChevronUp, Copy, ExternalLink } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { staggerItem } from '@/lib/constants'
import { generateBibTeX, getHighlightBadge, getVenueBadge } from '@/lib/utils'
import type { Publication } from '@/lib/data'
export default function PublicationItem({ pub, index, type }: { pub: Publication; index: number; type: 'journal' | 'conference' }) {
  const [copied, setCopied] = useState(false)
  const [bibtexOpen, setBibtexOpen] = useState(false)
  const [bibtexCopied, setBibtexCopied] = useState(false)
  const [abstractOpen, setAbstractOpen] = useState(false)
  const venueDisplay = pub.journal
    ? `${pub.journal}, vol. ${pub.volume}${pub.number ? `, no. ${pub.number}` : ''}, pp. ${pub.pages}`
    : `${pub.booktitle}, pp. ${pub.pages}`
  const citationText = `[${index + 1}] ${pub.authors.join(', ')}, \"${pub.title},\" ${venueDisplay}, ${pub.year}.`
  const bibtexText = generateBibTeX(pub, index)
  const highlightBadge = pub.highlight ? getHighlightBadge(pub.highlight) : null

  const handleCopy = () => {
    navigator.clipboard.writeText(citationText).then(() => {
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    })
  }

  const handleCopyBibTeX = () => {
    navigator.clipboard.writeText(bibtexText).then(() => {
      setBibtexCopied(true)
      setTimeout(() => setBibtexCopied(false), 2000)
    })
  }

  return (
    <motion.div variants={staggerItem} className="group">
      <div className={`flex gap-3 py-3.5 px-3 rounded-lg hover:bg-accent/50 transition-colors ${highlightBadge ? `border-l-[3px] ${highlightBadge.borderClass}` : ''}`}>
        <span className="pub-number text-xs mt-1 flex-shrink-0 tabular-nums">[{index + 1}]</span>
        <div className="flex-1 min-w-0">
          <p className="text-sm leading-relaxed break-words [overflow-wrap:anywhere]">
            {pub.authors.map((author, i) => {
              const name = author.trim()
              if (name === 'Haifan Yin') {
                return <span key={i}>{i > 0 ? <span className="text-muted-foreground">, </span> : ''}<strong className="text-foreground">{name}</strong></span>
              }
              return <span key={i} className="text-muted-foreground">{i > 0 ? ', ' : ''}{name}</span>
            })}
            , &ldquo;<span className="text-foreground/90">{pub.title}</span>,&rdquo;{' '}
            <em className="text-muted-foreground">{venueDisplay}, {pub.year}.</em>
            {(() => { const badge = getVenueBadge(pub.journal || pub.booktitle || ''); return badge ? (
              <Badge variant="secondary" className={`text-[9px] px-1.5 py-0 rounded ml-1.5 align-middle border ${badge.colorClass}`}>{badge.label}</Badge>
            ) : null })()}
            {pub.highlight && (
              <Badge variant="secondary" className={`text-[10px] px-1.5 py-0 rounded border ml-1.5 align-middle ${highlightBadge ? highlightBadge.colorClass : 'bg-amber-50 text-amber-700 border-amber-200 dark:bg-amber-900/20 dark:text-amber-400 dark:border-amber-800/30'}`}>
                {pub.highlight}
              </Badge>
            )}
            {pub.link && (
              <a href={pub.link} target="_blank" rel="noopener noreferrer" className="academic-link ml-1 text-xs">
                [Link]
              </a>
            )}
          </p>
          {/* Abstract expandable */}
          {pub.abstract && (
            <div className="mt-2">
              <button
                onClick={() => setAbstractOpen(!abstractOpen)}
                className="flex items-center gap-1 text-xs font-medium text-primary/70 hover:text-primary transition-colors"
              >
                {abstractOpen ? <ChevronUp className="w-3 h-3" /> : <ChevronDown className="w-3 h-3" />}
                {abstractOpen ? 'Hide' : 'Show'} Abstract
              </button>
              <AnimatePresence>
                {abstractOpen && (
                  <motion.div
                    initial={{ opacity: 0, maxHeight: 0 }}
                    animate={{ opacity: 1, maxHeight: 200 }}
                    exit={{ opacity: 0, maxHeight: 0 }}
                    transition={{ duration: 0.3, ease: 'easeInOut' }}
                    className="overflow-hidden"
                  >
                    <p className="mt-1.5 text-xs text-muted-foreground leading-relaxed bg-muted/50 rounded-lg p-3 border border-border/30">
                      {pub.abstract}
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          )}
          {/* BibTeX expandable */}
          <AnimatePresence>
            {bibtexOpen && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="overflow-hidden"
              >
                <div className="mt-2 relative">
                  <pre className="text-[11px] leading-relaxed bg-muted/70 dark:bg-muted/40 rounded-lg p-3 font-mono overflow-x-auto custom-scrollbar border border-border/40">
                    {bibtexText}
                  </pre>
                  <button
                    onClick={handleCopyBibTeX}
                    className="absolute top-2 right-2 p-1.5 rounded-md bg-background/80 hover:bg-accent transition-colors text-muted-foreground hover:text-foreground"
                    title="Copy BibTeX"
                  >
                    {bibtexCopied ? <Check className="w-3 h-3 text-emerald-500" /> : <Copy className="w-3 h-3" />}
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
        <div className="flex flex-col gap-1 flex-shrink-0 opacity-0 group-hover:opacity-100 transition-opacity">
          <button onClick={handleCopy} className="copy-btn p-1.5 rounded-md text-muted-foreground hover:text-foreground hover:bg-accent" title="Copy citation">
            {copied ? <Check className="w-3.5 h-3.5 text-emerald-500" /> : <Copy className="w-3.5 h-3.5" />}
          </button>
          <button onClick={() => setBibtexOpen(!bibtexOpen)} className="copy-btn p-1.5 rounded-md text-muted-foreground hover:text-foreground hover:bg-accent" title={bibtexOpen ? 'Hide BibTeX' : 'Show BibTeX'}>
            <Braces className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </motion.div>
  )
}
