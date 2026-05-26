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
    image: "/images/menus/cocktails/mojito.svg",
    tone: "Mint signal",
  },
  {
    name: "Paloma",
    build: "Blanco tequila, grapefruit, lime, agave, sea salt, soda.",
    profile: "Bright citrus with a clean mineral finish.",
    price: "$15",
    image: "/images/menus/cocktails/paloma.svg",
    tone: "Pink strobe",
  },
  {
    name: "Espresso Martini",
    build: "Vodka, espresso, coffee liqueur, demerara, cacao bitters.",
    profile: "Dark, fast, velvet foam.",
    price: "$16",
    image: "/images/menus/cocktails/espresso-martini.svg",
    tone: "After midnight",
  },
  {
    name: "Neon Negroni",
    build: "Gin, bitter aperitivo, sweet vermouth, orange oil.",
    profile: "Bitter, electric, built for the booth.",
    price: "$15",
    image: "/images/menus/cocktails/neon-negroni.svg",
    tone: "Red line",
  },
  {
    name: "Mezcal Highball",
    build: "Mezcal, yuzu, ginger, smoked salt, soda.",
    profile: "Smoky lift with a sharp citrus kick.",
    price: "$16",
    image: "/images/menus/cocktails/mezcal-highball.svg",
    tone: "Smoke haze",
  },
  {
    name: "House Spritz",
    build: "Aperitivo, sparkling wine, passion fruit, soda, orange.",
    profile: "Bubbly, tropical, dance-floor friendly.",
    price: "$13",
    image: "/images/menus/cocktails/house-spritz.svg",
    tone: "Golden hour",
  },
  {
    name: "Midnight Daiquiri",
    build: "Aged rum, lime, black sugar, saline, absinthe mist.",
    profile: "Lean, cold, and bass-heavy.",
    price: "$15",
    image: "/images/menus/cocktails/midnight-daiquiri.svg",
    tone: "Bass drop",
  },
  {
    name: "French 75 Remix",
    build: "Gin, lemon, elderflower, sparkling wine, green tea.",
    profile: "Floral fizz with a sharp club finish.",
    price: "$17",
    image: "/images/menus/cocktails/french-75-remix.svg",
    tone: "Laser bloom",
  },
];

function CocktailCard({ cocktail, index }: { cocktail: Cocktail; index: number }) {
  const isHot = index % 3 === 1;

  return (
    <article className="relative overflow-hidden rounded-lg border border-white/10 bg-[#101114] shadow-[0_0_0_1px_rgba(255,255,255,0.04),0_18px_50px_rgba(0,0,0,0.45)]">
      <div className={`absolute inset-x-0 top-0 h-1 ${isHot ? "bg-[#ff3d9a]" : "bg-[#00e7ff]"}`} />
      <div className="relative aspect-[16/10] overflow-hidden bg-[#16181d]">
        <Image
          src={cocktail.image}
          alt={cocktail.name}
          fill
          sizes="430px"
          className="object-cover opacity-95 saturate-125"
        />
      </div>
      <div className="grid gap-3 p-4">
        <div className="flex items-start justify-between gap-3">
          <div>
            <p className={`text-[10px] font-bold uppercase tracking-[0.22em] ${isHot ? "text-[#ff63b3]" : "text-[#31efff]"}`}>{cocktail.tone}</p>
            <h3 className="mt-1 text-2xl font-black uppercase leading-7 text-white">{cocktail.name}</h3>
          </div>
          <span className="border border-[#d7ff50]/40 bg-[#d7ff50] px-3 py-1 text-sm font-black text-[#101114]">{cocktail.price}</span>
        </div>
        <p className="text-sm leading-5 text-white/76">{cocktail.build}</p>
        <div className="flex items-center justify-between border-t border-white/10 pt-3">
          <span className="text-xs font-semibold uppercase tracking-[0.18em] text-white/50">Profile</span>
          <span className="max-w-[62%] text-right text-sm font-semibold text-white">{cocktail.profile}</span>
        </div>
      </div>
    </article>
  );
}

export default function CocktailMenuPage() {
  return (
    <main className="min-h-screen bg-[#020307] text-white">
      <div className="mx-auto min-h-screen max-w-[430px] bg-[#07080b] shadow-2xl">
        <section className="relative overflow-hidden border-b border-white/10 px-4 pb-7 pt-8">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_12%_18%,rgba(0,231,255,0.22),transparent_28%),radial-gradient(circle_at_82%_12%,rgba(255,61,154,0.26),transparent_30%),linear-gradient(135deg,#07080b_0%,#11131a_52%,#050608_100%)]" />
          <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-[#d7ff50] to-transparent" />
          <div className="relative grid gap-5">
            <div>
              <p className="text-xs font-black uppercase tracking-[0.3em] text-[#31efff]">Demo 2 · House bar</p>
              <h1 className="mt-4 text-4xl font-black uppercase leading-[0.95] text-white">
                Cocktails for late sets.
              </h1>
            </div>
            <div className="border-l border-white/15 pl-4">
              <p className="text-sm leading-6 text-white/72">
                Neon citrus, cold glass, bitter edges, and clean builds tuned for a packed room.
              </p>
              <div className="mt-5 grid grid-cols-3 gap-2">
                {["120 BPM", "8 pours", "Open late"].map((label) => (
                  <span key={label} className="border border-white/12 bg-white/5 px-2 py-3 text-center text-[10px] font-black uppercase tracking-[0.14em] text-[#d7ff50]">
                    {label}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="px-4 py-6">
          <div className="mb-5 border-b border-white/10 pb-4">
            <div>
              <p className="text-[10px] font-black uppercase tracking-[0.24em] text-[#ff63b3]">Signal list</p>
              <h2 className="mt-1 text-3xl font-black uppercase">House Cocktails</h2>
            </div>
            <p className="mt-2 text-sm leading-5 text-white/58">
              Balanced classics and club-tuned signatures with Mojito and Paloma leading the first round.
            </p>
          </div>

          <div className="grid gap-4">
            {cocktails.map((cocktail, index) => (
              <CocktailCard key={cocktail.name} cocktail={cocktail} index={index} />
            ))}
          </div>
        </section>
      </div>
    </main>
  );
}
