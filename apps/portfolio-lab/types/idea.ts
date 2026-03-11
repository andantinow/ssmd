export type IdeaScoreCategory = "interest" | "feasibility" | "impact";

export interface IdeaScores {
  interest: number;
  feasibility: number;
  impact: number;
}

export interface Idea {
  id: string;
  title: string;
  summary: string;
  description: string;
  tags: string[];
  scores: IdeaScores;
  createdAt: string;
  updatedAt: string;
  archived: boolean;
}

export interface IdeaFormValues {
  title: string;
  summary: string;
  description: string;
  tags: string[];
  scores: IdeaScores;
}

export interface IdeaFilters {
  query: string;
  tag: string | null;
  sortBy: "newest" | "oldest" | "score";
  showArchived: boolean;
}

export interface IdeaStorageData {
  version: 1;
  ideas: Idea[];
}

