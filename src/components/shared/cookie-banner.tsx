"use client";

import { useState, useEffect } from "react";

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
    <div className="masapay-cookie-banner">
      <div className="masapay-cookie-inner">
        <p>
          Този сайт използва бисквитки за подобряване на вашето изживяване.
          Аналитичните бисквитки се зареждат само с вашето съгласие.{" "}
          <a href="/privacy">Научете повече</a>
        </p>
        <div className="masapay-cookie-actions">
          <button
            type="button"
            className="masapay-cookie-btn ghost"
            onClick={() => handleConsent("necessary")}
          >
            Само необходими
          </button>
          <button
            type="button"
            className="masapay-cookie-btn solid"
            onClick={() => handleConsent("all")}
          >
            Приемам всички
          </button>
        </div>
      </div>
    </div>
  );
}
