import type { Metadata } from "next";
import { Inter, Playfair_Display, Bricolage_Grotesque, JetBrains_Mono } from "next/font/google";
import { Toaster } from "@/components/ui/sonner";
import { CookieBanner } from "@/components/shared/cookie-banner";
import { AnalyticsScripts } from "@/components/shared/analytics-scripts";
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

export const metadata: Metadata = {
  title: {
    default: "MasaPay - Дигитално меню и поръчки за ресторанти",
    template: "%s | MasaPay",
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
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="bg" className={`${inter.variable} ${playfair.variable} ${bricolage.variable} ${jetbrains.variable}`}>
      <body className="min-h-screen bg-background font-sans antialiased">
        {children}
        <Toaster position="top-center" />
        <CookieBanner />
        <AnalyticsScripts />
      </body>
    </html>
  );
}
