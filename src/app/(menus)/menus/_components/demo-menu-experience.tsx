"use client";

import Image from "next/image";
import { Minus, Plus, ShoppingBag, Trash2 } from "lucide-react";
import { useMemo, useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";

export type MenuLang = "bg" | "en";

export type LocalizedText = {
  bg: string;
  en: string;
};

export type DemoMenuItem = {
  id: string;
  name: LocalizedText;
  description: LocalizedText;
  price: number;
  image: string;
  accent: LocalizedText;
  removableIngredients: LocalizedText[];
  ingredients?: LocalizedText[];
  allergens?: LocalizedText[];
};

export type DemoMenuSection = {
  id: string;
  eyebrow: LocalizedText;
  title: LocalizedText;
  note: LocalizedText;
  items: DemoMenuItem[];
  featured?: boolean;
};

export type DemoMenuTheme = {
  pageClass: string;
  shellClass: string;
  heroClass: string;
  heroEyebrowClass: string;
  heroTitleClass: string;
  heroTextClass: string;
  statClass: string;
  contentClass: string;
  sectionEyebrowClass: string;
  sectionTitleClass: string;
  sectionNoteClass: string;
  sectionFeaturedClass?: string;
  cardClass: string;
  cardFeaturedClass?: string;
  imageWrapClass: string;
  imageClass: string;
  accentClass: string;
  itemTitleClass: string;
  itemDescriptionClass: string;
  priceClass: string;
  addButtonClass: string;
  panelClass: string;
  chipClass: string;
  chipActiveClass: string;
  inputClass: string;
  cartClass: string;
  cartButtonClass: string;
};

export type DemoMenuContent = {
  hero: {
    eyebrow: LocalizedText;
    title: LocalizedText;
    description: LocalizedText;
    stats: LocalizedText[];
  };
  sections: DemoMenuSection[];
  showIngredients?: boolean;
  showAllergens?: boolean;
};

type CustomizationState = {
  removed: string[];
  note: string;
  quantity: number;
};

type CartItem = {
  cartId: string;
  item: DemoMenuItem;
  removed: string[];
  note: string;
  quantity: number;
};

const labels = {
  bg: {
    switchTo: "EN",
    customize: "Добави",
    without: "Без",
    note: "Бележка към ресторанта",
    placeholder: "Напр. без лук, повече лимон, без лед...",
    quantity: "Количество",
    addToCart: "Добави в количката",
    cart: "Количка",
    empty: "Изберете ястие или напитка",
    total: "Общо",
    remove: "Премахни",
    ingredients: "Съставки",
    allergens: "Алергени",
    selectedWithout: "Без",
  },
  en: {
    switchTo: "BG",
    customize: "Add",
    without: "Without",
    note: "Note for the restaurant",
    placeholder: "E.g. no onion, extra lemon, no ice...",
    quantity: "Quantity",
    addToCart: "Add to cart",
    cart: "Cart",
    empty: "Choose a dish or drink",
    total: "Total",
    remove: "Remove",
    ingredients: "Ingredients",
    allergens: "Allergens",
    selectedWithout: "Without",
  },
} satisfies Record<MenuLang, Record<string, string>>;

function t(value: LocalizedText, lang: MenuLang) {
  return value[lang] || value.bg;
}

function formatPrice(value: number) {
  return `€${value % 1 === 0 ? value.toFixed(0) : value.toFixed(2)}`;
}

function makeInitialState(): CustomizationState {
  return { removed: [], note: "", quantity: 1 };
}

export function DemoMenuExperience({
  content,
  theme,
}: {
  content: DemoMenuContent;
  theme: DemoMenuTheme;
}) {
  const [lang, setLang] = useState<MenuLang>("bg");
  const [activeItemId, setActiveItemId] = useState<string | null>(null);
  const [customizations, setCustomizations] = useState<Record<string, CustomizationState>>({});
  const [cart, setCart] = useState<CartItem[]>([]);
  const copy = labels[lang];

  const cartTotal = useMemo(
    () => cart.reduce((sum, item) => sum + item.item.price * item.quantity, 0),
    [cart]
  );

  function stateFor(itemId: string) {
    return customizations[itemId] || makeInitialState();
  }

  function updateState(itemId: string, next: CustomizationState) {
    setCustomizations((current) => ({ ...current, [itemId]: next }));
  }

  function toggleRemoved(item: DemoMenuItem, ingredient: LocalizedText) {
    const key = ingredient.bg;
    const current = stateFor(item.id);
    const removed = current.removed.includes(key)
      ? current.removed.filter((value) => value !== key)
      : [...current.removed, key];
    updateState(item.id, { ...current, removed });
  }

  function addToCart(item: DemoMenuItem) {
    const current = stateFor(item.id);
    setCart((items) => [
      ...items,
      {
        cartId: `${item.id}-${Date.now()}-${Math.random().toString(36).slice(2)}`,
        item,
        removed: current.removed,
        note: current.note.trim(),
        quantity: current.quantity,
      },
    ]);
    updateState(item.id, makeInitialState());
    setActiveItemId(null);
  }

  function updateQuantity(item: DemoMenuItem, quantity: number) {
    const current = stateFor(item.id);
    updateState(item.id, { ...current, quantity: Math.max(1, quantity) });
  }

  return (
    <main className={theme.pageClass}>
      <div className={theme.shellClass}>
        <section className={theme.heroClass}>
          <div className="flex items-start justify-between gap-4">
            <div>
              <p className={theme.heroEyebrowClass}>{t(content.hero.eyebrow, lang)}</p>
              <h1 className={theme.heroTitleClass}>{t(content.hero.title, lang)}</h1>
            </div>
            <button
              type="button"
              onClick={() => setLang((current) => (current === "bg" ? "en" : "bg"))}
              className="shrink-0 rounded-full border border-current/20 bg-white/70 px-3 py-2 text-xs font-black uppercase tracking-[0.16em] text-current shadow-sm backdrop-blur"
            >
              {copy.switchTo}
            </button>
          </div>
          <p className={theme.heroTextClass}>{t(content.hero.description, lang)}</p>
          <div className="mt-6 grid grid-cols-3 gap-2 text-center">
            {content.hero.stats.map((stat) => (
              <span key={stat.bg} className={theme.statClass}>
                {t(stat, lang)}
              </span>
            ))}
          </div>
        </section>

        <div className={theme.contentClass}>
          {content.sections.map((section) => (
            <section
              key={section.id}
              className={section.featured && theme.sectionFeaturedClass ? theme.sectionFeaturedClass : undefined}
            >
              <div className="mb-4 border-b border-current/15 pb-4">
                <p className={theme.sectionEyebrowClass}>{t(section.eyebrow, lang)}</p>
                <h2 className={theme.sectionTitleClass}>{t(section.title, lang)}</h2>
                <p className={theme.sectionNoteClass}>{t(section.note, lang)}</p>
              </div>
              <div className="grid gap-4">
                {section.items.map((item) => {
                  const current = stateFor(item.id);
                  const isActive = activeItemId === item.id;
                  return (
                    <article
                      key={item.id}
                      className={`${theme.cardClass} ${section.featured && theme.cardFeaturedClass ? theme.cardFeaturedClass : ""}`}
                    >
                      <div className={theme.imageWrapClass}>
                        <Image
                          src={item.image}
                          alt={t(item.name, lang)}
                          fill
                          loading="eager"
                          sizes="430px"
                          className={theme.imageClass}
                        />
                      </div>
                      <div className="grid gap-3 p-4">
                        <div className="flex items-start justify-between gap-3">
                          <div>
                            <p className={theme.accentClass}>{t(item.accent, lang)}</p>
                            <h3 className={theme.itemTitleClass}>{t(item.name, lang)}</h3>
                          </div>
                          <span className={theme.priceClass}>{formatPrice(item.price)}</span>
                        </div>
                        <p className={theme.itemDescriptionClass}>{t(item.description, lang)}</p>

                        {content.showIngredients && item.ingredients && (
                          <div>
                            <p className={theme.accentClass}>{copy.ingredients}</p>
                            <div className="mt-2 flex flex-wrap gap-2">
                              {item.ingredients.map((ingredient) => (
                                <span key={ingredient.bg} className={theme.chipClass}>
                                  {t(ingredient, lang)}
                                </span>
                              ))}
                            </div>
                          </div>
                        )}

                        {content.showAllergens && item.allergens && (
                          <div>
                            <p className={theme.accentClass}>{copy.allergens}</p>
                            <div className="mt-2 flex flex-wrap gap-2">
                              {item.allergens.map((allergen) => (
                                <span key={allergen.bg} className={theme.chipClass}>
                                  {t(allergen, lang)}
                                </span>
                              ))}
                            </div>
                          </div>
                        )}

                        <Button
                          type="button"
                          onClick={() => setActiveItemId(isActive ? null : item.id)}
                          className={theme.addButtonClass}
                        >
                          <ShoppingBag className="h-4 w-4" />
                          {copy.customize}
                        </Button>

                        {isActive && (
                          <div className={theme.panelClass}>
                            <div>
                              <p className={theme.accentClass}>{copy.without}</p>
                              <div className="mt-2 flex flex-wrap gap-2">
                                {item.removableIngredients.map((ingredient) => {
                                  const selected = current.removed.includes(ingredient.bg);
                                  return (
                                    <button
                                      key={ingredient.bg}
                                      type="button"
                                      onClick={() => toggleRemoved(item, ingredient)}
                                      className={selected ? theme.chipActiveClass : theme.chipClass}
                                    >
                                      {t(ingredient, lang)}
                                    </button>
                                  );
                                })}
                              </div>
                            </div>

                            <div>
                              <label className={theme.accentClass} htmlFor={`${item.id}-note`}>
                                {copy.note}
                              </label>
                              <Textarea
                                id={`${item.id}-note`}
                                value={current.note}
                                onChange={(event) => updateState(item.id, { ...current, note: event.target.value })}
                                placeholder={copy.placeholder}
                                rows={2}
                                className={theme.inputClass}
                              />
                            </div>

                            <div className="flex items-center justify-between gap-3">
                              <span className={theme.accentClass}>{copy.quantity}</span>
                              <div className="flex items-center gap-3">
                                <button
                                  type="button"
                                  onClick={() => updateQuantity(item, current.quantity - 1)}
                                  className={theme.cartButtonClass}
                                >
                                  <Minus className="h-4 w-4" />
                                </button>
                                <span className="min-w-6 text-center text-lg font-black">{current.quantity}</span>
                                <button
                                  type="button"
                                  onClick={() => updateQuantity(item, current.quantity + 1)}
                                  className={theme.cartButtonClass}
                                >
                                  <Plus className="h-4 w-4" />
                                </button>
                              </div>
                            </div>

                            <Button
                              type="button"
                              onClick={() => addToCart(item)}
                              className={theme.addButtonClass}
                            >
                              {copy.addToCart} · {formatPrice(item.price * current.quantity)}
                            </Button>
                          </div>
                        )}
                      </div>
                    </article>
                  );
                })}
              </div>
            </section>
          ))}
        </div>

        <aside className={theme.cartClass}>
          <div className="flex items-center justify-between gap-3">
            <div>
              <p className="text-xs font-black uppercase tracking-[0.18em] opacity-70">{copy.cart}</p>
              <p className="text-sm font-semibold">
                {cart.length === 0 ? copy.empty : `${cart.reduce((sum, item) => sum + item.quantity, 0)} · ${copy.total} ${formatPrice(cartTotal)}`}
              </p>
            </div>
            <ShoppingBag className="h-5 w-5" />
          </div>

          {cart.length > 0 && (
            <div className="mt-3 grid gap-2 border-t border-current/15 pt-3">
              {cart.map((cartItem) => (
                <div key={cartItem.cartId} className="grid gap-1 rounded-md bg-current/5 p-3">
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <p className="text-sm font-bold">
                        {cartItem.quantity}× {t(cartItem.item.name, lang)}
                      </p>
                      {cartItem.removed.length > 0 && (
                        <p className="mt-1 text-xs opacity-75">
                          {copy.selectedWithout}: {cartItem.removed.map((removed) => {
                            const found = cartItem.item.removableIngredients.find((ingredient) => ingredient.bg === removed);
                            return found ? t(found, lang) : removed;
                          }).join(", ")}
                        </p>
                      )}
                      {cartItem.note && <p className="mt-1 text-xs italic opacity-75">{cartItem.note}</p>}
                    </div>
                    <button
                      type="button"
                      onClick={() => setCart((items) => items.filter((item) => item.cartId !== cartItem.cartId))}
                      aria-label={copy.remove}
                      className={theme.cartButtonClass}
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </aside>
      </div>
    </main>
  );
}
