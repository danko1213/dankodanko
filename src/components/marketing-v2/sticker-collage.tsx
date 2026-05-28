"use client";

import { useEffect, useRef, type ReactNode } from "react";

interface Item {
  className: string;
  node: ReactNode;
}

export function StickerCollage({ items, variant = "hero" }: { items: Item[]; variant?: "hero" | "cta" }) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const root = ref.current;
    if (!root) return;
    const stickers = Array.from(root.querySelectorAll<HTMLDivElement>(".mp-sticker"));

    let mx = 0.5;
    let my = 0.5;
    let raf = 0;

    const onMove = (e: PointerEvent) => {
      const r = root.getBoundingClientRect();
      mx = (e.clientX - r.left) / r.width;
      my = (e.clientY - r.top) / r.height;
    };

    const tick = () => {
      stickers.forEach((s, i) => {
        const depth = (i % 4) + 1;
        const dx = (mx - 0.5) * depth * 6;
        const dy = (my - 0.5) * depth * 6;
        s.style.setProperty("--mx", dx + "px");
        s.style.setProperty("--my", dy + "px");
      });
      raf = requestAnimationFrame(tick);
    };

    root.addEventListener("pointermove", onMove);
    raf = requestAnimationFrame(tick);
    return () => {
      root.removeEventListener("pointermove", onMove);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <div ref={ref} className={variant === "cta" ? "mp-cta-collage" : "mp-collage"} aria-hidden="true">
      {items.map((it, i) => (
        <div key={i} className={`mp-sticker ${it.className}`}>
          {it.node}
        </div>
      ))}
    </div>
  );
}
