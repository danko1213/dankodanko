"use client";

import { useState } from "react";
import Link from "next/link";
import { MessageCircle, Menu, X } from "lucide-react";

const navLinks = [
  { href: "/#how-it-works", label: "Как работи" },
  { href: "/demo", label: "Демо" },
  { href: "/contact", label: "Контакти" },
];

export default function MarketingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <>
      <header className="sticky top-0 z-50 border-b bg-white/80 backdrop-blur-md">
        <nav className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4">
          <Link href="/" className="font-playfair text-2xl font-bold text-amber-900">
            MasaPay
          </Link>

          {/* Desktop */}
          <div className="hidden items-center gap-6 md:flex">
            {navLinks.map((l) => (
              <Link key={l.href} href={l.href} className="text-sm text-gray-600 hover:text-amber-900">{l.label}</Link>
            ))}
            <Link href="/login" className="rounded-full bg-amber-900 px-5 py-2 text-sm font-medium text-white transition-colors hover:bg-amber-800">
              Вход
            </Link>
          </div>

          {/* Mobile toggle */}
          <button onClick={() => setMobileOpen(!mobileOpen)} className="rounded-lg p-2 hover:bg-gray-100 md:hidden">
            {mobileOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </nav>

        {/* Mobile menu */}
        {mobileOpen && (
          <div className="border-t bg-white px-4 pb-4 md:hidden">
            {navLinks.map((l) => (
              <Link key={l.href} href={l.href} onClick={() => setMobileOpen(false)} className="block py-3 text-gray-700 hover:text-amber-900">
                {l.label}
              </Link>
            ))}
            <Link href="/login" onClick={() => setMobileOpen(false)} className="mt-2 block rounded-full bg-amber-900 py-2.5 text-center text-sm font-medium text-white">
              Вход
            </Link>
          </div>
        )}
      </header>

      <main className="flex-1">{children}</main>

      <footer className="border-t bg-gray-50">
        <div className="mx-auto max-w-6xl px-4 py-12">
          <div className="grid gap-8 md:grid-cols-3">
            <div>
              <h3 className="font-playfair text-xl font-bold text-amber-900">MasaPay</h3>
              <p className="mt-2 text-sm text-gray-600">
                Дигитално меню и поръчки за ресторанти и кафенета в София.
              </p>
            </div>
            <div>
              <h4 className="font-semibold text-gray-900">Навигация</h4>
              <div className="mt-2 flex flex-col gap-2">
                {navLinks.map((l) => (
                  <Link key={l.href} href={l.href} className="text-sm text-gray-600 hover:text-amber-900">{l.label}</Link>
                ))}
              </div>
            </div>
            <div>
              <h4 className="font-semibold text-gray-900">Правна информация</h4>
              <div className="mt-2 flex flex-col gap-2">
                <Link href="/privacy" className="text-sm text-gray-600 hover:text-amber-900">Политика за поверителност</Link>
                <Link href="/terms" className="text-sm text-gray-600 hover:text-amber-900">Общи условия</Link>
              </div>
            </div>
          </div>
          <div className="mt-8 border-t pt-8 text-center text-sm text-gray-500">
            &copy; {new Date().getFullYear()} MasaPay. Всички права запазени.
          </div>
        </div>
      </footer>

      <a
        href="https://wa.me/359885202277"
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-6 left-6 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-green-500 text-white shadow-lg transition-transform hover:scale-110"
        aria-label="WhatsApp"
      >
        <MessageCircle className="h-7 w-7" />
      </a>
    </>
  );
}
