'use client'

import { useState, useMemo, useEffect, useRef } from 'react'
import { motion, useInView, useMotionValue, animate } from 'framer-motion'
import { Award, BookOpen, Briefcase, ChevronDown, GraduationCap, Search, Users, X } from 'lucide-react'
import type { LucideIcon } from 'lucide-react'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { teachers, phdStudents, masterStudents, graduatedPhdStudents, graduatedMasterStudents } from '@/lib/data'
import { fadeInUp } from '@/lib/constants'
import type { Student } from '@/types'
import SectionWrapper from '@/components/layout/SectionWrapper'
import SectionTitle from '@/components/layout/SectionTitle'
import TeacherCard from '@/components/team/TeacherCard'
import StudentCard from '@/components/team/StudentCard'

/** Ruled section header: icon + title + count badge + a colored accent underline. */
function SectionHeader({ icon: Icon, title, count, iconClass, iconGrad, badgeClass, sub = false }: { icon: LucideIcon; title: string; count: number; iconClass: string; iconGrad: string; badgeClass: string; sub?: boolean }) {
  return (
    <div className="mb-5">
      <div className="flex items-center gap-2.5">
        <div className={`flex-shrink-0 ${sub ? 'w-7 h-7' : 'w-8 h-8'} rounded-lg flex items-center justify-center bg-gradient-to-br ${iconGrad}`}>
          <Icon className={`${sub ? 'w-3.5 h-3.5' : 'w-4 h-4'} ${iconClass}`} />
        </div>
        <h3 className={`font-bold tracking-tight ${sub ? 'text-lg' : 'text-xl md:text-2xl'} ${iconClass}`}>
          {title}
        </h3>
        <Badge variant="secondary" className={`text-xs ${badgeClass}`}>{count}</Badge>
      </div>
      <div className={`mt-2 ml-1 h-0.5 w-12 rounded-full bg-gradient-to-r ${iconGrad}`} />
    </div>
  )
}

/** Single stats tile with a one-shot count-up animation on scroll-in. */
function StatTile({ icon: Icon, count, label, accent, iconClass, iconGrad }: { icon: LucideIcon; count: number; label: string; accent: string; iconClass: string; iconGrad: string }) {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })
  const mv = useMotionValue(0)
  const [display, setDisplay] = useState(0)

  useEffect(() => {
    if (!inView) return
    const controls = animate(mv, count, {
      duration: 0.9,
      ease: 'easeOut',
      onUpdate: (v) => setDisplay(Math.round(v)),
    })
    return () => controls.stop()
  }, [inView, count, mv])

  return (
    <div ref={ref} className="team-stat-tile group relative flex items-center gap-3 rounded-xl border border-border/60 bg-card p-3.5 shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:shadow-md hover:border-border overflow-hidden">
      {/* top accent gradient */}
      <div className={`absolute inset-x-0 top-0 h-[2px] bg-gradient-to-r ${accent} opacity-70`} />
      <div className={`flex-shrink-0 w-10 h-10 rounded-lg flex items-center justify-center bg-gradient-to-br ${iconGrad}`}>
        <Icon className={`w-4 h-4 ${iconClass}`} />
      </div>
      <div className="min-w-0">
        <div className="text-2xl font-bold tracking-tight tabular-nums leading-none">{display}</div>
        <div className="text-xs font-medium text-muted-foreground mt-1.5">{label}</div>
      </div>
    </div>
  )
}

