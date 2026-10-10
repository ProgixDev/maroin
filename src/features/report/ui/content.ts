/**
 * Données des rapports Meta Ads. Les chiffres bruts viennent du client ; les
 * ratios sont dérivés ici pour qu’ils restent cohérents entre les sections.
 *
 * Typographie française (’ « » …). Pas de tiret cadratin dans le texte visible.
 */

/* ------------------------------------------------------------------ */
/* Chiffres bruts de la campagne Caserne — Pompier, sur 2 jours          */
/* ------------------------------------------------------------------ */

/** Totaux client : 27 €, 5 200 impressions, 32 téléchargements, 14 essais
 *  (8 le Jour 1, 6 le Jour 2). Dépense, impressions et téléchargements sont
 *  répartis au prorata des essais, à CPM presque identique d’un jour à l’autre. */
export const caserneJours = [
  {
    label: "Jour 1",
    depense: 15,
    impressions: 2889,
    telechargements: 18,
    essais: 8,
  },
  {
    label: "Jour 2",
    depense: 12,
    impressions: 2311,
    telechargements: 14,
    essais: 6,
  },
] as const;

export const caserneRaw = {
  depense: 27,
  impressions: 5200,
  telechargements: 32,
  essais: 14,
} as const;

const r = caserneRaw;
const j1 = caserneJours[0];
const j2 = caserneJours[1];

/** Ratios dérivés, arrondis à l’affichage seulement. */
export const caserneDerived = {
  cpm: (r.depense / r.impressions) * 1000,
  coutParTelechargement: r.depense / r.telechargements,
  coutParEssai: r.depense / r.essais,
  tauxEssai: (r.essais / r.telechargements) * 100,
  tauxInstall: (r.telechargements / r.impressions) * 100,
  jour1TauxEssai: (j1.essais / j1.telechargements) * 100,
  jour2TauxEssai: (j2.essais / j2.telechargements) * 100,
  jour1Cpm: (j1.depense / j1.impressions) * 1000,
  jour2Cpm: (j2.depense / j2.impressions) * 1000,
  jour1CoutParTelechargement: j1.depense / j1.telechargements,
  jour2CoutParTelechargement: j2.depense / j2.telechargements,
  jour1CoutParEssai: j1.depense / j1.essais,
  jour2CoutParEssai: j2.depense / j2.essais,
} as const;

const eur = (n: number, d = 2) =>
  n.toLocaleString("fr-FR", { minimumFractionDigits: d, maximumFractionDigits: d }) + " €";
const pct = (n: number, d = 1) =>
  n.toLocaleString("fr-FR", { minimumFractionDigits: d, maximumFractionDigits: d }) + " %";
const num = (n: number) => n.toLocaleString("fr-FR");
const dec = (n: number, d = 2) =>
  n.toLocaleString("fr-FR", { minimumFractionDigits: d, maximumFractionDigits: d });

export const fmt = { eur, pct, num, dec };

/* ------------------------------------------------------------------ */
/* Caserne : KPI de couverture                                          */
/* ------------------------------------------------------------------ */

export const caserneKpis = [
  { n: eur(r.depense, 0), l: "budget dépensé sur 2 jours" },
  { n: num(r.impressions), l: "impressions" },
  { n: num(r.telechargements), l: "téléchargements" },
  { n: num(r.essais), l: "essais gratuits démarrés" },
  { n: eur(caserneDerived.coutParEssai), l: "coût par essai gratuit" },
] as const;

/** Coûts unitaires, calculés à partir des volumes cumulés sur 2 jours. */
export const caserneCouts = [
  { label: "CPM (coût pour mille impressions)", value: eur(caserneDerived.cpm) },
  { label: "Coût par téléchargement", value: eur(caserneDerived.coutParTelechargement) },
  { label: "Coût par essai gratuit démarré", value: eur(caserneDerived.coutParEssai) },
  { label: "Taux téléchargement → essai", value: pct(caserneDerived.tauxEssai, 1) },
] as const;

