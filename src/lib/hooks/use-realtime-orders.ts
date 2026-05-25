"use client";

import { useEffect, useState, useCallback, useRef } from "react";
import { createClient } from "@/lib/supabase/client";
import type { Order, OrderItem, OrderItemExtra, OrderItemRemoved } from "@/lib/types/order";
import type { OrderStatus, PaymentStatus } from "@/lib/types/database";

interface UseRealtimeOrdersOptions {
  restaurantId: string;
  onNewOrder?: () => void;
}

export function useRealtimeOrders({ restaurantId, onNewOrder }: UseRealtimeOrdersOptions) {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [isConnected, setIsConnected] = useState(false);
  const supabaseRef = useRef(createClient());
  const knownOrderIds = useRef(new Set<string>());

  const fetchOrderItems = useCallback(async (orderId: string): Promise<OrderItem[]> => {
    const supabase = supabaseRef.current;

    const { data: itemsData } = await supabase
      .from("order_items")
      .select("*")
      .eq("order_id", orderId);

    if (!itemsData || itemsData.length === 0) return [];

    const itemIds = itemsData.map((i: any) => i.id);

    const [extrasRes, removedRes] = await Promise.all([
      supabase.from("order_item_extras").select("*").in("order_item_id", itemIds),
      supabase.from("order_item_removed_ingredients").select("*").in("order_item_id", itemIds),
    ]);

    const extrasMap = new Map<string, OrderItemExtra[]>();
    for (const e of (extrasRes.data || []) as any[]) {
      const list = extrasMap.get(e.order_item_id) || [];
      list.push({ id: e.id, name_bg: e.name_bg, name_en: e.name_en, price: Number(e.price) });
      extrasMap.set(e.order_item_id, list);
    }

    const removedMap = new Map<string, OrderItemRemoved[]>();
    for (const r of (removedRes.data || []) as any[]) {
      const list = removedMap.get(r.order_item_id) || [];
      list.push({ id: r.id, name_bg: r.name_bg, name_en: r.name_en });
      removedMap.set(r.order_item_id, list);
    }

    return itemsData.map((item: any) => ({
      ...item,
      unit_price: Number(item.unit_price),
      item_total: Number(item.item_total),
      extras: extrasMap.get(item.id) || [],
      removedIngredients: removedMap.get(item.id) || [],
    }));
  }, []);

  const fetchOrders = useCallback(async () => {
    const supabase = supabaseRef.current;
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const { data: ordersData } = await supabase
      .from("orders")
      .select("*")
      .eq("restaurant_id", restaurantId)
      .gte("created_at", today.toISOString())
      .order("created_at", { ascending: false });

    if (!ordersData) {
      setLoading(false);
      return;
    }

    // Fetch table numbers
    const tableIds = [...new Set(ordersData.map((o: any) => o.table_id))];
    const { data: tables } = await supabase
      .from("tables")
      .select("id, table_number")
      .in("id", tableIds);

    const tableMap = new Map((tables || []).map((t: any) => [t.id, t.table_number]));

    // Fetch all items for all orders
    const allOrders: Order[] = await Promise.all(
      ordersData.map(async (o: any) => {
        const items = await fetchOrderItems(o.id);
        knownOrderIds.current.add(o.id);
        return {
          ...o,
          subtotal: Number(o.subtotal),
          service_fee: Number(o.service_fee),
          tip_amount: Number(o.tip_amount),
          tip_percent: o.tip_percent ? Number(o.tip_percent) : null,
          total: Number(o.total),
          table_number: tableMap.get(o.table_id) || "?",
          items,
        };
      })
    );

    setOrders(allOrders);
    setLoading(false);
  }, [restaurantId, fetchOrderItems]);

  // Update order status
  const updateOrderStatus = useCallback(async (orderId: string, status: OrderStatus) => {
    const supabase = supabaseRef.current as any;
    await supabase.from("orders").update({ status }).eq("id", orderId);

    setOrders((prev) =>
      prev.map((o) => (o.id === orderId ? { ...o, status } : o))
    );
  }, []);

  // Mark as pay cash
  const markPayCash = useCallback(async (orderId: string) => {
    const supabase = supabaseRef.current as any;
    await supabase.from("orders").update({ payment_status: "pay_cash", payment_method: "cash" }).eq("id", orderId);

    setOrders((prev) =>
      prev.map((o) =>
        o.id === orderId
          ? { ...o, payment_status: "pay_cash" as PaymentStatus, payment_method: "cash" as const }
          : o
      )
    );
  }, []);

  // Initial fetch
  useEffect(() => {
    fetchOrders();
  }, [fetchOrders]);

  // Realtime subscription
  useEffect(() => {
    const supabase = supabaseRef.current;

    const channel = supabase
      .channel(`orders-${restaurantId}`)
      .on(
        "postgres_changes",
        {
          event: "INSERT",
          schema: "public",
          table: "orders",
          filter: `restaurant_id=eq.${restaurantId}`,
        },
        async (payload) => {
          const newOrder = payload.new as any;
          const items = await fetchOrderItems(newOrder.id);

          const { data: tableData } = await supabase
            .from("tables")
            .select("table_number")
            .eq("id", newOrder.table_id)
            .single();

          const order: Order = {
            ...newOrder,
            subtotal: Number(newOrder.subtotal),
            service_fee: Number(newOrder.service_fee),
            tip_amount: Number(newOrder.tip_amount),
            tip_percent: newOrder.tip_percent ? Number(newOrder.tip_percent) : null,
            total: Number(newOrder.total),
            table_number: (tableData as any)?.table_number || "?",
            items,
          };

          if (!knownOrderIds.current.has(newOrder.id)) {
            knownOrderIds.current.add(newOrder.id);
            setOrders((prev) => [order, ...prev]);
            onNewOrder?.();
          }
        }
      )
      .on(
        "postgres_changes",
        {
          event: "UPDATE",
          schema: "public",
          table: "orders",
          filter: `restaurant_id=eq.${restaurantId}`,
        },
        (payload) => {
          const updated = payload.new as any;
          setOrders((prev) =>
            prev.map((o) =>
              o.id === updated.id
                ? {
                    ...o,
                    status: updated.status,
                    payment_status: updated.payment_status,
                    payment_method: updated.payment_method,
                    updated_at: updated.updated_at,
                  }
                : o
            )
          );
        }
      )
      .subscribe((status) => {
        setIsConnected(status === "SUBSCRIBED");
      });

    return () => {
      supabase.removeChannel(channel);
    };
  }, [restaurantId, fetchOrderItems, onNewOrder]);

  return {
    orders,
    loading,
    isConnected,
    updateOrderStatus,
    markPayCash,
    refetch: fetchOrders,
  };
}
