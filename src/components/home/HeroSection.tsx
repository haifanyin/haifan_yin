'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { BookOpen, ExternalLink, FileText, Globe, GraduationCap, MapPin, School, Sparkles, Tag, Users } from 'lucide-react'
import { professorInfo, researchTopics, journalPapers, conferencePapers, teachers, phdStudents, masterStudents, graduatedPhdStudents, graduatedMasterStudents } from '@/lib/data'
import { fadeInUp } from '@/lib/constants'
import SectionWrapper from '@/components/layout/SectionWrapper'
import { useTypewriter } from '@/hooks/useTypewriter'
import ContactDialog from '@/components/home/ContactDialog'
import AnimatedStatCard from '@/components/home/AnimatedStatCard'
import { useRouter } from 'next/navigation'
export default function HeroSection() {
  const router = useRouter()
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 })
  const typedName = useTypewriter(professorInfo.name)

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const x = (e.clientX / window.innerWidth - 0.5) * 2
      const y = (e.clientY / window.innerHeight - 0.5) * 2
      setMousePos({ x, y })
    }
    window.addEventListener('mousemove', handleMouseMove, { passive: true })
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [])

  return (
    <SectionWrapper id="home" className="section-pattern relative overflow-hidden pb-8 md:pb-12">
      {/* Gradient mesh background layer */}
      <div className="hero-mesh-bg" aria-hidden="true" />
      {/* Floating Orbs with parallax */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden" aria-hidden="true">
        <div className="hero-orb-1 absolute top-[10%] left-[5%] w-[200px] h-[200px] rounded-full bg-primary/5 blur-3xl" style={{ transform: `translate(${mousePos.x * 15}px, ${mousePos.y * 10}px)` }} />
        <div className="hero-orb-2 absolute bottom-[10%] right-[5%] w-[300px] h-[300px] rounded-full bg-primary/3 blur-3xl" style={{ transform: `translate(${mousePos.x * -10}px, ${mousePos.y * -8}px)` }} />
        <div className="hero-orb-3 absolute top-[40%] left-[50%] w-[150px] h-[150px] rounded-full bg-accent/4 blur-3xl" style={{ transform: `translate(${mousePos.x * 8}px, ${mousePos.y * 12}px)` }} />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid md:grid-cols-[300px_1fr] lg:grid-cols-[340px_1fr] gap-10 md:gap-14 items-start">
          {/* Photo */}
          <motion.div variants={fadeInUp} className="flex flex-col items-center md:items-start">
            <div className="relative group">
              <div className="absolute -inset-1.5 bg-gradient-to-br from-[oklch(0.45_0.12_260)] to-[oklch(0.35_0.08_220)] rounded-2xl opacity-15 group-hover:opacity-25 transition-opacity blur-md" />
              <div className="relative w-60 h-[310px] md:w-72 md:h-[370px] rounded-2xl shadow-lg overflow-hidden">
                <Image
                  src="/professor.jpg"
                  alt="Prof. Haifan Yin"
                  width={288}
                  height={370}
                  className="w-full h-full object-cover object-top"
                  priority
                />
              </div>
            </div>

            {/* Quick links */}
            <div className="mt-6 flex flex-col gap-1.5 w-full max-w-[300px]">
              <ContactDialog />
              {[
                { icon: School, label: 'Google Scholar Profile', href: professorInfo.googleScholar, external: true },
                { icon: FileText, label: 'IEEE Xplore', href: 'https://ieeexplore.ieee.org/author/38493026100', external: true },
                { icon: Globe, label: 'Chinese Site', href: professorInfo.chineseSite.url, external: true },
              ].map((link, i) => (
                <a
                  key={i}
                  href={link.href}
                  target={link.external ? '_blank' : undefined}
                  rel={link.external ? 'noopener noreferrer' : undefined}
                  className="flex items-center gap-2.5 text-sm text-muted-foreground hover:text-foreground transition-colors px-3 py-2 rounded-lg hover:bg-accent group"
                >
                  <link.icon className="w-4 h-4 flex-shrink-0 text-primary/50 group-hover:text-primary/70" />
                  <span className="truncate">{link.label}</span>
                  {link.external && <ExternalLink className="w-3 h-3 ml-auto opacity-0 group-hover:opacity-100 transition-opacity" />}
                </a>
              ))}
            </div>
          </motion.div>

          {/* Info */}
          <div className="space-y-7">
            <motion.div variants={fadeInUp}>
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-[3.5rem] font-bold tracking-tight leading-tight overflow-hidden">
                {typedName}
                <span className="typewriter-cursor" />
              </h1>
              <p className="text-sm sm:text-lg md:text-xl text-muted-foreground mt-2">
                {professorInfo.nameCn} · {professorInfo.title}
              </p>
            </motion.div>

            <motion.div variants={fadeInUp}>
              <div className="flex items-start gap-2.5 text-sm text-muted-foreground">
                <MapPin className="w-4 h-4 mt-0.5 flex-shrink-0 text-primary/50" />
                <div className="space-y-1.5 text-xs sm:text-sm break-words">
                  {professorInfo.office.map((line, i) => (
                    <p key={i}>
                      {i === 1 ? (
                        <a href={professorInfo.officeLinks[0]?.url} target="_blank" rel="noopener noreferrer" className="academic-link">{line}</a>
                      ) : i === 2 ? (
                        <a href={professorInfo.officeLinks[1]?.url} target="_blank" rel="noopener noreferrer" className="academic-link">{line}</a>
                      ) : (
                        line
                      )}
                    </p>
                  ))}
                </div>
              </div>
            </motion.div>

            <motion.div variants={fadeInUp}>
              <div className="bg-gradient-to-r from-blue-50 to-blue-100/30 dark:from-blue-950/20 dark:to-blue-900/10 p-4 rounded-xl border border-blue-200/60 dark:border-blue-800/30">
                <div className="flex items-start gap-2.5">
                  <Sparkles className="w-5 h-5 text-blue-600 dark:text-blue-400 mt-0.5 flex-shrink-0" />
                  <p className="text-xs sm:text-sm leading-relaxed">{professorInfo.recruiting}</p>
                </div>
              </div>
            </motion.div>

            {/* Research Topic Tags */}
            <motion.div variants={fadeInUp}>
              <div className="flex flex-wrap gap-2">
                {researchTopics.map((topic) => (
                  <button
                    key={topic.id}
                    onClick={() => router.push('/research')}
                    className="research-tag-hover inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium bg-primary/5 text-primary/70 border border-primary/10 hover:bg-primary/10 hover:text-primary hover:border-primary/20 cursor-pointer"
                  >
                    <Tag className="w-3 h-3" />
                    {topic.title}
                  </button>
                ))}
              </div>
            </motion.div>

            {/* Quick stats with animated counters */}
            <motion.div variants={fadeInUp} className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {[
                { label: 'Journal Papers', value: journalPapers.length, icon: BookOpen, color: 'from-blue-500/10 to-blue-600/5' },
                { label: 'Conf. Papers', value: conferencePapers.length, icon: FileText, color: 'from-emerald-500/10 to-emerald-600/5' },
                { label: 'Team Members', value: teachers.length + phdStudents.length + masterStudents.length, icon: Users, color: 'from-rose-500/10 to-rose-600/5' },
                { label: 'Alumni', value: graduatedPhdStudents.length + graduatedMasterStudents.length, icon: GraduationCap, color: 'from-amber-500/10 to-amber-600/5' },
              ].map((stat) => (
                <AnimatedStatCard key={stat.label} stat={stat} />
              ))}
            </motion.div>

          </div>
        </div>
      </div>
    </SectionWrapper>
  )
}
