import { bg } from "./bg";
import { en } from "./en";

export type Language = "bg" | "en";

type DeepStringify<T> = {
  [K in keyof T]: T[K] extends string ? string : DeepStringify<T[K]>;
};

export type Translations = DeepStringify<typeof bg>;

const translations: Record<Language, Translations> = { bg, en };

export function t(lang: Language = "bg") {
  return translations[lang];
}
