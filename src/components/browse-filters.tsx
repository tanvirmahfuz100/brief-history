"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { cn } from "@/lib/utils";

interface BrowseFiltersProps {
  filters: {
    search: string;
    course: string;
    exam: string;
    batch: string;
    teacher: string;
  };
  options: {
    courses: string[];
    exams: string[];
    batches: string[];
    teachers: string[];
  };
  onChange: (filters: {
    search: string;
    course: string;
    exam: string;
    batch: string;
    teacher: string;
  }) => void;
  onClear: () => void;
  filteredCount: number;
  totalCount: number;
}

export function BrowseFilters({
  filters,
  options,
  onChange,
  onClear,
  filteredCount,
  totalCount,
}: BrowseFiltersProps) {
  const searchRef = useRef<HTMLInputElement>(null);
  const debounce = useRef<ReturnType<typeof setTimeout> | null>(null);

  const [open, setOpen] = useState(false);
  const hasActiveFilters =
    filters.search ||
    filters.course ||
    filters.exam ||
    filters.batch ||
    filters.teacher;

  const handleSearchChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const value = e.target.value;
      onChange({ ...filters, search: value });
      if (debounce.current) clearTimeout(debounce.current);
      debounce.current = setTimeout(() => {
        onChange({ ...filters, search: value });
      }, 250);
    },
    [filters, onChange]
  );

  useEffect(() => {
    return () => {
      if (debounce.current) clearTimeout(debounce.current);
    };
  }, []);

  const isMobile = typeof window !== "undefined" && window.innerWidth < 768;

  return (
    <div className="w-full">
      {isMobile ? (
        <div className="border-b border-rule bg-surface">
          <button
            onClick={() => setOpen((o) => !o)}
            className="flex w-full items-center justify-between px-6 py-4 text-left font-ui text-sm text-ink hover:bg-accent/5 focus-visible:outline-2 focus-visible:outline-accent focus-visible:outline-offset-1"
            aria-expanded={open}
            aria-controls="browse-filters-drawer"
          >
            <span>Filters</span>
            <span className="flex items-center gap-1">
              {hasActiveFilters ? (
                <span className="inline-flex items-center rounded-sm border border-accent bg-accent/10 px-1.5 py-0.5 text-[10px] text-accent">
                  {(
                    [filters.search, filters.course, filters.exam, filters.batch, filters.teacher] as string[]
                  ).filter(Boolean).length}
                </span>
              ) : (
                <span className="text-ink-muted">0</span>
              )}
            </span>
          </button>

          {open && (
            <div id="browse-filters-drawer" className="border-t border-rule bg-surface p-6 space-y-6 animate-in fade-in slide-in-from-top-2 duration-200">
              <div className="space-y-2">
                <label className="block text-[12px] font-ui text-ink-muted uppercase tracking-wider">Search</label>
                <input
                  ref={searchRef}
                  value={filters.search}
                  onChange={handleSearchChange}
                  className="w-full rounded-sm border border-rule bg-surface px-3 py-2 text-sm text-ink focus-visible:outline-2 focus-visible:outline-accent focus-visible:outline-offset-1"
                  placeholder="Search questions…"
                />
              </div>

              <div className="space-y-2">
                <label className="block text-[12px] font-ui text-ink-muted uppercase tracking-wider">Course</label>
                <select
                  value={filters.course}
                  onChange={(e) =>
                    onChange({ ...filters, course: e.target.value })
                  }
                  className="w-full rounded-sm border border-rule bg-surface px-3 py-2 text-sm text-ink focus-visible:outline-2 focus-visible:outline-accent focus-visible:outline-offset-1"
                >
                  <option value="">All courses</option>
                  {options.courses.map((c) => (
                    <option key={c} value={c}>
                      {c}
                    </option>
                  ))}
                </select>
              </div>

              <div className="grid grid-cols-2 gap-4 space-y-0">
                <div className="space-y-2">
                  <label className="block text-[12px] font-ui text-ink-muted uppercase tracking-wider">Exam</label>
                  <select
                    value={filters.exam}
                    onChange={(e) =>
                      onChange({ ...filters, exam: e.target.value })
                    }
                    className="w-full rounded-sm border border-rule bg-surface px-3 py-2 text-sm text-ink focus-visible:outline-2 focus-visible:outline-accent focus-visible:outline-offset-1"
                  >
                    <option value="">All exams</option>
                    {options.exams.map((e) => (
                      <option key={e} value={e}>
                        {e}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="space-y-2">
                  <label className="block text-[12px] font-ui text-ink-muted uppercase tracking-wider">Batch</label>
                  <select
                    value={filters.batch}
                    onChange={(e) =>
                      onChange({ ...filters, batch: e.target.value })
                    }
                    className="w-full rounded-sm border border-rule bg-surface px-3 py-2 text-sm text-ink focus-visible:outline-2 focus-visible:outline-accent focus-visible:outline-offset-1"
                  >
                    <option value="">All batches</option>
                    {options.batches.map((b) => (
                      <option key={b} value={b}>
                        {b}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="space-y-2">
                <label className="block text-[12px] font-ui text-ink-muted uppercase tracking-wider">Teacher</label>
                <select
                  value={filters.teacher}
                  onChange={(e) =>
                    onChange({ ...filters, teacher: e.target.value })
                  }
                  className="w-full rounded-sm border border-rule bg-surface px-3 py-2 text-sm text-ink focus-visible:outline-2 focus-visible:outline-accent focus-visible:outline-offset-1"
                >
                  <option value="">All teachers</option>
                  {options.teachers.map((t) => (
                    <option key={t} value={t}>
                      {t}
                    </option>
                  ))}
                </select>
              </div>

              <div className="flex justify-end">
                <button
                  onClick={onClear}
                  className="underline underline-offset-3 hover:no-underline text-xs font-ui text-warn"
                >
                  Clear all
                </button>
              </div>
            </div>
          )}
        </div>
      ) : (
        <div className="border-b border-rule bg-surface px-6 py-4">
          <div className="flex items-center gap-3 text-xs font-ui text-ink-muted">
            <span>{filteredCount} of {totalCount} questions</span>
            {hasActiveFilters && (
              <>
                <span className="mx-1">•</span>
                <button
                  onClick={onClear}
                  className="underline underline-offset-3 hover:no-underline text-warn"
                >
                  Clear all
                </button>
              </>
            )}
          </div>

          <form
            onChange={(e) => {
              const { name, value } = e.target as unknown as {
                name: string;
                value: string;
              };
              onChange({ ...filters, [name]: value });
            }}
            className="flex items-center gap-3"
          >
            <input
              name="search"
              defaultValue={filters.search}
              className="flex-1 rounded-sm border border-rule bg-surface px-3 py-2 text-sm text-ink focus-visible:outline-2 focus-visible:outline-accent focus-visible:outline-offset-1"
              placeholder="Search questions…"
            />
            <select
              name="course"
              value={filters.course}
              className="rounded-sm border border-rule bg-surface px-3 py-2 text-sm text-ink focus-visible:outline-2 focus-visible:outline-accent focus-visible:outline-offset-1"
            >
              <option value="">Course</option>
              {options.courses.map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </select>
            <select
              name="exam"
              value={filters.exam}
              className="rounded-sm border border-rule bg-surface px-3 py-2 text-sm text-ink focus-visible:outline-2 focus-visible:outline-accent focus-visible:outline-offset-1"
            >
              <option value="">Exam</option>
              {options.exams.map((e) => (
                <option key={e} value={e}>
                  {e}
                </option>
              ))}
            </select>
            <select
              name="batch"
              value={filters.batch}
              className="rounded-sm border border-rule bg-surface px-3 py-2 text-sm text-ink focus-visible:outline-2 focus-visible:outline-accent focus-visible:outline-offset-1"
            >
              <option value="">Batch</option>
              {options.batches.map((b) => (
                <option key={b} value={b}>
                  {b}
                </option>
              ))}
            </select>
            <select
              name="teacher"
              value={filters.teacher}
              className="rounded-sm border border-rule bg-surface px-3 py-2 text-sm text-ink focus-visible:outline-2 focus-visible:outline-accent focus-visible:outline-offset-1"
            >
              <option value="">Teacher</option>
              {options.teachers.map((t) => (
                <option key={t} value={t}>
                  {t}
                </option>
              ))}
            </select>
          </form>
        </div>
      )}
    </div>
  );
}
