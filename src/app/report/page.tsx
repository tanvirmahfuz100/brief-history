"use client";

import Link from "next/link";
import { useState } from "react";

// WhatsApp number for reports — configure with the department's number.
// Format: country code + number, no spaces or plus (e.g. 8801700000000).
const WHATSAPP_NUMBER = "8801XXXXXXXXX";

const SITE_NAME = "A Brief History of Past Questions";

export default function ReportPage() {
  const [stage, setStage] = useState<"form" | "link">("form");
  const [name, setName] = useState("");
  const [course, setCourse] = useState("");
  const [question, setQuestion] = useState("");
  const [issue, setIssue] = useState("");
  const [error, setError] = useState("");

  const isConfigured = WHATSAPP_NUMBER !== "8801XXXXXXXXX";

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    if (!name || !course || !issue) {
      setError("Please fill in your name, course, and the issue.");
      return;
    }
    if (!isConfigured) {
      setError(
        "WhatsApp number not configured. Set WHATSAPP_NUMBER in src/app/report/page.tsx."
      );
      return;
    }
    const text = encodeURIComponent(
      `Report via ${SITE_NAME}\n\nName: ${name}\nCourse: ${course}\nQuestion: ${question || "(not specified)"}\nIssue: ${issue}`
    );
    const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${text}`;
    setStage("link");
    // Expose the link via a data attribute for the button below
    (document.getElementById("wa-link") as HTMLAnchorElement).href = url;
  };

  return (
    <div className="mx-auto max-w-720 px-6 py-12">
      <nav className="flex items-center gap-2 text-xs font-ui text-ink-muted mb-8">
        <Link href="/" className="text-accent hover:no-underline">
          Home
        </Link>
        <span aria-hidden="true">/</span>
        <span className="text-ink">Report</span>
      </nav>

      <h1 className="font-reading mb-2">Report a question</h1>
      <p className="text-[14px] font-ui text-ink-muted mb-10">
        Found an error in a question? Report it to the department over
        WhatsApp. No account or email is required.
      </p>

      {stage === "form" ? (
        <form onSubmit={handleSubmit} className="space-y-5 max-w-[56ch]">
          {error && (
            <p className="text-[13px] font-ui text-warn">{error}</p>
          )}
          <div>
            <label className="block mb-1.5 text-[13px] font-ui text-ink-muted">
              Your name
            </label>
            <input
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full rounded-sm border border-rule bg-surface px-3 py-2 text-sm text-ink focus-visible:outline-2 focus-visible:outline-accent focus-visible:outline-offset-1"
              placeholder="Your name"
            />
          </div>
          <div>
            <label className="block mb-1.5 text-[13px] font-ui text-ink-muted">
              Course (e.g. AIS 1101)
            </label>
            <input
              required
              value={course}
              onChange={(e) => setCourse(e.target.value)}
              className="w-full rounded-sm border border-rule bg-surface px-3 py-2 text-sm text-ink focus-visible:outline-2 focus-visible:outline-accent focus-visible:outline-offset-1"
              placeholder="AIS 1101"
            />
          </div>
          <div>
            <label className="block mb-1.5 text-[13px] font-ui text-ink-muted">
              Question (ID or text)
            </label>
            <input
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
              className="w-full rounded-sm border border-rule bg-surface px-3 py-2 text-sm text-ink focus-visible:outline-2 focus-visible:outline-accent focus-visible:outline-offset-1"
              placeholder="e.g. q-101 or paste the question text"
            />
          </div>
          <div>
            <label className="block mb-1.5 text-[13px] font-ui text-ink-muted">
              What is the issue?
            </label>
            <textarea
              required
              value={issue}
              onChange={(e) => setIssue(e.target.value)}
              rows={4}
              className="w-full rounded-sm border border-rule bg-surface px-3 py-2 text-sm text-ink focus-visible:outline-2 focus-visible:outline-accent focus-visible:outline-offset-1"
              placeholder="Describe the problem with the question"
            />
          </div>
          <button
            type="submit"
            className="rounded-sm border border-rule bg-surface px-5 py-3 text-sm font-ui text-ink hover:bg-accent/5 focus-visible:outline-2 focus-visible:outline-accent focus-visible:outline-offset-1"
          >
            Open in WhatsApp
          </button>
          {!isConfigured && (
            <p className="mt-3 text-[12px] font-ui text-ink-muted">
              The WhatsApp number is a placeholder. Update
              <code className="font-mono text-ink-muted">
                WHATSAPP_NUMBER
              </code>
              in the report page to enable sending.
            </p>
          )}
        </form>
      ) : (
        <>
          <p className="mb-4 text-[13px] font-ui text-ink-muted">
            Your message is ready. Click the button below to open WhatsApp.
          </p>
          <a
            id="wa-link"
            href="https://wa.me"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-sm border border-accent bg-surface px-5 py-3 text-sm font-ui text-accent hover:bg-accent/5 focus-visible:outline-2 focus-visible:outline-accent focus-visible:outline-offset-1"
          >
            Open WhatsApp
          </a>
          <button
            onClick={() => setStage("form")}
            className="ml-3 text-xs font-ui text-ink-muted underline underline-offset-3 hover:no-underline"
          >
            Back
          </button>
        </>
      )}
    </div>
  );
}
