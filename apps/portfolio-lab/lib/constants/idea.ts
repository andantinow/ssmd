import type { IdeaFilters, IdeaFormValues, IdeaScores } from "@/types/idea";

export const IDEA_STORAGE_KEY = "idea-lab:ideas:v1";

export const DEFAULT_IDEA_SCORES: IdeaScores = {
  interest: 3,
  feasibility: 3,
  impact: 3,
};

export const DEFAULT_IDEA_FORM_VALUES: IdeaFormValues = {
  title: "",
  summary: "",
  description: "",
  tags: [],
  scores: DEFAULT_IDEA_SCORES,
};

export const DEFAULT_IDEA_FILTERS: IdeaFilters = {
  query: "",
  tag: null,
  sortBy: "newest",
  showArchived: false,
};

export const SCORE_OPTIONS = [1, 2, 3, 4, 5];

