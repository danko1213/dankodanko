"use client";

interface LanguageToggleProps {
  lang: "bg" | "en";
  onToggle: () => void;
}

export function LanguageToggle({ lang, onToggle }: LanguageToggleProps) {
  return (
    <button
      onClick={onToggle}
      className="rounded-full bg-gray-100 px-3 py-1 text-xs font-medium text-gray-700 hover:bg-gray-200"
    >
      {lang === "bg" ? "EN" : "BG"}
    </button>
  );
}
