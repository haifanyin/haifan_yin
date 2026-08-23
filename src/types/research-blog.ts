export type ResearchBlogFigure = {
  src: string
  alt: string
  caption: string
  width: number
  height: number
}

export type ResearchBlogSection = {
  id: string
  number: string
  heading: string
  paragraphs?: string[]
  bullets?: { label: string; text: string }[]
  metrics?: { value: string; label: string }[]
  figure?: ResearchBlogFigure
  figures?: ResearchBlogFigure[]
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
