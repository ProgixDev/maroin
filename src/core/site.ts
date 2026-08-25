/**
 * Central site config — the single source for metadata, robots, sitemap, and
 * manifest. Replace name/description and set NEXT_PUBLIC_SITE_URL per app (it
 * drives canonical + Open Graph URLs).
 */
export const site = {
  name: "Rapports Meta Ads · Caserne & Gardien de la Paix",
  shortName: "Rapports Ads",
  description:
    "Rapports d’acquisition Meta Ads pour les applications Caserne (préparation au concours de sapeur-pompier) et Gardien de la Paix (préparation au concours de gardien de la paix). Dépenses, impressions, téléchargements, essais gratuits et analyse du tunnel de conversion.",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000",
  locale: "fr_FR",
} as const;
