import { Container } from "@/components/container";
import { SectionHeading, EvidenceTag } from "@/components/typography";
import { Reveal } from "@/components/reveal";
import { evidencePrinciples } from "@/content/landing";

/**
 * Evidence model: how Prospectra separates verified facts from
 * inferences and gaps. Directly reflects architecture §8.
 */
export function EvidenceSection() {
  return (
    <section id="evidence" aria-labelledby="evidence-heading" className="py-16 sm:py-24">
      <Container width="content">
        <Reveal>
          <SectionHeading
            index="03"
            eyebrow="Evidence & grounding"
            title={
              <span id="evidence-heading">
                Every claim shows its work.
              </span>
            }
            lede="Qualification is only as good as its provenance. Prospectra keeps source material attached to the finding it supports — and says so when it can't."
          />
        </Reveal>
        <div className="mt-12 grid gap-px overflow-hidden rounded-[6px] border border-line bg-line md:grid-cols-3">
          {evidencePrinciples.map((principle, i) => (
            <Reveal key={principle.title} delay={i * 0.06} className="h-full">
              <article className="flex h-full flex-col bg-card p-6 sm:p-7">
                <principle.icon
                  className="h-5 w-5 text-signal"
                  aria-hidden="true"
                />
                <h3 className="mt-5 text-lg font-semibold tracking-[-0.01em]">
                  {principle.title}
                </h3>
                <p className="mt-2 text-[15px] leading-relaxed text-ink-soft">
                  {principle.description}
                </p>
              </article>
            </Reveal>
          ))}
        </div>
        <Reveal delay={0.1}>
          <div className="mt-8 flex flex-col gap-3 rounded-[6px] border border-line bg-card p-6 sm:flex-row sm:flex-wrap sm:items-center sm:gap-x-8 sm:gap-y-3">
            <EvidenceTag kind="fact">
              “Contact page lists phone only” — URL + retrieval date attached
            </EvidenceTag>
            <EvidenceTag kind="inference">
              “Likely losing mobile enquiries” — derived, needs confirmation
            </EvidenceTag>
            <EvidenceTag kind="gap">
              “No price list found” — reported, never invented
            </EvidenceTag>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
