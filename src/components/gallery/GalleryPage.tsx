'use client'

import { useState, useEffect, useRef, useCallback, useMemo } from 'react'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Badge } from '@/components/ui/badge'
import { ArrowRight, Camera, ChevronLeft, ChevronRight, Globe, Maximize2, Sparkles, Trophy, Users as UsersIcon, X } from 'lucide-react'
import { fadeInUp } from '@/lib/constants'
export default function GalleryPage() {
  const [selectedPhoto, setSelectedPhoto] = useState<{ category: string; index: number } | null>(null)
  const touchStartX = useRef<number | null>(null)
  const touchStartY = useRef<number | null>(null)

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' })
  }, [])

  // Gallery data - organized by 4 categories
  const galleryCategories = useMemo(() => [
    {
      name: 'Awards',
      folder: 'awards',
      icon: Trophy,
      color: 'from-amber-500 to-orange-600',
      photos: [
        { src: '/gallery/awards/2024-rice prize.png', caption: 'Rice Prize (2024)' },
        { src: '/gallery/awards/2024-09-Speech on the May 4th Youth Medal.jpg', caption: 'Speech on the May 4th Youth Medal (2024.09)' },
      ]
    },
    {
      name: 'Conference Attendance',
      folder: 'conference attendance',
      icon: Globe,
      color: 'from-blue-500 to-cyan-600',
      photos: [
        { src: '/gallery/conference attendance/2024-11-the 3rd RIS forum.jpg', caption: 'The 3rd RIS Forum (2024.11)' },
      ]
    },
    {
      name: 'Team Events',
      folder: 'team events',
      icon: UsersIcon,
      color: 'from-violet-500 to-purple-600',
      photos: [
        { src: '/gallery/team events/2025-11-Rongguang Song\'s defence.jpg', caption: "Rongguang Song's Defence (2025.11)" },
        { src: '/gallery/team events/2025-09-teacher\'s day.jpg', caption: "Teacher's Day (2025.09)" },
        { src: '/gallery/team events/2025-08-Weidong Li\'s defence.jpg', caption: "Weidong Li's Defence (2025.08)" },
        { src: '/gallery/team events/2024-09-teacher\'s day 2.jpg', caption: "Teacher's Day Celebration (2024.09)" },
        { src: '/gallery/team events/2024-09-teacher\'s day.jpg', caption: "Teacher's Day (2024.09)" },
        { src: '/gallery/team events/2024-06-graduation 2.jpg', caption: 'Graduation Ceremony (2024.06)' },
        { src: '/gallery/team events/2024-06-graduation.jpg', caption: 'Graduation (2024.06)' },
        { src: '/gallery/team events/2024-05-Ziao Qin\'s defence.jpg', caption: "Ziao Qin's Defence (2024.05)" },
      ]
    },
    {
      name: 'Team Activities',
      folder: 'team activities',
      icon: Sparkles,
      color: 'from-emerald-500 to-teal-600',
      photos: [
        { src: '/gallery/team activities/2025-summer team activity.jpg', caption: 'Summer Team Activity (2025)' },
        { src: '/gallery/team activities/2025-06-football match.jpg', caption: 'Football Match (2025.06)' },
        { src: '/gallery/team activities/2024-winter team activity.jpg', caption: 'Winter Team Activity (2024)' },
        { src: '/gallery/team activities/2024-09-football match.jpg', caption: 'Football Match (2024.09)' },
      ]
    },
  ], [])

  // Flatten all photos for lightbox navigation
  const allPhotos = useMemo(() => {
    const photos: { src: string; caption: string; category: string }[] = []
    galleryCategories.forEach(cat => {
      cat.photos.forEach(photo => {
        photos.push({ ...photo, category: cat.name })
      })
    })
    return photos
  }, [galleryCategories])

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
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, ease: 'easeOut' }}
          className="mb-8"
        >
          <div className="flex items-center gap-2 flex-wrap">
            <Camera className="w-4 h-4 text-muted-foreground" />
            <span className="text-xs text-muted-foreground font-medium">
              {allPhotos.length} photos across {galleryCategories.length} categories
            </span>
          </div>
        </motion.div>

        {/* 4 Categories - Stacked Vertically */}
        <div className="space-y-12">
          {galleryCategories.map((category, catIdx) => (
            <motion.section
              key={category.name}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: catIdx * 0.15 }}
              className="scroll-mt-24"
            >
              {/* Category Header */}
              <div className="flex items-center gap-3 mb-6 pb-4 border-b border-border/60">
                <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${category.color} flex items-center justify-center shadow-md`}>
                  <category.icon className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h2 className="text-xl font-bold text-foreground">{category.name}</h2>
                  <p className="text-xs text-muted-foreground">{category.photos.length} photos</p>
                </div>
              </div>

              {/* Photos Grid - Responsive */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {category.photos.map((photo, photoIdx) => (
                  <motion.div
                    key={photo.src}
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: catIdx * 0.1 + photoIdx * 0.05 }}
                    className="group cursor-pointer"
                    onClick={() => setSelectedPhoto({ category: category.name, index: photoIdx })}
                  >
                    <div className="relative rounded-xl overflow-hidden border border-border/60 hover:shadow-lg transition-all duration-300 hover:border-primary/30 aspect-[4/3]">
                      <Image
                        src={photo.src}
                        alt={photo.caption}
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
                    {/* Caption - Always Visible */}
                    <p className="mt-2.5 text-sm font-medium text-foreground line-clamp-2">{photo.caption}</p>
                  </motion.div>
                ))}
              </div>
            </motion.section>
          ))}
        </div>
      </div>

      {/* Lightbox Dialog */}
      <Dialog open={selectedPhoto !== null} onOpenChange={(open) => { if (!open) setSelectedPhoto(null) }}>
        <DialogContent className="!fixed !inset-0 !top-0 !left-0 !translate-x-0 !translate-y-0 !max-w-none !w-screen !h-screen !max-h-screen !rounded-none !border-0 !p-0 bg-black/95 backdrop-blur-xl overflow-hidden" showCloseButton={false}>
          {selectedPhotoDetails && (
            <div className="absolute inset-0 flex flex-col">
              {/* Close button - Fixed position */}
              <button
                onClick={() => setSelectedPhoto(null)}
                className="absolute top-3 right-3 sm:top-4 sm:right-4 z-[100] w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-white/20 hover:bg-white/40 flex items-center justify-center transition-colors"
                aria-label="Close"
              >
                <X className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
              </button>
              {/* Navigation arrows - Fixed position */}
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
                className="absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 z-[100] w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-white/20 hover:bg-white/40 flex items-center justify-center transition-colors"
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
                className="absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 z-[100] w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-white/20 hover:bg-white/40 flex items-center justify-center transition-colors"
                aria-label="Next photo"
              >
                <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
              </button>
              {/* Main Content - Click to close */}
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
                      alt={selectedPhotoDetails.caption}
                      className="max-w-full max-h-full w-auto h-auto object-contain"
                      style={{ maxWidth: 'calc(100vw - 24px)', maxHeight: 'calc(100vh - 200px)' }}
                    />
                  </div>
                </div>
                {/* Thumbnail Strip - Fixed at bottom */}
                {allPhotos.length > 1 && (
                  <div
                    className="absolute bottom-12 sm:bottom-14 left-0 right-0 w-full px-2 sm:px-4 py-2 bg-gradient-to-t from-black/60 to-transparent"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <div className="flex items-center justify-center gap-1 sm:gap-1.5 overflow-x-auto py-1 custom-scrollbar">
                      {allPhotos.map((photo, idx) => {
                        const currentIdx = getCurrentPhotoIndex()
                        const isActive = idx === currentIdx
                        const isNeighbor = Math.abs(idx - currentIdx) <= 4
                        if (!isActive && !isNeighbor && allPhotos.length > 10) return null
                        return (
                          <button
                            key={`${photo.src}-${idx}`}
                            onClick={(e) => {
                              e.stopPropagation()
                              const catIdx = galleryCategories.findIndex(c => c.name === photo.category)
                              const photoIdxInCat = galleryCategories[catIdx].photos.findIndex(p => p.src === photo.src)
                              setSelectedPhoto({ category: photo.category, index: photoIdxInCat })
                            }}
                            className={`flex-shrink-0 w-10 h-10 sm:w-14 sm:h-14 rounded-md overflow-hidden border-2 transition-all duration-200 ${
                              isActive
                                ? 'border-white/80 opacity-100 scale-105'
                                : 'border-white/20 opacity-60 hover:opacity-100 hover:border-white/50'
                            }`}
                          >
                            <Image
                              src={photo.src}
                              alt={photo.caption}
                              width={64}
                              height={64}
                              className="w-full h-full object-cover"
                            />
                          </button>
                        )
                      })}
                    </div>
                  </div>
                )}
                {/* Caption bar - Fixed at bottom */}
                <div
                  className="absolute bottom-0 left-0 right-0 w-full py-2 px-3 sm:px-6 bg-black/40"
                  onClick={(e) => e.stopPropagation()}
                >
                  <div className="flex items-center justify-between gap-3">
                    <div className="flex-1 min-w-0">
                      <p className="text-white text-xs sm:text-sm font-medium truncate">{selectedPhotoDetails.caption}</p>
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
                <DialogTitle>{selectedPhotoDetails.caption}</DialogTitle>
              </DialogHeader>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </>
  )
}
