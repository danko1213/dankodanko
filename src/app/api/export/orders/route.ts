import { NextResponse } from "next/server";
import { createAdminClient } from "@/lib/supabase/admin";
import * as XLSX from "xlsx";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const restaurantId = searchParams.get("restaurantId");
    const from = searchParams.get("from");
    const to = searchParams.get("to");

    if (!restaurantId) {
      return NextResponse.json({ error: "Missing restaurantId" }, { status: 400 });
    }

    const supabase = createAdminClient();

    let query = supabase
      .from("orders")
      .select("id, order_number, status, payment_status, subtotal, service_fee, tip_amount, total, general_note, created_at, table_id")
      .eq("restaurant_id", restaurantId)
      .order("created_at", { ascending: false });

    if (from) query = query.gte("created_at", `${from}T00:00:00`);
    if (to) query = query.lte("created_at", `${to}T23:59:59`);

    const { data: orders } = await query;
    if (!orders || orders.length === 0) {
      return NextResponse.json({ error: "No orders found" }, { status: 404 });
    }

    // Fetch table numbers
    const tableIds = [...new Set((orders as any[]).map((o) => o.table_id))];
    const { data: tables } = await supabase.from("tables").select("id, table_number").in("id", tableIds);
    const tableMap = new Map(((tables || []) as any[]).map((t) => [t.id, t.table_number]));

    // Fetch all order items
    const orderIds = (orders as any[]).map((o) => o.id);
    const { data: allItems } = await supabase
      .from("order_items")
      .select("order_id, item_name_bg, variant_name_bg, quantity, unit_price, item_total, note")
      .in("order_id", orderIds);

    const itemsByOrder = new Map<string, any[]>();
    for (const item of (allItems || []) as any[]) {
      const list = itemsByOrder.get(item.order_id) || [];
      list.push(item);
      itemsByOrder.set(item.order_id, list);
    }

    const statusLabels: Record<string, string> = {
      new: "Нова", preparing: "Приготвя се", ready: "Готова",
      served: "Сервирана", completed: "Завършена", cancelled: "Отказана",
    };

    const paymentLabels: Record<string, string> = {
      pending: "Очаква", simulated_paid: "Платено (тест)",
      paid_online: "Онлайн", pay_cash: "В брой", failed: "Неуспешно",
    };

    // Build rows
    const rows: any[] = [];
    for (const order of orders as any[]) {
      const items = itemsByOrder.get(order.id) || [];
      const itemsStr = items.map((i: any) =>
        `${i.quantity}x ${i.item_name_bg}${i.variant_name_bg ? ` (${i.variant_name_bg})` : ""}`
      ).join("; ");

      rows.push({
        "Поръчка №": order.order_number,
        "Маса": tableMap.get(order.table_id) || "?",
        "Статус": statusLabels[order.status] || order.status,
        "Плащане": paymentLabels[order.payment_status] || order.payment_status,
        "Продукти": itemsStr,
        "Междинна сума (€)": Number(order.subtotal).toFixed(2),
        "Такса (€)": Number(order.service_fee).toFixed(2),
        "Бакшиш (€)": Number(order.tip_amount).toFixed(2),
        "Общо (€)": Number(order.total).toFixed(2),
        "Бележка": order.general_note || "",
        "Дата": new Date(order.created_at).toLocaleString("bg-BG"),
      });
    }

    const wb = XLSX.utils.book_new();
    const ws = XLSX.utils.json_to_sheet(rows);

    // Set column widths
    ws["!cols"] = [
      { wch: 10 }, { wch: 8 }, { wch: 14 }, { wch: 16 },
      { wch: 50 }, { wch: 14 }, { wch: 10 }, { wch: 12 },
      { wch: 12 }, { wch: 30 }, { wch: 20 },
    ];

    XLSX.utils.book_append_sheet(wb, ws, "Поръчки");

    const buffer = XLSX.write(wb, { type: "buffer", bookType: "xlsx" });

    return new NextResponse(buffer, {
      headers: {
        "Content-Type": "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
        "Content-Disposition": `attachment; filename="masapay-orders.xlsx"`,
      },
    });
  } catch (err) {
    console.error("Export error:", err);
    return NextResponse.json({ error: "Export failed" }, { status: 500 });
  }
}
