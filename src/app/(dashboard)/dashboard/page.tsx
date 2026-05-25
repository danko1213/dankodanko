"use client";

import { useCallback, useRef, useEffect, useState } from "react";
import { Loader2, Wifi, WifiOff, Volume2, VolumeX, RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { OrderCard } from "@/components/dashboard/order-card";
import { useRestaurant } from "@/lib/hooks/use-restaurant";
import { useRealtimeOrders } from "@/lib/hooks/use-realtime-orders";
import type { TableGroup, DailySummary } from "@/lib/types/order";

export default function OrdersPage() {
  const { restaurantId, restaurantName, loading: restaurantLoading } = useRestaurant();
  const [soundEnabled, setSoundEnabled] = useState(true);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const playSound = useCallback(() => {
    if (!soundEnabled) return;
    try {
      if (!audioRef.current) {
        audioRef.current = new Audio("/sounds/new-order.mp3");
      }
      audioRef.current.currentTime = 0;
      audioRef.current.play().catch(() => {});
    } catch {}
  }, [soundEnabled]);

  const {
    orders,
    loading: ordersLoading,
    isConnected,
    updateOrderStatus,
    markPayCash,
    refetch,
  } = useRealtimeOrders({
    restaurantId: restaurantId || "",
    onNewOrder: playSound,
  });

  // Generate notification sound if file doesn't exist
  useEffect(() => {
    audioRef.current = new Audio("data:audio/wav;base64,UklGRnoGAABXQVZFZm10IBAAAAABAAEAQB8AAEAfAAABAAgAZGF0YQoGAACBhYqFbF1fdJivrJBhNjVgj6yjlGY/OGSQr6qYbUU7Y4+sqZZrRjtijq2ommxGO2KOrKiabEc7Yo2rp5lsRztijaummmtIO2GNq6eZbEc7YY2rpplsRzthjauomWxHO2GNq6aZbEg7YI6rqJltSDtgjqupmmxHPGCPrKiZbEg8YI+sqJluSDxfkKyomm5IPV+QrKecb0c7YI+sqJluSDxfkKyomm5IPV+QrKecb0c7YI+sqJluSDxfkKyomW5JPGCQ");
  }, []);

  if (restaurantLoading || !restaurantId) {
    return (
      <div className="flex h-64 items-center justify-center">
        <Loader2 className="h-6 w-6 animate-spin text-amber-900" />
      </div>
    );
  }

  // Group orders by table
  const tableGroups: TableGroup[] = [];
  const tableMap = new Map<string, TableGroup>();

  for (const order of orders) {
    let group = tableMap.get(order.table_id);
    if (!group) {
      group = { tableId: order.table_id, tableNumber: order.table_number || "?", orders: [] };
      tableMap.set(order.table_id, group);
      tableGroups.push(group);
    }
    group.orders.push(order);
  }

  // Daily summary
  const activeOrders = orders.filter((o) => o.status !== "cancelled");
  const summary: DailySummary = {
    totalOrders: activeOrders.length,
    totalRevenue: activeOrders.reduce((s, o) => s + o.total, 0),
    totalTips: activeOrders.reduce((s, o) => s + o.tip_amount, 0),
    averageOrder: activeOrders.length > 0
      ? activeOrders.reduce((s, o) => s + o.total, 0) / activeOrders.length
      : 0,
  };

  const activeTableGroups = tableGroups.filter((g) =>
    g.orders.some((o) => !["completed", "cancelled"].includes(o.status))
  );

  const completedOrders = orders.filter((o) => ["completed", "cancelled"].includes(o.status));

  return (
    <div className="p-4">
      {/* Header */}
      <div className="mb-4 flex items-center justify-between">
        <div>
          <h1 className="text-xl font-bold text-gray-900">Поръчки</h1>
          <p className="text-xs text-gray-500">{restaurantName}</p>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={() => setSoundEnabled(!soundEnabled)}
            className="rounded-full p-2 hover:bg-gray-100"
            title={soundEnabled ? "Изключи звук" : "Включи звук"}
          >
            {soundEnabled ? (
              <Volume2 className="h-5 w-5 text-gray-600" />
            ) : (
              <VolumeX className="h-5 w-5 text-gray-400" />
            )}
          </button>
          <button
            onClick={refetch}
            className="rounded-full p-2 hover:bg-gray-100"
            title="Обнови"
          >
            <RefreshCw className="h-5 w-5 text-gray-600" />
          </button>
          <div className="flex items-center gap-1" title={isConnected ? "Свързан" : "Изключен"}>
            {isConnected ? (
              <Wifi className="h-4 w-4 text-green-500" />
            ) : (
              <WifiOff className="h-4 w-4 text-red-500" />
            )}
          </div>
        </div>
      </div>

      {/* Daily summary */}
      <div className="mb-4 grid grid-cols-2 gap-2">
        <div className="rounded-xl bg-white p-3 shadow-sm">
          <p className="text-xs text-gray-500">Поръчки</p>
          <p className="text-2xl font-bold text-gray-900">{summary.totalOrders}</p>
        </div>
        <div className="rounded-xl bg-white p-3 shadow-sm">
          <p className="text-xs text-gray-500">Приходи</p>
          <p className="text-2xl font-bold text-amber-900">{summary.totalRevenue.toFixed(2)} €</p>
        </div>
        <div className="rounded-xl bg-white p-3 shadow-sm">
          <p className="text-xs text-gray-500">Бакшиши</p>
          <p className="text-2xl font-bold text-gray-900">{summary.totalTips.toFixed(2)} €</p>
        </div>
        <div className="rounded-xl bg-white p-3 shadow-sm">
          <p className="text-xs text-gray-500">Средна поръчка</p>
          <p className="text-2xl font-bold text-gray-900">{summary.averageOrder.toFixed(2)} €</p>
        </div>
      </div>

      {ordersLoading ? (
        <div className="flex h-32 items-center justify-center">
          <Loader2 className="h-6 w-6 animate-spin text-amber-900" />
        </div>
      ) : activeTableGroups.length === 0 && completedOrders.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-16 text-center">
          <p className="text-lg text-gray-400">Няма поръчки</p>
          <p className="mt-1 text-sm text-gray-400">Новите поръчки ще се появят тук автоматично</p>
        </div>
      ) : (
        <div className="space-y-6">
          {/* Active orders grouped by table */}
          {activeTableGroups.map((group) => (
            <div key={group.tableId}>
              <h2 className="mb-2 text-sm font-semibold text-gray-500">
                Маса {group.tableNumber}
              </h2>
              <div className="space-y-3">
                {group.orders
                  .filter((o) => !["completed", "cancelled"].includes(o.status))
                  .map((order) => (
                    <OrderCard
                      key={order.id}
                      order={order}
                      onUpdateStatus={updateOrderStatus}
                      onPayCash={markPayCash}
                    />
                  ))}
              </div>
            </div>
          ))}

          {/* Completed orders */}
          {completedOrders.length > 0 && (
            <div>
              <h2 className="mb-2 text-sm font-semibold text-gray-400">
                Завършени ({completedOrders.length})
              </h2>
              <div className="space-y-3 opacity-60">
                {completedOrders.slice(0, 5).map((order) => (
                  <OrderCard
                    key={order.id}
                    order={order}
                    onUpdateStatus={updateOrderStatus}
                    onPayCash={markPayCash}
                  />
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
