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
        image: "/images/menus/brunch/garden-avocado-toast.svg",
        accent: "Fresh herbs",
      },
      {
        name: "Chili Crunch Avocado Toast",
        description: "Avocado, soft herbs, whipped feta, chili crisp, lime, sesame.",
        price: "$15",
        image: "/images/menus/brunch/chili-crunch-avocado-toast.svg",
        accent: "A little heat",
      },
      {
        name: "Smoked Salmon Avocado Toast",
        description: "Avocado, cold-smoked salmon, cucumber ribbons, dill, caper cream.",
        price: "$18",
        image: "/images/menus/brunch/smoked-salmon-avocado-toast.svg",
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
        image: "/images/menus/brunch/classic-eggs-benedict.svg",
        accent: "Classic",
      },
      {
        name: "Florentine Benedict",
        description: "Poached eggs, spinach, roasted tomato, brioche, basil hollandaise.",
        price: "$16",
        image: "/images/menus/brunch/florentine-benedict.svg",
        accent: "Vegetarian",
      },
      {
        name: "Crab Cake Benedict",
        description: "Blue crab cakes, poached eggs, charred lemon hollandaise, herbs.",
        price: "$22",
        image: "/images/menus/brunch/crab-cake-benedict.svg",
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
    image: "/images/menus/brunch/honey-cardamom-latte.svg",
    accent: "Signature",
  },
  {
    name: "Orange Blossom Cold Brew",
    description: "Slow-steeped cold brew, orange blossom syrup, citrus peel, tonic sparkle.",
    price: "$7",
    image: "/images/menus/brunch/orange-blossom-cold-brew.svg",
    accent: "Iced",
  },
  {
    name: "Pistachio Cortado",
    description: "Equal parts espresso and milk with toasted pistachio cream.",
    price: "$5",
    image: "/images/menus/brunch/pistachio-cortado.svg",
    accent: "Small cup",
  },
];

function MenuCard({ item, featured = false }: { item: BrunchItem; featured?: boolean }) {
  return (
    <article className={`grid grid-cols-[116px_1fr] overflow-hidden rounded-lg border shadow-sm ${featured ? "border-[#d4a373]/40 bg-[#fffaf0]" : "border-[#eadfd0] bg-white"}`}>
      <div className="relative min-h-36 overflow-hidden bg-[#f3eadf]">
        <Image
          src={item.image}
          alt={item.name}
          fill
          sizes="116px"
          className="object-cover"
        />
      </div>
      <div className="grid gap-3 p-4">
        <div className="grid gap-2">
          <div>
            <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-[#c46f4d]">{item.accent}</p>
            <h3 className="mt-1 font-playfair text-xl font-semibold leading-6 text-[#232323]">{item.name}</h3>
          </div>
          <span className="w-fit rounded-full bg-[#edf5ee] px-3 py-1 text-sm font-semibold text-[#35533d]">{item.price}</span>
        </div>
        <p className="text-sm leading-5 text-[#67615b]">{item.description}</p>
      </div>
    </article>
  );
}

export default function BrunchMenuPage() {
  return (
    <main className="min-h-screen bg-[#e9dfd0] text-[#232323]">
      <div className="mx-auto min-h-screen max-w-[430px] bg-[#fbf8f2] shadow-2xl">
        <section className="border-b border-[#eadfd0] bg-[linear-gradient(135deg,#fffdf8_0%,#f7efe3_52%,#eff7f1_100%)] px-5 pb-7 pt-8">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.26em] text-[#c46f4d]">Demo 1 · Weekend brunch</p>
            <h1 className="mt-4 font-playfair text-4xl font-semibold leading-10 text-[#1f2b22]">
              Bright brunch, made for morning scrolling.
            </h1>
          </div>
          <p className="mt-4 text-sm leading-6 text-[#5d6259]">
            Ripe avocado, poached eggs, toasted brioche, and a specialty coffee bar in a clean phone menu.
          </p>
          <div className="mt-6 grid grid-cols-3 gap-2 text-center">
            {["8 dishes", "3 coffees", "All day"].map((label) => (
              <span key={label} className="rounded-lg border border-[#e5d6c5] bg-white/70 px-2 py-3 text-xs font-semibold text-[#526b55]">
                {label}
              </span>
            ))}
          </div>
        </section>

        <div className="grid gap-10 px-4 py-6">
          {sections.map((section) => (
            <section key={section.title}>
              <div className="mb-4 border-b border-[#eadfd0] pb-4">
                <div>
                  <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-[#c46f4d]">{section.eyebrow}</p>
                  <h2 className="mt-1 font-playfair text-3xl font-semibold text-[#1f2b22]">{section.title}</h2>
                </div>
                <p className="mt-2 text-sm leading-5 text-[#6f675f]">{section.note}</p>
              </div>
              <div className="grid gap-3">
                {section.items.map((item) => (
                  <MenuCard key={item.name} item={item} />
                ))}
              </div>
            </section>
          ))}

          <section className="rounded-lg bg-[#1f2b22] px-4 py-5 text-white">
            <div className="mb-4 border-b border-white/15 pb-4">
              <div>
                <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-[#f0bc86]">Featured bar</p>
                <h2 className="mt-1 font-playfair text-3xl font-semibold">Specialty Coffee</h2>
              </div>
              <p className="mt-2 text-sm leading-5 text-[#dfe8dd]">
                Soft aromatics, careful extraction, and brunch-friendly iced pours.
              </p>
            </div>
            <div className="grid gap-3">
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
