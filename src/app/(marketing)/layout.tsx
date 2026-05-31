import { MessageCircle } from "lucide-react";
import { MarketingNav } from "@/components/marketing-v2/nav";
import { MarketingFooter } from "@/components/marketing-v2/footer";
import { RevealOnScroll } from "@/components/marketing-v2/reveals";
import { getLocale, t } from "@/lib/i18n";
import "./masapay-v2.css";

export default async function MarketingLayout({ children }: { children: React.ReactNode }) {
  const lang = await getLocale();
  const tr = t(lang);
  return (
    <div className="mp-v2">
      <MarketingNav initialLang={lang} m={tr.marketing.nav} />
      <main>{children}</main>
      <MarketingFooter m={tr.marketing.footer} ariaHome={tr.marketing.nav.ariaHome} />
      <a
        href="https://wa.me/359885202277"
        target="_blank"
        rel="noopener noreferrer"
        className="mp-fab"
        aria-label="WhatsApp"
      >
        <MessageCircle size={26} />
      </a>
      <RevealOnScroll />
    </div>
  );
}
