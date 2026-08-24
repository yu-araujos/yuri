export interface TechCategory {
  title: string;
  skills: string[];
}

export interface DecisionEntry {
  hash: string;
  title: string;
  period: string;
  bullets: string[];
}

export interface Project {
  id: string;
  name: string;
  tagline: string;
  tags: string[];
  github: string | null;
  live: string | null;
  context: string[];
  techCategories: TechCategory[];
  decisions: DecisionEntry[];
  results: string[];
  learnings: string[];
}
