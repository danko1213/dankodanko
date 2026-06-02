import type { Metadata } from "next";
import { getLocale, t } from "@/lib/i18n";

export const revalidate = 86400;

export async function generateMetadata(): Promise<Metadata> {
  const lang = await getLocale();
  const m = t(lang).marketing.terms;
  return {
    title: m.metaTitle,
    description: m.metaDesc,
    alternates: { canonical: "/terms" },
  };
}

export default async function TermsPage() {
  const lang = await getLocale();
  const m = t(lang).marketing.terms;
  return (
    <section className="py-16">
      <div className="prose prose-gray mx-auto max-w-3xl px-4">
        <h1 className="font-playfair">{m.h1}</h1>
        <p className="lead">{m.lastUpdated}</p>

        <h2>{m.s1H}</h2>
        <p>{m.s1P}</p>

        <h2>{m.s2H}</h2>
        <h3>{m.s2sub1H}</h3>
        <p>{m.s2sub1P}</p>

        <h3>{m.s2sub2H}</h3>
        <p>{m.s2sub2P}</p>

        <h2>{m.s3H}</h2>
        <p>{m.s3P}</p>

        <h2>{m.s4H}</h2>
        <p>{m.s4P}</p>

        <h2>{m.s5H}</h2>
        <p>{m.s5P}</p>

        <h2>{m.s6H}</h2>
        <p>{m.s6P}</p>

        <h2>{m.s7H}</h2>
        <p>{m.s7P}</p>

        <h2>{m.s8H}</h2>
        <p>{m.s8P}</p>

        <h2>{m.s9H}</h2>
        <p>{m.s9P}</p>
      </div>
    </section>
  );
}
