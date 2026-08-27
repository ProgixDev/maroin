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
  TableMulti,
} from "./shell";
import {
  caserneAdaptations,
  caserneCumulJour2Kpis,
  caserneCouts,
  caserneDecalage,
  caserneDerived,
  caserneFunnel,
  caserneGallery,
  caserneJour1Kpis,
  caserneJour2Kpis,
  caserneJour3Kpis,
  caserneKpiReference,
  caserneKpis,
  caserneLectureFunnel,
  caserneMedia,
  caserneObjectifs,
  caserneRaw,
  caserneTableJours,
  caserneTrackingChain,
  caserneValide,
  fmt,
} from "./content";

const d = caserneDerived;
const r = caserneRaw;

/** Bilan des 3 premiers jours de campagne Meta Ads pour Caserne, segment Pompier. */
export function CaserneReport() {
  return (
    <ReportShell app="caserne">
      <Hero
        app="caserne"
        title="Le marché Pompier"
        titleAccent="répond."
        sub="Bilan complet des 3 jours de campagne Meta Ads sur l’audience Pompier. Les publicités génèrent des téléchargements à faible coût, et une très forte proportion des utilisateurs va jusqu’au démarrage de l’essai gratuit. Nous avons cependant choisi de mettre les campagnes en pause : le prochain chantier est maintenant le produit."
        art={caserneMedia.promesse}
      >
        <KpiGrid items={caserneKpis} />
      </Hero>

      {/* 01 — RÉSULTATS SUR LES 3 JOURS */}
      <Section id="resultats" num="01 · Résultats" title="Résultats sur les 3 jours">
        <P>
          La première phase d’acquisition Meta Ads de Caserne sur l’audience Pompier s’est déroulée
          sur 3 jours. Elle a permis de confirmer rapidement que le marché répond, que les
          publicités génèrent des téléchargements à faible coût et qu’une très forte proportion des
          utilisateurs téléchargés va jusqu’au démarrage de l’essai gratuit.
        </P>
        <P>
          À la fin de cette première phase, nous avons cependant décidé de mettre les campagnes en
          pause. Cette décision ne vient pas d’un problème d’acquisition : les résultats
          publicitaires sont au contraire très prometteurs. Les retours récoltés auprès de 6
          utilisateurs ayant testé l’application ont montré que le principal problème se situe dans
          l’expérience après l’installation. La priorité est donc désormais d’adapter l’application
          avant de remettre du budget sur l’acquisition.
        </P>
        <TableMulti head={caserneTableJours.head} rows={caserneTableJours.rows} />
        <List>
          <Item>
            Après 3 jours, <b>{fmt.eur(r.depense, 0)} dépensés</b>
          </Item>
          <Item>
            <b>{fmt.dec(r.impressions)} impressions</b>
          </Item>
          <Item>
            <b>{fmt.dec(r.telechargements)} téléchargements</b>
          </Item>
          <Item>
            <b>{fmt.dec(r.essais)} essais gratuits démarrés</b>
          </Item>
          <Item>
            <b>{fmt.dec(d.essaisActifs)} essais toujours actifs</b>
          </Item>
        </List>
      </Section>

      {/* 02 — JOUR 1 */}
      <Section id="jour1" num="02 · Jour 1" title="Jour 1" alt>
        <P>
          La première journée de diffusion a immédiatement donné un signal positif, avec{" "}
          <b>{fmt.eur(22, 0)} dépensés</b>.
        </P>
        <Table head={["KPI", "Valeur"]} rows={caserneJour1Kpis} />
        <Callout icon="✓" variant="ok" title="70,8 % téléchargement → essai">
          Sur 24 personnes qui téléchargent Caserne, 17 démarrent l’essai gratuit. Dès cette
          première journée, la campagne montre donc que le trafic généré n’est pas uniquement
          curieux : les utilisateurs passent réellement à l’action.
        </Callout>
      </Section>

      {/* 03 — JOUR 2 */}
      <Section id="jour2" num="03 · Jour 2" title="Jour 2">
        <P>
          Le budget passe ensuite à <b>15 € / jour</b>. La deuxième journée ajoute les volumes
          suivants.
        </P>
        <Table head={["KPI Jour 2", "Valeur"]} rows={caserneJour2Kpis} />
        <P>Cumul après 2 jours :</P>
        <Table head={["KPI", "Total"]} rows={caserneCumulJour2Kpis} />
        <P>
          Après seulement <b>37 €</b>, la campagne dépasse déjà les 40 téléchargements et approche
          les 29 essais gratuits.
        </P>
      </Section>

      {/* 04 — JOUR 3 */}
      <Section id="jour3" num="04 · Jour 3" title="Jour 3" alt>
        <P>
          La troisième journée continue avec le même budget : <b>15 €</b>.
        </P>
        <Table head={["KPI Jour 3", "Valeur"]} rows={caserneJour3Kpis} />
        <P>La campagne termine donc cette première phase avec :</P>
        <List>
          <Item>
            <b>{fmt.eur(r.depense, 0)} de dépense totale</b>, pour :
          </Item>
          <Item>
            <b>{fmt.dec(r.telechargements)} téléchargements</b>
          </Item>
          <Item>
            et surtout : <b>{fmt.dec(r.essais)} essais gratuits démarrés</b>
          </Item>
        </List>
      </Section>

      {/* 05 — FUNNEL COMPLET */}
      <Section id="funnel" num="05 · Funnel" title="Funnel complet des 3 jours">
        <Funnel
          steps={caserneFunnel}
          note="Échelle logarithmique : en échelle linéaire, les téléchargements face aux impressions donneraient une barre invisible."
        />
        <P>
          Et parallèlement : <b>{fmt.dec(r.desistements)} désistements</b>, soit{" "}
          <b>{fmt.pct(d.tauxDesistement, 2)} des essais</b>. Le passage téléchargement vers essai
          gratuit reste donc extrêmement fort. Le principal décrochage intervient ensuite.
        </P>
      </Section>

      {/* 06 — COÛTS D’ACQUISITION */}
      <Section id="couts" num="06 · Coûts" title="Coûts d’acquisition" alt>
        <P>Les performances obtenues sur cette première phase sont très encourageantes.</P>
        <Table head={["KPI", "Valeur"]} rows={caserneCouts} />
        <Callout icon="✓" variant="ok" title="Une acquisition saine">
          Avec seulement <b>{fmt.eur(d.coutParEssai)}</b>, Caserne fait entrer un utilisateur dans
          son essai gratuit. Pour une application fonctionnant sur un modèle d’abonnement, ce coût
          d’entrée laisse une marge très intéressante si la partie produit et la conversion payante
          sont ensuite correctement optimisées.
        </Callout>
      </Section>

      {/* 07 — CE QUE LES 3 JOURS ONT VALIDÉ */}
      <Section id="valide" num="07 · Acquis" title="Ce que les 3 jours ont validé">
        <Split media={caserneMedia.onboarding}>
          <P>
            Trois éléments sont confirmés par ces premiers chiffres. Ce sont les trois qui coûtent
            habituellement le plus cher à corriger.
          </P>
          <P>
            Le problème principal n’est donc pas aujourd’hui la capacité des créatives à attirer des
            utilisateurs, ni la compréhension de la proposition : l’utilisateur comprend la
            proposition suffisamment vite pour accepter d’entrer dans l’essai.
          </P>
        </Split>
        <CardGrid>
          {caserneValide.map((c) => (
            <Card key={c.title} kicker={c.kicker} title={c.title} variant="ok">
              {c.text}
            </Card>
          ))}
        </CardGrid>
      </Section>

      {/* 08 — LE POINT DE FRICTION */}
      <Section id="friction" num="08 · Friction" title="Le point de friction" alt>
        <Split media={caserneMedia.valeur} flip>
          <P>
            Le principal problème apparaît après le démarrage de l’essai. Le taux de désistement
            atteint <b>{fmt.pct(d.tauxDesistement, 2)}</b> : près d’un utilisateur sur deux ayant
            démarré son essai décide finalement de ne pas poursuivre.
          </P>
          <Callout icon="!" variant="warn" title="Près d’un essai sur deux annulé">
            La campagne publicitaire a rempli son rôle : elle a amené les utilisateurs suffisamment
            loin dans le funnel pour permettre d’identifier précisément le prochain chantier,
            l’expérience dans l’application.
          </Callout>
        </Split>
      </Section>

      {/* 09 — RETOURS UTILISATEURS */}
      <Section id="retours" num="09 · Retours" title="Retours utilisateurs">
        <P>
          Nous avons récupéré <b>6 retours utilisateurs</b> auprès de personnes ayant réellement
          visité et testé Caserne. Plusieurs utilisateurs ont remonté le même problème : le contenu
          présenté dans l’application n’était pas suffisamment adapté à ce qu’ils pensaient
          retrouver après avoir vu la publicité.
        </P>
        <Callout icon="i" title="La chaîne du décalage">
          La publicité crée une attente. L’utilisateur télécharge Caserne avec cette attente. Il
          démarre son essai. Mais une fois dans le produit, une partie des utilisateurs ne retrouve
          pas suffisamment ce qui les avait convaincus initialement.
        </Callout>
      </Section>

      {/* 10 — LE DÉCALAGE IDENTIFIÉ */}
      <Section id="decalage" num="10 · Décalage" title="Le décalage identifié" alt>
        <P>Le funnel actuel ressemble à :</P>
        <List>
          {caserneDecalage.map((s) => (
            <Item key={s.b}>
              <b>{s.b}</b> — {s.t}
            </Item>
          ))}
        </List>
        <P>
          Le problème principal n’est donc pas d’attirer davantage d’utilisateurs. Le problème est
          de faire en sorte que la valeur découverte corresponde exactement à la valeur attendue.
        </P>
      </Section>

      {/* 11 — DÉCISION : ARRÊT TEMPORAIRE */}
      <Section id="decision" num="11 · Décision" title="Arrêt temporaire des campagnes">
        <P>
          À la suite de ces résultats et des retours utilisateurs, nous avons décidé de mettre
          temporairement les campagnes Meta Ads en pause.
        </P>
        <Callout icon="!" variant="warn" title="L’objectif n’est pas d’abandonner l’acquisition">
          L’objectif est d’éviter de continuer à envoyer du trafic payant vers une expérience dont
          nous savons maintenant qu’elle doit être améliorée. Continuer à acheter davantage de
          téléchargements immédiatement reviendrait à augmenter le volume sans avoir encore corrigé
          le principal point de friction.
        </Callout>
        <P>
          La décision est donc de concentrer les ressources sur <b>l’adaptation de Caserne</b>.
        </P>
      </Section>

      {/* 12 — ADAPTATIONS À EFFECTUER */}
      <Section
        id="adaptations"
        num="12 · Adaptations"
        title="Adaptations à effectuer dans l’application"
        alt
      >
        <CardGrid>
          {caserneAdaptations.map((a) => (
            <Card key={a.title} kicker={a.kicker} title={a.title}>
              {a.text}
            </Card>
          ))}
        </CardGrid>
        <Shots items={caserneGallery} />
      </Section>

      {/* 13 — POURQUOI LES RÉSULTATS RESTENT PROMETTEURS */}
      <Section
        id="prometteurs"
        num="13 · Lecture"
        title="Pourquoi les résultats restent très prometteurs"
      >
        <P>
          La décision d’arrêter temporairement les campagnes pourrait être mal interprétée si elle
          est regardée uniquement de l’extérieur. Elle n’est absolument pas liée à de mauvais
          résultats publicitaires. Au contraire.
        </P>
        <P>
          En trois jours, <b>{fmt.eur(r.depense, 0)} dépensés</b> ont permis d’obtenir{" "}
          <b>{fmt.dec(r.telechargements)} téléchargements</b> et{" "}
          <b>{fmt.dec(r.essais)} essais gratuits</b>. Le coût par essai reste{" "}
          <b>{fmt.eur(d.coutParEssai)}</b> et le taux téléchargement → essai reste{" "}
          <b>{fmt.pct(d.tauxEssai, 2)}</b>.
        </P>
        <Callout icon="✓" variant="ok" title="Le marché n’est pas le risque">
          Le marché ne constitue pas aujourd’hui le principal risque. Le produit a simplement besoin
          d’être davantage aligné avec ce que ces utilisateurs viennent chercher.
        </Callout>
      </Section>

      {/* 14 — LECTURE DU FUNNEL */}
      <Section id="lecture-funnel" num="14 · Bilan" title="Lecture du funnel" alt>
        <Table head={["Étape", "État"]} rows={caserneLectureFunnel} />
        <P>
          Cette lecture est extrêmement utile : elle évite de perdre du temps à modifier des
          éléments qui fonctionnent déjà.
        </P>
      </Section>

      {/* 15 — LA PROCHAINE VERSION DE CASERNE */}
      <Section id="prochaine-version" num="15 · Produit" title="La prochaine version de Caserne">
        <P>La prochaine version devra conserver tout ce qui fonctionne déjà :</P>
        <List>
          <Item>la promesse publicitaire</Item>
          <Item>l’intérêt du marché</Item>
          <Item>le tunnel jusqu’à l’essai</Item>
        </List>
        <P>tout en améliorant ce qui se produit ensuite.</P>
        <Callout icon="→" title="La sensation visée">
          L’objectif est que l’utilisateur qui démarre son essai ait immédiatement la sensation
          suivante : « C’est exactement ce que je cherchais. » C’est cette sensation qui doit faire
          baisser les désistements.
        </Callout>
      </Section>

      {/* 16 — RELANCE DES CAMPAGNES */}
      <Section id="relance" num="16 · Relance" title="Relance des campagnes" alt>
        <P>
          Une fois les adaptations produit effectuées, les campagnes pourront être relancées. Cette
          deuxième phase permettra d’effectuer une comparaison directe.
        </P>
        <CardGrid>
          <Card kicker="Phase actuelle" title="Publicités performantes" variant="warn">
            Ancienne expérience produit = <b>{fmt.pct(d.tauxDesistement, 2)} de désistement</b>.
          </Card>
          <Card kicker="Nouvelle phase" title="Publicités similaires" variant="ok">
            Expérience produit adaptée = nouveau taux de désistement.
          </Card>
        </CardGrid>
        <P>Ce sera l’un des tests les plus importants pour Caserne.</P>
      </Section>

      {/* 17 — KPI À CONSERVER LORS DE LA RELANCE */}
      <Section id="benchmarks" num="17 · Benchmarks" title="KPI à conserver lors de la relance">
        <P>Les références obtenues pendant ces trois jours deviennent désormais nos benchmarks.</P>
        <Table head={["KPI", "Référence"]} rows={caserneKpiReference} />
        <P>
          Lors de la relance, l’objectif sera de garder la partie haute du funnel aussi proche que
          possible de ces niveaux. Le principal chiffre à faire évoluer sera le taux de désistement.
        </P>
      </Section>

      {/* 18 — OBJECTIF PRODUIT */}
      <Section id="objectif" num="18 · Objectif" title="Objectif produit" alt>
        <P>
          L’objectif n’est pas simplement de faire passer le désistement de 47 % à 45 %. Le travail
          produit doit permettre d’aller chercher une amélioration beaucoup plus significative.
        </P>
        <List>
          {caserneObjectifs.map((o) => (
            <Item key={o.t}>
              <b>{o.b}</b> : {o.t}
            </Item>
          ))}
        </List>
        <P>
          À acquisition identique, chaque point de rétention gagné augmente directement le nombre
          d’utilisateurs pouvant devenir abonnés payants.
        </P>
      </Section>

      {/* 19 — TRACKING DE LA PROCHAINE PHASE */}
      <Section id="tracking" num="19 · Tracking" title="Tracking de la prochaine phase">
        <P>Lors de la relance, le funnel complet devra être suivi :</P>
        <Callout icon="→" title="Le parcours de bout en bout">
          {caserneTrackingChain}
        </Callout>
        <P>Cela permettra de comprendre précisément où se situe chaque perte.</P>
      </Section>

      {/* 20 — CONCLUSION */}
      <Section id="conclusion" num="20 · Conclusion" title="Conclusion" alt>
        <P>
          Les trois premiers jours de campagne donnent un résultat très encourageant.{" "}
          <b>{fmt.eur(r.depense, 0)} investis</b> ont généré{" "}
          <b>{fmt.dec(r.impressions)} impressions</b>, <b>{fmt.dec(r.telechargements)}</b>{" "}
          téléchargements et <b>{fmt.dec(r.essais)}</b> essais gratuits, avec seulement{" "}
          <b>{fmt.eur(d.coutParTelechargement)}</b> par téléchargement et{" "}
          <b>{fmt.eur(d.coutParEssai)}</b> par essai.
        </P>
        <P>
          La campagne valide donc clairement la capacité de Caserne à attirer l’audience Pompier.
          Les 6 retours utilisateurs ont ensuite permis de découvrir rapidement pourquoi une partie
          importante des utilisateurs ne poursuivait pas son expérience : le contenu n’était pas
          encore suffisamment aligné avec leurs attentes.
        </P>
        <List>
          <Item>Les campagnes sont mises en pause.</Item>
          <Item>L’application est adaptée.</Item>
          <Item>L’expérience utilisateur est améliorée.</Item>
          <Item>Puis l’acquisition sera relancée.</Item>
        </List>
        <Callout icon="→" title="Le marché répond déjà">
          Le point le plus positif est que nous ne devons pas chercher comment convaincre le marché
          de télécharger Caserne. Le prochain travail consiste à faire en sorte que l’expérience
          dans l’application soit à la hauteur de l’intérêt que les publicités réussissent déjà à
          générer. La première phase a donc permis de valider l’acquisition et d’identifier
          précisément le prochain levier de croissance : le produit.
        </Callout>
      </Section>
    </ReportShell>
  );
}
