import type { UserRole } from "@/lib/types/database";

export const ROLE_LABELS: Record<UserRole, { bg: string; en: string }> = {
  owner: { bg: "Собственик", en: "Owner" },
  admin: { bg: "Администратор", en: "Admin" },
  manager: { bg: "Мениджър", en: "Manager" },
  waiter: { bg: "Сервитьор", en: "Waiter" },
  kitchen: { bg: "Кухня", en: "Kitchen" },
  bar: { bg: "Бар", en: "Bar" },
};

export const ROLE_PERMISSIONS: Record<UserRole, string[]> = {
  owner: ["orders", "menu", "tables", "staff", "analytics", "settings"],
  admin: ["orders", "menu", "tables", "staff", "analytics", "settings"],
  manager: ["orders", "menu", "tables", "staff", "analytics"],
  waiter: ["orders"],
  kitchen: ["orders:kitchen"],
  bar: ["orders:bar"],
};
