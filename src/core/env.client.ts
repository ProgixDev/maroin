import { z } from "zod";

/**
 * Client-exposed environment. These are inlined into the browser bundle, so they
 * are PUBLIC by definition — only `NEXT_PUBLIC_*` values that are safe to ship.
 */
const clientEnvSchema = z.object({
  // Frontend-only access gate (site-gate feature). PUBLIC by design: it is
  // inlined into the browser bundle and anyone can read it in devtools. It is a
  // soft gate code, not a secret — it only deters casual access and must never
  // protect real secrets. Override per app via NEXT_PUBLIC_SITE_ACCESS_CODE.
  NEXT_PUBLIC_SITE_ACCESS_CODE: z.string().min(1).default("maroin2026"),
});

// NEXT_PUBLIC_* must be referenced statically for Next.js to inline them.
//
// `.default()` only fires on `undefined`. A hosting provider that declares the
// variable without a value hands us "" instead, which slips past the default and
// then fails `.min(1)`, breaking the build. Normalising blank to `undefined`
// keeps the fallback working: an empty gate code is never a meaningful value.
const rawAccessCode = process.env.NEXT_PUBLIC_SITE_ACCESS_CODE;

export const clientEnv = clientEnvSchema.parse({
  NEXT_PUBLIC_SITE_ACCESS_CODE: rawAccessCode?.trim() ? rawAccessCode : undefined,
});
