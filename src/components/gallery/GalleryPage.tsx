'use client'

import { useState, useEffect, useRef, useCallback, useMemo } from 'react'
import Image from 'next/image'
import { motion, useInView, useMotionValue, animate } from 'framer-motion'
import type { LucideIcon } from 'lucide-react'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Badge } from '@/components/ui/badge'
import { Camera, ChevronDown, ChevronLeft, ChevronRight, ChevronUp, Globe, Maximize2, Sparkles, Trophy, Users as UsersIcon, X } from 'lucide-react'
import { fadeInUp, staggerItem } from '@/lib/constants'
import SectionWrapper from '@/components/layout/SectionWrapper'

// Number of photos shown per category before expand.
const INITIAL = 4

type Photo = { src: string; caption: string; year?: number; month?: number }

/** Format photo caption for alt text: "Title (2024-09)" or "Title (2024)". */
function formatCaption(p: Photo): string {
  if (p.year == null) return p.caption
  if (p.month != null) {
    return `${p.caption} (${p.year}-${String(p.month).padStart(2, '0')})`
  }
  return `${p.caption} (${p.year})`
}

/** Return a short date label string for the visual badge, e.g. "2024-09" or "2024". */
function formatDateLabel(p: Photo): string | null {
  if (p.year == null) return null
  if (p.month != null) return `${p.year}-${String(p.month).padStart(2, '0')}`
  return `${p.year}`
}
type GalleryCategory = {
  name: string
  folder: string
  icon: LucideIcon
  accent: string
  iconClass: string
  iconGrad: string
  badgeClass: string
  photos: Photo[]
}

/** Ruled section header: icon + title + count badge + colored accent underline. (Local copy of Team pattern.) */
function SectionHeader({ icon: Icon, title, count, iconClass, iconGrad, badgeClass, accent }: {
  icon: LucideIcon
  title: string
  count: number
  iconClass: string
  iconGrad: string
  badgeClass: string
  accent: string
}) {
  return (
    <div className="mb-5">
      <div className="flex items-center gap-2.5">
        <div className={`flex-shrink-0 w-8 h-8 rounded-lg flex items-center justify-center bg-gradient-to-br ${iconGrad}`}>
          <Icon className={`w-4 h-4 ${iconClass}`} />
        </div>
        <h3 className="font-bold tracking-tight text-xl md:text-2xl text-foreground">
          {title}
        </h3>
        <Badge variant="secondary" className={`text-xs ${badgeClass}`}>{count}</Badge>
      </div>
      <div className={`mt-2 ml-1 h-0.5 w-12 rounded-full bg-gradient-to-r ${accent}`} />
    </div>
  )
}

/** Single stats tile with a one-shot count-up animation on scroll-in. (Local copy of Team pattern.) */
function StatTile({ icon: Icon, count, label, accent, iconClass, iconGrad }: {
  icon: LucideIcon
  count: number
  label: string
  accent: string
  iconClass: string
  iconGrad: string
}) {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })
  const mv = useMotionValue(0)
  const [display, setDisplay] = useState(0)

  useEffect(() => {
    if (!inView) return
    const controls = animate(mv, count, {
      duration: 0.9,
      ease: 'easeOut',
      onUpdate: (v) => setDisplay(Math.round(v)),
    })
    return () => controls.stop()
  }, [inView, count, mv])

  return (
    <div ref={ref} className="team-stat-tile group relative flex items-center gap-3 rounded-xl border border-border/60 bg-card p-3.5 shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:shadow-md hover:border-border overflow-hidden">
      <div className={`absolute inset-x-0 top-0 h-[2px] bg-gradient-to-r ${accent} opacity-70`} />
      <div className={`flex-shrink-0 w-10 h-10 rounded-lg flex items-center justify-center bg-gradient-to-br ${iconGrad}`}>
        <Icon className={`w-4 h-4 ${iconClass}`} />
      </div>
      <div className="min-w-0">
        <div className="text-2xl font-bold tracking-tight tabular-nums leading-none">{display}</div>
        <div className="text-xs font-medium text-muted-foreground mt-1.5">{label}</div>
      </div>
    </div>
  )
}

