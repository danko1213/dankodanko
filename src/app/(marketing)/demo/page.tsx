import Link from "next/link";
import { Smartphone, ArrowRight } from "lucide-react";

export const metadata = { title: "Демо" };

export default function DemoPage() {
  return (
    <section className="py-16">
      <div className="mx-auto max-w-2xl px-4 text-center">
        <h1 className="font-playfair text-3xl font-bold text-gray-900 md:text-4xl">
          Опитайте демо менюто
        </h1>
        <p className="mt-4 text-gray-600">
          Вижте как изглежда MasaPay от гледна точка на госта. Разгледайте менюто,
          добавете продукти в кошницата и направете тестова поръчка.
        </p>

        <div className="mt-10 flex flex-col items-center">
          {/* Phone mockup */}
          <div className="rounded-[2.5rem] border-[6px] border-gray-800 bg-gray-800 p-1.5 shadow-2xl">
            <div className="relative h-[600px] w-[290px] overflow-hidden rounded-[2rem] bg-white">
              <iframe
                src="/m/demo-t1"
                className="h-full w-full border-0"
                title="MasaPay Демо Меню"
              />
            </div>
          </div>
        </div>

        <div className="mt-8 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
          <Link
            href="/m/demo-t1"
            className="inline-flex items-center gap-2 rounded-full bg-amber-900 px-6 py-3 font-medium text-white transition-colors hover:bg-amber-800"
          >
            Отвори на цял екран
            <ArrowRight className="h-4 w-4" />
          </Link>
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 rounded-full border-2 border-amber-900 px-6 py-3 font-medium text-amber-900 transition-colors hover:bg-amber-50"
          >
            Искам го за моя ресторант
          </Link>
        </div>

        <p className="mt-6 text-sm text-gray-500">
          Това е напълно функционално демо. Можете да разглеждате менюто и да правите тестови поръчки.
        </p>
      </div>
    </section>
  );
}
