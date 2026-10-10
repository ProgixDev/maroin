import {
  Callout,
  Funnel,
  Hero,
  Item,
  KpiGrid,
  List,
  P,
  ReportShell,
  Section,
  Table,
  TableMulti,
} from "./shell";
import {
  caserneCouts,
  caserneDerived,
  caserneFunnel,
  caserneJour1Kpis,
  caserneJour2Kpis,
  caserneJours,
  caserneKpis,
  caserneRaw,
  caserneTableJours,
  fmt,
} from "./content";

const d = caserneDerived;
const r = caserneRaw;
const j1 = caserneJours[0];
const j2 = caserneJours[1];

/** Bilan des 2 premiers jours de campagne Meta Ads pour Caserne, segment Pompier. */
export function CaserneReport() {
  return (
    <ReportShell app="caserne">
      <Hero app="caserne">
        <KpiGrid items={caserneKpis} />
      </Hero>

      <Section id="resultats" num="01 · Résultats" title="Résultats sur les 2 jours">
        <P>
          La première phase d’acquisition Meta Ads de Caserne sur l’audience Pompier s’est déroulée
          sur 2 jours. Elle a suffi à confirmer que le marché répond et que les publicités
          installent l’application à un coût très bas : <b>{fmt.eur(r.depense, 0)}</b> pour{" "}
          <b>{fmt.num(r.impressions)} impressions</b>,{" "}
          <b>{fmt.num(r.telechargements)} téléchargements</b> et{" "}
          <b>{fmt.num(r.essais)} essais gratuits</b>.
        </P>
        <P>
          Le signal n’est pas encore un verdict produit complet : l’essai gratuit dure 3 jours, et
          nous n’avons que 2 jours de diffusion. En revanche, le haut du funnel est déjà lisible. Un
          téléchargement revient à <b>{fmt.eur(d.coutParTelechargement)}</b>, un essai à{" "}
          <b>{fmt.eur(d.coutParEssai)}</b>. Parmi ceux qui installent,{" "}
          <b>{fmt.pct(d.tauxEssai, 1)}</b> démarrent l’essai : c’est correct, mais c’est aussi le
          premier chiffre à faire monter avant d’augmenter le budget.
        </P>
        <TableMulti head={caserneTableJours.head} rows={caserneTableJours.rows} />
        <List>
          <Item>
            Après 2 jours, <b>{fmt.eur(r.depense, 0)} dépensés</b>
          </Item>
          <Item>
            <b>{fmt.num(r.impressions)} impressions</b>
          </Item>
          <Item>
            <b>{fmt.num(r.telechargements)} téléchargements</b>
          </Item>
          <Item>
            <b>{fmt.num(r.essais)} essais gratuits</b> : {j1.essais} le Jour 1, {j2.essais} le Jour
            2
          </Item>
        </List>
      </Section>

      <Section id="jour1" num="02 · Jour 1" title="Jour 1" alt>
        <P>
          La première journée pose tout de suite le niveau :{" "}
          <b>{fmt.eur(j1.depense, 0)} dépensés</b>, <b>{fmt.num(j1.impressions)} impressions</b>,{" "}
          <b>{fmt.num(j1.telechargements)} téléchargements</b> et{" "}
          <b>{fmt.num(j1.essais)} essais gratuits</b>.
        </P>
        <Table head={["KPI", "Valeur"]} rows={caserneJour1Kpis} />
        <Callout
          icon="✓"
          variant="ok"
          title={`${fmt.pct(d.jour1TauxEssai, 1)} téléchargement → essai`}
        >
          Sur {j1.telechargements} personnes qui téléchargent Caserne, {j1.essais} démarrent
          l’essai. Dès le premier jour, le trafic n’est pas seulement curieux : une part réelle
          passe à l’action, pour <b>{fmt.eur(d.jour1CoutParEssai)}</b> par essai.
        </Callout>
      </Section>

      <Section id="jour2" num="03 · Jour 2" title="Jour 2">
        <P>
          Le Jour 2 dépense un peu moins : <b>{fmt.eur(j2.depense, 0)}</b>. Les volumes baissent
          presque dans la même proportion, ce qui est sain :{" "}
          <b>{fmt.num(j2.impressions)} impressions</b>,{" "}
          <b>{fmt.num(j2.telechargements)} téléchargements</b>, <b>{fmt.num(j2.essais)} essais</b>.
        </P>
        <Table head={["KPI Jour 2", "Valeur"]} rows={caserneJour2Kpis} />
        <P>
          Le taux d’essai reste du même ordre (<b>{fmt.pct(d.jour2TauxEssai, 1)}</b> après{" "}
          <b>{fmt.pct(d.jour1TauxEssai, 1)}</b> la veille). Le coût par téléchargement reste sous 1
          €. La campagne ne s’essouffle pas : elle livre un deuxième jour comparable, avec un budget
          légèrement plus bas.
        </P>
        <Callout icon="i" title="Lecture du cumul">
          En 48 heures, <b>{fmt.eur(r.depense, 0)}</b> ont déjà produit{" "}
          <b>{fmt.num(r.telechargements)} téléchargements</b> et <b>{fmt.num(r.essais)} essais</b>.
          C’est assez pour juger l’acquisition, pas encore assez pour juger la conversion payante.
        </Callout>
      </Section>

      <Section id="funnel" num="04 · Funnel" title="Funnel complet des 2 jours" alt>
        <Funnel
          steps={caserneFunnel}
          note="Échelle logarithmique : en échelle linéaire, les téléchargements face aux impressions donneraient une barre invisible."
        />
        <P>
          Le premier filtre est classique : {fmt.num(r.impressions)} impressions pour{" "}
          {fmt.num(r.telechargements)} installations, soit{" "}
          <b>{fmt.pct(d.tauxInstall, 2)} des impressions</b>. Le second filtre est le plus utile ici
          : <b>{fmt.pct(d.tauxEssai, 1)} des téléchargements</b> lancent l’essai. 18 personnes
          installent sans démarrer l’essai : c’est la marge de progression la plus claire, avant
          même de parler d’abonnement.
        </P>
      </Section>

      <Section id="couts" num="05 · Coûts" title="Coûts d’acquisition">
        <P>
          À ce niveau de dépense, chaque euro travaille. Les coûts unitaires laissent une vraie
          marge si une partie des 14 essais se transforme ensuite en abonnés.
        </P>
        <Table head={["KPI", "Valeur"]} rows={caserneCouts} />
        <Callout icon="✓" variant="ok" title="Une acquisition saine">
          <b>{fmt.eur(d.coutParEssai)}</b> pour faire entrer quelqu’un dans l’essai, et{" "}
          <b>{fmt.eur(d.coutParTelechargement)}</b> par téléchargement. Pour un abonnement, ce coût
          d’entrée est bas. Il ne faut pas le gâcher en scalant trop tôt, tant que le taux d’essai
          et la première session n’ont pas été resserrés.
        </Callout>
      </Section>
    </ReportShell>
  );
}
