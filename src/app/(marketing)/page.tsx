import Link from "next/link";
import { QrCode, ChefHat, BarChart3, Clock, Smartphone, Users } from "lucide-react";

export default function HomePage() {
  return (
    <>
      {/* Hero */}
      <section className="relative bg-gradient-to-br from-amber-50 to-orange-50 py-20 md:py-32">
        <div className="mx-auto max-w-6xl px-4 text-center">
          <div className="mb-6 inline-block rounded-full bg-amber-100 px-4 py-1.5 text-sm font-medium text-amber-900">
            Първият месец безплатно
          </div>
          <h1 className="font-playfair text-4xl font-bold leading-tight text-gray-900 md:text-6xl">
            Дигитално меню и поръчки
            <br />
            <span className="text-amber-900">за вашия ресторант</span>
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-lg text-gray-600">
            По-малко персонал, повече приходи, нула грешки в поръчките.
            Гостите сканират QR код, поръчват и плащат от телефона си.
          </p>
          <div className="mt-8 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
            <Link
              href="/contact"
              className="rounded-full bg-amber-900 px-8 py-3.5 text-lg font-medium text-white transition-colors hover:bg-amber-800"
            >
              Свържете се с нас
            </Link>
            <Link
              href="/demo"
              className="rounded-full border-2 border-amber-900 px-8 py-3.5 text-lg font-medium text-amber-900 transition-colors hover:bg-amber-50"
            >
              Вижте демо
            </Link>
          </div>
        </div>
      </section>

      {/* How it works */}
      <section id="how-it-works" className="py-20">
        <div className="mx-auto max-w-6xl px-4">
          <h2 className="text-center font-playfair text-3xl font-bold text-gray-900 md:text-4xl">
            Как работи
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-center text-gray-600">
            Три прости стъпки за вашите гости
          </p>
          <div className="mt-12 grid gap-8 md:grid-cols-3">
            {[
              {
                step: "1",
                icon: QrCode,
                title: "Сканирай",
                desc: "Гостът сканира QR кода на масата с телефона си",
              },
              {
                step: "2",
                icon: Smartphone,
                title: "Поръчай",
                desc: "Разглежда менюто, избира и поръчва директно от телефона",
              },
              {
                step: "3",
                icon: ChefHat,
                title: "Получи",
                desc: "Поръчката отива директно в кухнята. Без чакане, без грешки.",
              },
            ].map((item) => (
              <div key={item.step} className="text-center">
                <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-amber-100">
                  <item.icon className="h-8 w-8 text-amber-900" />
                </div>
                <h3 className="mt-4 text-xl font-semibold text-gray-900">{item.title}</h3>
                <p className="mt-2 text-gray-600">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="bg-gray-50 py-20">
        <div className="mx-auto max-w-6xl px-4">
          <h2 className="text-center font-playfair text-3xl font-bold text-gray-900 md:text-4xl">
            Всичко, от което се нуждаете
          </h2>
          <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {[
              {
                icon: QrCode,
                title: "QR Поръчки",
                desc: "Уникален QR код за всяка маса. Без приложение, работи от браузъра.",
              },
              {
                icon: Clock,
                title: "В реално време",
                desc: "Поръчките се появяват моментално в кухнята и на бара.",
              },
              {
                icon: ChefHat,
                title: "Кухня & Бар",
                desc: "Автоматично разделяне на поръчките между кухня и бар.",
              },
              {
                icon: BarChart3,
                title: "Статистика",
                desc: "Продажби, бакшиши, популярни продукти — всичко на едно място.",
              },
              {
                icon: Users,
                title: "По-малко персонал",
                desc: "Намалете нуждата от сервитьори. Повече ефективност.",
              },
              {
                icon: Smartphone,
                title: "Мобилно оптимизирано",
                desc: "Перфектно изживяване на телефон за гости и персонал.",
              },
            ].map((feature) => (
              <div
                key={feature.title}
                className="rounded-2xl bg-white p-6 shadow-sm transition-shadow hover:shadow-md"
              >
                <feature.icon className="h-10 w-10 text-amber-900" />
                <h3 className="mt-3 text-lg font-semibold text-gray-900">{feature.title}</h3>
                <p className="mt-1 text-sm text-gray-600">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-amber-900 py-20">
        <div className="mx-auto max-w-3xl px-4 text-center">
          <h2 className="font-playfair text-3xl font-bold text-white md:text-4xl">
            Готови ли сте да модернизирате ресторанта си?
          </h2>
          <p className="mt-4 text-lg text-amber-100">
            Първият месец е безплатно. Ние ще настроим всичко за вас.
          </p>
          <Link
            href="/contact"
            className="mt-8 inline-block rounded-full bg-white px-8 py-3.5 text-lg font-medium text-amber-900 transition-colors hover:bg-amber-50"
          >
            Свържете се с нас
          </Link>
        </div>
      </section>
    </>
  );
}
