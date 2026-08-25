import Link from "next/link";
import { Callout, Hero, Item, List, P, ReportShell, Section, Shots, reportStyles } from "./shell";
import { apps, caserneFunnelChain, gdlpShots } from "./content";

/** Rapport Meta Ads pour Gardien de la Paix : aucune campagne active à ce jour. */
export function GdlpReport() {
  return (
    <ReportShell app="gdlp">
      <Hero
        app="gdlp"
        title="Aucune campagne"
        titleAccent="active à ce jour."
        sub="Aucune campagne Meta Ads n’est en diffusion sur l’audience Gardien de la Paix. Il n’y a donc aucune donnée publicitaire à analyser à ce stade. Cette audience sera traitée séparément dès qu’une campagne dédiée sera lancée."
      />

      {/* 01 — ÉTAT */}
      <Section id="etat" num="01 · État" title="État de la campagne">
        <div className={reportStyles.empty}>
          <span className={reportStyles.emptyBadge}>Statut · N/A</span>
          <h3 className={reportStyles.emptyTitle}>Pas encore de diffusion</h3>
          <p className={reportStyles.emptyText}>
            Budget dépensé, impressions, téléchargements et essais gratuits sont tous à zéro sur
            cette audience, faute de campagne active. Aucune conclusion ne peut être tirée pour le
            moment.
          </p>
        </div>
        <Callout icon="i" title="Pourquoi cette page existe quand même">
          Elle fixe le cadre de mesure avant le lancement. Le jour où la campagne démarre, les
          chiffres se comparent immédiatement à ceux de Caserne, sur les mêmes indicateurs et le
          même tunnel.
        </Callout>
      </Section>

      {/* 02 — CE QUI SERA MESURÉ */}
      <Section id="mesure" num="02 · Cadre" title="Ce qui sera mesuré au lancement" alt>
        <P>
          Les mêmes indicateurs que sur la campagne Pompier, pour que les deux audiences restent
          comparables ligne à ligne.
        </P>
        <List>
          <Item>
            <b>Budget dépensé</b> et <b>impressions</b> servies.
          </Item>
          <Item>
            <b>CPM</b>, coût par <b>téléchargement</b>, coût par <b>essai gratuit</b>.
          </Item>
          <Item>
            <b>Taux de passage téléchargement vers essai</b>, l’indicateur de qualité de
            l’onboarding.
          </Item>
          <Item>
            <b>Taux de désistement</b> pendant l’essai, l’indicateur de friction produit.
          </Item>
          <Item>
            <b>Conversion en abonnés</b> puis <b>rétention</b>, une fois le tracking en place.
          </Item>
        </List>
        <Callout icon="→" title="Le tunnel de référence">
          {caserneFunnelChain}
        </Callout>
        <P>
          Le rapport de la campagne{" "}
          <Link href={apps.caserne.href} style={{ color: "var(--accent-ink)" }}>
            Caserne Pompier
          </Link>{" "}
          sert de point de comparaison : mêmes définitions, mêmes calculs.
        </P>
      </Section>

      {/* 03 — L’APPLICATION */}
      <Section id="app" num="03 · Produit" title="L’application à promouvoir">
        <P>{apps.gdlp.tagline}</P>
        <Shots items={gdlpShots} />
        <P>
          Ces visuels sont ceux de la fiche App Store. Ils constitueront la base de travail des
          premières créatives publicitaires, avec l’angle à définir avant le lancement.
        </P>
      </Section>
    </ReportShell>
  );
}
