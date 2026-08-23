import { notFound } from 'next/navigation'
import ResearchBlogList from '@/components/research/ResearchBlogList'
import { researchBlogs } from '@/lib/data'
import { researchTopics } from '@/lib/data'

export function generateStaticParams() {
  return Array.from(new Set(researchBlogs.map((blog) => blog.topicId))).map((id) => ({ id }))
}

export default async function ResearchBlogsPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const topic = researchTopics.find((item) => item.id === id)
  const blogs = researchBlogs.filter((blog) => blog.topicId === id)

  if (!topic || blogs.length === 0) notFound()

  return <ResearchBlogList topic={topic} blogs={blogs} />
}