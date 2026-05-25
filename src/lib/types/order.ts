import type { OrderStatus, PaymentStatus, PaymentMethod, OrderItemDestination } from "./database";

export interface OrderItemExtra {
  id: string;
  name_bg: string;
  name_en: string | null;
  price: number;
}

export interface OrderItemRemoved {
  id: string;
  name_bg: string;
  name_en: string | null;
}

export interface OrderItem {
  id: string;
  order_id: string;
  menu_item_id: string;
  variant_id: string | null;
  quantity: number;
  unit_price: number;
  item_total: number;
  note: string | null;
  destination: OrderItemDestination;
  item_name_bg: string;
  item_name_en: string | null;
  variant_name_bg: string | null;
  variant_name_en: string | null;
  extras: OrderItemExtra[];
  removedIngredients: OrderItemRemoved[];
}

export interface Order {
  id: string;
  restaurant_id: string;
  table_id: string;
  order_number: number;
  status: OrderStatus;
  general_note: string | null;
  subtotal: number;
  service_fee: number;
  tip_amount: number;
  tip_percent: number | null;
  total: number;
  payment_status: PaymentStatus;
  payment_method: PaymentMethod | null;
  customer_session_id: string | null;
  created_at: string;
  updated_at: string;
  table_number?: string;
  items: OrderItem[];
}

export interface TableGroup {
  tableId: string;
  tableNumber: string;
  orders: Order[];
}

export interface DailySummary {
  totalOrders: number;
  totalRevenue: number;
  totalTips: number;
  averageOrder: number;
}
