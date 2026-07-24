'use client'

import { useState, useEffect, useCallback } from 'react'
import Navigation from '@/components/layout/Navigation'
import Footer from '@/components/layout/Footer'
import BackToTop from '@/components/layout/BackToTop'
import Toast from '@/components/Toast'
import CommandPalette from '@/components/CommandPalette'

export default function AppShell({ children }: { children: React.ReactNode }) {
  const [darkMode, setDarkMode] = useState(false)
  const [toastVisible, setToastVisible] = useState(false)
  const [showCommandPalette, setShowCommandPalette] = useState(false)

  useEffect(() => {
    setDarkMode(localStorage.getItem('mcsp-dark-mode') === 'true')
  }, [])

  useEffect(() => {
    document.documentElement.classList.toggle('dark', darkMode)
    localStorage.setItem('mcsp-dark-mode', String(darkMode))
  }, [darkMode])

  const toggleDarkMode = useCallback(() => setDarkMode(p => !p), [])

  // Command palette shortcut (Ctrl/Cmd+K)
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault()
        setShowCommandPalette(p => !p)
      } else if (e.key === 'Escape' && showCommandPalette) {
        setShowCommandPalette(false)
      }
    }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [showCommandPalette])

  return (
    <div className="min-h-screen flex flex-col pb-16 md:pb-0">
      <Navigation darkMode={darkMode} toggleDarkMode={toggleDarkMode} />
      <div className="flex-1">{children}</div>
      <Footer />
      <BackToTop />
      <Toast message="Downloaded BibTeX file!" visible={toastVisible} onClose={() => setToastVisible(false)} />
      <CommandPalette visible={showCommandPalette} onClose={() => setShowCommandPalette(false)} />
    </div>
  )
}
