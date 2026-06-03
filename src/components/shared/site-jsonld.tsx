const SITE_URL = "https://www.masapay.eu";

const graph = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": `${SITE_URL}/#organization`,
      name: "MasaPay",
      legalName: "MasaPay ООД",
      url: SITE_URL,
      logo: {
        "@type": "ImageObject",
        url: `${SITE_URL}/icon.png`,
        width: 512,
        height: 512,
      },
      foundingDate: "2026",
      foundingLocation: {
        "@type": "Place",
        address: { "@type": "PostalAddress", addressLocality: "Sofia", addressCountry: "BG" },
      },
      address: {
        "@type": "PostalAddress",
        addressLocality: "Sofia",
        addressRegion: "Sofia-grad",
        addressCountry: "BG",
      },
      contactPoint: [
        {
          "@type": "ContactPoint",
          telephone: "+359-88-520-2277",
          contactType: "sales",
          availableLanguage: ["Bulgarian", "English"],
          areaServed: "BG",
        },
      ],
      sameAs: [],
    },
    {
      "@type": "WebSite",
      "@id": `${SITE_URL}/#website`,
      url: SITE_URL,
      name: "MasaPay",
      inLanguage: "bg-BG",
      publisher: { "@id": `${SITE_URL}/#organization` },
    },
    {
      "@type": "SoftwareApplication",
      "@id": `${SITE_URL}/#software`,
      name: "MasaPay",
      operatingSystem: "Web, iOS, Android",
      applicationCategory: "BusinessApplication",
      applicationSubCategory: "Restaurant POS",
      url: SITE_URL,
      description:
        "QR меню и поръчки за ресторанти и кафенета. Гостите сканират, поръчват, оставят бакшиш и плащат от телефона си.",
      inLanguage: ["bg", "en", "de", "fr", "it", "ru"],
      offers: {
        "@type": "Offer",
        priceCurrency: "EUR",
        price: "30",
        priceValidUntil: "2027-12-31",
        availability: "https://schema.org/InStock",
        description: "Първи месец безплатно. Без скрити такси.",
      },
      publisher: { "@id": `${SITE_URL}/#organization` },
    },
  ],
};

export function SiteJsonLd() {
  return (
    <script
      type="application/ld+json"
      // eslint-disable-next-line react/no-danger
      dangerouslySetInnerHTML={{ __html: JSON.stringify(graph) }}
    />
  );
}
