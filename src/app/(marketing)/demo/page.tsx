import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Smartphone } from "lucide-react";
import { StickerCollage } from "@/components/marketing-v2/sticker-collage";
import {
  StickerCoffee, StickerCard, StickerTable, StickerTip,
} from "@/components/marketing-v2/stickers";

export const metadata: Metadata = {
  title: "Демо менюта — MasaPay",
  description: "Три готови визуални примера за различни типове заведения. Брънч, коктейл бар и българска механа.",
};

const demos = [
  {
    number: "01",
    title: "Брънч меню",
    description: "Свежо меню за закуска — авокадо тостове, яйца Бенедикт и специално кафе.",
    href: "/menus/brunch",
    tone: "",
  },
  {
    number: "02",
    title: "Коктейл бар",
    description: "Тъмно неоново меню за хаус бар с коктейли, количка и бележки към бара.",
    href: "/menus/cocktails",
    tone: "green",
  },
  {
    number: "03",
    title: "Българска механа",
    description: "Традиционно топло меню със съставки, алергени и възможност за бележки.",
    href: "/menus/bulgarian",
    tone: "cream",
  },
];

export default function DemoPage() {
  return (
    <>
      <section className="mp-page-hero">
        <div className="mp-eyebrow mp-reveal">ДЕМО МЕНЮТА · ОТВОРЕНИ ЗА РАЗГЛЕЖДАНЕ</div>
        <h1 className="mp-reveal d1">
          Изберете <em>демо меню.</em>
        </h1>
        <p className="mp-reveal d2">
          Три готови визуални примера за различни типове заведения. Всяко е оптимизирано за телефон —
          точно както го вижда гостът след сканиране на QR кода на масата.
        </p>
        <div className="mp-hero-ctas mp-reveal d3" style={{ marginTop: 24 }}>
          <Link href="/contact" className="mp-btn mp-btn-primary">Заявете демо</Link>
          <Link href="/how-it-works" className="mp-btn mp-btn-ghost">Вижте как работи</Link>
        </div>
      </section>

      <section className="mp-block">
        <div className="mp-features-grid">
          {demos.map((d) => (
            <article
              key={d.href}
              className={`mp-feat span2 ${d.tone} mp-reveal`}
              style={{ minHeight: 0, paddingBottom: 22 }}
            >
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  marginBottom: 14,
                }}
              >
                <div className="mp-ft-num">{d.number}</div>
                <span
                  aria-hidden="true"
                  style={{
                    width: 36,
                    height: 36,
                    borderRadius: 12,
                    background: "var(--green-pop)",
                    color: "var(--green-deep)",
                    border: "1.5px solid var(--ink)",
                    display: "grid",
                    placeItems: "center",
                    transform: "rotate(-4deg)",
                  }}
                >
                  <Smartphone size={18} />
                </span>
              </div>
              <h3 style={{ marginTop: 0 }}>{d.title}</h3>
              <p style={{ marginBottom: 16 }}>{d.description}</p>

              <div
                style={{
                  margin: "8px auto 18px",
                  width: "100%",
                  maxWidth: 280,
                  background: "#0a0a0a",
                  borderRadius: 34,
                  padding: 8,
                  boxShadow: "0 24px 60px -20px rgba(20,30,20,.35)",
                }}
              >
                <div
                  style={{
                    position: "relative",
                    height: 520,
                    overflow: "hidden",
                    borderRadius: 26,
                    background: "var(--paper)",
                  }}
                >
                  <iframe
                    src={d.href}
                    className="masapay-demo-iframe"
                    title={`${d.title} — преглед`}
                    loading="lazy"
                  />
                </div>
              </div>

              <Link
                href={d.href}
                className="mp-btn mp-btn-primary"
                style={{
                  marginTop: "auto",
                  width: "100%",
                  justifyContent: "center",
                }}
              >
                Отвори меню <ArrowRight size={16} />
              </Link>
            </article>
          ))}
        </div>

        <div
          style={{
            marginTop: 40,
            display: "flex",
            flexWrap: "wrap",
            gap: 12,
            justifyContent: "center",
          }}
          className="mp-reveal d2"
        >
          <Link href="/m/demo-t1" className="mp-btn mp-btn-ghost">
            Старото функционално демо <ArrowRight size={16} />
          </Link>
          <Link href="/contact" className="mp-btn mp-btn-primary">
            Искам го за моя ресторант
          </Link>
        </div>
      </section>

      <section className="mp-cta-final-wrap">
        <div className="mp-cta-card">
          <div>
            <div className="mp-eyebrow mp-reveal">ГОТОВИ?</div>
            <h2 className="mp-reveal d1">
              30 минути <em>и сте на живо.</em>
            </h2>
            <p className="mp-reveal d2">
              Изпратете ни менюто си — ние правим QR кодовете, печатаме стикерите и обучаваме персонала.
              Първият месец е безплатен, без ангажимент.
            </p>
            <div className="actions mp-reveal d3">
              <Link href="/contact" className="mp-btn mp-btn-primary">Заявете демо</Link>
              <a href="tel:+359885202277" className="mp-btn mp-btn-ghost">+359 88 520 2277</a>
            </div>
          </div>
          <StickerCollage
            variant="cta"
            items={[
              { className: "s1", node: <StickerCoffee /> },
              { className: "s2", node: <StickerCard /> },
              { className: "s3", node: <StickerTable label="DEMO" value="LIVE" /> },
              { className: "s4", node: <StickerTip label="FREE" value="30d" /> },
            ]}
          />
        </div>
      </section>
    </>
  );
}
