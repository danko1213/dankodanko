import type { Metadata } from "next";
import Link from "next/link";
import { getLocale, t } from "@/lib/i18n";

export const revalidate = 3600;

export async function generateMetadata(): Promise<Metadata> {
  const lang = await getLocale();
  const m = t(lang).marketing.pricing;
  return {
    title: m.metaTitle,
    description: m.metaDesc,
    alternates: { canonical: "/pricing" },
    openGraph: { title: `${m.metaTitle} — MasaPay`, description: m.metaDesc, url: "/pricing" },
  };
}

const buildFaqJsonLd = (faqs: ReadonlyArray<{ q: string; a: string }>) => ({
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqs.map((f) => ({
    "@type": "Question",
    name: f.q,
    acceptedAnswer: { "@type": "Answer", text: f.a },
  })),
});

const productJsonLd = {
  "@context": "https://schema.org",
  "@type": "Product",
  name: "MasaPay",
  description:
    "QR меню и поръчки за ресторанти и кафенета. Без процент от продажбите, първи месец безплатно.",
  brand: { "@type": "Brand", name: "MasaPay" },
  offers: [
    {
      "@type": "Offer",
      name: "Кафе",
      priceCurrency: "EUR",
      price: "30",
      availability: "https://schema.org/InStock",
      url: "https://www.masapay.eu/pricing",
    },
    {
      "@type": "Offer",
      name: "Ресторант",
      priceCurrency: "EUR",
      price: "75",
      availability: "https://schema.org/InStock",
      url: "https://www.masapay.eu/pricing",
    },
  ],
};

export default async function PricingPage() {
  const lang = await getLocale();
  const m = t(lang).marketing.pricing;
  const home = t(lang).marketing.home;
  const faqJsonLd = buildFaqJsonLd(m.faqs);

  return (
    <>
      <script
        type="application/ld+json"
        // eslint-disable-next-line react/no-danger
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
      <script
        type="application/ld+json"
        // eslint-disable-next-line react/no-danger
        dangerouslySetInnerHTML={{ __html: JSON.stringify(productJsonLd) }}
      />

      {/* Hero */}
      <section className="mp-page-hero">
        <div className="mp-eyebrow mp-reveal">{m.heroEyebrow}</div>
        <h1 className="mp-reveal d1">
          {m.heroH}<em>{m.heroHEm}</em>
        </h1>
        <p className="mp-reveal d2">{m.heroSub}</p>
      </section>

      {/* Tiers (reuse the home pricing wording) */}
      <section className="mp-block" id="tiers">
        <div className="mp-pricing-grid">
          <div className="mp-price-card mp-reveal">
            <div className="tier"><span>{home.tier1Name}</span></div>
            <div className="desc">{home.tier1Desc}</div>
            <div className="price"><span>30</span><small>{home.tier1PerMonth}</small></div>
            <ul>
              <li>{home.tier1F1}</li>
              <li>{home.tier1F2}</li>
              <li>{home.tier1F3}</li>
              <li>{home.tier1F4}</li>
            </ul>
            <Link href="/contact" className="pick-btn" style={{ textAlign: "center" }}>{home.tier1Cta}</Link>
          </div>

          <div className="mp-price-card featured mp-reveal d1">
            <div className="tier">
              <span>{home.tier2Name}</span>
              <span className="badge">{home.tier2Badge}</span>
            </div>
            <div className="desc">{home.tier2Desc}</div>
            <div className="price"><span>75</span><small>{home.tier1PerMonth}</small></div>
            <ul>
              <li>{home.tier2F1}</li>
              <li>{home.tier2F2}</li>
              <li>{home.tier2F3}</li>
              <li>{home.tier2F4}</li>
              <li>{home.tier2F5}</li>
              <li>{home.tier2F6}</li>
            </ul>
            <Link href="/contact" className="pick-btn" style={{ textAlign: "center" }}>{home.tier2Cta}</Link>
          </div>

          <div className="mp-price-card mp-reveal d2">
            <div className="tier"><span>{home.tier3Name}</span></div>
            <div className="desc">{home.tier3Desc}</div>
            <div className="price"><span style={{ fontSize: 36 }}>{home.tier3Price}</span></div>
            <div style={{ fontSize: 13, color: "var(--ink-mute)", marginTop: -12 }}>{home.tier3Sub}</div>
            <ul>
              <li>{home.tier3F1}</li>
              <li>{home.tier3F2}</li>
              <li>{home.tier3F3}</li>
              <li>{home.tier3F4}</li>
            </ul>
            <Link href="/contact" className="pick-btn" style={{ textAlign: "center" }}>{home.tier3Cta}</Link>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="mp-block" id="faq">
        <div className="mp-section-head">
          <div>
            <div className="mp-eyebrow mp-reveal">{m.faqEyebrow}</div>
            <h2 className="mp-reveal d1">
              {m.faqH}<em>{m.faqHEm}</em>
            </h2>
          </div>
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
            gap: 20,
            marginTop: 24,
          }}
        >
          {m.faqs.map((f) => (
            <article key={f.q} className="mp-feat mp-reveal" style={{ padding: 24 }}>
              <h3 style={{ marginBottom: 10 }}>{f.q}</h3>
              <p style={{ margin: 0 }}>{f.a}</p>
            </article>
          ))}
        </div>
      </section>

      {/* Final CTA */}
      <section className="mp-cta-final-wrap" id="cta">
        <div className="mp-cta-card">
          <div>
            <div className="mp-eyebrow mp-reveal">{m.ctaEyebrow}</div>
            <h2 className="mp-reveal d1">
              {m.ctaH}<em>{m.ctaHEm}</em>
            </h2>
            <p className="mp-reveal d2">{m.ctaSub}</p>
            <div className="actions mp-reveal d3">
              <Link href="/contact" className="mp-btn mp-btn-primary">{m.ctaPrimary}</Link>
              <a href="tel:+359885202277" className="mp-btn mp-btn-ghost">+359 88 520 2277</a>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
