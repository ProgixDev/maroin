"use client";

import Image from "next/image";
import { useState, useSyncExternalStore, type FormEvent } from "react";
import { clientEnv } from "@/core/env.client";
import { cn } from "@/lib/utils";
import styles from "./site-gate.module.css";

const STORAGE_KEY = "progix.gate.unlocked";

/** Shared geometry for the two reveal-toggle glyphs. */
const iconProps = {
  width: 19,
  height: 19,
  viewBox: "0 0 20 20",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.6,
  strokeLinecap: "round",
  strokeLinejoin: "round",
  "aria-hidden": true,
} as const;

function EyeIcon() {
  return (
    <svg {...iconProps}>
      <path d="M1.8 10S5 4.4 10 4.4 18.2 10 18.2 10 15 15.6 10 15.6 1.8 10 1.8 10Z" />
      <circle cx="10" cy="10" r="2.4" />
    </svg>
  );
}

function EyeOffIcon() {
  return (
    <svg {...iconProps}>
      <path d="M8.3 4.6A7.9 7.9 0 0 1 10 4.4c5 0 8.2 5.6 8.2 5.6a15 15 0 0 1-2.6 3.3" />
      <path d="M5.5 5.8A14.9 14.9 0 0 0 1.8 10S5 15.6 10 15.6a7.9 7.9 0 0 0 3.2-.7" />
      <path d="M8.3 8.3a2.4 2.4 0 0 0 3.4 3.4" />
      <path d="M3.2 3.2l13.6 13.6" />
    </svg>
  );
}

function subscribe(callback: () => void) {
  window.addEventListener("storage", callback);
  return () => window.removeEventListener("storage", callback);
}

function getSnapshot() {
  try {
    return window.localStorage.getItem(STORAGE_KEY) === "1";
  } catch {
    return false; // localStorage unavailable (e.g. private mode)
  }
}

/**
 * Frontend-only access gate. Shows a password screen until the visitor enters
 * NEXT_PUBLIC_SITE_ACCESS_CODE, then reveals the site and remembers the unlock
 * in localStorage for this browser.
 *
 * ⚠️  NOT a security boundary. Both the password and the gated markup ship to
 * the browser, so a determined visitor can read either in devtools. Use it to
 * deter casual access only — protecting genuinely sensitive data needs a real
 * backend with server-side auth.
 */
export function SiteGate({ children }: { children: React.ReactNode }) {
  // Read the persisted unlock without a setState-in-effect; getServerSnapshot
  // returns false so SSR + first paint render the gate, then it reconciles.
  const storedUnlocked = useSyncExternalStore(subscribe, getSnapshot, () => false);
  const [sessionUnlocked, setSessionUnlocked] = useState(false);
  const [value, setValue] = useState("");
  const [error, setError] = useState(false);
  const [revealed, setRevealed] = useState(false);

  const unlocked = storedUnlocked || sessionUnlocked;

  function handleSubmit(event: FormEvent) {
    event.preventDefault();
    if (value === clientEnv.NEXT_PUBLIC_SITE_ACCESS_CODE) {
      setSessionUnlocked(true);
      setError(false);
      try {
        window.localStorage.setItem(STORAGE_KEY, "1");
      } catch {
        // ignore — the unlock still holds for this page load.
      }
    } else {
      setError(true);
    }
  }

  if (unlocked) return <>{children}</>;

  return (
    <div className={styles.overlay} role="dialog" aria-modal="true" aria-labelledby="gate-title">
      <div className={styles.card}>
        <span className={styles.chip}>
          <Image src="/progix-logo.png" alt="Progix" width={134} height={32} priority />
        </span>
        <div className={styles.eyebrow}>
          <span className={styles.eyebrowBar} aria-hidden="true" />
          Document confidentiel
        </div>
        <h1 id="gate-title" className={styles.title}>
          Accès protégé
        </h1>
        <p className={styles.subtitle}>
          Saisissez le mot de passe qui vous a été communiqué pour consulter le document.
        </p>
        <form className={styles.form} onSubmit={handleSubmit} noValidate>
          <div>
            <label className={styles.label} htmlFor="gate-password">
              Mot de passe
            </label>
            <div className={styles.inputWrap}>
              <input
                id="gate-password"
                className={cn(styles.input, styles.inputToggleable, error && styles.inputError)}
                type={revealed ? "text" : "password"}
                autoComplete="current-password"
                autoFocus
                value={value}
                onChange={(event) => {
                  setValue(event.target.value);
                  if (error) setError(false);
                }}
                placeholder="••••••••"
                aria-invalid={error}
                aria-describedby="gate-error"
              />
              <button
                type="button"
                className={styles.toggle}
                onClick={() => setRevealed((v) => !v)}
                aria-label={revealed ? "Masquer le mot de passe" : "Afficher le mot de passe"}
                aria-pressed={revealed}
                aria-controls="gate-password"
                title={revealed ? "Masquer le mot de passe" : "Afficher le mot de passe"}
              >
                {revealed ? <EyeOffIcon /> : <EyeIcon />}
              </button>
            </div>
          </div>
          <p id="gate-error" className={styles.error} role="alert">
            {error ? "Mot de passe incorrect. Réessayez." : ""}
          </p>
          <button className={styles.button} type="submit">
            Déverrouiller
          </button>
        </form>
        <div className={styles.foot}>Progix Inc. · Fièrement montréalaise</div>
      </div>
    </div>
  );
}
