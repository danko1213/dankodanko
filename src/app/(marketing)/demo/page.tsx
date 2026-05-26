import Link from "next/link";
import { ArrowRight, Smartphone } from "lucide-react";

export const metadata = { title: "Демо" };

const demos = [
  {
    number: "Demo 1",
    title: "Brunch menu",
    description: "Airy breakfast and specialty coffee menu built for cafes and brunch spots.",
    href: "/menus/brunch",
    accent: "bg-emerald-50 text-emerald-900 border-emerald-100",
  },
  {
    number: "Demo 2",
    title: "Cocktail bar",
    description: "Dark neon house-bar menu with energetic drink cards and club styling.",
    href: "/menus/cocktails",
    accent: "bg-fuchsia-50 text-fuchsia-900 border-fuchsia-100",
  },
  {
    number: "Demo 3",
    title: "Bulgarian restaurant",
    description: "Traditional warm menu with ingredients and allergen labels for every dish.",
    href: "/menus/bulgarian",
    accent: "bg-amber-50 text-amber-950 border-amber-100",
  },
];

export default function DemoPage() {
  return (
    <section className="bg-gray-50 py-12 md:py-16">
      <div className="mx-auto max-w-6xl px-4">
        <div className="mx-auto max-w-2xl text-center">
          <h1 className="font-playfair text-3xl font-bold text-gray-900 md:text-4xl">
            Изберете демо меню
          </h1>
          <p className="mt-4 text-gray-600">
            Три готови визуални примера за различни типове заведения. Всеки пример е оптимизиран за телефон, както го вижда гостът след сканиране на QR код.
          </p>
        </div>

        <div className="mt-10 grid gap-8 lg:grid-cols-3">
          {demos.map((demo) => (
            <article key={demo.href} className="rounded-lg border bg-white p-4 shadow-sm">
              <div className="mb-4 flex items-center justify-between gap-3">
                <div>
                  <p className="text-xs font-bold uppercase tracking-[0.2em] text-amber-900">{demo.number}</p>
                  <h2 className="mt-1 text-xl font-bold text-gray-900">{demo.title}</h2>
                </div>
                <span className={`rounded-full border p-2 ${demo.accent}`}>
                  <Smartphone className="h-5 w-5" />
                </span>
              </div>

              <div className="mx-auto w-full max-w-[292px] rounded-[2.4rem] border-[6px] border-gray-900 bg-gray-900 p-1.5 shadow-xl">
                <div className="relative h-[560px] overflow-hidden rounded-[1.85rem] bg-white">
                  <iframe
                    src={demo.href}
                    className="h-full w-full border-0"
                    title={`${demo.number} ${demo.title}`}
                  />
                </div>
              </div>

              <p className="mt-4 min-h-12 text-sm leading-6 text-gray-600">{demo.description}</p>
              <Link
                href={demo.href}
                className="mt-4 inline-flex w-full items-center justify-center gap-2 rounded-full bg-amber-900 px-5 py-3 text-sm font-medium text-white transition-colors hover:bg-amber-800"
              >
                Отвори {demo.number}
                <ArrowRight className="h-4 w-4" />
              </Link>
            </article>
          ))}
        </div>

        <div className="mt-10 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
          <Link
            href="/m/demo-t1"
            className="inline-flex items-center gap-2 rounded-full border-2 border-amber-900 px-6 py-3 font-medium text-amber-900 transition-colors hover:bg-amber-50"
          >
            Старото функционално демо
            <ArrowRight className="h-4 w-4" />
          </Link>
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 rounded-full border-2 border-amber-900 px-6 py-3 font-medium text-amber-900 transition-colors hover:bg-amber-50"
          >
            Искам го за моя ресторант
          </Link>
        </div>

        <p className="mt-6 text-center text-sm text-gray-500">
          Визуалните демота показват различни стилове менюта. Старото функционално демо остава достъпно за тестова поръчка.
        </p>
      </div>
    </section>
  );
}
