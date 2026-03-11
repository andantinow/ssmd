"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { SCORE_OPTIONS } from "@/lib/constants/idea";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import type { Idea, IdeaFormValues, IdeaScores } from "@/types/idea";

interface IdeaFormProps {
  mode: "create" | "edit";
  initialValues: IdeaFormValues;
  onSubmit: (values: IdeaFormValues) => Idea | null;
}

const scoreLabels: Array<{
  key: keyof IdeaScores;
  label: string;
  description: string;
}> = [
  { key: "interest", label: "흥미도", description: "내가 얼마나 끌리는지" },
  { key: "feasibility", label: "실현 가능성", description: "지금 만들 수 있는지" },
  { key: "impact", label: "확장성", description: "앞으로 얼마나 커질지" },
];

export function IdeaForm({ mode, initialValues, onSubmit }: IdeaFormProps) {
  const router = useRouter();
  const [title, setTitle] = useState(initialValues.title);
  const [summary, setSummary] = useState(initialValues.summary);
  const [description, setDescription] = useState(initialValues.description);
  const [tagInput, setTagInput] = useState(initialValues.tags.join(", "));
  const [scores, setScores] = useState<IdeaScores>(initialValues.scores);

  function handleScoreChange(category: keyof IdeaScores, value: number) {
    setScores((currentScores) => ({
      ...currentScores,
      [category]: value,
    }));
  }

  function handleSubmit() {
    const nextValues: IdeaFormValues = {
      title,
      summary,
      description,
      tags: tagInput
        .split(",")
        .map((tag) => tag.trim())
        .filter(Boolean),
      scores,
    };

    const savedIdea = onSubmit(nextValues);

    if (!savedIdea) {
      return;
    }

    router.push(`/ideas/${savedIdea.id}`);
  }

  return (
    <section className="rounded-[2rem] border border-zinc-200 bg-white p-6 shadow-sm">
      <div className="grid gap-6">
        <div className="grid gap-4 md:grid-cols-2">
          <Input
            label="아이디어 제목"
            placeholder="예: 회고를 자동 요약해주는 툴"
            value={title}
            onChange={(event) => setTitle(event.target.value)}
          />
          <Input
            label="한 줄 요약"
            placeholder="이 아이디어를 한 문장으로 설명해보세요"
            value={summary}
            onChange={(event) => setSummary(event.target.value)}
          />
        </div>

        <Textarea
          label="상세 설명"
          hint="생각 배경, 문제, 해결 방식 등을 편하게 적어두세요."
          placeholder="어떤 문제를 해결하는 아이디어인지 자세히 작성해보세요."
          value={description}
          onChange={(event) => setDescription(event.target.value)}
        />

        <Input
          label="태그"
          hint="쉼표(,)로 여러 태그를 구분하세요. 예: ai, productivity, study"
          placeholder="태그를 입력하세요"
          value={tagInput}
          onChange={(event) => setTagInput(event.target.value)}
        />

        <div className="grid gap-4 rounded-[1.5rem] bg-zinc-50 p-5">
          <div>
            <p className="text-sm font-semibold text-zinc-900">간단 평가</p>
            <p className="mt-1 text-sm text-zinc-600">
              점수는 1점에서 5점 사이로 빠르게 매겨보면 충분합니다.
            </p>
          </div>

          <div className="grid gap-4 md:grid-cols-3">
            {scoreLabels.map((item) => (
              <label
                key={item.key}
                className="rounded-[1.5rem] border border-zinc-200 bg-white p-4"
              >
                <div className="mb-3">
                  <p className="text-sm font-semibold text-zinc-900">{item.label}</p>
                  <p className="text-xs text-zinc-500">{item.description}</p>
                </div>
                <select
                  className="h-11 w-full rounded-2xl border border-zinc-200 bg-white px-4 text-sm text-zinc-900 outline-none focus:border-amber-400"
                  value={scores[item.key]}
                  onChange={(event) =>
                    handleScoreChange(item.key, Number(event.target.value))
                  }
                >
                  {SCORE_OPTIONS.map((score) => (
                    <option key={score} value={score}>
                      {score}점
                    </option>
                  ))}
                </select>
              </label>
            ))}
          </div>
        </div>

        <div className="flex flex-col gap-3 sm:flex-row sm:justify-end">
          <Button variant="ghost" onClick={() => router.back()}>
            취소
          </Button>
          <Button
            onClick={handleSubmit}
            disabled={!title.trim() || !summary.trim() || !description.trim()}
          >
            {mode === "create" ? "아이디어 저장" : "수정 내용 저장"}
          </Button>
        </div>
      </div>
    </section>
  );
}

