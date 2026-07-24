'use client'

import { useEffect } from 'react'
import Link from 'next/link'
import { AlertTriangle, RotateCcw } from 'lucide-react'
import { Button } from '@/components/ui/button'

interface ErrorPageProps {
  error: Error & { digest?: string }
  reset: () => void
}

export default function ErrorPage({ error, reset }: ErrorPageProps) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error('Unhandled page error:', error)
  }, [error])

  return (
    <main className="page-hero-gradient relative min-h-[calc(100vh-16rem)] flex items-center justify-center overflow-hidden pt-16 md:pt-20">
      {/* Floating Orbs */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden" aria-hidden="true">
        <div className="hero-orb-1 absolute top-[15%] left-[8%] w-[180px] h-[180px] rounded-full bg-destructive/3 blur-3xl" />
        <div className="hero-orb-2 absolute bottom-[15%] right-[8%] w-[240px] h-[240px] rounded-full bg-destructive/2 blur-3xl" />
      </div>

      <div className="relative z-10 max-w-md mx-auto px-4 sm:px-6 text-center">
        {/* Icon */}
        <div className="mx-auto mb-6 w-16 h-16 rounded-2xl bg-gradient-to-br from-[oklch(0.55_0.15_20)] to-[oklch(0.40_0.10_10)] flex items-center justify-center shadow-md">
          <AlertTriangle className="w-8 h-8 text-white" />
        </div>

        {/* Title */}
        <h1 className="text-xl md:text-2xl font-semibold text-foreground mb-2">
          Something Went Wrong
        </h1>

        {/* Description */}
        <p className="text-sm text-muted-foreground leading-relaxed mb-8">
          An unexpected error occurred. Please try again, or return to the homepage.
        </p>

        {/* Decorative line */}
        <div className="decorative-line w-16 mx-auto mb-8" />

        {/* Actions */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
          <Button onClick={reset} size="lg">
            <RotateCcw className="w-4 h-4" />
            Try Again
          </Button>
          <Button variant="outline" size="lg" asChild>
            <Link href="/">Back to Home</Link>
          </Button>
        </div>
      </div>
    </main>
  )
}
