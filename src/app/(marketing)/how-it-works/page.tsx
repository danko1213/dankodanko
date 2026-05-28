import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { StickerCollage } from "@/components/marketing-v2/sticker-collage";
import { StickerQR, StickerPlate, StickerCheck, StickerCoralBadge } from "@/components/marketing-v2/stickers";

export const metadata: Metadata = {
  title: "Как работи — MasaPay",
  description: "Три стъпки от QR код до платена поръчка. MasaPay прави обслужването на гостите без триене за тях и без работа за вас.",
};

const STEPS = [
  {
    n: "01",
    h: "Сканира QR кода",
    p: "Гостът насочва камерата на телефона си към QR кода на масата. Менюто се отваря моментално в браузъра — без приложение, без регистрация. Работи на всеки телефон от 2015 г. насам.",
    img: "/images/marketing/demo-menu-1.png",
    alt: "Гост сканира QR кода на ресторантска маса",
    bullets: ["Без приложение", "Без регистрация", "BG · EN · DE · FR · IT · RU"],
  },
  {
    n: "02",
    h: "Разглежда и поръчва",
    p: "Гостът разглежда менюто със снимки, описания и алергени. Избира варианти, добавя добавки, премахва съставки, оставя бележка. Всичко — от телефона, без да чака сервитьор.",
    img: "/images/marketing/demo-menu-2.png",
    alt: "Меню на MasaPay с категории и снимки",
    bullets: ["Снимки в HD", "Варианти и добавки", "Алергени и бележки"],
  },
  {
    n: "03",
    h: "Плаща и дава бакшиш",
    p: "Apple Pay, Google Pay или карта — в три тапа. Гостът избира бакшиш, плаща и получава касов бон по имейл. Поръчката тръгва моментално към кухнята и бара, разделена по секции.",
    img: "/images/marketing/demo-menu-3.png",
    alt: "Потвърждение на успешно плащане в MasaPay",
    bullets: ["Apple/Google Pay", "Бакшиш в едно докосване", "Касов бон по имейл"],
  },
];

export default function HowItWorksPage() {
  return (
    <>
      {/* Hero */}
      <section className="mp-page-hero">
        <div className="mp-eyebrow mp-reveal">ТРИ СТЪПКИ · ПЪЛЕН ЦИКЪЛ</div>
        <h1 className="mp-reveal d1">
          От QR код до платена <em>поръчка.</em>
        </h1>
        <p className="mp-reveal d2">
          MasaPay свежда обслужването до три стъпки за госта и нула стъпки за вас.
          Ето как изглежда от двете страни на масата.
        </p>
      </section>

      {/* Steps */}
      <section className="mp-block">
        <div className="mp-steps">
          {STEPS.map((s, i) => (
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
                <Image src={s.img} alt={s.alt} fill sizes="(max-width: 1100px) 100vw, 540px" />
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="mp-cta-final-wrap">
        <div className="mp-cta-card">
          <div>
            <div className="mp-eyebrow mp-reveal">ВРЕМЕ ЗА ВАС</div>
            <h2 className="mp-reveal d1">
              30 минути <em>и сте на живо.</em>
            </h2>
            <p className="mp-reveal d2">
              Ние правим менюто, печатаме QR стикерите, обучаваме персонала.
              Първият месец е безплатен — без ангажимент, без скрити такси.
            </p>
            <div className="actions mp-reveal d3">
              <Link href="/contact" className="mp-btn mp-btn-primary">Заявете демо</Link>
              <Link href="/features" className="mp-btn mp-btn-ghost">Вижте функциите</Link>
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
