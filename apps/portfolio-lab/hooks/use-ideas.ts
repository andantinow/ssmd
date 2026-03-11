"use client";

import { useCallback, useDeferredValue, useMemo, useState } from "react";
import {
  DEFAULT_IDEA_FILTERS,
  IDEA_STORAGE_KEY,
} from "@/lib/constants/idea";
import { createIdeaId } from "@/lib/utils/id";
import { compareIdeasByScore } from "@/lib/utils/score";
import { useLocalStorage } from "@/hooks/use-local-storage";
import type { Idea, IdeaFilters, IdeaFormValues, IdeaStorageData } from "@/types/idea";

function parseIdeas(rawValue: string | null): Idea[] {
  if (!rawValue) {
    return [];
  }

  try {
    const parsed = JSON.parse(rawValue) as IdeaStorageData;

    if (parsed.version !== 1 || !Array.isArray(parsed.ideas)) {
      return [];
    }

    return parsed.ideas;
  } catch {
    return [];
  }
}

function serializeIdeas(ideas: Idea[]) {
  const payload: IdeaStorageData = {
    version: 1,
    ideas,
  };

  return JSON.stringify(payload);
}

export function useIdeas() {
  const [filters, setFilters] = useState<IdeaFilters>(DEFAULT_IDEA_FILTERS);
  const deferredQuery = useDeferredValue(filters.query);
  const parseValue = useCallback((rawValue: string | null) => parseIdeas(rawValue), []);
  const serializeValue = useCallback((ideas: Idea[]) => serializeIdeas(ideas), []);
  const {
    value: ideas,
    setValue: setIdeas,
    clearValue,
    isLoaded,
  } = useLocalStorage<Idea[]>(IDEA_STORAGE_KEY, parseValue, serializeValue, []);

  function createIdea(values: IdeaFormValues) {
    const now = new Date().toISOString();

    const nextIdea: Idea = {
      id: createIdeaId(),
      title: values.title.trim(),
      summary: values.summary.trim(),
      description: values.description.trim(),
      tags: values.tags.map((tag) => tag.trim()).filter(Boolean),
      scores: values.scores,
      createdAt: now,
      updatedAt: now,
      archived: false,
    };

    setIdeas((currentIdeas) => [nextIdea, ...currentIdeas]);
    return nextIdea;
  }

  function updateIdea(ideaId: string, values: IdeaFormValues) {
    let updatedIdea: Idea | null = null;

    setIdeas((currentIdeas) =>
      currentIdeas.map((idea) => {
        if (idea.id !== ideaId) {
          return idea;
        }

        updatedIdea = {
          ...idea,
          title: values.title.trim(),
          summary: values.summary.trim(),
          description: values.description.trim(),
          tags: values.tags.map((tag) => tag.trim()).filter(Boolean),
          scores: values.scores,
          updatedAt: new Date().toISOString(),
        };

        return updatedIdea;
      }),
    );

    return updatedIdea;
  }

  function deleteIdea(ideaId: string) {
    setIdeas((currentIdeas) => currentIdeas.filter((idea) => idea.id !== ideaId));
  }

  function toggleArchived(ideaId: string) {
    setIdeas((currentIdeas) =>
      currentIdeas.map((idea) =>
        idea.id === ideaId
          ? {
              ...idea,
              archived: !idea.archived,
              updatedAt: new Date().toISOString(),
            }
          : idea,
      ),
    );
  }

  function resetIdeas() {
    clearValue();
  }

  function getIdeaById(ideaId: string) {
    return ideas.find((idea) => idea.id === ideaId) ?? null;
  }

  const normalizedQuery = deferredQuery.trim().toLowerCase();

  const filteredIdeas = useMemo(
    () =>
      ideas
        .filter((idea) => {
          if (!filters.showArchived && idea.archived) {
            return false;
          }

          if (filters.tag && !idea.tags.includes(filters.tag)) {
            return false;
          }

          if (!normalizedQuery) {
            return true;
          }

          const haystack = [
            idea.title,
            idea.summary,
            idea.description,
            idea.tags.join(" "),
          ]
            .join(" ")
            .toLowerCase();

          return haystack.includes(normalizedQuery);
        })
        .sort((a, b) => {
          if (filters.sortBy === "oldest") {
            return a.createdAt.localeCompare(b.createdAt);
          }

          if (filters.sortBy === "score") {
            return compareIdeasByScore(a, b);
          }

          return b.createdAt.localeCompare(a.createdAt);
        }),
    [filters.showArchived, filters.sortBy, filters.tag, ideas, normalizedQuery],
  );

  const availableTags = useMemo(
    () => Array.from(new Set(ideas.flatMap((idea) => idea.tags))).sort(),
    [ideas],
  );

  return {
    ideas,
    filteredIdeas,
    availableTags,
    filters,
    setFilters,
    isLoaded,
    createIdea,
    updateIdea,
    deleteIdea,
    toggleArchived,
    resetIdeas,
    getIdeaById,
  };
}
