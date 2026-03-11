import { Badge } from "@/components/ui/badge";
import { calculateScoreAverage, calculateScoreTotal } from "@/lib/utils/score";
import type { IdeaScores } from "@/types/idea";

interface IdeaScoreBadgeProps {
  scores: IdeaScores;
}

export function IdeaScoreBadge({ scores }: IdeaScoreBadgeProps) {
  const average = calculateScoreAverage(scores);
  const total = calculateScoreTotal(scores);

  return (
    <div className="flex items-center gap-2">
      <Badge tone="highlight">평균 {average.toFixed(1)}</Badge>
      <Badge>총점 {total}</Badge>
    </div>
  );
}

