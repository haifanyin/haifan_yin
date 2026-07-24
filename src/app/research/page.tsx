'use client'

import PageHero from '@/components/layout/PageHero'
import ResearchSection from '@/components/research/ResearchSection'

export default function ResearchPage() {
  return (
    <main>
      <PageHero page="research" />
      <ResearchSection hideTitle />
    </main>
  )
}
