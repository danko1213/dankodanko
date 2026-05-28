import type { Metadata } from "next";
import Link from "next/link";
import { StickerCollage } from "@/components/marketing-v2/sticker-collage";
import { StickerQR, StickerCheck, StickerPlate, StickerTip } from "@/components/marketing-v2/stickers";

export const metadata: Metadata = {
  title: "Функции — MasaPay",
  description: "Всичко, което MasaPay прави за вашето заведение: QR меню, поръчки, бакшиши, аналитика, многоезичност и интеграция с касов апарат.",
};

const SECTIONS = [
  {
    eyebrow: "01 · МЕНЮ",
    title: "Меню, което продава.",
    body: "Снимки в HD, описания, алергени, варианти, добавки. Гостът разглежда, добавя в количка и поръчва от едно място. Менюто се обновява моментално — без печатане, без чакане.",
    bullets: ["Категории и подкатегории", "Снимки и описания", "Алергени и тагове", "Варианти и добавки"],
  },
  {
    eyebrow: "02 · ПОРЪЧКИ",
    title: "Поръчки на 6 езика.",
    body: "Автоматичен превод на BG, EN, DE, FR, IT, RU — гостът избира своя език при сканиране на QR кода. Без двойни менюта, без обърквания.",
    bullets: ["Български + 5 езика", "Откриване на езика автоматично", "Локализиран UI и тагове", "Допълнителни бележки от госта"],
  },
  {
    eyebrow: "03 · ПЛАЩАНИЯ",
    title: "Apple Pay, Google Pay, карта.",
    body: "Три тапа от меню до плащане. Без хартиени менюта, без забавяне, без сметка чрез сервитьор. Парите се прехвърлят директно по вашата сметка.",
    bullets: ["Apple Pay & Google Pay", "Карти Visa/Mastercard", "Раздели сметката", "Автоматичен касов бон"],
  },
  {
    eyebrow: "04 · БАКШИШ",
    title: "Бакшиши директно при персонала.",
    body: "Гостите дават средно 3× повече бакшиш, когато опцията е вградена в плащането. Разделете автоматично между смяна, кухня и бар.",
    bullets: ["5% / 10% / 12% / 15%", "Свободна сума", "Автоматично разделяне", "Седмични изплащания"],
  },
  {
    eyebrow: "05 · АНАЛИТИКА",
    title: "Аналитика, която вземате на ръка.",
    body: "Кои ястия се продават най-много, в кой час, на коя маса. Сезонни тенденции, маржове, бакшиши. Експорт към счетоводство с един клик.",
    bullets: ["Поръчки в реално време", "Топ продажби и часове", "Експорт CSV / Excel", "Интеграция с счетоводен софтуер"],
  },
  {
    eyebrow: "06 · ИНТЕГРАЦИИ",
    title: "Работи с вашия касов апарат.",
    body: "Datecs, Tremol, Eltrade. POS интеграции, кухненски екрани, принтери за бар. Без преинсталация, без обучение на персонала.",
    bullets: ["Datecs / Tremol / Eltrade", "Кухненски дисплеи", "Принтери за бар", "Webhook API"],
  },
];

export default function FeaturesPage() {
  return (
    <>
      {/* Hero */}
      <section className="mp-page-hero">
        <div className="mp-eyebrow mp-reveal">ВСИЧКО ВКЛЮЧЕНО · БЕЗ СКРИТИ ТАКСИ</div>
        <h1 className="mp-reveal d1">
          Един инструмент. <em>Цялото заведение.</em>
        </h1>
        <p className="mp-reveal d2">
          От меню до касов бон, от поръчка до аналитика — MasaPay обединява всичко,
          което гостът и собственикът виждат. Шест истории, едно решение.
        </p>
        <div className="mp-hero-ctas mp-reveal d3" style={{ marginTop: 24 }}>
          <Link href="/contact" className="mp-btn mp-btn-primary">Заявете демо</Link>
          <Link href="/how-it-works" className="mp-btn mp-btn-ghost">Вижте как работи</Link>
        </div>
      </section>

      {/* Feature grid */}
      <section className="mp-block">
        <div className="mp-features-grid">
          {SECTIONS.map((s, i) => {
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
            <div className="mp-eyebrow mp-reveal" style={{ color: "var(--ink-soft)" }}>ДЕВЕТ СТИКЕРА · ЕДНА ИСТОРИЯ</div>
            <h2 className="mp-reveal d1" style={{ color: "var(--ink)" }}>
              Всичко започва с <em>един QR код.</em>
            </h2>
            <p className="mp-reveal d2" style={{ color: "var(--ink-soft)" }}>
              Гост · меню · поръчка · кухня · плащане · бакшиш · бон · повтори.
              MasaPay затваря пълния цикъл, без хартия и без сервитьор за вземане на поръчка.
            </p>
            <div className="actions mp-reveal d3">
              <Link href="/contact" className="mp-btn mp-btn-primary">Заявете демо</Link>
              <Link href="/" className="mp-btn mp-btn-ghost">Към началото</Link>
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
