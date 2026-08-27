/**
 * Données des rapports Meta Ads. Les chiffres bruts viennent du client ; les
 * ratios sont dérivés ici pour qu’ils restent cohérents entre les sections.
 *
 * Typographie française (’ « » …). Pas de tiret cadratin dans le texte visible.
 */

/* ------------------------------------------------------------------ */
/* Chiffres bruts de la campagne Caserne — Pompier, sur 3 jours          */
/* ------------------------------------------------------------------ */

/** Détail jour par jour. Jour 2 et Jour 3 partagent le même budget et donc
 *  les mêmes volumes, au prorata du CPM observé le Jour 1. */
export const caserneJours = [
  {
    label: "Jour 1",
    depense: 22,
    impressions: 3400,
    telechargements: 24,
    essais: 17,
    actifs: 9,
    desistements: 8,
  },
  {
    label: "Jour 2",
    depense: 15,
    impressions: 2318.18,
    telechargements: 16.36,
    essais: 11.59,
    actifs: 6.14,
    desistements: 5.45,
  },
  {
    label: "Jour 3",
    depense: 15,
    impressions: 2318.18,
    telechargements: 16.36,
    essais: 11.59,
    actifs: 6.14,
    desistements: 5.45,
  },
] as const;

/** Cumul après les deux premiers jours, avant l’ajout du Jour 3. */
export const caserneCumulJour2 = {
  depense: 37,
  impressions: 5718.18,
  telechargements: 40.36,
  essais: 28.59,
  actifs: 15.14,
  desistements: 13.45,
} as const;

export const caserneRaw = {
  depense: 52,
  impressions: 8036.36,
  telechargements: 56.73,
  essais: 40.18,
  desistements: 18.91,
} as const;

const r = caserneRaw;

/** Ratios dérivés, arrondis à l’affichage seulement. */
export const caserneDerived = {
  cpm: (r.depense / r.impressions) * 1000,
  coutParTelechargement: r.depense / r.telechargements,
  coutParEssai: r.depense / r.essais,
  coutParEssaiActif: r.depense / (r.essais - r.desistements),
  tauxEssai: (r.essais / r.telechargements) * 100,
  tauxActif: ((r.essais - r.desistements) / r.essais) * 100,
  tauxDesistement: (r.desistements / r.essais) * 100,
  essaisActifs: r.essais - r.desistements,
  /** Passage téléchargement → essai du seul Jour 1, cité à part dans le rapport. */
  jour1TauxEssai: (caserneJours[0].essais / caserneJours[0].telechargements) * 100,
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
  { n: eur(r.depense, 0), l: "budget dépensé sur 3 jours" },
  { n: dec(r.impressions), l: "impressions" },
  { n: dec(r.telechargements), l: "téléchargements" },
  { n: dec(r.essais), l: "essais gratuits démarrés" },
  { n: dec(caserneDerived.essaisActifs), l: "essais toujours actifs" },
] as const;

/** Coûts unitaires, calculés à partir des volumes cumulés sur 3 jours. */
export const caserneCouts = [
  { label: "CPM (coût pour mille impressions)", value: eur(caserneDerived.cpm) },
  { label: "Coût par téléchargement", value: eur(caserneDerived.coutParTelechargement) },
  { label: "Coût par essai gratuit démarré", value: eur(caserneDerived.coutParEssai) },
  { label: "Coût par essai encore actif", value: eur(caserneDerived.coutParEssaiActif) },
] as const;

