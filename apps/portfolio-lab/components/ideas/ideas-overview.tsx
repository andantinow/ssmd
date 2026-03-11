"use client";

import Link from "next/link";
import { useIdeas } from "@/hooks/use-ideas";
import { Button } from "@/components/ui/button";
import { EmptyState } from "@/components/ui/empty-state";
import { IdeaCard } from "@/components/ideas/idea-card";

export function IdeasOverview() {
  const { ideas, isLoaded } = useIdeas();
  const recentIdeas = ideas.slice(0, 3);

  return (
    <div className="grid gap-8">
      <section className="grid gap-6 rounded-[2.5rem] border border-amber-200 bg-[radial-gradient(circle_at_top_left,_rgba(251,191,36,0.28),_transparent_35%),linear-gradient(135deg,#fffdf4_0%,#fff7e8_45%,#f3efe6_100%)] p-8 shadow-sm lg:grid-cols-[1.4fr_0.8fr] lg:items-end">
        <div className="space-y-5">
          <span className="inline-flex rounded-full bg-zinc-950 px-3 py-1 text-xs font-semibold uppercase tracking-[0.24em] text-white">
            Idea Lab
          </span>
          <div className="space-y-3">
            <h1 className="max-w-2xl text-4xl font-semibold tracking-tight text-zinc-950 sm:text-5xl">
              떠오른 생각을 흘려보내지 않는 개인 아이디어 정리실
            </h1>
            <p className="max-w-2xl text-base leading-8 text-zinc-700 sm:text-lg">
              아이디어를 기록하고, 빠르게 점수를 매기고, 다시 꺼내보기 쉬운 형태로 정리해보세요. 지금은 로컬에 저장되기 때문에 부담 없이 실험하기 좋습니다.
            </p>
          </div>
          <div className="flex flex-col gap-3 sm:flex-row">
            <Link href="/ideas/new">
              <Button>새 아이디어 만들기</Button>
            </Link>
            <Link href="/ideas">
              <Button variant="ghost">목록 바로 보기</Button>
            </Link>
          </div>
        </div>

        <div className="grid gap-4 rounded-[2rem] bg-white/80 p-6 backdrop-blur">
          <div>
            <p className="text-sm font-medium text-zinc-500">현재 저장된 아이디어</p>
            <p className="mt-2 text-5xl font-semibold tracking-tight text-zinc-950">
              {isLoaded ? ideas.length : "-"}
            </p>
          </div>
          <p className="text-sm leading-6 text-zinc-600">
            최근 추가한 아이디어부터 확인할 수 있고, 이후 목록 화면에서 검색과 정렬도 바로 사용할 수 있습니다.
          </p>
        </div>
      </section>

      <section className="grid gap-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-semibold tracking-tight text-zinc-950">
              최근 아이디어
            </h2>
            <p className="mt-1 text-sm text-zinc-600">
              방금 저장한 아이디어를 바로 다시 살펴볼 수 있어요.
            </p>
          </div>
          <Link href="/ideas" className="text-sm font-semibold text-amber-700">
            전체 보기
          </Link>
        </div>

        {!isLoaded ? (
          <div className="rounded-[2rem] border border-zinc-200 bg-white p-8 text-sm text-zinc-500 shadow-sm">
            데이터를 불러오는 중입니다.
          </div>
        ) : recentIdeas.length === 0 ? (
          <EmptyState
            title="첫 번째 아이디어를 남겨보세요"
            description="짧은 메모만 있어도 괜찮습니다. 저장한 뒤에는 검색과 정렬도 바로 사용할 수 있어요."
            actionHref="/ideas/new"
            actionLabel="지금 작성하기"
          />
        ) : (
          <div className="grid gap-4">
            {recentIdeas.map((idea) => (
              <IdeaCard key={idea.id} idea={idea} />
            ))}
          </div>
        )}
      </section>
    </div>
  );
}

