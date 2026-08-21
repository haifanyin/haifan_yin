import type { Publication } from '@/types'
import { journalPapers, conferencePapers } from './publications'

// ==================== Citation Formatting ====================
export function formatAuthorList(authors: string[]): string {
  if (authors.length <= 1) return authors[0] || ''
  if (authors.length === 2) return `${authors[0]} and ${authors[1]}`
  return `${authors.slice(0, -1).join(', ')}, and ${authors[authors.length - 1]}`
}

export function formatPageRange(pages: string): string {
  return pages.replace(/(\d)\s*-\s*(\d)/g, '$1–$2')
}

// ==================== STUDENT PAPERS MATCHING ====================
/** Get all publications where the student is the first author, or the second author when the first is the advisor */
export function getStudentFirstAuthorPapers(studentName: string): { citation: string; link?: string }[] {
  const allPubs = [...journalPapers, ...conferencePapers];
  return allPubs
    .filter(p => {
      const first = p.authors[0];
      if (first === 'Haifan Yin') {
        return (p.authors[1] || '') === studentName.trim();
      }
      return first === studentName.trim();
    })
    .sort((a, b) => b.year - a.year)
    .map(p => ({
      citation: p.journal
        ? `${formatAuthorList(p.authors)}, "${p.title}," ${p.journal}, vol. ${p.volume}${p.number ? `, no. ${p.number}` : ''}, pp. ${formatPageRange(p.pages)}, ${p.year}.`
        : `${formatAuthorList(p.authors)}, "${p.title}," in Proceedings of ${p.booktitle}, ${p.year}, pp. ${formatPageRange(p.pages)}.`,
      link: p.link,
    }));
}

export function getPublicationsByTopic(topicId: string): Publication[] {
  const allPubs = [...journalPapers, ...conferencePapers];
  return allPubs
    .filter(p => p.topicIds?.includes(topicId))
    .sort((a, b) => b.year - a.year);
}

export function formatPublicationCitation(pub: Publication): string {
  if (pub.journal) {
    return `${formatAuthorList(pub.authors)}, "${pub.title}," ${pub.journal}, vol. ${pub.volume}${pub.number ? `, no. ${pub.number}` : ''}, pp. ${formatPageRange(pub.pages)}, ${pub.year}.`;
  }
  return `${formatAuthorList(pub.authors)}, "${pub.title}," in Proceedings of ${pub.booktitle}, ${pub.year}, pp. ${formatPageRange(pub.pages)}.`;
}
