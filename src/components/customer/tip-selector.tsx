"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";

interface TipSelectorProps {
  tipPercent: number | null;
  tipCustom: number | null;
  subtotal: number;
  lang: "bg" | "en";
  onChangeTip: (percent: number | null, custom: number | null) => void;
}

const TIP_OPTIONS = [5, 10, 15];

export function TipSelector({ tipPercent, tipCustom, subtotal, lang, onChangeTip }: TipSelectorProps) {
  const [showCustom, setShowCustom] = useState(tipCustom !== null && tipCustom > 0);

  function handlePreset(pct: number) {
    if (tipPercent === pct) {
      onChangeTip(null, null);
    } else {
      setShowCustom(false);
      onChangeTip(pct, null);
    }
  }

  function handleCustom() {
    setShowCustom(true);
    onChangeTip(null, tipCustom || 0);
  }

  function handleCustomChange(val: string) {
    const num = parseFloat(val) || 0;
    onChangeTip(null, num);
  }

  return (
    <div>
      <h3 className="text-sm font-semibold text-gray-900">
        {lang === "en" ? "Tip" : "Бакшиш"}
      </h3>
      <div className="mt-2 flex gap-2">
        {TIP_OPTIONS.map((pct) => {
          const isActive = tipPercent === pct && !showCustom;
          const amount = Math.round(subtotal * pct / 100 * 100) / 100;
          return (
            <button
              key={pct}
              onClick={() => handlePreset(pct)}
              className={`flex-1 rounded-xl border px-2 py-2.5 text-center transition-colors ${
                isActive
                  ? "border-amber-500 bg-amber-50 text-amber-900"
                  : "border-gray-200 hover:bg-gray-50"
              }`}
            >
              <div className="text-sm font-semibold">{pct}%</div>
              <div className="text-xs text-gray-500">{amount.toFixed(2)} €</div>
            </button>
          );
        })}
        <button
          onClick={handleCustom}
          className={`flex-1 rounded-xl border px-2 py-2.5 text-center transition-colors ${
            showCustom
              ? "border-amber-500 bg-amber-50 text-amber-900"
              : "border-gray-200 hover:bg-gray-50"
          }`}
        >
          <div className="text-sm font-semibold">{lang === "en" ? "Other" : "Друга"}</div>
          <div className="text-xs text-gray-500">{lang === "en" ? "amount" : "сума"}</div>
        </button>
      </div>
      {showCustom && (
        <div className="mt-2">
          <Input
            type="number"
            step="0.50"
            min="0"
            placeholder="0.00"
            value={tipCustom || ""}
            onChange={(e) => handleCustomChange(e.target.value)}
            className="text-center"
          />
        </div>
      )}
    </div>
  );
}
