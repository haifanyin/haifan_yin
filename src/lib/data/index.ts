// Professor
export { professorInfo } from "./professor";

// Publications
export { journalPapers, conferencePapers, patents, patentBreakdown } from "./publications";
export { citationStats } from "./citation-stats";

// Research topics
export { researchTopics } from "./research-topics";

// Team
export { teachers, phdStudents, masterStudents, graduatedPhdStudents, graduatedMasterStudents } from "./team";

// Gallery
export { galleryPhotos } from "./gallery";

// Helpers
export { getStudentFirstAuthorPapers, getPublicationsByTopic, formatPublicationCitation } from "./helpers";

// Publication utilities
export { generateBibTeX } from "./bibtex";
export { getYearDistribution } from "./pub-stats";
export { getHighlightBadge } from "./highlight-badge";
export { getVenueBadge } from "./venue-badge";
