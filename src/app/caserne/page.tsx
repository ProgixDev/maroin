import type { Metadata } from "next";
import { CaserneReport } from "@/features/report";

export const metadata: Metadata = { title: "Caserne · Rapport Meta Ads" };

/** Rapport Meta Ads n° 1 pour Caserne, segment Pompier. */
export default function Page() {
  return <CaserneReport />;
}
