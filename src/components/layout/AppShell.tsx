'use client'

import { useState, useEffect, useCallback } from 'react'
import Navigation from '@/components/layout/Navigation'
import Footer from '@/components/layout/Footer'
import BackToTop from '@/components/layout/BackToTop'
import Toast from '@/components/ui/toast'
import CommandPalette from '@/components/ui/command-palette'

export default function AppShell({ children }: { children: React.ReactNode }) {
  const [toastVisible, setToastVisible] = useState(false)
  const [showCommandPalette, setShowCommandPalette] = useState(false)

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
      <Navigation />
      <div className="flex-1">{children}</div>
      <Footer />
      <BackToTop />
      <Toast message="Downloaded BibTeX file!" visible={toastVisible} onClose={() => setToastVisible(false)} />
      <CommandPalette visible={showCommandPalette} onClose={() => setShowCommandPalette(false)} />
    </div>
  )
}
