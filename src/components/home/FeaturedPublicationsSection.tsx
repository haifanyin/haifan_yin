import { ExternalLink } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { journalPapers } from '@/lib/data'
import SectionWrapper from '@/components/layout/SectionWrapper'
import SectionTitle from '@/components/layout/SectionTitle'
import type { Publication } from '@/types'

const featuredPublications = [...journalPapers]
  .sort((a, b) => b.year - a.year)
  .slice(0, 3)

function getVenue(publication: Publication) {
  return publication.journal || publication.booktitle || 'Publication'
}

export default function FeaturedPublicationsSection() {
  return (
    <SectionWrapper id="featured-publications" className="bg-background !pt-6 md:!pt-8 !pb-10 md:!pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionTitle className="!mb-8 md:!mb-10" accent="violet" subtitle="A selection of our latest journal work in wireless communications and signal processing">
          Featured Publications
        </SectionTitle>

        <div className="grid gap-4 lg:grid-cols-3">
          {featuredPublications.map((publication) => (
            <article
              key={`${publication.year}-${publication.title}`}
              className="group flex h-full flex-col rounded-2xl border border-border/60 bg-card p-5 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-primary/30 hover:shadow-lg"
            >
              <div className="flex items-center justify-between gap-3">
                <Badge variant="secondary" className="rounded-md px-2 py-0.5 text-[11px] font-semibold tabular-nums">
                  {publication.year}
                </Badge>
                <span className="text-right text-[11px] leading-snug text-muted-foreground">
                  {getVenue(publication)}
                </span>
              </div>

              <h3 className="mt-4 text-base font-semibold leading-snug text-foreground transition-colors group-hover:text-primary">
                {publication.title}
              </h3>
              <p className="mt-3 flex-1 text-xs leading-relaxed text-muted-foreground">
                {publication.authors.join(', ')}
              </p>

              {publication.link && (
                <a
                  href={publication.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="academic-link mt-5 inline-flex w-fit items-center gap-1.5 text-xs font-medium"
                >
                  <ExternalLink className="h-3.5 w-3.5" />
                  Link
                </a>
              )}
            </article>
          ))}
        </div>

      </div>
    </SectionWrapper>
  )
}
