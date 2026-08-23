import Image from 'next/image'
import Link from 'next/link'
import { ArrowLeft, ArrowRight, BookOpenText, CalendarDays, ChevronRight, Clock3, Sparkles } from 'lucide-react'
import PageHero from '@/components/layout/PageHero'
import type { ResearchBlog } from '@/types/research-blog'
import type { ResearchTopic } from '@/types'

export default function ResearchBlogList({ topic, blogs }: { topic: ResearchTopic; blogs: ResearchBlog[] }) {
  return (
    <main>
      <PageHero page="research" />
      <section className="relative overflow-hidden py-10 md:py-16">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_15%_20%,oklch(0.45_0.12_260_/_0.06),transparent_32%),radial-gradient(circle_at_85%_10%,oklch(0.55_0.1_220_/_0.08),transparent_30%)]" aria-hidden="true" />
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <nav className="mb-8 flex items-center gap-1.5 text-sm text-muted-foreground" aria-label="Breadcrumb">
            <Link href="/research" className="group inline-flex items-center gap-1.5 transition-colors hover:text-foreground">
              <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-0.5" />
              Research
            </Link>
            <ChevronRight className="h-3.5 w-3.5 text-muted-foreground/40" />
            <span className="font-medium text-foreground/80">{topic.title}</span>
            <ChevronRight className="h-3.5 w-3.5 text-muted-foreground/40" />
            <span>Technical Blogs</span>
          </nav>

          <div className="max-w-3xl">
            <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-primary/15 bg-primary/[0.06] px-3 py-1.5 text-xs font-semibold uppercase tracking-[0.12em] text-primary/80">
              <BookOpenText className="h-3.5 w-3.5" />
              Technical notes
            </div>
            <h1 className="text-3xl font-bold tracking-tight text-foreground md:text-5xl">
              {topic.title}
              <span className="mt-2 block bg-gradient-to-r from-primary to-primary/50 bg-clip-text text-transparent">Technical Blogs</span>
            </h1>
            <p className="mt-5 max-w-2xl text-sm leading-relaxed text-muted-foreground md:text-base">
              Research explainers and engineering notes from the lab. Start with the imaging-based spectral estimation method for multi-target direction finding with a single Rydberg atomic receiver.
            </p>
          </div>

          <div className="mt-10 grid gap-5">
            {blogs.map((blog) => (
              <Link
                key={blog.slug}
                href={`/research/${blog.topicId}/blogs/${blog.slug}`}
                className="group overflow-hidden rounded-2xl border border-border/60 bg-card shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-primary/30 hover:shadow-xl"
              >
                <div className="grid md:grid-cols-[1fr_300px]">
                  <div className="flex flex-col p-6 md:p-8">
                    <div className="flex flex-wrap items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.12em] text-primary/75">
                      <span className="rounded-full bg-primary/10 px-2.5 py-1">Technical blog</span>
                      <span className="text-muted-foreground/40">/</span>
                      <span>{blog.readTime}</span>
                    </div>
                    <h2 className="mt-5 max-w-3xl text-2xl font-bold tracking-tight text-foreground transition-colors group-hover:text-primary md:text-3xl">
                      {blog.title}
                    </h2>
                    <p className="mt-4 max-w-2xl text-sm leading-relaxed text-muted-foreground md:text-base">
                      {blog.summary}
                    </p>
                    <div className="mt-7 flex flex-wrap items-center gap-x-5 gap-y-2 text-xs text-muted-foreground">
                      <span className="inline-flex items-center gap-1.5">
                        <CalendarDays className="h-3.5 w-3.5 text-primary/60" />
                        {blog.date}
                      </span>
                      <span className="inline-flex items-center gap-1.5">
                        <Clock3 className="h-3.5 w-3.5 text-primary/60" />
                        {blog.author}
                      </span>
                    </div>
                    <div className="mt-8 inline-flex w-fit items-center gap-2 text-sm font-semibold text-primary">
                      Read technical blog
                      <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                    </div>
                  </div>
                  <div className="relative min-h-[220px] overflow-hidden bg-muted/40 md:min-h-full">
                    <Image
                      src={blog.heroImage}
                      alt={blog.title}
                      fill
                      className="object-cover p-6 opacity-90 transition-transform duration-700 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-primary/20 via-transparent to-transparent" />
                    <div className="absolute bottom-5 left-5 inline-flex items-center gap-1.5 rounded-full border border-white/30 bg-primary/80 px-3 py-1.5 text-[11px] font-medium text-white shadow-lg backdrop-blur-sm">
                      <Sparkles className="h-3.5 w-3.5" />
                      Featured note
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </main>
  )
}
