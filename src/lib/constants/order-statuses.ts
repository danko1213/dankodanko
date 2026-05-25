import type { OrderStatus } from "@/lib/types/database";

export const ORDER_STATUS_LABELS: Record<OrderStatus, { bg: string; en: string }> = {
  new: { bg: "Нова", en: "New" },
  preparing: { bg: "Приготвя се", en: "Preparing" },
  ready: { bg: "Готова", en: "Ready" },
  served: { bg: "Сервирана", en: "Served" },
  completed: { bg: "Завършена", en: "Completed" },
  cancelled: { bg: "Отказана", en: "Cancelled" },
};

export const ORDER_STATUS_COLORS: Record<OrderStatus, string> = {
  new: "bg-blue-500",
  preparing: "bg-yellow-500",
  ready: "bg-green-500",
  served: "bg-purple-500",
  completed: "bg-gray-500",
  cancelled: "bg-red-500",
};

export const ORDER_STATUS_TRANSITIONS: Record<OrderStatus, OrderStatus[]> = {
  new: ["preparing", "cancelled"],
  preparing: ["ready", "cancelled"],
  ready: ["served", "cancelled"],
  served: ["completed"],
  completed: [],
  cancelled: [],
};
