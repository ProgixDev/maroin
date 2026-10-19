/**
 * Données des rapports Meta Ads. Les chiffres bruts viennent du client ; les
 * ratios sont dérivés ici pour qu’ils restent cohérents entre les sections.
 *
 * Typographie française (’ « » …). Pas de tiret cadratin dans le texte visible.
 */

/* ------------------------------------------------------------------ */
/* Chiffres bruts de la campagne Caserne — Pompier, sur 5 jours          */
/* ------------------------------------------------------------------ */

export const caserneJours = [
  { label: "Jour 1", depense: 15, impressions: 2889, telechargements: 18, essais: 8 },
  { label: "Jour 2", depense: 12, impressions: 2311, telechargements: 14, essais: 6 },
  { label: "Jour 3", depense: 24.5, impressions: 4719, telechargements: 29, essais: 13 },
  { label: "Jour 4", depense: 25.81, impressions: 4973, telechargements: 31, essais: 14 },
  { label: "Jour 5", depense: 26, impressions: 5009, telechargements: 30, essais: 13 },
] as const;

export const caserneRaw = {
  depense: 103.31,
  impressions: 19901,
  telechargements: 122,
  essais: 54,
  abonnements: 4,
  prixAbonnement: 4.99,
  essaisCohorteJ1J2: 14,
} as const;

const r = caserneRaw;

type Jour = (typeof caserneJours)[number];

function statsJour(j: Jour) {
  return {
    tauxEssai: (j.essais / j.telechargements) * 100,
    cpm: (j.depense / j.impressions) * 1000,
    coutParTelechargement: j.depense / j.telechargements,
    coutParEssai: j.depense / j.essais,
  };
}

const joursStats = caserneJours.map(statsJour);

function cumulJusqua(n: number) {
  const slice = caserneJours.slice(0, n);
  return {
    jours: n,
    heures: n * 24,
    depense: slice.reduce((a, j) => a + j.depense, 0),
    telechargements: slice.reduce((a, j) => a + j.telechargements, 0),
    essais: slice.reduce((a, j) => a + j.essais, 0),
  };
}

export const caserneCumuls = [2, 3, 4, 5].map(cumulJusqua);

/** Ratios dérivés, arrondis à l’affichage seulement. */
export const caserneDerived = {
  cpm: (r.depense / r.impressions) * 1000,
  coutParTelechargement: r.depense / r.telechargements,
  coutParEssai: r.depense / r.essais,
  tauxEssai: (r.essais / r.telechargements) * 100,
  tauxInstall: (r.telechargements / r.impressions) * 100,
  jours: joursStats,
  jour1TauxEssai: joursStats[0].tauxEssai,
  jour2TauxEssai: joursStats[1].tauxEssai,
  jour1CoutParEssai: joursStats[0].coutParEssai,
  revenuMensuel: r.abonnements * r.prixAbonnement,
  coutParAbonne: r.depense / r.abonnements,
  tauxConversionCohorte: (r.abonnements / r.essaisCohorteJ1J2) * 100,
  essaisEnCours: r.essais - r.essaisCohorteJ1J2,
  ecartPremierMois: r.abonnements * r.prixAbonnement - r.depense,
} as const;

const eur = (n: number, d = 2) =>
  n.toLocaleString("fr-FR", { minimumFractionDigits: d, maximumFractionDigits: d }) + " €";
const pct = (n: number, d = 1) =>
  n.toLocaleString("fr-FR", { minimumFractionDigits: d, maximumFractionDigits: d }) + " %";
const num = (n: number) => n.toLocaleString("fr-FR");
const dec = (n: number, d = 2) =>
  n.toLocaleString("fr-FR", { minimumFractionDigits: d, maximumFractionDigits: d });

export const fmt = { eur, pct, num, dec };

const eurAmt = (n: number) => (Number.isInteger(n) ? eur(n, 0) : eur(n, 2));

function kpisJour(i: number, essaisLabel: string) {
  const j = caserneJours[i];
  const st = joursStats[i];
  return [
    { label: "Dépense", value: eurAmt(j.depense) },
    { label: "Impressions", value: num(j.impressions) },
    { label: "Téléchargements", value: num(j.telechargements) },
    { label: essaisLabel, value: num(j.essais) },
    { label: "Téléchargement → essai", value: pct(st.tauxEssai, 1) },
    { label: "CPM", value: eur(st.cpm) },
    { label: "Coût par téléchargement", value: eur(st.coutParTelechargement) },
    { label: "Coût par essai", value: eur(st.coutParEssai) },
  ];
}

/* ------------------------------------------------------------------ */
/* Caserne : KPI de couverture                                          */
/* ------------------------------------------------------------------ */

