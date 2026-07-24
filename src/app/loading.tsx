import { Skeleton } from '@/components/ui/skeleton'

export default function Loading() {
  return (
    <main className="page-hero-gradient relative overflow-hidden pt-16 md:pt-20">
      {/* Floating Orbs (static, no animation needed for skeleton) */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden" aria-hidden="true">
        <div className="absolute top-[10%] left-[5%] w-[200px] h-[200px] rounded-full bg-primary/3 blur-3xl" />
        <div className="absolute bottom-[10%] right-[5%] w-[300px] h-[300px] rounded-full bg-primary/2 blur-3xl" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-3 pb-0 md:pt-4 md:pb-0 min-w-0">
        {/* Hero skeleton */}
        <div className="flex items-center gap-3 mb-1">
          <Skeleton className="w-10 h-10 rounded-xl" />
          <Skeleton className="h-8 w-48 md:h-9 md:w-64" />
        </div>
        <div className="md:ml-16">
          <Skeleton className="h-4 w-72 md:h-5 md:w-96 mb-2" />
        </div>
        <div className="md:ml-16 mt-2 mb-3">
          <Skeleton className="h-[3px] w-20 rounded-sm" />
        </div>

        {/* Content section skeleton */}
        <div className="py-8 md:py-12 space-y-6">
          {/* Section title */}
          <Skeleton className="h-6 w-40 mb-8" />

          {/* Card grid placeholder */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
            {Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="rounded-xl border border-border/60 p-5 space-y-3">
                <Skeleton className="h-40 w-full rounded-lg" />
                <Skeleton className="h-5 w-3/4" />
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-2/3" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </main>
  )
}
