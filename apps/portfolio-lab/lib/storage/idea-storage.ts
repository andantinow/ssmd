import { IDEA_STORAGE_KEY } from "@/lib/constants/idea";
import type { Idea, IdeaStorageData } from "@/types/idea";

const EMPTY_STORAGE: IdeaStorageData = {
  version: 1,
  ideas: [],
};

export function loadIdeasFromStorage(): Idea[] {
  if (typeof window === "undefined") {
    return [];
  }

  const raw = window.localStorage.getItem(IDEA_STORAGE_KEY);

  if (!raw) {
    return [];
  }

  try {
    const parsed = JSON.parse(raw) as IdeaStorageData;

    if (parsed.version !== 1 || !Array.isArray(parsed.ideas)) {
      return [];
    }

    return parsed.ideas;
  } catch {
    return [];
  }
}

export function saveIdeasToStorage(ideas: Idea[]) {
  if (typeof window === "undefined") {
    return;
  }

  const payload: IdeaStorageData = {
    version: 1,
    ideas,
  };

  window.localStorage.setItem(IDEA_STORAGE_KEY, JSON.stringify(payload));
}

export function clearIdeasStorage() {
  if (typeof window === "undefined") {
    return;
  }

  window.localStorage.setItem(IDEA_STORAGE_KEY, JSON.stringify(EMPTY_STORAGE));
}

