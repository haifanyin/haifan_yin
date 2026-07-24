'use client'

import { useEffect } from 'react'
import PageHero from '@/components/layout/PageHero'
import ResearchSection from '@/components/research/ResearchSection'

export default function ResearchPage() {
  useEffect(() => {
    const hash = window.location.hash
    if (hash) {
      // Delay to ensure all cards are rendered
      const timer = setTimeout(() => {
        const el = document.getElementById(hash.slice(1))
        if (el) {
          el.scrollIntoView({ behavior: 'smooth', block: 'start' })
        }
      }, 300)
      return () => clearTimeout(timer)
    }
  }, [])

  return (
    <main>
      <PageHero page="research" />
      <ResearchSection hideTitle />
    </main>
  )
}
