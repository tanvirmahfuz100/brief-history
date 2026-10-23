"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

const navItems = [
  { href: "/browse", label: "Browse" },
  { href: "/insights", label: "Insights" },
  { href: "/tools", label: "Tools" },
  { href: "/report", label: "Report" },
] as const;

export function Header() {
  const [open, setOpen] = useState(false);

  return (
    <header className="relative z-10">
      <div className="border-b border-rule bg-surface">
        <div className="mx-auto max-w-1120 px-6 flex h-16 items-center justify-between gap-4">
          <Link
            href="/"
            className="flex items-center gap-2 font-ui text-sm font-semibold tracking-tight text-ink"
          >
            <Image
              src="/logo_white_bg.png"
              alt="Brief History logo"
              width={24}
              height={24}
              priority
            />
            Brief History
          </Link>

          <nav className="hidden md:flex items-center gap-8 text-sm font-ui text-ink-muted">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="hover:text-accent transition-colors"
              >
                {item.label}
              </Link>
            ))}
          </nav>

          <button
            onClick={() => setOpen((o) => !o)}
            className="md:hidden flex items-center justify-center w-8 h-8 rounded-sm text-ink-muted hover:bg-accent/5 focus-visible:outline-2 focus-visible:outline-accent focus-visible:outline-offset-1"
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label="Open menu"
          >
            <svg
              width="20"
              height="20"
              viewBox="0 0 20 20"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <line x1="3" y1="7" x2="17" y2="7" />
              <line x1="3" y1="10" x2="17" y2="10" />
              <line x1="3" y1="13" x2="17" y2="13" />
            </svg>
          </button>
        </div>
      </div>

      {open && (
        <div
          id="mobile-menu"
          className="border-t border-rule bg-surface px-6 py-6 md:hidden"
        >
          <nav className="space-y-4 font-ui text-sm">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                className="block py-3 text-ink hover:text-accent"
              >
                {item.label}
              </Link>
            ))}
          </nav>
        </div>
      )}
    </header>
  );
}
