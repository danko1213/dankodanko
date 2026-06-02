"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

type Item = {
  name: string;
  desc: string;
  price: string;
  image: string;
};

// Real items pulled from the Bulgarian demo menu (`/menus/bulgarian`)
const ITEMS: Item[] = [
  {
    name: "Таратор",
    desc: "Студена супа с кисело мляко, краставица и орехи",
    price: "4.00",
    image: "/images/menus/bulgarian/tarator.jpg",
  },
  {
    name: "Шопска салата",
    desc: "Домат, краставица, печена чушка и сирене",
    price: "6.00",
    image: "/images/menus/bulgarian/shopska-salad.jpg",
  },
  {
    name: "Мусака",
    desc: "Картофи, свинска кайма, заливка от яйца и кисело мляко",
    price: "8.00",
    image: "/images/menus/bulgarian/musaka.jpg",
  },
  {
    name: "Баница",
    desc: "Хрупкави кори със сирене и яйца",
    price: "5.00",
    image: "/images/menus/bulgarian/banitsa.jpg",
  },
];

const STATES = [
  { count: 1, total: 4.0 },
  { count: 2, total: 10.0 },
  { count: 3, total: 18.0 },
  { count: 4, total: 23.0 },
];

const TABS = ["Студена маса", "От фурната", "Скара", "Десерти"];

export function HeroPhone({
  place = "Механа Българи",
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
            <span key={t} className={i === 0 ? "active" : ""}>
              {t}
            </span>
          ))}
        </div>
        <div className="mp-pm-items">
          {ITEMS.map((it) => (
            <div key={it.name} className="mp-pm-row">
              <div className="thumb">
                <Image src={it.image} alt={it.name} fill sizes="44px" />
              </div>
              <div className="info">
                <p className="name">{it.name}</p>
                <p className="desc">{it.desc}</p>
                <div className="row-bottom">
                  <span className="price">
                    {it.price} {currency}
                  </span>
                  <button type="button" className="add" aria-label="Добави">
                    +
                  </button>
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
