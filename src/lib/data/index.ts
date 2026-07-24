// Re-export all types for backward compatibility
export type { Publication, ResearchTopic, Student, Teacher } from "@/types";

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
