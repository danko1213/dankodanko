"use client";

import { useEffect, useState } from "react";
import { Loader2, Save, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";
import { useRestaurant } from "@/lib/hooks/use-restaurant";
import { createClient } from "@/lib/supabase/client";
import type { DayOfWeek } from "@/lib/types/database";

const DAYS: { key: DayOfWeek; bg: string }[] = [
  { key: "monday", bg: "Понеделник" },
  { key: "tuesday", bg: "Вторник" },
  { key: "wednesday", bg: "Сряда" },
  { key: "thursday", bg: "Четвъртък" },
  { key: "friday", bg: "Петък" },
  { key: "saturday", bg: "Събота" },
  { key: "sunday", bg: "Неделя" },
];

interface HoursRow {
  id?: string;
  day: DayOfWeek;
  open_time: string;
  close_time: string;
  is_closed: boolean;
}

export default function SettingsPage() {
  const { restaurantId, loading: rLoading } = useRestaurant();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [serviceFeePercent, setServiceFeePercent] = useState("0");
  const [serviceFeeFixed, setServiceFeeFixed] = useState("0");
  const [hours, setHours] = useState<HoursRow[]>([]);

  useEffect(() => {
    if (!restaurantId) return;
    loadSettings();
  }, [restaurantId]);

  async function loadSettings() {
    const supabase = createClient();

    const { data: rest } = await supabase
      .from("restaurants")
      .select("name, description, service_fee_percent, service_fee_fixed")
      .eq("id", restaurantId!)
      .single();

    if (rest) {
      const r = rest as any;
      setName(r.name || "");
      setDescription(r.description || "");
      setServiceFeePercent(String(r.service_fee_percent || 0));
      setServiceFeeFixed(String(r.service_fee_fixed || 0));
    }

    const { data: hoursData } = await supabase
      .from("restaurant_opening_hours")
      .select("id, day, open_time, close_time, is_closed")
      .eq("restaurant_id", restaurantId!);

    const existingHours = (hoursData || []) as HoursRow[];
    const hoursMap = new Map(existingHours.map((h) => [h.day, h]));

    setHours(
      DAYS.map((d) => hoursMap.get(d.key) || {
        day: d.key,
        open_time: "10:00",
        close_time: "22:00",
        is_closed: false,
      })
    );

    setLoading(false);
  }

  async function handleSave() {
    if (!restaurantId) return;
    setSaving(true);
    const supabase = createClient() as any;

    await supabase.from("restaurants").update({
      name: name.trim(),
      description: description.trim() || null,
      service_fee_percent: parseFloat(serviceFeePercent) || 0,
      service_fee_fixed: parseFloat(serviceFeeFixed) || 0,
    }).eq("id", restaurantId);

    // Upsert opening hours
    await supabase.from("restaurant_opening_hours").delete().eq("restaurant_id", restaurantId);
    await supabase.from("restaurant_opening_hours").insert(
      hours.map((h) => ({
        restaurant_id: restaurantId,
        day: h.day,
        open_time: h.open_time,
        close_time: h.close_time,
        is_closed: h.is_closed,
      }))
    );

    setSaving(false);
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  }

  function updateHour(day: DayOfWeek, field: keyof HoursRow, value: any) {
    setHours((prev) =>
      prev.map((h) => (h.day === day ? { ...h, [field]: value } : h))
    );
  }

  if (rLoading || !restaurantId || loading) {
    return <div className="flex h-64 items-center justify-center"><Loader2 className="h-6 w-6 animate-spin text-amber-900" /></div>;
  }

  return (
    <div className="p-4 pb-24">
      <div className="mb-4 flex items-center justify-between">
        <h1 className="text-xl font-bold text-gray-900">Настройки</h1>
        <Button onClick={handleSave} disabled={saving} className="bg-amber-900 hover:bg-amber-800">
          {saved ? <><Check className="mr-1 h-4 w-4" /> Запазено</> : saving ? "Запазване..." : <><Save className="mr-1 h-4 w-4" /> Запази</>}
        </Button>
      </div>

      <div className="space-y-6">
        {/* General */}
        <div className="rounded-xl border bg-white p-4">
          <h2 className="mb-3 font-semibold text-gray-900">Информация</h2>
          <div className="space-y-3">
            <div>
              <Label>Име на ресторанта</Label>
              <Input value={name} onChange={(e) => setName(e.target.value)} className="mt-1" />
            </div>
            <div>
              <Label>Описание</Label>
              <Textarea value={description} onChange={(e) => setDescription(e.target.value)} rows={2} className="mt-1" />
            </div>
          </div>
        </div>

        {/* Service fee */}
        <div className="rounded-xl border bg-white p-4">
          <h2 className="mb-3 font-semibold text-gray-900">Такса обслужване</h2>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <Label>Процент (%)</Label>
              <Input type="number" step="0.5" min="0" value={serviceFeePercent} onChange={(e) => setServiceFeePercent(e.target.value)} className="mt-1" />
            </div>
            <div>
              <Label>Фиксирана (€)</Label>
              <Input type="number" step="0.50" min="0" value={serviceFeeFixed} onChange={(e) => setServiceFeeFixed(e.target.value)} className="mt-1" />
            </div>
          </div>
          <p className="mt-2 text-xs text-gray-500">Таксата се прилага автоматично към всяка поръчка.</p>
        </div>

        {/* Opening hours */}
        <div className="rounded-xl border bg-white p-4">
          <h2 className="mb-3 font-semibold text-gray-900">Работно време</h2>
          <div className="space-y-3">
            {hours.map((h) => {
              const dayInfo = DAYS.find((d) => d.key === h.day)!;
              return (
                <div key={h.day} className="flex items-center gap-2">
                  <span className="w-24 text-sm text-gray-700">{dayInfo.bg}</span>
                  <Switch
                    checked={!h.is_closed}
                    onCheckedChange={(checked) => updateHour(h.day, "is_closed", !checked)}
                  />
                  {!h.is_closed ? (
                    <>
                      <Input
                        type="time"
                        value={h.open_time}
                        onChange={(e) => updateHour(h.day, "open_time", e.target.value)}
                        className="w-28"
                      />
                      <span className="text-gray-400">—</span>
                      <Input
                        type="time"
                        value={h.close_time}
                        onChange={(e) => updateHour(h.day, "close_time", e.target.value)}
                        className="w-28"
                      />
                    </>
                  ) : (
                    <span className="text-sm text-gray-400">Затворено</span>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
