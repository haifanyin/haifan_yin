export type ResearchBlogSection = {
  id: string
  number: string
  heading: string
  paragraphs?: string[]
  bullets?: { label: string; text: string }[]
  metrics?: { value: string; label: string }[]
  figure?: { src: string; alt: string; caption: string }
}

export type ResearchBlog = {
  topicId: string
  slug: string
  title: string
  summary: string
  date: string
  author: string
  readTime: string
  heroImage: string
  tags: string[]
  sourceUrl?: string
  sections: ResearchBlogSection[]
  paperInfo: { label: string; value: string }[]
}
