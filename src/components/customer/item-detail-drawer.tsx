"use client";

import { useState } from "react";
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerFooter,
  DrawerClose,
} from "@/components/ui/drawer";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Minus, Plus, X } from "lucide-react";
import type { MenuItem } from "@/lib/types/menu";
import { useCart } from "@/lib/hooks/use-cart";

interface ItemDetailDrawerProps {
  item: MenuItem | null;
  open: boolean;
  onClose: () => void;
  lang: "bg" | "en";
  categoryDestination: "kitchen" | "bar";
}

export function ItemDetailDrawer({
  item,
  open,
  onClose,
  lang,
  categoryDestination,
}: ItemDetailDrawerProps) {
  const [selectedVariantId, setSelectedVariantId] = useState<string | null>(null);
  const [selectedExtras, setSelectedExtras] = useState<Set<string>>(new Set());
  const [removedIngredients, setRemovedIngredients] = useState<Set<string>>(new Set());
  const [quantity, setQuantity] = useState(1);
  const [note, setNote] = useState("");
  const addItem = useCart((s) => s.addItem);

  if (!item) return null;

  const name = lang === "en" && item.name_en ? item.name_en : item.name_bg;
  const desc = lang === "en" && item.description_en ? item.description_en : item.description_bg;
  const availableVariants = item.variants.filter((v) => v.is_available);
  const availableExtras = item.extras.filter((e) => e.is_available);

  const selectedVariant = availableVariants.find((v) => v.id === selectedVariantId);
  const basePrice = Number(item.base_price) + (selectedVariant ? Number(selectedVariant.price_modifier) : 0);
  const extrasPrice = item.extras
    .filter((e) => selectedExtras.has(e.id))
    .reduce((sum, e) => sum + Number(e.price), 0);
  const totalPrice = (basePrice + extrasPrice) * quantity;

  function handleToggleExtra(id: string) {
    setSelectedExtras((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  }

  function handleToggleRemoved(id: string) {
    setRemovedIngredients((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  }

  function handleAddToCart() {
    if (!item) return;
    const extrasArr = item.extras
      .filter((e) => selectedExtras.has(e.id))
      .map((e) => ({
        id: e.id,
        name_bg: e.name_bg,
        name_en: e.name_en,
        price: Number(e.price),
      }));

    const removedArr = item.removableIngredients
      .filter((r) => removedIngredients.has(r.id))
      .map((r) => ({
        id: r.id,
        name_bg: r.name_bg,
        name_en: r.name_en,
      }));

    addItem({
      menuItemId: item.id,
      name_bg: item.name_bg,
      name_en: item.name_en,
      variantId: selectedVariantId,
      variantName_bg: selectedVariant?.name_bg || null,
      variantName_en: selectedVariant?.name_en || null,
      quantity,
      unitPrice: basePrice,
      extras: extrasArr,
      removedIngredients: removedArr,
      note,
      destination: categoryDestination,
    });

    resetAndClose();
  }

  function resetAndClose() {
    setSelectedVariantId(null);
    setSelectedExtras(new Set());
    setRemovedIngredients(new Set());
    setQuantity(1);
    setNote("");
    onClose();
  }

  return (
    <Drawer open={open} onOpenChange={(o) => !o && resetAndClose()}>
      <DrawerContent className="max-h-[85vh]">
        <div className="overflow-y-auto px-4">
          <DrawerHeader className="px-0">
            <div className="flex items-start justify-between">
              <DrawerTitle className="text-xl">{name}</DrawerTitle>
              <DrawerClose asChild>
                <button className="rounded-full p-1 hover:bg-gray-100">
                  <X className="h-5 w-5" />
                </button>
              </DrawerClose>
            </div>
            {desc && <p className="mt-1 text-sm text-gray-500">{desc}</p>}
          </DrawerHeader>

          {item.image_url && (
            <img
              src={item.image_url}
              alt={name}
              className="mb-4 h-48 w-full rounded-xl object-cover"
            />
          )}

          {/* Allergens */}
          {item.allergens.length > 0 && (
            <div className="mb-4">
              <h4 className="text-xs font-medium uppercase text-gray-400">
                {lang === "en" ? "Allergens" : "Алергени"}
              </h4>
              <div className="mt-1.5 flex flex-wrap gap-1.5">
                {item.allergens.map((a) => (
                  <span
                    key={a.id}
                    className="rounded-full bg-red-50 px-2.5 py-1 text-xs text-red-700"
                  >
                    {a.icon} {lang === "en" ? a.name_en : a.name_bg}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Dietary tags */}
          {item.dietaryTags.length > 0 && (
            <div className="mb-4 flex flex-wrap gap-1.5">
              {item.dietaryTags.map((tag) => (
                <span
                  key={tag.id}
                  className="rounded-full px-2.5 py-1 text-xs font-medium"
                  style={{
                    backgroundColor: tag.color ? `${tag.color}20` : "#f3f4f6",
                    color: tag.color || "#374151",
                  }}
                >
                  {tag.icon} {lang === "en" ? tag.name_en : tag.name_bg}
                </span>
              ))}
            </div>
          )}

          {/* Variants */}
          {availableVariants.length > 0 && (
            <div className="mb-4">
              <h4 className="mb-2 text-sm font-semibold text-gray-900">
                {lang === "en" ? "Size" : "Размер"}
              </h4>
              <div className="space-y-2">
                {availableVariants.map((v) => {
                  const vName = lang === "en" && v.name_en ? v.name_en : v.name_bg;
                  const modifier = Number(v.price_modifier);
                  return (
                    <label
                      key={v.id}
                      className={`flex cursor-pointer items-center justify-between rounded-lg border p-3 transition-colors ${
                        selectedVariantId === v.id
                          ? "border-amber-500 bg-amber-50"
                          : "hover:bg-gray-50"
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <input
                          type="radio"
                          name="variant"
                          checked={selectedVariantId === v.id}
                          onChange={() => setSelectedVariantId(v.id)}
                          className="h-4 w-4 text-amber-900 accent-amber-900"
                        />
                        <span className="text-sm">{vName}</span>
                      </div>
                      {modifier !== 0 && (
                        <span className="text-sm text-gray-500">
                          {modifier > 0 ? "+" : ""}{modifier.toFixed(2)} €
                        </span>
                      )}
                    </label>
                  );
                })}
              </div>
            </div>
          )}

          {/* Extras */}
          {availableExtras.length > 0 && (
            <div className="mb-4">
              <h4 className="mb-2 text-sm font-semibold text-gray-900">
                {lang === "en" ? "Extras" : "Добавки"}
              </h4>
              <div className="space-y-2">
                {availableExtras.map((e) => {
                  const eName = lang === "en" && e.name_en ? e.name_en : e.name_bg;
                  return (
                    <label
                      key={e.id}
                      className={`flex cursor-pointer items-center justify-between rounded-lg border p-3 transition-colors ${
                        selectedExtras.has(e.id)
                          ? "border-amber-500 bg-amber-50"
                          : "hover:bg-gray-50"
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <input
                          type="checkbox"
                          checked={selectedExtras.has(e.id)}
                          onChange={() => handleToggleExtra(e.id)}
                          className="h-4 w-4 rounded accent-amber-900"
                        />
                        <span className="text-sm">{eName}</span>
                      </div>
                      {Number(e.price) > 0 && (
                        <span className="text-sm text-gray-500">
                          +{Number(e.price).toFixed(2)} €
                        </span>
                      )}
                    </label>
                  );
                })}
              </div>
            </div>
          )}

          {/* Remove ingredients */}
          {item.removableIngredients.length > 0 && (
            <div className="mb-4">
              <h4 className="mb-2 text-sm font-semibold text-gray-900">
                {lang === "en" ? "Without" : "Без"}
              </h4>
              <div className="flex flex-wrap gap-2">
                {item.removableIngredients.map((r) => {
                  const rName = lang === "en" && r.name_en ? r.name_en : r.name_bg;
                  const isRemoved = removedIngredients.has(r.id);
                  return (
                    <button
                      key={r.id}
                      onClick={() => handleToggleRemoved(r.id)}
                      className={`rounded-full border px-3 py-1.5 text-sm transition-colors ${
                        isRemoved
                          ? "border-red-300 bg-red-50 text-red-700 line-through"
                          : "hover:bg-gray-50"
                      }`}
                    >
                      {rName}
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* Note */}
          <div className="mb-4">
            <h4 className="mb-2 text-sm font-semibold text-gray-900">
              {lang === "en" ? "Note" : "Бележка"}
            </h4>
            <Textarea
              value={note}
              onChange={(e) => setNote(e.target.value)}
              placeholder={lang === "en" ? "Special requests..." : "Специални изисквания..."}
              rows={2}
              className="resize-none text-sm"
            />
          </div>

          {/* Quantity */}
          <div className="mb-4 flex items-center justify-center gap-4">
            <button
              onClick={() => setQuantity(Math.max(1, quantity - 1))}
              className="flex h-10 w-10 items-center justify-center rounded-full bg-gray-100 hover:bg-gray-200"
            >
              <Minus className="h-4 w-4" />
            </button>
            <span className="text-xl font-semibold">{quantity}</span>
            <button
              onClick={() => setQuantity(quantity + 1)}
              className="flex h-10 w-10 items-center justify-center rounded-full bg-gray-100 hover:bg-gray-200"
            >
              <Plus className="h-4 w-4" />
            </button>
          </div>
        </div>

        <DrawerFooter className="border-t pt-4">
          <Button
            onClick={handleAddToCart}
            className="h-12 w-full bg-amber-900 text-base font-semibold hover:bg-amber-800"
          >
            {lang === "en" ? "Add to cart" : "Добави"} — {totalPrice.toFixed(2)} €
          </Button>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
}
