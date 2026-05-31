import { getLocale, t } from "@/lib/i18n";
import { ContactForm } from "./contact-form";

export default async function ContactPage() {
  const lang = await getLocale();
  const m = t(lang).marketing.contactPage;
  return <ContactForm m={m} />;
}
