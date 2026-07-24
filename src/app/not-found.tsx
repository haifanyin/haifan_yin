import Link from 'next/link'
import { FileQuestion } from 'lucide-react'
import { Button } from '@/components/ui/button'

export default function NotFoundPage() {
  return (
    <main className="page-hero-gradient relative min-h-[calc(100vh-16rem)] flex items-center justify-center overflow-hidden pt-16 md:pt-20">
      {/* Floating Orbs */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden" aria-hidden="true">
        <div className="hero-orb-1 absolute top-[15%] left-[8%] w-[180px] h-[180px] rounded-full bg-primary/4 blur-3xl" />
        <div className="hero-orb-2 absolute bottom-[15%] right-[8%] w-[240px] h-[240px] rounded-full bg-primary/2 blur-3xl" />
      </div>

      <div className="relative z-10 max-w-md mx-auto px-4 sm:px-6 text-center">
        {/* Icon */}
        <div className="mx-auto mb-6 w-16 h-16 rounded-2xl bg-gradient-to-br from-[oklch(0.45_0.12_260)] to-[oklch(0.35_0.08_220)] flex items-center justify-center shadow-md">
          <FileQuestion className="w-8 h-8 text-white" />
        </div>

        {/* 404 */}
        <p className="text-7xl md:text-8xl font-bold tracking-tighter gradient-text mb-3">
          404
        </p>

        {/* Title */}
        <h1 className="text-xl md:text-2xl font-semibold text-foreground mb-2">
          Page Not Found
        </h1>

        {/* Description */}
        <p className="text-sm text-muted-foreground leading-relaxed mb-8">
          The page you are looking for does not exist or has been moved.
        </p>

        {/* Decorative line */}
        <div className="decorative-line w-16 mx-auto mb-8" />

        {/* Back to home */}
        <Button asChild size="lg">
          <Link href="/">Back to Home</Link>
        </Button>
      </div>
    </main>
  )
}
