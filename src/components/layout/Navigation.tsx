'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useTheme } from 'next-themes'
import { motion, AnimatePresence } from 'framer-motion'
import { BookOpen, Camera, HomeIcon, Mail, Menu, Microscope, Moon, Sun, Users, X } from 'lucide-react'
import { professorInfo } from '@/lib/data'

const navItems = [
  { href: '/', label: 'Home', icon: HomeIcon },
  { href: '/research', label: 'Research', icon: Microscope },
  { href: '/publications', label: 'Publications', icon: BookOpen },
  { href: '/team', label: 'Team', icon: Users },
  { href: '/gallery', label: 'Gallery', icon: Camera },
]

export default function Navigation() {
  const pathname = usePathname()
  const { resolvedTheme, setTheme } = useTheme()
  const [mobileOpen, setMobileOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [scrollProgress, setScrollProgress] = useState(0)
  const [mounted, setMounted] = useState(false)

  // Avoid hydration mismatch for theme icon
  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50)
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight
      setScrollProgress(totalHeight > 0 ? Math.min(1, window.scrollY / totalHeight) : 0)
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    if (mobileOpen) document.body.style.overflow = 'hidden'
    else document.body.style.overflow = ''
    return () => { document.body.style.overflow = '' }
  }, [mobileOpen])

  const closeMobile = () => setMobileOpen(false)
  const isActive = (href: string) => pathname === href
  const isDark = mounted ? resolvedTheme === 'dark' : false

  const toggleTheme = () => setTheme(isDark ? 'light' : 'dark')

  return (
    <>
      <AnimatePresence>
        {mobileOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="md:hidden fixed inset-0 z-[60] bg-black/40 backdrop-blur-sm"
              onClick={closeMobile}
            />
            <motion.div
              initial={{ x: '100%' }} animate={{ x: 0 }} exit={{ x: '100%' }}
              transition={{ type: 'spring', stiffness: 300, damping: 30 }}
              className="md:hidden fixed top-0 right-0 bottom-0 z-[70] w-[280px] max-w-[80vw] bg-background border-l border-border/60 shadow-2xl flex flex-col"
            >
              <div className="flex items-center justify-end px-4 py-3 border-b border-border/40">
                <button onClick={closeMobile} className="p-1.5 rounded-lg hover:bg-accent transition-colors text-muted-foreground hover:text-foreground">
                  <X className="w-4.5 h-4.5" />
                </button>
              </div>
              <nav className="flex-1 overflow-y-auto px-3 py-4 space-y-1">
                {navItems.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={closeMobile}
                    className={`flex items-center gap-3 w-full text-left px-4 py-3 rounded-lg text-sm font-medium transition-all ${
                      isActive(item.href) ? 'text-primary bg-primary/5' : 'text-muted-foreground hover:text-foreground hover:bg-accent'
                    }`}
                  >
                    <item.icon className={`w-4.5 h-4.5 ${isActive(item.href) ? 'text-primary' : ''}`} />
                    {item.label}
                    {isActive(item.href) && <div className="ml-auto w-1.5 h-1.5 rounded-full bg-primary" />}
                  </Link>
                ))}
              </nav>
              <div className="border-t border-border/40 px-3 py-4 space-y-2">
                <a href={`mailto:${professorInfo.email}`} onClick={closeMobile} className="flex items-center gap-3 w-full px-4 py-2.5 rounded-lg text-sm text-muted-foreground hover:text-foreground hover:bg-accent transition-colors">
                  <Mail className="w-4 h-4 text-primary/50" />Contact
                </a>
                <button onClick={() => { toggleTheme(); closeMobile() }} className="flex items-center gap-3 w-full px-4 py-2.5 rounded-lg text-sm text-muted-foreground hover:text-foreground hover:bg-accent transition-colors">
                  {isDark ? <Sun className="w-4 h-4 text-primary/50" /> : <Moon className="w-4 h-4 text-primary/50" />}
                  {isDark ? 'Light Mode' : 'Dark Mode'}
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      <motion.header
        initial={{ y: -100 }} animate={{ y: 0 }} transition={{ duration: 0.5 }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled ? 'bg-background/90 dark:bg-neutral-900/90 shadow-sm border-b border-border/50' : 'bg-background/60 dark:bg-neutral-900/60'
        }`}
        style={{ backdropFilter: scrolled ? 'blur(16px)' : 'blur(8px)', WebkitBackdropFilter: scrolled ? 'blur(16px)' : 'blur(8px)' }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 md:h-20">
            <Link href="/" className="flex items-center group">
              <Image src="/MCSP_LAB_logo.svg" alt="MCSP Lab" width={200} height={22} className="h-13 md:h-14 w-auto object-contain max-w-[240px] md:max-w-none" priority />
            </Link>

            <nav className="hidden md:flex items-center gap-0.5">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`relative px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 flex items-center gap-1.5 ${
                    isActive(item.href) ? 'text-primary bg-primary/5' : 'text-muted-foreground hover:text-foreground hover:bg-accent'
                  }`}
                >
                  <item.icon className="w-4 h-4" />
                  {item.label}
                  {isActive(item.href) && <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-5 h-0.5 rounded-full bg-primary" />}
                </Link>
              ))}
              <button onClick={toggleTheme} className="ml-1 p-2 rounded-lg text-muted-foreground hover:text-foreground hover:bg-accent transition-all" title={isDark ? 'Switch to light mode' : 'Switch to dark mode'}>
                {isDark ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
              </button>
            </nav>

            <div className="flex md:hidden items-center gap-1">
              <button onClick={toggleTheme} className="p-2 rounded-lg hover:bg-accent transition-colors">
                {isDark ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
              </button>
              <button onClick={() => setMobileOpen(!mobileOpen)} className="p-2 rounded-lg hover:bg-accent transition-colors">
                {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>
            </div>
          </div>
        </div>
        <div className="h-[2px] w-full bg-transparent">
          <div className="h-full bg-gradient-to-r from-primary/80 via-primary/60 to-primary/20 transition-[width] duration-150 ease-out" style={{ width: `${scrollProgress * 100}%` }} />
        </div>
      </motion.header>
    </>
  )
}
