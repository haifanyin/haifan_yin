import type { Publication } from '@/types'

// ============ BibTeX Generator ============
export function generateBibTeX(pub: Publication): string {
  // Generate ID in format: firstAuthorLastName + year + firstTitleWord (e.g., "han2026power")
  const firstAuthor = pub.authors[0].split(' ').pop()?.toLowerCase() || 'unknown'
  const yearStr = pub.year.toString()
  const firstTitleWord = pub.title.split(' ').find(w => w.length > 2)?.toLowerCase().replace(/[^a-z]/g, '') || 'paper'
  const id = `${firstAuthor}${yearStr}${firstTitleWord}`

  const isConference = !!pub.booktitle
  const entryType = isConference ? '@inproceedings' : '@article'
  const entryKey = isConference ? 'booktitle' : 'journal'
  const venueName = pub.journal || pub.booktitle || ''

  const lines = [
    `${entryType}{${id},`,
    `  author = {${pub.authors.join(', ')}},`,
    `  title = {${pub.title}},`,
    `  ${entryKey} = {${venueName}},`,
  ]
  if (!isConference && pub.volume) lines.push(`  volume = {${pub.volume}},`)
  if (!isConference && pub.number) lines.push(`  number = {${pub.number}},`)
  if (pub.pages) lines.push(`  pages = {${pub.pages}},`)
  lines.push(`  year = {${yearStr}}`)
  if (pub.link) lines.push(`  url = {${pub.link}}`)
  lines.push('}')
  return lines.join('\n')
}
