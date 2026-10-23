"use client";

import Link from "next/link";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { jsPDF } from "jspdf";
import { QUESTIONS } from "../../../data/questions";

const SITE_NAME = "A Brief History of Past Questions";
const SITE_URL = "https://example.university-barishal.edu/brief-history";

export default function ToolsPage() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<typeof QUESTIONS>(QUESTIONS);
  const debounce = useRef<ReturnType<typeof setTimeout> | null>(null);

  const handleSearch = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const value = e.target.value;
      setQuery(value);
      if (debounce.current) clearTimeout(debounce.current);
      debounce.current = setTimeout(() => {
        setResults(
          QUESTIONS.filter((q) =>
            `${q.text} ${q.exam} ${q.batch} ${q.teacher} ${q.tags.join(" ")}`
              .toLowerCase()
              .includes(value.toLowerCase())
          )
        );
      }, 250);
    },
    []
  );

  useEffect(
    () => () => {
      if (debounce.current) clearTimeout(debounce.current);
    },
    []
  );

  const downloadMarkdown = useCallback(() => {
    const lines: string[] = [];
    lines.push(`# ${SITE_NAME}`);
    lines.push(`${SITE_URL}`);
    lines.push("");
    lines.push("This archive was exported from A Brief History of Past Questions.");
    lines.push("");
    lines.push("---");
    lines.push("");

    for (const q of results) {
      lines.push(`## ${q.id}`);
      lines.push(`**Course:** ${q.courseCode.toUpperCase()} — ${q.courseTitle}`);
      lines.push(`**Exam:** ${q.exam}  |  **Batch:** ${q.batch}  |  **Teacher:** ${q.teacher}`);
      lines.push(`**Tags:** ${q.tags.join(", ")}`);
      lines.push(q.verified ? "**Verified:** yes" : "");
      lines.push("");
      lines.push(q.text);
      lines.push("");
      lines.push("---");
      lines.push("");
    }

    const blob = new Blob([lines.join("\n")], { type: "text/markdown;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "abhq-questions.md";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  }, [results]);

  const downloadPdf = useCallback(() => {
    const doc = new jsPDF();
    const pageWidth = doc.internal.pageSize.getWidth();
    const pageHeight = doc.internal.pageSize.getHeight();

    // Watermark: site name, light, diagonal across each page
    const addWatermark = () => {
      doc.setTextColor(200, 170, 120);
      doc.setFontSize(40);
      doc.text(SITE_NAME, pageWidth / 2, pageHeight / 2, {
        align: "center",
        angle: 45,
      });
    };

    doc.setFontSize(18);
    doc.text(SITE_NAME, 20, 22);
    doc.setFontSize(10);
    doc.setTextColor(100, 90, 80);
    doc.text(SITE_URL, 20, 32);

    let y = 50;
    for (const q of results) {
      if (y > pageHeight - 40) {
        addWatermark();
        doc.addPage();
        y = 40;
      }
      addWatermark();
      doc.setFontSize(12);
      doc.setTextColor(30, 26, 23);
      doc.text(`${q.id} — ${q.courseCode.toUpperCase()}`, 20, y);
      y += 8;
      doc.setFontSize(10);
      doc.setTextColor(60, 55, 50);
      const lines = doc.splitTextToSize(q.text, pageWidth - 40);
      doc.text(lines, 20, y);
      y += lines.length * 6 + 10;
      doc.setFontSize(8);
      doc.setTextColor(100, 90, 80);
      doc.text(
        `Exam: ${q.exam} | Batch: ${q.batch} | Teacher: ${q.teacher} | Tags: ${q.tags.join(", ")}`,
        20,
        y
      );
      y += 12;
    }

    addWatermark();
    const pdfBlob = doc.output("blob");
    const url = URL.createObjectURL(pdfBlob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "abhq-questions.pdf";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  }, [results]);

  const resetProgress = useCallback(() => {
    if (!window.confirm("Reset all saved progress? This cannot be undone.")) {
      return;
    }
    try {
      const keys: string[] = [];
      for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);
        if (key && (key.startsWith("abhq:read:") || key.startsWith("abhq:progress:"))) {
          keys.push(key);
        }
      }
      keys.forEach((key) => localStorage.removeItem(key));
      window.dispatchEvent(new Event("abhq:progress-reset"));
      alert("Progress reset.");
    } catch {
      // localStorage unavailable
    }
  }, []);

  return (
    <div className="mx-auto max-w-720 px-6 py-12">
      <nav className="flex items-center gap-2 text-xs font-ui text-ink-muted mb-8">
        <Link href="/" className="text-accent hover:no-underline">
          Home
        </Link>
        <span aria-hidden="true">/</span>
        <span className="text-ink">Tools</span>
      </nav>

      <h1 className="font-reading mb-2">Tools</h1>
      <p className="text-[14px] font-ui text-ink-muted mb-10">
        Search the archive, export questions, and manage your local progress.
      </p>

      <section className="mb-10">
        <label className="block mb-2 text-[13px] font-ui text-ink-muted">
          Search questions
        </label>
        <input
          value={query}
          onChange={handleSearch}
          className="w-full rounded-sm border border-rule bg-surface px-3 py-2 text-sm text-ink focus-visible:outline-2 focus-visible:outline-accent focus-visible:outline-offset-1"
          placeholder="Search all questions…"
        />
        <p className="mt-2 text-[12px] font-ui text-ink-muted">
          {results.length} of {QUESTIONS.length} questions match.
        </p>
      </section>

      <section className="mb-10">
        <h2 className="mb-4 text-[15px] font-ui text-ink-muted uppercase tracking-wider">
          Export
        </h2>
        <div className="flex flex-wrap gap-3">
          <button
            onClick={downloadMarkdown}
            className="rounded-sm border border-rule bg-surface px-4 py-2.5 text-sm font-ui text-ink hover:bg-accent/5 focus-visible:outline-2 focus-visible:outline-accent focus-visible:outline-offset-1"
          >
            Download Markdown
          </button>
          <button
            onClick={downloadPdf}
            className="rounded-sm border border-rule bg-surface px-4 py-2.5 text-sm font-ui text-ink hover:bg-accent/5 focus-visible:outline-2 focus-visible:outline-accent focus-visible:outline-offset-1"
          >
            Download PDF
          </button>
        </div>
        <p className="mt-3 text-[12px] font-ui text-ink-muted">
          Exported files are watermarked with the site name.
        </p>
      </section>

      <section>
        <h2 className="mb-4 text-[15px] font-ui text-ink-muted uppercase tracking-wider">
          Progress
        </h2>
        <p className="mb-4 text-[14px] font-ui text-ink-muted">
          Your reading progress is stored only in your browser (localStorage).
          Reset it below.
        </p>
        <button
          onClick={resetProgress}
          className="rounded-sm border border-warn bg-surface px-4 py-2.5 text-sm font-ui text-warn hover:bg-warn/5 focus-visible:outline-2 focus-visible:outline-warn focus-visible:outline-offset-1"
        >
          Reset all progress
        </button>
      </section>
    </div>
  );
}
