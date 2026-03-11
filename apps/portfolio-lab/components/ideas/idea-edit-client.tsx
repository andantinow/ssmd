"use client";

import { useParams } from "next/navigation";
import { IdeaForm } from "@/components/ideas/idea-form";
import { EmptyState } from "@/components/ui/empty-state";
import { useIdeas } from "@/hooks/use-ideas";

export function IdeaEditClient() {
  const params = useParams<{ ideaId: string }>();
  const { getIdeaById, updateIdea, isLoaded } = useIdeas();
  const ideaId = typeof params.ideaId === "string" ? params.ideaId : "";
  const idea = getIdeaById(ideaId);

  if (!isLoaded) {
    return (
      <div className="rounded-[2rem] border border-zinc-200 bg-white p-8 text-sm text-zinc-500 shadow-sm">
        아이디어를 불러오는 중입니다.
      </div>
    );
  }

  if (!idea) {
    return (
      <EmptyState
        title="수정할 아이디어가 없어요"
        description="이미 삭제되었거나 잘못된 주소일 수 있습니다."
        actionHref="/ideas"
        actionLabel="목록으로 돌아가기"
      />
    );
  }

  return (
    <div className="grid gap-6">
      <header className="space-y-2">
        <p className="text-sm font-semibold uppercase tracking-[0.2em] text-amber-700">
          Edit Idea
        </p>
        <h1 className="text-3xl font-semibold tracking-tight text-zinc-950">
          아이디어 수정하기
        </h1>
        <p className="max-w-2xl text-sm leading-7 text-zinc-600">
          기존 메모를 다듬거나 점수를 다시 조정해서 아이디어를 더 선명하게 정리해보세요.
        </p>
      </header>

      <IdeaForm
        mode="edit"
        initialValues={{
          title: idea.title,
          summary: idea.summary,
          description: idea.description,
          tags: idea.tags,
          scores: idea.scores,
        }}
        onSubmit={(values) => updateIdea(ideaId, values)}
      />
    </div>
  );
}

