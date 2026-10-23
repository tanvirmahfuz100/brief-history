"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { QuestionCard } from "@/components/question-card";
import { BrowseFilters } from "@/components/browse-filters";
import { FILTER_OPTIONS, QUESTIONS } from "../../../data/questions";

export default function BrowsePage() {
  const [filters, setFilters] = useState({
    search: "",
    course: "",
    exam: "",
    batch: "",
    teacher: "",
  });

  const filtered = useMemo(() => {
    return QUESTIONS.filter((q) => {
      const haystack = `${q.text} ${q.exam} ${q.batch} ${q.teacher} ${q.courseCode} ${q.courseTitle} ${q.tags.join(" ")}`.toLowerCase();
      return (
        haystack.includes(filters.search.toLowerCase()) &&
        (!filters.course ||
          `${q.courseCode} — ${q.courseTitle}` === filters.course) &&
        (!filters.exam || q.exam === filters.exam) &&
        (!filters.batch || q.batch === filters.batch) &&
        (!filters.teacher || q.teacher === filters.teacher)
      );
    });
  }, [filters]);

  return (
    <div className="mx-auto max-w-1120 px-6 py-12">
      <nav className="flex items-center gap-2 text-xs font-ui text-ink-muted mb-8">
        <Link href="/" className="text-accent hover:no-underline">
          Home
        </Link>
        <span aria-hidden="true">/</span>
        <span className="text-ink">Browse</span>
      </nav>

      <h1 className="font-reading mb-8">Browse past questions</h1>

      <BrowseFilters
        filters={filters}
        options={FILTER_OPTIONS}
        onChange={setFilters}
        onClear={() =>
          setFilters({ search: "", course: "", exam: "", batch: "", teacher: "" })
        }
        filteredCount={filtered.length}
        totalCount={QUESTIONS.length}
      />

      <div className="mt-8 space-y-0">
        {filtered.map((q) => (
          <QuestionCard key={q.id} {...q} />
        ))}
      </div>

      {filtered.length === 0 && (
        <p className="mt-8 text-[15px] font-ui text-ink-muted">
          No questions match your filters.
        </p>
      )}
    </div>
  );
}
