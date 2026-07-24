// Professor
export { professorInfo } from "./professor";

// Publications
export { journalPapers, conferencePapers, patents, patentBreakdown, citationStats } from "./publications";

// Research topics
export { researchTopics } from "./research-topics";

// Team
export { teachers, phdStudents, masterStudents, graduatedPhdStudents, graduatedMasterStudents } from "./team";

// Helpers
export { getStudentFirstAuthorPapers, getPublicationsByTopic, formatPublicationCitation } from "./helpers";

// Publication utilities
export { generateBibTeX } from "./bibtex";
export { getYearDistribution } from "./pub-stats";
export { getHighlightBadge } from "./highlight-badge";
export { getVenueBadge } from "./venue-badge";
