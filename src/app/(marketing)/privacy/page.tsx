import type { Metadata } from "next";
import { getLocale, t } from "@/lib/i18n";

export async function generateMetadata(): Promise<Metadata> {
  const lang = await getLocale();
  return { title: t(lang).marketing.privacy.metaTitle };
}

export default async function PrivacyPage() {
  const lang = await getLocale();
  const m = t(lang).marketing.privacy;
  return (
    <section className="py-16">
      <div className="prose prose-gray mx-auto max-w-3xl px-4">
        <h1 className="font-playfair">{m.h1}</h1>
        <p className="lead">{m.lastUpdated}</p>

        <h2>{m.s1H}</h2>
        <p>{m.s1P}</p>

        <h2>{m.s2H}</h2>
        <h3>{m.s2sub1H}</h3>
        <ul>
          <li>{m.s2sub1L1}</li>
          <li>{m.s2sub1L2}</li>
          <li>{m.s2sub1L3}</li>
        </ul>
        <p>
          <strong>{m.s2sub1NoteA}</strong>{m.s2sub1NoteB}
        </p>

        <h3>{m.s2sub2H}</h3>
        <ul>
          <li>{m.s2sub2L1}</li>
          <li>{m.s2sub2L2}</li>
          <li>{m.s2sub2L3}</li>
        </ul>

        <h3>{m.s2sub3H}</h3>
        <ul>
          <li>{m.s2sub3L1}</li>
        </ul>

        <h2>{m.s3H}</h2>
        <ul>
          <li>{m.s3L1}</li>
          <li>{m.s3L2}</li>
          <li>{m.s3L3}</li>
          <li>{m.s3L4}</li>
        </ul>

        <h2>{m.s4H}</h2>
        <p>{m.s4P}</p>

        <h2>{m.s5H}</h2>
        <p>{m.s5P}</p>

        <h2>{m.s6H}</h2>
        <p>{m.s6Intro}</p>
        <ul>
          <li>{m.s6L1}</li>
          <li>{m.s6L2}</li>
          <li>{m.s6L3}</li>
          <li>{m.s6L4}</li>
          <li>{m.s6L5}</li>
          <li>{m.s6L6}</li>
        </ul>

        <h2>{m.s7H}</h2>
        <p>
          {m.s7P} <br />
          {m.s7WA}
        </p>
      </div>
    </section>
  );
}