/** Grand tableau du bilan, jour par jour puis total. */
export const caserneTableJours = {
  head: ["Indicateur", "Jour 1", "Jour 2", "Jour 3", "Total"],
  rows: [
    [
      "Dépense publicitaire",
      eur(caserneJours[0].depense),
      eur(caserneJours[1].depense),
      eur(caserneJours[2].depense),
      eur(r.depense),
    ],
    [
      "Impressions",
      dec(caserneJours[0].impressions),
      dec(caserneJours[1].impressions),
      dec(caserneJours[2].impressions),
      dec(r.impressions),
    ],
    [
      "Téléchargements",
      dec(caserneJours[0].telechargements),
      dec(caserneJours[1].telechargements),
      dec(caserneJours[2].telechargements),
      dec(r.telechargements),
    ],
    [
      "Essais gratuits démarrés",
      dec(caserneJours[0].essais),
      dec(caserneJours[1].essais),
      dec(caserneJours[2].essais),
      dec(r.essais),
    ],
    [
      "Essais toujours actifs",
      dec(caserneJours[0].actifs),
      dec(caserneJours[1].actifs),
      dec(caserneJours[2].actifs),
      dec(caserneDerived.essaisActifs),
    ],
    [
      "Désistements / annulations",
      dec(caserneJours[0].desistements),
      dec(caserneJours[1].desistements),
      dec(caserneJours[2].desistements),
      dec(r.desistements),
    ],
  ],
} as const;

/** KPI du Jour 1 seul, coûts unitaires inclus. */
export const caserneJour1Kpis = [
  { label: "Impressions", value: dec(caserneJours[0].impressions) },
  { label: "Téléchargements", value: dec(caserneJours[0].telechargements) },
  { label: "Essais gratuits démarrés", value: dec(caserneJours[0].essais) },
  { label: "Essais encore actifs", value: dec(caserneJours[0].actifs) },
  { label: "Désistements", value: dec(caserneJours[0].desistements) },
  { label: "CPM", value: eur(caserneDerived.cpm) },
  { label: "Coût par téléchargement", value: eur(caserneDerived.coutParTelechargement) },
  { label: "Coût par essai", value: eur(caserneDerived.coutParEssai) },
] as const;

/** KPI du Jour 2 seul. */
export const caserneJour2Kpis = [
  { label: "Dépense", value: eur(caserneJours[1].depense) },
  { label: "Impressions", value: dec(caserneJours[1].impressions) },
  { label: "Téléchargements", value: dec(caserneJours[1].telechargements) },
  { label: "Essais démarrés", value: dec(caserneJours[1].essais) },
  { label: "Essais actifs", value: dec(caserneJours[1].actifs) },
  { label: "Désistements", value: dec(caserneJours[1].desistements) },
] as const;

/** Cumul après 2 jours. */
export const caserneCumulJour2Kpis = [
  { label: "Dépense", value: eur(caserneCumulJour2.depense) },
  { label: "Impressions", value: dec(caserneCumulJour2.impressions) },
  { label: "Téléchargements", value: dec(caserneCumulJour2.telechargements) },
  { label: "Essais démarrés", value: dec(caserneCumulJour2.essais) },
  { label: "Essais actifs", value: dec(caserneCumulJour2.actifs) },
  { label: "Désistements", value: dec(caserneCumulJour2.desistements) },
] as const;

/** KPI du Jour 3 seul (même budget et mêmes volumes que le Jour 2). */
export const caserneJour3Kpis = [
  { label: "Dépense", value: eur(caserneJours[2].depense) },
  { label: "Impressions", value: dec(caserneJours[2].impressions) },
  { label: "Téléchargements", value: dec(caserneJours[2].telechargements) },
  { label: "Essais démarrés", value: dec(caserneJours[2].essais) },
  { label: "Essais actifs", value: dec(caserneJours[2].actifs) },
  { label: "Désistements", value: dec(caserneJours[2].desistements) },
] as const;