export default function GalleryPage() {
  const [selectedPhoto, setSelectedPhoto] = useState<{ category: string; index: number } | null>(null)
  // Per-category visible count, keyed by category folder name. Falls back to INITIAL.
  const [visibleCount, setVisibleCount] = useState<Record<string, number>>({})
  const touchStartX = useRef<number | null>(null)
  const touchStartY = useRef<number | null>(null)

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' })
  }, [])

  // Gallery data — organized by 4 categories, each with its own color identity.
  const galleryCategories = useMemo<GalleryCategory[]>(() => {
    const sortByDateDesc = (a: Photo, b: Photo) => {
      const ya = a.year ?? 0, yb = b.year ?? 0
      if (ya !== yb) return yb - ya  // year descending
      const ma = a.month ?? 0, mb = b.month ?? 0
      return mb - ma  // month descending
    }
    const cats: GalleryCategory[] = [
      {
        name: 'Awards',
        folder: 'awards',
        icon: Trophy,
        accent: 'from-amber-600 to-amber-400',
        iconClass: 'text-amber-700 dark:text-amber-400',
        iconGrad: 'from-amber-500/15 to-amber-400/10',
        badgeClass: 'bg-amber-50 text-amber-700 border-amber-200 dark:bg-amber-900/15 dark:text-amber-400 dark:border-amber-800/25',
        photos: [
          { src: '/gallery/awards/2025-09-Address at the Undergraduate Opening Ceremony.jpg', caption: 'Address at the Undergraduate Opening Ceremony', year: 2025, month: 9 },
          { src: '/gallery/awards/2024-07-Rice Prize.jpg', caption: 'Rice Prize', year: 2024, month: 7 },
          { src: '/gallery/awards/2024-04-China Youth May Fourth Medal Award Ceremony.jpg', caption: 'China Youth May Fourth Medal Award Ceremony', year: 2024, month: 4 },
        ],
      },
      {
        name: 'Conference Attendance',
        folder: 'conference attendance',
        icon: Globe,
        accent: 'from-blue-600 to-blue-400',
        iconClass: 'text-blue-700 dark:text-blue-400',
        iconGrad: 'from-blue-500/15 to-blue-400/10',
        badgeClass: 'bg-blue-50 text-blue-700 border-blue-200 dark:bg-blue-900/15 dark:text-blue-400 dark:border-blue-800/25',
        photos: [
          { src: '/gallery/conference attendance/2026-05-2026 Conference on ICT Innovation and Frontiers.jpg', caption: '2026 Conference on ICT Innovation and Frontiers', year: 2026, month: 5 },
          { src: '/gallery/conference attendance/2024-11-The 3rd RIS forum.jpg', caption: 'The 3rd RIS TECH Forum', year: 2024, month: 11 },
          { src: '/gallery/conference attendance/2024-09-PIMRC.jpg', caption: 'PIMRC 2024', year: 2024, month: 9 },
          { src: '/gallery/conference attendance/2023-02-The 2nd RIS Forum.jpg', caption: 'The 2nd RIS TECH Forum', year: 2023, month: 2 },
          { src: '/gallery/conference attendance/2021-09-The 1st RIS Forum.jpg', caption: 'The 1st RIS TECH Forum', year: 2021, month: 9 },
        ],
      },
      {
        name: 'Team Events',
        folder: 'team events',
        icon: UsersIcon,
        accent: 'from-violet-600 to-violet-400',
        iconClass: 'text-violet-700 dark:text-violet-400',
        iconGrad: 'from-violet-500/15 to-violet-400/10',
        badgeClass: 'bg-violet-50 text-violet-700 border-violet-200 dark:bg-violet-900/15 dark:text-violet-400 dark:border-violet-800/25',
        photos: [
          { src: "/gallery/team events/2026-06-graduation.jpg", caption: "Graduation", year: 2026, month: 6 },
          { src: "/gallery/team events/2025-12-graduation.jpg", caption: "Graduation", year: 2025, month: 12 },
          { src: "/gallery/team events/2025-11-Rongguang Song's defence.jpg", caption: "Rongguang Song's Defence", year: 2025, month: 11 },
          { src: "/gallery/team events/2022-09-teacher's day.jpg", caption: "Teacher's Day", year: 2022, month: 9 },
          { src: '/gallery/team events/2022-06-graduation.jpg', caption: 'Graduation', year: 2022, month: 6 },
          { src: "/gallery/team events/2025-09-teacher's day.jpg", caption: "Teacher's Day", year: 2025, month: 9 },
          { src: "/gallery/team events/2025-08-Weidong Li's defence.jpg", caption: "Weidong Li's Defence", year: 2025, month: 8 },
          { src: "/gallery/team events/2024-09-teacher's day 2.jpg", caption: "Teacher's Day Celebration", year: 2024, month: 9 },
          { src: "/gallery/team events/2024-09-teacher's day.jpg", caption: "Teacher's Day", year: 2024, month: 9 },
          { src: '/gallery/team events/2024-06-graduation 2.jpg', caption: 'Graduation', year: 2024, month: 6 },
          { src: '/gallery/team events/2024-06-graduation.jpg', caption: 'Graduation', year: 2024, month: 6 },
          { src: "/gallery/team events/2024-05-Ziao Qin's defence.jpg", caption: "Ziao Qin's Defence", year: 2024, month: 5 },
        ],
      },
      {
        name: 'Team Activities',
        folder: 'team activities',
        icon: Sparkles,
        accent: 'from-emerald-600 to-emerald-400',
        iconClass: 'text-emerald-700 dark:text-emerald-400',
        iconGrad: 'from-emerald-500/15 to-emerald-400/10',
        badgeClass: 'bg-emerald-50 text-emerald-700 border-emerald-200 dark:bg-emerald-900/15 dark:text-emerald-400 dark:border-emerald-800/25',
        photos: [
          { src: '/gallery/team activities/2025-06-summer team activity.jpg', caption: 'Summer Team Activity', year: 2025, month: 6 },
          { src: '/gallery/team activities/2025-06-football match.jpg', caption: 'Football Match', year: 2025, month: 6 },
          { src: '/gallery/team activities/2025-01-winter team activity.jpg', caption: 'Winter Team Activity', year: 2025, month: 1 },
          { src: '/gallery/team activities/2024-09-football match.jpg', caption: 'Football Match', year: 2024, month: 9 },
          { src: '/gallery/team activities/2022-05-summer team activity.jpg', caption: 'Summer Team Activity', year: 2022, month: 5 },
          { src: '/gallery/team activities/2021-11-winter team activity.jpg', caption: 'Winter Team Activity', year: 2021, month: 11 },
        ],
      },
    ]
    return cats.map(cat => ({
      ...cat,
      photos: [...cat.photos].sort(sortByDateDesc),
    }))
  }, [])

  const totalPhotos = useMemo(() => galleryCategories.reduce((sum, c) => sum + c.photos.length, 0), [galleryCategories])

  // Flatten all photos for lightbox navigation
  const allPhotos = useMemo(() => {
    const photos: (Photo & { category: string })[] = []
    galleryCategories.forEach(cat => {
      cat.photos.forEach(photo => {
        photos.push({ ...photo, category: cat.name })
      })
    })
    return photos
  }, [galleryCategories])

  const getVisibleFor = useCallback((cat: string) => visibleCount[cat] ?? INITIAL, [visibleCount])

  // Get current photo index in flattened array
  const getCurrentPhotoIndex = useCallback(() => {
    if (!selectedPhoto) return -1
    let idx = 0
    for (const cat of galleryCategories) {
      if (cat.name === selectedPhoto.category) {
        return idx + selectedPhoto.index
      }
      idx += cat.photos.length
    }
    return -1
  }, [selectedPhoto, galleryCategories])

  // Touch swipe handlers for lightbox
  const handleTouchStart = useCallback((e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX
    touchStartY.current = e.touches[0].clientY
  }, [])

  const handleTouchMove = useCallback((e: React.TouchEvent) => {
    if (touchStartX.current !== null) {
      const dx = e.touches[0].clientX - touchStartX.current
      if (Math.abs(dx) > Math.abs((e.touches[0].clientY - (touchStartY.current ?? 0)))) {
        e.preventDefault()
      }
    }
  }, [])

  const handleTouchEnd = useCallback((e: React.TouchEvent) => {
    if (touchStartX.current === null || touchStartY.current === null) return
    const dx = e.changedTouches[0].clientX - touchStartX.current
    const dy = e.changedTouches[0].clientY - touchStartY.current
    const threshold = 50
    if (Math.abs(dx) > threshold && Math.abs(dx) > Math.abs(dy)) {
      const currentIdx = getCurrentPhotoIndex()
      if (dx < 0) {
        // Swipe left → next photo
        const nextIdx = currentIdx < allPhotos.length - 1 ? currentIdx + 1 : 0
        const nextPhoto = allPhotos[nextIdx]
        const catIdx = galleryCategories.findIndex(c => c.name === nextPhoto.category)
        const photoIdxInCat = galleryCategories[catIdx].photos.findIndex(p => p.src === nextPhoto.src)
        setSelectedPhoto({ category: nextPhoto.category, index: photoIdxInCat })
      } else {
        // Swipe right → previous photo
        const prevIdx = currentIdx > 0 ? currentIdx - 1 : allPhotos.length - 1
        const prevPhoto = allPhotos[prevIdx]
        const catIdx = galleryCategories.findIndex(c => c.name === prevPhoto.category)
        const photoIdxInCat = galleryCategories[catIdx].photos.findIndex(p => p.src === prevPhoto.src)
        setSelectedPhoto({ category: prevPhoto.category, index: photoIdxInCat })
      }
    }
    touchStartX.current = null
    touchStartY.current = null
  }, [getCurrentPhotoIndex, allPhotos, galleryCategories])

  // Lightbox keyboard navigation
  useEffect(() => {
    if (selectedPhoto === null) return
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setSelectedPhoto(null)
      } else if (e.key === 'ArrowLeft' || e.key === 'ArrowRight') {
        const currentIdx = getCurrentPhotoIndex()
        let newIdx = currentIdx
        if (e.key === 'ArrowLeft') {
          newIdx = currentIdx > 0 ? currentIdx - 1 : allPhotos.length - 1
        } else {
          newIdx = currentIdx < allPhotos.length - 1 ? currentIdx + 1 : 0
        }
        const newPhoto = allPhotos[newIdx]
        const catIdx = galleryCategories.findIndex(c => c.name === newPhoto.category)
        const photoIdxInCat = galleryCategories[catIdx].photos.findIndex(p => p.src === newPhoto.src)
        setSelectedPhoto({ category: newPhoto.category, index: photoIdxInCat })
      }
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [selectedPhoto, getCurrentPhotoIndex, allPhotos, galleryCategories])

  // Get selected photo details
  const getSelectedPhotoDetails = useCallback(() => {
    if (!selectedPhoto) return null
    const category = galleryCategories.find(c => c.name === selectedPhoto.category)
    if (!category) return null
    const photo = category.photos[selectedPhoto.index]
    if (!photo) return null
    return { ...photo, categoryName: category.name }
  }, [selectedPhoto, galleryCategories])

  const selectedPhotoDetails = getSelectedPhotoDetails()

  return (
    <>
      <SectionWrapper id="gallery" className="dot-pattern !pt-4 md:!pt-6 !pb-6 md:!pb-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Member stats bar */}
          <motion.div variants={fadeInUp} className="mb-5">
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
              <StatTile icon={Camera} count={totalPhotos} label="Total Photos" accent="from-red-500 to-red-400" iconClass="text-red-700 dark:text-red-400" iconGrad="from-red-500/15 to-red-400/10" />
              <StatTile icon={Trophy} count={galleryCategories[0].photos.length} label="Awards" accent="from-amber-500 to-amber-400" iconClass="text-amber-700 dark:text-amber-400" iconGrad="from-amber-500/15 to-amber-400/10" />
              <StatTile icon={Globe} count={galleryCategories[1].photos.length} label="Conferences" accent="from-blue-500 to-blue-400" iconClass="text-blue-700 dark:text-blue-400" iconGrad="from-blue-500/15 to-blue-400/10" />
              <StatTile icon={UsersIcon} count={galleryCategories[2].photos.length} label="Team Events" accent="from-violet-500 to-violet-400" iconClass="text-violet-700 dark:text-violet-400" iconGrad="from-violet-500/15 to-violet-400/10" />
              <StatTile icon={Sparkles} count={galleryCategories[3].photos.length} label="Activities" accent="from-emerald-500 to-emerald-400" iconClass="text-emerald-700 dark:text-emerald-400" iconGrad="from-emerald-500/15 to-emerald-400/10" />
            </div>
          </motion.div>

          {/* 4 Categories — stacked vertically */}
          <div className="space-y-8">
            {galleryCategories.map((category, catIdx) => {
              const visible = getVisibleFor(category.folder)
              const shown = category.photos.slice(0, visible)
              const remaining = category.photos.length - visible
              const fullyExpanded = remaining <= 0

              return (
                <motion.section
                  key={category.name}
                  variants={fadeInUp}
                  id={`nav-gallery-${catIdx}`}
                  className="scroll-mt-24"
                >
                  <SectionHeader
                    icon={category.icon}
                    title={category.name}
                    count={category.photos.length}
                    accent={category.accent}
                    iconClass={category.iconClass}
                    iconGrad={category.iconGrad}
                    badgeClass={category.badgeClass}
                  />

                  {/* Photos Grid — responsive */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    {shown.map((photo, photoIdx) => (
                      <motion.div
                        key={photo.src}
                        variants={staggerItem}
                        className="group cursor-pointer"
                        onClick={() => setSelectedPhoto({ category: category.name, index: photoIdx })}
                      >
                        <div className="relative rounded-xl overflow-hidden border border-border/60 bg-card shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg hover:border-border aspect-[4/3]">
                          <Image
                            src={photo.src}
                            alt={formatCaption(photo)}
                            width={400}
                            height={300}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                          />
                          {/* View icon overlay on hover */}
                          <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
                            <div className="w-10 h-10 rounded-full bg-black/40 backdrop-blur-sm flex items-center justify-center border border-white/30">
                              <Maximize2 className="w-5 h-5 text-white" />
                            </div>
                          </div>
                        </div>
                        {/* Caption */}
                        <p className="mt-2.5 text-sm font-medium text-foreground line-clamp-2">
                          {photo.caption}
                          {photo.year != null && (
                            <span className="inline-flex items-center px-1.5 py-0.5 rounded text-[11px] font-medium bg-muted/60 text-muted-foreground ml-1.5 align-middle leading-none">
                              {formatDateLabel(photo)}
                            </span>
                          )}
                        </p>
                      </motion.div>
                    ))}
                  </div>

                  {/* Show More / Show Less */}
                  {category.photos.length > INITIAL && (
                    <div className="mt-5 flex justify-center">
                      <button
                        onClick={() => {
                          setVisibleCount(prev => {
                            const cur = prev[category.folder] ?? INITIAL
                            if (cur >= category.photos.length) {
                              // fully expanded → collapse
                              return { ...prev, [category.folder]: INITIAL }
                            }
                            // expand by another INITIAL chunk (clamp to total)
                            return { ...prev, [category.folder]: Math.min(cur + INITIAL, category.photos.length) }
                          })
                        }}
                        className="group inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-card/90 border border-border/60 shadow-lg backdrop-blur-md hover:shadow-xl hover:border-primary/40 hover:-translate-y-0.5 transition-all duration-300"
                      >
                        {fullyExpanded ? (
                          <ChevronUp className="w-4 h-4 text-muted-foreground group-hover:text-primary transition-colors" />
                        ) : (
                          <ChevronDown className="w-4 h-4 text-muted-foreground group-hover:text-primary transition-colors animate-bounce" />
                        )}
                        <span className="text-sm font-medium text-muted-foreground group-hover:text-foreground transition-colors">
                          {fullyExpanded ? 'Show less' : 'Show more'}
                        </span>
                        {!fullyExpanded && (
                          <span className="inline-flex items-center justify-center min-w-5 h-5 px-1.5 rounded-full bg-primary/10 text-primary text-[11px] font-semibold tabular-nums transition-colors group-hover:bg-primary/15">
                            {remaining}
                          </span>
                        )}
                      </button>
                    </div>
                  )}
                </motion.section>
              )
            })}
          </div>
        </div>
      </SectionWrapper>

      {/* Lightbox Dialog */}
      <Dialog open={selectedPhoto !== null} onOpenChange={(open) => { if (!open) setSelectedPhoto(null) }}>
        <DialogContent className="!fixed !inset-0 !top-0 !left-0 !translate-x-0 !translate-y-0 !max-w-none !w-screen !h-screen !max-h-screen !rounded-none !border-0 !p-0 bg-black/95 backdrop-blur-xl overflow-hidden" showCloseButton={false}>
          {selectedPhotoDetails && (
            <div className="absolute inset-0 flex flex-col">
              {/* Close button — Fixed position */}
              <button
                onClick={() => setSelectedPhoto(null)}
                className="absolute top-3 right-3 sm:top-4 sm:right-4 z-[100] w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-white/10 backdrop-blur-md hover:bg-white/20 border border-white/15 hover:shadow-lg flex items-center justify-center transition-all"
                aria-label="Close"
              >
                <X className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
              </button>
              {/* Navigation arrows — frosted */}
              <button
                onClick={(e) => {
                  e.stopPropagation()
                  const currentIdx = getCurrentPhotoIndex()
                  const prevIdx = currentIdx > 0 ? currentIdx - 1 : allPhotos.length - 1
                  const prevPhoto = allPhotos[prevIdx]
                  const catIdx = galleryCategories.findIndex(c => c.name === prevPhoto.category)
                  const photoIdxInCat = galleryCategories[catIdx].photos.findIndex(p => p.src === prevPhoto.src)
                  setSelectedPhoto({ category: prevPhoto.category, index: photoIdxInCat })
                }}
                className="absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 z-[100] w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-white/10 backdrop-blur-md hover:bg-white/20 border border-white/15 hover:shadow-lg flex items-center justify-center transition-all"
                aria-label="Previous photo"
              >
                <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
              </button>
              <button
                onClick={(e) => {
                  e.stopPropagation()
                  const currentIdx = getCurrentPhotoIndex()
                  const nextIdx = currentIdx < allPhotos.length - 1 ? currentIdx + 1 : 0
                  const nextPhoto = allPhotos[nextIdx]
                  const catIdx = galleryCategories.findIndex(c => c.name === nextPhoto.category)
                  const photoIdxInCat = galleryCategories[catIdx].photos.findIndex(p => p.src === nextPhoto.src)
                  setSelectedPhoto({ category: nextPhoto.category, index: photoIdxInCat })
                }}
                className="absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 z-[100] w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-white/10 backdrop-blur-md hover:bg-white/20 border border-white/15 hover:shadow-lg flex items-center justify-center transition-all"
                aria-label="Next photo"
              >
                <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
              </button>
              {/* Main Content — click backdrop to close */}
              <div
                className="absolute inset-0 flex flex-col cursor-pointer"
                onClick={() => setSelectedPhoto(null)}
              >
                {/* Image Container */}
                <div
                  className="flex-1 flex items-center justify-center overflow-hidden"
                  onTouchStart={handleTouchStart}
                  onTouchMove={handleTouchMove}
                  onTouchEnd={handleTouchEnd}
                  onClick={(e) => e.stopPropagation()}
                >
                  <div className="w-full h-full flex items-center justify-center p-12 sm:p-16 pb-32">
                    <img
                      src={selectedPhotoDetails.src}
                      alt={formatCaption(selectedPhotoDetails)}
                      className="max-w-full max-h-full w-auto h-auto object-contain"
                      style={{ maxWidth: 'calc(100vw - 24px)', maxHeight: 'calc(100vh - 200px)' }}
                    />
                  </div>
                </div>
                {/* Thumbnail Strip — Fixed at bottom */}
                {allPhotos.length > 1 && (
                  <div
                    className="absolute bottom-12 sm:bottom-14 left-0 right-0 w-full px-2 sm:px-4 py-2 bg-gradient-to-t from-black/60 to-transparent"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <div className="flex items-center justify-center gap-1 sm:gap-1.5 py-1 custom-scrollbar">
                      {(() => {
                        const THUMB_WINDOW = 5
                        const currentIdx = getCurrentPhotoIndex()
                        const total = allPhotos.length
                        const maxStart = Math.max(0, total - THUMB_WINDOW)
                        const windowStart = Math.min(Math.max(0, currentIdx - Math.floor(THUMB_WINDOW / 2)), maxStart)
                        const windowEnd = Math.min(total, windowStart + THUMB_WINDOW)
                        return allPhotos.slice(windowStart, windowEnd).map((photo, offset) => {
                          const idx = windowStart + offset
                          const isActive = idx === currentIdx
                          return (
                            <button
                              key={`${photo.src}-${idx}`}
                              onClick={(e) => {
                                e.stopPropagation()
                                const catIdx = galleryCategories.findIndex(c => c.name === photo.category)
                                const photoIdxInCat = galleryCategories[catIdx].photos.findIndex(p => p.src === photo.src)
                                setSelectedPhoto({ category: photo.category, index: photoIdxInCat })
                              }}
                              className={`flex-shrink-0 w-10 h-10 sm:w-14 sm:h-14 rounded-md overflow-hidden border-2 ring-1 ring-white/10 transition-all duration-200 ${
                                isActive
                                  ? 'border-white/80 ring-white/40 opacity-100 scale-105'
                                  : 'border-white/20 opacity-60 hover:opacity-100 hover:border-white/50'
                              }`}
                            >
                              <Image
                                src={photo.src}
                                alt={formatCaption(photo)}
                                width={64}
                                height={64}
                                className="w-full h-full object-cover"
                              />
                            </button>
                          )
                        })
                      })()}
                    </div>
                  </div>
                )}
                {/* Caption bar — gradient */}
                <div
                  className="absolute bottom-0 left-0 right-0 w-full py-2 px-3 sm:px-6 bg-gradient-to-t from-black/70 via-black/40 to-transparent"
                  onClick={(e) => e.stopPropagation()}
                >
                  <div className="flex items-center justify-between gap-3">
                    <div className="flex-1 min-w-0">
                      <p className="text-white text-xs sm:text-sm font-medium truncate">
                        {selectedPhotoDetails.caption}
                        {selectedPhotoDetails.year != null && (
                          <span className="inline-flex items-center px-1.5 py-0.5 rounded text-[10px] sm:text-[11px] font-medium bg-white/15 text-white/80 ml-1.5 align-middle leading-none">
                            {formatDateLabel(selectedPhotoDetails)}
                          </span>
                        )}
                      </p>
                      <Badge variant="secondary" className="text-[9px] sm:text-[10px] mt-0.5 bg-white/10 text-white/70 border-white/10">
                        {selectedPhotoDetails.categoryName}
                      </Badge>
                    </div>
                    <p className="text-white/50 text-[10px] sm:text-sm tabular-nums flex-shrink-0">
                      {getCurrentPhotoIndex() + 1} / {allPhotos.length}
                    </p>
                  </div>
                </div>
              </div>
              <DialogHeader className="sr-only">
                <DialogTitle>{formatCaption(selectedPhotoDetails)}</DialogTitle>
              </DialogHeader>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </>
  )
}
