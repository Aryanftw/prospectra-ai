import Link from "next/link";
import { Container } from "@/components/container";

const columns = [
  {
    heading: "Product",
    links: [
      { label: "Workflow", href: "#workflow" },
      { label: "Product preview", href: "#preview" },
      { label: "Evidence model", href: "#evidence" },
      { label: "Outreach drafts", href: "#outreach" },
    ],
  },
  {
    heading: "Method",
    links: [
      { label: "Discovery", href: "#workflow" },
      { label: "Qualification", href: "#evidence" },
      { label: "Request access", href: "#cta" },
    ],
  },
] as const;

export function SiteFooter() {
  return (
    <footer className="border-t border-line bg-parchment/60">
      <Container width="wide" className="py-14">
        <div className="grid gap-10 md:grid-cols-[1.4fr_1fr_1fr]">
          <div>
            <p className="flex items-baseline gap-2">
              <span className="text-lg font-semibold tracking-[-0.02em]">
                Prospectra
              </span>
              <span
                aria-hidden="true"
                className="inline-block h-2 w-2 rounded-[1px] bg-signal"
              />
            </p>
            <p className="mt-3 max-w-sm text-sm leading-relaxed text-ink-soft">
              AI-powered B2B sales intelligence. Discover candidates, research
              their public presence, qualify fit against your ICP, and draft
              outreach backed by evidence.
            </p>
            <p className="mt-4 font-mono text-[11px] tracking-[0.08em] text-faint uppercase">
              Demonstration preview — sample data shown
            </p>
          </div>
          {columns.map((col) => (
            <nav key={col.heading} aria-label={col.heading}>
              <h2 className="font-mono text-[11px] font-medium tracking-[0.14em] text-faint uppercase">
                {col.heading}
              </h2>
              <ul className="mt-4 space-y-1">
                {col.links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="inline-block rounded-[3px] py-1 text-sm text-ink-soft transition-colors duration-150 hover:text-ink"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          ))}
        </div>
        <div className="mt-12 flex flex-col gap-2 border-t border-line pt-6 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-[13px] text-faint">
            © 2026 Prospectra. Concept preview — no customer data shown.
          </p>
          <p className="font-mono text-[11px] tracking-[0.08em] text-faint uppercase">
            Find the signal. Win the deal.
          </p>
        </div>
      </Container>
    </footer>
  );
}
