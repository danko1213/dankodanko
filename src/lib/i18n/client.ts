"use client";

import type { Language } from "./index";

export const LANG_COOKIE = "mp_lang";

export function readLangCookie(): Language {
  if (typeof document === "undefined") return "bg";
  const m = document.cookie.match(/(?:^|;\s*)mp_lang=([^;]+)/);
  return m && m[1] === "en" ? "en" : "bg";
}

export function writeLangCookie(lang: Language) {
  if (typeof document === "undefined") return;
  const oneYear = 60 * 60 * 24 * 365;
  document.cookie = `${LANG_COOKIE}=${lang}; path=/; max-age=${oneYear}; SameSite=Lax`;
}
