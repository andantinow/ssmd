export function createIdeaId() {
  if (typeof crypto !== "undefined" && "randomUUID" in crypto) {
    return crypto.randomUUID();
  }

  return `idea_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`;
}

