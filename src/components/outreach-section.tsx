import { PenLine } from "lucide-react";
import { Container } from "@/components/container";
import { Badge } from "@/components/badge";
import { SectionHeading } from "@/components/typography";
import { Reveal } from "@/components/reveal";
import { demoOutreach, outreachPoints } from "@/content/landing";

/**
 * Outreach: drafts grounded in cited findings. Shows a full sample
 * draft so the personalization claim is concrete, not asserted.
 */
export function OutreachSection() {
  return (
    <section
      id="outreach"
      aria-labelledby="outreach-heading"
      className="border-t border-line py-16 sm:py-24"
    >
      <Container width="content">
        <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
          <div>
            <Reveal>
              <SectionHeading
                index="04"
                eyebrow="Personalized outreach"
                title={
                  <span id="outreach-heading">
                    Drafts a rep can defend.
                  </span>
                }
                lede="Each draft references only grounded findings, with citations the sender can open and verify before anything goes out."
              />
            </Reveal>
            <ul className="mt-10 space-y-6">
              {outreachPoints.map((point, i) => (
                <Reveal key={point.title} delay={i * 0.06}>
                  <li className="flex gap-4 border-t border-line pt-6">
                    <span
                      aria-hidden="true"
                      className="font-mono text-[12px] font-medium text-signal"
                    >
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <div>
                      <h3 className="font-semibold">{point.title}</h3>
                      <p className="mt-1 text-[15px] leading-relaxed text-ink-soft">
                        {point.description}
                      </p>
                    </div>
                  </li>
                </Reveal>
              ))}
            </ul>
          </div>

          <Reveal delay={0.1} className="lg:pt-2">
            <figure
              className="rounded-[6px] border border-line bg-card shadow-[0_1px_2px_rgba(28,25,23,0.06)]"
              aria-label="Sample outreach draft (demonstration data)"
            >
              <div className="flex items-center justify-between gap-3 border-b border-line px-5 py-3.5 sm:px-6">
                <p className="flex items-center gap-2 text-sm font-medium">
                  <PenLine className="h-4 w-4 text-faint" aria-hidden="true" />
                  Draft to {demoOutreach.to}
                </p>
                <Badge tone="signal">Sample draft</Badge>
              </div>
              <blockquote className="px-5 py-5 sm:px-6">
                <p className="text-sm font-medium">
                  Subject: {demoOutreach.subject}
                </p>
                <div className="mt-3 space-y-3 text-[15px] leading-relaxed text-ink-soft">
                  <p>Hi there,</p>
                  {demoOutreach.lines.map((line) => (
                    <p key={line}>{line}</p>
                  ))}
                  <p>
                    — Aira, on behalf of{" "}
                    <span className="text-faint">[your agency]</span>
                  </p>
                </div>
              </blockquote>
              <figcaption className="border-t border-line bg-paper px-5 py-3.5 sm:px-6">
                <p className="font-mono text-[11px] tracking-[0.1em] text-faint uppercase">
                  Grounded in
                </p>
                <ul className="mt-2 space-y-1">
                  {demoOutreach.citations.map((citation) => (
                    <li key={citation} className="font-mono text-[12px] text-ink-soft">
                      [source] {citation}
                    </li>
                  ))}
                </ul>
              </figcaption>
            </figure>
          </Reveal>
        </div>
      </Container>
    </section>
  );
}
