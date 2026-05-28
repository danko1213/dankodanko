import type { JSX } from "react";

const TX_MONO: React.CSSProperties = {
  fontFamily: "var(--font-jetbrains), monospace",
  fontWeight: 700,
};
const TX_BG: React.CSSProperties = {
  fontFamily: "var(--font-bricolage), sans-serif",
  fontWeight: 800,
};

export function StickerCoffee() {
  return (
    <svg viewBox="0 0 120 120" className="mp-sticker-svg">
      <rect x="20" y="42" width="68" height="60" rx="10" className="f-cream" />
      <rect x="20" y="42" width="68" height="60" rx="10" className="s-ink2" />
      <rect x="88" y="58" width="20" height="28" rx="9" className="f-cream" />
      <rect x="88" y="58" width="20" height="28" rx="9" className="s-ink2" />
      <rect x="28" y="52" width="52" height="10" rx="4" className="f-coral" />
      <circle cx="38" cy="28" r="4" className="f-ink" />
      <circle cx="54" cy="22" r="4" className="f-ink" />
      <circle cx="70" cy="28" r="4" className="f-ink" />
    </svg>
  );
}

export function StickerQR() {
  return (
    <svg viewBox="0 0 100 100" className="mp-sticker-svg">
      <rect x="4" y="4" width="92" height="92" rx="10" className="f-paper" />
      <rect x="4" y="4" width="92" height="92" rx="10" className="s-ink2" />
      <rect x="14" y="14" width="22" height="22" rx="3" className="f-ink" />
      <rect x="20" y="20" width="10" height="10" rx="1" className="f-paper" />
      <rect x="64" y="14" width="22" height="22" rx="3" className="f-ink" />
      <rect x="70" y="20" width="10" height="10" rx="1" className="f-paper" />
      <rect x="14" y="64" width="22" height="22" rx="3" className="f-ink" />
      <rect x="20" y="70" width="10" height="10" rx="1" className="f-paper" />
      <rect x="44" y="14" width="6" height="6" className="f-ink" />
      <rect x="54" y="14" width="6" height="6" className="f-ink" />
      <rect x="44" y="24" width="6" height="6" className="f-ink" />
      <rect x="54" y="34" width="6" height="6" className="f-ink" />
      <rect x="44" y="44" width="6" height="6" className="f-coral" />
      <rect x="54" y="44" width="6" height="6" className="f-ink" />
      <rect x="64" y="44" width="6" height="6" className="f-ink" />
      <rect x="74" y="44" width="6" height="6" className="f-pop" />
      <rect x="84" y="44" width="6" height="6" className="f-ink" />
      <rect x="14" y="44" width="6" height="6" className="f-ink" />
      <rect x="24" y="44" width="6" height="6" className="f-ink" />
      <rect x="34" y="54" width="6" height="6" className="f-ink" />
      <rect x="44" y="54" width="6" height="6" className="f-ink" />
      <rect x="44" y="64" width="6" height="6" className="f-ink" />
      <rect x="54" y="64" width="6" height="6" className="f-pop" />
      <rect x="64" y="64" width="6" height="6" className="f-ink" />
      <rect x="74" y="64" width="6" height="6" className="f-ink" />
      <rect x="84" y="64" width="6" height="6" className="f-ink" />
      <rect x="54" y="74" width="6" height="6" className="f-ink" />
      <rect x="64" y="74" width="6" height="6" className="f-coral" />
      <rect x="74" y="74" width="6" height="6" className="f-ink" />
      <rect x="54" y="84" width="6" height="6" className="f-ink" />
      <rect x="74" y="84" width="6" height="6" className="f-ink" />
      <rect x="84" y="84" width="6" height="6" className="f-ink" />
    </svg>
  );
}

export function StickerReceipt() {
  return (
    <svg viewBox="0 0 100 130" className="mp-sticker-svg">
      <rect x="10" y="6" width="80" height="110" rx="2" className="f-paper" />
      <rect x="10" y="6" width="80" height="110" rx="2" className="s-ink" />
      <rect x="20" y="18" width="60" height="6" rx="1" className="f-ink" />
      <rect x="20" y="32" width="40" height="3" className="f-ink" />
      <rect x="64" y="32" width="16" height="3" className="f-ink" />
      <rect x="20" y="42" width="35" height="3" className="f-ink" />
      <rect x="64" y="42" width="16" height="3" className="f-ink" />
      <rect x="20" y="52" width="45" height="3" className="f-ink" />
      <rect x="64" y="52" width="16" height="3" className="f-ink" />
      <rect x="20" y="68" width="60" height="3" className="f-ink" />
      <rect x="20" y="78" width="32" height="6" className="f-ink" />
      <rect x="60" y="78" width="20" height="6" className="f-ink" />
      <g transform="translate(50 102) rotate(-8)">
        <rect x="-22" y="-9" width="44" height="18" rx="2" fill="none" stroke="var(--coral)" strokeWidth="2.5" />
        <text x="0" y="4" textAnchor="middle" style={{ ...TX_MONO, fill: "var(--coral)", fontSize: 11 }}>
          ПЛАТЕНО
        </text>
      </g>
    </svg>
  );
}

export function StickerPlate() {
  return (
    <svg viewBox="0 0 110 110" className="mp-sticker-svg">
      <circle cx="55" cy="55" r="48" className="f-pop" />
      <circle cx="55" cy="55" r="48" className="s-ink2" />
      <circle cx="55" cy="55" r="32" fill="none" className="s-ink" />
      <rect x="20" y="48" width="22" height="14" rx="3" className="f-ink" transform="rotate(-20 31 55)" />
      <rect x="68" y="48" width="22" height="14" rx="3" className="f-ink" transform="rotate(20 79 55)" />
    </svg>
  );
}

