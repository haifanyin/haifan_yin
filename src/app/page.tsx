'use client'

import HeroSection from '@/components/home/HeroSection'
import AboutSection from '@/components/home/AboutSection'
import SectionDivider from '@/components/layout/SectionDivider'
import QuoteBanner from '@/components/home/QuoteBanner'

export default function HomePage() {
  return (
    <main>
      <HeroSection />
      <AboutSection />
      <SectionDivider flip />
      <QuoteBanner />
    </main>
  )
}
