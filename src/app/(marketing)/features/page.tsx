import type { Metadata } from "next";
import Link from "next/link";
import { StickerCollage } from "@/components/marketing-v2/sticker-collage";
import { StickerQR, StickerCheck, StickerPlate, StickerTip } from "@/components/marketing-v2/stickers";
import { getLocale, t } from "@/lib/i18n";

export const revalidate = 3600;

export async function generateMetadata(): Promise<Metadata> {
  const lang = await getLocale();
  const m = t(lang).marketing.features;
  return {
    title: m.metaTitle,
    description: m.metaDesc,
    alternates: { canonical: "/features" },
    openGraph: { title: `${m.metaTitle} — MasaPay`, description: m.metaDesc, url: "/features" },
  };
}

export default async function FeaturesPage() {
  const lang = await getLocale();
  const m = t(lang).marketing.features;
  return (
    <>
      {/* Hero */}
      <section className="mp-page-hero">
        <div className="mp-eyebrow mp-reveal">{m.heroEyebrow}</div>
        <h1 className="mp-reveal d1">
          {m.heroH}<em>{m.heroHEm}</em>
        </h1>
        <p className="mp-reveal d2">{m.heroSub}</p>
        <div className="mp-hero-ctas mp-reveal d3" style={{ marginTop: 24 }}>
          <Link href="/contact" className="mp-btn mp-btn-primary">{m.ctaPrimary}</Link>
          <Link href="/how-it-works" className="mp-btn mp-btn-ghost">{m.ctaSecondary}</Link>
        </div>
      </section>

      {/* Feature grid */}
      <section className="mp-block">
        <div className="mp-features-grid">
          {m.sections.map((s, i) => {
            const span = i % 3 === 0 ? "span3" : i % 3 === 1 ? "span3" : "span6";
            const tint = i === 2 ? "pop" : i === 4 ? "green" : i === 1 ? "cream" : "";
            return (
              <div key={s.eyebrow} className={`mp-feat ${span} ${tint} mp-reveal`} style={{ minHeight: 320 }}>
                <div className="mp-ft-num">{s.eyebrow}</div>
                <h3>{s.title}</h3>
                <p>{s.body}</p>
                <div className="vis">
                  <div className="mp-vis-langs">
                    {s.bullets.map((b) => (
                      <span key={b} className="mp-lang-pill" style={{ fontFamily: "var(--font-bricolage), sans-serif", textTransform: "none", letterSpacing: 0, fontSize: 12 }}>
                        {b}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Sticker showcase */}
      <section className="mp-cta-final-wrap">
        <div className="mp-cta-card" style={{ background: "var(--paper-warm)", color: "var(--ink)", border: "1.5px solid var(--ink)" }}>
          <div>
            <div className="mp-eyebrow mp-reveal" style={{ color: "var(--ink-soft)" }}>{m.finalEyebrow}</div>
            <h2 className="mp-reveal d1" style={{ color: "var(--ink)" }}>
              {m.finalH}<em>{m.finalHEm}</em>
            </h2>
            <p className="mp-reveal d2" style={{ color: "var(--ink-soft)" }}>{m.finalSub}</p>
            <div className="actions mp-reveal d3">
              <Link href="/contact" className="mp-btn mp-btn-primary">{m.finalCta1}</Link>
              <Link href="/" className="mp-btn mp-btn-ghost">{m.finalCta2}</Link>
            </div>
          </div>
          <StickerCollage
            variant="cta"
            items={[
              { className: "s1", node: <StickerQR /> },
              { className: "s2", node: <StickerPlate /> },
              { className: "s3", node: <StickerTip /> },
              { className: "s4", node: <StickerCheck /> },
            ]}
          />
        </div>
      </section>

    </>
  );
}
