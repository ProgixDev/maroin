/* eslint-disable @next/next/no-img-element */
import Link from "next/link";
import type { ReactNode } from "react";
import { cn } from "@/lib/utils";
import { apps, navLinks, reportMeta } from "./content";
import styles from "./report.module.css";

type AppKey = keyof typeof apps;

/** Une capture App Store : image, intitulé court, légende. */
export type Media = {
  src: string;
  alt: string;
  kicker: string;
  caption: string;
};

/* ------------------------------------------------------------------ */
/* Chrome commun : header, hero, pied de page                          */
/* ------------------------------------------------------------------ */

export function ReportShell({ app, children }: { app: AppKey; children: ReactNode }) {
  return (
    <div className={styles.root} data-app={app}>
      <header className={styles.header}>
        <div className={styles.headerAccent} aria-hidden="true" />
        <div className={styles.headerInner}>
          <Link href={apps.caserne.href} className={styles.brand} aria-label="Progix">
            <img className={styles.brandLogo} src="/progix-logo.png" alt="Progix" />
            <span className={styles.brandTag}>Rapports Ads</span>
          </Link>
          <nav aria-label="Applications" className={styles.nav}>
            {navLinks.map((a) => (
              <Link
                key={a.key}
                href={a.href}
                aria-current={a.key === app ? "page" : undefined}
                className={cn(styles.navLink, a.key === app && styles.navLinkActive)}
              >
                <img className={styles.navIcon} src={a.icon} alt="" />
                <span className={styles.navFull}>{a.nav}</span>
                <span className={styles.navShort}>{a.navShort}</span>
              </Link>
            ))}
          </nav>
        </div>
      </header>
      <main>{children}</main>
      <footer className={styles.footer}>
        <div className={styles.footerInner}>
          <div>
            <span className={styles.footerBrand}>
              <img className={styles.footerLogo} src="/progix-logo.png" alt="Progix" />
              <span className={styles.footerTag}>Rapports Ads</span>
            </span>
            <p className={styles.footerNote}>
              Document confidentiel préparé pour le suivi des campagnes Meta Ads. Les visuels
              proviennent des fiches App Store des applications.
            </p>
          </div>
          <div className={styles.footerCol}>
            <span className={styles.footerHead}>Les rapports</span>
            {navLinks.map((a) => (
              <Link key={a.key} href={a.href} className={styles.footerLink}>
                <img className={styles.footerIcon} src={a.icon} alt="" />
                {a.nav}
              </Link>
            ))}
          </div>
        </div>
        <div className={styles.footerBar}>
          <div className={styles.footerBarInner}>
            <span>© 2026 Progix Inc. · Fièrement montréalaise</span>
            <span>contact@progix.pro · progix.pro</span>
          </div>
        </div>
      </footer>
    </div>
  );
}