export function StickerTip({ label = "БАКШИШ", value = "+12%" }: { label?: string; value?: string }) {
  return (
    <svg viewBox="0 0 120 120" className="mp-sticker-svg">
      <g>
        <rect x="20" y="20" width="80" height="80" rx="14" className="f-coral" transform="rotate(8 60 60)" />
        <rect x="20" y="20" width="80" height="80" rx="14" className="f-coral" transform="rotate(-12 60 60)" />
        <rect x="20" y="20" width="80" height="80" rx="14" className="f-coral" transform="rotate(28 60 60)" />
      </g>
      <circle cx="60" cy="60" r="36" className="f-coral" />
      <circle cx="60" cy="60" r="36" className="s-ink2" />
      <text x="60" y="56" textAnchor="middle" style={{ ...TX_MONO, fill: "var(--paper)", fontSize: 14 }}>
        {label}
      </text>
      <text x="60" y="80" textAnchor="middle" style={{ ...TX_BG, fill: "var(--paper)", fontSize: 24, fontStyle: "italic" }}>
        {value}
      </text>
    </svg>
  );
}

export function StickerTable({ label = "TABLE", value = "M07" }: { label?: string; value?: string }) {
  return (
    <svg viewBox="0 0 110 80" className="mp-sticker-svg">
      <rect x="6" y="6" width="98" height="68" rx="10" className="f-deep" />
      <rect x="6" y="6" width="98" height="68" rx="10" className="s-ink2" />
      <text x="55" y="33" textAnchor="middle" style={{ ...TX_MONO, fill: "var(--paper)", fontSize: 9, letterSpacing: "2px" }}>
        {label}
      </text>
      <text x="55" y="62" textAnchor="middle" style={{ ...TX_BG, fill: "var(--paper)", fontSize: 28 }}>
        {value}
      </text>
    </svg>
  );
}

export function StickerCheck() {
  return (
    <svg viewBox="0 0 110 110" className="mp-sticker-svg">
      <circle cx="55" cy="55" r="46" className="f-pop" />
      <circle cx="55" cy="55" r="46" className="s-ink2" />
      <path d="M30 55 L48 73 L82 38" className="s-ink2" style={{ strokeWidth: 8 }} />
    </svg>
  );
}

export function StickerCard() {
  return (
    <svg viewBox="0 0 130 90" className="mp-sticker-svg">
      <rect x="6" y="6" width="118" height="78" rx="10" className="f-lilac" />
      <rect x="6" y="6" width="118" height="78" rx="10" className="s-ink2" />
      <rect x="18" y="24" width="22" height="18" rx="3" className="f-lemon" />
      <rect x="18" y="24" width="22" height="18" rx="3" className="s-ink" />
      <rect x="48" y="28" width="50" height="4" rx="1" className="f-ink" />
      <rect x="48" y="36" width="36" height="4" rx="1" className="f-ink" />
      <rect x="18" y="56" width="60" height="6" rx="1" className="f-ink" />
      <rect x="18" y="68" width="40" height="4" rx="1" className="f-ink" />
    </svg>
  );
}

export function StickerBell() {
  return (
    <svg viewBox="0 0 100 110" className="mp-sticker-svg">
      <rect x="10" y="74" width="80" height="10" rx="3" className="f-ink" />
      <path d="M14 74 Q14 24 50 24 Q86 24 86 74 Z" className="f-lemon" />
      <path d="M14 74 Q14 24 50 24 Q86 24 86 74 Z" className="s-ink2" />
      <rect x="44" y="14" width="12" height="12" rx="3" className="f-ink" />
      <circle cx="50" cy="92" r="6" className="f-coral" />
      <circle cx="50" cy="92" r="6" className="s-ink" />
    </svg>
  );
}

export function StickerLemonBox({ label = "30 min" }: { label?: string }) {
  return (
    <svg viewBox="0 0 110 80" className="mp-sticker-svg">
      <rect x="6" y="6" width="98" height="68" rx="10" className="f-lemon" />
      <rect x="6" y="6" width="98" height="68" rx="10" className="s-ink2" />
      <text x="55" y="50" textAnchor="middle" style={{ ...TX_BG, fontSize: 28, fill: "var(--ink)", fontStyle: "italic" }}>
        {label}
      </text>
    </svg>
  );
}

export function StickerCoralBadge({ label = "МЕСЕЦ", value = "FREE" }: { label?: string; value?: string }) {
  return (
    <svg viewBox="0 0 120 120" className="mp-sticker-svg">
      <circle cx="60" cy="60" r="46" className="f-coral" />
      <circle cx="60" cy="60" r="46" className="s-ink2" />
      <text x="60" y="50" textAnchor="middle" style={{ ...TX_MONO, fill: "var(--paper)", fontSize: 11 }}>
        {label}
      </text>
      <text x="60" y="80" textAnchor="middle" style={{ ...TX_BG, fill: "var(--paper)", fontStyle: "italic", fontSize: 28 }}>
        {value}
      </text>
    </svg>
  );
}

export const ALL_STICKERS: Array<{ key: string; node: JSX.Element }> = [
  { key: "s1", node: <StickerCoffee /> },
  { key: "s2", node: <StickerQR /> },
  { key: "s3", node: <StickerReceipt /> },
  { key: "s4", node: <StickerPlate /> },
  { key: "s5", node: <StickerTip /> },
  { key: "s6", node: <StickerTable /> },
  { key: "s7", node: <StickerCheck /> },
  { key: "s8", node: <StickerCard /> },
  { key: "s9", node: <StickerBell /> },
];
