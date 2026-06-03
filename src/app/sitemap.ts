import type { MetadataRoute } from "next";

export const dynamic = "force-static";

const BASE = "https://www.masapay.eu";

const MARKETING_RELEASE = new Date("2026-06-02T00:00:00Z");
const LEGAL_UPDATED = new Date("2026-05-25T00:00:00Z");

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: `${BASE}/`,             changeFrequency: "weekly",  priority: 1.0, lastModified: MARKETING_RELEASE },
    { url: `${BASE}/features`,     changeFrequency: "monthly", priority: 0.9, lastModified: MARKETING_RELEASE },
    { url: `${BASE}/how-it-works`, changeFrequency: "monthly", priority: 0.9, lastModified: MARKETING_RELEASE },
    { url: `${BASE}/pricing`,      changeFrequency: "monthly", priority: 0.9, lastModified: MARKETING_RELEASE },
    { url: `${BASE}/demo`,         changeFrequency: "monthly", priority: 0.8, lastModified: MARKETING_RELEASE },
    { url: `${BASE}/about`,        changeFrequency: "monthly", priority: 0.6, lastModified: MARKETING_RELEASE },
    { url: `${BASE}/contact`,      changeFrequency: "monthly", priority: 0.6, lastModified: MARKETING_RELEASE },
    { url: `${BASE}/privacy`,      changeFrequency: "yearly",  priority: 0.3, lastModified: LEGAL_UPDATED },
    { url: `${BASE}/terms`,        changeFrequency: "yearly",  priority: 0.3, lastModified: LEGAL_UPDATED },
  ];
}