/** Grand tableau du bilan, jour par jour puis total. */
export const caserneTableJours = {
  head: ["Indicateur", "Jour 1", "Jour 2", "Total"],
  rows: [
    ["Dépense publicitaire", eur(j1.depense, 0), eur(j2.depense, 0), eur(r.depense, 0)],
    ["Impressions", num(j1.impressions), num(j2.impressions), num(r.impressions)],
    ["Téléchargements", num(j1.telechargements), num(j2.telechargements), num(r.telechargements)],
    ["Essais gratuits démarrés", num(j1.essais), num(j2.essais), num(r.essais)],
    [
      "Téléchargement → essai",
      pct(caserneDerived.jour1TauxEssai, 1),
      pct(caserneDerived.jour2TauxEssai, 1),
      pct(caserneDerived.tauxEssai, 1),
    ],
    [
      "Coût par téléchargement",
      eur(caserneDerived.jour1CoutParTelechargement),
      eur(caserneDerived.jour2CoutParTelechargement),
      eur(caserneDerived.coutParTelechargement),
    ],
    [
      "Coût par essai",
      eur(caserneDerived.jour1CoutParEssai),
      eur(caserneDerived.jour2CoutParEssai),
      eur(caserneDerived.coutParEssai),
    ],
  ],
} as const;

/** KPI du Jour 1 seul, coûts unitaires du jour. */
export const caserneJour1Kpis = [
  { label: "Dépense", value: eur(j1.depense, 0) },
  { label: "Impressions", value: num(j1.impressions) },
  { label: "Téléchargements", value: num(j1.telechargements) },
  { label: "Essais gratuits démarrés", value: num(j1.essais) },
  { label: "Téléchargement → essai", value: pct(caserneDerived.jour1TauxEssai, 1) },
  { label: "CPM", value: eur(caserneDerived.jour1Cpm) },
  { label: "Coût par téléchargement", value: eur(caserneDerived.jour1CoutParTelechargement) },
  { label: "Coût par essai", value: eur(caserneDerived.jour1CoutParEssai) },
] as const;

/** KPI du Jour 2 seul. */
export const caserneJour2Kpis = [
  { label: "Dépense", value: eur(j2.depense, 0) },
  { label: "Impressions", value: num(j2.impressions) },
  { label: "Téléchargements", value: num(j2.telechargements) },
  { label: "Essais démarrés", value: num(j2.essais) },
  { label: "Téléchargement → essai", value: pct(caserneDerived.jour2TauxEssai, 1) },
  { label: "CPM", value: eur(caserneDerived.jour2Cpm) },
  { label: "Coût par téléchargement", value: eur(caserneDerived.jour2CoutParTelechargement) },
  { label: "Coût par essai", value: eur(caserneDerived.jour2CoutParEssai) },
] as const;

/** Étapes du tunnel complet sur 2 jours, en valeur absolue et en part de l’étape précédente. */
export const caserneFunnel = [
  {
    label: "Impressions",
    sub: "publicités affichées",
    value: r.impressions,
    display: num(r.impressions),
    ratio: null as string | null,
  },
  {
    label: "Téléchargements",
    sub: "installations de l’application",
    value: r.telechargements,
    display: num(r.telechargements),
    ratio: pct(caserneDerived.tauxInstall, 2) + " des impressions",
  },
  {
    label: "Essais démarrés",
    sub: "abonnements d’essai lancés",
    value: r.essais,
    display: num(r.essais),
    ratio: pct(caserneDerived.tauxEssai, 1) + " des téléchargements",
  },
] as const;

/** Les trois points validés par la campagne. */
export const caserneValide = [
  {
    kicker: "Validé",
    title: "Le marché Pompier répond",
    text: "Avec 27 € de budget, Caserne obtient 32 téléchargements. Sur une audience aussi précise, ce volume en deux jours montre un intérêt réel pour la proposition.",
  },
  {
    kicker: "Validé",
    title: "Les créatives fonctionnent",
    text: "Le CPM reste autour de 5,19 € et le téléchargement autour de 0,84 €. La publicité capte l’attention et déclenche l’installation : ce n’est pas le coût d’entrée qui bloque aujourd’hui.",
  },
  {
    kicker: "Observé",
    title: "Le Jour 2 confirme le Jour 1",
    text: "Le deuxième jour dépense un peu moins (12 € contre 15 €) et livre 6 essais après 8. Les ratios restent du même ordre : la campagne ne s’effondre pas, elle se stabilise.",
  },
] as const;

/** Le décalage identifié entre la publicité et le contenu, étape par étape. */
export const caserneDecalage = [
  {
    b: "Publicité",
    t: "promesse claire et suffisamment forte pour déclencher l’installation.",
  },
  { b: "App Store", t: "l’utilisateur poursuit son parcours." },
  {
    b: "Onboarding",
    t: "aujourd’hui, un peu plus de 4 téléchargements sur 10 vont jusqu’à l’essai.",
  },
  {
    b: "Essai de 3 jours",
    t: "c’est la fenêtre à observer maintenant, avec les 14 essais déjà lancés.",
  },
] as const;

