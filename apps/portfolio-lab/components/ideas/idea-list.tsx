import { IdeaCard } from "@/components/ideas/idea-card";
import { EmptyState } from "@/components/ui/empty-state";
import type { Idea } from "@/types/idea";

interface IdeaListProps {
  ideas: Idea[];
}

export function IdeaList({ ideas }: IdeaListProps) {
  if (ideas.length === 0) {
    return (
      <EmptyState
        title="아직 조건에 맞는 아이디어가 없어요"
        description="첫 아이디어를 추가하거나 검색 조건을 조금 넓혀보세요."
        actionHref="/ideas/new"
        actionLabel="아이디어 만들기"
      />
    );
  }

  return (
    <div className="grid gap-4">
      {ideas.map((idea) => (
        <IdeaCard key={idea.id} idea={idea} />
      ))}
    </div>
  );
}

