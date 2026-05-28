"use client";

import { useEffect, useState } from "react";

type Item = { name: string; desc: string; price: string; thumb: "" | "g" | "r" | "y" };

const ITEMS: Item[] = [
  { name: "Капучино", desc: "Двойно еспресо, мляко", price: "4.50", thumb: "" },
  { name: "Багета", desc: "С шунка, сирене, рукола", price: "6.50", thumb: "r" },
  { name: "Тирамису", desc: "Маскарпоне, кафе, какао", price: "7.20", thumb: "y" },
  { name: "Соев лате", desc: "Овесено мляко, канела", price: "5.20", thumb: "g" },
];

const STATES = [
  { count: 1, total: 4.5 },
  { count: 2, total: 9.0 },
  { count: 3, total: 15.5 },
  { count: 4, total: 22.7 },
];

const TABS = ["Кафе", "Закуски", "Десерти", "Напитки"];

export function HeroPhone({
  place = "Café Slaveykov",
  placeSub = "ул. Граф Игнатиев 12",
  tableLabel = "МАСА 07",
  ctaLabel = "Преглед",
  currency = "€",
}: {
  place?: string;
  placeSub?: string;
  tableLabel?: string;
  ctaLabel?: string;
  currency?: string;
}) {
  const [idx, setIdx] = useState(2);
  const [bump, setBump] = useState(0);

  useEffect(() => {
    const t = setInterval(() => {
      setIdx((i) => (i + 1) % STATES.length);
      setBump((b) => b + 1);
    }, 2600);
    return () => clearInterval(t);
  }, []);

  const { count, total } = STATES[idx];

  return (
    <div className="mp-phone">
      <div className="mp-phone-notch" />
      <div className="mp-phone-screen">
        <div className="mp-pm-status">
          <span>20:41</span>
          <span style={{ letterSpacing: 1 }}>·∙•</span>
        </div>
        <div className="mp-pm-top">
          <div className="place">
            {place}
            <small>{placeSub}</small>
          </div>
          <div className="mp-pm-chip">{tableLabel}</div>
        </div>
        <div className="mp-pm-tabs">
          {TABS.map((t, i) => (
            <span key={t} className={i === 0 ? "active" : ""}>{t}</span>
          ))}
        </div>
        <div className="mp-pm-items">
          {ITEMS.map((it) => (
            <div key={it.name} className="mp-pm-row">
              <div className={`thumb ${it.thumb}`} />
              <div className="info">
                <p className="name">{it.name}</p>
                <p className="desc">{it.desc}</p>
                <div className="row-bottom">
                  <span className="price">{it.price} {currency}</span>
                  <button type="button" className="add" aria-label="Добави">+</button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="mp-phone-overlay">
        <div className="cl">
          <span
            key={bump}
            className="mp-cart-count"
            style={{ animation: "mp-pop .4s cubic-bezier(.2,.7,.2,1)" }}
          >
            {count}
          </span>
          <span>{ctaLabel}</span>
        </div>
        <div className="total">
          <span>{total.toFixed(2)}</span>
          <span className="euro">{currency}</span>
        </div>
      </div>
      <style jsx>{`
        @keyframes mp-pop {
          0% { transform: scale(1); }
          50% { transform: scale(1.25); }
          100% { transform: scale(1); }
        }
      `}</style>
    </div>
  );
}
