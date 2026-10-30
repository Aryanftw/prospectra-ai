import { cn } from "@/lib/cn";
import { Badge } from "@/components/badge";

type EyebrowProps = {
  index?: string;
  label: string;
  className?: string;
};

/**
 * Section kicker: mono index + rule + uppercase label.
 * Gives every section the same editorial entry point.
 */
export function Eyebrow({ index, label, className }: EyebrowProps) {
  return (
    <p
      className={cn(
        "flex items-center gap-3 font-mono text-[11px] font-medium tracking-[0.14em] text-faint uppercase",
        className,
      )}
    >
      {index ? (
        <span aria-hidden="true" className="text-signal">
          {index}
        </span>
      ) : null}
      <span aria-hidden="true" className="h-px w-8 bg-line-strong" />
      {label}
    </p>
  );
}

type SectionHeadingProps = {
  eyebrow: string;
  index?: string;
  title: React.ReactNode;
  lede?: React.ReactNode;
  align?: "left" | "center";
  className?: string;
};

export function SectionHeading({
  eyebrow,
  index,
  title,
  lede,
  align = "left",
  className,
}: SectionHeadingProps) {
  return (
    <div
      className={cn(
        "max-w-2xl",
        align === "center" && "mx-auto text-center [&>p]:justify-center",
        className,
      )}
    >
      <Eyebrow index={index} label={eyebrow} />
      <h2 className="mt-4 text-3xl font-semibold tracking-[-0.02em] text-balance sm:text-4xl">
        {title}
      </h2>
      {lede ? (
        <p className="mt-4 text-[17px] leading-relaxed text-ink-soft">{lede}</p>
      ) : null}
    </div>
  );
}

type EvidenceTagProps = {
  kind: "fact" | "inference" | "gap";
  children: React.ReactNode;
};

const evidenceCopy = {
  fact: "Verified fact",
  inference: "Inference",
  gap: "Evidence gap",
} as const;

/**
 * Evidence verdict shown beside a finding. `kind` drives both the
 * visible label and the screen-reader prefix so color is never the
 * only signal.
 */
export function EvidenceTag({ kind, children }: EvidenceTagProps) {
  return (
    <span className="inline-flex flex-wrap items-center gap-2">
      <Badge tone={kind}>
        <span className="sr-only">Evidence status: </span>
        {evidenceCopy[kind]}
      </Badge>
      <span className="text-sm text-ink-soft">{children}</span>
    </span>
  );
}
