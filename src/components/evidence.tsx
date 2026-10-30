import { FileText, Link2 } from "lucide-react";
import { cn } from "@/lib/cn";
import { Badge } from "@/components/badge";
import type { DemoProspect } from "@/content/landing";

const verdictTone: Record<DemoProspect["verdict"], "fact" | "neutral" | "gap"> =
  {
    "Strong fit": "fact",
    Review: "neutral",
    "Insufficient evidence": "gap",
  };

/**
 * ICP fit meter: numeric score + labelled verdict. Text-first so
 * meaning never depends on the bar fill alone.
 */
export function FitMeter({ score, verdict }: { score: number; verdict: DemoProspect["verdict"] }) {
  return (
    <div className="flex items-center gap-3">
      <div
        className="h-1.5 w-24 overflow-hidden rounded-full bg-parchment"
        role="img"
        aria-label={`ICP fit score ${score} out of 100 — ${verdict}`}
      >
        <div
          className={cn(
            "h-full rounded-full",
            verdict === "Strong fit" && "bg-fact",
            verdict === "Review" && "bg-inference",
            verdict === "Insufficient evidence" && "bg-gap",
          )}
          style={{ width: `${score}%` }}
        />
      </div>
      <span className="font-mono text-[13px] font-semibold text-ink tabular-nums">
        {score}
      </span>
      <Badge tone={verdictTone[verdict]}>{verdict}</Badge>
    </div>
  );
}

const evidenceIcon = {
  fact: FileText,
  inference: Link2,
  gap: Link2,
} as const;

/**
 * One evidence finding with kind label and source line —
 * the visual unit of architecture §8 (evidence & grounding).
 */
export function EvidenceRow({
  evidence,
}: {
  evidence: DemoProspect["evidence"][number];
}) {
  const Icon = evidenceIcon[evidence.kind];
  return (
    <li className="border-t border-line py-3 first:border-t-0 first:pt-0 last:pb-0">
      <div className="flex items-start gap-2.5">
        <Icon
          className="mt-0.5 h-4 w-4 shrink-0 text-faint"
          aria-hidden="true"
        />
        <div className="min-w-0">
          <p className="text-sm font-medium">
            <span className="sr-only">
              {evidence.kind === "fact"
                ? "Verified fact: "
                : evidence.kind === "inference"
                  ? "Inference: "
                  : "Evidence gap: "}
            </span>
            {evidence.label}
          </p>
          <p className="mt-0.5 text-[13px] leading-relaxed text-ink-soft">
            {evidence.detail}
          </p>
          <p className="mt-1 truncate font-mono text-[11px] text-faint">
            {evidence.source}
          </p>
        </div>
      </div>
    </li>
  );
}
