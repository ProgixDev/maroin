import {
  Callout,
  Card,
  CardGrid,
  Funnel,
  Hero,
  Item,
  KpiGrid,
  List,
  P,
  ReportShell,
  Section,
  Shots,
  Split,
  Table,
} from "./shell";
import {
  caserneCouts,
  caserneDerived,
  caserneFunnel,
  caserneFunnelChain,
  caserneGallery,
  caserneKpis,
  caserneMedia,
  caserneQuestions,
  caserneRaw,
  caserneTracking,
  caserneValide,
  fmt,
} from "./content";

const d = caserneDerived;
const r = caserneRaw;

/** Rapport Meta Ads n° 1 pour Caserne, segment Pompier. */
export function CaserneReport() {
  return (
    <ReportShell app="caserne">
      <Hero
        app="caserne"
        title="Le marché Pompier"
        titleAccent="répond."
        sub="Première campagne Meta Ads sur l’audience Pompier. Avec 22 € de dépense publicitaire, les premiers chiffres valident le marché, les créatives et l’onboarding. Le chantier restant se situe après le démarrage de l’essai gratuit."
        art={caserneMedia.promesse}
      >
        <KpiGrid items={caserneKpis} />
      </Hero>

      {/* 01 — ÉTAT DE LA CAMPAGNE */}
      <Section id="etat" num="01 · État" title="État de la campagne">
        <P>
          Campagne <b>active</b> sur l’audience Pompier. Les volumes ci-dessous couvrent la première
          période de diffusion.
        </P>
        <Table
          head={["Indicateur", "Valeur"]}
          rows={[
            { label: "Budget dépensé", value: fmt.eur(r.depense, 0) },
            { label: "Impressions", value: fmt.num(r.impressions) },
            { label: "Téléchargements", value: fmt.num(r.telechargements) },
            { label: "Essais gratuits démarrés", value: fmt.num(r.essais) },
            { label: "Désistements et annulations", value: fmt.num(r.desistements) },
            { label: "Essais toujours actifs", value: fmt.num(d.essaisActifs) },
          ]}
        />
        <P>
          Ces volumes donnent les coûts unitaires suivants, qui sont le vrai juge de paix d’une
          campagne d’acquisition.
        </P>
        <Table head={["Coût unitaire", "Valeur"]} rows={caserneCouts} />
        <Callout icon="✓" variant="ok" title="Une acquisition saine">
          <b>{fmt.eur(d.coutParTelechargement)} par téléchargement</b> et{" "}
          <b>{fmt.eur(d.coutParEssai)} par essai gratuit</b> sur une application d’abonnement : le
          coût d’entrée est faible au regard de la valeur d’un abonné. C’est ce rapport qui rend la
          suite intéressante.
        </Callout>
      </Section>

      {/* 02 — TUNNEL */}
      <Section id="tunnel" num="02 · Tunnel" title="Le tunnel, étape par étape" alt>
        <P>
          De l’impression publicitaire à l’essai encore actif, voici où passent les utilisateurs et
          où ils s’arrêtent.
        </P>
        <Funnel
          steps={caserneFunnel}
          note="Échelle logarithmique : en échelle linéaire, 24 téléchargements face à 3 400 impressions donneraient une barre invisible."
        />
        <P>
          Le passage <b>téléchargement vers essai</b> est le point fort : {fmt.pct(d.tauxEssai)} des
          personnes qui installent l’application démarrent l’essai gratuit. Le passage{" "}
          <b>essai vers essai actif</b> est le point faible : {fmt.pct(d.tauxDesistement)} se
          désistent.
        </P>
      </Section>

      {/* 03 — CE QUI EST VALIDÉ */}
      <Section id="valide" num="03 · Acquis" title="Ce que la campagne valide">
        <Split media={caserneMedia.onboarding}>
          <P>
            Trois éléments sont confirmés par ces premiers chiffres. Ce sont les trois qui coûtent
            habituellement le plus cher à corriger.
          </P>
          <P>
            Le plus visible tient en une capture : l’écran ci-contre est celui que l’utilisateur
            découvre juste après l’installation, et <b>{fmt.pct(d.tauxEssai)}</b> de ceux qui le
            voient vont jusqu’au démarrage de l’essai gratuit.
          </P>
          <P>
            Autrement dit, ni le ciblage, ni le message, ni la première minute d’usage ne sont à
            refaire. Ce sont les trois postes les plus longs à corriger, et ils tiennent déjà.
          </P>
        </Split>
        <CardGrid>
          {caserneValide.map((c) => (
            <Card key={c.title} kicker={c.kicker} title={c.title} variant="ok">
              {c.text}
            </Card>
          ))}
        </CardGrid>
        <Callout icon="✓" variant="ok" title="Marché, créatives, onboarding">
          Sur la campagne Pompier, ces trois maillons fonctionnent. L’effort d’optimisation peut
          donc se concentrer entièrement sur ce qui se passe <b>après</b> le démarrage de l’essai
          gratuit.
        </Callout>
      </Section>

      {/* 04 — POINT D’ATTENTION */}
      <Section id="attention" num="04 · Attention" title="Le principal point d’attention" alt>
        <Split media={caserneMedia.valeur} flip>
          <P>
            Sur les <b>{fmt.num(r.essais)} utilisateurs</b> ayant commencé l’essai gratuit,{" "}
            <b>{fmt.num(r.desistements)} se sont désistés</b>. Cela représente{" "}
            <b>{fmt.pct(d.tauxDesistement)} des essais</b>, soit presque un utilisateur sur deux.
          </P>
          <Callout icon="!" variant="warn" title="Presque un essai sur deux annulé">
            C’est actuellement le principal point à comprendre, et le principal levier
            d’optimisation. Tant que ce taux reste à ce niveau, augmenter le budget publicitaire
            revient à remplir un seau percé.
          </Callout>
          <P>
            L’écran ci-contre est celui qui doit convaincre pendant l’essai, et la fiche App Store
            annonce <b>3 jours</b> : la fenêtre est courte. C’est là que se joue la réponse aux
            questions suivantes.
          </P>
        </Split>
        <List>
          {caserneQuestions.map((q) => (
            <Item key={q}>{q}</Item>
          ))}
        </List>
      </Section>

      {/* 05 — PROCHAINE ÉTAPE : DATA */}
      <Section id="data" num="05 · Suite" title="Prochaine étape : continuer à récolter de la data">
        <P>
          La campagne Pompier continue afin d’augmenter le volume de données et de confirmer les
          premiers résultats. La priorité sera surtout d’aller chercher la raison derrière les
          annulations.
        </P>
        <P>
          Nous devons comprendre{" "}
          <b>pourquoi ces utilisateurs ont commencé l’essai gratuit, puis décidé de se désister</b>.
          L’objectif est de récupérer davantage de reviews et de feedbacks utilisateurs afin
          d’identifier précisément les points de friction.
        </P>
      </Section>

      {/* 06 — TRACKING */}
      <Section
        id="tracking"
        num="06 · Tracking"
        title="Prochaine étape : tracking et analytics"
        alt
      >
        <P>
          Nous allons organiser un meeting ensemble pour mettre en place une lecture complète du
          business. Pendant ce meeting :
        </P>
        <List>
          {caserneTracking.map((t) => (
            <Item key={t.b}>
              <b>{t.b}</b>
              {t.t}
            </Item>
          ))}
        </List>
        <Callout icon="→" title="L’objectif : suivre le parcours de bout en bout">
          {caserneFunnelChain}
        </Callout>
      </Section>

      {/* 07 — CONCLUSION */}
      <Section id="conclusion" num="07 · Conclusion" title="Conclusion">
        <P>
          Les premiers résultats de la campagne Caserne Pompier sont très encourageants. Avec
          seulement <b>{fmt.eur(r.depense, 0)}</b> de dépense publicitaire, les premières données
          permettent déjà de valider plusieurs éléments.
        </P>
        <List>
          <Item>
            <b>Le marché Pompier répond.</b>
          </Item>
          <Item>
            <b>Les publicités fonctionnent.</b>
          </Item>
          <Item>
            <b>Les créatives fonctionnent.</b>
          </Item>
          <Item>
            <b>Plus de 70 % des téléchargements passent à l’essai gratuit.</b>
          </Item>
        </List>
        <Callout icon="→" title="Le chantier suivant">
          Comprendre et améliorer la rétention après le démarrage de l’essai gratuit. C’est là que
          se joue la conversion en abonnés payants.
        </Callout>
      </Section>

      {/* 08 — L’APPLICATION */}
      <Section id="app" num="08 · Produit" title="L’application derrière la campagne" alt>
        <P>
          Ce que voient les utilisateurs une fois passé l’onboarding. La cohérence entre la promesse
          publicitaire et ces écrans fait partie des pistes à examiner sur les désistements.
        </P>
        <Shots items={caserneGallery} />
      </Section>
    </ReportShell>
  );
}
