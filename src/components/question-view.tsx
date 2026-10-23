"use client";

import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { QuestionCard } from "@/components/question-card";
import { ReadingSurface } from "@/components/reading-surface";
import { courseSlug } from "@/lib/slug";
import { QUESTIONS } from "../../data/questions";
import type { Question } from "../../data/questions";

function loadProgress(slug: string, total: number) {
  try {
    const raw = localStorage.getItem(`abhq:progress:${slug}`);
    return raw ? JSON.parse(raw) : { read: [], total };
  } catch {
    return { read: [], total };
  }
}

export default function QuestionView({
  question,
}: {
  question: Question;
}) {
  const router = useRouter();
  const slug = courseSlug(question.courseCode);
  const courseQuestions = QUESTIONS.filter((q) => q.courseCode === question.courseCode);
  const totalQuestions = courseQuestions.length;

  const [courseProgress, setCourseProgress] = useState<{
    read: string[];
    total: number;
  }>(() => loadProgress(slug, totalQuestions));

  const nextUnread =
    typeof window !== "undefined"
      ? courseQuestions.find((q) => {
          try {
            return localStorage.getItem(`abhq:read:${q.id}`) !== "1";
          } catch {
            return true;
          }
        })
      : undefined;

  const readCount = courseProgress.read.length;

  const handleMarkRead = (_id: string, isRead: boolean) => {
    try {
      localStorage.setItem(`abhq:read:${question.id}`, isRead ? "1" : "0");
    } catch {
      // no-op
    }
    setCourseProgress((prev) => {
      const read = isRead
        ? [...new Set([...prev.read, question.id])]
        : prev.read.filter((id) => id !== question.id);
      try {
        localStorage.setItem(
          `abhq:progress:${slug}`,
          JSON.stringify({ read, total: prev.total })
        );
      } catch {
        // no-op
      }
      return { read, total: prev.total };
    });
  };

  const jumpToNextUnread = () => {
    if (nextUnread) {
      router.push(`/question/${nextUnread.id}`);
    }
  };

  return (
    <ReadingSurface
      title={`${question.courseCode.toUpperCase()} · ${question.courseTitle}`}
      backHref={`/course/${slug}`}
      courseSlug={slug}
      totalQuestions={totalQuestions}
      onJumpToNextUnread={jumpToNextUnread}
    >
      <QuestionCard
        id={question.id}
        text={question.text}
        tags={question.tags}
        exam={question.exam}
        batch={question.batch}
        teacher={question.teacher}
        verified={question.verified ?? false}
        similarIds={question.similarIds ?? []}
        onMarkRead={handleMarkRead}
      />

      {question.similarIds?.length && (
        <section className="mt-12 border-t border-rule pt-8">
          <h2 className="mb-4 text-[15px] font-ui text-ink-muted uppercase tracking-wider">
            Similar questions
          </h2>
          <div className="space-y-3">
            {question.similarIds.map((sid) => {
              const sim = QUESTIONS.find((q) => q.id === sid);
              if (!sim) return null;
              return (
                <div key={sid} className="pl-4 border-l-2 border-rule">
                  <Link
                    href={`/question/${sim.id}`}
                    className="text-[14px] font-ui text-accent underline underline-offset-3 hover:no-underline block"
                  >
                    {sim.text}
                  </Link>
                  <p className="mt-1 text-[12px] font-ui text-ink-muted">
                    {sim.exam} • {sim.batch} • {sim.teacher}
                  </p>
                </div>
              );
            })}
          </div>
        </section>
      )}
    </ReadingSurface>
  );
}
