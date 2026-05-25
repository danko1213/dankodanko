"use client";

import { useState, useRef, useEffect } from "react";
import type { MenuCategory, MenuItem, RestaurantInfo } from "@/lib/types/menu";
import { CategoryTabs } from "./category-tabs";
import { MenuItemCard } from "./menu-item-card";
import { ItemDetailDrawer } from "./item-detail-drawer";
import { CartFab } from "./cart-fab";
import { LanguageToggle } from "./language-toggle";
import { useCart } from "@/lib/hooks/use-cart";

interface MenuBrowserProps {
  restaurant: RestaurantInfo;
  categories: MenuCategory[];
  tableSlug: string;
}

export function MenuBrowser({ restaurant, categories, tableSlug }: MenuBrowserProps) {
  const [lang, setLang] = useState<"bg" | "en">(
    restaurant.default_language === "en" ? "en" : "bg"
  );
  const [activeCategory, setActiveCategory] = useState<string | null>(
    categories[0]?.id || null
  );
  const [selectedItem, setSelectedItem] = useState<MenuItem | null>(null);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const sectionRefs = useRef<Map<string, HTMLDivElement>>(new Map());
  const setRestaurantSlug = useCart((s) => s.setRestaurantSlug);

  useEffect(() => {
    setRestaurantSlug(tableSlug);
  }, [tableSlug, setRestaurantSlug]);

  const showEnglish = restaurant.supported_languages.includes("en");

  function handleCategorySelect(id: string) {
    setActiveCategory(id);
    const el = sectionRefs.current.get(id);
    if (el) {
      const top = el.getBoundingClientRect().top + window.scrollY - 120;
      window.scrollTo({ top, behavior: "smooth" });
    }
  }

  function handleItemSelect(item: MenuItem) {
    setSelectedItem(item);
    setDrawerOpen(true);
  }

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setActiveCategory(entry.target.id);
          }
        }
      },
      { rootMargin: "-120px 0px -60% 0px", threshold: 0 }
    );

    sectionRefs.current.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [categories]);

  const activeCategoryData = categories.find((c) => c.id === selectedItem?.category_id);

  return (
    <div className="pb-24">
      {/* Header */}
      <div className="sticky top-0 z-20 bg-white shadow-sm">
        <div className="flex items-center justify-between px-4 pb-1 pt-4">
          <div className="flex items-center gap-3">
            {restaurant.logo_url && (
              <img
                src={restaurant.logo_url}
                alt={restaurant.name}
                className="h-10 w-10 rounded-full object-cover"
              />
            )}
            <h1 className="text-lg font-bold text-gray-900">{restaurant.name}</h1>
          </div>
          {showEnglish && (
            <LanguageToggle
              lang={lang}
              onToggle={() => setLang(lang === "bg" ? "en" : "bg")}
            />
          )}
        </div>
        <CategoryTabs
          categories={categories}
          activeId={activeCategory}
          lang={lang}
          onSelect={handleCategorySelect}
        />
      </div>

      {/* Menu sections */}
      {categories.length > 0 ? (
        <div className="divide-y">
          {categories.map((category) => {
            const catName = lang === "en" && category.name_en ? category.name_en : category.name_bg;
            const catDesc = lang === "en" && category.description_en ? category.description_en : category.description_bg;
            return (
              <div
                key={category.id}
                id={category.id}
                ref={(el) => {
                  if (el) sectionRefs.current.set(category.id, el);
                }}
                className="px-4 py-4"
              >
                <div className="flex items-center gap-2">
                  {category.icon && <span className="text-xl">{category.icon}</span>}
                  <h2 className="text-lg font-semibold text-gray-900">{catName}</h2>
                </div>
                {catDesc && (
                  <p className="mt-1 text-sm text-gray-500">{catDesc}</p>
                )}
                <div className="mt-3 space-y-3">
                  {category.items.map((item) => (
                    <MenuItemCard
                      key={item.id}
                      item={item}
                      lang={lang}
                      onSelect={handleItemSelect}
                    />
                  ))}
                  {category.items.length === 0 && (
                    <p className="py-4 text-center text-sm text-gray-400">
                      {lang === "en" ? "No items" : "Няма продукти"}
                    </p>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center py-20 text-center">
          <p className="text-gray-500">
            {lang === "en" ? "Menu is empty" : "Менюто е празно"}
          </p>
        </div>
      )}

      <ItemDetailDrawer
        item={selectedItem}
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        lang={lang}
        categoryDestination={activeCategoryData?.destination || "kitchen"}
      />

      <CartFab slug={tableSlug} lang={lang} />
    </div>
  );
}
