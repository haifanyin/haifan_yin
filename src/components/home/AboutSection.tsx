'use client'

import { motion } from 'framer-motion'
import { Award, BookOpen, Briefcase, GraduationCap, Users, Zap } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { professorInfo } from '@/lib/data'
import { fadeInUp } from '@/lib/constants'
import SectionWrapper from '@/components/layout/SectionWrapper'
import SectionTitle from '@/components/layout/SectionTitle'
import TimelineItem from '@/components/home/TimelineItem'
export default function AboutSection() {
  return (
    <SectionWrapper id="about" className="bg-muted/30 pt-4 md:pt-6">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionTitle accent="blue" subtitle="Background, honors, and professional services">
          About
        </SectionTitle>

        <div className="grid lg:grid-cols-2 gap-10 lg:gap-16">
          {/* Left: Bio + Education + Experience */}
          <motion.div variants={fadeInUp} className="space-y-8">
            {/* Research Mission Statement */}
            <div className="relative overflow-hidden rounded-xl bg-gradient-to-br from-primary/5 via-primary/[0.02] to-transparent border border-primary/10 p-5">
              <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-bl-full -translate-y-1/2 translate-x-1/2" />
              <div className="relative z-10 flex items-start gap-3">
                <div className="w-9 h-9 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <Zap className="w-4 h-4 text-primary/70" />
                </div>
                <div>
                  <h3 className="text-xs font-semibold text-primary/70 uppercase tracking-wider mb-1.5">Research Mission</h3>
                  <p className="text-sm text-foreground/80 leading-relaxed">
                    Advancing the frontiers of 5G/6G wireless communications through fundamental research in massive MIMO, reconfigurable intelligent surfaces, and channel prediction — bridging theory and practice with real-world prototyping.
                  </p>
                </div>
              </div>
            </div>

            {/* Short Bio */}
            <div>
              <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-3">Short Bio</h3>
              <p className="text-sm leading-[1.8] text-foreground/85 rounded-lg px-1 -mx-1 py-0.5">
                {professorInfo.bio}
              </p>
            </div>

            {/* Education */}
            <div>
              <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-3 flex items-center gap-1.5">
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
              <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-3 flex items-center gap-1.5">
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
                  />
                ))}
              </div>
            </div>
          </motion.div>

          {/* Right: Honors + Services */}
          <motion.div variants={fadeInUp} className="space-y-8">
            {/* Honors & Awards */}
            <div>
              <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-4 flex items-center gap-1.5">
                <Award className="w-3.5 h-3.5" />
                Honors & Awards
              </h3>
              <div className="space-y-2 max-h-[460px] overflow-y-auto custom-scrollbar pr-2">
                {professorInfo.honors.map((honor, i) => {
                  const isTop = i < 3
                  const yearMatch = honor.match(/\b(19\d{2}|20\d{2})\b/)
                  return (
                    <div
                      key={i}
                      className={`flex items-start gap-2.5 py-2 px-3 rounded-lg transition-colors ${
                        isTop ? 'bg-amber-50/50 dark:bg-amber-900/10 border border-amber-200/30 dark:border-amber-800/20' : 'hover:bg-accent/50'
                      }`}
                    >
                      {isTop ? (
                        <Award className="w-4 h-4 text-amber-500 mt-0.5 flex-shrink-0" />
                      ) : (
                        <div className="w-1.5 h-1.5 rounded-full bg-muted-foreground/30 mt-1.5 flex-shrink-0" />
                      )}
                      <p className={`text-sm leading-relaxed flex-1 ${isTop ? 'font-medium' : 'text-muted-foreground'}`}>{honor}</p>
                      {yearMatch && (
                        <span className="text-[10px] text-muted-foreground/50 tabular-nums flex-shrink-0 mt-0.5">{yearMatch[0]}</span>
                      )}
                    </div>
                  )
                })}
              </div>
            </div>

            {/* Services */}
            <div>
              <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-4 flex items-center gap-1.5">
                <BookOpen className="w-3.5 h-3.5" />
                Reviewer for
              </h3>
              <div className="flex flex-wrap gap-1.5">
                {professorInfo.services.reviewer.map((journal) => (
                  <Badge key={journal} variant="secondary" className="text-[11px] bg-primary/5 text-primary/60 border-primary/10 font-normal">
                    {journal}
                  </Badge>
                ))}
              </div>

              <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mt-5 mb-3 flex items-center gap-1.5">
                <Users className="w-3.5 h-3.5" />
                TPC Member
              </h3>
              <div className="flex flex-wrap gap-1.5">
                {professorInfo.services.tpc.map((conf) => (
                  <Badge key={conf} variant="secondary" className="text-[11px] bg-primary/5 text-primary/60 border-primary/10 font-normal">
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
