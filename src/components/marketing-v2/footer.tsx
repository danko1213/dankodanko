import Image from "next/image";
import Link from "next/link";
import type { Translations } from "@/lib/i18n";

interface MarketingFooterProps {
  m: Translations["marketing"]["footer"];
  ariaHome: string;
}

export function MarketingFooter({ m, ariaHome }: MarketingFooterProps) {
  return (
    <footer className="mp-footer">
      <div className="mp-foot-inner">
        <div className="mp-foot-brand">
          <Link href="/" className="mp-brand" aria-label={ariaHome}>
            <span className="mp-brand-img">
              <Image src="/images/marketing/masapay-logo-icon.png" alt="" width={120} height={120} />
            </span>
          </Link>
          <p>{m.tagline}</p>
        </div>
        <div className="mp-foot-col">
          <h4>{m.hProduct}</h4>
          <Link href="/features">{m.features}</Link>
          <Link href="/how-it-works">{m.howItWorks}</Link>
          <Link href="/#pricing">{m.pricing}</Link>
          <Link href="/demo">{m.demoMenu}</Link>
        </div>
        <div className="mp-foot-col">
          <h4>{m.hCompany}</h4>
          <Link href="/about">{m.about}</Link>
          <Link href="/contact">{m.contact}</Link>
          <Link href="/privacy">{m.privacy}</Link>
          <Link href="/terms">{m.terms}</Link>
        </div>
        <div className="mp-foot-col">
          <h4>{m.hSupport}</h4>
          <a href="tel:+359885202277">+359 88 520 2277</a>
          <a href="mailto:hello@masapay.eu">hello@masapay.eu</a>
          <a href="https://wa.me/359885202277" target="_blank" rel="noopener noreferrer">{m.whatsapp}</a>
        </div>
      </div>
      <div className="mp-foot-bottom">
        <span>© {new Date().getFullYear()} {m.copyright}</span>
        <span>{m.madeWith}</span>
      </div>
    </footer>
  );
}
