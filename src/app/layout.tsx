import type { Metadata } from "next";
import { Topbar } from "@/components/layout/topbar";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { GoogleAnalytics } from "@/components/analytics/google-analytics";
import { SITE_URL } from "@/lib/site";
import "./globals.css";

import localFont from "next/font/local";

// Montserrat servida desde el propio sitio (sin depender de Google Fonts).
// Archivos variables (peso 100–900) recortados a caracteres latinos.
const montserrat = localFont({
  src: [
    { path: "./fonts/Montserrat-Variable.woff2", weight: "100 900", style: "normal" },
    { path: "./fonts/Montserrat-Italic-Variable.woff2", weight: "100 900", style: "italic" },
  ],
  variable: "--font-montserrat",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: "TATAKOA | Planes, guías y plantillas de viaje",
  description:
    "Planes de la semana en DC, New York y Miami, guías de viaje y plantillas para organizar tus viajes por USA.",
  openGraph: {
    type: "website",
    siteName: "TATAKOA",
    locale: "es_US",
    images: [{ url: "/tatakoa-hero.png", alt: "TATAKOA — Where Every Journey Begins" }],
  },
  other: {
    "google-adsense-account": "ca-pub-3914373007497165",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es" className={montserrat.variable}>
      <body className="min-h-screen flex flex-col bg-tatakoa-white text-tatakoa-charcoal antialiased">
        <Topbar />
        <Navbar />
        <main className="flex-1">{children}</main>
        <Footer />
        <GoogleAnalytics />
      </body>
    </html>
  );
}