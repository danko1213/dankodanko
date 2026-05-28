import { MessageCircle } from "lucide-react";
import { MarketingNav } from "@/components/marketing-v2/nav";
import { MarketingFooter } from "@/components/marketing-v2/footer";
import { RevealOnScroll } from "@/components/marketing-v2/reveals";
import "./masapay-v2.css";

export default function MarketingLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="mp-v2">
      <MarketingNav />
      <main>{children}</main>
      <MarketingFooter />
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
