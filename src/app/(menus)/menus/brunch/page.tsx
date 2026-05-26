import type { Metadata } from "next";
import Image from "next/image";

export const metadata: Metadata = {
  title: "Brunch Menu",
  description: "Elegant brunch menu with avocado toasts, eggs benedict, and specialty coffee.",
};

type BrunchItem = {
  name: string;
  description: string;
  price: string;
  image: string;
  accent: string;
};

type BrunchSection = {
  eyebrow: string;
  title: string;
  note: string;
  items: BrunchItem[];
};

const sections: BrunchSection[] = [
  {
    eyebrow: "Bright plates",
    title: "Avocado Toasts",
    note: "Layered on toasted sourdough with market herbs and pressed citrus.",
    items: [
      {
        name: "Garden Avocado Toast",
        description: "Smashed avocado, lemon oil, pickled radish, pea shoots, toasted seeds.",
        price: "$13",
        image: "/images/menus/brunch/garden-avocado-toast.jpg",
        accent: "Fresh herbs",
      },
      {
        name: "Chili Crunch Avocado Toast",
        description: "Avocado, soft herbs, whipped feta, chili crisp, lime, sesame.",
        price: "$15",
        image: "/images/menus/brunch/chili-crunch-avocado-toast.jpg",
        accent: "A little heat",
      },
      {
        name: "Smoked Salmon Avocado Toast",
        description: "Avocado, cold-smoked salmon, cucumber ribbons, dill, caper cream.",
        price: "$18",
        image: "/images/menus/brunch/smoked-salmon-avocado-toast.jpg",
        accent: "Coastal",
      },
    ],
  },
  {
    eyebrow: "Poached to order",
    title: "Eggs Benedict",
    note: "Served on toasted brioche with lemon hollandaise and dressed greens.",
    items: [
      {
        name: "Classic Eggs Benedict",
        description: "Poached eggs, ham, brioche, chive hollandaise, breakfast potatoes.",
        price: "$17",
        image: "/images/menus/brunch/classic-eggs-benedict.jpg",
        accent: "Classic",
      },
      {
        name: "Florentine Benedict",
        description: "Poached eggs, spinach, roasted tomato, brioche, basil hollandaise.",
        price: "$16",
        image: "/images/menus/brunch/florentine-benedict.jpg",
        accent: "Vegetarian",
      },
      {
        name: "Crab Cake Benedict",
        description: "Blue crab cakes, poached eggs, charred lemon hollandaise, herbs.",
        price: "$22",
        image: "/images/menus/brunch/crab-cake-benedict.jpg",
        accent: "Featured",
      },
    ],
  },
];

const specialtyCoffee: BrunchItem[] = [
  {
    name: "Honey Cardamom Latte",
    description: "Double espresso, steamed milk, wildflower honey, cardamom dust.",
    price: "$6",
    image: "/images/menus/brunch/honey-cardamom-latte.jpg",
    accent: "Signature",
  },
  {
    name: "Orange Blossom Cold Brew",
    description: "Slow-steeped cold brew, orange blossom syrup, citrus peel, tonic sparkle.",
    price: "$7",
    image: "/images/menus/brunch/orange-blossom-cold-brew.jpg",
    accent: "Iced",
  },
  {
    name: "Pistachio Cortado",
    description: "Equal parts espresso and milk with toasted pistachio cream.",
    price: "$5",
    image: "/images/menus/brunch/pistachio-cortado.jpg",
    accent: "Small cup",
  },
];

