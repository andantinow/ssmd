import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { IdeaScoreBadge } from "@/components/ideas/idea-score-badge";
import { formatDate } from "@/lib/utils/date";
import type { Idea } from "@/types/idea";

interface IdeaCardProps {
  idea: Idea;
}

export function IdeaCard({ idea }: IdeaCardProps) {
  return (
    <article className="rounded-[2rem] border border-zinc-200 bg-white p-6 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md">
      <div className="flex items-start justify-between gap-4">
        <div className="space-y-3">
          <div className="flex flex-wrap items-center gap-2">
            {idea.archived ? <Badge tone="muted">보관됨</Badge> : null}
            <Badge>{formatDate(idea.createdAt)}</Badge>
          </div>
          <div>
            <Link
              href={`/ideas/${idea.id}`}
              className="text-xl font-semibold text-zinc-950 hover:text-amber-700"
            >
              {idea.title}
            </Link>
            <p className="mt-2 text-sm leading-6 text-zinc-600">{idea.summary}</p>
          </div>
        </div>
        <IdeaScoreBadge scores={idea.scores} />
      </div>

      <div className="mt-5 flex flex-wrap gap-2">
        {idea.tags.map((tag) => (
          <Badge key={tag}>#{tag}</Badge>
        ))}
      </div>
    </article>
  );
}

