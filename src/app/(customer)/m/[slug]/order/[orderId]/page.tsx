import { notFound } from "next/navigation";
import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import { CheckCircle, ArrowLeft, RotateCcw } from "lucide-react";

const STATUS_LABELS: Record<string, { bg: string; color: string }> = {
  new: { bg: "Приета", color: "bg-blue-100 text-blue-700" },
  preparing: { bg: "Приготвя се", color: "bg-yellow-100 text-yellow-700" },
  ready: { bg: "Готова", color: "bg-green-100 text-green-700" },
  served: { bg: "Сервирана", color: "bg-purple-100 text-purple-700" },
  completed: { bg: "Завършена", color: "bg-gray-100 text-gray-700" },
  cancelled: { bg: "Отказана", color: "bg-red-100 text-red-700" },
};

export default async function OrderConfirmationPage({
  params,
}: {
  params: Promise<{ slug: string; orderId: string }>;
}) {
  const { slug, orderId } = await params;
  const supabase = await createClient();

  const { data: orderData } = await supabase
    .from("orders")
    .select("id, order_number, status, subtotal, service_fee, tip_amount, total, created_at")
    .eq("id", orderId)
    .single();

  const order = orderData as {
    id: string;
    order_number: number;
    status: string;
    subtotal: number;
    service_fee: number;
    tip_amount: number;
    total: number;
    created_at: string;
  } | null;

  if (!order) notFound();

  const { data: itemsData } = await supabase
    .from("order_items")
    .select("id, item_name_bg, variant_name_bg, quantity, item_total, note")
    .eq("order_id", orderId);

  const items = (itemsData || []) as Array<{
    id: string;
    item_name_bg: string;
    variant_name_bg: string | null;
    quantity: number;
    item_total: number;
    note: string | null;
  }>;

  const statusInfo = STATUS_LABELS[order.status] || STATUS_LABELS.new;

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="mx-auto max-w-md bg-white pb-8">
        {/* Header */}
        <div className="flex items-center gap-3 px-4 py-3">
          <Link href={`/m/${slug}`} className="rounded-full p-1 hover:bg-gray-100">
            <ArrowLeft className="h-5 w-5" />
          </Link>
          <span className="text-sm text-gray-500">Поръчка #{order.order_number}</span>
        </div>

        {/* Success */}
        <div className="flex flex-col items-center px-4 py-8 text-center">
          <div className="flex h-16 w-16 items-center justify-center rounded-full bg-green-100">
            <CheckCircle className="h-8 w-8 text-green-600" />
          </div>
          <h1 className="mt-4 text-2xl font-bold text-gray-900">Поръчката е приета!</h1>
          <p className="mt-2 text-gray-500">
            Вашата поръчка е изпратена към кухнята.
          </p>
          <span className={`mt-3 inline-block rounded-full px-4 py-1.5 text-sm font-medium ${statusInfo.color}`}>
            {statusInfo.bg}
          </span>
        </div>

        {/* Items */}
        <div className="border-t px-4 py-4">
          <h2 className="text-sm font-semibold text-gray-900">Продукти</h2>
          <div className="mt-2 space-y-2">
            {items.map((item) => (
              <div key={item.id} className="flex justify-between text-sm">
                <div>
                  <span className="text-gray-500">{item.quantity}x </span>
                  <span>{item.item_name_bg}</span>
                  {item.variant_name_bg && (
                    <span className="text-gray-400"> ({item.variant_name_bg})</span>
                  )}
                  {item.note && (
                    <p className="text-xs italic text-gray-400">{item.note}</p>
                  )}
                </div>
                <span className="font-medium">{Number(item.item_total).toFixed(2)} €</span>
              </div>
            ))}
          </div>
        </div>

        {/* Totals */}
        <div className="border-t px-4 py-4">
          <div className="space-y-1.5">
            <div className="flex justify-between text-sm">
              <span className="text-gray-500">Междинна сума</span>
              <span>{Number(order.subtotal).toFixed(2)} €</span>
            </div>
            {Number(order.service_fee) > 0 && (
              <div className="flex justify-between text-sm">
                <span className="text-gray-500">Такса обслужване</span>
                <span>{Number(order.service_fee).toFixed(2)} €</span>
              </div>
            )}
            {Number(order.tip_amount) > 0 && (
              <div className="flex justify-between text-sm">
                <span className="text-gray-500">Бакшиш</span>
                <span>{Number(order.tip_amount).toFixed(2)} €</span>
              </div>
            )}
            <div className="flex justify-between border-t pt-2 text-lg font-bold">
              <span>Общо</span>
              <span className="text-amber-900">{Number(order.total).toFixed(2)} €</span>
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="flex gap-3 px-4 pt-4">
          <Link
            href={`/m/${slug}`}
            className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-amber-900 py-3 font-medium text-white hover:bg-amber-800"
          >
            <RotateCcw className="h-4 w-4" />
            Нова поръчка
          </Link>
        </div>
      </div>
    </div>
  );
}
