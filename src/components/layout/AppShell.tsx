'use client'

import { useState, useEffect, useCallback, useSyncExternalStore } from 'react'
import Navigation from '@/components/layout/Navigation'
import Footer from '@/components/layout/Footer'
import BackToTop from '@/components/layout/BackToTop'
import Toast from '@/components/Toast'
import CommandPalette from '@/components/CommandPalette'

const DARK_MODE_KEY = 'mcsp-dark-mode'
const darkModeListeners = new Set<() => void>()

function subscribeDarkMode(callback: () => void) {
  darkModeListeners.add(callback)
  window.addEventListener('storage', callback)
  return () => {
    darkModeListeners.delete(callback)
    window.removeEventListener('storage', callback)
  }
}

const getDarkMode = () => localStorage.getItem(DARK_MODE_KEY) === 'true'
const getServerDarkMode = () => false

export default function AppShell({ children }: { children: React.ReactNode }) {
  const darkMode = useSyncExternalStore(subscribeDarkMode, getDarkMode, getServerDarkMode)
  const [toastVisible, setToastVisible] = useState(false)
  const [showCommandPalette, setShowCommandPalette] = useState(false)

  useEffect(() => {
    document.documentElement.classList.toggle('dark', darkMode)
  }, [darkMode])

  const toggleDarkMode = useCallback(() => {
    const next = !getDarkMode()
    localStorage.setItem(DARK_MODE_KEY, String(next))
    darkModeListeners.forEach((l) => l())
  }, [])

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
