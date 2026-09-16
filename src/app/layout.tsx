import type { Metadata } from "next";
import { Topbar } from "@/components/layout/topbar";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { GoogleAnalytics } from "@/components/analytics/google-analytics";
import { AdSense } from "@/components/analytics/adsense";
import "./globals.css";

import { Montserrat } from "next/font/google";

const montserrat = Montserrat({
  subsets: ["latin"],
  variable: "--font-montserrat",
});

export const metadata: Metadata = {
  title: "TATAKOA | Viajes, tips y recomendaciones",
  description:
    "Blog y tienda de TATAKOA: guías de viaje, vida nómada, RV, camping y colaboraciones con marcas.",
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
        <AdSense />
      </body>
    </html>
  );
}