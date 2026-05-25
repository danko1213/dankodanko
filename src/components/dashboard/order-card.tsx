"use client";

import { format } from "date-fns";
import { bg } from "date-fns/locale";
import { Printer, Banknote } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import type { Order } from "@/lib/types/order";
import type { OrderStatus } from "@/lib/types/database";
import { ORDER_STATUS_LABELS, ORDER_STATUS_COLORS, ORDER_STATUS_TRANSITIONS } from "@/lib/constants/order-statuses";

interface OrderCardProps {
  order: Order;
  onUpdateStatus: (orderId: string, status: OrderStatus) => void;
  onPayCash: (orderId: string) => void;
  filterDestination?: "kitchen" | "bar";
}

export function OrderCard({ order, onUpdateStatus, onPayCash, filterDestination }: OrderCardProps) {
  const statusInfo = ORDER_STATUS_LABELS[order.status];
  const statusColor = ORDER_STATUS_COLORS[order.status];
  const nextStatuses = ORDER_STATUS_TRANSITIONS[order.status];
  const time = format(new Date(order.created_at), "HH:mm", { locale: bg });

  const displayItems = filterDestination
    ? order.items.filter((i) => i.destination === filterDestination)
    : order.items;

  if (filterDestination && displayItems.length === 0) return null;

  const paymentLabel =
    order.payment_status === "simulated_paid" ? "Платено (тест)"
    : order.payment_status === "paid_online" ? "Платено онлайн"
    : order.payment_status === "pay_cash" ? "В брой"
    : "Очаква плащане";

  const paymentColor =
    order.payment_status === "pending" ? "bg-yellow-100 text-yellow-700" : "bg-green-100 text-green-700";

  function handlePrint() {
    const printWindow = window.open("", "_blank", "width=350,height=600");
    if (!printWindow) return;

    const itemsHtml = displayItems.map((item) => {
      let line = `<div style="display:flex;justify-content:space-between;padding:2px 0">
        <span>${item.quantity}x ${item.item_name_bg}${item.variant_name_bg ? ` (${item.variant_name_bg})` : ""}</span>
        <span>${item.item_total.toFixed(2)} €</span>
      </div>`;
      if (item.extras.length > 0) {
        line += `<div style="font-size:11px;color:#666;padding-left:16px">+ ${item.extras.map(e => e.name_bg).join(", ")}</div>`;
      }
      if (item.removedIngredients.length > 0) {
        line += `<div style="font-size:11px;color:#c00;padding-left:16px">Без: ${item.removedIngredients.map(r => r.name_bg).join(", ")}</div>`;
      }
      if (item.note) {
        line += `<div style="font-size:11px;font-style:italic;color:#666;padding-left:16px">${item.note}</div>`;
      }
      return line;
    }).join("");

    printWindow.document.write(`
      <html><head><title>Поръчка #${order.order_number}</title>
      <style>body{font-family:monospace;font-size:13px;padding:10px;max-width:300px;margin:0 auto}</style></head>
      <body>
        <h2 style="text-align:center;margin:0">Поръчка #${order.order_number}</h2>
        <p style="text-align:center;margin:4px 0">Маса ${order.table_number} | ${time}</p>
        <hr/>
        ${itemsHtml}
        <hr/>
        ${order.general_note ? `<p style="font-style:italic">Бележка: ${order.general_note}</p><hr/>` : ""}
        <div style="display:flex;justify-content:space-between;font-weight:bold;font-size:15px">
          <span>Общо:</span><span>${order.total.toFixed(2)} €</span>
        </div>
        <script>window.print();window.close();</script>
      </body></html>
    `);
    printWindow.document.close();
  }

  return (
    <div className={`rounded-xl border-2 bg-white p-3 shadow-sm ${
      order.status === "new" ? "border-blue-400" : "border-gray-200"
    }`}>
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="text-lg font-bold">#{order.order_number}</span>
          <Badge className={`${statusColor} text-white text-xs`}>
            {statusInfo.bg}
          </Badge>
        </div>
        <span className="text-sm text-gray-500">{time}</span>
      </div>

      <div className="mt-1 flex items-center gap-2">
        <span className="text-sm font-medium text-gray-700">Маса {order.table_number}</span>
        <Badge variant="outline" className={`text-xs ${paymentColor}`}>
          {paymentLabel}
        </Badge>
      </div>

      {/* Items */}
      <div className="mt-3 space-y-1.5">
        {displayItems.map((item) => (
          <div key={item.id} className="text-sm">
            <div className="flex justify-between">
              <span>
                <span className="font-medium">{item.quantity}x</span>{" "}
                {item.item_name_bg}
                {item.variant_name_bg && (
                  <span className="text-gray-500"> ({item.variant_name_bg})</span>
                )}
              </span>
              <span className="font-medium">{item.item_total.toFixed(2)} €</span>
            </div>
            {item.extras.length > 0 && (
              <p className="pl-5 text-xs text-gray-500">
                + {item.extras.map((e) => e.name_bg).join(", ")}
              </p>
            )}
            {item.removedIngredients.length > 0 && (
              <p className="pl-5 text-xs text-red-500">
                Без: {item.removedIngredients.map((r) => r.name_bg).join(", ")}
              </p>
            )}
            {item.note && (
              <p className="pl-5 text-xs italic text-gray-400">{item.note}</p>
            )}
          </div>
        ))}
      </div>

      {order.general_note && (
        <p className="mt-2 rounded-lg bg-amber-50 p-2 text-xs italic text-amber-800">
          {order.general_note}
        </p>
      )}

      {/* Total */}
      <div className="mt-3 flex items-center justify-between border-t pt-2">
        <span className="text-sm text-gray-500">Общо</span>
        <span className="text-lg font-bold text-amber-900">{order.total.toFixed(2)} €</span>
      </div>

      {/* Actions */}
      <div className="mt-3 flex flex-wrap gap-2">
        {nextStatuses.map((nextStatus) => {
          const label = ORDER_STATUS_LABELS[nextStatus].bg;
          const isCancel = nextStatus === "cancelled";
          return (
            <Button
              key={nextStatus}
              size="sm"
              variant={isCancel ? "outline" : "default"}
              className={isCancel ? "border-red-200 text-red-600" : "bg-amber-900 hover:bg-amber-800"}
              onClick={() => onUpdateStatus(order.id, nextStatus)}
            >
              {label}
            </Button>
          );
        })}
        {order.payment_status === "pending" && (
          <Button
            size="sm"
            variant="outline"
            onClick={() => onPayCash(order.id)}
          >
            <Banknote className="mr-1 h-4 w-4" />
            В брой
          </Button>
        )}
        <Button size="sm" variant="ghost" onClick={handlePrint}>
          <Printer className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
}
