import { Container } from "@/components/container";
import { SectionHeading } from "@/components/typography";
import { Reveal } from "@/components/reveal";
import { workflowSteps } from "@/content/landing";

/**
 * The four-stage method, numbered in the Swiss editorial grid.
 * Server-rendered; no interaction beyond reading.
 */
export function Workflow() {
  return (
    <section id="workflow" aria-labelledby="workflow-heading" className="py-16 sm:py-24">
      <Container width="content">
        <Reveal>
          <SectionHeading
            index="01"
            eyebrow="How it works"
            title={
              <span id="workflow-heading">
                Four steps from market to message.
              </span>
            }
            lede="A bounded research run: every stage keeps its sources, and thin evidence is reported honestly instead of filled in."
          />
        </Reveal>
        <ol className="mt-12 grid gap-px overflow-hidden rounded-[6px] border border-line bg-line sm:grid-cols-2 lg:grid-cols-4">
          {workflowSteps.map((step, i) => (
            <Reveal key={step.index} delay={i * 0.06} className="h-full">
              <li className="flex h-full flex-col bg-card p-6">
                <div className="flex items-center justify-between">
                  <span
                    aria-hidden="true"
                    className="font-mono text-[12px] font-medium tracking-[0.1em] text-signal"
                  >
                    {step.index}
                  </span>
                  <step.icon
                    className="h-5 w-5 text-ink-soft"
                    aria-hidden="true"
                  />
                </div>
                <h3 className="mt-6 text-lg font-semibold tracking-[-0.01em]">
                  {step.title}
                </h3>
                <p className="mt-2 text-[15px] leading-relaxed text-ink-soft">
                  {step.description}
                </p>
              </li>
            </Reveal>
          ))}
        </ol>
      </Container>
    </section>
  );
}
