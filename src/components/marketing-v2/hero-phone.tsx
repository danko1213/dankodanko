"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

const STATES = [
  { count: 1, total: 4.5 },
  { count: 2, total: 9.0 },
  { count: 3, total: 15.5 },
  { count: 4, total: 22.7 },
];

export function HeroPhone({
  src = "/images/marketing/demo-menu-1.png",
  alt = "MasaPay digital menu on a phone",
  ctaLabel = "Преглед",
}: {
  src?: string;
  alt?: string;
  ctaLabel?: string;
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
        <Image src={src} alt={alt} fill sizes="280px" priority />
      </div>
      <div className="mp-phone-overlay">
        <div className="cl">
          <span key={bump} className="mp-cart-count" style={{ animation: "mp-pop .4s cubic-bezier(.2,.7,.2,1)" }}>
            {count}
          </span>
          <span>{ctaLabel}</span>
        </div>
        <div className="total">
          <span>{total.toFixed(2)}</span>
          <span className="euro">€</span>
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
