import { notFound } from 'next/navigation'
import ResearchBlogArticle from '@/components/research/ResearchBlogArticle'
import { researchBlogs } from '@/lib/data'
import { researchTopics } from '@/lib/data'

export function generateStaticParams() {
  return researchBlogs.map((blog) => ({ id: blog.topicId, slug: blog.slug }))
}

export default async function ResearchBlogDetailPage({ params }: { params: Promise<{ id: string; slug: string }> }) {
  const { id, slug } = await params
  const topic = researchTopics.find((item) => item.id === id)
  const blog = researchBlogs.find((item) => item.topicId === id && item.slug === slug)

  if (!topic || !blog) notFound()

  return <ResearchBlogArticle topic={topic} blog={blog} />
}