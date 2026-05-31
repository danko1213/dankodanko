import { cookies } from "next/headers";
import { bg } from "./bg";
import { en } from "./en";

export type Language = "bg" | "en";

type DeepStringify<T> = {
  [K in keyof T]: T[K] extends string ? string : DeepStringify<T[K]>;
};

export type Translations = DeepStringify<typeof bg>;

const translations: Record<Language, Translations> = { bg, en };

export const LANG_COOKIE = "mp_lang";

export function t(lang: Language = "bg") {
  return translations[lang];
}

export async function getLocale(): Promise<Language> {
  const c = await cookies();
  const v = c.get(LANG_COOKIE)?.value;
  return v === "en" ? "en" : "bg";
}
