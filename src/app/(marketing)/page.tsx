import Link from "next/link";
import { HeroPhone } from "@/components/marketing-v2/hero-phone";
import { LiveDashboard } from "@/components/marketing-v2/live-dashboard";
import { StickerCollage } from "@/components/marketing-v2/sticker-collage";
import {
  StickerCoffee, StickerQR, StickerReceipt, StickerPlate, StickerTip,
  StickerTable, StickerCheck, StickerCard, StickerBell, StickerCoralBadge,
  StickerLemonBox,
} from "@/components/marketing-v2/stickers";
import { getLocale, t } from "@/lib/i18n";

export default async function HomePage() {
  const lang = await getLocale();
  const m = t(lang).marketing.home;
  return (
    <>
      {/* ============ HERO ============ */}
      <section className="mp-hero">
        <div className="mp-hero-grid">
          {/* LEFT: paper + big type + sticker collage (now safely contained) */}
          <div className="mp-hero-left">
            <div>
              <div className="mp-eyebrow mp-reveal">{m.heroEyebrow}</div>
              <h1 className="mp-hero-title mp-reveal d1">
                <span>{m.heroTitleA1}</span>
                <span>{m.heroTitleA2}</span>
                <span className="em">{m.heroTitleAEm}</span><br />
                <span>{m.heroTitleB1}</span>
                <span className="dash" />
                <span className="em-pop">{m.heroTitleBEm}</span>
              </h1>
              <p className="mp-hero-sub mp-reveal d2">{m.heroSub}</p>
              <div className="mp-hero-ctas mp-reveal d3">
                <Link href="/contact" className="mp-btn mp-btn-primary">{m.ctaPrimary}</Link>
                <Link href="/how-it-works" className="mp-btn mp-btn-ghost">{m.ctaSecondary}</Link>
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
              <div className="mp-eyebrow mp-reveal">{m.sideEyebrow}</div>
              <h2 className="mp-side-h mp-reveal d1">
                {m.sideH1}<em>{m.sideHEm1}</em>{m.sideH2}<em>{m.sideHEm2}</em>{m.sideH3}
              </h2>
            </div>

            <div className="mp-stage mp-reveal d2">
              <HeroPhone />
              <LiveDashboard />
            </div>

            <ul className="mp-side-feats">
              <li className="mp-side-feat mp-reveal d2">
                <div className="n">①</div>
                <div>
                  <h3>{m.feat1H}</h3>
                  <p>{m.feat1P}</p>
                </div>
              </li>
              <li className="mp-side-feat mp-reveal d3">
                <div className="n">②</div>
                <div>
                  <h3>{m.feat2H}</h3>
                  <p>{m.feat2P}</p>
                </div>
              </li>
              <li className="mp-side-feat mp-reveal d4">
                <div className="n">③</div>
                <div>
                  <h3>{m.feat3H}</h3>
                  <p>{m.feat3P}</p>
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
            <span>{m.marqueeLong}</span>
            <span className="dot" />
            <span>{m.marqueeShort}</span>
            <span className="dot c" />
            <span>{m.marqueeShort}</span>
            <span className="dot l" />
            <span>{m.marqueeShort}</span>
            <span className="dot" />
          </span>
          <span>
            <span>{m.marqueeLong}</span>
            <span className="dot" />
            <span>{m.marqueeShort}</span>
            <span className="dot c" />
            <span>{m.marqueeShort}</span>
            <span className="dot l" />
            <span>{m.marqueeShort}</span>
            <span className="dot" />
          </span>
        </div>
      </div>

      {/* ============ Features ============ */}
      <section className="mp-block" id="features">
        <div className="mp-section-head">
          <div>
            <div className="mp-eyebrow mp-reveal">{m.featuresEyebrow}</div>
            <h2 className="mp-reveal d1">
              {m.featuresH1}<br />
              <em>{m.featuresH1Em}</em>
            </h2>
          </div>
          <p className="mp-reveal d2">{m.featuresLead}</p>
        </div>

        <div className="mp-features-grid">
          <div className="mp-feat span3 mp-reveal">
            <div className="mp-ft-num">01</div>
            <h3>{m.f1H}</h3>
            <p>{m.f1P}</p>
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
            <h3>{m.f2H}</h3>
            <p>{m.f2P}</p>
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
            <h3>{m.f3H}</h3>
            <p>{m.f3P}</p>
            <div className="vis">
              <div className="mp-vis-tip">
                <button type="button"><span style={{ fontStyle: "italic" }}>5%</span><span className="lev">{m.f3Level1}</span></button>
                <button type="button"><span style={{ fontStyle: "italic" }}>10%</span><span className="lev">{m.f3Level2}</span></button>
                <button type="button" className="act"><span style={{ fontStyle: "italic" }}>12%</span><span className="lev">{m.f3Level3}</span></button>
                <button type="button"><span style={{ fontStyle: "italic" }}>15%</span><span className="lev">★ ★ ★</span></button>
              </div>
            </div>
          </div>

          <div className="mp-feat span2 mp-reveal d1">
            <div className="mp-ft-num">04</div>
            <h3>{m.f4H}</h3>
            <p>{m.f4P}</p>
            <div className="vis">
              <div className="mp-vis-bigstat">0s</div>
            </div>
          </div>

          <div className="mp-feat span3 cream mp-reveal">
            <div className="mp-ft-num">05</div>
            <h3>{m.f5H}</h3>
            <p>{m.f5P}</p>
            <div className="vis">
              <div className="mp-vis-pos">
                <div className="pill hi">QR</div><span className="ar">→</span>
                <div className="pill">POS</div><span className="ar">→</span>
                <div className="pill">{m.f5PosKitchen}</div><span className="ar">→</span>
                <div className="pill">{m.f5PosReceipt}</div>
              </div>
            </div>
          </div>

          <div className="mp-feat span3 mp-reveal d1">
            <div className="mp-ft-num">06</div>
            <h3>{m.f6H}</h3>
            <p>{m.f6P}</p>
            <div className="vis">
              <div className="mp-vis-receipt">
                <div className="rr"><span>{m.receiptItem1}</span><span>9.00</span></div>
                <div className="rr"><span>{m.receiptItem2}</span><span>6.50</span></div>
                <div className="rr"><span>{m.receiptItem3}</span><span>7.20</span></div>
                <div className="rr"><span>{m.receiptTip}</span><span>2.72</span></div>
                <div className="rr tot"><span>{m.receiptTotal}</span><span>25.42 €</span></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ============ Pricing ============ */}
      <section className="mp-block" id="pricing">
        <div className="mp-section-head">
          <div>
            <div className="mp-eyebrow mp-reveal">{m.pricingEyebrow}</div>
            <h2 className="mp-reveal d1">
              {m.pricingH}<em>{m.pricingHEm}</em>
            </h2>
          </div>
          <p className="mp-reveal d2">{m.pricingLead}</p>
        </div>

        <div className="mp-pricing-grid">
          <div className="mp-price-card mp-reveal">
            <div className="tier"><span>{m.tier1Name}</span></div>
            <div className="desc">{m.tier1Desc}</div>
            <div className="price"><span>30</span><small>{m.tier1PerMonth}</small></div>
            <ul>
              <li>{m.tier1F1}</li>
              <li>{m.tier1F2}</li>
              <li>{m.tier1F3}</li>
              <li>{m.tier1F4}</li>
            </ul>
            <Link href="/contact" className="pick-btn" style={{ textAlign: "center" }}>{m.tier1Cta}</Link>
          </div>

          <div className="mp-price-card featured mp-reveal d1">
            <div className="tier">
              <span>{m.tier2Name}</span>
              <span className="badge">{m.tier2Badge}</span>
            </div>
            <div className="desc">{m.tier2Desc}</div>
            <div className="price"><span>75</span><small>{m.tier1PerMonth}</small></div>
            <ul>
              <li>{m.tier2F1}</li>
              <li>{m.tier2F2}</li>
              <li>{m.tier2F3}</li>
              <li>{m.tier2F4}</li>
              <li>{m.tier2F5}</li>
              <li>{m.tier2F6}</li>
            </ul>
            <Link href="/contact" className="pick-btn" style={{ textAlign: "center" }}>{m.tier2Cta}</Link>
          </div>

          <div className="mp-price-card mp-reveal d2">
            <div className="tier"><span>{m.tier3Name}</span></div>
            <div className="desc">{m.tier3Desc}</div>
            <div className="price"><span style={{ fontSize: 36 }}>{m.tier3Price}</span></div>
            <div style={{ fontSize: 13, color: "var(--ink-mute)", marginTop: -12 }}>{m.tier3Sub}</div>
            <ul>
              <li>{m.tier3F1}</li>
              <li>{m.tier3F2}</li>
              <li>{m.tier3F3}</li>
              <li>{m.tier3F4}</li>
            </ul>
            <Link href="/contact" className="pick-btn" style={{ textAlign: "center" }}>{m.tier3Cta}</Link>
          </div>
        </div>
      </section>

      {/* ============ Final CTA ============ */}
      <section className="mp-cta-final-wrap" id="cta">
        <div className="mp-cta-card">
          <div>
            <div className="mp-eyebrow mp-reveal">{m.ctaEyebrow}</div>
            <h2 className="mp-reveal d1">
              {m.ctaH1}<br />
              <em>{m.ctaH2Em}</em>
            </h2>
            <p className="mp-reveal d2">{m.ctaSub}</p>
            <div className="actions mp-reveal d3">
              <Link href="/contact" className="mp-btn mp-btn-primary">{m.ctaPrimary}</Link>
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
