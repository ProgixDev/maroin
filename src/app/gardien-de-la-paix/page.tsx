import type { Metadata } from "next";
import { GdlpReport } from "@/features/report";

export const metadata: Metadata = { title: "Gardien de la Paix · Rapport Meta Ads" };

/** Rapport Meta Ads pour Gardien de la Paix : aucune campagne active. */
export default function Page() {
  return <GdlpReport />;
}
