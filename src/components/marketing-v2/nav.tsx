"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { Menu, X } from "lucide-react";

const NAV_LINKS = [
  { href: "/features", label: "Продукт" },
  { href: "/how-it-works", label: "Как работи" },
  { href: "/about", label: "За нас" },
  { href: "/#pricing", label: "Цени" },
];

export function MarketingNav() {
  const [lang, setLang] = useState<"bg" | "en">("bg");
  const [open, setOpen] = useState(false);

  return (
    <nav className="mp-nav">
      <div className="mp-nav-inner">
        <Link href="/" className="mp-brand" aria-label="MasaPay начало">
          <span className="mp-brand-img">
            <Image src="/images/marketing/masapay-logo.png" alt="" width={120} height={120} priority />
          </span>
        </Link>
        <div className="mp-nav-links">
          {NAV_LINKS.map((l) => (
            <Link key={l.href} href={l.href}>
              {l.label}
            </Link>
          ))}
        </div>
        <div className="mp-nav-right">
          <div className="mp-lang-toggle" role="group" aria-label="Език">
            <button className={lang === "bg" ? "active" : ""} onClick={() => setLang("bg")} type="button">BG</button>
            <button className={lang === "en" ? "active" : ""} onClick={() => setLang("en")} type="button">EN</button>
          </div>
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
        <Link href="/contact" onClick={() => setOpen(false)}>Заявете демо</Link>
      </div>
    </nav>
  );
}
