import type { Publication } from "@/types";
import { journalPapers, conferencePapers } from "./publications";

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
        ? `${p.authors.join(', ')}, "${p.title}," ${p.journal}, vol. ${p.volume}${p.number ? `, no. ${p.number}` : ''}, pp. ${p.pages}, ${p.year}.`
        : `${p.authors.join(', ')}, "${p.title}," ${p.booktitle}, pp. ${p.pages}, ${p.year}.`,
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
    return `${pub.authors.join(', ')}, "${pub.title}," ${pub.journal}, vol. ${pub.volume}${pub.number ? `, no. ${pub.number}` : ''}, pp. ${pub.pages}, ${pub.year}.`;
  }
  return `${pub.authors.join(', ')}, "${pub.title}," ${pub.booktitle}, pp. ${pub.pages}, ${pub.year}.`;
}
