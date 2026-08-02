import HeroSection from '@/components/home/HeroSection'
import ResearchFocusSection from '@/components/home/ResearchFocusSection'
import FeaturedPublicationsSection from '@/components/home/FeaturedPublicationsSection'
import AboutSection from '@/components/home/AboutSection'
import QuoteBanner from '@/components/home/QuoteBanner'

export default function HomePage() {
  return (
    <main>
      <HeroSection />
      <ResearchFocusSection />
      <FeaturedPublicationsSection />
      <AboutSection />
      <QuoteBanner />
    </main>
  )
}
