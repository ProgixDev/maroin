import type { Metadata } from "next";
import { Geist, Geist_Mono, Inter, Playfair_Display, Space_Grotesk } from "next/font/google";
import { MotionProvider } from "@/components/motion";
import { SiteGate } from "@/features/site-gate";
import { site } from "@/core/site";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

// Brand typefaces for the Progix document (referenced as CSS variables from the
// devis + site-gate stylesheets): Space Grotesk for display, Inter for body.
const spaceGrotesk = Space_Grotesk({
  variable: "--font-display",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

// Serif d'affichage, utilisee par le theme Gardien de la Paix.
const playfair = Playfair_Display({
  variable: "--font-serif",
  subsets: ["latin"],
  weight: ["400", "600", "700"],
  display: "swap",
});

const inter = Inter({
  variable: "--font-body",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  applicationName: site.name,
  title: {
    default: site.name,
    template: `%s · ${site.name}`,
  },
  description: site.description,
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    siteName: site.name,
    title: site.name,
    description: site.description,
    url: site.url,
    locale: site.locale,
  },
  twitter: {
    card: "summary_large_image",
    title: site.name,
    description: site.description,
  },
  // Private, password-gated document — keep it out of search indexes.
  robots: { index: false, follow: false },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${spaceGrotesk.variable} ${playfair.variable} ${inter.variable} font-sans antialiased`}
      >
        <MotionProvider>
          <SiteGate>{children}</SiteGate>
        </MotionProvider>
      </body>
    </html>
  );
}