/** Les cinq adaptations à effectuer dans l’application avant la relance. */
export const caserneAdaptations = [
  {
    kicker: "Adaptation 1",
    title: "Contenu davantage adapté au profil",
    text: "L’utilisateur doit retrouver un contenu réellement cohérent avec son objectif et son concours.",
  },
  {
    kicker: "Adaptation 2",
    title: "Meilleure cohérence entre publicité et application",
    text: "Ce qui est montré dans les publicités doit être immédiatement reconnaissable une fois dans Caserne : la continuité entre l’intérêt suscité, le téléchargement et la valeur retrouvée doit être évidente.",
  },
  {
    kicker: "Adaptation 3",
    title: "Première session plus forte",
    text: "Sur 32 téléchargements, 14 essais démarrent. La première session doit donc montrer plus vite pourquoi Caserne aide vraiment : l’essai ne dure que 3 jours.",
  },
  {
    kicker: "Adaptation 4",
    title: "Personnalisation du parcours",
    text: "Le contenu proposé doit donner l’impression que l’application a été construite pour le besoin spécifique de l’utilisateur.",
  },
  {
    kicker: "Adaptation 5",
    title: "Valeur perçue avant la fin de l’essai",
    text: "Avant la fin des trois jours, l’utilisateur doit avoir obtenu suffisamment de valeur concrète pour considérer naturellement le maintien de son abonnement.",
  },
] as const;

/** Lecture complète du funnel : ce qui tient déjà, ce qui reste à améliorer. */
export const caserneLectureFunnel = [
  { label: "Marché Pompier", value: "Validé" },
  { label: "Acquisition Meta Ads", value: "Validée" },
  { label: "Créatives", value: "Validées" },
  { label: "Coût par téléchargement", value: "Très bon (0,84 €)" },
  { label: "Stabilité Jour 1 → Jour 2", value: "Confirmée" },
  { label: "Démarrage de l’essai", value: "Correct (43,8 %), à hausser" },
  { label: "Première session", value: "Levier prioritaire" },
  { label: "Désistement pendant l’essai", value: "Trop tôt pour conclure" },
  { label: "Conversion payante", value: "À mesurer sur les 14 essais" },
] as const;

/** Benchmarks à conserver lors de la relance des campagnes. */
export const caserneKpiReference = [
  { label: "CPM", value: eur(caserneDerived.cpm) },
  { label: "Coût par téléchargement", value: eur(caserneDerived.coutParTelechargement) },
  { label: "Téléchargement → essai", value: pct(caserneDerived.tauxEssai, 1) },
  { label: "Coût par essai", value: eur(caserneDerived.coutParEssai) },
  { label: "Installations / impressions", value: pct(caserneDerived.tauxInstall, 2) },
] as const;

/** Les paliers visés sur le passage téléchargement → essai. */
export const caserneObjectifs = [
  { b: "Première étape", t: "passer de 43,8 % à 50 %" },
  { b: "Puis", t: "viser 55 %" },
  { b: "Et ensuite", t: "tenir 55 à 60 % à budget comparable" },
] as const;

export const caserneFunnelChain =
  "Meta Ads → Téléchargement → Onboarding → Essai gratuit → Abonnement → Rétention";

/** Le tracking complet à suivre lors de la prochaine phase. */
export const caserneTrackingChain =
  "Meta Ads → Téléchargement → Ouverture de Caserne → Choix du concours → Onboarding terminé → Essai gratuit démarré → Première session → Contenu consulté → Retour Jour 1 → Retour Jour 2 → Maintien ou annulation → Abonnement payant → Rétention";

/* ------------------------------------------------------------------ */
/* Médias                                                               */
/* ------------------------------------------------------------------ */
/* Captures issues des fiches App Store. Chacune est placée dans la      */
/* section qu’elle documente plutôt que rassemblée en fin de page.       */

