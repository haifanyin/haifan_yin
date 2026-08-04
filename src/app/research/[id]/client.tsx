'use client'

import { ArrowLeft, ChevronRight } from 'lucide-react'
import { useParams, useRouter } from 'next/navigation'
import { researchTopics } from '@/lib/data'
import ResearchCard from '@/components/research/ResearchCard'
import SectionWrapper from '@/components/layout/SectionWrapper'
import PageHero from '@/components/layout/PageHero'

export default function ResearchTopicClient() {
  const params = useParams()
  const router = useRouter()
  const id = params.id as string
  const topic = researchTopics.find((item) => item.id === id)

  if (!topic) {
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
      <PageHero page="research" />
      <SectionWrapper id="research-topic" className="!pt-2 md:!pt-4">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-1.5 text-sm mb-6">
            <button
              onClick={() => router.push(`/research#${id}`)}
              className="group inline-flex items-center gap-1.5 text-muted-foreground hover:text-foreground transition-colors"
            >
              <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-0.5" />
              Back to Research
            </button>
            <ChevronRight className="w-3.5 h-3.5 text-muted-foreground/40" />
            <span className="font-medium text-foreground/80">{topic.title}</span>
          </div>

          <ResearchCard topic={topic} />
        </div>
      </SectionWrapper>
    </main>
  )
}
