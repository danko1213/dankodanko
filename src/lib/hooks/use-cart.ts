"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";

export interface CartItemExtra {
  id: string;
  name_bg: string;
  name_en: string | null;
  price: number;
}

export interface CartItemRemovedIngredient {
  id: string;
  name_bg: string;
  name_en: string | null;
}

export interface CartItem {
  cartId: string;
  menuItemId: string;
  name_bg: string;
  name_en: string | null;
  variantId: string | null;
  variantName_bg: string | null;
  variantName_en: string | null;
  quantity: number;
  unitPrice: number;
  extras: CartItemExtra[];
  removedIngredients: CartItemRemovedIngredient[];
  note: string;
  destination: "kitchen" | "bar";
}

interface CartState {
  items: CartItem[];
  generalNote: string;
  tipPercent: number | null;
  tipCustomAmount: number | null;
  restaurantSlug: string;

  addItem: (item: Omit<CartItem, "cartId">) => void;
  removeItem: (cartId: string) => void;
  updateQuantity: (cartId: string, quantity: number) => void;
  updateItemNote: (cartId: string, note: string) => void;
  setGeneralNote: (note: string) => void;
  setTip: (percent: number | null, custom: number | null) => void;
  setRestaurantSlug: (slug: string) => void;
  clear: () => void;
  getSubtotal: () => number;
  getItemTotal: (item: CartItem) => number;
  getTipAmount: (subtotal: number) => number;
  getTotal: (serviceFeePercent: number, serviceFeeFixed: number) => number;
  getServiceFee: (subtotal: number, feePercent: number, feeFixed: number) => number;
  itemCount: () => number;
}

function generateCartId(): string {
  return Math.random().toString(36).substring(2, 10);
}

export const useCart = create<CartState>()(
  persist(
    (set, get) => ({
      items: [],
      generalNote: "",
      tipPercent: null,
      tipCustomAmount: null,
      restaurantSlug: "",

      addItem: (item) =>
        set((state) => ({
          items: [...state.items, { ...item, cartId: generateCartId() }],
        })),

      removeItem: (cartId) =>
        set((state) => ({
          items: state.items.filter((i) => i.cartId !== cartId),
        })),

      updateQuantity: (cartId, quantity) =>
        set((state) => ({
          items:
            quantity <= 0
              ? state.items.filter((i) => i.cartId !== cartId)
              : state.items.map((i) =>
                  i.cartId === cartId ? { ...i, quantity } : i
                ),
        })),

      updateItemNote: (cartId, note) =>
        set((state) => ({
          items: state.items.map((i) =>
            i.cartId === cartId ? { ...i, note } : i
          ),
        })),

      setGeneralNote: (generalNote) => set({ generalNote }),

      setTip: (percent, custom) =>
        set({ tipPercent: percent, tipCustomAmount: custom }),

      setRestaurantSlug: (slug) => {
        const current = get().restaurantSlug;
        if (current && current !== slug) {
          set({ items: [], generalNote: "", tipPercent: null, tipCustomAmount: null, restaurantSlug: slug });
        } else {
          set({ restaurantSlug: slug });
        }
      },

      clear: () =>
        set({ items: [], generalNote: "", tipPercent: null, tipCustomAmount: null }),

      getItemTotal: (item) => {
        const extrasTotal = item.extras.reduce((sum, e) => sum + e.price, 0);
        return (item.unitPrice + extrasTotal) * item.quantity;
      },

      getSubtotal: () => {
        const state = get();
        return state.items.reduce((sum, item) => {
          const extrasTotal = item.extras.reduce((s, e) => s + e.price, 0);
          return sum + (item.unitPrice + extrasTotal) * item.quantity;
        }, 0);
      },

      getServiceFee: (subtotal, feePercent, feeFixed) => {
        return Math.round((subtotal * feePercent / 100 + feeFixed) * 100) / 100;
      },

      getTipAmount: (subtotal) => {
        const { tipPercent, tipCustomAmount } = get();
        if (tipCustomAmount !== null && tipCustomAmount > 0) return tipCustomAmount;
        if (tipPercent !== null && tipPercent > 0) {
          return Math.round((subtotal * tipPercent / 100) * 100) / 100;
        }
        return 0;
      },

      getTotal: (serviceFeePercent, serviceFeeFixed) => {
        const state = get();
        const subtotal = state.getSubtotal();
        const serviceFee = state.getServiceFee(subtotal, serviceFeePercent, serviceFeeFixed);
        const tip = state.getTipAmount(subtotal);
        return Math.round((subtotal + serviceFee + tip) * 100) / 100;
      },

      itemCount: () => get().items.reduce((sum, i) => sum + i.quantity, 0),
    }),
    {
      name: "masapay-cart",
    }
  )
);
