'use client'

import PageHero from '@/components/layout/PageHero'
import PublicationsSection from '@/components/publications/PublicationsSection'

export default function PublicationsPage() {
  return (
    <main>
      <PageHero page="publications" />
      <PublicationsSection fullPage hideTitle />
    </main>
  )
}
