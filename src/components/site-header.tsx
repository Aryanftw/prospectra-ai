"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowRight, Menu, X } from "lucide-react";
import { cn } from "@/lib/cn";
import { Container } from "@/components/container";

const links = [
  { href: "#workflow", label: "Workflow" },
  { href: "#preview", label: "Product" },
  { href: "#evidence", label: "Evidence" },
  { href: "#outreach", label: "Outreach" },
] as const;

/**
 * Sticky site header. Client-side only because of the mobile menu toggle;
 * all links are real in-page anchors or routes.
 */
export function SiteHeader() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 border-b border-line bg-paper/95 backdrop-blur-[6px]">
      <Container width="wide">
        <div className="flex h-16 items-center justify-between gap-4">
          <Link
            href="/"
            className="flex items-baseline gap-2"
            aria-label="Prospectra home"
          >
            <span className="text-[19px] font-semibold tracking-[-0.02em]">
              Prospectra
            </span>
            <span
              aria-hidden="true"
              className="inline-block h-2 w-2 rounded-[1px] bg-signal"
            />
          </Link>

          <nav aria-label="Primary" className="hidden items-center gap-1 md:flex">
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="rounded-[4px] px-3 py-2 text-sm text-ink-soft transition-colors duration-150 hover:bg-parchment hover:text-ink"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          <div className="hidden items-center gap-2 md:flex">
            <span
              className="inline-flex h-11 cursor-not-allowed items-center px-3 text-sm text-faint select-none"
              aria-disabled="true"
              title="Sign-in ships with the authenticated product (Clerk). Not available in this preview."
            >
              Sign in
            </span>
            <a
              href="#cta"
              className="inline-flex h-9 items-center gap-1.5 rounded-[4px] border border-signal-deep/40 bg-signal px-3.5 text-[13px] font-medium text-white transition-colors duration-150 hover:bg-signal-deep"
            >
              Request access
              <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
            </a>
          </div>

          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-controls="mobile-nav"
            aria-label={open ? "Close menu" : "Open menu"}
            className="inline-flex h-11 w-11 cursor-pointer items-center justify-center rounded-[4px] text-ink transition-colors duration-150 hover:bg-parchment md:hidden"
          >
            {open ? (
              <X className="h-5 w-5" aria-hidden="true" />
            ) : (
              <Menu className="h-5 w-5" aria-hidden="true" />
            )}
          </button>
        </div>
      </Container>

      <div
        id="mobile-nav"
        className={cn("border-t border-line md:hidden", open ? "block" : "hidden")}
      >
        <Container width="wide" className="py-3">
          <nav aria-label="Mobile" className="flex flex-col">
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className="rounded-[4px] px-2 py-3 text-[15px] text-ink transition-colors duration-150 hover:bg-parchment"
              >
                {link.label}
              </Link>
            ))}
            <a
              href="#cta"
              onClick={() => setOpen(false)}
              className="mt-2 inline-flex h-11 items-center justify-center gap-2 rounded-[4px] bg-signal px-5 text-sm font-medium text-white"
            >
              Request access
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </a>
          </nav>
        </Container>
      </div>
    </header>
  );
}
