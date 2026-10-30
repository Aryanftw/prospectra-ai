import { cn } from "@/lib/cn";

type BadgeTone = "fact" | "inference" | "gap" | "neutral" | "signal";

const tones: Record<BadgeTone, string> = {
  fact: "bg-fact-tint text-fact border-fact/25",
  inference: "bg-inference-tint text-inference border-inference/25",
  gap: "bg-gap-tint text-gap border-gap/25",
  neutral: "bg-parchment text-ink-soft border-line",
  signal: "bg-signal-tint text-signal border-signal/25",
};

/**
 * Small uppercase label chip. Never the sole conveyor of meaning —
 * always paired with adjacent explanatory copy (see architecture §8).
 */
export function Badge({
  tone = "neutral",
  className,
  children,
}: {
  tone?: BadgeTone;
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-[3px] border px-2 py-0.5 font-mono text-[11px] font-medium tracking-[0.08em] uppercase",
        tones[tone],
        className,
      )}
    >
      {children}
    </span>
  );
}
