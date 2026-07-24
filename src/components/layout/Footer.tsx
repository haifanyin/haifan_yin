'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { ArrowRight, ExternalLink, FileText, Globe, HomeIcon, Mail, Microscope, School } from 'lucide-react'
import { professorInfo, researchTopics } from '@/lib/data'

const quickLinks = [
  { label: 'Home', href: '/' },
  { label: 'Research', href: '/research' },
  { label: 'Publications', href: '/publications' },
  { label: 'Team', href: '/team' },
  { label: 'Gallery', href: '/gallery' },
]

export default function Footer() {
  const pathname = usePathname()
  const currentYear = new Date().getFullYear()
  const isActive = (href: string) => pathname === href

  return (
    <footer className="bg-card border-t-0 mt-0">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="py-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-10">
          {/* Column 1: Brand / Logo / Description / Recruiting */}
          <div>
            <div className="flex items-center gap-3 mb-3">
              <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-[oklch(0.45_0.12_260)] to-[oklch(0.35_0.08_220)] flex items-center justify-center shadow-sm">
                <span className="text-white text-sm font-bold">Y</span>
              </div>
              <div>
                <p className="text-base font-semibold">{professorInfo.name} ({professorInfo.nameCn})</p>
                <p className="text-xs text-muted-foreground">{professorInfo.title}</p>
              </div>
            </div>
            <p className="text-sm text-muted-foreground leading-relaxed max-w-xs mb-4">
              MCSP Lab, School of Electronic Information and Communications, Huazhong University of Science and Technology.
            </p>
          </div>

          {/* Column 2: Quick Links */}
          <div>
            <h4 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-4 flex items-center gap-1.5">
              <HomeIcon className="w-3.5 h-3.5" />Quick Links
            </h4>
            <div className="space-y-2">
              {quickLinks.map(link => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`block text-sm transition-colors group ${isActive(link.href) ? 'text-primary font-medium' : 'text-muted-foreground hover:text-foreground'}`}
                >
                  <span className="flex items-center gap-2">
                    {isActive(link.href) && <span className="w-1.5 h-1.5 rounded-full bg-primary" />}
                    <ArrowRight className={`w-2.5 h-2.5 transition-colors ${isActive(link.href) ? 'text-primary' : 'text-primary/40 group-hover:text-primary/70'}`} />
                    <span className="group-hover:translate-x-0.5 transition-transform">{link.label}</span>
                  </span>
                </Link>
              ))}
            </div>
          </div>

          {/* Column 3: Research Areas */}
          <div>
            <h4 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-4 flex items-center gap-1.5">
              <Microscope className="w-3.5 h-3.5" />Research Areas
            </h4>
            <div className="space-y-2">
              {researchTopics.filter(t => !t.parentId).map(topic => (
                <Link
                  key={topic.id}
                  href={`/research#${topic.id}`}
                  className="block text-sm text-muted-foreground hover:text-foreground transition-colors group text-left"
                >
                  <span className="flex items-center gap-2">
                    <span className="w-1 h-1 rounded-full bg-primary/40 group-hover:bg-primary/70 transition-colors flex-shrink-0" />
                    <span className="group-hover:translate-x-0.5 transition-transform">{topic.title}</span>
                  </span>
                </Link>
              ))}
            </div>
          </div>

          {/* Column 4: Profiles */}
          <div>
            <h4 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-4 flex items-center gap-1.5">
              <Globe className="w-3.5 h-3.5" />Profiles
            </h4>
            <div className="space-y-2.5">
              <a href={`mailto:${professorInfo.email}`} className="text-sm text-muted-foreground hover:text-foreground transition-colors flex items-center gap-2 group">
                <Mail className="w-3.5 h-3.5 text-primary/40 group-hover:text-primary/70 transition-colors" />
                <span className="group-hover:translate-x-0.5 transition-transform">{professorInfo.email}</span>
              </a>
              <a href={professorInfo.googleScholar} target="_blank" rel="noopener noreferrer" className="text-sm text-muted-foreground hover:text-foreground transition-colors flex items-center gap-2 group">
                <School className="w-3.5 h-3.5 text-primary/40 group-hover:text-primary/70 transition-colors" />
                <span className="group-hover:translate-x-0.5 transition-transform">Google Scholar</span>
                <ExternalLink className="w-2.5 h-2.5 opacity-0 group-hover:opacity-100 transition-opacity" />
              </a>
              <a href="https://ieeexplore.ieee.org/author/38493026100" target="_blank" rel="noopener noreferrer" className="text-sm text-muted-foreground hover:text-foreground transition-colors flex items-center gap-2 group">
                <FileText className="w-3.5 h-3.5 text-primary/40 group-hover:text-primary/70 transition-colors" />
                <span className="group-hover:translate-x-0.5 transition-transform">IEEE Xplore</span>
                <ExternalLink className="w-2.5 h-2.5 opacity-0 group-hover:opacity-100 transition-opacity" />
              </a>
              <a href={professorInfo.chineseSite.url} target="_blank" rel="noopener noreferrer" className="text-sm text-muted-foreground hover:text-foreground transition-colors flex items-center gap-2 group">
                <Globe className="w-3.5 h-3.5 text-primary/40 group-hover:text-primary/70 transition-colors" />
                <span className="group-hover:translate-x-0.5 transition-transform">Chinese Site</span>
                <ExternalLink className="w-2.5 h-2.5 opacity-0 group-hover:opacity-100 transition-opacity" />
              </a>
            </div>
          </div>
        </div>

        <div className="py-4 border-t border-border/40 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex items-center gap-3 text-xs text-muted-foreground">
            <span>&copy; {currentYear} {professorInfo.name}. All rights reserved.</span>
            <span className="hidden sm:inline w-px h-3 bg-border/60" />
            <span className="hidden sm:inline text-muted-foreground/60">HUST, Wuhan, China</span>
          </div>
          <div className="flex items-center gap-3 text-xs text-muted-foreground/60">
            <span className="flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />Built with Next.js
            </span>
          </div>
        </div>
      </div>
    </footer>
  )
}