export function Hero({
  app,
  title,
  titleAccent,
  sub,
  art,
  children,
}: {
  app: AppKey;
  title: string;
  titleAccent: string;
  sub: string;
  /** Capture mise en avant, à droite du titre. */
  art: Media;
  children?: ReactNode;
}) {
  const a = apps[app];
  return (
    <section className={styles.hero}>
      <div className={styles.heroInner}>
        <div className={styles.heroGrid}>
          <div>
            <div className={styles.heroTop}>
              <img
                className={styles.heroIcon}
                src={a.icon}
                alt={"Icône de l’application " + a.name}
              />
              <div>
                <div className={styles.eyebrow}>
                  <span className={styles.eyebrowBar} aria-hidden="true" />
                  {reportMeta.ref} · {a.segment}
                </div>
                <h1 className={styles.heroTitle}>
                  {title} <span className={styles.heroTitleAccent}>{titleAccent}</span>
                </h1>
              </div>
            </div>
            <p className={styles.heroSub}>{sub}</p>
            <a
              className={styles.storeLink}
              href={a.store}
              target="_blank"
              rel="noreferrer noopener"
            >
              Voir {a.name} sur l’App Store <span aria-hidden="true">↗</span>
            </a>
          </div>
          <Figure media={art} className={styles.heroArt} />
        </div>
        <div className={styles.metaRow}>
          <span>
            Application · <b>{a.name}</b>
          </span>
          <span>
            Canal · <b>{reportMeta.canal}</b>
          </span>
          <span>
            Période · <b>{reportMeta.periode}</b>
          </span>
          <span>
            Préparé par · <b>Progix Inc.</b>
          </span>
        </div>
        {children}
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* Visuels                                                              */
/* ------------------------------------------------------------------ */

/** Capture encadrée et légendée. Les visuels App Store portent déjà leur
 *  propre mockup de téléphone : on ne rajoute donc pas de cadre d’appareil. */
export function Figure({
  media,
  className,
  priority,
}: {
  media: Media;
  className?: string;
  priority?: boolean;
}) {
  return (
    <figure className={cn(styles.frame, className)}>
      <img
        className={styles.frameImg}
        src={media.src}
        alt={media.alt}
        loading={priority ? "eager" : "lazy"}
        decoding="async"
      />
      <figcaption className={styles.frameCap}>
        <span className={styles.frameKicker}>{media.kicker}</span>
        {media.caption}
      </figcaption>
    </figure>
  );
}

/** Texte et capture côte à côte. `flip` place la capture à gauche. */
export function Split({
  media,
  flip,
  children,
}: {
  media: Media;
  flip?: boolean;
  children: ReactNode;
}) {
  return (
    <div className={cn(styles.split, flip && styles.splitFlip)}>
      <div className={styles.splitBody}>{children}</div>
      <Figure media={media} className={styles.splitMedia} />
    </div>
  );
}

/** Galerie de captures. `wide` fait courir une image sur toute la largeur. */
export function Shots({ items }: { items: ReadonlyArray<Media & { wide?: boolean }> }) {
  return (
    <div className={styles.shots}>
      {items.map((s) => (
        <Figure key={s.src} media={s} className={cn(s.wide && styles.shotWide)} />
      ))}
    </div>
  );
}

/** Deux applications côte à côte : sert de repère de comparaison. */
export function Bench({
  items,
}: {
  items: ReadonlyArray<{ app: AppKey; title: string; meta: ReactNode; active?: boolean }>;
}) {
  return (
    <div className={styles.bench}>
      {items.map((b) => (
        <div key={b.app} className={cn(styles.benchCard, b.active && styles.benchCardActive)}>
          <img className={styles.benchIcon} src={apps[b.app].icon} alt="" />
          <div>
            <h4 className={styles.benchName}>{b.title}</h4>
            <p className={styles.benchMeta}>{b.meta}</p>
          </div>
        </div>
      ))}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Briques de contenu                                                   */
/* ------------------------------------------------------------------ */

export function Section({
  id,
  num,
  title,
  alt,
  children,
}: {
  id: string;
  num: string;
  title: string;
  alt?: boolean;
  children: ReactNode;
}) {
  return (
    <section id={id} className={cn(styles.section, alt && styles.sectionAlt)}>
      <div className={styles.container}>
        <span className={styles.secNum}>{num}</span>
        <h2 className={styles.secTitle}>{title}</h2>
        <div className={styles.secRule} aria-hidden="true" />
        {children}
      </div>
    </section>
  );
}

export function P({ children }: { children: ReactNode }) {
  return <p className={styles.p}>{children}</p>;
}

export function KpiGrid({ items }: { items: ReadonlyArray<{ n: string; l: string }> }) {
  return (
    <div className={styles.kpiGrid}>
      {items.map((k) => (
        <div key={k.l} className={styles.kpi}>
          <div className={styles.kpiNum}>{k.n}</div>
          <div className={styles.kpiLabel}>{k.l}</div>
        </div>
      ))}
    </div>
  );
}

export function Card({
  kicker,
  title,
  variant,
  children,
}: {
  kicker: string;
  title: string;
  variant?: "ok" | "warn";
  children: ReactNode;
}) {
  return (
    <div
      className={cn(
        styles.card,
        variant === "ok" && styles.cardOk,
        variant === "warn" && styles.cardWarn,
      )}
    >
      <div className={styles.cardKicker}>{kicker}</div>
      <h3 className={styles.cardTitle}>{title}</h3>
      <p className={styles.cardText}>{children}</p>
    </div>
  );
}

export function CardGrid({ children }: { children: ReactNode }) {
  return <div className={styles.cardGrid}>{children}</div>;
}

export function Callout({
  icon = "i",
  title,
  variant,
  children,
}: {
  icon?: string;
  title: string;
  variant?: "ok" | "warn";
  children: ReactNode;
}) {
  return (
    <div
      className={cn(
        styles.callout,
        variant === "ok" && styles.calloutOk,
        variant === "warn" && styles.calloutWarn,
      )}
    >
      <div className={styles.calloutIcon} aria-hidden="true">
        {icon}
      </div>
      <div>
        <h4 className={styles.calloutTitle}>{title}</h4>
        <p className={styles.calloutText}>{children}</p>
      </div>
    </div>
  );
}

export function List({ children }: { children: ReactNode }) {
  return <ul className={styles.list}>{children}</ul>;
}

export function Item({ children }: { children: ReactNode }) {
  return <li className={styles.listItem}>{children}</li>;
}

/** Tunnel de conversion. Les barres sont en échelle logarithmique : en linéaire,
 *  24 téléchargements face à 3 400 impressions donneraient un trait invisible. */
export function Funnel({
  steps,
  note,
}: {
  steps: ReadonlyArray<{
    label: string;
    sub: string;
    value: number;
    display: string;
    ratio: string | null;
  }>;
  note: string;
}) {
  const max = Math.max(...steps.map((s) => s.value));
  const scale = (v: number) => {
    const w = (Math.log10(Math.max(v, 1)) / Math.log10(max)) * 100;
    return Math.max(w, 16);
  };
  return (
    <div className={styles.funnel}>
      {steps.map((s) => (
        <div key={s.label} className={styles.funnelRow}>
          <div className={styles.funnelLabel}>
            {s.label}
            <span>{s.ratio ?? s.sub}</span>
          </div>
          <div className={styles.funnelTrack}>
            <div
              className={styles.funnelBar}
              style={{ width: "calc(" + scale(s.value) + "% - 6px)" }}
            >
              {s.display}
            </div>
          </div>
        </div>
      ))}
      <p className={styles.funnelNote}>{note}</p>
    </div>
  );
}

export function Table({
  head,
  rows,
}: {
  head: [string, string];
  rows: ReadonlyArray<{ label: string; value: string }>;
}) {
  return (
    <div className={styles.tableWrap}>
      <table className={styles.table}>
        <thead>
          <tr>
            <th>{head[0]}</th>
            <th style={{ textAlign: "right" }}>{head[1]}</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((row) => (
            <tr key={row.label}>
              <td>{row.label}</td>
              <td className={styles.tableNum}>{row.value}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export { styles as reportStyles };
