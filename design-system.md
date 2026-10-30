# Prospectra — Design System

> Decisions below override the persisted skill output in
> `design-system/prospectra/MASTER.md`, which recommended a generic
> glassmorphism/blue-orange SaaS theme. The user brief and
> `architecture.md` §11 require **Swiss modern, editorial, data-first B2B** —
> so that theme was deliberately set aside.

## Direction

Warm off-white paper (`#FAF9F6`), near-black ink (`#1C1917`), one restrained
signal-red accent (`#B42318`, deep `#7F1D14`, tint `#FAF0ED`). No gradients,
no glow, no glassmorphism, no decorative blobs. Thin neutral borders carry
structure; shadows are near-absent (`0 1px 2px rgba(28,25,23,.06)` max).
Corner radii are restrained: 3–6px surfaces, never pills except the state dot.

References: Linear/Attio for polish and information density — not templates.

## Typography

- **Sans:** Inter (Google Fonts via `next/font`, variable `--font-inter`).
  Headlines 600 weight, tracking −0.02 to −0.03em, tight leading (1.02–1.05).
  Body 15–17px, relaxed leading, ink-soft `#44403C` for secondary copy.
- **Mono:** IBM Plex Mono (`--font-plex-mono`) for eyebrows, run IDs,
  scores, sources, and evidence labels — the "data" voice of the system.
- Skill-recommended Plus Jakarta Sans rejected: too rounded/friendly for an
  editorial B2B tool.

## Tokens (`src/app/globals.css`, Tailwind v4 `@theme`)

| Token | Value | Use |
|---|---|---|
| `paper` | `#FAF9F6` | Page background |
| `parchment` | `#F1EEE6` | Alt section wash, hover fills |
| `card` | `#FFFFFF` | Surfaces |
| `ink` / `ink-soft` / `faint` | `#1C1917` / `#44403C` / `#78716C` | Text hierarchy |
| `line` / `line-strong` | `#E3DDCF` / `#CFC5AE` | Borders |
| `signal` / `signal-deep` / `signal-tint` | `#B42318` / `#7F1D14` / `#FAF0ED` | Sole accent: CTAs, eyebrows, selected states |
| `fact` / `inference` / `gap` + tints | `#166534` / `#92400E` / `#57534E` | Evidence semantics — always paired with text labels |

Contrast: ink-on-paper ≈ 15.9:1; white-on-signal ≈ 5.9:1 (AA for normal
text); faint-on-paper ≈ 4.6:1.

## Components (`src/components/`)

- `Container` — 3 widths (prose/content/wide), consistent gutters.
- `Button` — primary (signal) / secondary (bordered) / ghost; link-vs-button
  polymorphism via `href`.
- `Badge` / `EvidenceTag` / `Eyebrow` / `SectionHeading` (`typography.tsx`) —
  every section opens with mono index + rule + label.
- `FitMeter` + `EvidenceRow` (`evidence.tsx`) — score bar always carries the
  numeric score and verdict text; evidence rows carry kind labels + sources.
- `Reveal` — single-use scroll fade (Motion), statically rendered under
  `prefers-reduced-motion`.
- Sections: `hero` / `workflow` / `product-preview` / `evidence-section` /
  `outreach-section` / `cta-section` / `site-header` / `site-footer`.
- Content lives in `src/content/landing.ts`, clearly marked fictional sample data.

## Rules followed from ui-ux-pro-max

- 44px touch targets, visible `:focus-visible` ring, skip-to-content link.
- `scroll-padding-top` so anchors clear the sticky header; no horizontal scroll.
- Lucide icons only, `aria-hidden` decorative icons, labelled tabs with
  `aria-selected`.
- Reduced-motion respected globally (CSS) and per-animation (`Reveal`).
