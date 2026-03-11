import Link from "next/link";
import { Button } from "@/components/ui/button";

interface EmptyStateProps {
  title: string;
  description: string;
  actionHref?: string;
  actionLabel?: string;
}

export function EmptyState({
  title,
  description,
  actionHref,
  actionLabel,
}: EmptyStateProps) {
  return (
    <div className="rounded-[2rem] border border-dashed border-zinc-300 bg-white/80 p-8 text-center shadow-sm">
      <div className="mx-auto max-w-md space-y-3">
        <p className="text-lg font-semibold text-zinc-900">{title}</p>
        <p className="text-sm leading-6 text-zinc-600">{description}</p>
        {actionHref && actionLabel ? (
          <Link href={actionHref} className="inline-flex">
            <Button>{actionLabel}</Button>
          </Link>
        ) : null}
      </div>
    </div>
  );
}

