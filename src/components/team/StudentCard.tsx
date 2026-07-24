'use client'

import { useState, useMemo } from 'react'
import Image from 'next/image'
import { motion, AnimatePresence } from 'framer-motion'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { ArrowRight, Award, BookMarked, Calendar, Check, ChevronDown, ChevronUp, Copy, Mail, Users } from 'lucide-react'
import { staggerItem } from '@/lib/constants'
import { getStudentFirstAuthorPapers } from '@/lib/data'
import type { Student } from '@/types'
import type { PageName } from '@/types'
export default function StudentCard({ student }: { student: Student; onNavigate?: (page: PageName) => void }) {
  const [showPapers, setShowPapers] = useState(false)
  const [emailCopied, setEmailCopied] = useState(false)
  const isPhd = student.degree === 'phd'

  // Auto-match first-authored publications from publications list
  const autoPapers = useMemo(() => getStudentFirstAuthorPapers(student.name), [student.name])
  // Prefer auto-matched papers, fall back to static papers
  const displayPapers = autoPapers.length > 0 ? autoPapers : (student.papers || [])
  const degreeClass = isPhd ? 'student-card-phd' : 'student-card-master'

  return (
    <motion.div variants={staggerItem}>
      <Card className={`overflow-hidden border-border/60 hover:shadow-lg transition-all duration-300 h-full student-card-accent ${degreeClass} !py-3 !gap-3`}>
        <CardContent className="p-3 sm:p-4">
          <div className="flex flex-col sm:flex-row items-center sm:items-start gap-3 sm:gap-4">
            <div className="w-28 sm:w-48 aspect-[3/4] rounded-xl overflow-hidden border border-primary/10 flex-shrink-0">
              <Image
                src={student.avatar}
                alt={student.name}
                width={192}
                height={256}
                className="w-full h-full object-cover student-avatar-img"
              />
            </div>

            <div className="flex-1 min-w-0 w-full sm:w-auto text-center sm:text-left">
              <div className="flex items-center gap-2 flex-wrap justify-center sm:justify-start">
                <h4 className="font-semibold text-sm">
                  {student.name}
                  <span className="text-muted-foreground font-normal ml-1.5">({student.nameCn})</span>
                </h4>
                <Badge
                  className={`text-[10px] px-2 py-0 border ${
                    isPhd
                      ? 'bg-rose-50 text-rose-700 border-rose-200 dark:bg-rose-900/15 dark:text-rose-400 dark:border-rose-800/25'
                      : 'bg-teal-50 text-teal-700 border-teal-200 dark:bg-teal-900/15 dark:text-teal-400 dark:border-teal-800/25'
                  }`}
                >
                  {isPhd ? 'Ph.D.' : 'Master'}
                </Badge>
                {student.graduated && student.destination && (
                  <Badge className="text-[10px] px-2 py-0 border bg-blue-50 text-blue-700 border-blue-200 dark:bg-blue-900/15 dark:text-blue-400 dark:border-blue-800/25 whitespace-normal">
                    → {student.destination}
                  </Badge>
                )}
              </div>

              {student.coSupervised && (
                <p className="text-xs text-primary/60 mt-0.5 flex items-center gap-1">
                  <Users className="w-3 h-3" />
                  Co-supervised with {student.coSupervised}
                </p>
              )}

              {/* Enrollment / Graduation dates */}
              {student.enrollDate && (
                <p className="text-xs text-muted-foreground mt-0.5 flex items-center gap-1">
                  <Calendar className="w-3 h-3 flex-shrink-0" />
                  {student.gradDate
                    ? <span>{student.enrollDate} — {student.gradDate}</span>
                    : <span>Enrolled: {student.enrollDate}</span>
                  }
                </p>
              )}

              <div className="flex items-center gap-1 mt-1">
                <a
                  href={`mailto:${student.email}`}
                  className="text-xs text-muted-foreground hover:text-foreground transition-colors flex items-center gap-1"
                >
                  <Mail className="w-3 h-3" />
                  {student.email}
                </a>
                <button
                  onClick={(e) => {
                    e.stopPropagation()
                    navigator.clipboard.writeText(student.email).then(() => {
                      setEmailCopied(true)
                      setTimeout(() => setEmailCopied(false), 2000)
                    })
                  }}
                  className="p-1 rounded-md hover:bg-accent transition-colors text-muted-foreground hover:text-foreground"
                  title="Copy email"
                >
                  {emailCopied ? <Check className="w-3 h-3 text-emerald-500" /> : <Copy className="w-3 h-3" />}
                </button>
              </div>

              <div className="flex flex-wrap gap-1.5 mt-2">
                {student.researchTopics.map((topic) => (
                  <Badge
                    key={topic}
                    variant="secondary"
                    className="text-[10px] px-2 py-0 border bg-muted text-muted-foreground border-border/60"
                  >
                    {topic}
                  </Badge>
                ))}
              </div>

              {student.awards && student.awards.length > 0 && (
                <div className="mt-2.5 space-y-1">
                  {student.awards.map((award, i) => (
                    <div key={i} className="flex items-start gap-1.5 text-xs text-amber-700 dark:text-amber-400">
                      <Award className="w-3 h-3 mt-0.5 flex-shrink-0" />
                      <span>{award}</span>
                    </div>
                  ))}
                </div>
              )}

              {displayPapers.length > 0 && (
                <div className="mt-3">
                  <button
                    onClick={() => setShowPapers(!showPapers)}
                    className="flex items-center gap-1.5 text-xs font-medium text-primary/70 hover:text-primary transition-colors"
                  >
                    <BookMarked className="w-3.5 h-3.5" />
                    {showPapers ? 'Hide' : 'Show'} Papers ({displayPapers.length})
                    {showPapers ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
                  </button>
                  <AnimatePresence>
                    {showPapers && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className="overflow-hidden"
                      >
                        <div className="mt-2 space-y-1.5 max-h-48 overflow-y-auto custom-scrollbar">
                          {displayPapers.map((paper, i) => (
                            <div key={i} className="text-xs text-muted-foreground leading-relaxed bg-muted/50 rounded-lg p-2">
                              <span className="font-medium text-foreground/70">[{i + 1}]</span>{' '}
                              {paper.citation}
                              {paper.link && (
                                <a href={paper.link} target="_blank" rel="noopener noreferrer" className="academic-link ml-1">[Link]</a>
                              )}
                            </div>
                          ))}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              )}

              {/* View Profile link */}
              <div className="mt-3 pt-2 border-t border-border/30">
                {student.profileUrl ? (
                  <a
                    href={student.profileUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[11px] text-primary/70 hover:text-primary font-medium flex items-center gap-1 transition-colors"
                  >
                    <ArrowRight className="w-3 h-3" />
                    View Profile
                  </a>
                ) : (
                  <span className="text-[11px] text-primary/50 font-medium flex items-center gap-1 cursor-default">
                    <ArrowRight className="w-3 h-3" />
                    View Profile
                  </span>
                )}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  )
}
