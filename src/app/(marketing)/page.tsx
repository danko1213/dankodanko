import Link from "next/link";
import { HeroPhone } from "@/components/marketing-v2/hero-phone";
import { LiveDashboard } from "@/components/marketing-v2/live-dashboard";
import { StickerCollage } from "@/components/marketing-v2/sticker-collage";
import {
  StickerCoffee, StickerQR, StickerReceipt, StickerPlate, StickerTip,
  StickerTable, StickerCheck, StickerCard, StickerBell, StickerCoralBadge,
  StickerLemonBox,
} from "@/components/marketing-v2/stickers";

export default function HomePage() {
  return (
    <>
      {/* ============ HERO ============ */}
      <section className="mp-hero">
        <div className="mp-hero-grid">
          {/* LEFT: paper + big type + sticker collage (now safely contained) */}
          <div className="mp-hero-left">
            <div>
              <div className="mp-eyebrow mp-reveal">QR ПОРЪЧКИ ЗА ЗАВЕДЕНИЯ · СОФИЯ</div>
              <h1 className="mp-hero-title mp-reveal d1">
                <span>Менюто е </span>
                <span>на </span>
                <span className="em">масата.</span><br />
                <span>Поръчката</span>
                <span className="dash" />
                <span className="em-pop">в кухнята.</span>
              </h1>
              <p className="mp-hero-sub mp-reveal d2">
                MasaPay превръща всяка маса в самостоятелен POS. Гостите сканират,
                поръчват, оставят бакшиш и плащат от телефона си.
              </p>
              <div className="mp-hero-ctas mp-reveal d3">
                <Link href="/contact" className="mp-btn mp-btn-primary">Заявете демо</Link>
                <Link href="/how-it-works" className="mp-btn mp-btn-ghost">Вижте как работи</Link>
              </div>
            </div>

            <div className="mp-collage-wrap">
              <StickerCollage
                items={[
                  { className: "s1", node: <StickerCoffee /> },
                  { className: "s2", node: <StickerQR /> },
                  { className: "s3", node: <StickerReceipt /> },
                  { className: "s4", node: <StickerPlate /> },
                  { className: "s5", node: <StickerTip /> },
                  { className: "s6", node: <StickerTable /> },
                  { className: "s7", node: <StickerCheck /> },
                  { className: "s8", node: <StickerCard /> },
                  { className: "s9", node: <StickerBell /> },
                ]}
              />
            </div>
          </div>

          {/* RIGHT: green panel — header text + phone/dashboard stage + numbered features */}
          <div className="mp-hero-right">
            <div>
              <div className="mp-eyebrow mp-reveal">ЗА СОБСТВЕНИЦИ НА ЗАВЕДЕНИЯ</div>
              <h2 className="mp-side-h mp-reveal d1">
                За госта <em>просто</em>. За вас <em>прозрачно</em>.
              </h2>
            </div>

            <div className="mp-stage mp-reveal d2">
              <HeroPhone src="/images/marketing/demo-menu-1.png" alt="Дигиталното меню на MasaPay в действие" />
              <LiveDashboard />
            </div>

            <ul className="mp-side-feats">
              <li className="mp-side-feat mp-reveal d2">
                <div className="n">①</div>
                <div>
                  <h3>Сканира + поръчва</h3>
                  <p>Гостът сканира QR кода на масата и поръчва директно от телефона си. Без приложение, без сервитьор.</p>
                </div>
              </li>
              <li className="mp-side-feat mp-reveal d3">
                <div className="n">②</div>
                <div>
                  <h3>Плаща + дава бакшиш</h3>
                  <p>Apple Pay, Google Pay или карта в три тапа. Бакшишът отива директно при персонала.</p>
                </div>
              </li>
              <li className="mp-side-feat mp-reveal d4">
                <div className="n">③</div>
                <div>
                  <h3>Кухнята получава</h3>
                  <p>Поръчката се появява моментално на екраните в кухнята и бара, автоматично разделена по секции.</p>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* ============ Marquee ============ */}
      <div className="mp-marquee" aria-hidden="true">
        <div className="mp-marquee-track">
          <span>
            <span>СКАНИРАЙ · ПОРЪЧАЙ · ПЛАТИ · СКАНИРАЙ · ПОРЪЧАЙ · ПЛАТИ</span>
            <span className="dot" />
            <span>СКАНИРАЙ · ПОРЪЧАЙ · ПЛАТИ</span>
            <span className="dot c" />
            <span>СКАНИРАЙ · ПОРЪЧАЙ · ПЛАТИ</span>
            <span className="dot l" />
            <span>СКАНИРАЙ · ПОРЪЧАЙ · ПЛАТИ</span>
            <span className="dot" />
          </span>
          <span>
            <span>СКАНИРАЙ · ПОРЪЧАЙ · ПЛАТИ · СКАНИРАЙ · ПОРЪЧАЙ · ПЛАТИ</span>
            <span className="dot" />
            <span>СКАНИРАЙ · ПОРЪЧАЙ · ПЛАТИ</span>
            <span className="dot c" />
            <span>СКАНИРАЙ · ПОРЪЧАЙ · ПЛАТИ</span>
            <span className="dot l" />
            <span>СКАНИРАЙ · ПОРЪЧАЙ · ПЛАТИ</span>
            <span className="dot" />
          </span>
        </div>
      </div>

      {/* ============ Features ============ */}
      <section className="mp-block" id="features">
        <div className="mp-section-head">
          <div>
            <div className="mp-eyebrow mp-reveal">ВСИЧКО ВКЛЮЧЕНО</div>
            <h2 className="mp-reveal d1">
              Един инструмент.<br />
              <em>Цялото заведение.</em>
            </h2>
          </div>
          <p className="mp-reveal d2">
            Менюто, поръчките, плащанията, бакшишите и аналитиката — на едно място. Без интеграции, без главоболия.
          </p>
        </div>

        <div className="mp-features-grid">
          <div className="mp-feat span3 mp-reveal">
            <div className="mp-ft-num">01</div>
            <h3>Меню на 6 езика</h3>
            <p>Автоматичен превод на BG, EN, DE, FR, IT, RU. Гостът избира своя език от QR кода.</p>
            <div className="vis">
              <div className="mp-vis-langs">
                <span className="mp-lang-pill act">BG</span>
                <span className="mp-lang-pill">EN</span>
                <span className="mp-lang-pill">DE</span>
                <span className="mp-lang-pill">FR</span>
                <span className="mp-lang-pill">IT</span>
                <span className="mp-lang-pill">RU</span>
              </div>
            </div>
          </div>

          <div className="mp-feat span3 green mp-reveal d1">
            <div className="mp-ft-num">02</div>
            <h3>Аналитика в реално време</h3>
            <p>Кои ястия се продават най-много, в кой час, на коя маса. Експорт към счетоводство.</p>
            <div className="vis">
              <div className="mp-vis-chart">
                <svg viewBox="0 0 320 100" preserveAspectRatio="none">
                  <polyline
                    points="0,72 40,60 80,68 120,40 160,50 200,28 240,30 280,12 320,18"
                    fill="none"
                    stroke="var(--green-pop)"
                    strokeWidth="3"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <polyline
                    points="0,82 40,78 80,70 120,72 160,58 200,52 240,48 280,38 320,30"
                    fill="none"
                    stroke="var(--lemon)"
                    strokeWidth="2"
                    strokeDasharray="4 4"
                    strokeLinecap="round"
                  />
                  <circle cx="280" cy="12" r="4" fill="var(--green-pop)" />
                  <circle cx="280" cy="12" r="8" fill="var(--green-pop)" opacity=".25" />
                </svg>
              </div>
            </div>
          </div>

          <div className="mp-feat span4 pop mp-reveal">
            <div className="mp-ft-num">03</div>
            <h3>Бакшиши директно при персонала</h3>
            <p>Гостите дават средно 3× повече бакшиш. Разделете автоматично между смяна, кухня и бар.</p>
            <div className="vis">
              <div className="mp-vis-tip">
                <button type="button"><span style={{ fontStyle: "italic" }}>5%</span><span className="lev">скромно</span></button>
                <button type="button"><span style={{ fontStyle: "italic" }}>10%</span><span className="lev">добро</span></button>
                <button type="button" className="act"><span style={{ fontStyle: "italic" }}>12%</span><span className="lev">страхотно</span></button>
                <button type="button"><span style={{ fontStyle: "italic" }}>15%</span><span className="lev">★ ★ ★</span></button>
              </div>
            </div>
          </div>

          <div className="mp-feat span2 mp-reveal d1">
            <div className="mp-ft-num">04</div>
            <h3>Без приложение</h3>
            <p>Работи в браузъра. Сканираш — поръчваш. Нула триене.</p>
            <div className="vis">
              <div className="mp-vis-bigstat">0s</div>
            </div>
          </div>

          <div className="mp-feat span3 cream mp-reveal">
            <div className="mp-ft-num">05</div>
            <h3>Интеграция с касов апарат</h3>
            <p>Datecs, Tremol, Eltrade. Автоматично издаване на касов бон.</p>
            <div className="vis">
              <div className="mp-vis-pos">
                <div className="pill hi">QR</div><span className="ar">→</span>
                <div className="pill">POS</div><span className="ar">→</span>
                <div className="pill">КУХНЯ</div><span className="ar">→</span>
                <div className="pill">БОН</div>
              </div>
            </div>
          </div>

          <div className="mp-feat span3 mp-reveal d1">
            <div className="mp-ft-num">06</div>
            <h3>Поддръжка на български</h3>
            <p>Истински хора в София. Отговор под 5 минути, работно време 8 — 23 ч.</p>
            <div className="vis">
              <div className="mp-vis-receipt">
                <div className="rr"><span>2× Капучино</span><span>9.00</span></div>
                <div className="rr"><span>1× Багета</span><span>6.50</span></div>
                <div className="rr"><span>1× Тирамису</span><span>7.20</span></div>
                <div className="rr"><span>Бакшиш 12%</span><span>2.72</span></div>
                <div className="rr tot"><span>ОБЩО</span><span>25.42 €</span></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ============ Pricing ============ */}
      <section className="mp-block" id="pricing">
        <div className="mp-section-head">
          <div>
            <div className="mp-eyebrow mp-reveal">ПРОСТИ ЦЕНИ</div>
            <h2 className="mp-reveal d1">
              Първи месец <em>безплатно.</em>
            </h2>
          </div>
          <p className="mp-reveal d2">
            Без скрити такси, без процент от продажбите. Плащате месечно, отказвате когато решите.
          </p>
        </div>

        <div className="mp-pricing-grid">
          <div className="mp-price-card mp-reveal">
            <div className="tier"><span>Кафе</span></div>
            <div className="desc">До 8 маси, базови функции, един POS терминал.</div>
            <div className="price"><span>30</span><small>€ / месец</small></div>
            <ul>
              <li>Меню на BG + EN</li>
              <li>Apple Pay, Google Pay, карта</li>
              <li>Бакшиши с автоматично разделяне</li>
              <li>Дашборд в реално време</li>
            </ul>
            <Link href="/contact" className="pick-btn" style={{ textAlign: "center" }}>Започнете</Link>
          </div>

          <div className="mp-price-card featured mp-reveal d1">
            <div className="tier">
              <span>Ресторант</span>
              <span className="badge">ПОПУЛЯРНО</span>
            </div>
            <div className="desc">Неограничени маси, аналитика, бакшиши, мулти-езичност.</div>
            <div className="price"><span>75</span><small>€ / месец</small></div>
            <ul>
              <li>Неограничени маси</li>
              <li>Аналитика и експорт</li>
              <li>Мулти-езичност (6 езика)</li>
              <li>Интеграция с касов апарат</li>
              <li>Поддръжка по телефон</li>
              <li>Ролеви достъп за персонал</li>
            </ul>
            <Link href="/contact" className="pick-btn" style={{ textAlign: "center" }}>Заявете демо</Link>
          </div>

          <div className="mp-price-card mp-reveal d2">
            <div className="tier"><span>Верига</span></div>
            <div className="desc">Множество локации, ролеви достъп, персонална интеграция.</div>
            <div className="price"><span style={{ fontSize: 36 }}>Запитване</span></div>
            <div style={{ fontSize: 13, color: "var(--ink-mute)", marginTop: -12 }}>индивидуална оферта</div>
            <ul>
              <li>API и персонална интеграция</li>
              <li>Мениджър за акаунта</li>
              <li>Ролеви достъп за персонал</li>
              <li>Аналитика и експорт</li>
            </ul>
            <Link href="/contact" className="pick-btn" style={{ textAlign: "center" }}>Свържете се</Link>
          </div>
        </div>
      </section>

      {/* ============ Final CTA ============ */}
      <section className="mp-cta-final-wrap" id="cta">
        <div className="mp-cta-card">
          <div>
            <div className="mp-eyebrow mp-reveal">ГОТОВИ?</div>
            <h2 className="mp-reveal d1">
              Сложете MasaPay<br />
              <em>на вашите маси.</em>
            </h2>
            <p className="mp-reveal d2">30 минути инсталация. Първият месец е безплатен. Без ангажимент.</p>
            <div className="actions mp-reveal d3">
              <Link href="/contact" className="mp-btn mp-btn-primary">Заявете демо</Link>
              <a href="tel:+359885202277" className="mp-btn mp-btn-ghost">+359 88 520 2277</a>
            </div>
          </div>

          <StickerCollage
            variant="cta"
            items={[
              { className: "s1", node: <StickerCheck /> },
              { className: "s2", node: <StickerCoralBadge /> },
              { className: "s3", node: <StickerQR /> },
              { className: "s4", node: <StickerLemonBox /> },
            ]}
          />
        </div>
      </section>
    </>
  );
}
