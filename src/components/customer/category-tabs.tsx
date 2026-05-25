"use client";

import { useRef, useEffect } from "react";
import type { MenuCategory } from "@/lib/types/menu";

interface CategoryTabsProps {
  categories: MenuCategory[];
  activeId: string | null;
  lang: "bg" | "en";
  onSelect: (id: string) => void;
}

export function CategoryTabs({ categories, activeId, lang, onSelect }: CategoryTabsProps) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const activeRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (activeRef.current && scrollRef.current) {
      const container = scrollRef.current;
      const el = activeRef.current;
      const left = el.offsetLeft - container.offsetWidth / 2 + el.offsetWidth / 2;
      container.scrollTo({ left, behavior: "smooth" });
    }
  }, [activeId]);

  return (
    <div
      ref={scrollRef}
      className="flex gap-2 overflow-x-auto px-4 py-3 scrollbar-hide"
      style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
    >
      {categories.map((cat) => {
        const isActive = cat.id === activeId;
        const name = lang === "en" && cat.name_en ? cat.name_en : cat.name_bg;
        return (
          <button
            key={cat.id}
            ref={isActive ? activeRef : null}
            onClick={() => onSelect(cat.id)}
            className={`flex shrink-0 items-center gap-1.5 rounded-full px-4 py-2 text-sm font-medium transition-colors ${
              isActive
                ? "bg-amber-900 text-white"
                : "bg-gray-100 text-gray-700 hover:bg-gray-200"
            }`}
          >
            {cat.icon && <span>{cat.icon}</span>}
            {name}
          </button>
        );
      })}
    </div>
  );
}
