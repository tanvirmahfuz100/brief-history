"use client";

import Link from "next/link";
import { useState } from "react";

interface ReadingSurfaceProps {
  children: React.ReactNode;
  title: string;
  backHref: string;
  courseSlug: string;
  totalQuestions: number;
  onJumpToNextUnread?: () => void;
}

export function ReadingSurface({
  children,
  title,
  backHref,
  courseSlug,
  totalQuestions,
  onJumpToNextUnread,
}: ReadingSurfaceProps) {
  const readKey = `abhq:progress:${courseSlug}`;
  const [progress] = useState<{ read: string[]; total: number } | null>(() => {
    try {
      const raw = localStorage.getItem(readKey);
      return raw ? JSON.parse(raw) : { read: [], total: totalQuestions };
    } catch {
      return { read: [], total: totalQuestions };
    }
  });

  const readCount = progress?.read.length ?? 0;
  const total = progress?.total ?? totalQuestions;
  const pct = total > 0 ? (readCount / total) * 100 : 0;

  return (
    <div className="mx-auto max-w-720 px-6 py-12">
      <div className="sticky top-0 z-20 bg-bg/80 backdrop-blur-sm border-b border-rule pb-3">
        <div className="flex items-center justify-between gap-3 px-6 py-3">
          <Link
            href={backHref}
            className="inline-flex items-center gap-1.5 text-[13px] font-ui text-ink-muted hover:text-accent underline underline-offset-3 hover:no-underline focus-visible:outline-2 focus-visible:outline-accent focus-visible:outline-offset-1"
          >
            <span aria-hidden="true">←</span> Back
          </Link>

          <span className="flex-shrink-0 text-[13px] font-ui text-ink-muted truncate max-w-[40%]">
            {title}
          </span>

          <div className="flex-shrink-0">
            {totalQuestions > 0 && (
              <ProgressPill
                readCount={readCount}
                total={total}
                pct={pct}
                onJumpToNextUnread={onJumpToNextUnread}
              />
            )}
          </div>
        </div>
      </div>

      <div className="mt-12">{children}</div>
    </div>
  );
}

interface ProgressPillProps {
  readCount: number;
  total: number;
  pct: number;
  onJumpToNextUnread?: () => void;
}

function ProgressPill({
  readCount,
  total,
  pct,
  onJumpToNextUnread,
}: ProgressPillProps) {
  return (
    <div
      onClick={onJumpToNextUnread}
      role="button"
      tabIndex={0}
      aria-label={`Course progress ${readCount} of ${total}`}
      className="inline-flex items-center gap-2 rounded-sm border border-rule bg-surface px-3 py-1.5 text-[12px] font-ui text-ink hover:bg-accent/5 cursor-pointer focus-visible:outline-2 focus-visible:outline-accent focus-visible:outline-offset-1"
    >
      <span className="font-semibold text-ink">
        {readCount} / {total}
      </span>
      <div className="w-16 h-[2px] overflow-hidden rounded bg-rule">
        <div
          className="h-full bg-accent"
          style={{ width: `${Math.min(100, Math.max(0, pct))}%` }}
        />
      </div>
    </div>
  );
}
