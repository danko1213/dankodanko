import type { MetadataRoute } from "next";

export const dynamic = "force-static";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "MasaPay — Дигитално меню и поръчки за ресторанти",
    short_name: "MasaPay",
    description:
      "QR система за поръчки в ресторанти и кафенета. По-малко персонал, повече приходи, нула грешки.",
    lang: "bg",
    start_url: "/",
    display: "standalone",
    background_color: "#ffffff",
    theme_color: "#0f9d58",
    icons: [
      { src: "/icon.png", sizes: "512x512", type: "image/png", purpose: "any" },
      { src: "/apple-icon.png", sizes: "180x180", type: "image/png", purpose: "any" },
    ],
  };
}
