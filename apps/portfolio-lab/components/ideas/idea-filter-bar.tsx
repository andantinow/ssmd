"use client";

import type { ChangeEvent } from "react";
import { Input } from "@/components/ui/input";
import type { IdeaFilters } from "@/types/idea";

interface IdeaFilterBarProps {
  filters: IdeaFilters;
  availableTags: string[];
  onChange: (nextFilters: IdeaFilters) => void;
}

export function IdeaFilterBar({
  filters,
  availableTags,
  onChange,
}: IdeaFilterBarProps) {
  function handleQueryChange(event: ChangeEvent<HTMLInputElement>) {
    onChange({
      ...filters,
      query: event.target.value,
    });
  }

  function handleTagChange(event: ChangeEvent<HTMLSelectElement>) {
    onChange({
      ...filters,
      tag: event.target.value || null,
    });
  }

  function handleSortChange(event: ChangeEvent<HTMLSelectElement>) {
    onChange({
      ...filters,
      sortBy: event.target.value as IdeaFilters["sortBy"],
    });
  }

  function handleArchivedChange(event: ChangeEvent<HTMLInputElement>) {
    onChange({
      ...filters,
      showArchived: event.target.checked,
    });
  }

  return (
    <section className="rounded-[2rem] border border-zinc-200 bg-white p-5 shadow-sm">
      <div className="grid gap-4 lg:grid-cols-[2fr_1fr_1fr_auto] lg:items-end">
        <Input
          label="검색"
          placeholder="제목, 설명, 태그로 검색"
          value={filters.query}
          onChange={handleQueryChange}
        />

        <label className="flex flex-col gap-2">
          <span className="text-sm font-medium text-zinc-800">태그</span>
          <select
            className="h-11 rounded-2xl border border-zinc-200 bg-white px-4 text-sm text-zinc-900 outline-none focus:border-amber-400"
            value={filters.tag ?? ""}
            onChange={handleTagChange}
          >
            <option value="">전체 태그</option>
            {availableTags.map((tag) => (
              <option key={tag} value={tag}>
                {tag}
              </option>
            ))}
          </select>
        </label>

        <label className="flex flex-col gap-2">
          <span className="text-sm font-medium text-zinc-800">정렬</span>
          <select
            className="h-11 rounded-2xl border border-zinc-200 bg-white px-4 text-sm text-zinc-900 outline-none focus:border-amber-400"
            value={filters.sortBy}
            onChange={handleSortChange}
          >
            <option value="newest">최신순</option>
            <option value="oldest">오래된순</option>
            <option value="score">점수순</option>
          </select>
        </label>

        <label className="flex h-11 items-center gap-3 rounded-2xl border border-zinc-200 px-4 text-sm font-medium text-zinc-700">
          <input
            type="checkbox"
            checked={filters.showArchived}
            onChange={handleArchivedChange}
          />
          보관 항목 보기
        </label>
      </div>
    </section>
  );
}

