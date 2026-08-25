/**
 * Données des rapports Meta Ads. Les chiffres bruts viennent du client ; les
 * ratios sont dérivés ici pour qu’ils restent cohérents entre les sections.
 *
 * Typographie française (’ « » …). Pas de tiret cadratin dans le texte visible.
 */

/* ------------------------------------------------------------------ */
/* Chiffres bruts de la campagne Caserne — Pompier                      */
/* ------------------------------------------------------------------ */

export const caserneRaw = {
  depense: 22,
  impressions: 3400,
  telechargements: 24,
  essais: 17,
  desistements: 8,
} as const;

const r = caserneRaw;

/** Ratios dérivés, arrondis à l’affichage seulement. */
export const caserneDerived = {
  cpm: (r.depense / r.impressions) * 1000,
  coutParTelechargement: r.depense / r.telechargements,
  coutParEssai: r.depense / r.essais,
  tauxEssai: (r.essais / r.telechargements) * 100,
  tauxDesistement: (r.desistements / r.essais) * 100,
  essaisActifs: r.essais - r.desistements,
} as const;

const eur = (n: number, d = 2) =>
  n.toLocaleString("fr-FR", { minimumFractionDigits: d, maximumFractionDigits: d }) + " €";
const pct = (n: number, d = 1) =>
  n.toLocaleString("fr-FR", { minimumFractionDigits: d, maximumFractionDigits: d }) + " %";
const num = (n: number) => n.toLocaleString("fr-FR");

export const fmt = { eur, pct, num };

/* ------------------------------------------------------------------ */
/* Caserne : KPI de couverture                                          */
/* ------------------------------------------------------------------ */

export const caserneKpis = [
  { n: eur(r.depense, 0), l: "budget dépensé" },
  { n: num(r.impressions), l: "impressions" },
  { n: num(r.telechargements), l: "téléchargements" },
  { n: num(r.essais), l: "essais gratuits démarrés" },
  { n: num(caserneDerived.essaisActifs), l: "essais toujours actifs" },
] as const;

/** Coûts unitaires, calculés à partir des volumes bruts. */
export const caserneCouts = [
  { label: "CPM (coût pour mille impressions)", value: eur(caserneDerived.cpm) },
  { label: "Coût par téléchargement", value: eur(caserneDerived.coutParTelechargement) },
  { label: "Coût par essai gratuit démarré", value: eur(caserneDerived.coutParEssai) },
] as const;

/** Étapes du tunnel, en valeur absolue et en part de l’étape précédente. */
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
    ratio: pct((r.telechargements / r.impressions) * 100, 2) + " des impressions",
  },
  {
    label: "Essais démarrés",
    sub: "abonnements d’essai lancés",
    value: r.essais,
    display: num(r.essais),
    ratio: pct(caserneDerived.tauxEssai) + " des téléchargements",
  },
  {
    label: "Essais actifs",
    sub: "après désistements",
    value: caserneDerived.essaisActifs,
    display: num(caserneDerived.essaisActifs),
    ratio: pct(100 - caserneDerived.tauxDesistement) + " des essais",
  },
] as const;

/** Les trois points validés par la campagne. */
export const caserneValide = [
  {
    kicker: "Validé",
    title: "Le marché Pompier répond",
    text: "Avec seulement 22 € dépensés, nous avons déjà généré 24 téléchargements. L’offre suscite assez d’intérêt pour pousser les utilisateurs ciblés à installer l’application.",
  },
  {
    kicker: "Validé",
    title: "Acquisition et créatives",
    text: "Les CPM sont bons et les utilisateurs regardent les vidéos. Les créatives captent l’attention, génèrent de l’intérêt et transforment cet intérêt en téléchargement. Sur l’audience Pompier, l’angle marketing est validé.",
  },
  {
    kicker: "Validé",
    title: "Onboarding très performant",
    text: "Sur 24 utilisateurs ayant téléchargé l’application, 17 ont démarré l’essai gratuit. Plus de 70 % des personnes qui téléchargent passent à l’action.",
  },
] as const;

/** Les questions ouvertes derrière les désistements. */
export const caserneQuestions = [
  "L’application fournit-elle suffisamment de valeur ajoutée aux utilisateurs ?",
  "L’expérience est-elle réellement adaptée à la réalité du terrain ?",
  "La promesse publicitaire correspond-elle à ce que l’utilisateur découvre dans l’application ?",
  "La valeur de l’abonnement est-elle comprise assez rapidement ?",
  "Existe-t-il une friction spécifique après le démarrage de l’essai gratuit ?",
] as const;

/** Ce que le meeting tracking doit mettre en place. */
export const caserneTracking = [
  { b: "RevenueCat", t: " : accès et accompagnement à la lecture des abonnements" },
  { b: "Stripe", t: " : accès et lecture des encaissements" },
  { b: "Analytics de l’application", t: " : récupération des accès" },
  { b: "Funnel complet", t: " : centralisation des données de bout en bout" },
] as const;

export const caserneFunnelChain =
  "Meta Ads → Téléchargement → Onboarding → Essai gratuit → Abonnement → Rétention";

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
  /** 03 Acquis : le choix de parcours, première étape de l’onboarding. */
  onboarding: {
    src: "/apps/caserne/shot-2.jpg",
    alt: "Choix du concours dans Caserne : caporal SPP, sergent, pompier de Paris, jeune sapeur-pompier",
    kicker: "Onboarding · choix du concours",
    caption:
      "L’étape qui suit l’installation. C’est ce passage que 7 utilisateurs sur 10 franchissent jusqu’au démarrage de l’essai.",
  },
  /** 04 Attention : ce que l’abonnement doit justifier pendant l’essai. */
  valeur: {
    src: "/apps/caserne/shot-4.jpg",
    alt: "Plan personnalisé Caporal SPP dans Caserne : QCM, cours et sous-modules",
    kicker: "Pendant l’essai · la valeur",
    caption:
      "Le plan de préparation débloqué par l’essai. C’est cet écran qui doit justifier l’abonnement avant la fin de la période gratuite.",
  },
  /** 08 Produit : le quotidien et l’entraînement. */
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
  periode: "Première période de diffusion",
  canal: "Meta Ads",
} as const;
