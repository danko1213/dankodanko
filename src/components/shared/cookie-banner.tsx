"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";

type Consent = "none" | "necessary" | "all";

export function CookieBanner() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem("masapay-cookie-consent") as Consent | null;
    if (!consent) setVisible(true);
  }, []);

  function handleConsent(level: Consent) {
    localStorage.setItem("masapay-cookie-consent", level);
    setVisible(false);
    if (level === "all") {
      window.dispatchEvent(new Event("cookie-consent-granted"));
    }
  }

  if (!visible) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-[60] border-t bg-white p-4 shadow-lg safe-area-bottom">
      <div className="mx-auto max-w-3xl">
        <p className="text-sm text-gray-600">
          Този сайт използва бисквитки за подобряване на вашето изживяване.
          Аналитичните бисквитки се зареждат само с вашето съгласие.{" "}
          <a href="/privacy" className="text-amber-900 underline">Научете повече</a>
        </p>
        <div className="mt-3 flex gap-2">
          <Button
            size="sm"
            variant="outline"
            onClick={() => handleConsent("necessary")}
          >
            Само необходими
          </Button>
          <Button
            size="sm"
            onClick={() => handleConsent("all")}
            className="bg-amber-900 hover:bg-amber-800"
          >
            Приемам всички
          </Button>
        </div>
      </div>
    </div>
  );
}
