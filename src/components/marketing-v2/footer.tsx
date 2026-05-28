import Image from "next/image";
import Link from "next/link";

export function MarketingFooter() {
  return (
    <footer className="mp-footer">
      <div className="mp-foot-inner">
        <div className="mp-foot-brand">
          <Link href="/" className="mp-brand" aria-label="MasaPay начало">
            <span className="mp-brand-img">
              <Image src="/images/marketing/masapay-logo.png" alt="" width={120} height={120} />
            </span>
          </Link>
          <p>Дигиталното меню за съвременното заведение.</p>
        </div>
        <div className="mp-foot-col">
          <h4>ПРОДУКТ</h4>
          <Link href="/features">Функции</Link>
          <Link href="/how-it-works">Как работи</Link>
          <Link href="/#pricing">Цени</Link>
          <Link href="/demo">Демо меню</Link>
        </div>
        <div className="mp-foot-col">
          <h4>КОМПАНИЯ</h4>
          <Link href="/about">За нас</Link>
          <Link href="/contact">Контакти</Link>
          <Link href="/privacy">Поверителност</Link>
          <Link href="/terms">Условия</Link>
        </div>
        <div className="mp-foot-col">
          <h4>ПОДДРЪЖКА</h4>
          <a href="tel:+359885202277">+359 88 520 2277</a>
          <a href="mailto:hello@masapay.eu">hello@masapay.eu</a>
          <a href="https://wa.me/359885202277" target="_blank" rel="noopener noreferrer">WhatsApp</a>
        </div>
      </div>
      <div className="mp-foot-bottom">
        <span>© {new Date().getFullYear()} MasaPay ООД · София</span>
        <span>Made with care in Sofia</span>
      </div>
    </footer>
  );
}
