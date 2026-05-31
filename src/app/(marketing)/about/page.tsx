import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Sparkles, HandHeart, Boxes, Headset, MapPin, Zap } from "lucide-react";
import { StickerCollage } from "@/components/marketing-v2/sticker-collage";
import { StickerCoffee, StickerTable, StickerTip, StickerBell } from "@/components/marketing-v2/stickers";
import { getLocale, t } from "@/lib/i18n";

const VALUE_ICONS = [HandHeart, Boxes, Sparkles, Headset, MapPin, Zap];

export async function generateMetadata(): Promise<Metadata> {
  const lang = await getLocale();
  const m = t(lang).marketing.about;
  return { title: m.metaTitle, description: m.metaDesc };
}

export default async function AboutPage() {
  const lang = await getLocale();
  const m = t(lang).marketing.about;
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

      {/* Lead image + story */}
      <section className="mp-block">
        <div className="mp-step mp-reveal" style={{ background: "var(--paper-warm)" }}>
          <div className="mp-step-body">
            <div className="mp-step-num">·</div>
            <h3>{m.storyH}</h3>
            <p>{m.storyP}</p>
            <div className="mp-vis-langs" style={{ marginTop: 18 }}>
              <span className="mp-lang-pill" style={{ fontFamily: "var(--font-bricolage), sans-serif", textTransform: "none", letterSpacing: 0 }}>{m.tagSofia}</span>
              <span className="mp-lang-pill" style={{ fontFamily: "var(--font-bricolage), sans-serif", textTransform: "none", letterSpacing: 0 }}>{m.tagVenues}</span>
              <span className="mp-lang-pill" style={{ fontFamily: "var(--font-bricolage), sans-serif", textTransform: "none", letterSpacing: 0 }}>{m.tagLangs}</span>
            </div>
          </div>
          <div className="mp-step-art">
            <Image
              src="/images/marketing/hero-cafe.png"
              alt={m.heroAlt}
              fill
              sizes="(max-width: 1100px) 100vw, 540px"
            />
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="mp-block" style={{ paddingTop: 20 }}>
        <div className="mp-section-head">
          <div>
            <div className="mp-eyebrow mp-reveal">{m.valuesEyebrow}</div>
            <h2 className="mp-reveal d1">
              {m.valuesH}<em>{m.valuesHEm}</em>
            </h2>
          </div>
          <p className="mp-reveal d2">{m.valuesLead}</p>
        </div>

        <div className="mp-values">
          {m.values.map((v, i) => {
            const Icon = VALUE_ICONS[i];
            return (
              <div key={v.h} className={`mp-value mp-reveal d${(i % 4) + 1}`}>
                <div className="ico"><Icon size={26} /></div>
                <h3>{v.h}</h3>
                <p>{v.p}</p>
              </div>
            );
          })}
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
              <a href="mailto:hello@masapay.eu" className="mp-btn mp-btn-ghost">hello@masapay.eu</a>
            </div>
          </div>
          <StickerCollage
            variant="cta"
            items={[
              { className: "s1", node: <StickerCoffee /> },
              { className: "s2", node: <StickerTable label="SOFIA" value="2026" /> },
              { className: "s3", node: <StickerTip label="HELLO" value="!" /> },
              { className: "s4", node: <StickerBell /> },
            ]}
          />
        </div>
      </section>
    </>
  );
}
