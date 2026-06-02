"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { Menu, X, ChevronDown, Smartphone } from "lucide-react";
import type { Language, Translations } from "@/lib/i18n";
import { readLangCookie, writeLangCookie } from "@/lib/i18n/client";

interface MarketingNavProps {
  initialLang: Language;
  m: Translations["marketing"]["nav"];
}

export function MarketingNav({ initialLang, m }: MarketingNavProps) {
  const router = useRouter();
  const [lang, setLang] = useState<Language>(initialLang);
  const [open, setOpen] = useState(false);
  const [demoOpen, setDemoOpen] = useState(false);
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Reconcile with cookie (covers back/forward + first paint after SSR with no cookie).
  useEffect(() => {
    const c = readLangCookie();
    if (c !== lang) setLang(c);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const NAV_LINKS = [
    { href: "/features", label: m.product },
    { href: "/how-it-works", label: m.howItWorks },
    { href: "/about", label: m.about },
    { href: "/pricing", label: m.pricing },
  ];

  const DEMOS = [
    { href: "/demo", label: m.demosAll, hint: m.demoPreview, featured: true },
    { href: "/menus/brunch", label: m.brunch },
    { href: "/menus/cocktails", label: m.cocktails },
    { href: "/menus/bulgarian", label: m.bulgarian },
  ];

  function pickLang(next: Language) {
    if (next === lang) return;
    setLang(next);
    writeLangCookie(next);
    router.refresh();
  }

  const openDemo = () => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    setDemoOpen(true);
  };
  const closeDemoSoon = () => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    closeTimer.current = setTimeout(() => setDemoOpen(false), 140);
  };

  return (
    <nav className="mp-nav">
      <div className="mp-nav-inner">
        <Link href="/" className="mp-brand" aria-label={m.ariaHome}>
          <span className="mp-brand-img">
            <Image src="/images/marketing/masapay-logo-icon.png" alt="MasaPay" width={88} height={88} priority />
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
            onMouseEnter={openDemo}
            onMouseLeave={closeDemoSoon}
          >
            <button
              type="button"
              className="mp-demo-trigger"
              aria-expanded={demoOpen}
              onClick={() => (demoOpen ? closeDemoSoon() : openDemo())}
            >
              {m.demo} <ChevronDown size={14} />
            </button>
            {demoOpen && (
              <div
                className="mp-demo-panel"
                role="menu"
                onMouseEnter={openDemo}
                onMouseLeave={closeDemoSoon}
              >
                <div className="mp-demo-panel-inner">
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
              </div>
            )}
          </div>
        </div>

        <div className="mp-nav-right">
          <div className="mp-lang-toggle" role="group" aria-label={m.ariaLang}>
            <button className={lang === "bg" ? "active" : ""} onClick={() => pickLang("bg")} type="button">BG</button>
            <button className={lang === "en" ? "active" : ""} onClick={() => pickLang("en")} type="button">EN</button>
          </div>
          <Link href="/demo" className="mp-btn mp-btn-ghost mp-nav-demo">{m.demo}</Link>
          <Link href="/contact" className="mp-btn mp-btn-primary">{m.requestDemo}</Link>
          <button className="mp-burger" type="button" onClick={() => setOpen((v) => !v)} aria-label={m.ariaMenu}>
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
        <div className="mp-mobile-label">{m.demoMenusLabel}</div>
        {DEMOS.map((d) => (
          <Link key={d.href} href={d.href} onClick={() => setOpen(false)}>
            {d.label}
          </Link>
        ))}
        <Link href="/contact" onClick={() => setOpen(false)} className="mp-mobile-cta">
          {m.requestDemo}
        </Link>
      </div>
    </nav>
  );
}
