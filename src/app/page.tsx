"use client";

import Link from "next/link";
import { useState } from "react";

export default function Home() {
  const [query, setQuery] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    window.location.href = `/browse?search=${encodeURIComponent(query)}`;
  };

  return (
    <div className="mx-auto max-w-720 px-6 py-24">
      <h1 className="font-reading mb-2">A Brief History of Past Questions</h1>
      <p className="text-[15px] font-ui text-ink-muted mb-12">
        Public, login-free archive of past exam questions for the Department of
        Accounting &amp; Information Systems, University of Barishal.
      </p>

      <form
        onSubmit={handleSubmit}
        className="flex flex-col gap-3 max-w-[48ch]"
      >
        <label className="block text-[13px] font-ui text-ink-muted uppercase tracking-wider">
          Search questions
        </label>
        <input
          required
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="w-full rounded-sm border border-rule bg-surface px-4 py-3 text-lg font-ui text-ink focus-visible:outline-2 focus-visible:outline-accent focus-visible:outline-offset-1"
          placeholder="e.g. depreciation, bank reconciliation, AIS 1101…"
        />
        <button
          type="submit"
          className="rounded-sm border border-rule bg-surface px-5 py-3 text-lg font-ui text-ink hover:bg-accent/5 focus-visible:outline-2 focus-visible:outline-accent focus-visible:outline-offset-1"
        >
          Go to results
        </button>
      </form>

      <p className="mt-12 text-[13px] font-ui text-ink-muted">
        Or{" "}
        <Link
          href="/browse"
          className="text-accent underline underline-offset-3 hover:no-underline"
        >
          browse the full archive
        </Link>
        .
      </p>
    </div>
  );
}
