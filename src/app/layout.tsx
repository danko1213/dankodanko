import type { Metadata, Viewport } from "next";
import { Inter, Playfair_Display, Bricolage_Grotesque, JetBrains_Mono } from "next/font/google";
import { Toaster } from "@/components/ui/sonner";
import { CookieBanner } from "@/components/shared/cookie-banner";
import { AnalyticsScripts } from "@/components/shared/analytics-scripts";
import { SiteJsonLd } from "@/components/shared/site-jsonld";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin", "cyrillic"],
});

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin", "cyrillic"],
});

const bricolage = Bricolage_Grotesque({
  variable: "--font-bricolage",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  display: "swap",
});

const jetbrains = JetBrains_Mono({
  variable: "--font-jetbrains",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

const SITE_URL = "https://www.masapay.eu";

export const viewport: Viewport = {
  themeColor: "#0f9d58",
  width: "device-width",
  initialScale: 1,
};

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "MasaPay — Дигитално меню и поръчки за ресторанти",
    template: "%s — MasaPay",
  },
  description:
    "QR система за поръчки в ресторанти и кафенета. По-малко персонал, повече приходи, нула грешки.",
  keywords: [
    "QR меню",
    "ресторант",
    "дигитално меню",
    "поръчки",
    "MasaPay",
    "София",
    "POS",
    "бакшиш",
  ],
  applicationName: "MasaPay",
  authors: [{ name: "MasaPay", url: SITE_URL }],
  creator: "MasaPay",
  publisher: "MasaPay",
  alternates: {
    canonical: "/",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large", "max-snippet": -1 },
  },
  openGraph: {
    type: "website",
    locale: "bg_BG",
    url: SITE_URL,
    siteName: "MasaPay",
    title: "MasaPay — Дигитално меню и поръчки за ресторанти",
    description:
      "QR система за поръчки в ресторанти и кафенета. По-малко персонал, повече приходи, нула грешки.",
  },
  twitter: {
    card: "summary_large_image",
    title: "MasaPay — Дигитално меню и поръчки за ресторанти",
    description: "QR меню и поръчки за заведения. Първи месец безплатно.",
  },
  verification: {
    google: "googlef38967a4ad3bb785",
  },
  category: "business",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="bg" className={`${inter.variable} ${playfair.variable} ${bricolage.variable} ${jetbrains.variable}`}>
      <body className="min-h-screen bg-background font-sans antialiased">
        <SiteJsonLd />
        {children}
        <Toaster position="top-center" />
        <CookieBanner />
        <AnalyticsScripts />
      </body>
    </html>
  );
}
