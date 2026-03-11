"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { IdeaScoreBadge } from "@/components/ideas/idea-score-badge";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { EmptyState } from "@/components/ui/empty-state";
import { formatDate } from "@/lib/utils/date";
import type { Idea } from "@/types/idea";

interface IdeaDetailProps {
  idea: Idea | null;
  onDelete: (ideaId: string) => void;
  onToggleArchived: (ideaId: string) => void;
}

export function IdeaDetail({
  idea,
  onDelete,
  onToggleArchived,
}: IdeaDetailProps) {
  const router = useRouter();

  if (!idea) {
    return (
      <EmptyState
        title="아이디어를 찾지 못했어요"
        description="삭제되었거나 잘못된 주소일 수 있습니다."
        actionHref="/ideas"
        actionLabel="목록으로 돌아가기"
      />
    );
  }

  function handleDelete() {
    onDelete(idea.id);
    router.push("/ideas");
  }

  return (
    <section className="grid gap-6">
      <article className="rounded-[2rem] border border-zinc-200 bg-white p-8 shadow-sm">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
          <div className="space-y-4">
            <div className="flex flex-wrap gap-2">
              <Badge>{formatDate(idea.createdAt)}</Badge>
              {idea.archived ? <Badge tone="muted">보관됨</Badge> : null}
            </div>
            <div>
              <h1 className="text-3xl font-semibold tracking-tight text-zinc-950">
                {idea.title}
              </h1>
              <p className="mt-3 max-w-2xl text-lg leading-8 text-zinc-600">
                {idea.summary}
              </p>
            </div>
            <IdeaScoreBadge scores={idea.scores} />
          </div>

          <div className="flex flex-col gap-3 sm:flex-row lg:flex-col">
            <Link href={`/ideas/${idea.id}/edit`}>
              <Button variant="secondary" fullWidth>
                수정하기
              </Button>
            </Link>
            <Button
              variant="ghost"
              fullWidth
              onClick={() => onToggleArchived(idea.id)}
            >
              {idea.archived ? "보관 해제" : "보관하기"}
            </Button>
            <Button variant="danger" fullWidth onClick={handleDelete}>
              삭제하기
            </Button>
          </div>
        </div>

        <div className="mt-8 grid gap-6 lg:grid-cols-[2fr_1fr]">
          <div className="rounded-[1.5rem] bg-zinc-50 p-6">
            <p className="text-sm font-semibold text-zinc-900">상세 설명</p>
            <p className="mt-3 whitespace-pre-wrap text-sm leading-7 text-zinc-700">
              {idea.description}
            </p>
          </div>

          <div className="space-y-4">
            <div className="rounded-[1.5rem] bg-amber-50 p-5">
              <p className="text-sm font-semibold text-zinc-900">평가 점수</p>
              <div className="mt-3 grid gap-2 text-sm text-zinc-700">
                <p>흥미도: {idea.scores.interest}점</p>
                <p>실현 가능성: {idea.scores.feasibility}점</p>
                <p>확장성: {idea.scores.impact}점</p>
              </div>
            </div>

            <div className="rounded-[1.5rem] bg-zinc-50 p-5">
              <p className="text-sm font-semibold text-zinc-900">태그</p>
              <div className="mt-3 flex flex-wrap gap-2">
                {idea.tags.length > 0 ? (
                  idea.tags.map((tag) => <Badge key={tag}>#{tag}</Badge>)
                ) : (
                  <p className="text-sm text-zinc-500">아직 태그가 없습니다.</p>
                )}
              </div>
            </div>

            <div className="rounded-[1.5rem] bg-zinc-50 p-5">
              <p className="text-sm font-semibold text-zinc-900">수정 정보</p>
              <p className="mt-3 text-sm text-zinc-600">
                마지막 수정: {formatDate(idea.updatedAt)}
              </p>
            </div>
          </div>
        </div>
      </article>
    </section>
  );
}

