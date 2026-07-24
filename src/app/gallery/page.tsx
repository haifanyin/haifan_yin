'use client'

import PageHero from '@/components/layout/PageHero'
import GalleryPageComponent from '@/components/gallery/GalleryPage'

export default function GalleryPage() {
  return (
    <main>
      <PageHero page="gallery" />
      <GalleryPageComponent />
    </main>
  )
}
