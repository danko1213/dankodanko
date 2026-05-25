import { NextResponse } from "next/server";
import { createAdminClient } from "@/lib/supabase/admin";
import { z } from "zod";

const orderItemSchema = z.object({
  menuItemId: z.string().uuid(),
  variantId: z.string().uuid().nullable(),
  quantity: z.number().int().min(1),
  extraIds: z.array(z.string().uuid()),
  removedIngredientIds: z.array(z.string().uuid()),
  note: z.string().nullable(),
});

const orderSchema = z.object({
  slug: z.string().min(1),
  items: z.array(orderItemSchema).min(1),
  generalNote: z.string().nullable(),
  tipPercent: z.number().nullable(),
  tipCustomAmount: z.number().nullable(),
  customerSessionId: z.string().nullable(),
});

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const data = orderSchema.parse(body);
    const supabase = createAdminClient();

    // 1. Resolve table from slug
    const { data: table, error: tableErr } = await supabase
      .from("tables")
      .select("id, restaurant_id")
      .eq("slug", data.slug)
      .eq("is_active", true)
      .single();

    if (tableErr || !table) {
      return NextResponse.json({ error: "Table not found" }, { status: 404 });
    }

    // 2. Fetch restaurant for service fee
    const { data: restaurant } = await supabase
      .from("restaurants")
      .select("id, service_fee_percent, service_fee_fixed")
      .eq("id", (table as any).restaurant_id)
      .single();

    if (!restaurant) {
      return NextResponse.json({ error: "Restaurant not found" }, { status: 404 });
    }

    const restaurantId = (restaurant as any).id;
    const serviceFeePercent = Number((restaurant as any).service_fee_percent) || 0;
    const serviceFeeFixed = Number((restaurant as any).service_fee_fixed) || 0;

    // 3. Fetch all referenced menu items
    const menuItemIds = data.items.map((i) => i.menuItemId);
    const { data: menuItems } = await supabase
      .from("menu_items")
      .select("id, category_id, name_bg, name_en, base_price, is_available")
      .in("id", menuItemIds)
      .eq("is_active", true);

    if (!menuItems || menuItems.length !== menuItemIds.length) {
      return NextResponse.json({ error: "Some items not found" }, { status: 400 });
    }

    const menuItemMap = new Map((menuItems as any[]).map((m) => [m.id, m]));

    // Check availability
    for (const mi of menuItems as any[]) {
      if (!mi.is_available) {
        return NextResponse.json(
          { error: `"${mi.name_bg}" is currently unavailable` },
          { status: 400 }
        );
      }
    }

    // 4. Fetch categories for destination
    const categoryIds = [...new Set((menuItems as any[]).map((m) => m.category_id))];
    const { data: categories } = await supabase
      .from("menu_categories")
      .select("id, destination")
      .in("id", categoryIds);

    const categoryMap = new Map((categories as any[] || []).map((c) => [c.id, c.destination]));

    // 5. Fetch all variants, extras, removable ingredients
    const allVariantIds = data.items.map((i) => i.variantId).filter(Boolean) as string[];
    const allExtraIds = data.items.flatMap((i) => i.extraIds);
    const allRemovedIds = data.items.flatMap((i) => i.removedIngredientIds);

    const [variantsRes, extrasRes, removedRes] = await Promise.all([
      allVariantIds.length > 0
        ? supabase.from("menu_item_variants").select("*").in("id", allVariantIds)
        : { data: [] },
      allExtraIds.length > 0
        ? supabase.from("menu_item_extras").select("*").in("id", allExtraIds)
        : { data: [] },
      allRemovedIds.length > 0
        ? supabase.from("menu_item_removable_ingredients").select("*").in("id", allRemovedIds)
        : { data: [] },
    ]);

    const variantMap = new Map(((variantsRes.data || []) as any[]).map((v) => [v.id, v]));
    const extraMap = new Map(((extrasRes.data || []) as any[]).map((e) => [e.id, e]));
    const removedMap = new Map(((removedRes.data || []) as any[]).map((r) => [r.id, r]));

    // 6. Calculate totals server-side
    let subtotal = 0;
    const orderItems: any[] = [];

    for (const item of data.items) {
      const menuItem = menuItemMap.get(item.menuItemId)!;
      let unitPrice = Number(menuItem.base_price);

      let variantNameBg: string | null = null;
      let variantNameEn: string | null = null;

      if (item.variantId) {
        const variant = variantMap.get(item.variantId);
        if (!variant) {
          return NextResponse.json({ error: "Variant not found" }, { status: 400 });
        }
        unitPrice += Number(variant.price_modifier);
        variantNameBg = variant.name_bg;
        variantNameEn = variant.name_en;
      }

      let extrasTotal = 0;
      const orderExtras: any[] = [];
      for (const extraId of item.extraIds) {
        const extra = extraMap.get(extraId);
        if (!extra) {
          return NextResponse.json({ error: "Extra not found" }, { status: 400 });
        }
        extrasTotal += Number(extra.price);
        orderExtras.push({
          extra_id: extra.id,
          price: Number(extra.price),
          name_bg: extra.name_bg,
          name_en: extra.name_en,
        });
      }

      const orderRemoved: any[] = [];
      for (const removedId of item.removedIngredientIds) {
        const removed = removedMap.get(removedId);
        if (!removed) {
          return NextResponse.json({ error: "Ingredient not found" }, { status: 400 });
        }
        orderRemoved.push({
          ingredient_id: removed.id,
          name_bg: removed.name_bg,
          name_en: removed.name_en,
        });
      }

      const itemTotal = (unitPrice + extrasTotal) * item.quantity;
      subtotal += itemTotal;

      const destination = categoryMap.get(menuItem.category_id) || "kitchen";

      orderItems.push({
        menu_item_id: item.menuItemId,
        variant_id: item.variantId,
        quantity: item.quantity,
        unit_price: unitPrice,
        item_total: itemTotal,
        note: item.note,
        destination,
        item_name_bg: menuItem.name_bg,
        item_name_en: menuItem.name_en,
        variant_name_bg: variantNameBg,
        variant_name_en: variantNameEn,
        extras: orderExtras,
        removed: orderRemoved,
      });
    }

    const serviceFee = Math.round((subtotal * serviceFeePercent / 100 + serviceFeeFixed) * 100) / 100;

    let tipAmount = 0;
    if (data.tipCustomAmount && data.tipCustomAmount > 0) {
      tipAmount = data.tipCustomAmount;
    } else if (data.tipPercent && data.tipPercent > 0) {
      tipAmount = Math.round((subtotal * data.tipPercent / 100) * 100) / 100;
    }

    const total = Math.round((subtotal + serviceFee + tipAmount) * 100) / 100;

    // 7. Create order
    const { data: order, error: orderErr } = await supabase
      .from("orders")
      .insert([{
        restaurant_id: restaurantId,
        table_id: (table as any).id,
        status: "new",
        general_note: data.generalNote,
        subtotal,
        service_fee: serviceFee,
        tip_amount: tipAmount,
        tip_percent: data.tipPercent,
        total,
        payment_status: "simulated_paid",
        payment_method: "simulated",
        customer_session_id: data.customerSessionId,
      }] as any)
      .select("id")
      .single();

    if (orderErr || !order) {
      console.error("Order creation error:", orderErr);
      return NextResponse.json({ error: "Failed to create order" }, { status: 500 });
    }

    const orderId = (order as any).id;

    // 8. Create order items
    for (const oi of orderItems) {
      const { extras, removed, ...itemData } = oi;
      const { data: orderItem, error: oiErr } = await supabase
        .from("order_items")
        .insert([{ ...itemData, order_id: orderId }] as any)
        .select("id")
        .single();

      if (oiErr || !orderItem) {
        console.error("Order item creation error:", oiErr);
        continue;
      }

      const orderItemId = (orderItem as any).id;

      // Insert extras
      if (extras.length > 0) {
        await supabase
          .from("order_item_extras")
          .insert(extras.map((e: any) => ({ ...e, order_item_id: orderItemId })) as any);
      }

      // Insert removed ingredients
      if (removed.length > 0) {
        await supabase
          .from("order_item_removed_ingredients")
          .insert(removed.map((r: any) => ({ ...r, order_item_id: orderItemId })) as any);
      }
    }

    // 9. Create payment record
    await supabase.from("payments").insert([{
      order_id: orderId,
      amount: total,
      method: "simulated",
      status: "simulated_paid",
    }] as any);

    return NextResponse.json({ orderId, total });
  } catch (err) {
    console.error("Payment simulation error:", err);
    if (err instanceof z.ZodError) {
      return NextResponse.json({ error: "Invalid order data", details: err.issues }, { status: 400 });
    }
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
