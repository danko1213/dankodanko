"use client";

import { useEffect, useState, use } from "react";
import Link from "next/link";
import { ArrowLeft, Plus, Pencil, Copy, Trash2, Loader2, Eye, EyeOff } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetFooter } from "@/components/ui/sheet";
import { useRestaurant } from "@/lib/hooks/use-restaurant";
import { createClient } from "@/lib/supabase/client";

interface ItemRow {
  id: string;
  name_bg: string;
  name_en: string | null;
  description_bg: string | null;
  description_en: string | null;
  base_price: number;
  image_url: string | null;
  is_available: boolean;
  sort_order: number;
}

interface VariantForm { name_bg: string; name_en: string; price_modifier: string; }
interface ExtraForm { name_bg: string; name_en: string; price: string; }
interface IngredientForm { name_bg: string; name_en: string; }

interface ItemForm {
  name_bg: string;
  name_en: string;
  description_bg: string;
  description_en: string;
  base_price: string;
  variants: VariantForm[];
  extras: ExtraForm[];
  removable: IngredientForm[];
}

const emptyForm: ItemForm = {
  name_bg: "", name_en: "", description_bg: "", description_en: "", base_price: "",
  variants: [], extras: [], removable: [],
};

export default function CategoryItemsPage({ params }: { params: Promise<{ categoryId: string }> }) {
  const { categoryId } = use(params);
  const { restaurantId, loading: rLoading } = useRestaurant();
  const [categoryName, setCategoryName] = useState("");
  const [items, setItems] = useState<ItemRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [sheetOpen, setSheetOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [form, setForm] = useState<ItemForm>({ ...emptyForm });
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (!restaurantId) return;
    loadData();
  }, [restaurantId, categoryId]);

  async function loadData() {
    const supabase = createClient();
    const { data: cat } = await supabase.from("menu_categories").select("name_bg").eq("id", categoryId).single();
    setCategoryName((cat as any)?.name_bg || "");

    const { data } = await supabase
      .from("menu_items")
      .select("id, name_bg, name_en, description_bg, description_en, base_price, image_url, is_available, sort_order")
      .eq("category_id", categoryId)
      .eq("is_active", true)
      .order("sort_order");
    setItems((data || []) as ItemRow[]);
    setLoading(false);
  }

  function openAdd() {
    setEditingId(null);
    setForm({ ...emptyForm });
    setSheetOpen(true);
  }

  async function openEdit(item: ItemRow) {
    setEditingId(item.id);
    const supabase = createClient();

    const [vRes, eRes, rRes] = await Promise.all([
      supabase.from("menu_item_variants").select("*").eq("menu_item_id", item.id).eq("is_active", true).order("sort_order"),
      supabase.from("menu_item_extras").select("*").eq("menu_item_id", item.id).eq("is_active", true).order("sort_order"),
      supabase.from("menu_item_removable_ingredients").select("*").eq("menu_item_id", item.id).order("sort_order"),
    ]);

    setForm({
      name_bg: item.name_bg,
      name_en: item.name_en || "",
      description_bg: item.description_bg || "",
      description_en: item.description_en || "",
      base_price: String(item.base_price),
      variants: ((vRes.data || []) as any[]).map((v) => ({ name_bg: v.name_bg, name_en: v.name_en || "", price_modifier: String(v.price_modifier) })),
      extras: ((eRes.data || []) as any[]).map((e) => ({ name_bg: e.name_bg, name_en: e.name_en || "", price: String(e.price) })),
      removable: ((rRes.data || []) as any[]).map((r) => ({ name_bg: r.name_bg, name_en: r.name_en || "" })),
    });
    setSheetOpen(true);
  }

  async function handleSave() {
    if (!restaurantId || !form.name_bg.trim() || !form.base_price) return;
    setSaving(true);
    const supabase = createClient() as any;

    const itemData = {
      name_bg: form.name_bg.trim(),
      name_en: form.name_en.trim() || null,
      description_bg: form.description_bg.trim() || null,
      description_en: form.description_en.trim() || null,
      base_price: parseFloat(form.base_price),
    };

    let itemId = editingId;

    if (editingId) {
      await supabase.from("menu_items").update(itemData).eq("id", editingId);
      // Delete old sub-records and re-insert
      await supabase.from("menu_item_variants").update({ is_active: false }).eq("menu_item_id", editingId);
      await supabase.from("menu_item_extras").update({ is_active: false }).eq("menu_item_id", editingId);
      await supabase.from("menu_item_removable_ingredients").delete().eq("menu_item_id", editingId);
    } else {
      const { data: newItem } = await supabase.from("menu_items").insert([{
        ...itemData,
        category_id: categoryId,
        restaurant_id: restaurantId,
        sort_order: items.length,
      }]).select("id").single();
      itemId = newItem?.id;
    }

    if (itemId) {
      // Insert variants
      if (form.variants.length > 0) {
        await supabase.from("menu_item_variants").insert(
          form.variants.filter((v) => v.name_bg.trim()).map((v, i) => ({
            menu_item_id: itemId,
            name_bg: v.name_bg.trim(),
            name_en: v.name_en.trim() || null,
            price_modifier: parseFloat(v.price_modifier) || 0,
            sort_order: i,
          }))
        );
      }
      // Insert extras
      if (form.extras.length > 0) {
        await supabase.from("menu_item_extras").insert(
          form.extras.filter((e) => e.name_bg.trim()).map((e, i) => ({
            menu_item_id: itemId,
            name_bg: e.name_bg.trim(),
            name_en: e.name_en.trim() || null,
            price: parseFloat(e.price) || 0,
            sort_order: i,
          }))
        );
      }
      // Insert removable ingredients
      if (form.removable.length > 0) {
        await supabase.from("menu_item_removable_ingredients").insert(
          form.removable.filter((r) => r.name_bg.trim()).map((r, i) => ({
            menu_item_id: itemId,
            name_bg: r.name_bg.trim(),
            name_en: r.name_en.trim() || null,
            sort_order: i,
          }))
        );
      }
    }

    setSaving(false);
    setSheetOpen(false);
    loadData();
  }

  async function toggleAvailability(item: ItemRow) {
    const supabase = createClient() as any;
    await supabase.from("menu_items").update({ is_available: !item.is_available }).eq("id", item.id);
    setItems((prev) => prev.map((i) => i.id === item.id ? { ...i, is_available: !i.is_available } : i));
  }

  async function duplicateItem(item: ItemRow) {
    const supabase = createClient() as any;
    const { data: newItem } = await supabase.from("menu_items").insert([{
      category_id: categoryId,
      restaurant_id: restaurantId,
      name_bg: item.name_bg + " (копие)",
      name_en: item.name_en ? item.name_en + " (copy)" : null,
      description_bg: item.description_bg,
      description_en: item.description_en,
      base_price: item.base_price,
      image_url: item.image_url,
      sort_order: items.length,
    }]).select("id").single();
    if (newItem?.id) {
      // Copy variants, extras, removable
      const [vRes, eRes, rRes] = await Promise.all([
        supabase.from("menu_item_variants").select("*").eq("menu_item_id", item.id).eq("is_active", true),
        supabase.from("menu_item_extras").select("*").eq("menu_item_id", item.id).eq("is_active", true),
        supabase.from("menu_item_removable_ingredients").select("*").eq("menu_item_id", item.id),
      ]);
      if (vRes.data?.length) await supabase.from("menu_item_variants").insert(vRes.data.map((v: any) => ({ ...v, id: undefined, menu_item_id: newItem.id })));
      if (eRes.data?.length) await supabase.from("menu_item_extras").insert(eRes.data.map((e: any) => ({ ...e, id: undefined, menu_item_id: newItem.id })));
      if (rRes.data?.length) await supabase.from("menu_item_removable_ingredients").insert(rRes.data.map((r: any) => ({ ...r, id: undefined, menu_item_id: newItem.id })));
    }
    loadData();
  }

  async function deleteItem(id: string) {
    if (!confirm("Изтриване на продукта?")) return;
    const supabase = createClient() as any;
    await supabase.from("menu_items").update({ is_active: false }).eq("id", id);
    loadData();
  }

  if (rLoading) return <div className="flex h-64 items-center justify-center"><Loader2 className="h-6 w-6 animate-spin text-amber-900" /></div>;

  return (
    <div className="p-4">
      <div className="mb-4 flex items-center gap-3">
        <Link href="/dashboard/menu" className="rounded-full p-1 hover:bg-gray-100"><ArrowLeft className="h-5 w-5" /></Link>
        <h1 className="flex-1 text-xl font-bold text-gray-900">{categoryName}</h1>
        <Button size="sm" onClick={openAdd} className="bg-amber-900 hover:bg-amber-800">
          <Plus className="mr-1 h-4 w-4" /> Продукт
        </Button>
      </div>

      {loading ? (
        <div className="flex h-32 items-center justify-center"><Loader2 className="h-6 w-6 animate-spin text-amber-900" /></div>
      ) : items.length === 0 ? (
        <div className="py-16 text-center"><p className="text-gray-400">Няма продукти. Добавете първия продукт.</p></div>
      ) : (
        <div className="space-y-2">
          {items.map((item) => (
            <div key={item.id} className={`flex items-center gap-3 rounded-xl border bg-white p-3 ${!item.is_available ? "opacity-60" : ""}`}>
              {item.image_url ? (
                <img src={item.image_url} alt="" className="h-12 w-12 rounded-lg object-cover" />
              ) : (
                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-gray-100 text-gray-300 text-xs">IMG</div>
              )}
              <div className="min-w-0 flex-1">
                <p className="truncate font-medium text-gray-900">{item.name_bg}</p>
                <p className="text-sm font-semibold text-amber-900">{Number(item.base_price).toFixed(2)} €</p>
              </div>
              <button onClick={() => toggleAvailability(item)} title={item.is_available ? "Направи неналично" : "Направи налично"} className="rounded-full p-2 hover:bg-gray-100">
                {item.is_available ? <Eye className="h-4 w-4 text-green-500" /> : <EyeOff className="h-4 w-4 text-gray-400" />}
              </button>
              <button onClick={() => openEdit(item)} className="rounded-full p-2 hover:bg-gray-100"><Pencil className="h-4 w-4 text-gray-400" /></button>
              <button onClick={() => duplicateItem(item)} className="rounded-full p-2 hover:bg-gray-100"><Copy className="h-4 w-4 text-gray-400" /></button>
              <button onClick={() => deleteItem(item.id)} className="rounded-full p-2 hover:bg-red-50"><Trash2 className="h-4 w-4 text-gray-400 hover:text-red-500" /></button>
            </div>
          ))}
        </div>
      )}

      {/* Item Editor Sheet */}
      <Sheet open={sheetOpen} onOpenChange={setSheetOpen}>
        <SheetContent side="bottom" className="max-h-[90vh] overflow-y-auto">
          <SheetHeader>
            <SheetTitle>{editingId ? "Редактирай продукт" : "Нов продукт"}</SheetTitle>
          </SheetHeader>
          <div className="space-y-4 py-4">
            <div className="grid grid-cols-2 gap-3">
              <div><Label>Име (BG) *</Label><Input value={form.name_bg} onChange={(e) => setForm({ ...form, name_bg: e.target.value })} className="mt-1" /></div>
              <div><Label>Име (EN)</Label><Input value={form.name_en} onChange={(e) => setForm({ ...form, name_en: e.target.value })} className="mt-1" /></div>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div><Label>Описание (BG)</Label><Textarea value={form.description_bg} onChange={(e) => setForm({ ...form, description_bg: e.target.value })} rows={2} className="mt-1" /></div>
              <div><Label>Описание (EN)</Label><Textarea value={form.description_en} onChange={(e) => setForm({ ...form, description_en: e.target.value })} rows={2} className="mt-1" /></div>
            </div>
            <div>
              <Label>Цена (€) *</Label>
              <Input type="number" step="0.10" value={form.base_price} onChange={(e) => setForm({ ...form, base_price: e.target.value })} className="mt-1 w-32" />
            </div>

            <Separator />

            {/* Variants */}
            <div>
              <div className="flex items-center justify-between">
                <Label>Варианти (размери)</Label>
                <Button size="sm" variant="outline" onClick={() => setForm({ ...form, variants: [...form.variants, { name_bg: "", name_en: "", price_modifier: "0" }] })}>
                  <Plus className="mr-1 h-3 w-3" /> Добави
                </Button>
              </div>
              {form.variants.map((v, i) => (
                <div key={i} className="mt-2 flex items-center gap-2">
                  <Input placeholder="Име BG" value={v.name_bg} onChange={(e) => { const vs = [...form.variants]; vs[i].name_bg = e.target.value; setForm({ ...form, variants: vs }); }} className="flex-1" />
                  <Input placeholder="EN" value={v.name_en} onChange={(e) => { const vs = [...form.variants]; vs[i].name_en = e.target.value; setForm({ ...form, variants: vs }); }} className="w-24" />
                  <Input type="number" step="0.50" placeholder="±€" value={v.price_modifier} onChange={(e) => { const vs = [...form.variants]; vs[i].price_modifier = e.target.value; setForm({ ...form, variants: vs }); }} className="w-20" />
                  <button onClick={() => setForm({ ...form, variants: form.variants.filter((_, j) => j !== i) })} className="text-red-400 hover:text-red-600"><Trash2 className="h-4 w-4" /></button>
                </div>
              ))}
            </div>

            <Separator />

            {/* Extras */}
            <div>
              <div className="flex items-center justify-between">
                <Label>Добавки</Label>
                <Button size="sm" variant="outline" onClick={() => setForm({ ...form, extras: [...form.extras, { name_bg: "", name_en: "", price: "0" }] })}>
                  <Plus className="mr-1 h-3 w-3" /> Добави
                </Button>
              </div>
              {form.extras.map((e, i) => (
                <div key={i} className="mt-2 flex items-center gap-2">
                  <Input placeholder="Име BG" value={e.name_bg} onChange={(ev) => { const es = [...form.extras]; es[i].name_bg = ev.target.value; setForm({ ...form, extras: es }); }} className="flex-1" />
                  <Input placeholder="EN" value={e.name_en} onChange={(ev) => { const es = [...form.extras]; es[i].name_en = ev.target.value; setForm({ ...form, extras: es }); }} className="w-24" />
                  <Input type="number" step="0.50" placeholder="€" value={e.price} onChange={(ev) => { const es = [...form.extras]; es[i].price = ev.target.value; setForm({ ...form, extras: es }); }} className="w-20" />
                  <button onClick={() => setForm({ ...form, extras: form.extras.filter((_, j) => j !== i) })} className="text-red-400 hover:text-red-600"><Trash2 className="h-4 w-4" /></button>
                </div>
              ))}
            </div>

            <Separator />

            {/* Removable ingredients */}
            <div>
              <div className="flex items-center justify-between">
                <Label>Съставки за премахване</Label>
                <Button size="sm" variant="outline" onClick={() => setForm({ ...form, removable: [...form.removable, { name_bg: "", name_en: "" }] })}>
                  <Plus className="mr-1 h-3 w-3" /> Добави
                </Button>
              </div>
              {form.removable.map((r, i) => (
                <div key={i} className="mt-2 flex items-center gap-2">
                  <Input placeholder="Име BG" value={r.name_bg} onChange={(e) => { const rs = [...form.removable]; rs[i].name_bg = e.target.value; setForm({ ...form, removable: rs }); }} className="flex-1" />
                  <Input placeholder="EN" value={r.name_en} onChange={(e) => { const rs = [...form.removable]; rs[i].name_en = e.target.value; setForm({ ...form, removable: rs }); }} className="w-32" />
                  <button onClick={() => setForm({ ...form, removable: form.removable.filter((_, j) => j !== i) })} className="text-red-400 hover:text-red-600"><Trash2 className="h-4 w-4" /></button>
                </div>
              ))}
            </div>
          </div>
          <SheetFooter>
            <Button variant="outline" onClick={() => setSheetOpen(false)}>Отказ</Button>
            <Button onClick={handleSave} disabled={saving || !form.name_bg.trim() || !form.base_price} className="bg-amber-900 hover:bg-amber-800">
              {saving ? "Запазване..." : "Запази"}
            </Button>
          </SheetFooter>
        </SheetContent>
      </Sheet>
    </div>
  );
}