function MenuCard({ item, featured = false }: { item: BrunchItem; featured?: boolean }) {
  return (
    <article className={`group grid overflow-hidden rounded-lg border bg-white shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-xl ${featured ? "border-[#d4a373]/40" : "border-[#eadfd0]"}`}>
      <div className="relative aspect-[5/4] overflow-hidden bg-[#f3eadf]">
        <span className="absolute inset-0 flex items-center justify-center px-6 text-center text-xs font-semibold uppercase tracking-[0.18em] text-[#9b7c62]">
          Photo: {item.name}
        </span>
        <Image
          src={item.image}
          alt={item.name}
          fill
          sizes="(min-width: 768px) 33vw, 100vw"
          className="z-10 h-full w-full object-cover transition duration-500 group-hover:scale-105"
        />
      </div>
      <div className="grid gap-4 p-5">
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[#c46f4d]">{item.accent}</p>
            <h3 className="mt-2 font-playfair text-2xl font-semibold text-[#232323]">{item.name}</h3>
          </div>
          <span className="rounded-full bg-[#edf5ee] px-3 py-1 text-sm font-semibold text-[#35533d]">{item.price}</span>
        </div>
        <p className="text-sm leading-6 text-[#67615b]">{item.description}</p>
      </div>
    </article>
  );
}

export default function BrunchMenuPage() {
  return (
    <main className="min-h-screen bg-[#fbf8f2] text-[#232323]">
      <section className="border-b border-[#eadfd0] bg-[linear-gradient(135deg,#fffdf8_0%,#f7efe3_52%,#eff7f1_100%)] px-5 py-16 sm:px-8 lg:px-12">
        <div className="mx-auto grid max-w-6xl gap-10 lg:grid-cols-[1fr_0.9fr] lg:items-end">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.28em] text-[#c46f4d]">Weekend brunch</p>
            <h1 className="mt-5 max-w-3xl font-playfair text-5xl font-semibold leading-tight text-[#1f2b22] sm:text-6xl lg:text-7xl">
              A slow morning menu with bright plates and polished coffee.
            </h1>
          </div>
          <div className="max-w-xl border-l border-[#d7c8b8] pl-6">
            <p className="text-lg leading-8 text-[#5d6259]">
              Built around ripe avocado, poached eggs, toasted brioche, and a featured coffee bar for long table conversations.
            </p>
            <div className="mt-8 grid grid-cols-3 gap-3 text-center">
              {["8 dishes", "3 coffees", "All day"].map((label) => (
                <span key={label} className="rounded-lg border border-[#e5d6c5] bg-white/70 px-3 py-3 text-sm font-semibold text-[#526b55]">
                  {label}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      <div className="mx-auto max-w-6xl px-5 py-14 sm:px-8 lg:px-12">
        <div className="grid gap-14">
          {sections.map((section) => (
            <section key={section.title}>
              <div className="mb-7 flex flex-col justify-between gap-4 border-b border-[#eadfd0] pb-5 md:flex-row md:items-end">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.24em] text-[#c46f4d]">{section.eyebrow}</p>
                  <h2 className="mt-2 font-playfair text-4xl font-semibold text-[#1f2b22]">{section.title}</h2>
                </div>
                <p className="max-w-xl text-sm leading-6 text-[#6f675f]">{section.note}</p>
              </div>
              <div className="grid gap-5 md:grid-cols-3">
                {section.items.map((item) => (
                  <MenuCard key={item.name} item={item} />
                ))}
              </div>
            </section>
          ))}

          <section className="bg-[#1f2b22] px-5 py-8 text-white sm:px-8">
            <div className="mb-7 flex flex-col justify-between gap-4 border-b border-white/15 pb-5 md:flex-row md:items-end">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.24em] text-[#f0bc86]">Featured bar</p>
                <h2 className="mt-2 font-playfair text-4xl font-semibold">Specialty Coffee</h2>
              </div>
              <p className="max-w-xl text-sm leading-6 text-[#dfe8dd]">
                Soft aromatics, careful extraction, and brunch-friendly iced pours.
              </p>
            </div>
            <div className="grid gap-5 md:grid-cols-3">
              {specialtyCoffee.map((item) => (
                <MenuCard key={item.name} item={item} featured />
              ))}
            </div>
          </section>
        </div>
      </div>
    </main>
  );
}
