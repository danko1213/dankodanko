"use client";

import { useEffect, useState } from "react";
import { Plus, Trash2, Loader2, Mail, Copy, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { useRestaurant } from "@/lib/hooks/use-restaurant";
import { createClient } from "@/lib/supabase/client";
import { ROLE_LABELS } from "@/lib/constants/roles";
import type { UserRole } from "@/lib/types/database";

interface StaffRow {
  id: string;
  display_name: string;
  role: UserRole;
  is_active: boolean;
}

interface InviteRow {
  id: string;
  email: string;
  role: UserRole;
  status: string;
  token: string;
}

export default function StaffPage() {
  const { restaurantId, loading: rLoading } = useRestaurant();
  const [staff, setStaff] = useState<StaffRow[]>([]);
  const [invites, setInvites] = useState<InviteRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [inviteEmail, setInviteEmail] = useState("");
  const [inviteRole, setInviteRole] = useState<UserRole>("waiter");
  const [saving, setSaving] = useState(false);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  useEffect(() => {
    if (!restaurantId) return;
    loadData();
  }, [restaurantId]);

  async function loadData() {
    const supabase = createClient();
    const [staffRes, inviteRes] = await Promise.all([
      supabase.from("staff").select("id, display_name, role, is_active").eq("restaurant_id", restaurantId!).eq("is_active", true),
      supabase.from("staff_invitations").select("id, email, role, status, token").eq("restaurant_id", restaurantId!).eq("status", "pending"),
    ]);
    setStaff((staffRes.data || []) as StaffRow[]);
    setInvites((inviteRes.data || []) as InviteRow[]);
    setLoading(false);
  }

  async function handleInvite() {
    if (!restaurantId || !inviteEmail.trim()) return;
    setSaving(true);
    const supabase = createClient();
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) { setSaving(false); return; }

    await (supabase as any).from("staff_invitations").insert([{
      restaurant_id: restaurantId,
      email: inviteEmail.trim().toLowerCase(),
      role: inviteRole,
      invited_by: user.id,
    }]);

    setSaving(false);
    setDialogOpen(false);
    setInviteEmail("");
    setInviteRole("waiter");
    loadData();
  }

  async function handleDeactivateStaff(id: string) {
    if (!confirm("Деактивиране на този член на персонала?")) return;
    const supabase = createClient() as any;
    await supabase.from("staff").update({ is_active: false }).eq("id", id);
    loadData();
  }

  async function handleDeleteInvite(id: string) {
    const supabase = createClient() as any;
    await supabase.from("staff_invitations").delete().eq("id", id);
    loadData();
  }

  function copyInviteLink(invite: InviteRow) {
    const url = `${window.location.origin}/invite/${invite.token}`;
    navigator.clipboard.writeText(url);
    setCopiedId(invite.id);
    setTimeout(() => setCopiedId(null), 2000);
  }

  if (rLoading || !restaurantId) {
    return <div className="flex h-64 items-center justify-center"><Loader2 className="h-6 w-6 animate-spin text-amber-900" /></div>;
  }

  return (
    <div className="p-4">
      <div className="mb-4 flex items-center justify-between">
        <h1 className="text-xl font-bold text-gray-900">Персонал</h1>
        <Button size="sm" onClick={() => setDialogOpen(true)} className="bg-amber-900 hover:bg-amber-800">
          <Plus className="mr-1 h-4 w-4" /> Покани
        </Button>
      </div>

      {loading ? (
        <div className="flex h-32 items-center justify-center"><Loader2 className="h-6 w-6 animate-spin text-amber-900" /></div>
      ) : (
        <>
          {/* Active staff */}
          <h2 className="mb-2 text-sm font-semibold text-gray-500">Активен персонал</h2>
          {staff.length === 0 ? (
            <p className="mb-6 text-sm text-gray-400">Няма добавен персонал.</p>
          ) : (
            <div className="mb-6 space-y-2">
              {staff.map((s) => (
                <div key={s.id} className="flex items-center gap-3 rounded-xl border bg-white p-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-amber-100 text-sm font-bold text-amber-900">
                    {s.display_name.charAt(0).toUpperCase()}
                  </div>
                  <div className="flex-1">
                    <p className="font-medium text-gray-900">{s.display_name}</p>
                    <Badge variant="outline" className="text-xs">{ROLE_LABELS[s.role].bg}</Badge>
                  </div>
                  {s.role !== "owner" && (
                    <button onClick={() => handleDeactivateStaff(s.id)} className="rounded-full p-2 hover:bg-red-50">
                      <Trash2 className="h-4 w-4 text-gray-400 hover:text-red-500" />
                    </button>
                  )}
                </div>
              ))}
            </div>
          )}

          {/* Pending invites */}
          {invites.length > 0 && (
            <>
              <h2 className="mb-2 text-sm font-semibold text-gray-500">Чакащи покани</h2>
              <div className="space-y-2">
                {invites.map((inv) => (
                  <div key={inv.id} className="flex items-center gap-3 rounded-xl border border-dashed bg-white p-3">
                    <Mail className="h-5 w-5 text-gray-400" />
                    <div className="flex-1">
                      <p className="text-sm font-medium text-gray-700">{inv.email}</p>
                      <Badge variant="outline" className="text-xs">{ROLE_LABELS[inv.role].bg}</Badge>
                    </div>
                    <button onClick={() => copyInviteLink(inv)} className="rounded-full p-2 hover:bg-gray-100" title="Копирай линк">
                      {copiedId === inv.id ? <Check className="h-4 w-4 text-green-500" /> : <Copy className="h-4 w-4 text-gray-400" />}
                    </button>
                    <button onClick={() => handleDeleteInvite(inv.id)} className="rounded-full p-2 hover:bg-red-50">
                      <Trash2 className="h-4 w-4 text-gray-400 hover:text-red-500" />
                    </button>
                  </div>
                ))}
              </div>
            </>
          )}
        </>
      )}

      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent>
          <DialogHeader><DialogTitle>Покани нов член</DialogTitle></DialogHeader>
          <div className="space-y-4 py-2">
            <div>
              <Label>Имейл *</Label>
              <Input type="email" value={inviteEmail} onChange={(e) => setInviteEmail(e.target.value)} className="mt-1" placeholder="person@email.com" />
            </div>
            <div>
              <Label>Роля</Label>
              <Select value={inviteRole} onValueChange={(v) => setInviteRole(v as UserRole)}>
                <SelectTrigger className="mt-1"><SelectValue /></SelectTrigger>
                <SelectContent>
                  {(["manager", "waiter", "kitchen", "bar"] as UserRole[]).map((role) => (
                    <SelectItem key={role} value={role}>{ROLE_LABELS[role].bg}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setDialogOpen(false)}>Отказ</Button>
            <Button onClick={handleInvite} disabled={saving || !inviteEmail.trim()} className="bg-amber-900 hover:bg-amber-800">
              {saving ? "Изпращане..." : "Покани"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
