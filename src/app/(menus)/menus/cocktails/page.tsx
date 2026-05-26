import type { Metadata } from "next";
import Image from "next/image";

export const metadata: Metadata = {
  title: "Cocktail Menu",
  description: "Dark neon house-music-bar cocktail menu.",
};

type Cocktail = {
  name: string;
  build: string;
  profile: string;
  price: string;
  image: string;
  tone: string;
};

const cocktails: Cocktail[] = [
  {
    name: "Mojito",
    build: "White rum, lime, mint, raw sugar, soda, crushed ice.",
    profile: "Crisp, herbal, high-energy.",
    price: "$14",
    image: "/images/menus/cocktails/mojito.jpg",
    tone: "Mint signal",
  },
  {
    name: "Paloma",
    build: "Blanco tequila, grapefruit, lime, agave, sea salt, soda.",
    profile: "Bright citrus with a clean mineral finish.",
    price: "$15",
    image: "/images/menus/cocktails/paloma.jpg",
    tone: "Pink strobe",
  },
  {
    name: "Espresso Martini",
    build: "Vodka, espresso, coffee liqueur, demerara, cacao bitters.",
    profile: "Dark, fast, velvet foam.",
    price: "$16",
    image: "/images/menus/cocktails/espresso-martini.jpg",
    tone: "After midnight",
  },
  {
    name: "Neon Negroni",
    build: "Gin, bitter aperitivo, sweet vermouth, orange oil.",
    profile: "Bitter, electric, built for the booth.",
    price: "$15",
    image: "/images/menus/cocktails/neon-negroni.jpg",
    tone: "Red line",
  },
  {
    name: "Mezcal Highball",
    build: "Mezcal, yuzu, ginger, smoked salt, soda.",
    profile: "Smoky lift with a sharp citrus kick.",
    price: "$16",
    image: "/images/menus/cocktails/mezcal-highball.jpg",
    tone: "Smoke haze",
  },
  {
    name: "House Spritz",
    build: "Aperitivo, sparkling wine, passion fruit, soda, orange.",
    profile: "Bubbly, tropical, dance-floor friendly.",
    price: "$13",
    image: "/images/menus/cocktails/house-spritz.jpg",
    tone: "Golden hour",
  },
  {
    name: "Midnight Daiquiri",
    build: "Aged rum, lime, black sugar, saline, absinthe mist.",
    profile: "Lean, cold, and bass-heavy.",
    price: "$15",
    image: "/images/menus/cocktails/midnight-daiquiri.jpg",
    tone: "Bass drop",
  },
  {
    name: "French 75 Remix",
    build: "Gin, lemon, elderflower, sparkling wine, green tea.",
    profile: "Floral fizz with a sharp club finish.",
    price: "$17",
    image: "/images/menus/cocktails/french-75-remix.jpg",
    tone: "Laser bloom",
  },
];

function CocktailCard({ cocktail, index }: { cocktail: Cocktail; index: number }) {
  const isHot = index % 3 === 1;

  return (
    <article className="group relative overflow-hidden rounded-lg border border-white/10 bg-[#101114] shadow-[0_0_0_1px_rgba(255,255,255,0.04),0_18px_50px_rgba(0,0,0,0.45)]">
      <div className={`absolute inset-x-0 top-0 h-1 ${isHot ? "bg-[#ff3d9a]" : "bg-[#00e7ff]"}`} />
      <div className="relative aspect-[4/3] overflow-hidden bg-[#16181d]">
        <span className="absolute inset-0 flex items-center justify-center px-6 text-center text-xs font-black uppercase tracking-[0.18em] text-white/35">
          Photo: {cocktail.name}
        </span>
        <Image
          src={cocktail.image}
          alt={cocktail.name}
          fill
          sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
          className="z-10 h-full w-full object-cover opacity-90 saturate-125 transition duration-500 group-hover:scale-105 group-hover:opacity-100"
        />
      </div>
      <div className="grid gap-4 p-5">
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className={`text-xs font-bold uppercase tracking-[0.24em] ${isHot ? "text-[#ff63b3]" : "text-[#31efff]"}`}>{cocktail.tone}</p>
            <h3 className="mt-2 text-2xl font-black uppercase text-white">{cocktail.name}</h3>
          </div>
          <span className="border border-[#d7ff50]/40 bg-[#d7ff50] px-3 py-1 text-sm font-black text-[#101114]">{cocktail.price}</span>
        </div>
        <p className="text-sm leading-6 text-white/76">{cocktail.build}</p>
        <div className="flex items-center justify-between border-t border-white/10 pt-4">
          <span className="text-xs font-semibold uppercase tracking-[0.18em] text-white/50">Profile</span>
          <span className="max-w-[62%] text-right text-sm font-semibold text-white">{cocktail.profile}</span>
        </div>
      </div>
    </article>
  );
}

export default function CocktailMenuPage() {
  return (
    <main className="min-h-screen bg-[#07080b] text-white">
      <section className="relative overflow-hidden border-b border-white/10 px-5 py-16 sm:px-8 lg:px-12">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_12%_18%,rgba(0,231,255,0.22),transparent_28%),radial-gradient(circle_at_82%_12%,rgba(255,61,154,0.26),transparent_30%),linear-gradient(135deg,#07080b_0%,#11131a_52%,#050608_100%)]" />
        <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-[#d7ff50] to-transparent" />
        <div className="relative mx-auto grid max-w-6xl gap-10 lg:grid-cols-[1fr_0.85fr] lg:items-end">
          <div>
            <p className="text-sm font-black uppercase tracking-[0.35em] text-[#31efff]">House bar menu</p>
            <h1 className="mt-5 max-w-3xl text-5xl font-black uppercase leading-[0.95] text-white sm:text-6xl lg:text-7xl">
              Cocktails for late sets and bright frequencies.
            </h1>
          </div>
          <div className="border-l border-white/15 pl-6">
            <p className="text-lg leading-8 text-white/72">
              Neon citrus, cold glass, bitter edges, and clean builds tuned for a packed room.
            </p>
            <div className="mt-8 grid grid-cols-3 gap-3">
              {["120 BPM", "8 pours", "Open late"].map((label) => (
                <span key={label} className="border border-white/12 bg-white/5 px-3 py-3 text-center text-xs font-black uppercase tracking-[0.16em] text-[#d7ff50]">
                  {label}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-5 py-14 sm:px-8 lg:px-12">
        <div className="mb-8 flex flex-col justify-between gap-4 border-b border-white/10 pb-5 md:flex-row md:items-end">
          <div>
            <p className="text-xs font-black uppercase tracking-[0.28em] text-[#ff63b3]">Signal list</p>
            <h2 className="mt-2 text-4xl font-black uppercase">House Cocktails</h2>
          </div>
          <p className="max-w-xl text-sm leading-6 text-white/58">
            Balanced classics and club-tuned signatures with Mojito and Paloma leading the first round.
          </p>
        </div>

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {cocktails.map((cocktail, index) => (
            <CocktailCard key={cocktail.name} cocktail={cocktail} index={index} />
          ))}
        </div>
      </section>
    </main>
  );
}
