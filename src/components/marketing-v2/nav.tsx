"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { Menu, X, ChevronDown, Smartphone } from "lucide-react";

const NAV_LINKS = [
  { href: "/features", label: "Продукт" },
  { href: "/how-it-works", label: "Как работи" },
  { href: "/about", label: "За нас" },
  { href: "/#pricing", label: "Цени" },
];

const DEMOS = [
  { href: "/demo", label: "Всички демо менюта", hint: "Преглед", featured: true },
  { href: "/menus/brunch", label: "Брънч меню" },
  { href: "/menus/cocktails", label: "Коктейл бар" },
  { href: "/menus/bulgarian", label: "Български ресторант" },
];

export function MarketingNav() {
  const [lang, setLang] = useState<"bg" | "en">("bg");
  const [open, setOpen] = useState(false);
  const [demoOpen, setDemoOpen] = useState(false);

  return (
    <nav className="mp-nav">
      <div className="mp-nav-inner">
        <Link href="/" className="mp-brand" aria-label="MasaPay начало">
          <span className="mp-brand-img">
            <Image src="/images/marketing/masapay-logo-icon.png" alt="" width={88} height={88} priority />
          </span>
        </Link>

        <div className="mp-nav-links">
          {NAV_LINKS.map((l) => (
            <Link key={l.href} href={l.href}>
              {l.label}
            </Link>
          ))}
          <div
            className="mp-demo-dropdown"
            onMouseEnter={() => setDemoOpen(true)}
            onMouseLeave={() => setDemoOpen(false)}
          >
            <button
              type="button"
              className="mp-demo-trigger"
              aria-expanded={demoOpen}
              onClick={() => setDemoOpen((v) => !v)}
            >
              Демо <ChevronDown size={14} />
            </button>
            {demoOpen && (
              <div className="mp-demo-panel" role="menu">
                {DEMOS.map((d) => (
                  <Link
                    key={d.href}
                    href={d.href}
                    className={d.featured ? "feat" : ""}
                    onClick={() => setDemoOpen(false)}
                  >
                    <Smartphone size={14} />
                    <span>{d.label}</span>
                    {d.hint && <em>{d.hint}</em>}
                  </Link>
                ))}
              </div>
            )}
          </div>
        </div>

        <div className="mp-nav-right">
          <div className="mp-lang-toggle" role="group" aria-label="Език">
            <button className={lang === "bg" ? "active" : ""} onClick={() => setLang("bg")} type="button">BG</button>
            <button className={lang === "en" ? "active" : ""} onClick={() => setLang("en")} type="button">EN</button>
          </div>
          <Link href="/demo" className="mp-btn mp-btn-ghost mp-nav-demo">Демо</Link>
          <Link href="/contact" className="mp-btn mp-btn-primary">Заявете демо</Link>
          <button className="mp-burger" type="button" onClick={() => setOpen((v) => !v)} aria-label="Меню">
            {open ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>
      </div>

      <div className={`mp-mobile-sheet ${open ? "open" : ""}`}>
        {NAV_LINKS.map((l) => (
          <Link key={l.href} href={l.href} onClick={() => setOpen(false)}>
            {l.label}
          </Link>
        ))}
        <div className="mp-mobile-divider" aria-hidden="true" />
        <div className="mp-mobile-label">ДЕМО МЕНЮТА</div>
        {DEMOS.map((d) => (
          <Link key={d.href} href={d.href} onClick={() => setOpen(false)}>
            {d.label}
          </Link>
        ))}
        <Link href="/contact" onClick={() => setOpen(false)} className="mp-mobile-cta">
          Заявете демо
        </Link>
      </div>
    </nav>
  );
}
