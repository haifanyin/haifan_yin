import Image from 'next/image'
import Link from 'next/link'
import { ArrowLeft, BookOpenText, CalendarDays, ChevronRight, Clock3, ExternalLink } from 'lucide-react'
import type { ResearchBlog, ResearchBlogSection } from '@/types/research-blog'
import type { ResearchTopic } from '@/types'

function BlogSection({ section }: { section: ResearchBlogSection }) {
<<<<<<< HEAD
  const figures = section.figures ?? (section.figure ? [section.figure] : [])

=======
>>>>>>> abb8b463d17aa945b15142ac025a21641d3b6ee6
  return (
    <section id={section.id} className="scroll-mt-28">
      <div className="mb-4 flex items-start gap-3">
        <span className="mt-1 inline-flex h-8 min-w-8 items-center justify-center rounded-lg bg-primary/10 px-2 text-xs font-bold tabular-nums text-primary">
          {section.number}
        </span>
        <h2 className="text-2xl font-bold tracking-tight text-foreground md:text-3xl">{section.heading}</h2>
      </div>

      <div className="space-y-4 text-[15px] leading-8 text-muted-foreground">
        {section.paragraphs?.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
      </div>

      {section.metrics && (
        <div className="my-7 grid gap-3 sm:grid-cols-2">
          {section.metrics.map((metric) => (
            <div key={metric.label} className="rounded-xl border border-primary/15 bg-primary/[0.05] p-4">
              <div className="text-xl font-bold tracking-tight text-primary md:text-2xl">{metric.value}</div>
              <div className="mt-1 text-xs leading-relaxed text-muted-foreground">{metric.label}</div>
            </div>
          ))}
        </div>
      )}

      {section.bullets && (
        <div className="mt-6 space-y-3">
          {section.bullets.map((bullet) => (
            <div key={bullet.label} className="rounded-xl border border-border/60 bg-card/70 p-4 shadow-sm">
              <div className="flex gap-3">
                <span className="mt-2 h-2 w-2 shrink-0 rounded-full bg-primary/60" />
                <p className="text-sm leading-7 text-muted-foreground">
                  <strong className="font-semibold text-foreground">{bullet.label}.</strong>{' '}
                  {bullet.text}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}

<<<<<<< HEAD
      {figures.length > 0 && (
        <div className="my-8 space-y-6">
          {figures.map((figure) => (
            <figure key={figure.src} className="overflow-hidden rounded-2xl border border-border/60 bg-card shadow-sm">
              <div className="flex items-center justify-center bg-muted/30">
                <Image
                  src={figure.src}
                  alt={figure.alt}
                  width={figure.width}
                  height={figure.height}
                  sizes="(min-width: 1024px) 768px, 100vw"
                  className="h-auto max-h-[620px] w-full object-contain p-4 md:p-7"
                />
              </div>
              <figcaption className="border-t border-border/50 px-5 py-3 text-xs leading-relaxed text-muted-foreground md:px-8">
                {figure.caption}
              </figcaption>
            </figure>
          ))}
        </div>
=======
      {section.figure && (
        <figure className="my-8 overflow-hidden rounded-2xl border border-border/60 bg-card shadow-sm">
          <div className="relative aspect-[16/8] bg-muted/30">
            <Image src={section.figure.src} alt={section.figure.alt} fill className="object-contain p-5 md:p-8" />
          </div>
          <figcaption className="border-t border-border/50 px-5 py-3 text-xs leading-relaxed text-muted-foreground md:px-8">
            {section.figure.caption}
          </figcaption>
        </figure>
>>>>>>> abb8b463d17aa945b15142ac025a21641d3b6ee6
      )}
    </section>
  )
}

export default function ResearchBlogArticle({ topic, blog }: { topic: ResearchTopic; blog: ResearchBlog }) {
  return (
    <main>
<<<<<<< HEAD
      <section className="relative overflow-hidden border-b border-border/50 bg-gradient-to-br from-primary/[0.08] via-background to-primary/[0.03] pt-24 md:pt-28">
=======
      <section className="relative overflow-hidden border-b border-border/50 bg-gradient-to-br from-primary/[0.08] via-background to-primary/[0.03] pt-10 md:pt-16">
>>>>>>> abb8b463d17aa945b15142ac025a21641d3b6ee6
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_15%_20%,oklch(0.45_0.12_260_/_0.08),transparent_34%),radial-gradient(circle_at_85%_15%,oklch(0.55_0.1_220_/_0.1),transparent_30%)]" aria-hidden="true" />
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <nav className="mb-10 flex flex-wrap items-center gap-1.5 text-sm text-muted-foreground" aria-label="Breadcrumb">
            <Link href="/research" className="group inline-flex items-center gap-1.5 transition-colors hover:text-foreground">
              <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-0.5" />
              Research
            </Link>
            <ChevronRight className="h-3.5 w-3.5 text-muted-foreground/40" />
            <Link href={`/research/${topic.id}/blogs`} className="transition-colors hover:text-foreground">{topic.title}</Link>
            <ChevronRight className="h-3.5 w-3.5 text-muted-foreground/40" />
            <span className="font-medium text-foreground/80">Technical Blog</span>
          </nav>

          <div className="grid items-end gap-10 pb-12 lg:grid-cols-[1.05fr_.95fr] lg:pb-16">
            <div>
              <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-primary/15 bg-primary/[0.06] px-3 py-1.5 text-xs font-semibold uppercase tracking-[0.12em] text-primary/80">
                <BookOpenText className="h-3.5 w-3.5" />
                Technical blog
              </div>
              <h1 className="max-w-4xl text-3xl font-bold tracking-tight text-foreground md:text-5xl md:leading-[1.08]">
                {blog.title}
              </h1>
              <p className="mt-5 max-w-2xl text-base leading-relaxed text-muted-foreground md:text-lg">
                {blog.summary}
              </p>
              <div className="mt-7 flex flex-wrap items-center gap-x-5 gap-y-2 text-xs text-muted-foreground">
                <span className="inline-flex items-center gap-1.5"><CalendarDays className="h-3.5 w-3.5 text-primary/65" />{blog.date}</span>
                <span className="inline-flex items-center gap-1.5"><Clock3 className="h-3.5 w-3.5 text-primary/65" />{blog.readTime}</span>
                <span className="font-medium text-foreground/75">{blog.author}</span>
              </div>
              <div className="mt-6 flex flex-wrap gap-2">
                {blog.tags.map((tag) => <span key={tag} className="rounded-full border border-border/70 bg-card/70 px-2.5 py-1 text-[11px] text-muted-foreground">{tag}</span>)}
              </div>
            </div>
            <div className="relative overflow-hidden rounded-2xl border border-border/60 bg-card/70 shadow-xl shadow-primary/5">
              <div className="relative aspect-[4/3]">
                <Image src={blog.heroImage} alt={blog.title} fill priority className="object-contain p-5 md:p-8" />
              </div>
              <div className="border-t border-border/50 px-5 py-3 text-xs text-muted-foreground">
                A lab note on quantum-inspired RF sensing and spatial signal processing
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-12 md:py-20">
        <div className="mx-auto grid max-w-7xl gap-10 px-4 sm:px-6 lg:grid-cols-[minmax(0,1fr)_240px] lg:px-8">
          <article className="min-w-0 max-w-3xl space-y-12">
            {blog.sections.map((section) => <BlogSection key={section.id} section={section} />)}

            <section className="border-t border-border/60 pt-10">
              <div className="mb-5 flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.14em] text-primary/75">
                <span className="h-px w-8 bg-primary/50" />
                Paper information
              </div>
              <dl className="divide-y divide-border/50 rounded-2xl border border-border/60 bg-card/70">
                {blog.paperInfo.map((item) => (
                  <div key={item.label} className="grid gap-1 px-5 py-4 sm:grid-cols-[110px_1fr] sm:gap-5">
                    <dt className="text-xs font-semibold uppercase tracking-[0.08em] text-muted-foreground/70">{item.label}</dt>
                    <dd className="text-sm leading-relaxed text-foreground/80">{item.value}</dd>
                  </div>
                ))}
              </dl>
              {blog.sourceUrl && (
                <a href={blog.sourceUrl} target="_blank" rel="noopener noreferrer" className="academic-link mt-5 inline-flex items-center gap-1.5 text-sm">
                  View the original Chinese technical note
                  <ExternalLink className="h-3.5 w-3.5" />
                </a>
              )}
            </section>
          </article>

          <aside className="hidden lg:block">
            <div className="sticky top-28 rounded-2xl border border-border/60 bg-card/70 p-5 shadow-sm">
              <p className="text-xs font-semibold uppercase tracking-[0.12em] text-muted-foreground/70">In this note</p>
              <nav className="mt-4 space-y-1.5">
                {blog.sections.map((section) => (
                  <a key={section.id} href={`#${section.id}`} className="flex items-center gap-2 rounded-lg px-2.5 py-2 text-xs text-muted-foreground transition-colors hover:bg-primary/[0.06] hover:text-primary">
                    <span className="tabular-nums text-primary/55">{section.number}</span>
                    <span>{section.heading}</span>
                  </a>
                ))}
              </nav>
              <Link href={`/research/${topic.id}/blogs`} className="mt-5 inline-flex items-center gap-1.5 border-t border-border/50 pt-4 text-xs font-medium text-primary transition-colors hover:text-primary/70">
                <ArrowLeft className="h-3.5 w-3.5" />
                All technical blogs
              </Link>
            </div>
          </aside>
        </div>
      </section>
    </main>
  )
}
