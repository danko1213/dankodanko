"use client";

import { useEffect, useState, useMemo } from "react";
import { Loader2, Download, TrendingUp, ShoppingBag, Banknote, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useRestaurant } from "@/lib/hooks/use-restaurant";
import { createClient } from "@/lib/supabase/client";
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  LineChart, Line,
} from "recharts";

interface OrderRow {
  id: string;
  order_number: number;
  status: string;
  subtotal: number;
  tip_amount: number;
  total: number;
  created_at: string;
}

interface OrderItemRow {
  item_name_bg: string;
  quantity: number;
  item_total: number;
}

export default function AnalyticsPage() {
  const { restaurantId, loading: rLoading } = useRestaurant();
  const [orders, setOrders] = useState<OrderRow[]>([]);
  const [topItems, setTopItems] = useState<{ name: string; count: number; revenue: number }[]>([]);
  const [loading, setLoading] = useState(true);
  const [dateFrom, setDateFrom] = useState(() => {
    const d = new Date(); d.setDate(d.getDate() - 30);
    return d.toISOString().split("T")[0];
  });
  const [dateTo, setDateTo] = useState(() => new Date().toISOString().split("T")[0]);
  const [exporting, setExporting] = useState(false);

  useEffect(() => {
    if (!restaurantId) return;
    loadData();
  }, [restaurantId, dateFrom, dateTo]);

  async function loadData() {
    setLoading(true);
    const supabase = createClient();

    const { data: ordersData } = await supabase
      .from("orders")
      .select("id, order_number, status, subtotal, tip_amount, total, created_at")
      .eq("restaurant_id", restaurantId!)
      .gte("created_at", `${dateFrom}T00:00:00`)
      .lte("created_at", `${dateTo}T23:59:59`)
      .order("created_at", { ascending: false });

    const rows = ((ordersData || []) as any[]).map((o) => ({
      ...o,
      subtotal: Number(o.subtotal),
      tip_amount: Number(o.tip_amount),
      total: Number(o.total),
    }));
    setOrders(rows);

    // Top items
    const orderIds = rows.filter((o) => o.status !== "cancelled").map((o) => o.id);
    if (orderIds.length > 0) {
      const { data: items } = await supabase
        .from("order_items")
        .select("item_name_bg, quantity, item_total")
        .in("order_id", orderIds);

      const itemMap = new Map<string, { count: number; revenue: number }>();
      for (const item of (items || []) as OrderItemRow[]) {
        const existing = itemMap.get(item.item_name_bg) || { count: 0, revenue: 0 };
        existing.count += item.quantity;
        existing.revenue += Number(item.item_total);
        itemMap.set(item.item_name_bg, existing);
      }

      const sorted = Array.from(itemMap.entries())
        .map(([name, data]) => ({ name, ...data }))
        .sort((a, b) => b.count - a.count)
        .slice(0, 10);
      setTopItems(sorted);
    } else {
      setTopItems([]);
    }

    setLoading(false);
  }

  const activeOrders = useMemo(() => orders.filter((o) => o.status !== "cancelled"), [orders]);

  const stats = useMemo(() => ({
    totalOrders: activeOrders.length,
    totalRevenue: activeOrders.reduce((s, o) => s + o.total, 0),
    totalTips: activeOrders.reduce((s, o) => s + o.tip_amount, 0),
    avgOrder: activeOrders.length > 0 ? activeOrders.reduce((s, o) => s + o.total, 0) / activeOrders.length : 0,
  }), [activeOrders]);

  // Revenue by day chart data
  const revenueByDay = useMemo(() => {
    const map = new Map<string, number>();
    for (const o of activeOrders) {
      const day = o.created_at.split("T")[0];
      map.set(day, (map.get(day) || 0) + o.total);
    }
    return Array.from(map.entries())
      .map(([date, revenue]) => ({ date: date.slice(5), revenue: Math.round(revenue * 100) / 100 }))
      .sort((a, b) => a.date.localeCompare(b.date));
  }, [activeOrders]);

  // Orders by hour
  const ordersByHour = useMemo(() => {
    const counts = new Array(24).fill(0);
    for (const o of activeOrders) {
      const hour = new Date(o.created_at).getHours();
      counts[hour]++;
    }
    return counts.map((count, hour) => ({ hour: `${hour}:00`, count })).filter((_, i) => i >= 8 && i <= 23);
  }, [activeOrders]);

  async function handleExport() {
    setExporting(true);
    try {
      const res = await fetch(`/api/export/orders?restaurantId=${restaurantId}&from=${dateFrom}&to=${dateTo}`);
      if (!res.ok) throw new Error();
      const blob = await res.blob();
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `masapay-orders-${dateFrom}-${dateTo}.xlsx`;
      a.click();
      URL.revokeObjectURL(url);
    } catch {
      alert("Грешка при експортиране");
    }
    setExporting(false);
  }

  if (rLoading || !restaurantId) {
    return <div className="flex h-64 items-center justify-center"><Loader2 className="h-6 w-6 animate-spin text-amber-900" /></div>;
  }

  return (
    <div className="p-4 pb-24">
      <div className="mb-4 flex items-center justify-between">
        <h1 className="text-xl font-bold text-gray-900">Статистика</h1>
        <Button size="sm" variant="outline" onClick={handleExport} disabled={exporting}>
          <Download className="mr-1 h-4 w-4" /> {exporting ? "..." : "Excel"}
        </Button>
      </div>

      {/* Date range */}
      <div className="mb-4 flex items-center gap-2">
        <Input type="date" value={dateFrom} onChange={(e) => setDateFrom(e.target.value)} className="w-36" />
        <span className="text-gray-400">—</span>
        <Input type="date" value={dateTo} onChange={(e) => setDateTo(e.target.value)} className="w-36" />
      </div>

      {loading ? (
        <div className="flex h-32 items-center justify-center"><Loader2 className="h-6 w-6 animate-spin text-amber-900" /></div>
      ) : (
        <div className="space-y-4">
          {/* Summary cards */}
          <div className="grid grid-cols-2 gap-2">
            <div className="rounded-xl bg-white p-3 shadow-sm">
              <div className="flex items-center gap-2 text-xs text-gray-500"><ShoppingBag className="h-3.5 w-3.5" /> Поръчки</div>
              <p className="mt-1 text-2xl font-bold text-gray-900">{stats.totalOrders}</p>
            </div>
            <div className="rounded-xl bg-white p-3 shadow-sm">
              <div className="flex items-center gap-2 text-xs text-gray-500"><TrendingUp className="h-3.5 w-3.5" /> Приходи</div>
              <p className="mt-1 text-2xl font-bold text-amber-900">{stats.totalRevenue.toFixed(2)} €</p>
            </div>
            <div className="rounded-xl bg-white p-3 shadow-sm">
              <div className="flex items-center gap-2 text-xs text-gray-500"><Banknote className="h-3.5 w-3.5" /> Бакшиши</div>
              <p className="mt-1 text-2xl font-bold text-gray-900">{stats.totalTips.toFixed(2)} €</p>
            </div>
            <div className="rounded-xl bg-white p-3 shadow-sm">
              <div className="flex items-center gap-2 text-xs text-gray-500"><Star className="h-3.5 w-3.5" /> Средна поръчка</div>
              <p className="mt-1 text-2xl font-bold text-gray-900">{stats.avgOrder.toFixed(2)} €</p>
            </div>
          </div>

          {/* Revenue chart */}
          {revenueByDay.length > 1 && (
            <div className="rounded-xl bg-white p-4 shadow-sm">
              <h2 className="mb-3 text-sm font-semibold text-gray-700">Приходи по дни</h2>
              <ResponsiveContainer width="100%" height={200}>
                <LineChart data={revenueByDay}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="date" tick={{ fontSize: 10 }} />
                  <YAxis tick={{ fontSize: 10 }} />
                  <Tooltip formatter={(v) => `${Number(v).toFixed(2)} €`} />
                  <Line type="monotone" dataKey="revenue" stroke="#78350f" strokeWidth={2} dot={false} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          )}

          {/* Orders by hour */}
          {ordersByHour.some((h) => h.count > 0) && (
            <div className="rounded-xl bg-white p-4 shadow-sm">
              <h2 className="mb-3 text-sm font-semibold text-gray-700">Поръчки по час</h2>
              <ResponsiveContainer width="100%" height={180}>
                <BarChart data={ordersByHour}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="hour" tick={{ fontSize: 10 }} />
                  <YAxis allowDecimals={false} tick={{ fontSize: 10 }} />
                  <Tooltip />
                  <Bar dataKey="count" fill="#78350f" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          )}

          {/* Popular items */}
          {topItems.length > 0 && (
            <div className="rounded-xl bg-white p-4 shadow-sm">
              <h2 className="mb-3 text-sm font-semibold text-gray-700">Популярни продукти</h2>
              <div className="space-y-2">
                {topItems.map((item, i) => (
                  <div key={item.name} className="flex items-center gap-3">
                    <span className="flex h-6 w-6 items-center justify-center rounded-full bg-amber-100 text-xs font-bold text-amber-900">
                      {i + 1}
                    </span>
                    <span className="flex-1 truncate text-sm text-gray-900">{item.name}</span>
                    <span className="text-xs text-gray-500">{item.count}x</span>
                    <span className="text-sm font-medium text-amber-900">{item.revenue.toFixed(2)} €</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeOrders.length === 0 && (
            <div className="py-12 text-center text-gray-400">Няма данни за избрания период.</div>
          )}
        </div>
      )}
    </div>
  );
}
