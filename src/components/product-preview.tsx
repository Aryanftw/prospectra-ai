"use client";

import { useState } from "react";
import { Check } from "lucide-react";
import { cn } from "@/lib/cn";
import { Container } from "@/components/container";
import { Badge } from "@/components/badge";
import { SectionHeading } from "@/components/typography";
import { Reveal } from "@/components/reveal";
import { FitMeter, EvidenceRow } from "@/components/evidence";
import { demoOutreach, demoProspects, demoRun, footerNote } from "@/content/landing";

/**
 * Product preview: a non-interactive-style dashboard mockup built from
 * real components. Tab switching is genuine local state; everything
 * else is clearly labelled demonstration data.
 */
export function ProductPreview() {
  const [activeId, setActiveId] = useState(demoProspects[0].id);
  const active = demoProspects.find((p) => p.id === activeId) ?? demoProspects[0];

  return (
    <section
      id="preview"
      aria-labelledby="preview-heading"
      className="border-y border-line bg-parchment/50 py-16 sm:py-24"
    >
      <Container width="wide">
        <Reveal>
          <SectionHeading
            index="02"
            eyebrow="Product preview"
            title={<span id="preview-heading">A research run, end to end.</span>}
            lede="Sample output from a Surat textile-manufacturers run. Select a prospect to inspect its evidence — names and sources are fictional demonstration data."
          />
        </Reveal>

        <Reveal delay={0.08}>
          <div
            className="mt-12 overflow-hidden rounded-[6px] border border-line bg-card shadow-[0_1px_2px_rgba(28,25,23,0.06)]"
            role="region"
            aria-label="Demonstration product preview (sample data)"
          >
            {/* Window chrome */}
            <div className="flex flex-wrap items-center justify-between gap-3 border-b border-line px-5 py-3.5 sm:px-6">
              <div className="flex min-w-0 items-center gap-3">
                <span aria-hidden="true" className="flex gap-1.5">
                  <i className="h-2.5 w-2.5 rounded-full bg-line-strong" />
                  <i className="h-2.5 w-2.5 rounded-full bg-line-strong" />
                  <i className="h-2.5 w-2.5 rounded-full bg-line-strong" />
                </span>
                <p className="truncate font-mono text-[12px] text-ink-soft">
                  Run #PR-1042 · {demoRun.query} · {demoRun.service}
                </p>
              </div>
              <Badge tone="neutral">Sample data</Badge>
            </div>

            {/* Run stats */}
            <dl className="grid grid-cols-2 divide-line border-b border-line sm:grid-cols-4 sm:divide-x">
              {demoRun.stats.map((stat) => (
                <div key={stat.label} className="px-5 py-4 sm:px-6">
                  <dt className="font-mono text-[11px] tracking-[0.1em] text-faint uppercase">
                    {stat.label}
                  </dt>
                  <dd className="mt-1 text-2xl font-semibold tracking-[-0.02em] tabular-nums">
                    {stat.value}
                  </dd>
                </div>
              ))}
            </dl>

            <div className="grid lg:grid-cols-[1fr_1.1fr]">
              {/* Prospect list — real tab interaction */}
              <div
                role="tablist"
                aria-label="Sample prospects"
                className="divide-y divide-line border-b border-line lg:border-r lg:border-b-0"
              >
                {demoProspects.map((prospect) => {
                  const selected = prospect.id === activeId;
                  return (
                    <button
                      key={prospect.id}
                      type="button"
                      role="tab"
                      aria-selected={selected}
                      onClick={() => setActiveId(prospect.id)}
                      className={cn(
                        "flex w-full cursor-pointer flex-col gap-2 px-5 py-4 text-left transition-colors duration-150 sm:px-6",
                        selected ? "bg-signal-tint/60" : "hover:bg-parchment/70",
                      )}
                    >
                      <span className="flex items-center justify-between gap-2">
                        <span className="font-medium">{prospect.name}</span>
                        {selected && (
                          <Check
                            className="h-4 w-4 shrink-0 text-signal"
                            aria-hidden="true"
                          />
                        )}
                      </span>
                      <span className="text-[13px] text-ink-soft">
                        {prospect.sector} · {prospect.location}
                      </span>
                      <FitMeter score={prospect.score} verdict={prospect.verdict} />
                    </button>
                  );
                })}
              </div>

              {/* Evidence detail */}
              <div
                role="tabpanel"
                aria-label={`Evidence for ${active.name}`}
                className="px-5 py-5 sm:px-6"
              >
                <h3 className="text-base font-semibold">{active.name}</h3>
                <p className="mt-1 text-sm leading-relaxed text-ink-soft">
                  {active.summary}
                </p>
                <ul className="mt-4" aria-label="Supporting evidence">
                  {active.evidence.map((item) => (
                    <EvidenceRow key={item.label} evidence={item} />
                  ))}
                </ul>

                {/* Outreach draft tied to the selected prospect */}
                <div className="mt-5 rounded-[4px] border border-line bg-paper p-4">
                  <p className="flex flex-wrap items-center justify-between gap-2">
                    <span className="font-mono text-[11px] tracking-[0.1em] text-faint uppercase">
                      Outreach draft
                    </span>
                    <Badge tone="signal">2 citations</Badge>
                  </p>
                  <p className="mt-2 text-sm font-medium">
                    Subject: {demoOutreach.subject}
                  </p>
                  <div className="mt-2 space-y-2 text-sm leading-relaxed text-ink-soft">
                    {demoOutreach.lines.map((line) => (
                      <p key={line}>{line}</p>
                    ))}
                  </div>
                  <ul className="mt-3 space-y-1" aria-label="Cited sources">
                    {demoOutreach.citations.map((citation) => (
                      <li
                        key={citation}
                        className="font-mono text-[11px] text-faint"
                      >
                        [source] {citation}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>

            <p className="border-t border-line bg-paper px-5 py-3 font-mono text-[11px] tracking-[0.04em] text-faint sm:px-6">
              {footerNote}
            </p>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
