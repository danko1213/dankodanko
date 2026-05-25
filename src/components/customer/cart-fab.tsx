"use client";

import Link from "next/link";
import { ShoppingBag } from "lucide-react";
import { useCart } from "@/lib/hooks/use-cart";

interface CartFabProps {
  slug: string;
  lang: "bg" | "en";
}

export function CartFab({ slug, lang }: CartFabProps) {
  const itemCount = useCart((s) => s.itemCount)();
  const subtotal = useCart((s) => s.getSubtotal)();

  if (itemCount === 0) return null;

  return (
    <Link
      href={`/m/${slug}/cart`}
      className="fixed bottom-4 left-4 right-4 z-40 mx-auto flex max-w-md items-center justify-between rounded-2xl bg-amber-900 px-5 py-3.5 text-white shadow-lg transition-transform active:scale-[0.98]"
    >
      <div className="flex items-center gap-3">
        <div className="relative">
          <ShoppingBag className="h-6 w-6" />
          <span className="absolute -right-2 -top-2 flex h-5 w-5 items-center justify-center rounded-full bg-white text-xs font-bold text-amber-900">
            {itemCount}
          </span>
        </div>
        <span className="font-medium">
          {lang === "en" ? "View cart" : "Преглед на поръчката"}
        </span>
      </div>
      <span className="font-semibold">{subtotal.toFixed(2)} €</span>
    </Link>
  );
}
