import type { Idea, IdeaScores } from "@/types/idea";

export function calculateScoreAverage(scores: IdeaScores) {
  return (scores.interest + scores.feasibility + scores.impact) / 3;
}

export function calculateScoreTotal(scores: IdeaScores) {
  return scores.interest + scores.feasibility + scores.impact;
}

export function compareIdeasByScore(a: Idea, b: Idea) {
  return calculateScoreTotal(b.scores) - calculateScoreTotal(a.scores);
}

