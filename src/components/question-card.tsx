"use client";

import Link from "next/link";
import { useSyncExternalStore } from "react";

export interface QuestionCardProps {
  id: string;
  text: string;
  tags: string[];
  exam: string;
  batch: string;
  teacher: string;
  verified?: boolean;
  similarIds?: string[];
  onMarkRead?: (id: string, isRead: boolean) => void;
}

const TICK_SVG = (
  <svg
    width="16"
    height="16"
    viewBox="0 0 16 16"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    <polyline points="4 9 7 12 12 4" />
  </svg>
);

export function QuestionCard({
  id,
  text,
  tags,
  exam,
  batch,
  teacher,
  verified = false,
  similarIds = [],
  onMarkRead,
}: QuestionCardProps) {
  const readKey = `abhq:read:${id}`;

  const isRead = useSyncExternalStore(
    (onStoreChange) => {
      if (typeof window === "undefined") return () => {};
      window.addEventListener("storage", onStoreChange);
      return () => window.removeEventListener("storage", onStoreChange);
    },
    () => {
      try {
        return localStorage.getItem(readKey) === "1";
      } catch {
        return false;
      }
    },
    () => false
  );

  const toggleRead = () => {
    const next = !isRead;
    try {
      localStorage.setItem(readKey, next ? "1" : "0");
    } catch {
      // localStorage unavailable; state-only fallback
    }
    onMarkRead?.(id, next);
  };

  return (
    <article className="border-b border-rule pt-8 pb-8 last:border-0 last:pb-0">
      <div className="font-reading text-ink leading-[1.7] text-base">
        {text}
      </div>

      <div className="mt-4 flex flex-wrap gap-2">
        {tags.map((tag) => (
          <span
            key={tag}
            className="inline-flex items-center rounded-sm border border-rule bg-surface px-2 py-0.5 text-[12px] font-ui text-ink-muted"
          >
            {tag}
          </span>
        ))}
      </div>

      <p className="mt-3 flex items-center gap-1 text-[13px] font-ui text-ink-muted">
        {exam}
        <span className="mx-1">•</span>
        {batch}
        <span className="mx-1">•</span>
        {teacher}
      </p>

      {similarIds.length > 0 && (
        <p className="mt-3">
          <Link
            href={`/question/${similarIds[0]}`}
            className="text-xs font-ui text-accent underline-offset-3"
          >
            Similar questions →
          </Link>
        </p>
      )}

      <div className="mt-5 flex flex-col md:flex-row md:items-end justify-between gap-3">
        <button
          onClick={toggleRead}
          aria-pressed={isRead}
          className="inline-flex items-center gap-1.5 rounded-sm border border-rule bg-surface px-2.5 py-1.5 text-xs font-ui text-ink-muted hover:bg-accent/5 focus-visible:outline-2 focus-visible:outline-accent focus-visible:outline-offset-1"
        >
          {isRead ? "Mark unread" : "Mark read"}
        </button>

        <div className="flex items-center gap-2">
          {verified && (
            <span
              className="inline-flex items-center justify-center w-5 h-5 rounded-sm border border-ok bg-surface px-1 text-[10px] text-ok"
              aria-label="Verified"
            >
              {TICK_SVG}
            </span>
          )}
          <button
            className="text-xs font-ui text-warn underline underline-offset-3 hover:no-underline"
          >
            Report
          </button>
        </div>
      </div>
    </article>
  );
}
