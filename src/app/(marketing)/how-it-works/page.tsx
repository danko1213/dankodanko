import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { StickerCollage } from "@/components/marketing-v2/sticker-collage";
import { StickerQR, StickerPlate, StickerCheck, StickerCoralBadge } from "@/components/marketing-v2/stickers";
import { getLocale, t } from "@/lib/i18n";

const STEP_IMAGES = [
  "/images/marketing/demo-menu-1.png",
  "/images/marketing/demo-menu-2.png",
  "/images/marketing/demo-menu-3.png",
];

export async function generateMetadata(): Promise<Metadata> {
  const lang = await getLocale();
  const m = t(lang).marketing.howItWorks;
  return { title: m.metaTitle, description: m.metaDesc };
}

export default async function HowItWorksPage() {
  const lang = await getLocale();
  const m = t(lang).marketing.howItWorks;
  return (
    <>
      {/* Hero */}
      <section className="mp-page-hero">
        <div className="mp-eyebrow mp-reveal">{m.heroEyebrow}</div>
        <h1 className="mp-reveal d1">
          {m.heroH}<em>{m.heroHEm}</em>
        </h1>
        <p className="mp-reveal d2">{m.heroSub}</p>
      </section>

      {/* Steps */}
      <section className="mp-block">
        <div className="mp-steps">
          {m.steps.map((s, i) => (
            <article key={s.n} className={`mp-step mp-reveal ${i % 2 === 1 ? "flip" : ""}`}>
              <div className="mp-step-body">
                <div className="mp-step-num">{s.n}</div>
                <h3>{s.h}</h3>
                <p>{s.p}</p>
                <div className="mp-vis-langs" style={{ marginTop: 20 }}>
                  {s.bullets.map((b) => (
                    <span
                      key={b}
                      className="mp-lang-pill"
                      style={{
                        fontFamily: "var(--font-bricolage), sans-serif",
                        textTransform: "none",
                        letterSpacing: 0,
                        fontSize: 12,
                      }}
                    >
                      {b}
                    </span>
                  ))}
                </div>
              </div>
              <div className="mp-step-art">
                <Image src={STEP_IMAGES[i]} alt={s.alt} fill sizes="(max-width: 1100px) 100vw, 540px" />
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="mp-cta-final-wrap">
        <div className="mp-cta-card">
          <div>
            <div className="mp-eyebrow mp-reveal">{m.ctaEyebrow}</div>
            <h2 className="mp-reveal d1">
              {m.ctaH}<em>{m.ctaHEm}</em>
            </h2>
            <p className="mp-reveal d2">{m.ctaSub}</p>
            <div className="actions mp-reveal d3">
              <Link href="/contact" className="mp-btn mp-btn-primary">{m.ctaPrimary}</Link>
              <Link href="/features" className="mp-btn mp-btn-ghost">{m.ctaSecondary}</Link>
            </div>
          </div>
          <StickerCollage
            variant="cta"
            items={[
              { className: "s1", node: <StickerQR /> },
              { className: "s2", node: <StickerCoralBadge label="DEMO" value="LIVE" /> },
              { className: "s3", node: <StickerCheck /> },
              { className: "s4", node: <StickerPlate /> },
            ]}
          />
        </div>
      </section>
    </>
  );
}
