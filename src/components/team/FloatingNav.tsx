'use client'

import { useEffect, useState } from 'react'

const sections = [
  { id: 'nav-teachers', label: 'Teachers', color: 'bg-violet-400/50' },
  { id: 'nav-phd', label: 'Ph.D.', color: 'bg-rose-400/50' },
  { id: 'nav-master', label: 'Master', color: 'bg-emerald-400/50' },
  { id: 'nav-alumni', label: 'Alumni', color: 'bg-amber-400/50' },
] as const

export default function FloatingNav() {
  const [activeId, setActiveId] = useState<string>('')
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const onScroll = () => {
      setVisible(window.scrollY > 200)
      for (const s of sections) {
        const el = document.getElementById(s.id)
        if (el) {
          const rect = el.getBoundingClientRect()
          if (rect.top <= window.innerHeight / 2 && rect.bottom >= window.innerHeight / 2) {
            setActiveId(s.id)
            break
          }
        }
      }
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    onScroll()
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const scrollTo = (id: string) => {
    const el = document.getElementById(id)
    if (el) {
      const headerHeight = 80 // fixed header offset
      const top = el.getBoundingClientRect().top + window.scrollY - headerHeight
      window.scrollTo({ top, behavior: 'smooth' })
    }
  }

  if (!visible) return null

  return (
    <nav className="fixed right-3 sm:right-5 top-1/2 -translate-y-1/2 z-40">
      <ul className="group flex flex-col gap-1">
        {sections.map(({ id, label, color }) => {
          const isActive = activeId === id
          return (
            <li key={id}>
              <button
                onClick={() => scrollTo(id)}
                className="flex items-center justify-end gap-2.5 py-1.5 w-full"
                title={label}
              >
                {/* Label — hidden, shown on group hover */}
                <span className="text-[11px] font-medium text-muted-foreground/70 opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap leading-none">
                  {label}
                </span>
                {/* Dot — aligned to the right */}
                <span className={`w-2.5 h-2.5 rounded-full flex-shrink-0 transition-all duration-300 ${
                  isActive ? color + ' scale-125' : 'bg-muted-foreground/25 scale-100'
                }`} />
              </button>
            </li>
          )
        })}
      </ul>
    </nav>
  )
}