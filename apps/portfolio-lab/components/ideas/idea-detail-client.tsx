"use client";

import { useParams } from "next/navigation";
import { IdeaDetail } from "@/components/ideas/idea-detail";
import { useIdeas } from "@/hooks/use-ideas";

export function IdeaDetailClient() {
  const params = useParams<{ ideaId: string }>();
  const { getIdeaById, deleteIdea, toggleArchived, isLoaded } = useIdeas();
  const ideaId = typeof params.ideaId === "string" ? params.ideaId : "";
  const idea = getIdeaById(ideaId);

  if (!isLoaded) {
    return (
      <div className="rounded-[2rem] border border-zinc-200 bg-white p-8 text-sm text-zinc-500 shadow-sm">
        아이디어를 불러오는 중입니다.
      </div>
    );
  }

  return (
    <IdeaDetail
      idea={idea}
      onDelete={deleteIdea}
      onToggleArchived={toggleArchived}
    />
  );
}

