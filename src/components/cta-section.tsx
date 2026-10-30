import { ArrowRight } from "lucide-react";
import { Container } from "@/components/container";
import { Reveal } from "@/components/reveal";

/**
 * Closing CTA. Single conversion action (anchor to #cta target below);
 * the disabled waitlist note is explicit placeholder copy, not a fake form.
 */
export function CtaSection() {
  return (
    <section
      id="cta"
      aria-labelledby="cta-heading"
      className="border-t border-line bg-ink text-paper"
    >
      <Container width="content" className="py-16 sm:py-24">
        <Reveal>
          <p className="font-mono text-[11px] font-medium tracking-[0.14em] text-paper/60 uppercase">
            05 — Early access
          </p>
          <h2
            id="cta-heading"
            className="mt-4 max-w-2xl text-3xl font-semibold tracking-[-0.02em] text-balance sm:text-5xl sm:leading-[1.05]"
          >
            Stop guessing who to email next.
          </h2>
          <p className="mt-4 max-w-xl text-[17px] leading-relaxed text-paper/75">
            Join the early-access list. We are onboarding B2B teams who sell to
            local and regional businesses first.
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
            <a
              href="mailto:hello@prospectra.example?subject=Early%20access%20request"
              className="inline-flex h-12 items-center justify-center gap-2 rounded-[4px] bg-signal px-6 text-[15px] font-medium text-white transition-colors duration-150 hover:bg-signal-deep"
            >
              Request early access
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </a>
            <p className="text-sm text-paper/60">
              Email us — self-serve signup ships with the product.
            </p>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
