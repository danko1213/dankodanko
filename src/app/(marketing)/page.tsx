"use client";

import { useState } from "react";
import Link from "next/link";
import {
  QrCode, Smartphone, ChefHat, Clock, TrendingUp, Users, ShieldCheck,
  BarChart3, Globe, Zap, Send, CheckCircle, MessageCircle,
  ArrowRight, Star, CreditCard, Bell,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";

export default function HomePage() {
  const [contactSubmitted, setContactSubmitted] = useState(false);
  const [contactLoading, setContactLoading] = useState(false);

  async function handleContact(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setContactLoading(true);
    const form = e.currentTarget;
    const data = new FormData(form);
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: data.get("name"),
          email: data.get("email"),
          phone: data.get("phone"),
          restaurant_name: data.get("restaurant_name"),
          message: data.get("message"),
        }),
      });
      if (res.ok) { setContactSubmitted(true); form.reset(); }
    } finally {
      setContactLoading(false);
    }
  }

  return (
    <>
      {/* ===== SECTION 1: HERO — What is MasaPay ===== */}
      <section className="relative overflow-hidden bg-gradient-to-br from-amber-50 via-orange-50 to-white py-20 md:py-28">
        <div className="mx-auto max-w-6xl px-4">
          <div className="grid items-center gap-12 md:grid-cols-2">
            <div>
              <div className="mb-5 inline-block rounded-full bg-amber-100 px-4 py-1.5 text-sm font-medium text-amber-900">
                Първият месец безплатно
              </div>
              <h1 className="font-playfair text-4xl font-bold leading-tight text-gray-900 md:text-5xl lg:text-6xl">
                Дигитално меню
                <br />
                <span className="text-amber-900">за вашия ресторант</span>
              </h1>
              <p className="mt-6 text-lg leading-relaxed text-gray-600">
                MasaPay е QR система за поръчки, която позволява на гостите ви да
                разглеждат менюто, поръчват и плащат директно от телефона си.
                Без чакане, без грешки, без допълнителен персонал.
              </p>
              <div className="mt-8 flex flex-col gap-4 sm:flex-row">
                <a
                  href="#contact"
                  className="rounded-full bg-amber-900 px-8 py-3.5 text-center text-lg font-medium text-white transition-colors hover:bg-amber-800"
                >
                  Свържете се с нас
                </a>
                <Link
                  href="/demo"
                  className="rounded-full border-2 border-amber-900 px-8 py-3.5 text-center text-lg font-medium text-amber-900 transition-colors hover:bg-amber-50"
                >
                  Вижте демо
                </Link>
              </div>
            </div>
            <div className="flex justify-center">
              {/* PLACEHOLDER: Hero image — phone mockup showing the menu */}
              <div className="relative">
                <div className="h-[420px] w-[320px] rounded-3xl border-2 border-dashed border-amber-300 bg-amber-50/50 flex flex-col items-center justify-center text-center p-8">
                  <Smartphone className="h-16 w-16 text-amber-300 mb-4" />
                  <p className="text-sm text-amber-400 font-medium">Placeholder: Hero Image</p>
                  <p className="text-xs text-amber-300 mt-1">Снимка на телефон с менюто на MasaPay</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===== SECTION 2: How it Works — Customer Experience ===== */}
      <section id="how-it-works" className="py-20 md:py-28">
        <div className="mx-auto max-w-6xl px-4">
          <div className="text-center">
            <h2 className="font-playfair text-3xl font-bold text-gray-900 md:text-4xl">
              Как работи за госта
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-gray-600">
              Три прости стъпки — от сканирането до сервирането
            </p>
          </div>

          <div className="mt-16 space-y-20">
            {/* Step 1 */}
            <div className="grid items-center gap-10 md:grid-cols-2">
              <div className="order-2 md:order-1">
                <div className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-amber-900 text-lg font-bold text-white">1</div>
                <h3 className="mt-4 text-2xl font-bold text-gray-900">Сканирай QR кода</h3>
                <p className="mt-3 text-gray-600 leading-relaxed">
                  Гостът сканира QR кода на масата с камерата на телефона си.
                  Без приложение, без регистрация — менюто се отваря моментално в браузъра.
                </p>
              </div>
              <div className="order-1 flex justify-center md:order-2">
                {/* PLACEHOLDER: Step 1 image — hand scanning QR code on table */}
                <div className="h-[280px] w-full max-w-[380px] rounded-2xl border-2 border-dashed border-gray-200 bg-gray-50 flex flex-col items-center justify-center p-6">
                  <QrCode className="h-12 w-12 text-gray-300 mb-3" />
                  <p className="text-sm text-gray-400 font-medium">Placeholder: Сканиране</p>
                  <p className="text-xs text-gray-300 mt-1">Снимка на гост, сканиращ QR код на масата</p>
                </div>
              </div>
            </div>

            {/* Step 2 */}
            <div className="grid items-center gap-10 md:grid-cols-2">
              <div className="flex justify-center">
                {/* PLACEHOLDER: Step 2 image — browsing menu on phone */}
                <div className="h-[280px] w-full max-w-[380px] rounded-2xl border-2 border-dashed border-gray-200 bg-gray-50 flex flex-col items-center justify-center p-6">
                  <Smartphone className="h-12 w-12 text-gray-300 mb-3" />
                  <p className="text-sm text-gray-400 font-medium">Placeholder: Менюто</p>
                  <p className="text-xs text-gray-300 mt-1">Скрийншот на менюто в телефона на госта</p>
                </div>
              </div>
              <div>
                <div className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-amber-900 text-lg font-bold text-white">2</div>
                <h3 className="mt-4 text-2xl font-bold text-gray-900">Разгледай и поръчай</h3>
                <p className="mt-3 text-gray-600 leading-relaxed">
                  Гостът разглежда менюто с категории, снимки и описания.
                  Избира размер, добавки, премахва съставки и добавя бележки.
                  Всичко — от телефона, без да чака сервитьор.
                </p>
              </div>
            </div>

            {/* Step 3 */}
            <div className="grid items-center gap-10 md:grid-cols-2">
              <div className="order-2 md:order-1">
                <div className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-amber-900 text-lg font-bold text-white">3</div>
                <h3 className="mt-4 text-2xl font-bold text-gray-900">Плати и получи</h3>
                <p className="mt-3 text-gray-600 leading-relaxed">
                  Гостът плаща директно от телефона, добавя бакшиш ако желае,
                  и поръчката отива моментално в кухнята и на бара.
                  Без грешки, без забавяне.
                </p>
              </div>
              <div className="order-1 flex justify-center md:order-2">
                {/* PLACEHOLDER: Step 3 image — payment confirmation screen */}
                <div className="h-[280px] w-full max-w-[380px] rounded-2xl border-2 border-dashed border-gray-200 bg-gray-50 flex flex-col items-center justify-center p-6">
                  <CreditCard className="h-12 w-12 text-gray-300 mb-3" />
                  <p className="text-sm text-gray-400 font-medium">Placeholder: Плащане</p>
                  <p className="text-xs text-gray-300 mt-1">Скрийншот на потвърждение на поръчката</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===== SECTION 3: Menu Showcase ===== */}
      <section className="bg-gray-50 py-20 md:py-28">
        <div className="mx-auto max-w-6xl px-4">
          <div className="text-center">
            <h2 className="font-playfair text-3xl font-bold text-gray-900 md:text-4xl">
              Красиво дигитално меню
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-gray-600">
              Всеки продукт със снимка, описание, алергени и опции за персонализиране
            </p>
          </div>

          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {[
              { title: "Категории с иконки", desc: "Салати, Основни, Десерти, Напитки — всичко организирано с хоризонтални табове и красиви иконки." },
              { title: "Варианти и добавки", desc: "Малка или голяма порция? Допълнителен кашкавал? Без лук? Гостът избира сам." },
              { title: "Алергени и тагове", desc: "Веган, вегетарианско, люто, без глутен — всичко е ясно означено за всеки продукт." },
            ].map((item, i) => (
              <div key={i} className="rounded-2xl bg-white p-1 shadow-sm">
                {/* PLACEHOLDER: Menu screenshot */}
                <div className="h-[200px] w-full rounded-xl bg-gray-100 border-2 border-dashed border-gray-200 flex flex-col items-center justify-center">
                  <Star className="h-8 w-8 text-gray-300 mb-2" />
                  <p className="text-xs text-gray-400">Placeholder: Скрийншот</p>
                </div>
                <div className="p-4">
                  <h3 className="text-lg font-semibold text-gray-900">{item.title}</h3>
                  <p className="mt-1 text-sm text-gray-600">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-10 text-center">
            <Link
              href="/demo"
              className="inline-flex items-center gap-2 rounded-full bg-amber-900 px-6 py-3 font-medium text-white transition-colors hover:bg-amber-800"
            >
              Разгледайте демо менюто <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* ===== SECTION 4: Advantages ===== */}
      <section className="py-20 md:py-28">
        <div className="mx-auto max-w-6xl px-4">
          <div className="text-center">
            <h2 className="font-playfair text-3xl font-bold text-gray-900 md:text-4xl">
              Защо MasaPay?
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-gray-600">
              Всичко, от което вашият ресторант се нуждае, на едно място
            </p>
          </div>

          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {[
              {
                icon: Users,
                title: "По-малко персонал",
                desc: "Гостите поръчват сами от телефона. Спестете разходи за допълнителни сервитьори без да жертвате качеството на обслужване.",
              },
              {
                icon: TrendingUp,
                title: "Повече приходи",
                desc: "Добавките и вариантите са видими за всеки продукт. Гостите поръчват повече, когато виждат опциите.",
              },
              {
                icon: ShieldCheck,
                title: "Нула грешки",
                desc: "Поръчката отива директно от госта в кухнята. Без недоразумения, без грешно записани бележки.",
              },
              {
                icon: Clock,
                title: "По-бързо обслужване",
                desc: "Поръчката се появява в кухнята секунди след изпращане. Без чакане гостът да привлече вниманието на сервитьор.",
              },
              {
                icon: Bell,
                title: "В реално време",
                desc: "Кухнята и барът получават поръчките моментално със звуково известие. Отделни изгледи за храна и напитки.",
              },
              {
                icon: ChefHat,
                title: "Кухня & Бар",
                desc: "Поръчките се разделят автоматично — храната отива в кухнята, напитките на бара. Без объркване.",
              },
              {
                icon: BarChart3,
                title: "Пълна статистика",
                desc: "Продажби, бакшиши, популярни продукти, приходи по дни — всичко на един поглед с графики и експорт.",
              },
              {
                icon: Globe,
                title: "Двуезично меню",
                desc: "Менюто е на български с превод на английски за чуждестранни гости. Превключване с едно натискане.",
              },
              {
                icon: Zap,
                title: "Лесна настройка",
                desc: "Ние настройваме всичко за вас — меню, маси, QR кодове. Вие само ни давате менюто и цените.",
              },
            ].map((item) => (
              <div
                key={item.title}
                className="rounded-2xl border bg-white p-6 transition-shadow hover:shadow-md"
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-amber-100">
                  <item.icon className="h-6 w-6 text-amber-900" />
                </div>
                <h3 className="mt-4 text-lg font-semibold text-gray-900">{item.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-gray-600">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== SECTION 5: Contact Form ===== */}
      <section id="contact" className="bg-gray-50 py-20 md:py-28">
        <div className="mx-auto max-w-6xl px-4">
          <div className="grid gap-12 md:grid-cols-2">
            {/* Left side — text */}
            <div>
              <h2 className="font-playfair text-3xl font-bold text-gray-900 md:text-4xl">
                Свържете се с нас
              </h2>
              <p className="mt-4 text-gray-600 leading-relaxed">
                Искате MasaPay за вашия ресторант? Попълнете формата или ни пишете
                директно в WhatsApp. Ще се свържем с вас до 24 часа.
              </p>
              <div className="mt-8 space-y-4">
                <div className="flex items-center gap-3 rounded-xl bg-white p-4">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-green-100">
                    <MessageCircle className="h-5 w-5 text-green-600" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-900">WhatsApp</p>
                    <a href="https://wa.me/359885202277" className="text-sm text-amber-900 hover:underline">
                      +359 88 520 2277
                    </a>
                  </div>
                </div>
                <div className="flex items-center gap-3 rounded-xl bg-white p-4">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-amber-100">
                    <Zap className="h-5 w-5 text-amber-900" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-900">Бърз старт</p>
                    <p className="text-sm text-gray-500">Първият месец е безплатно</p>
                  </div>
                </div>
              </div>

              {/* PLACEHOLDER: Contact section image */}
              <div className="mt-8 h-[180px] w-full rounded-2xl border-2 border-dashed border-gray-200 bg-white flex flex-col items-center justify-center">
                <QrCode className="h-10 w-10 text-gray-300 mb-2" />
                <p className="text-xs text-gray-400">Placeholder: Снимка на ресторант с MasaPay</p>
              </div>
            </div>

            {/* Right side — form */}
            <div className="rounded-2xl bg-white p-6 shadow-sm md:p-8">
              {contactSubmitted ? (
                <div className="flex flex-col items-center py-12 text-center">
                  <CheckCircle className="h-14 w-14 text-green-500" />
                  <h3 className="mt-4 text-xl font-bold text-gray-900">Благодарим ви!</h3>
                  <p className="mt-2 text-gray-600">Ще се свържем с вас възможно най-скоро.</p>
                </div>
              ) : (
                <form onSubmit={handleContact} className="space-y-4">
                  <div className="grid gap-4 sm:grid-cols-2">
                    <div>
                      <Label htmlFor="c-name">Име *</Label>
                      <Input id="c-name" name="name" required className="mt-1" />
                    </div>
                    <div>
                      <Label htmlFor="c-email">Имейл *</Label>
                      <Input id="c-email" name="email" type="email" required className="mt-1" />
                    </div>
                  </div>
                  <div className="grid gap-4 sm:grid-cols-2">
                    <div>
                      <Label htmlFor="c-phone">Телефон</Label>
                      <Input id="c-phone" name="phone" type="tel" className="mt-1" />
                    </div>
                    <div>
                      <Label htmlFor="c-restaurant">Име на ресторанта</Label>
                      <Input id="c-restaurant" name="restaurant_name" className="mt-1" />
                    </div>
                  </div>
                  <div>
                    <Label htmlFor="c-message">Съобщение *</Label>
                    <Textarea
                      id="c-message"
                      name="message"
                      required
                      rows={4}
                      className="mt-1"
                      placeholder="Разкажете ни за вашия ресторант..."
                    />
                  </div>
                  <Button
                    type="submit"
                    disabled={contactLoading}
                    className="h-12 w-full bg-amber-900 text-base hover:bg-amber-800"
                  >
                    <Send className="mr-2 h-4 w-4" />
                    {contactLoading ? "Изпращане..." : "Изпрати съобщение"}
                  </Button>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* ===== Final CTA ===== */}
      <section className="bg-amber-900 py-16">
        <div className="mx-auto max-w-3xl px-4 text-center">
          <h2 className="font-playfair text-3xl font-bold text-white md:text-4xl">
            Модернизирайте ресторанта си днес
          </h2>
          <p className="mt-4 text-lg text-amber-100">
            Първият месец е безплатно. Ние настройваме всичко за вас.
          </p>
          <a
            href="#contact"
            className="mt-8 inline-block rounded-full bg-white px-8 py-3.5 text-lg font-medium text-amber-900 transition-colors hover:bg-amber-50"
          >
            Започнете сега
          </a>
        </div>
      </section>
    </>
  );
}
