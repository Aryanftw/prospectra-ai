import { ArrowRight } from "lucide-react";
import { Container } from "@/components/container";
import { Badge } from "@/components/badge";
import { Reveal } from "@/components/reveal";

/**
 * Editorial hero: oversized grotesk headline, single primary action,
 * anchored product preview below. No gradient, no glow.
 */
export function Hero() {
  return (
    <section aria-labelledby="hero-heading" className="border-b border-line">
      <Container width="wide" className="pt-16 pb-12 sm:pt-24 sm:pb-16">
        <Reveal>
          <p className="flex flex-wrap items-center gap-3">
            <Badge tone="signal">New · Research preview</Badge>
            <span className="font-mono text-[11px] tracking-[0.14em] text-faint uppercase">
              B2B sales intelligence
            </span>
          </p>
        </Reveal>
        <Reveal delay={0.06}>
          <h1
            id="hero-heading"
            className="mt-6 max-w-4xl text-[44px] leading-[1.02] font-semibold tracking-[-0.03em] text-balance sm:text-6xl lg:text-7xl"
          >
            Find the signal.
            <br />
            Win the deal.
          </h1>
        </Reveal>
        <Reveal delay={0.12}>
          <p className="mt-6 max-w-2xl text-[17px] leading-relaxed text-ink-soft sm:text-lg">
            Prospectra discovers candidate businesses, researches their public
            online presence, qualifies fit against your ideal customer profile,
            and drafts outreach backed by evidence — so every first message
            earns the reply.
          </p>
        </Reveal>
        <Reveal delay={0.18}>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
            <a
              href="#cta"
              className="inline-flex h-12 items-center justify-center gap-2 rounded-[4px] border border-signal-deep/40 bg-signal px-6 text-[15px] font-medium text-white transition-colors duration-150 hover:bg-signal-deep"
            >
              Request early access
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </a>
            <a
              href="#preview"
              className="inline-flex h-12 items-center justify-center rounded-[4px] border border-line-strong bg-card px-6 text-[15px] font-medium text-ink transition-colors duration-150 hover:border-ink hover:bg-parchment"
            >
              See how it works
            </a>
          </div>
          <p className="mt-4 font-mono text-[11px] tracking-[0.08em] text-faint uppercase">
            Demonstration preview — sample data, no account needed
          </p>
        </Reveal>
      </Container>
    </section>
  );
}
