"use client";

/**
 * Route-level error boundary for the home (devis) route — branded, with a retry.
 * error.tsx must be a Client Component (it receives a reset callback).
 */
export default function Error({
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div
      style={{
        minHeight: "100dvh",
        display: "grid",
        placeItems: "center",
        padding: "24px",
        background: "linear-gradient(155deg, #06152b, #0c2340 60%, #0e2c52)",
        color: "#bcd2e6",
        fontFamily: "var(--font-body), system-ui, sans-serif",
        textAlign: "center",
      }}
    >
      <div style={{ maxWidth: "30rem" }}>
        <h2
          style={{
            color: "#fff",
            fontFamily: "var(--font-display), var(--font-body), sans-serif",
            fontSize: "22px",
            fontWeight: 700,
            margin: "0 0 10px",
          }}
        >
          Une erreur est survenue
        </h2>
        <p style={{ fontSize: "14px", lineHeight: 1.6, margin: "0 0 20px" }}>
          Le document n’a pas pu être chargé. Veuillez réessayer.
        </p>
        <button
          type="button"
          onClick={reset}
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "8px",
            background: "linear-gradient(135deg, #1e97e0, #38b6ff)",
            color: "#fff",
            fontFamily: "var(--font-display), var(--font-body), sans-serif",
            fontWeight: 600,
            fontSize: "14px",
            padding: "12px 20px",
            borderRadius: "11px",
            border: "none",
            cursor: "pointer",
          }}
        >
          Réessayer
        </button>
      </div>
    </div>
  );
}
