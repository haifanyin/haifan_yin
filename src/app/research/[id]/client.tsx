'use client'

import { useMemo } from 'react'
import { useParams, useRouter } from 'next/navigation'
import { ArrowLeft } from 'lucide-react'
import { researchTopics } from '@/lib/data'
import ResearchCard from '@/components/research/ResearchCard'
import SectionWrapper from '@/components/layout/SectionWrapper'

export default function ResearchTopicClient() {
  const params = useParams()
  const router = useRouter()
  const id = params.id as string

  const parent = useMemo(() => researchTopics.find(t => t.id === id), [id])
  const children = useMemo(
    () => researchTopics.filter(t => t.parentId === id),
    [id]
  )

  if (!parent) {
    return (
      <SectionWrapper id="research-topic" className="!pt-4">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center py-24">
          <p className="text-muted-foreground">Research topic not found.</p>
          <button onClick={() => router.push('/research')} className="mt-4 academic-link text-sm">
            ← Back to Research
          </button>
        </div>
      </SectionWrapper>
    )
  }

  return (
    <main>
      <SectionWrapper id="research-topic" className="!pt-2 md:!pt-4">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <button
            onClick={() => router.push('/research')}
            className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors mb-6"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Research
          </button>

          <ResearchCard topic={parent} index={0} />

          {children.length > 0 && (
            <div className="mt-8 space-y-4">
              <div className="flex items-center gap-3 mb-2">
                <div className="decorative-line-blue w-8" />
                <h2 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider">
                  Sub-Topics
                </h2>
              </div>
              {children.map((child, i) => (
                <div key={child.id} className="md:pl-14 border-l-2 border-primary/10 pl-4">
                  <ResearchCard topic={child} index={i + 1} />
                </div>
              ))}
            </div>
          )}
        </div>
      </SectionWrapper>
    </main>
  )
}
