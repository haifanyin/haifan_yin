<<<<<<< HEAD
export type ResearchBlogFigure = {
  src: string
  alt: string
  caption: string
  width: number
  height: number
}

=======
>>>>>>> abb8b463d17aa945b15142ac025a21641d3b6ee6
export type ResearchBlogSection = {
  id: string
  number: string
  heading: string
  paragraphs?: string[]
  bullets?: { label: string; text: string }[]
  metrics?: { value: string; label: string }[]
<<<<<<< HEAD
  figure?: ResearchBlogFigure
  figures?: ResearchBlogFigure[]
=======
  figure?: { src: string; alt: string; caption: string }
>>>>>>> abb8b463d17aa945b15142ac025a21641d3b6ee6
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