export default function StudentsSection({ hideTitle = false }: { hideTitle?: boolean } = {}) {
  const [destFilter] = useState<string>('all')
  const [searchQuery, setSearchQuery] = useState('')
  const [alumniExpanded, setAlumniExpanded] = useState(false)
  const INITIAL_ALUMNI = 6

  // Sort helpers: primary by date desc, secondary by name pinyin when dates equal
  const sortByEnrollDesc = (a: Student, b: Student) => (b.enrollDate || '').localeCompare(a.enrollDate || '') || (a.nameCn || '').localeCompare(b.nameCn || '', 'zh')
  const sortByGradDesc = (a: Student, b: Student) => (b.gradDate || '').localeCompare(a.gradDate || '') || (a.nameCn || '').localeCompare(b.nameCn || '', 'zh')

  const filteredPhd = useMemo(() => {
    const q = searchQuery.trim().toLowerCase()
    const base = phdStudents.filter(s => {
      if (q && !s.name.toLowerCase().includes(q) && !s.nameCn.includes(q) && !s.researchTopics.some(t => t.toLowerCase().includes(q))) return false
      return true
    })
    return [...base].sort(sortByEnrollDesc)
  }, [searchQuery])

  const filteredMaster = useMemo(() => {
    const q = searchQuery.trim().toLowerCase()
    const base = masterStudents.filter(s => {
      if (q && !s.name.toLowerCase().includes(q) && !s.nameCn.includes(q) && !s.researchTopics.some(t => t.toLowerCase().includes(q))) return false
      return true
    })
    return [...base].sort(sortByEnrollDesc)
  }, [searchQuery])

  const filteredGraduatedPhd = useMemo(() => {
    const q = searchQuery.trim().toLowerCase()
    let base = graduatedPhdStudents.filter(s => {
      if (q && !s.name.toLowerCase().includes(q) && !s.nameCn.includes(q) && !s.researchTopics.some(t => t.toLowerCase().includes(q))) return false
      return true
    })
    if (destFilter !== 'all') base = base.filter(s => s.destination === destFilter)
    return [...base].sort(sortByGradDesc)
  }, [destFilter, searchQuery])

  const filteredGraduatedMaster = useMemo(() => {
    const q = searchQuery.trim().toLowerCase()
    let base = graduatedMasterStudents.filter(s => {
      if (q && !s.name.toLowerCase().includes(q) && !s.nameCn.includes(q) && !s.researchTopics.some(t => t.toLowerCase().includes(q))) return false
      return true
    })
    if (destFilter !== 'all') base = base.filter(s => s.destination === destFilter)
    return [...base].sort(sortByGradDesc)
  }, [destFilter, searchQuery])

  const graduatedTotal = filteredGraduatedPhd.length + filteredGraduatedMaster.length

  // Stats for team page
  const totalCurrent = useMemo(() => phdStudents.length + masterStudents.length, [])

  return (
    <SectionWrapper id="students" className="dot-pattern pt-2 md:pt-2 !pb-6 md:!pb-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {!hideTitle && (
          <SectionTitle subtitle="Meet the talented researchers in our group">
            Students
          </SectionTitle>
        )}

        {/* Member Stats Bar (team page: hideTitle is true) */}
        {hideTitle && (
          <motion.div variants={fadeInUp} className="mb-5">
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
              <StatTile icon={Users} count={teachers.length + totalCurrent} label="Total Members" accent="from-violet-500 to-violet-400" iconClass="text-violet-700 dark:text-violet-400" iconGrad="from-violet-500/15 to-violet-400/10" />
              <StatTile icon={Briefcase} count={teachers.length} label="Teachers" accent="from-violet-500 to-violet-400" iconClass="text-violet-700 dark:text-violet-400" iconGrad="from-violet-500/15 to-violet-400/10" />
              <StatTile icon={GraduationCap} count={phdStudents.length} label="Ph.D. Students" accent="from-rose-500 to-rose-400" iconClass="text-red-800 dark:text-red-400" iconGrad="from-rose-500/15 to-rose-400/10" />
              <StatTile icon={BookOpen} count={masterStudents.length} label="Master Students" accent="from-emerald-500 to-emerald-400" iconClass="text-emerald-600 dark:text-emerald-400" iconGrad="from-emerald-500/15 to-emerald-400/10" />
              <StatTile icon={Award} count={graduatedPhdStudents.length + graduatedMasterStudents.length} label="Alumni" accent="from-amber-500 to-amber-400" iconClass="text-amber-600 dark:text-amber-400" iconGrad="from-amber-500/15 to-amber-400/10" />
            </div>
          </motion.div>
        )}

        {/* Teachers Section */}
        {teachers.length > 0 && (
          <motion.div variants={fadeInUp} className="mb-10" id="nav-teachers">
            <SectionHeader icon={Briefcase} title="Teachers" count={teachers.length} iconClass="text-violet-700 dark:text-violet-400" iconGrad="from-violet-500/15 to-violet-400/10" badgeClass="bg-violet-50 text-violet-700 border-violet-200 dark:bg-violet-900/15 dark:text-violet-400 dark:border-violet-800/25" />
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {teachers.map((teacher) => (
                <TeacherCard key={teacher.name} teacher={teacher} />
              ))}
            </div>
          </motion.div>
        )}

        {/* Search */}
        <motion.div variants={fadeInUp} className="mb-8">
          <div className="relative max-w-sm">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              placeholder="Search by name or research topic..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-9 pr-8 bg-card"
            />
            {searchQuery && (
              <button onClick={() => setSearchQuery('')} className="absolute right-2.5 top-1/2 -translate-y-1/2 p-0.5 rounded text-muted-foreground hover:text-foreground transition-colors">
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>
        </motion.div>

        {/* Ph.D. Students */}
        <motion.div variants={fadeInUp} className="mb-10" id="nav-phd">
          <SectionHeader icon={GraduationCap} title="Ph.D. Students" count={filteredPhd.length} iconClass="text-red-800 dark:text-red-400" iconGrad="from-rose-500/15 to-rose-400/10" badgeClass="bg-red-50 text-red-800 border-red-200 dark:bg-red-900/15 dark:text-red-400 dark:border-red-800/25" />
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
            {filteredPhd.map((student) => (
              <StudentCard key={student.email} student={student} />
            ))}
          </div>
          {filteredPhd.length === 0 && (
            <div className="text-center py-8 text-muted-foreground text-sm">No Ph.D. students match the selected topic.</div>
          )}
        </motion.div>

        {/* Master Students */}
        <motion.div variants={fadeInUp} id="nav-master">
          <SectionHeader icon={BookOpen} title="Master Students" count={filteredMaster.length} iconClass="text-emerald-600 dark:text-emerald-400" iconGrad="from-emerald-500/15 to-emerald-400/10" badgeClass="bg-emerald-50 text-emerald-700 border-emerald-200 dark:bg-emerald-900/15 dark:text-emerald-400 dark:border-emerald-800/25" />
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
            {filteredMaster.map((student) => (
              <StudentCard key={student.email} student={student} />
            ))}
          </div>
          {filteredMaster.length === 0 && (
            <div className="text-center py-8 text-muted-foreground text-sm">No Master students match the selected topic.</div>
          )}
        </motion.div>

        {/* Alumni Section */}
        {graduatedTotal > 0 && (
          <motion.div variants={fadeInUp} className="mt-10 pt-8 border-t border-border/40" id="nav-alumni">
            <SectionHeader icon={Award} title="Alumni" count={graduatedTotal} iconClass="text-amber-600 dark:text-amber-400" iconGrad="from-amber-500/15 to-amber-400/10" badgeClass="bg-amber-50 text-amber-700 border-amber-200 dark:bg-amber-900/15 dark:text-amber-400 dark:border-amber-800/25" />

            {filteredGraduatedPhd.length > 0 && (
              <div className="mb-8">
                <SectionHeader sub icon={GraduationCap} title="Ph.D. Alumni" count={filteredGraduatedPhd.length} iconClass="text-red-800 dark:text-red-400" iconGrad="from-rose-500/15 to-rose-400/10" badgeClass="bg-red-50 text-red-800 border-red-200 dark:bg-red-900/15 dark:text-red-400 dark:border-red-800/25" />
                <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
                  {filteredGraduatedPhd.map((student) => (
                    <StudentCard key={student.email} student={student} />
                  ))}
                </div>
              </div>
            )}

            {filteredGraduatedMaster.length > 0 && (
              <div className="mb-4">
                <SectionHeader sub icon={BookOpen} title="Master Alumni" count={filteredGraduatedMaster.length} iconClass="text-emerald-600 dark:text-emerald-400" iconGrad="from-emerald-500/15 to-emerald-400/10" badgeClass="bg-emerald-50 text-emerald-700 border-emerald-200 dark:bg-emerald-900/15 dark:text-emerald-400 dark:border-emerald-800/25" />

                <div className="relative">
                  <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
                    {(alumniExpanded ? filteredGraduatedMaster : filteredGraduatedMaster.slice(0, INITIAL_ALUMNI)).map((student) => (
                      <StudentCard key={student.email} student={student} />
                    ))}
                  </div>

                  {/* Fade-out overlay + Reveal button */}
                  {!alumniExpanded && filteredGraduatedMaster.length > INITIAL_ALUMNI && (
                    <div className="absolute bottom-0 left-0 right-0 flex flex-col items-center justify-end pointer-events-none z-10">
                      {/* Background gradient matching the page background — full height overlap */}
                      <div className="absolute inset-0 bg-gradient-to-t from-background from-10% via-background/85 via-40% to-transparent to-80%" />
                      {/* Subtle blur for the "misty" effect */}
                      <div className="absolute inset-x-0 bottom-0 h-48 backdrop-blur-[3px] [mask-image:linear-gradient(to_top,black_20%,transparent_80%)]" />

                      {/* CTA Button */}
                      <div className="relative pointer-events-auto pb-6">
                        <button
                          onClick={() => setAlumniExpanded(true)}
                          className="group inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-card/90 border border-border/60 shadow-lg backdrop-blur-md hover:shadow-xl hover:border-primary/40 hover:-translate-y-0.5 transition-all duration-300"
                        >
                          <ChevronDown className="w-4 h-4 text-muted-foreground group-hover:text-primary transition-colors animate-bounce" />
                          <span className="text-sm font-medium text-muted-foreground group-hover:text-foreground transition-colors">
                            Show All
                          </span>
                          <span className="inline-flex items-center justify-center min-w-5 h-5 px-1.5 rounded-full bg-primary/10 text-primary text-[11px] font-semibold tabular-nums transition-colors group-hover:bg-primary/15">
                            {filteredGraduatedMaster.length}
                          </span>
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            )}
          </motion.div>
        )}
      </div>
    </SectionWrapper>
  )
}
