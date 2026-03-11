"use client";

import { DEFAULT_IDEA_FORM_VALUES } from "@/lib/constants/idea";
import { IdeaForm } from "@/components/ideas/idea-form";
import { useIdeas } from "@/hooks/use-ideas";

export function IdeaCreateClient() {
  const { createIdea } = useIdeas();

  return (
    <div className="grid gap-6">
      <header className="space-y-2">
        <p className="text-sm font-semibold uppercase tracking-[0.2em] text-amber-700">
          New Idea
        </p>
        <h1 className="text-3xl font-semibold tracking-tight text-zinc-950">
          새 아이디어 기록하기
        </h1>
        <p className="max-w-2xl text-sm leading-7 text-zinc-600">
          완벽하게 정리되지 않아도 괜찮습니다. 지금 떠오른 생각을 빠르게 적고 간단한 점수만 남겨두세요.
        </p>
      </header>

      <IdeaForm
        mode="create"
        initialValues={DEFAULT_IDEA_FORM_VALUES}
        onSubmit={createIdea}
      />
    </div>
  );
}

