# 0008 — Allow CSS Modules for self-contained, pixel-faithful brand documents

- **Status:** Accepted
- **Date:** 2026-06-26
- **Deciders:** Engineering

## Context

[ADR-0001](0001-baseline-stack.md) standardised on Tailwind v4 + shadcn/ui with
CSS-first tokens in `globals.css`, and rejected CSS Modules for app UI ("slower
agent iteration; Tailwind's inline vocabulary reviews and diffs better"). See
also [docs/conventions/styling.md](../../conventions/styling.md).

That choice is right for product UI built from the shared semantic token set. It
fits poorly for **imported brand documents**: a marketing/legal artifact (here,
the Progix "Devis contractuel") authored in an external design tool, with its own
fixed palette (navy/cyan), bespoke spacing, print styles, and ~80 one-off
treatments that must reproduce the source pixel-for-pixel. Re-expressing that as
Tailwind utilities against the grayscale semantic tokens would be high-risk
transcription with no reuse benefit, and would pollute `globals.css` with a brand
palette the rest of the app never uses.

## Decision

A self-contained brand document MAY style itself with a **CSS Module** and a
**slice-local token set** scoped to the feature's root element, provided the
brand palette and styles stay inside that feature slice and do not leak into the
global token system. This applies to the `devis` and `site-gate` feature slices.
All other app/product UI continues to follow ADR-0001 (Tailwind + global tokens).

## Alternatives considered

| Option                                                        | Why not                                                                                                                                                              |
| ------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Port the whole document to Tailwind utilities + global tokens | Huge, error-prone transcription of one-off inline styles; adds a brand palette to `globals.css` that no product surface uses; loses fidelity to the approved design. |
| Inline `style={{…}}` everywhere (no CSS Module)               | No hover/focus/print/`@media` support; unreadable JSX; far more code than deduplicated classes.                                                                      |
| Keep CSS Modules but leave it undocumented                    | Silently contradicts ADR-0001 — exactly what ADRs exist to prevent.                                                                                                  |

## Consequences

- Positive: faithful, maintainable port; brand styling is contained to its slice;
  hover/focus/print/keyframes handled cleanly; the rest of the app keeps Tailwind.
- Negative / accepted trade-offs: two styling systems coexist; CSS-Module class
  names diff less ergonomically than Tailwind utilities. Bounded to brand-document
  slices only.
- Follow-ups required: keep slice-local tokens scoped to the feature root (never
  add a brand palette to `globals.css @theme`); if a third such document appears,
  revisit whether a shared brand-token layer is warranted.
