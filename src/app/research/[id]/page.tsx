import { researchTopics } from '@/lib/data'
import ResearchTopicClient from './client'

export function generateStaticParams() {
  return researchTopics.map(t => ({ id: t.id }))
}

export default function ResearchTopicPage() {
  return <ResearchTopicClient />
}
