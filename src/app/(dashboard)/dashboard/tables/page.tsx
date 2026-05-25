"use client";

import { useEffect, useState, useRef } from "react";
import { Plus, Download, Trash2, Loader2, ExternalLink, QrCode, Printer } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { useRestaurant } from "@/lib/hooks/use-restaurant";
import { createClient } from "@/lib/supabase/client";
import { generateSlug, getMenuUrl } from "@/lib/utils/slug";
import { QRCodeCanvas } from "qrcode.react";

interface TableRow {
  id: string;
  table_number: string;
  slug: string;
  is_active: boolean;
}

export default function TablesPage() {
  const { restaurantId, restaurantName, loading: rLoading } = useRestaurant();
  const [tables, setTables] = useState<TableRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [newTableNumber, setNewTableNumber] = useState("");
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (!restaurantId) return;
    loadTables();
  }, [restaurantId]);

  async function loadTables() {
    const supabase = createClient();
    const { data } = await supabase
      .from("tables")
      .select("id, table_number, slug, is_active")
      .eq("restaurant_id", restaurantId!)
      .eq("is_active", true)
      .order("table_number");
    setTables((data || []) as TableRow[]);
    setLoading(false);
  }

  async function handleAddTable() {
    if (!restaurantId || !newTableNumber.trim()) return;
    setSaving(true);
    const supabase = createClient() as any;
    const slug = generateSlug(8);

    await supabase.from("tables").insert([{
      restaurant_id: restaurantId,
      table_number: newTableNumber.trim(),
      slug,
    }]);

    setSaving(false);
    setDialogOpen(false);
    setNewTableNumber("");
    loadTables();
  }

  async function handleDelete(id: string) {
    if (!confirm("Изтриване на масата?")) return;
    const supabase = createClient() as any;
    await supabase.from("tables").update({ is_active: false }).eq("id", id);
    loadTables();
  }

  function downloadQR(table: TableRow) {
    const canvas = document.getElementById(`qr-${table.id}`) as HTMLCanvasElement;
    if (!canvas) return;
    const url = canvas.toDataURL("image/png");
    const a = document.createElement("a");
    a.href = url;
    a.download = `masapay-table-${table.table_number}.png`;
    a.click();
  }

  function printTableCard(table: TableRow) {
    const canvas = document.getElementById(`qr-${table.id}`) as HTMLCanvasElement;
    if (!canvas) return;
    const qrDataUrl = canvas.toDataURL("image/png");

    const win = window.open("", "_blank", "width=400,height=600");
    if (!win) return;
    win.document.write(`
      <html><head><title>Маса ${table.table_number}</title>
      <style>
        body { margin:0; display:flex; justify-content:center; align-items:center; min-height:100vh; font-family:Georgia,serif; }
        .card { width:300px; text-align:center; border:2px solid #78350f; border-radius:20px; padding:32px 24px; }
        .logo { font-size:24px; font-weight:bold; color:#78350f; margin-bottom:8px; }
        .name { font-size:14px; color:#666; margin-bottom:24px; }
        .qr { margin:0 auto 24px; }
        .scan { font-size:16px; font-weight:600; color:#78350f; margin-bottom:4px; }
        .scan-en { font-size:12px; color:#999; }
      </style></head>
      <body>
        <div class="card">
          <div class="logo">MasaPay</div>
          <div class="name">${restaurantName || ""}</div>
          <img src="${qrDataUrl}" width="200" height="200" class="qr" />
          <div class="scan">Сканирай за меню</div>
          <div class="scan-en">Scan for menu</div>
        </div>
        <script>window.print();window.close();</script>
      </body></html>
    `);
    win.document.close();
  }

  if (rLoading || !restaurantId) {
    return <div className="flex h-64 items-center justify-center"><Loader2 className="h-6 w-6 animate-spin text-amber-900" /></div>;
  }

  return (
    <div className="p-4">
      <div className="mb-4 flex items-center justify-between">
        <h1 className="text-xl font-bold text-gray-900">Маси и QR кодове</h1>
        <Button size="sm" onClick={() => setDialogOpen(true)} className="bg-amber-900 hover:bg-amber-800">
          <Plus className="mr-1 h-4 w-4" /> Маса
        </Button>
      </div>

      {loading ? (
        <div className="flex h-32 items-center justify-center"><Loader2 className="h-6 w-6 animate-spin text-amber-900" /></div>
      ) : tables.length === 0 ? (
        <div className="py-16 text-center"><p className="text-gray-400">Няма маси. Добавете първата маса.</p></div>
      ) : (
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
          {tables.map((table) => {
            const menuUrl = getMenuUrl(table.slug);
            return (
              <div key={table.id} className="rounded-xl border bg-white p-4 text-center">
                <h3 className="text-lg font-bold text-gray-900">Маса {table.table_number}</h3>

                <div className="my-3 flex justify-center">
                  <QRCodeCanvas
                    id={`qr-${table.id}`}
                    value={menuUrl}
                    size={160}
                    level="M"
                    marginSize={2}
                    bgColor="#ffffff"
                    fgColor="#78350f"
                  />
                </div>

                <p className="mb-3 truncate text-xs text-gray-400">{menuUrl}</p>

                <div className="flex flex-wrap justify-center gap-2">
                  <Button size="sm" variant="outline" onClick={() => downloadQR(table)}>
                    <Download className="mr-1 h-3 w-3" /> PNG
                  </Button>
                  <Button size="sm" variant="outline" onClick={() => printTableCard(table)}>
                    <Printer className="mr-1 h-3 w-3" /> Картичка
                  </Button>
                  <a href={menuUrl} target="_blank" rel="noopener noreferrer">
                    <Button size="sm" variant="outline">
                      <ExternalLink className="mr-1 h-3 w-3" /> Преглед
                    </Button>
                  </a>
                  <Button size="sm" variant="ghost" onClick={() => handleDelete(table.id)} className="text-red-500 hover:bg-red-50">
                    <Trash2 className="h-3 w-3" />
                  </Button>
                </div>
              </div>
            );
          })}
        </div>
      )}

      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent>
          <DialogHeader><DialogTitle>Нова маса</DialogTitle></DialogHeader>
          <div className="py-2">
            <Label>Номер на маса *</Label>
            <Input
              value={newTableNumber}
              onChange={(e) => setNewTableNumber(e.target.value)}
              placeholder="1, 2, Тераса 1..."
              className="mt-1"
              onKeyDown={(e) => e.key === "Enter" && handleAddTable()}
            />
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setDialogOpen(false)}>Отказ</Button>
            <Button onClick={handleAddTable} disabled={saving || !newTableNumber.trim()} className="bg-amber-900 hover:bg-amber-800">
              {saving ? "Създаване..." : "Създай"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
