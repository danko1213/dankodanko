"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Plus, ChefHat, Wine, GripVertical, Pencil, Trash2, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { useRestaurant } from "@/lib/hooks/use-restaurant";
import { createClient } from "@/lib/supabase/client";

interface Category {
  id: string;
  name_bg: string;
  name_en: string | null;
  icon: string | null;
  destination: "kitchen" | "bar";
  sort_order: number;
  is_active: boolean;
}

export default function MenuManagementPage() {
  const { restaurantId, loading: rLoading } = useRestaurant();
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editing, setEditing] = useState<Category | null>(null);
  const [form, setForm] = useState({ name_bg: "", name_en: "", icon: "", destination: "kitchen" as "kitchen" | "bar" });
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (!restaurantId) return;
    loadCategories();
  }, [restaurantId]);

  async function loadCategories() {
    const supabase = createClient();
    const { data } = await supabase
      .from("menu_categories")
      .select("id, name_bg, name_en, icon, destination, sort_order, is_active")
      .eq("restaurant_id", restaurantId!)
      .eq("is_active", true)
      .order("sort_order");
    setCategories((data || []) as Category[]);
    setLoading(false);
  }

  function openAdd() {
    setEditing(null);
    setForm({ name_bg: "", name_en: "", icon: "", destination: "kitchen" });
    setDialogOpen(true);
  }

  function openEdit(cat: Category) {
    setEditing(cat);
    setForm({ name_bg: cat.name_bg, name_en: cat.name_en || "", icon: cat.icon || "", destination: cat.destination });
    setDialogOpen(true);
  }

  async function handleSave() {
    if (!restaurantId || !form.name_bg.trim()) return;
    setSaving(true);
    const supabase = createClient() as any;

    if (editing) {
      await supabase.from("menu_categories").update({
        name_bg: form.name_bg.trim(),
        name_en: form.name_en.trim() || null,
        icon: form.icon.trim() || null,
        destination: form.destination,
      }).eq("id", editing.id);
    } else {
      await supabase.from("menu_categories").insert([{
        restaurant_id: restaurantId,
        name_bg: form.name_bg.trim(),
        name_en: form.name_en.trim() || null,
        icon: form.icon.trim() || null,
        destination: form.destination,
        sort_order: categories.length,
      }]);
    }

    setSaving(false);
    setDialogOpen(false);
    loadCategories();
  }

  async function handleDelete(id: string) {
    if (!confirm("Изтриване на категорията и всички продукти в нея?")) return;
    const supabase = createClient() as any;
    await supabase.from("menu_categories").update({ is_active: false }).eq("id", id);
    loadCategories();
  }

  if (rLoading || !restaurantId) {
    return <div className="flex h-64 items-center justify-center"><Loader2 className="h-6 w-6 animate-spin text-amber-900" /></div>;
  }

  return (
    <div className="p-4">
      <div className="mb-4 flex items-center justify-between">
        <h1 className="text-xl font-bold text-gray-900">Меню</h1>
        <Button size="sm" onClick={openAdd} className="bg-amber-900 hover:bg-amber-800">
          <Plus className="mr-1 h-4 w-4" /> Категория
        </Button>
      </div>

      {loading ? (
        <div className="flex h-32 items-center justify-center"><Loader2 className="h-6 w-6 animate-spin text-amber-900" /></div>
      ) : categories.length === 0 ? (
        <div className="py-16 text-center">
          <p className="text-gray-400">Няма категории. Добавете първата категория.</p>
        </div>
      ) : (
        <div className="space-y-2">
          {categories.map((cat) => (
            <div key={cat.id} className="flex items-center gap-3 rounded-xl border bg-white p-3">
              <GripVertical className="h-5 w-5 flex-shrink-0 text-gray-300" />
              <div className="flex flex-1 items-center gap-2 overflow-hidden">
                {cat.icon && <span className="text-lg">{cat.icon}</span>}
                <div className="min-w-0 flex-1">
                  <Link
                    href={`/dashboard/menu/${cat.id}`}
                    className="block truncate font-medium text-gray-900 hover:text-amber-900"
                  >
                    {cat.name_bg}
                  </Link>
                  <div className="flex items-center gap-1.5 text-xs text-gray-500">
                    {cat.destination === "kitchen" ? (
                      <><ChefHat className="h-3 w-3" /> Кухня</>
                    ) : (
                      <><Wine className="h-3 w-3" /> Бар</>
                    )}
                  </div>
                </div>
              </div>
              <button onClick={() => openEdit(cat)} className="rounded-full p-2 hover:bg-gray-100">
                <Pencil className="h-4 w-4 text-gray-400" />
              </button>
              <button onClick={() => handleDelete(cat.id)} className="rounded-full p-2 hover:bg-red-50">
                <Trash2 className="h-4 w-4 text-gray-400 hover:text-red-500" />
              </button>
            </div>
          ))}
        </div>
      )}

      {/* Add/Edit Dialog */}
      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{editing ? "Редактирай категория" : "Нова категория"}</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-2">
            <div>
              <Label>Име (BG) *</Label>
              <Input value={form.name_bg} onChange={(e) => setForm({ ...form, name_bg: e.target.value })} className="mt-1" />
            </div>
            <div>
              <Label>Име (EN)</Label>
              <Input value={form.name_en} onChange={(e) => setForm({ ...form, name_en: e.target.value })} className="mt-1" />
            </div>
            <div>
              <Label>Иконка (emoji)</Label>
              <Input value={form.icon} onChange={(e) => setForm({ ...form, icon: e.target.value })} placeholder="🍽️" className="mt-1" />
            </div>
            <div>
              <Label>Насочване</Label>
              <Select value={form.destination} onValueChange={(v) => setForm({ ...form, destination: v as "kitchen" | "bar" })}>
                <SelectTrigger className="mt-1"><SelectValue /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="kitchen">Кухня</SelectItem>
                  <SelectItem value="bar">Бар</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setDialogOpen(false)}>Отказ</Button>
            <Button onClick={handleSave} disabled={saving || !form.name_bg.trim()} className="bg-amber-900 hover:bg-amber-800">
              {saving ? "Запазване..." : "Запази"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
