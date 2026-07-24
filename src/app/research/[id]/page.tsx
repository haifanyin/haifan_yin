import { researchTopics } from '@/lib/data'
import ResearchTopicClient from './client'

export function generateStaticParams() {
  return researchTopics
    .filter(t => !t.parentId)
    .filter(t => researchTopics.some(c => c.parentId === t.id))
    .map(t => ({ id: t.id }))
}

export default function ResearchTopicPage({ params }: { params: Promise<{ id: string }> }) {
  return <ResearchTopicClient />
}
