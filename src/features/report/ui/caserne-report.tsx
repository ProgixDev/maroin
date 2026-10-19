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
  caserneCumuls,
  caserneDerived,
  caserneFunnel,
  caserneJour1Kpis,
  caserneJour2Kpis,
  caserneJour3Kpis,
  caserneJour4Kpis,
  caserneJour5Kpis,
  caserneJours,
  caserneKpis,
  caserneMonetisation,
  caserneRaw,
  caserneRentabilite,
  caserneTableJours,
  fmt,
} from "./content";

const d = caserneDerived;
const r = caserneRaw;
const j1 = caserneJours[0];
const j2 = caserneJours[1];
const j3 = caserneJours[2];
const j4 = caserneJours[3];
const j5 = caserneJours[4];
const c2 = caserneCumuls[0];
const c3 = caserneCumuls[1];
const c4 = caserneCumuls[2];
const c5 = caserneCumuls[3];
const s = d.jours;

/** Bilan des 5 premiers jours de campagne Meta Ads pour Caserne, segment Pompier. */
export function CaserneReport() {
  return (
    <ReportShell app="caserne">
      <Hero app="caserne">
        <KpiGrid items={caserneKpis} />
      </Hero>

      <Section id="resultats" num="01 · Résultats" title="Résultats sur les 5 jours">
        <P>
          La première phase d’acquisition Meta Ads de Caserne sur l’audience Pompier s’est déroulée
          sur 5 jours. Elle a suffi à confirmer que le marché répond et que les publicités
          installent l’application à un coût très bas : <b>{fmt.eur(r.depense)}</b> pour{" "}
          <b>{fmt.num(r.impressions)} impressions</b>,{" "}
          <b>{fmt.num(r.telechargements)} téléchargements</b> et{" "}
          <b>{fmt.num(r.essais)} essais gratuits</b>.
        </P>
        <P>
          Le signal n’est pas encore un verdict produit complet : l’essai gratuit dure 3 jours, et
          nous n’avons que 5 jours de diffusion. En revanche, le haut du funnel est déjà lisible. Un
          téléchargement revient à <b>{fmt.eur(d.coutParTelechargement)}</b>, un essai à{" "}
          <b>{fmt.eur(d.coutParEssai)}</b>. Parmi ceux qui installent,{" "}
          <b>{fmt.pct(d.tauxEssai, 1)}</b> démarrent l’essai : c’est correct, mais c’est aussi le
          premier chiffre à faire monter avant d’augmenter le budget.
        </P>
        <P>
          Sur les{" "}
          <b>
            {fmt.num(r.essaisCohorteJ1J2)} essais gratuits démarrés lors des deux premiers jours
          </b>
          , <b>{fmt.num(r.abonnements)} utilisateurs</b> ont souscrit un abonnement payant à{" "}
          <b>{fmt.eur(r.prixAbonnement)} par mois</b>. Cela représente un taux de conversion essai →
          abonnement de <b>{fmt.pct(d.tauxConversionCohorte, 1)}</b> sur cette première cohorte, et{" "}
          <b>{fmt.eur(d.revenuMensuel)} de revenus mensuels récurrents bruts</b>. Les essais
          démarrés les jours suivants n’ont pas encore tous atteint leur échéance.
        </P>
        <TableMulti head={caserneTableJours.head} rows={caserneTableJours.rows} />
        <List>
          <Item>
            Après 5 jours, <b>{fmt.eur(r.depense)} dépensés</b>
          </Item>
          <Item>
            <b>{fmt.num(r.impressions)} impressions</b>
          </Item>
          <Item>
            <b>{fmt.num(r.telechargements)} téléchargements</b>
          </Item>
          <Item>
            <b>{fmt.num(r.essais)} essais gratuits</b> : {j1.essais} le Jour 1, {j2.essais} le Jour
            2, {j3.essais} le Jour 3, {j4.essais} le Jour 4 et {j5.essais} le Jour 5
          </Item>
          <Item>
            <b>{fmt.num(r.abonnements)} abonnements payants</b> issus des essais des deux premiers
            jours
          </Item>
          <Item>
            <b>{fmt.eur(d.revenuMensuel)} de revenus mensuels récurrents bruts</b>
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
          title={`${fmt.pct(s[0].tauxEssai, 1)} téléchargement → essai`}
        >
          Sur {j1.telechargements} personnes qui téléchargent Caserne, {j1.essais} démarrent
          l’essai. Dès le premier jour, le trafic n’est pas seulement curieux : une part réelle
          passe à l’action, pour <b>{fmt.eur(s[0].coutParEssai)}</b> par essai.
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
          Le taux d’essai reste du même ordre (<b>{fmt.pct(s[1].tauxEssai, 1)}</b> après{" "}
          <b>{fmt.pct(s[0].tauxEssai, 1)}</b> la veille). Le coût par téléchargement reste sous 1 €.
          La campagne ne s’essouffle pas : elle livre un deuxième jour comparable, avec un budget
          légèrement plus bas.
        </P>
        <Callout icon="i" title="Lecture du cumul">
          En {c2.heures} heures, <b>{fmt.eur(c2.depense, 0)}</b> ont déjà produit{" "}
          <b>{fmt.num(c2.telechargements)} téléchargements</b> et <b>{fmt.num(c2.essais)} essais</b>
          . C’est assez pour juger l’acquisition, pas encore assez pour juger la conversion payante.
        </Callout>
      </Section>

      <Section id="jour3" num="04 · Jour 3" title="Jour 3" alt>
        <P>
          Le Jour 3 dépense un peu plus : <b>{fmt.eur(j3.depense)}</b>. Les volumes augmentent
          presque dans la même proportion, ce qui est sain :{" "}
          <b>{fmt.num(j3.impressions)} impressions</b>,{" "}
          <b>{fmt.num(j3.telechargements)} téléchargements</b>, <b>{fmt.num(j3.essais)} essais</b>.
        </P>
        <Table head={["KPI Jour 3", "Valeur"]} rows={caserneJour3Kpis} />
        <P>
          Le taux d’essai reste du même ordre (<b>{fmt.pct(s[2].tauxEssai, 1)}</b> après{" "}
          <b>{fmt.pct(s[1].tauxEssai, 1)}</b> la veille). Le coût par téléchargement reste sous 1 €.
          La campagne ne s’essouffle pas : elle livre un troisième jour comparable, avec un budget
          plus élevé.
        </P>
        <Callout icon="i" title="Lecture du cumul">
          En {c3.heures} heures, <b>{fmt.eur(c3.depense)}</b> ont déjà produit{" "}
          <b>{fmt.num(c3.telechargements)} téléchargements</b> et <b>{fmt.num(c3.essais)} essais</b>
          . C’est assez pour juger l’acquisition, pas encore assez pour juger la conversion payante.
        </Callout>
      </Section>

      <Section id="jour4" num="05 · Jour 4" title="Jour 4">
        <P>
          Le Jour 4 dépense un peu plus : <b>{fmt.eur(j4.depense)}</b>. Les volumes augmentent
          presque dans la même proportion, ce qui est sain :{" "}
          <b>{fmt.num(j4.impressions)} impressions</b>,{" "}
          <b>{fmt.num(j4.telechargements)} téléchargements</b>, <b>{fmt.num(j4.essais)} essais</b>.
        </P>
        <Table head={["KPI Jour 4", "Valeur"]} rows={caserneJour4Kpis} />
        <P>
          Le taux d’essai reste du même ordre (<b>{fmt.pct(s[3].tauxEssai, 1)}</b> après{" "}
          <b>{fmt.pct(s[2].tauxEssai, 1)}</b> la veille). Le coût par téléchargement reste sous 1 €.
          La campagne ne s’essouffle pas : elle livre un quatrième jour comparable, avec un budget
          légèrement plus élevé.
        </P>
        <Callout icon="i" title="Lecture du cumul">
          En {c4.heures} heures, <b>{fmt.eur(c4.depense)}</b> ont déjà produit{" "}
          <b>{fmt.num(c4.telechargements)} téléchargements</b> et <b>{fmt.num(c4.essais)} essais</b>
          . C’est assez pour juger l’acquisition, pas encore assez pour juger la conversion payante.
        </Callout>
      </Section>

      <Section id="jour5" num="06 · Jour 5" title="Jour 5" alt>
        <P>
          Le Jour 5 dépense un peu plus : <b>{fmt.eur(j5.depense, 0)}</b>. Les volumes restent
          presque dans la même proportion, ce qui est sain :{" "}
          <b>{fmt.num(j5.impressions)} impressions</b>,{" "}
          <b>{fmt.num(j5.telechargements)} téléchargements</b>, <b>{fmt.num(j5.essais)} essais</b>.
        </P>
        <Table head={["KPI Jour 5", "Valeur"]} rows={caserneJour5Kpis} />
        <P>
          Le taux d’essai reste du même ordre (<b>{fmt.pct(s[4].tauxEssai, 1)}</b> après{" "}
          <b>{fmt.pct(s[3].tauxEssai, 1)}</b> la veille). Le coût par téléchargement reste sous 1 €.
          La campagne ne s’essouffle pas : elle livre un cinquième jour comparable, avec un budget
          légèrement plus élevé.
        </P>
        <Callout icon="i" title="Lecture du cumul">
          En {c5.heures} heures, <b>{fmt.eur(c5.depense)}</b> ont déjà produit{" "}
          <b>{fmt.num(c5.telechargements)} téléchargements</b> et <b>{fmt.num(c5.essais)} essais</b>
          . C’est assez pour juger l’acquisition, pas encore assez pour juger la conversion payante.
        </Callout>
      </Section>

      <Section id="funnel" num="07 · Funnel" title="Funnel complet des 5 jours">
        <Funnel
          steps={caserneFunnel}
          note="Échelle logarithmique : en échelle linéaire, les téléchargements face aux impressions donneraient une barre invisible."
        />
        <P>
          Le premier filtre est classique : {fmt.num(r.impressions)} impressions pour{" "}
          {fmt.num(r.telechargements)} installations, soit{" "}
          <b>{fmt.pct(d.tauxInstall, 2)} des impressions</b>. Le second filtre est le plus utile ici
          : <b>{fmt.pct(d.tauxEssai, 1)} des téléchargements</b> lancent l’essai.{" "}
          {r.telechargements - r.essais} personnes installent sans démarrer l’essai : c’est la marge
          de progression la plus claire, avant même de parler d’abonnement.
        </P>
        <P>
          Le troisième filtre commence également à être lisible : sur les{" "}
          <b>{fmt.num(r.essaisCohorteJ1J2)} essais gratuits des deux premiers jours</b>,{" "}
          <b>{fmt.num(r.abonnements)} utilisateurs</b> ont souscrit à l’abonnement mensuel de{" "}
          <b>{fmt.eur(r.prixAbonnement)}</b>, soit{" "}
          <b>{fmt.pct(d.tauxConversionCohorte, 1)} de conversion</b>. Les{" "}
          <b>{fmt.num(d.essaisEnCours)} essais supplémentaires</b> des trois jours suivants
          constituent encore un potentiel de conversion qui n’est pas entièrement observable à ce
          stade.
        </P>
      </Section>

      <Section id="couts" num="08 · Coûts" title="Coûts d’acquisition" alt>
        <P>
          À ce niveau de dépense, chaque euro travaille. Les coûts unitaires laissent une vraie
          marge si une partie des {fmt.num(r.essais)} essais se transforme ensuite en abonnés.
        </P>
        <Table head={["KPI", "Valeur"]} rows={caserneCouts} />
        <Callout icon="✓" variant="ok" title="Une acquisition saine">
          <b>{fmt.eur(d.coutParEssai)}</b> pour faire entrer quelqu’un dans l’essai, et{" "}
          <b>{fmt.eur(d.coutParTelechargement)}</b> par téléchargement. Pour un abonnement, ce coût
          d’entrée est bas. Il ne faut pas le gâcher en scalant trop tôt, tant que le taux d’essai
          et la première session n’ont pas été resserrés.
        </Callout>
      </Section>

      <Section id="monetisation" num="09 · Monétisation" title="Premiers abonnements payants">
        <P>
          Après 5 jours de diffusion, la campagne commence à produire ses premiers revenus
          récurrents. Parmi les <b>{fmt.num(r.essaisCohorteJ1J2)} utilisateurs</b> ayant démarré
          leur essai gratuit pendant les deux premiers jours,{" "}
          <b>
            {fmt.num(r.abonnements)} ont souscrit un abonnement mensuel de{" "}
            {fmt.eur(r.prixAbonnement)}
          </b>
          .
        </P>
        <P>
          Cette première cohorte permet d’observer un taux de conversion essai → payant de{" "}
          <b>{fmt.pct(d.tauxConversionCohorte, 1)}</b>. Il s’agit d’un premier signal de
          monétisation, même si le volume reste encore limité pour en tirer une conclusion
          définitive.
        </P>
        <Table head={["Indicateur", "Valeur"]} rows={caserneMonetisation} />
        <Callout
          icon="✓"
          variant="ok"
          title={`${fmt.pct(d.tauxConversionCohorte, 1)} de conversion vers le payant`}
        >
          Sur les {r.essaisCohorteJ1J2} essais gratuits de la première cohorte, {r.abonnements}{" "}
          utilisateurs décident de poursuivre avec un abonnement payant. Le trafic acquis ne se
          limite donc plus à des installations ou à de simples essais : il commence à générer des
          abonnements.
        </Callout>
        <Callout icon="i" title={`${fmt.eur(d.revenuMensuel)} de revenus mensuels récurrents`}>
          Avec {r.abonnements} abonnés à {fmt.eur(r.prixAbonnement)} par mois, Caserne génère{" "}
          <b>{fmt.eur(d.revenuMensuel)} de revenus mensuels récurrents bruts</b>, sous réserve du
          maintien des abonnements.
        </Callout>
        <P>
          Ces revenus ne couvrent pas encore les <b>{fmt.eur(r.depense)}</b> investis en publicité,
          mais la majorité des essais de la campagne n’a pas encore atteint son échéance.
        </P>
      </Section>

      <Section id="rentabilite" num="10 · Rentabilité" title="Premiers signaux de rentabilité" alt>
        <P>
          La campagne a généré <b>{fmt.num(r.essais)} essais gratuits</b> pour{" "}
          <b>{fmt.eur(r.depense)}</b> dépensés. Sur les {r.essaisCohorteJ1J2} premiers essais,{" "}
          {r.abonnements} se sont transformés en abonnements payants. Il reste donc{" "}
          <b>{fmt.num(d.essaisEnCours)} essais supplémentaires</b> dont la conversion finale doit
          encore être observée.
        </P>
        <P>
          Si ces {d.essaisEnCours} essais convertissent au même taux que les {r.essaisCohorteJ1J2}{" "}
          premiers, soit <b>{fmt.pct(d.tauxConversionCohorte, 1)}</b>, ils pourraient produire
          environ <b>11 à 12 abonnements payants supplémentaires</b>.
        </P>
        <P>
          Caserne atteindrait alors environ <b>15 à 16 abonnés payants</b>, représentant{" "}
          <b>74,85 € à 79,84 € de revenus mensuels récurrents bruts</b>.
        </P>
        <TableMulti head={caserneRentabilite.head} rows={caserneRentabilite.rows} />
        <Callout icon="i" title="Une rentabilité qui dépend de la rétention">
          À <b>{fmt.eur(r.prixAbonnement)} par mois</b>, le modèle économique repose sur deux
          variables : la proportion d’utilisateurs qui deviennent abonnés et le nombre de mois
          pendant lesquels ils conservent leur abonnement.
        </Callout>
        <P>
          Avec <b>21 abonnés actifs</b>, Caserne génère <b>104,79 € de revenus mensuels bruts</b>,
          soit davantage que les dépenses publicitaires initiales de <b>{fmt.eur(r.depense)}</b>,
          avant commissions et autres frais.
        </P>
        <P>
          L’enjeu est maintenant de convertir les essais restants et de mesurer la durée réelle des
          abonnements afin de déterminer la rentabilité de l’acquisition.
        </P>
      </Section>

      <Section id="conclusion" num="11 · Conclusion" title="Bilan des 5 premiers jours">
        <P>
          En 5 jours, Caserne a obtenu <b>{fmt.num(r.impressions)} impressions</b>,{" "}
          <b>{fmt.num(r.telechargements)} téléchargements</b>,{" "}
          <b>{fmt.num(r.essais)} essais gratuits</b> et{" "}
          <b>{fmt.num(r.abonnements)} abonnements payants</b>, pour un investissement publicitaire
          de <b>{fmt.eur(r.depense)}</b>.
        </P>
        <P>
          Le coût par téléchargement reste inférieur à <b>1 €</b>, tandis que le coût par essai
          s’établit à <b>{fmt.eur(d.coutParEssai)}</b>. Le taux téléchargement → essai atteint{" "}
          <b>{fmt.pct(d.tauxEssai, 1)}</b>, ce qui confirme que les publicités attirent une audience
          disposée à découvrir le produit.
        </P>
        <P>
          La première cohorte d’essais a également commencé à se monétiser, avec{" "}
          <b>
            {fmt.num(r.abonnements)} abonnements payants sur {fmt.num(r.essaisCohorteJ1J2)} essais
          </b>
          , soit <b>{fmt.pct(d.tauxConversionCohorte, 1)} de conversion</b>, générant{" "}
          <b>{fmt.eur(d.revenuMensuel)} de revenus mensuels récurrents bruts</b>.
        </P>
        <P>
          La campagne présente donc des premiers signaux encourageants, aussi bien sur l’acquisition
          que sur la conversion vers l’abonnement. La prochaine étape consiste à mesurer les
          conversions des <b>{fmt.num(d.essaisEnCours)} essais supplémentaires</b>, tout en
          surveillant le taux de résiliation et le coût réel d’acquisition par abonné.
        </P>
        <P>
          L’objectif n’est pas simplement de multiplier les téléchargements, mais de transformer
          durablement les essais gratuits en abonnements mensuels rentables.
        </P>
      </Section>
    </ReportShell>
  );
}
