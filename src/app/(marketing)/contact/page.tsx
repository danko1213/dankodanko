import type { Metadata } from "next";
import { getLocale, t } from "@/lib/i18n";
import { ContactForm } from "./contact-form";

export const revalidate = 3600;

export async function generateMetadata(): Promise<Metadata> {
  const lang = await getLocale();
  const m = t(lang).marketing.contactPage;
  return {
    title: m.metaTitle,
    description: m.metaDesc,
    alternates: { canonical: "/contact" },
    openGraph: { title: `${m.metaTitle} — MasaPay`, description: m.metaDesc, url: "/contact" },
  };
}

const contactJsonLd = {
  "@context": "https://schema.org",
  "@type": "ContactPage",
  url: "https://www.masapay.eu/contact",
  inLanguage: "bg-BG",
  about: { "@id": "https://www.masapay.eu/#organization" },
  mainEntity: {
    "@type": "Organization",
    "@id": "https://www.masapay.eu/#organization",
    name: "MasaPay",
    url: "https://www.masapay.eu",
    contactPoint: [
      {
        "@type": "ContactPoint",
        telephone: "+359-88-520-2277",
        contactType: "sales",
        availableLanguage: ["Bulgarian", "English"],
        areaServed: "BG",
      },
      {
        "@type": "ContactPoint",
        telephone: "+359-88-520-2277",
        contactType: "customer support",
        availableLanguage: ["Bulgarian", "English"],
        hoursAvailable: "Mo-Su 08:00-23:00",
      },
    ],
  },
};

export default async function ContactPage() {
  const lang = await getLocale();
  const m = t(lang).marketing.contactPage;
  return (
    <>
      <script
        type="application/ld+json"
        // eslint-disable-next-line react/no-danger
        dangerouslySetInnerHTML={{ __html: JSON.stringify(contactJsonLd) }}
      />
      <ContactForm m={m} />
    </>
  );
}
