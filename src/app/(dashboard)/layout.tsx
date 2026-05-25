"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";
import {
  ClipboardList,
  ChefHat,
  Wine,
  UtensilsCrossed,
  MoreHorizontal,
  Grid3X3,
  Users,
  BarChart3,
  Settings,
  LogOut,
  X,
} from "lucide-react";
import { createClient } from "@/lib/supabase/client";

const bottomNav = [
  { href: "/dashboard", label: "Поръчки", icon: ClipboardList },
  { href: "/dashboard/kitchen", label: "Кухня", icon: ChefHat },
  { href: "/dashboard/bar", label: "Бар", icon: Wine },
  { href: "/dashboard/menu", label: "Меню", icon: UtensilsCrossed },
];

const moreItems = [
  { href: "/dashboard/tables", label: "Маси и QR", icon: Grid3X3 },
  { href: "/dashboard/staff", label: "Персонал", icon: Users },
  { href: "/dashboard/analytics", label: "Статистика", icon: BarChart3 },
  { href: "/dashboard/settings", label: "Настройки", icon: Settings },
];

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const router = useRouter();
  const [showMore, setShowMore] = useState(false);

  const isMoreActive = moreItems.some((item) => pathname.startsWith(item.href));

  async function handleLogout() {
    const supabase = createClient();
    await supabase.auth.signOut();
    router.push("/login");
  }

  return (
    <div className="flex min-h-screen flex-col bg-gray-50">
      <header className="sticky top-0 z-50 flex h-14 items-center justify-between border-b bg-white px-4">
        <h1 className="font-playfair text-lg font-bold text-amber-900">MasaPay</h1>
      </header>

      <main className="flex-1 overflow-auto pb-20">{children}</main>

      {/* More menu overlay */}
      {showMore && (
        <div className="fixed inset-0 z-50 flex flex-col justify-end">
          <div className="absolute inset-0 bg-black/40" onClick={() => setShowMore(false)} />
          <div className="relative rounded-t-2xl bg-white pb-20 pt-4">
            <div className="mb-2 flex items-center justify-between px-4">
              <h2 className="text-sm font-semibold text-gray-500">Още</h2>
              <button onClick={() => setShowMore(false)} className="rounded-full p-1 hover:bg-gray-100">
                <X className="h-5 w-5 text-gray-400" />
              </button>
            </div>
            <div className="grid grid-cols-2 gap-2 px-4">
              {moreItems.map((item) => {
                const isActive = pathname.startsWith(item.href);
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => setShowMore(false)}
                    className={`flex items-center gap-3 rounded-xl p-3 ${
                      isActive ? "bg-amber-50 text-amber-900" : "text-gray-700 hover:bg-gray-50"
                    }`}
                  >
                    <item.icon className="h-5 w-5" />
                    <span className="text-sm font-medium">{item.label}</span>
                  </Link>
                );
              })}
            </div>
            <div className="mt-4 px-4">
              <button
                onClick={handleLogout}
                className="flex w-full items-center gap-3 rounded-xl p-3 text-red-600 hover:bg-red-50"
              >
                <LogOut className="h-5 w-5" />
                <span className="text-sm font-medium">Изход</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Bottom navigation */}
      <nav className="fixed bottom-0 left-0 right-0 z-40 border-t bg-white safe-area-bottom">
        <div className="flex items-stretch">
          {bottomNav.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex flex-1 flex-col items-center gap-0.5 py-2 text-[10px] ${
                  isActive ? "text-amber-900" : "text-gray-400 hover:text-gray-600"
                }`}
              >
                <item.icon className="h-5 w-5" />
                {item.label}
              </Link>
            );
          })}
          <button
            onClick={() => setShowMore(!showMore)}
            className={`flex flex-1 flex-col items-center gap-0.5 py-2 text-[10px] ${
              isMoreActive ? "text-amber-900" : "text-gray-400 hover:text-gray-600"
            }`}
          >
            <MoreHorizontal className="h-5 w-5" />
            Още
          </button>
        </div>
      </nav>
    </div>
  );
}