export const caserneKpis = [
  { n: eurAmt(r.depense), l: "budget dépensé sur 5 jours" },
  { n: num(r.impressions), l: "impressions" },
  { n: num(r.telechargements), l: "téléchargements" },
  { n: num(r.essais), l: "essais gratuits démarrés" },
  { n: num(r.abonnements), l: "abonnements payants" },
  { n: eur(caserneDerived.coutParEssai), l: "coût par essai gratuit" },
  { n: eur(caserneDerived.coutParAbonne), l: "coût par abonnement payant" },
  { n: eur(caserneDerived.revenuMensuel), l: "revenus mensuels générés" },
] as const;

/** Coûts unitaires, calculés à partir des volumes cumulés sur 5 jours. */
export const caserneCouts = [
  { label: "CPM (coût pour mille impressions)", value: eur(caserneDerived.cpm) },
  { label: "Coût par téléchargement", value: eur(caserneDerived.coutParTelechargement) },
  { label: "Coût par essai gratuit démarré", value: eur(caserneDerived.coutParEssai) },
  { label: "Taux téléchargement → essai", value: pct(caserneDerived.tauxEssai, 1) },
  {
    label: "Coût publicitaire par abonné payant acquis à ce stade",
    value: eur(caserneDerived.coutParAbonne),
  },
  {
    label: "Taux essai → abonnement, cohorte J1-J2",
    value: pct(caserneDerived.tauxConversionCohorte, 1),
  },
] as const;

/** Grand tableau du bilan, jour par jour puis total. */
export const caserneTableJours = {
  head: ["Indicateur", "Jour 1", "Jour 2", "Jour 3", "Jour 4", "Jour 5", "Total"],
  rows: [
    ["Dépense publicitaire", ...caserneJours.map((j) => eurAmt(j.depense)), eurAmt(r.depense)],
    ["Impressions", ...caserneJours.map((j) => num(j.impressions)), num(r.impressions)],
    ["Téléchargements", ...caserneJours.map((j) => num(j.telechargements)), num(r.telechargements)],
    ["Essais gratuits démarrés", ...caserneJours.map((j) => num(j.essais)), num(r.essais)],
    [
      "Téléchargement → essai",
      ...joursStats.map((st) => pct(st.tauxEssai, 1)),
      pct(caserneDerived.tauxEssai, 1),
    ],
    [
      "Coût par téléchargement",
      ...joursStats.map((st) => eur(st.coutParTelechargement)),
      eur(caserneDerived.coutParTelechargement),
    ],
    [
      "Coût par essai",
      ...joursStats.map((st) => eur(st.coutParEssai)),
      eur(caserneDerived.coutParEssai),
    ],
  ],
} as const;

export const caserneJour1Kpis = kpisJour(0, "Essais gratuits démarrés");
export const caserneJour2Kpis = kpisJour(1, "Essais démarrés");
export const caserneJour3Kpis = kpisJour(2, "Essais démarrés");
export const caserneJour4Kpis = kpisJour(3, "Essais démarrés");
export const caserneJour5Kpis = kpisJour(4, "Essais démarrés");

/** Étapes du tunnel complet sur 5 jours, en valeur absolue et en part de l’étape précédente. */
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
  {
    label: "Abonnements payants",
    sub: "conversions de la cohorte J1-J2",
    value: r.abonnements,
    display: num(r.abonnements),
    ratio: pct(caserneDerived.tauxConversionCohorte, 1) + " des 14 essais des deux premiers jours",
  },
] as const;

export const caserneMonetisation = [
  { label: "Prix de l’abonnement mensuel", value: eur(r.prixAbonnement) },
  { label: "Essais gratuits J1-J2", value: num(r.essaisCohorteJ1J2) },
  { label: "Abonnements payants acquis", value: num(r.abonnements) },
  {
    label: "Conversion essai → abonnement J1-J2",
    value: pct(caserneDerived.tauxConversionCohorte, 1),
  },
  { label: "Revenus mensuels récurrents bruts", value: eur(caserneDerived.revenuMensuel) },
  { label: "Dépenses publicitaires cumulées", value: eurAmt(r.depense) },
  {
    label: "Coût publicitaire par abonné payant acquis à ce stade",
    value: eur(caserneDerived.coutParAbonne),
  },
  {
    label: "Écart revenus du premier mois – dépenses Ads",
    value: eur(caserneDerived.ecartPremierMois),
  },
] as const;

export const caserneRentabilite = {
  head: ["Scénario", "Abonnés payants totaux", "Revenus mensuels bruts"],
  rows: [
    ["Situation simulée actuelle", "4", eur(4 * r.prixAbonnement)],
    ["+ 8 conversions supplémentaires", "12", eur(12 * r.prixAbonnement)],
    ["+ 11 conversions supplémentaires", "15", eur(15 * r.prixAbonnement)],
    ["+ 12 conversions supplémentaires", "16", eur(16 * r.prixAbonnement)],
    ["+ 17 conversions supplémentaires", "21", eur(21 * r.prixAbonnement)],
  ],
} as const;

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
  periode: "Bilan des 5 premiers jours de diffusion",
  canal: "Meta Ads",
} as const;
