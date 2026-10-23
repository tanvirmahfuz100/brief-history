"use client";

import { useState } from "react";

interface LazyYouTubeProps {
  videoId: string;
  title?: string;
  width?: number;
  height?: number;
}

export function LazyYouTube({
  videoId,
  title,
  width = 560,
  height = 315,
}: LazyYouTubeProps) {
  const [loaded, setLoaded] = useState(false);

  return (
    <div
      className="relative w-full rounded-sm border border-rule bg-rule overflow-hidden"
      style={{ aspectRatio: `${width} / ${height}` }}
    >
      {loaded ? (
        <iframe
          className="absolute inset-0 w-full h-full"
          src={`https://www.youtube.com/embed/${videoId}?autoplay=1&modestbranding=1&rel=0`}
          title={title || "YouTube video"}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          loading="lazy"
        />
      ) : (
        <button
          onClick={() => setLoaded(true)}
          className="absolute inset-0 flex flex-col items-center justify-center gap-3 bg-bg p-8 text-center hover:bg-accent/5 transition-colors focus-visible:outline-2 focus-visible:outline-accent focus-visible:outline-offset-2"
          aria-label={title ? `Play ${title}` : "Play video"}
        >
          <svg
            width="48"
            height="48"
            viewBox="0 0 48 48"
            fill="none"
            stroke="currentColor"
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="text-ink"
            aria-hidden="true"
          >
            <circle cx="24" cy="24" r="20" />
            <polygon points="18,16 30,24 18,32" />
          </svg>
          <span className="text-sm font-ui text-ink-muted">
            Play {title || "video"}
          </span>
        </button>
      )}
    </div>
  );
}
