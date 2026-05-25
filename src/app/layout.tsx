import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
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
    <html lang="bg" className={`${inter.variable} ${playfair.variable}`}>
      <body className="min-h-screen bg-background font-sans antialiased">
        {children}
        <Toaster position="top-center" />
        <CookieBanner />
        <AnalyticsScripts />
      </body>
    </html>
  );
}
