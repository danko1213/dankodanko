import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Страницата не е намерена",
  description: "Страницата, която търсите, не съществува или е преместена.",
  robots: { index: false, follow: false },
};

export default function NotFound() {
  return (
    <main
      style={{
        minHeight: "60vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        padding: "4rem 1.5rem",
        textAlign: "center",
        fontFamily: "system-ui, sans-serif",
      }}
    >
      <p style={{ fontSize: 14, letterSpacing: "0.18em", color: "#888", marginBottom: 12 }}>
        404 · NOT FOUND
      </p>
      <h1 style={{ fontSize: 32, fontWeight: 700, marginBottom: 8 }}>
        Страницата не е намерена
      </h1>
      <p style={{ color: "#555", marginBottom: 28, maxWidth: 480 }}>
        Линкът може да е грешен или страницата да е преместена.
      </p>
      <Link
        href="/"
        style={{
          display: "inline-block",
          padding: "12px 22px",
          borderRadius: 999,
          background: "#0f9d58",
          color: "#fff",
          textDecoration: "none",
          fontWeight: 600,
        }}
      >
        Към началото
      </Link>
    </main>
  );
}
