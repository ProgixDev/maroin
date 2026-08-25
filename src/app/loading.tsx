/**
 * Route-level streaming fallback for the home (devis) route. The document is a
 * static composition so this rarely renders, but the app-router convention is
 * that every feature route ships one.
 */
export default function Loading() {
  return (
    <div
      style={{
        minHeight: "100dvh",
        display: "grid",
        placeItems: "center",
        background: "linear-gradient(155deg, #06152b, #0c2340 60%, #0e2c52)",
        color: "#bcd2e6",
        fontFamily: "var(--font-body), system-ui, sans-serif",
      }}
    >
      <p style={{ fontSize: "14px", letterSpacing: "0.3px" }}>Chargement du document…</p>
    </div>
  );
}
