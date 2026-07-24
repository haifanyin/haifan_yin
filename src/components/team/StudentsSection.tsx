'use client'

import { useState, useMemo } from 'react'
import { motion } from 'framer-motion'
import { Award, BookOpen, Briefcase, GraduationCap, Search, Users, X } from 'lucide-react'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { teachers, phdStudents, masterStudents, graduatedPhdStudents, graduatedMasterStudents } from '@/lib/data'
import { fadeInUp } from '@/lib/constants'
import type { PageName } from '@/types'
import type { Student } from '@/lib/data'
import SectionWrapper from '@/components/layout/SectionWrapper'
import SectionTitle from '@/components/layout/SectionTitle'
import TeacherCard from '@/components/team/TeacherCard'
import StudentCard from '@/components/team/StudentCard'
export default function StudentsSection({ hideTitle = false }: { hideTitle?: boolean } = {}) {
  const [destFilter, setDestFilter] = useState<string>('all')
  const [searchQuery, setSearchQuery] = useState('')

  // Sort helpers: primary by date desc, secondary by name pinyin when dates equal
  const sortByEnrollDesc = (a: Student, b: Student) => (b.enrollDate || '').localeCompare(a.enrollDate || '') || (a.nameCn || '').localeCompare(b.nameCn || '', 'zh')
  const sortByGradDesc = (a: Student, b: Student) => (b.gradDate || '').localeCompare(a.gradDate || '') || (a.nameCn || '').localeCompare(b.nameCn || '', 'zh')

  const allDestinations = useMemo(() => {
    const dests = new Set<string>()
    ;[...graduatedPhdStudents, ...graduatedMasterStudents].forEach(s => {
      if (s.destination) dests.add(s.destination)
    })
    return Array.from(dests).sort()
  }, [])

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
    <SectionWrapper id="students" className="dot-pattern pt-2 md:pt-2">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {!hideTitle && (
          <SectionTitle subtitle="Meet the talented researchers in our group">
            Students
          </SectionTitle>
        )}

        {/* Member Stats Bar (team page: hideTitle is true) */}
        {hideTitle && (
          <motion.div variants={fadeInUp} className="mb-5">
            <div className="bg-card rounded-xl border border-border/60 p-4 shadow-sm">
              <div className="flex flex-wrap items-center gap-x-6 gap-y-3">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-violet-500/10 to-violet-600/5 flex items-center justify-center">
                    <Users className="w-4 h-4 text-violet-500/60" />
                  </div>
                  <div>
                    <div className="text-lg font-bold tracking-tight">{teachers.length + totalCurrent}</div>
                    <div className="text-[10px] text-muted-foreground">Total Members</div>
                  </div>
                </div>
                <div className="w-px h-8 bg-border/60 hidden sm:block" />
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-violet-500/10 to-violet-600/5 flex items-center justify-center">
                    <Briefcase className="w-4 h-4 text-violet-500/60" />
                  </div>
                  <div>
                    <div className="text-lg font-bold tracking-tight">{teachers.length}</div>
                    <div className="text-[10px] text-muted-foreground">Teachers</div>
                  </div>
                </div>
                <div className="w-px h-8 bg-border/60 hidden sm:block" />
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-red-500/10 to-red-600/5 flex items-center justify-center">
                    <GraduationCap className="w-4 h-4 text-red-500/60" />
                  </div>
                  <div>
                    <div className="text-lg font-bold tracking-tight">{phdStudents.length}</div>
                    <div className="text-[10px] text-muted-foreground">Ph.D. Students</div>
                  </div>
                </div>
                <div className="w-px h-8 bg-border/60 hidden sm:block" />
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-emerald-500/10 to-emerald-600/5 flex items-center justify-center">
                    <BookOpen className="w-4 h-4 text-emerald-500/60" />
                  </div>
                  <div>
                    <div className="text-lg font-bold tracking-tight">{masterStudents.length}</div>
                    <div className="text-[10px] text-muted-foreground">Master Students</div>
                  </div>
                </div>
                <div className="w-px h-8 bg-border/60 hidden sm:block" />
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-amber-500/10 to-amber-600/5 flex items-center justify-center">
                    <Award className="w-4 h-4 text-amber-500/60" />
                  </div>
                  <div>
                    <div className="text-lg font-bold tracking-tight">{graduatedPhdStudents.length + graduatedMasterStudents.length}</div>
                    <div className="text-[10px] text-muted-foreground">Alumni</div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {/* Teachers Section */}
        {teachers.length > 0 && (
          <motion.div variants={fadeInUp} className="mb-10">
            <div className="flex items-center gap-2.5 mb-5">
              <Briefcase className="w-5 h-5 text-violet-600/70 dark:text-violet-400/70" />
              <h3 className="text-lg font-semibold text-violet-700 dark:text-violet-400">Teachers</h3>
              <Badge variant="secondary" className="text-xs bg-violet-50 text-violet-700 border-violet-200 dark:bg-violet-900/15 dark:text-violet-400 dark:border-violet-800/25">{teachers.length}</Badge>
            </div>
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
        <motion.div variants={fadeInUp} className="mb-10">
          <div className="flex items-center gap-2.5 mb-5">
            <GraduationCap className="w-5 h-5 text-red-800/60 dark:text-red-400/60" />
            <h3 className="text-lg font-semibold text-red-800 dark:text-red-400">Ph.D. Students</h3>
            <Badge variant="secondary" className="text-xs bg-red-50 text-red-800 border-red-200 dark:bg-red-900/15 dark:text-red-400 dark:border-red-800/25">{filteredPhd.length}</Badge>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {filteredPhd.map((student) => (
              <StudentCard key={student.email} student={student} />
            ))}
          </div>
          {filteredPhd.length === 0 && (
            <div className="text-center py-8 text-muted-foreground text-sm">No Ph.D. students match the selected topic.</div>
          )}
        </motion.div>

        {/* Master Students */}
        <motion.div variants={fadeInUp}>
          <div className="flex items-center gap-2.5 mb-5">
            <BookOpen className="w-5 h-5 text-emerald-500/70" />
            <h3 className="text-lg font-semibold text-emerald-600 dark:text-emerald-400">Master Students</h3>
            <Badge variant="secondary" className="text-xs bg-emerald-50 text-emerald-700 border-emerald-200 dark:bg-emerald-900/15 dark:text-emerald-400 dark:border-emerald-800/25">{filteredMaster.length}</Badge>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
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
          <motion.div variants={fadeInUp} className="mt-10 pt-8 border-t border-border/40">
            <div className="flex items-center gap-2.5 mb-5">
              <Award className="w-5 h-5 text-amber-500/70" />
              <h3 className="text-lg font-semibold text-amber-600 dark:text-amber-400">Alumni</h3>
              <Badge variant="secondary" className="text-xs bg-amber-50 text-amber-700 border-amber-200 dark:bg-amber-900/15 dark:text-amber-400 dark:border-amber-800/25">{graduatedTotal}</Badge>
            </div>

            {filteredGraduatedPhd.length > 0 && (
              <div className="mb-8">
                <div className="flex items-center gap-2 mb-4">
                  <GraduationCap className="w-4 h-4 text-red-800/60 dark:text-red-400/60" />
                  <h4 className="text-xl font-bold text-red-800 dark:text-red-400">Ph.D. Alumni</h4>
                  <span className="text-xs text-muted-foreground">({filteredGraduatedPhd.length})</span>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {filteredGraduatedPhd.map((student) => (
                    <StudentCard key={student.email} student={student} />
                  ))}
                </div>
              </div>
            )}
            {filteredGraduatedMaster.length > 0 && (
              <div className="mb-4">
                <div className="flex items-center gap-2 mb-4">
                  <BookOpen className="w-4 h-4 text-emerald-500/60" />
                  <h4 className="text-xl font-bold text-emerald-600 dark:text-emerald-400">Master Alumni</h4>
                  <span className="text-xs text-muted-foreground">({filteredGraduatedMaster.length})</span>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {filteredGraduatedMaster.map((student) => (
                    <StudentCard key={student.email} student={student} />
                  ))}
                </div>
              </div>
            )}
            {graduatedTotal === 0 && destFilter !== 'all' && (
              <div className="text-center py-8 text-muted-foreground text-sm">No alumni match the selected destination.</div>
            )}
          </motion.div>
        )}
      </div>
    </SectionWrapper>
  )
}
