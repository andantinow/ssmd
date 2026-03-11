import type { ReactNode } from "react";

interface BadgeProps {
  children: ReactNode;
  tone?: "default" | "highlight" | "muted";
}

const toneClassName = {
  default: "bg-zinc-100 text-zinc-700",
  highlight: "bg-amber-100 text-amber-900",
  muted: "bg-zinc-200 text-zinc-600",
};

export function Badge({ children, tone = "default" }: BadgeProps) {
  return (
    <span
      className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-medium ${toneClassName[tone]}`}
    >
      {children}
    </span>
  );
}

