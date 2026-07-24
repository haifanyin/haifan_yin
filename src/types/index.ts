export type PageName = 'home' | 'publications' | 'research' | 'team' | 'gallery'

export interface Publication {
  authors: string[];
  title: string;
  journal?: string;
  booktitle?: string;
  volume?: string;
  number?: string;
  pages: string;
  year: number;
  highlight?: string;
  abstract?: string;
  link?: string;
  topicIds?: string[];
}

export interface ResearchTopic {
  id: string;
  title: string;
  subtitle?: string;
  description: string;
  image: string;
  papers?: { citation: string; link?: string }[];
  blogPosts?: { title: string; link: string }[];
  topCollaborator?: { name: string; initials: string; paperCount: number };
  relatedTopics?: string[];
  parentId?: string;
}

export interface Student {
  name: string;
  nameCn: string;
  email: string;
  avatar: string;
  degree: "phd" | "master";
  awards?: string[];
  researchTopics: string[];
  papers?: { citation: string; link?: string }[];
  coSupervised?: string;
  graduated?: boolean;
  destination?: string;
  enrollDate?: string;
  profileUrl?: string;
  gradDate?: string;
}

export interface Teacher {
  name: string;
  nameCn: string;
  avatar: string;
  title: string;
  subtitle?: string;
  department?: string;
  education?: string;
  email?: string;
  profileUrl?: string;
  researchAreas?: string[];
  awards?: string[];
}
