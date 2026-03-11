"use client";

import Link from "next/link";
import { DEFAULT_IDEA_FILTERS } from "@/lib/constants/idea";
import { Button } from "@/components/ui/button";
import { IdeaFilterBar } from "@/components/ideas/idea-filter-bar";
import { IdeaList } from "@/components/ideas/idea-list";
import { useIdeas } from "@/hooks/use-ideas";

export function IdeasPageClient() {
  const { filteredIdeas, availableTags, filters, setFilters, isLoaded, resetIdeas } =
    useIdeas();

  return (
    <div className="grid gap-6">
      <section className="flex flex-col gap-4 rounded-[2rem] border border-zinc-200 bg-white p-6 shadow-sm lg:flex-row lg:items-end lg:justify-between">
        <div className="space-y-2">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-amber-700">
            Ideas
          </p>
          <h1 className="text-3xl font-semibold tracking-tight text-zinc-950">
            아이디어 목록
          </h1>
          <p className="max-w-2xl text-sm leading-7 text-zinc-600">
            저장된 아이디어를 검색하고, 태그로 좁혀 보고, 점수 기준으로 다시 정렬할 수 있습니다.
          </p>
        </div>
        <div className="flex flex-col gap-3 sm:flex-row">
          <Link href="/ideas/new">
            <Button>새 아이디어</Button>
          </Link>
          <Button variant="ghost" onClick={() => setFilters(DEFAULT_IDEA_FILTERS)}>
            필터 초기화
          </Button>
          <Button variant="ghost" onClick={resetIdeas}>
            전체 비우기
          </Button>
        </div>
      </section>

      <IdeaFilterBar
        filters={filters}
        availableTags={availableTags}
        onChange={setFilters}
      />

      {!isLoaded ? (
        <div className="rounded-[2rem] border border-zinc-200 bg-white p-8 text-sm text-zinc-500 shadow-sm">
          아이디어를 불러오는 중입니다.
        </div>
      ) : (
        <IdeaList ideas={filteredIdeas} />
      )}
    </div>
  );
}

