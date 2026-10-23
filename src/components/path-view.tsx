"use client";

import { useState } from "react";
import { ReadingSurface } from "@/components/reading-surface";
import { LazyYouTube } from "@/components/lazy-youtube";
import { cn } from "@/lib/utils";
import type { Path } from "../../data/paths";

export default function PathView({ path }: { path: Path }) {
  const [index, setIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<string, number>>({});
  const [submitted, setSubmitted] = useState(false);

  const current = path.quiz[index];
  const isLast = index === path.quiz.length - 1;
  const score = path.quiz.reduce(
    (n, q) => (answers[q.id] === q.answer ? n + 1 : n),
    0
  );

  const handleAnswer = (choice: number) => {
    setAnswers((prev) => ({ ...prev, [current.id]: choice }));
  };

  const handleNext = () => {
    if (isLast) setSubmitted(true);
    else setIndex((i) => i + 1);
  };

  const handleSkip = () => {
    if (isLast) setSubmitted(true);
    else setIndex((i) => i + 1);
  };

  return (
    <ReadingSurface
      title={`${path.courseCode.toUpperCase()} — Learning Path`}
      backHref={`/course/${path.slug}`}
      courseSlug={path.slug}
      totalQuestions={path.quiz.length}
    >
      <section className="mb-12">
        <LazyYouTube videoId={path.videoId} title={path.videoTitle} />
        <p className="mt-4 text-[13px] font-ui text-ink-muted">
          {path.videoTitle}
        </p>
      </section>

      <section className="border-t border-rule pt-10">
        <h2 className="mb-6 text-[15px] font-ui text-ink-muted uppercase tracking-wider">
          Transcript quiz
        </h2>

        {submitted ? (
          <div className="text-center py-12">
            <h2 className="font-reading text-ink mb-3">
              Quiz complete — {score} / {path.quiz.length}
            </h2>
            <p className="text-[14px] font-ui text-ink-muted mb-8">
              You can retake the quiz anytime; progress is saved locally.
            </p>
            <button
              onClick={() => {
                setIndex(0);
                setAnswers({});
                setSubmitted(false);
              }}
              className="rounded-sm border border-rule bg-surface px-4 py-2 text-sm font-ui text-ink hover:bg-accent/5 focus-visible:outline-2 focus-visible:outline-accent focus-visible:outline-offset-1"
            >
              Retake quiz
            </button>
          </div>
        ) : (
          <>
            <p className="mb-6 font-reading text-ink leading-[1.7]">
              {current.question}
            </p>
            <div className="grid gap-3">
              {current.options.map((opt, i) => (
                <button
                  key={i}
                  onClick={() => handleAnswer(i)}
                  className={cn(
                    "w-full text-left rounded-sm border px-4 py-3 text-sm font-ui leading-[1.6] text-ink focus-visible:outline-2 focus-visible:outline-accent focus-visible:outline-offset-1",
                    answers[current.id] === i
                      ? "border-accent bg-accent/10"
                      : "border-rule bg-surface hover:bg-accent/5"
                  )}
                >
                  {opt}
                </button>
              ))}
            </div>

            <div className="mt-8 flex items-center justify-between">
              <button
                onClick={handleSkip}
                className="text-xs font-ui text-accent underline underline-offset-3 hover:no-underline"
              >
                {isLast ? "Finish" : "Skip"}
              </button>
              <button
                onClick={handleNext}
                disabled={answers[current.id] === undefined}
                className="rounded-sm border border-rule bg-surface px-4 py-2 text-sm font-ui text-ink disabled:opacity-50 disabled:pointer-events-none hover:bg-accent/5 focus-visible:outline-2 focus-visible:outline-accent focus-visible:outline-offset-1"
              >
                {isLast ? "Finish" : "Next"}
              </button>
            </div>
          </>
        )}
      </section>
    </ReadingSurface>
  );
}
