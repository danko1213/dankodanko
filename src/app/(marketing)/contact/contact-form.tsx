"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { MessageCircle, Send, CheckCircle } from "lucide-react";
import type { Translations } from "@/lib/i18n";

interface ContactFormProps {
  m: Translations["marketing"]["contactPage"];
}

export function ContactForm({ m }: ContactFormProps) {
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
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
      if (res.ok) {
        setSubmitted(true);
        form.reset();
      }
    } finally {
      setLoading(false);
    }
  }

  return (
    <section className="py-16">
      <div className="mx-auto max-w-2xl px-4">
        <h1 className="font-playfair text-3xl font-bold text-gray-900 md:text-4xl">
          {m.title}
        </h1>
        <p className="mt-4 text-gray-600">{m.sub}</p>

        {submitted ? (
          <div className="mt-8 flex flex-col items-center rounded-2xl bg-green-50 p-8 text-center">
            <CheckCircle className="h-12 w-12 text-green-600" />
            <h2 className="mt-4 text-xl font-semibold text-gray-900">
              {m.successH}
            </h2>
            <p className="mt-2 text-gray-600">{m.successP}</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="mt-8 space-y-5">
            <div className="grid gap-5 sm:grid-cols-2">
              <div>
                <Label htmlFor="name">{m.name}</Label>
                <Input id="name" name="name" required className="mt-1" />
              </div>
              <div>
                <Label htmlFor="email">{m.email}</Label>
                <Input id="email" name="email" type="email" required className="mt-1" />
              </div>
            </div>
            <div className="grid gap-5 sm:grid-cols-2">
              <div>
                <Label htmlFor="phone">{m.phone}</Label>
                <Input id="phone" name="phone" type="tel" className="mt-1" />
              </div>
              <div>
                <Label htmlFor="restaurant_name">{m.restaurant}</Label>
                <Input id="restaurant_name" name="restaurant_name" className="mt-1" />
              </div>
            </div>
            <div>
              <Label htmlFor="message">{m.message}</Label>
              <Textarea
                id="message"
                name="message"
                required
                rows={4}
                className="mt-1"
                placeholder={m.messagePlaceholder}
              />
            </div>
            <Button type="submit" disabled={loading} className="w-full bg-amber-900 hover:bg-amber-800">
              <Send className="mr-2 h-4 w-4" />
              {loading ? m.sending : m.send}
            </Button>
          </form>
        )}

        <div className="mt-10 rounded-2xl bg-gray-50 p-6 text-center">
          <p className="text-gray-600">{m.preferDirect}</p>
          <a
            href="https://wa.me/359885202277"
            target="_blank"
            rel="noopener noreferrer"
            className="mt-3 inline-flex items-center gap-2 rounded-full bg-green-500 px-6 py-2.5 font-medium text-white transition-colors hover:bg-green-600"
          >
            <MessageCircle className="h-5 w-5" />
            {m.whatsappCta}
          </a>
          <p className="mt-2 text-sm text-gray-500">+359 88 520 2277</p>
        </div>
      </div>
    </section>
  );
}
