/* eslint-disable @next/next/no-img-element */
import Link from "next/link";
import type { ReactNode } from "react";
import { cn } from "@/lib/utils";
import { apps, navLinks, reportMeta } from "./content";
import styles from "./report.module.css";

type AppKey = keyof typeof apps;

/* ------------------------------------------------------------------ */
/* Chrome commun : header, hero, pied de page                          */
/* ------------------------------------------------------------------ */

export function ReportShell({ app, children }: { app: AppKey; children: ReactNode }) {
  return (
    <div className={styles.root} data-app={app}>
      <header className={styles.header}>
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
                {a.nav}
              </Link>
            ))}
          </nav>
        </div>
      </header>
      <main>{children}</main>
      <footer className={styles.footer}>
        <div className={styles.footerInner}>
          <span className={styles.footerBrand}>
            <img className={styles.footerLogo} src="/progix-logo.png" alt="Progix" />
            <span>© 2026 Progix Inc. · Fièrement montréalaise</span>
          </span>
          <span>contact@progix.pro · progix.pro</span>
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
  children,
}: {
  app: AppKey;
  title: string;
  titleAccent: string;
  sub: string;
  children?: ReactNode;
}) {
  const a = apps[app];
  return (
    <section className={styles.hero}>
      <div className={styles.heroInner}>
        <div className={styles.heroTop}>
          <img className={styles.heroIcon} src={a.icon} alt={"Icône de l’application " + a.name} />
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
        <a className={styles.storeLink} href={a.store} target="_blank" rel="noreferrer noopener">
          Voir {a.name} sur l’App Store <span aria-hidden="true">↗</span>
        </a>
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

export function Shots({
  items,
}: {
  items: ReadonlyArray<{ src: string; alt: string; wide?: boolean }>;
}) {
  return (
    <div className={styles.shots}>
      {items.map((s) => (
        <figure key={s.src} className={cn(styles.shot, s.wide && styles.shotWide)}>
          <img className={styles.shotImg} src={s.src} alt={s.alt} loading="lazy" decoding="async" />
        </figure>
      ))}
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
