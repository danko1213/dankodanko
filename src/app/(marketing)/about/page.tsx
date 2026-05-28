import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Sparkles, HandHeart, Boxes, Headset, MapPin, Zap } from "lucide-react";
import { StickerCollage } from "@/components/marketing-v2/sticker-collage";
import { StickerCoffee, StickerTable, StickerTip, StickerBell } from "@/components/marketing-v2/stickers";

export const metadata: Metadata = {
  title: "За нас — MasaPay",
  description: "Историята зад MasaPay — софийски екип, който прави обслужването в българските заведения по-просто, по-бързо и по-доходоносно.",
};

const VALUES = [
  { icon: HandHeart, h: "Без триене", p: "Гостът не сваля приложение. Сервитьорът не носи менюта. Кухнята получава директно. Колкото по-малко стъпки, толкова по-добре." },
  { icon: Boxes, h: "Всичко в едно", p: "Меню, поръчки, плащания, бакшиши, аналитика — без шест отделни абонамента и без интеграции." },
  { icon: Sparkles, h: "Дизайнът има значение", p: "QR кодове, които не разваляват масата. Менюто да изглежда вкусно. Дашбордът да е приятен за работа." },
  { icon: Headset, h: "Реална поддръжка", p: "Истински хора в София. Отговор под 5 минути в работно време. Когато е важно — звъним." },
  { icon: MapPin, h: "Локални първи", p: "Български UI и поддръжка. Цени в евро. Работа с Datecs/Tremol. За българския пазар, преди световния." },
  { icon: Zap, h: "Бързо съпровождане", p: "30 минути инсталация. Менюто го правим ние. Първият месец е безплатен, защото вярваме в продукта." },
];

export default function AboutPage() {
  return (
    <>
      {/* Hero */}
      <section className="mp-page-hero">
        <div className="mp-eyebrow mp-reveal">ЗА НАС · СОФИЯ, 2026</div>
        <h1 className="mp-reveal d1">
          Построено от хора, които <em>обичат заведения.</em>
        </h1>
        <p className="mp-reveal d2">
          MasaPay е малък софийски екип, който прекара твърде много часове в кафенета,
          механи и винарни — и реши, че обслужването може да е по-добро. И за госта, и за собственика.
        </p>
      </section>

      {/* Lead image + story */}
      <section className="mp-block">
        <div className="mp-step mp-reveal" style={{ background: "var(--paper-warm)" }}>
          <div className="mp-step-body">
            <div className="mp-step-num">·</div>
            <h3>Започнахме с един въпрос:</h3>
            <p>
              Защо в 2026 г. все още чакаме сервитьор, за да поръчаме капучино?
              Менюто е на масата. Телефонът е в ръката. Плащането е три тапа.
              MasaPay е отговорът — софтуер, който премахва триенето между госта и хубавото обслужване,
              а на собственика дава ясна картина какво се продава, кога и колко.
            </p>
            <div className="mp-vis-langs" style={{ marginTop: 18 }}>
              <span className="mp-lang-pill" style={{ fontFamily: "var(--font-bricolage), sans-serif", textTransform: "none", letterSpacing: 0 }}>2026 · София</span>
              <span className="mp-lang-pill" style={{ fontFamily: "var(--font-bricolage), sans-serif", textTransform: "none", letterSpacing: 0 }}>40+ заведения</span>
              <span className="mp-lang-pill" style={{ fontFamily: "var(--font-bricolage), sans-serif", textTransform: "none", letterSpacing: 0 }}>6 езика</span>
            </div>
          </div>
          <div className="mp-step-art">
            <Image
              src="/images/marketing/hero-cafe.png"
              alt="Гости в софийско кафене с MasaPay меню на телефон"
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
            <div className="mp-eyebrow mp-reveal">КАКВО ВЯРВАМЕ</div>
            <h2 className="mp-reveal d1">
              Шест неща, които правим <em>различно.</em>
            </h2>
          </div>
          <p className="mp-reveal d2">
            Принципите, които използваме като компас всеки път, когато решаваме между „по-просто" и „по-функционално".
          </p>
        </div>

        <div className="mp-values">
          {VALUES.map(({ icon: Icon, h, p }, i) => (
            <div key={h} className={`mp-value mp-reveal d${(i % 4) + 1}`}>
              <div className="ico"><Icon size={26} /></div>
              <h3>{h}</h3>
              <p>{p}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="mp-cta-final-wrap">
        <div className="mp-cta-card">
          <div>
            <div className="mp-eyebrow mp-reveal">ИСКАМЕ ДА СЕ СРЕЩНЕМ</div>
            <h2 className="mp-reveal d1">
              Кафе <em>за наша сметка.</em>
            </h2>
            <p className="mp-reveal d2">
              Покажете ни заведението си — ние ще покажем как MasaPay може да го направи по-просто за гостите ви и по-доходоносно за вас.
            </p>
            <div className="actions mp-reveal d3">
              <Link href="/contact" className="mp-btn mp-btn-primary">Заявете демо</Link>
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