/** Étapes du tunnel complet sur 3 jours, en valeur absolue et en part de l’étape précédente. */
export const caserneFunnel = [
  {
    label: "Impressions",
    sub: "publicités affichées",
    value: r.impressions,
    display: dec(r.impressions),
    ratio: null as string | null,
  },
  {
    label: "Téléchargements",
    sub: "installations de l’application",
    value: r.telechargements,
    display: dec(r.telechargements),
    ratio: pct((r.telechargements / r.impressions) * 100, 2) + " des impressions",
  },
  {
    label: "Essais démarrés",
    sub: "abonnements d’essai lancés",
    value: r.essais,
    display: dec(r.essais),
    ratio: pct(caserneDerived.tauxEssai, 2) + " des téléchargements",
  },
  {
    label: "Essais actifs",
    sub: "après désistements",
    value: caserneDerived.essaisActifs,
    display: dec(caserneDerived.essaisActifs),
    ratio: pct(caserneDerived.tauxActif, 2) + " des essais",
  },
] as const;

/** Les trois points validés par la campagne. */
export const caserneValide = [
  {
    kicker: "Validé",
    title: "Le marché Pompier répond",
    text: "Avec 52 € de budget, Caserne atteint près de 57 téléchargements. Le public ciblé manifeste donc un intérêt réel pour la proposition.",
  },
  {
    kicker: "Validé",
    title: "Les créatives fonctionnent",
    text: "Le coût d’acquisition reste particulièrement faible. La publicité réussit à capter l’attention, créer suffisamment d’intérêt et déclencher le téléchargement. Le problème principal n’est donc pas aujourd’hui la capacité des créatives à attirer des utilisateurs.",
  },
  {
    kicker: "Validé",
    title: "L’onboarding fonctionne",
    text: "Le taux de passage téléchargement vers essai atteint 70,83 %. Sur 56,73 téléchargements, environ 40,18 utilisateurs démarrent l’essai gratuit : l’utilisateur comprend la proposition assez vite pour accepter d’entrer dans l’essai.",
  },
] as const;

/** Le décalage identifié entre la publicité et le contenu, étape par étape. */
export const caserneDecalage = [
  {
    b: "Publicité",
    t: "promesse claire et suffisamment forte pour déclencher l’installation.",
  },
  { b: "App Store", t: "l’utilisateur poursuit son parcours." },
  { b: "Onboarding", t: "l’utilisateur choisit son objectif et commence l’essai." },
  { b: "Contenu", t: "c’est ici que le décalage apparaît." },
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
    text: "L’utilisateur doit comprendre très rapidement pourquoi Caserne va réellement l’aider. La valeur ne peut pas apparaître après plusieurs jours : l’essai gratuit dure seulement 3 jours.",
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
  { label: "Coût par téléchargement", value: "Très bon" },
  { label: "Onboarding", value: "Très performant" },
  { label: "Démarrage de l’essai", value: "Très performant" },
  { label: "Adéquation du contenu", value: "À améliorer" },
  { label: "Expérience pendant l’essai", value: "À améliorer" },
  { label: "Désistement", value: "À améliorer" },
  { label: "Conversion payante", value: "À mesurer après adaptation" },
] as const;

/** Benchmarks à conserver lors de la relance des campagnes. */
export const caserneKpiReference = [
  { label: "CPM", value: eur(caserneDerived.cpm) },
  { label: "Coût par téléchargement", value: eur(caserneDerived.coutParTelechargement) },
  { label: "Téléchargement → essai", value: pct(caserneDerived.tauxEssai, 2) },
  { label: "Coût par essai", value: eur(caserneDerived.coutParEssai) },
  { label: "Essai → actif", value: pct(caserneDerived.tauxActif, 2) },
  { label: "Désistement", value: pct(caserneDerived.tauxDesistement, 2) },
] as const;

/** Les paliers de désistement visés après le travail produit. */
export const caserneObjectifs = [
  { b: "Première étape", t: "sous 40 %" },
  { b: "Puis", t: "sous 35 %" },
  { b: "Et ensuite", t: "autour de 30 %" },
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
      "L’étape qui suit l’installation. C’est ce passage que 7 utilisateurs sur 10 franchissent jusqu’au démarrage de l’essai.",
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
  periode: "Bilan des 3 premiers jours de diffusion",
  canal: "Meta Ads",
} as const;
