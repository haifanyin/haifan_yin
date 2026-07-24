'use client'

import { useState, useEffect, useRef, useMemo, useCallback } from 'react'
import { useRouter } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import { BookOpen, Camera, FileText, HomeIcon, Microscope, Search as SearchIcon, Users } from 'lucide-react'
import { journalPapers, conferencePapers, phdStudents, masterStudents, researchTopics } from '@/lib/data'

interface CommandItem {
  id: string
  label: string
  icon: React.ComponentType<{ className?: string }>
  group: string
  action: () => void
}

export default function CommandPalette({ visible, onClose }: { visible: boolean; onClose: () => void }) {
  const [query, setQuery] = useState('')
  const [selectedIndex, setSelectedIndex] = useState(0)
  const inputRef = useRef<HTMLInputElement>(null)
  const router = useRouter()

  useEffect(() => {
    if (visible) {
      requestAnimationFrame(() => {
        setQuery('')
        setSelectedIndex(0)
        inputRef.current?.focus()
      })
    }
  }, [visible])

  const allItems = useMemo((): CommandItem[] => {
    const pages: CommandItem[] = [
      { id: 'p-home', label: 'Home', icon: HomeIcon, group: 'Pages', action: () => router.push('/') },
      { id: 'p-research', label: 'Research', icon: Microscope, group: 'Pages', action: () => router.push('/research') },
      { id: 'p-pub', label: 'Publications', icon: BookOpen, group: 'Pages', action: () => router.push('/publications') },
      { id: 'p-team', label: 'Team', icon: Users, group: 'Pages', action: () => router.push('/team') },
      { id: 'p-gal', label: 'Gallery', icon: Camera, group: 'Pages', action: () => router.push('/gallery') },
    ]
    const pubs: CommandItem[] = [...journalPapers, ...conferencePapers].slice(0, 20).map((p, i) => ({
      id: `pub-${i}`, label: p.title, icon: FileText, group: 'Publications',
      action: () => router.push('/publications'),
    }))
    const team: CommandItem[] = [...phdStudents, ...masterStudents].map((s, i) => ({
      id: `s-${i}`, label: `${s.name} (${s.nameCn})`, icon: Users, group: 'Team Members',
      action: () => router.push('/team'),
    }))
    const topics: CommandItem[] = researchTopics.map((t) => ({
      id: `t-${t.id}`, label: t.title, icon: Microscope, group: 'Research Topics',
      action: () => router.push('/research'),
    }))
    return [...pages, ...pubs, ...team, ...topics]
  }, [router])

  const filtered = useMemo(() => {
    if (!query.trim()) return allItems.slice(0, 12)
    const q = query.toLowerCase()
    return allItems.filter(item => item.label.toLowerCase().includes(q)).slice(0, 12)
  }, [query, allItems])

  const executeItem = useCallback((item: CommandItem) => {
    item.action()
    onClose()
  }, [onClose])

  const handleKeyDown = useCallback((e: React.KeyboardEvent) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault()
      setSelectedIndex(prev => (prev + 1) % filtered.length)
    } else if (e.key === 'ArrowUp') {
      e.preventDefault()
      setSelectedIndex(prev => (prev - 1 + filtered.length) % filtered.length)
    } else if (e.key === 'Enter' && filtered.length > 0) {
      executeItem(filtered[selectedIndex])
    } else if (e.key === 'Escape') {
      onClose()
    }
  }, [filtered, selectedIndex, executeItem, onClose])

  const grouped = useMemo(() => {
    const map = new Map<string, CommandItem[]>()
    filtered.forEach(item => {
      const group = map.get(item.group) || []
      group.push(item)
      map.set(item.group, group)
    })
    return Array.from(map.entries())
  }, [filtered])

  if (!visible) return null

  return (
    <AnimatePresence>
      {visible && (
        <>
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            transition={{ duration: 0.15 }}
            className="fixed inset-0 z-[100] bg-black/40 backdrop-blur-sm"
            onClick={onClose}
          />
          <motion.div
            initial={{ opacity: 0, y: -20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.95 }}
            transition={{ duration: 0.15, ease: [0.16, 1, 0.3, 1] }}
            className="fixed top-[15%] left-1/2 -translate-x-1/2 z-[101] w-full max-w-lg bg-card border border-border/60 rounded-xl shadow-2xl overflow-hidden"
            onKeyDown={handleKeyDown}
          >
            <div className="flex items-center gap-3 px-4 py-3 border-b border-border/40">
              <SearchIcon className="w-4 h-4 text-muted-foreground" />
              <input
                ref={inputRef}
                type="text"
                value={query}
                onChange={(e) => { setQuery(e.target.value); setSelectedIndex(0) }}
                placeholder="Search pages, publications, team members..."
                className="flex-1 bg-transparent outline-none text-sm placeholder:text-muted-foreground/50"
              />
              <kbd className="text-[10px] text-muted-foreground/40 bg-muted px-1.5 py-0.5 rounded">ESC</kbd>
            </div>
            <div className="max-h-64 overflow-y-auto custom-scrollbar py-2">
              {filtered.length === 0 && (
                <p className="text-sm text-muted-foreground text-center py-8">No results found.</p>
              )}
              {grouped.map(([group, items]) => (
                <div key={group}>
                  <p className="text-[10px] text-muted-foreground/60 font-medium px-4 py-1 uppercase tracking-wider">{group}</p>
                  {items.map((item) => {
                    const flatIndex = filtered.indexOf(item)
                    return (
                      <button
                        key={item.id}
                        onClick={() => executeItem(item)}
                        className={`flex items-center gap-3 w-full text-left px-4 py-2 text-sm transition-colors ${
                          flatIndex === selectedIndex ? 'bg-primary/5 text-primary' : 'text-muted-foreground hover:bg-accent hover:text-foreground'
                        }`}
                      >
                        <item.icon className="w-4 h-4 flex-shrink-0" />
                        <span className="truncate">{item.label}</span>
                      </button>
                    )
                  })}
                </div>
              ))}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}
