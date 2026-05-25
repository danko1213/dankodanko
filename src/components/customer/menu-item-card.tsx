"use client";

import type { MenuItem } from "@/lib/types/menu";

interface MenuItemCardProps {
  item: MenuItem;
  lang: "bg" | "en";
  onSelect: (item: MenuItem) => void;
}

export function MenuItemCard({ item, lang, onSelect }: MenuItemCardProps) {
  const name = lang === "en" && item.name_en ? item.name_en : item.name_bg;
  const desc = lang === "en" && item.description_en ? item.description_en : item.description_bg;

  return (
    <button
      onClick={() => item.is_available && onSelect(item)}
      disabled={!item.is_available}
      className={`flex w-full gap-3 rounded-xl border p-3 text-left transition-colors ${
        item.is_available
          ? "hover:border-amber-200 hover:bg-amber-50/50 active:bg-amber-50"
          : "cursor-not-allowed opacity-50"
      }`}
    >
      {item.image_url && (
        <img
          src={item.image_url}
          alt={name}
          className="h-20 w-20 flex-shrink-0 rounded-lg object-cover"
        />
      )}
      <div className="flex min-w-0 flex-1 flex-col">
        <h3 className="font-medium text-gray-900">{name}</h3>
        {desc && (
          <p className="mt-0.5 text-xs text-gray-500 line-clamp-2">{desc}</p>
        )}
        <div className="mt-auto flex items-center gap-2 pt-1.5">
          {item.dietaryTags.map((tag) => (
            <span
              key={tag.id}
              className="text-xs"
              title={lang === "en" ? tag.name_en : tag.name_bg}
            >
              {tag.icon}
            </span>
          ))}
        </div>
        <div className="mt-1 flex items-center justify-between">
          <span className="font-semibold text-amber-900">
            {Number(item.base_price).toFixed(2)} €
          </span>
          {!item.is_available && (
            <span className="rounded-full bg-gray-100 px-2 py-0.5 text-xs text-gray-500">
              {lang === "en" ? "Unavailable" : "Неналично"}
            </span>
          )}
        </div>
      </div>
    </button>
  );
}
