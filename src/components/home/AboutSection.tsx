'use client'

import { motion } from 'framer-motion'
import { Award, BookOpen, Briefcase, GraduationCap, Users } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { professorInfo } from '@/lib/data'
import { fadeInUp } from '@/lib/constants'
import SectionWrapper from '@/components/layout/SectionWrapper'
import SectionTitle from '@/components/layout/SectionTitle'
import TimelineItem from '@/components/home/TimelineItem'
import type { ReactNode } from 'react'

function renderBioWithLinks(bio: string, links: { text: string; url: string }[]) {
  let nodes: ReactNode[] = [bio]
  for (const link of links) {
    const next: ReactNode[] = []
    for (const node of nodes) {
      if (typeof node !== 'string' || !node.includes(link.text)) {
        next.push(node)
        continue
      }
      const parts = node.split(link.text)
      parts.forEach((part, index) => {
        if (index > 0) {
          next.push(
            <a key={`${link.text}-${index}`} href={link.url} target="_blank" rel="noopener noreferrer" className="academic-link">
              {link.text}
            </a>,
          )
        }
        if (part) next.push(part)
      })
    }
    nodes = next
  }
  return nodes
}

const sortedHonors = professorInfo.honors
  .map((honor, index) => ({ honor, index }))
  .sort((a, b) => {
    const yearA = a.honor.year ? Number(a.honor.year) : -Infinity
    const yearB = b.honor.year ? Number(b.honor.year) : -Infinity
    return yearB - yearA || a.index - b.index
  })
  .map(({ honor }) => honor)

export default function AboutSection() {
  return (
    <SectionWrapper id="about" className="bg-gradient-to-b from-blue-50/70 via-background to-indigo-50/35 dark:from-blue-950/15 dark:via-background dark:to-indigo-950/10 !pt-6 md:!pt-8 !pb-10 md:!pb-14">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionTitle className="!mb-8 md:!mb-10" accent="blue" subtitle="Background, honors, and professional services">
          About
        </SectionTitle>

        <div className="grid lg:grid-cols-2 gap-10 lg:gap-16">
          {/* Left: Bio + Education + Experience */}
          <motion.div variants={fadeInUp} className="space-y-6">
            {/* Short Bio */}
            <div className="relative overflow-hidden rounded-xl border border-border/50 bg-card/55 p-5 shadow-sm">
              <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-primary/50 via-primary/20 to-transparent" />
              <h3 className="text-sm font-semibold text-primary/75 uppercase tracking-[0.12em] mb-3">Short Bio</h3>
              <p className="text-[15px] leading-7 text-foreground/85">
                {renderBioWithLinks(professorInfo.bio, professorInfo.bioLinks)}
              </p>
            </div>

            <div className="grid gap-7 sm:grid-cols-2">
              {/* Education */}
              <div>
                <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-[0.1em] mb-3 flex items-center gap-1.5">
                  <GraduationCap className="w-3.5 h-3.5" />
                  Education
                </h3>
                <div>
                  {professorInfo.education.map((edu, i) => (
                    <TimelineItem
                      key={i}
                      period={edu.year}
                      title={`${edu.degree} in ${edu.field}`}
                      subtitle={edu.school}
                      isLast={i === professorInfo.education.length - 1}
                    />
                  ))}
                </div>
              </div>

              {/* Work Experience */}
              <div>
                <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-[0.1em] mb-3 flex items-center gap-1.5">
                  <Briefcase className="w-3.5 h-3.5" />
                  Work Experience
                </h3>
                <div>
                  {professorInfo.experience.map((exp, i) => (
                    <TimelineItem
                      key={i}
                      period={exp.period}
                      title={exp.role}
                      subtitle={exp.org}
                      isLast={i === professorInfo.experience.length - 1}
                      isCurrent={i === 0}
                    />
                  ))}
                </div>
              </div>
            </div>
          </motion.div>

          {/* Right: Honors + Services */}
          <motion.div variants={fadeInUp} className="space-y-6 rounded-2xl border border-blue-100/80 bg-white/55 p-5 shadow-sm dark:border-blue-900/30 dark:bg-card/35 md:p-6">
            {/* Honors & Awards */}
            <div>
              <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-[0.1em] mb-4 flex items-center gap-1.5">
                <Award className="w-3.5 h-3.5" />
                Honors & Awards
              </h3>
              <div className="space-y-2 max-h-[460px] overflow-y-auto custom-scrollbar pr-2">
                {sortedHonors.map((honor, i) => {
                  const isTop = honor.highlight
                  return (
                    <div
                      key={i}
                      className={`group flex items-start gap-2.5 py-2.5 px-3 rounded-lg transition-all duration-200 hover:shadow-sm ${
                        isTop
                          ? 'bg-amber-50/50 dark:bg-amber-900/10 border border-amber-200/30 dark:border-amber-800/20 hover:bg-amber-100/70 hover:border-amber-300/60 dark:hover:bg-amber-900/20 dark:hover:border-amber-700/40 dark:hover:shadow-amber-950/20'
                          : 'hover:bg-accent/50'
                      }`}
                    >
                      <span className="flex w-4 h-4 items-center justify-center mt-0.5 flex-shrink-0">
                        {isTop ? (
                          <Award className="w-4 h-4 text-amber-500 transition-transform duration-200 group-hover:scale-110 group-hover:rotate-6" />
                        ) : (
                          <span className="w-1.5 h-1.5 rounded-full bg-muted-foreground/30" />
                        )}
                      </span>
                      <p className={`text-[15px] leading-relaxed flex-1 ${isTop ? 'font-medium' : 'text-muted-foreground'}`}>{honor.title}</p>
                      {honor.year && (
                        <span className="inline-flex flex-shrink-0 items-center rounded-md border border-border/70 bg-background/75 px-2 py-1 text-xs font-semibold text-muted-foreground tabular-nums">{honor.year}</span>
                      )}
                    </div>
                  )
                })}
              </div>
            </div>

            {/* Services */}
            <div>
              <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-[0.1em] mb-4 flex items-center gap-1.5">
                <BookOpen className="w-3.5 h-3.5" />
                Reviewer for
              </h3>
              <div className="flex flex-wrap gap-1.5">
                {professorInfo.services.reviewer.map((journal) => (
                  <Badge key={journal} variant="secondary" className="text-xs px-2.5 py-1 bg-primary/5 text-primary/60 border-primary/10 font-normal">
                    {journal}
                  </Badge>
                ))}
              </div>

              <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-[0.1em] mt-6 mb-3 flex items-center gap-1.5">
                <Users className="w-3.5 h-3.5" />
                TPC Member
              </h3>
              <div className="flex flex-wrap gap-1.5">
                {professorInfo.services.tpc.map((conf) => (
                  <Badge key={conf} variant="secondary" className="text-xs px-2.5 py-1 bg-primary/5 text-primary/60 border-primary/10 font-normal">
                    {conf}
                  </Badge>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </SectionWrapper>
  )
}
