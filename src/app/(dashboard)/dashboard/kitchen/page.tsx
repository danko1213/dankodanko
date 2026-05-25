"use client";

import { useCallback, useRef, useState } from "react";
import { Loader2, ChefHat, Wifi, WifiOff, Volume2, VolumeX } from "lucide-react";
import { OrderCard } from "@/components/dashboard/order-card";
import { useRestaurant } from "@/lib/hooks/use-restaurant";
import { useRealtimeOrders } from "@/lib/hooks/use-realtime-orders";

export default function KitchenPage() {
  const { restaurantId, loading: restaurantLoading } = useRestaurant();
  const [soundEnabled, setSoundEnabled] = useState(true);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const playSound = useCallback(() => {
    if (!soundEnabled) return;
    try {
      if (!audioRef.current) {
        audioRef.current = new Audio("data:audio/wav;base64,UklGRnoGAABXQVZFZm10IBAAAAABAAEAQB8AAEAfAAABAAgAZGF0YQoGAACBhYqFbF1fdJivrJBhNjVgj6yjlGY/OGSQr6qYbUU7Y4+sqZZrRjtijq2ommxGO2KOrKiabEc7Yo2rp5lsRztijaummmtIO2GNq6eZbEc7YY2rpplsRzthjauomWxHO2GNq6aZbEg7YI6rqJltSDtgjqupmmxHPGCPrKiZbEg8YI+sqJluSDxfkKyomm5IPV+QrKecb0c7YI+sqJluSDxfkKyomm5IPV+QrKecb0c7YI+sqJluSDxfkKyomW5JPGCQ");
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
  } = useRealtimeOrders({
    restaurantId: restaurantId || "",
    onNewOrder: playSound,
  });

  if (restaurantLoading || !restaurantId) {
    return (
      <div className="flex h-64 items-center justify-center">
        <Loader2 className="h-6 w-6 animate-spin text-amber-900" />
      </div>
    );
  }

  const kitchenOrders = orders
    .filter((o) => !["completed", "cancelled"].includes(o.status))
    .filter((o) => o.items.some((i) => i.destination === "kitchen"));

  return (
    <div className="p-4">
      <div className="mb-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <ChefHat className="h-6 w-6 text-amber-900" />
          <h1 className="text-xl font-bold text-gray-900">Кухня</h1>
          <span className="rounded-full bg-amber-100 px-2 py-0.5 text-xs font-bold text-amber-900">
            {kitchenOrders.length}
          </span>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={() => setSoundEnabled(!soundEnabled)}
            className="rounded-full p-2 hover:bg-gray-100"
          >
            {soundEnabled ? (
              <Volume2 className="h-5 w-5 text-gray-600" />
            ) : (
              <VolumeX className="h-5 w-5 text-gray-400" />
            )}
          </button>
          {isConnected ? (
            <Wifi className="h-4 w-4 text-green-500" />
          ) : (
            <WifiOff className="h-4 w-4 text-red-500" />
          )}
        </div>
      </div>

      {ordersLoading ? (
        <div className="flex h-32 items-center justify-center">
          <Loader2 className="h-6 w-6 animate-spin text-amber-900" />
        </div>
      ) : kitchenOrders.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-16 text-center">
          <ChefHat className="h-12 w-12 text-gray-300" />
          <p className="mt-3 text-lg text-gray-400">Няма поръчки за кухнята</p>
        </div>
      ) : (
        <div className="space-y-3">
          {kitchenOrders.map((order) => (
            <OrderCard
              key={order.id}
              order={order}
              onUpdateStatus={updateOrderStatus}
              onPayCash={markPayCash}
              filterDestination="kitchen"
            />
          ))}
        </div>
      )}
    </div>
  );
}