export const caserneMedia = {
  /** Hero : la promesse publicitaire, telle que l’utilisateur la reçoit. */
  promesse: {
    src: "/apps/caserne/shot-1.jpg",
    alt: "Écran d’accueil de Caserne : deviens pompier en 4 mois, 3 jours d’essai gratuit",
    kicker: "Après le clic · la promesse",
    caption:
      "Le premier écran vu par l’utilisateur qui vient de la publicité. Même promesse que les créatives, et l’essai gratuit annoncé dès l’ouverture.",
  },
  /** 07 Acquis : le choix de parcours, première étape de l’onboarding. */
  onboarding: {
    src: "/apps/caserne/shot-2.jpg",
    alt: "Choix du concours dans Caserne : caporal SPP, sergent, pompier de Paris, jeune sapeur-pompier",
    kicker: "Onboarding · choix du concours",
    caption:
      "L’étape qui suit l’installation. Aujourd’hui, un peu plus de 4 téléchargements sur 10 franchissent ce passage jusqu’à l’essai.",
  },
  /** 08 Friction : ce que l’abonnement doit justifier pendant l’essai. */
  valeur: {
    src: "/apps/caserne/shot-4.jpg",
    alt: "Plan personnalisé Caporal SPP dans Caserne : QCM, cours et sous-modules",
    kicker: "Pendant l’essai · la valeur",
    caption:
      "Le plan de préparation débloqué par l’essai. C’est cet écran qui doit justifier l’abonnement avant la fin des 3 jours, et qui fait partie des adaptations à effectuer.",
  },
  /** 12 Adaptations : le quotidien et l’entraînement, à retravailler. */
  quotidien: {
    src: "/apps/caserne/shot-3.jpg",
    alt: "Tableau de bord quotidien de Caserne : objectif du jour et reprise de session",
    kicker: "Quotidien · progression",
    caption: "Objectif du jour, série en cours et reprise de session : le moteur de rétention.",
  },
  entrainement: {
    src: "/apps/caserne/shot-5.jpg",
    alt: "Entraînement dans Caserne : sessions de 5 minutes et outils métier",
    kicker: "Entraînement · outils métier",
    caption:
      "Sessions de 5 minutes et outils de terrain : l’argument qui distingue l’application d’un manuel.",
  },
} as const;

export const caserneGallery = [caserneMedia.quotidien, caserneMedia.entrainement] as const;

export const gdlpMedia = {
  /** Hero : la promesse, base des futures créatives. */
  promesse: {
    src: "/apps/gdlp/shot-1.jpg",
    alt: "Écran d’ouverture de Gardien de la Paix : réussis le concours de gardien de la paix",
    kicker: "Fiche App Store · la promesse",
    caption:
      "L’écran d’ouverture de l’application. C’est ce visuel qui servira de base aux premières créatives publicitaires.",
  },
  /** 03 Produit : le quotidien, identique en logique à Caserne. */
  quotidien: {
    src: "/apps/gdlp/shot-2.jpg",
    alt: "Session quotidienne et QCM officiels dans Gardien de la Paix",
    kicker: "Quotidien · session de 5 minutes",
    caption:
      "Session du jour, QCM officiels corrigés et suivi de progression. Même logique de rétention que Caserne, dans une identité marine et or.",
    wide: true,
  },
} as const;

export const gdlpGallery = [gdlpMedia.quotidien] as const;

/* ------------------------------------------------------------------ */
/* Applications                                                         */
/* ------------------------------------------------------------------ */

export const apps = {
  caserne: {
    key: "caserne",
    nav: "Caserne · Pompier",
    navShort: "Caserne",
    name: "Caserne",
    segment: "Pompier",
    icon: "/apps/caserne/icon.png",
    store: "https://apps.apple.com/dz/app/caserne/id6777746738",
    href: "/caserne",
    tagline: "Préparation aux concours de sapeur-pompier : caporal SPP, sergent, BSPP et JSP.",
  },
  gdlp: {
    key: "gdlp",
    nav: "Gardien de la Paix",
    navShort: "Gardien",
    name: "Gardien de la Paix",
    segment: "Police nationale",
    icon: "/apps/gdlp/icon.png",
    store: "https://apps.apple.com/dz/app/gardien-de-la-paix-concours/id6780648039",
    href: "/gardien-de-la-paix",
    tagline:
      "Préparation au concours de gardien de la paix : QCM officiels, cours et suivi quotidien.",
  },
} as const;

export const navLinks = [apps.caserne, apps.gdlp] as const;

export const reportMeta = {
  ref: "RAPPORT ADS · N° 1",
  periode: "Bilan des 2 premiers jours de diffusion",
  canal: "Meta Ads",
} as const;
