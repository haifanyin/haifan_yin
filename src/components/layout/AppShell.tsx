'use client'

import { useState } from 'react'
import Navigation from '@/components/layout/Navigation'
import Footer from '@/components/layout/Footer'
import BackToTop from '@/components/layout/BackToTop'
import Toast from '@/components/ui/toast'

export default function AppShell({ children }: { children: React.ReactNode }) {
  const [toastVisible, setToastVisible] = useState(false)

  return (
    <div className="min-h-screen flex flex-col pb-16 md:pb-0">
      <Navigation />
      <div className="flex-1">{children}</div>
      <Footer />
      <BackToTop />
      <Toast message="Downloaded BibTeX file!" visible={toastVisible} onClose={() => setToastVisible(false)} />
    </div>
  )
}
