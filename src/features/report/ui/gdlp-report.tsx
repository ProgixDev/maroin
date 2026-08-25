import Link from "next/link";
import {
  Bench,
  Callout,
  Hero,
  Item,
  List,
  P,
  ReportShell,
  Section,
  Shots,
  reportStyles,
} from "./shell";
import { apps, caserneDerived, caserneFunnelChain, fmt, gdlpGallery, gdlpMedia } from "./content";

const d = caserneDerived;

/** Rapport Meta Ads pour Gardien de la Paix : aucune campagne active à ce jour. */
export function GdlpReport() {
  return (
    <ReportShell app="gdlp">
      <Hero
        app="gdlp"
        title="Aucune campagne"
        titleAccent="active à ce jour."
        sub="Aucune campagne Meta Ads n’est en diffusion sur l’audience Gardien de la Paix. Il n’y a donc aucune donnée publicitaire à analyser à ce stade. Cette audience sera traitée séparément dès qu’une campagne dédiée sera lancée."
        art={gdlpMedia.promesse}
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
        <Bench
          items={[
            {
              app: "caserne",
              title: "Caserne · Pompier",
              meta: (
                <>
                  Référence mesurée : <b>{fmt.eur(d.cpm)}</b> de CPM,{" "}
                  <b>{fmt.eur(d.coutParTelechargement)}</b> par téléchargement,{" "}
                  <b>{fmt.pct(d.tauxEssai)}</b> de passage à l’essai.
                </>
              ),
            },
            {
              app: "gdlp",
              title: "Gardien de la Paix",
              active: true,
              meta: (
                <>
                  À mesurer : les <b>trois mêmes indicateurs</b> seront publiés ici dès la première
                  semaine de diffusion, puis comparés à la colonne de gauche.
                </>
              ),
            },
          ]}
        />
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
        <P>
          L’identité est nettement différente de celle de Caserne : bleu marine, or et titrage en
          serif, là où l’application Pompier joue le noir et le rouge feu. Les créatives ne pourront
          donc pas être de simples reprises de celles qui fonctionnent déjà sur l’audience Pompier.
        </P>
        <Shots items={gdlpGallery} />
        <P>
          Ces visuels sont ceux de la fiche App Store. Ils constituent la base de travail des
          premières créatives, avec l’angle publicitaire à définir avant le lancement.
        </P>
      </Section>
    </ReportShell>
  );
}
