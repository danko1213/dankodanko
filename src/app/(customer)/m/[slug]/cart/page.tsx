"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Minus, Plus, Trash2, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Separator } from "@/components/ui/separator";
import { TipSelector } from "@/components/customer/tip-selector";
import { useCart } from "@/lib/hooks/use-cart";
import { use } from "react";

export default function CartPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = use(params);
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [mounted, setMounted] = useState(false);

  const items = useCart((s) => s.items);
  const generalNote = useCart((s) => s.generalNote);
  const tipPercent = useCart((s) => s.tipPercent);
  const tipCustomAmount = useCart((s) => s.tipCustomAmount);
  const removeItem = useCart((s) => s.removeItem);
  const updateQuantity = useCart((s) => s.updateQuantity);
  const setGeneralNote = useCart((s) => s.setGeneralNote);
  const setTip = useCart((s) => s.setTip);
  const getSubtotal = useCart((s) => s.getSubtotal);
  const getTipAmount = useCart((s) => s.getTipAmount);
  const clear = useCart((s) => s.clear);

  useEffect(() => setMounted(true), []);

  if (!mounted) {
    return (
      <div className="flex h-screen items-center justify-center">
        <Loader2 className="h-6 w-6 animate-spin text-amber-900" />
      </div>
    );
  }

  const subtotal = getSubtotal();
  const tipAmount = getTipAmount(subtotal);
  const total = Math.round((subtotal + tipAmount) * 100) / 100;

  async function handleOrder() {
    if (items.length === 0) return;
    setLoading(true);

    try {
      const res = await fetch("/api/payments/simulate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          slug,
          items: items.map((item) => ({
            menuItemId: item.menuItemId,
            variantId: item.variantId,
            quantity: item.quantity,
            extraIds: item.extras.map((e) => e.id),
            removedIngredientIds: item.removedIngredients.map((r) => r.id),
            note: item.note || null,
          })),
          generalNote: generalNote || null,
          tipPercent,
          tipCustomAmount,
          customerSessionId: getOrCreateSessionId(),
        }),
      });

      if (!res.ok) {
        const data = await res.json();
        alert(data.error || "Грешка при поръчката");
        setLoading(false);
        return;
      }

      const { orderId } = await res.json();
      clear();
      router.push(`/m/${slug}/order/${orderId}`);
    } catch {
      alert("Грешка при връзката. Опитайте отново.");
      setLoading(false);
    }
  }

  if (items.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center px-4 py-20 text-center">
        <p className="text-lg text-gray-500">Кошницата е празна</p>
        <Link
          href={`/m/${slug}`}
          className="mt-4 text-sm font-medium text-amber-900 hover:underline"
        >
          &larr; Обратно към менюто
        </Link>
      </div>
    );
  }

  return (
    <div className="pb-32">
      {/* Header */}
      <div className="sticky top-0 z-10 flex items-center gap-3 bg-white px-4 py-3 shadow-sm">
        <Link href={`/m/${slug}`} className="rounded-full p-1 hover:bg-gray-100">
          <ArrowLeft className="h-5 w-5" />
        </Link>
        <h1 className="text-lg font-bold text-gray-900">Вашата поръчка</h1>
      </div>

      {/* Items */}
      <div className="divide-y px-4">
        {items.map((item) => {
          const extrasTotal = item.extras.reduce((s, e) => s + e.price, 0);
          const itemTotal = (item.unitPrice + extrasTotal) * item.quantity;
          return (
            <div key={item.cartId} className="py-4">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <h3 className="font-medium text-gray-900">{item.name_bg}</h3>
                  {item.variantName_bg && (
                    <p className="text-xs text-gray-500">{item.variantName_bg}</p>
                  )}
                  {item.extras.length > 0 && (
                    <p className="text-xs text-gray-500">
                      + {item.extras.map((e) => e.name_bg).join(", ")}
                    </p>
                  )}
                  {item.removedIngredients.length > 0 && (
                    <p className="text-xs text-red-500">
                      Без: {item.removedIngredients.map((r) => r.name_bg).join(", ")}
                    </p>
                  )}
                  {item.note && (
                    <p className="mt-0.5 text-xs italic text-gray-400">{item.note}</p>
                  )}
                </div>
                <span className="ml-2 font-semibold text-amber-900">
                  {itemTotal.toFixed(2)} €
                </span>
              </div>
              <div className="mt-2 flex items-center gap-2">
                <button
                  onClick={() => updateQuantity(item.cartId, item.quantity - 1)}
                  className="flex h-8 w-8 items-center justify-center rounded-full bg-gray-100 hover:bg-gray-200"
                >
                  <Minus className="h-3 w-3" />
                </button>
                <span className="w-6 text-center text-sm font-semibold">
                  {item.quantity}
                </span>
                <button
                  onClick={() => updateQuantity(item.cartId, item.quantity + 1)}
                  className="flex h-8 w-8 items-center justify-center rounded-full bg-gray-100 hover:bg-gray-200"
                >
                  <Plus className="h-3 w-3" />
                </button>
                <button
                  onClick={() => removeItem(item.cartId)}
                  className="ml-auto rounded-full p-2 text-gray-400 hover:bg-red-50 hover:text-red-500"
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>
            </div>
          );
        })}
      </div>

      <div className="px-4">
        <Separator className="my-2" />

        {/* General note */}
        <div className="py-3">
          <h3 className="text-sm font-semibold text-gray-900">Бележка към поръчката</h3>
          <Textarea
            value={generalNote}
            onChange={(e) => setGeneralNote(e.target.value)}
            placeholder="Допълнителни бележки..."
            rows={2}
            className="mt-2 resize-none text-sm"
          />
        </div>

        <Separator className="my-2" />

        {/* Tip */}
        <div className="py-3">
          <TipSelector
            tipPercent={tipPercent}
            tipCustom={tipCustomAmount}
            subtotal={subtotal}
            lang="bg"
            onChangeTip={setTip}
          />
        </div>

        <Separator className="my-2" />

        {/* Summary */}
        <div className="space-y-2 py-3">
          <div className="flex justify-between text-sm">
            <span className="text-gray-600">Междинна сума</span>
            <span>{subtotal.toFixed(2)} €</span>
          </div>
          {tipAmount > 0 && (
            <div className="flex justify-between text-sm">
              <span className="text-gray-600">Бакшиш</span>
              <span>{tipAmount.toFixed(2)} €</span>
            </div>
          )}
          <Separator />
          <div className="flex justify-between text-lg font-bold">
            <span>Общо</span>
            <span className="text-amber-900">{total.toFixed(2)} €</span>
          </div>
        </div>
      </div>

      {/* Fixed bottom button */}
      <div className="fixed bottom-0 left-0 right-0 z-40 border-t bg-white p-4 safe-area-bottom">
        <div className="mx-auto max-w-md">
          <Button
            onClick={handleOrder}
            disabled={loading}
            className="h-14 w-full bg-amber-900 text-base font-semibold hover:bg-amber-800"
          >
            {loading ? (
              <Loader2 className="mr-2 h-5 w-5 animate-spin" />
            ) : null}
            {loading ? "Обработка..." : `Поръчай и плати — ${total.toFixed(2)} €`}
          </Button>
        </div>
      </div>
    </div>
  );
}

function getOrCreateSessionId(): string {
  if (typeof window === "undefined") return "";
  let id = localStorage.getItem("masapay-session-id");
  if (!id) {
    id = crypto.randomUUID();
    localStorage.setItem("masapay-session-id", id);
  }
  return id;
}
