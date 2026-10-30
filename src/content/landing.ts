import type { LucideIcon } from "lucide-react";
import {
  Compass,
  FileSearch,
  Gauge,
  PenLine,
  ArrowUpRight,
  BadgeCheck,
  Quote,
  AlertTriangle,
} from "lucide-react";

/* ------------------------------------------------------------------ */
/* Workflow steps                                                      */
/* ------------------------------------------------------------------ */

export type WorkflowStep = {
  index: string;
  icon: LucideIcon;
  title: string;
  description: string;
};

export const workflowSteps: WorkflowStep[] = [
  {
    index: "01",
    icon: Compass,
    title: "Discover",
    description:
      "Describe your market — location, industry, and service. Prospectra searches public web sources for candidate businesses and deduplicates them.",
  },
  {
    index: "02",
    icon: FileSearch,
    title: "Research",
    description:
      "Each candidate is researched against public pages. Claims keep their source URL, excerpt, and retrieval date — nothing is asserted without provenance.",
  },
  {
    index: "03",
    icon: Gauge,
    title: "Qualify",
    description:
      "Fit is scored against your ideal customer profile with inspectable criteria. Weak or missing evidence returns an honest insufficient-evidence result.",
  },
  {
    index: "04",
    icon: PenLine,
    title: "Reach out",
    description:
      "Outreach drafts reference only grounded findings. Every sentence that leans on evidence links back to the source it came from.",
  },
];

/* ------------------------------------------------------------------ */
/* Product preview — clearly labelled demonstration data               */
/* ------------------------------------------------------------------ */

export type EvidenceKind = "fact" | "inference" | "gap";

export type DemoEvidence = {
  kind: EvidenceKind;
  label: string;
  detail: string;
  source: string;
};

export type DemoProspect = {
  id: string;
  name: string;
  sector: string;
  location: string;
  score: number;
  verdict: "Strong fit" | "Review" | "Insufficient evidence";
  summary: string;
  evidence: DemoEvidence[];
};

export const demoRun = {
  query: "Textile manufacturers · Surat, GJ",
  service: "Website development",
  stats: [
    { label: "Candidates", value: "38" },
    { label: "Researched", value: "12" },
    { label: "Qualified", value: "5" },
    { label: "Drafts ready", value: "5" },
  ],
} as const;

export const demoProspects: DemoProspect[] = [
  {
    id: "shree-balaji",
    name: "Shree Balaji Textiles",
    sector: "Textile manufacturing",
    location: "Surat, Gujarat",
    score: 86,
    verdict: "Strong fit",
    summary:
      "Product catalogue spread across PDFs and image posts; no enquiry form found on public pages.",
    evidence: [
      {
        kind: "fact",
        label: "No online enquiry channel",
        detail:
          "Contact page lists phone only; no form detected in retrieved pages.",
        source: "shreebalaji-textiles.example/contact · retrieved Oct 2026",
      },
      {
        kind: "fact",
        label: "Catalogue as PDF download",
        detail: "2024 product catalogue hosted as a 6 MB PDF, last modified Mar 2024.",
        source: "shreebalaji-textiles.example/catalogue.pdf",
      },
      {
        kind: "inference",
        label: "Likely losing mobile enquiries",
        detail:
          "Inference from PDF-only catalogue and missing form — needs confirmation in a discovery call.",
        source: "Derived from 2 findings above",
      },
    ],
  },
  {
    id: "meera-sarees",
    name: "Meera Saree House",
    sector: "Wholesale sarees",
    location: "Surat, Gujarat",
    score: 74,
    verdict: "Review",
    summary:
      "Active Instagram storefront, but pricing and bulk-order terms are not published anywhere public.",
    evidence: [
      {
        kind: "fact",
        label: "Instagram storefront active",
        detail: "214 posts, last updated 3 days before retrieval.",
        source: "instagram.example/meerasareehouse",
      },
      {
        kind: "gap",
        label: "No price list found",
        detail:
          "Wholesale terms not present on any retrieved public page. Do not assume pricing in outreach.",
        source: "No supporting source",
      },
    ],
  },
  {
    id: "patel-synthetics",
    name: "Patel Synthetics",
    sector: "Synthetic fabrics",
    location: "Surat, Gujarat",
    score: 41,
    verdict: "Insufficient evidence",
    summary:
      "Only a directory listing and a parked domain were retrievable. Held back instead of scored.",
    evidence: [
      {
        kind: "gap",
        label: "No verifiable website",
        detail:
          "Listed domain returns a registrar placeholder. Research paused rather than guessed.",
        source: "Directory listing only",
      },
    ],
  },
];

export const demoOutreach = {
  to: "Shree Balaji Textiles",
  subject: "Your catalogue deserves a faster shelf",
  lines: [
    "Noticed your 2024 catalogue is a 6 MB PDF download, and the contact page lists phone only.",
    "We help Surat textile houses turn catalogues into searchable product pages with direct enquiry.",
    "Open to a 15-minute look at what that could mean for your top 20 SKUs?",
  ],
  citations: [
    "Catalogue PDF, modified Mar 2024",
    "Contact page, retrieved Oct 2026",
  ],
} as const;

/* ------------------------------------------------------------------ */
/* Evidence + outreach sections                                        */
/* ------------------------------------------------------------------ */

export const evidencePrinciples = [
  {
    icon: BadgeCheck,
    title: "Facts stay facts",
    description:
      "Retrieved claims carry their URL, excerpt, and retrieval timestamp. If a source can't be shown, the claim isn't stated.",
  },
  {
    icon: Quote,
    title: "Inferences are labelled",
    description:
      "Interpretations are marked as inferences with the findings they derive from — never presented as observed truth.",
  },
  {
    icon: AlertTriangle,
    title: "Gaps are explicit",
    description:
      "Missing evidence is an outcome, not an error to paper over. Thin records return “insufficient evidence” instead of a confident score.",
  },
] as const;

export const outreachPoints = [
  {
    title: "Grounded openers",
    description:
      "First lines cite an observed detail — a PDF catalogue, a missing form — instead of generic flattery.",
  },
  {
    title: "Cited, checkable claims",
    description:
      "Every evidence-backed sentence maps to a source the rep can open before sending.",
  },
  {
    title: "Rep stays in control",
    description:
      "Drafts are starting points with visible provenance, ready to edit — never auto-sent.",
  },
];

export const footerNote =
  "Demonstration data only. Business names, scores, and sources are fictional samples for illustration.";

export { ArrowUpRight };
