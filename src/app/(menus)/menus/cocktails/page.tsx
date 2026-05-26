import type { Metadata } from "next";
import { DemoMenuExperience, type DemoMenuContent, type DemoMenuTheme } from "../_components/demo-menu-experience";

export const metadata: Metadata = {
  title: "Коктейлно меню",
  description: "Неоново коктейлно меню на български с английски превод, количка и бележки.",
};

const content: DemoMenuContent = {
  hero: {
    eyebrow: { bg: "Демо 2 · Хаус бар", en: "Demo 2 · House bar" },
    title: { bg: "Коктейли за късните сетове.", en: "Cocktails for late sets." },
    description: {
      bg: "Неонов цитрус, студено стъкло, горчиви нотки и чисти рецепти за пълен бар.",
      en: "Neon citrus, cold glass, bitter edges, and clean builds tuned for a packed room.",
    },
    stats: [
      { bg: "120 BPM", en: "120 BPM" },
      { bg: "8 напитки", en: "8 pours" },
      { bg: "До късно", en: "Open late" },
    ],
  },
  sections: [
    {
      id: "house-cocktails",
      eyebrow: { bg: "Сигнален лист", en: "Signal list" },
      title: { bg: "Хаус коктейли", en: "House Cocktails" },
      note: {
        bg: "Балансирани класики и клубни авторски напитки с Мохито и Палома за първи рунд.",
        en: "Balanced classics and club-tuned signatures with Mojito and Paloma leading the first round.",
      },
      items: [
        {
          id: "mojito",
          name: { bg: "Мохито", en: "Mojito" },
          description: {
            bg: "Бял ром, лайм, мента, сурова захар, сода и натрошен лед.",
            en: "White rum, lime, mint, raw sugar, soda, crushed ice.",
          },
          price: 14,
          image: "/images/menus/cocktails/mojito.jpg",
          accent: { bg: "Ментов сигнал", en: "Mint signal" },
          removableIngredients: [
            { bg: "мента", en: "mint" },
            { bg: "захар", en: "sugar" },
            { bg: "лед", en: "ice" },
          ],
        },
        {
          id: "paloma",
          name: { bg: "Палома", en: "Paloma" },
          description: {
            bg: "Бланко текила, грейпфрут, лайм, агаве, морска сол и сода.",
            en: "Blanco tequila, grapefruit, lime, agave, sea salt, soda.",
          },
          price: 15,
          image: "/images/menus/cocktails/paloma.jpg",
          accent: { bg: "Розов строб", en: "Pink strobe" },
          removableIngredients: [
            { bg: "сол", en: "salt" },
            { bg: "агаве", en: "agave" },
            { bg: "лед", en: "ice" },
          ],
        },
        {
          id: "espresso-martini",
          name: { bg: "Еспресо Мартини", en: "Espresso Martini" },
          description: {
            bg: "Водка, еспресо, кафе ликьор, демерара и какаови битери.",
            en: "Vodka, espresso, coffee liqueur, demerara, cacao bitters.",
          },
          price: 16,
          image: "/images/menus/cocktails/espresso-martini.jpg",
          accent: { bg: "След полунощ", en: "After midnight" },
          removableIngredients: [
            { bg: "захар", en: "sugar" },
            { bg: "какаови битери", en: "cacao bitters" },
            { bg: "пяна", en: "foam" },
          ],
        },
        {
          id: "neon-negroni",
          name: { bg: "Неонов Негрони", en: "Neon Negroni" },
          description: {
            bg: "Джин, горчив аперитив, сладък вермут и портокалово масло.",
            en: "Gin, bitter aperitivo, sweet vermouth, orange oil.",
          },
          price: 15,
          image: "/images/menus/cocktails/neon-negroni.jpg",
          accent: { bg: "Червена линия", en: "Red line" },
          removableIngredients: [
            { bg: "портокал", en: "orange" },
            { bg: "лед", en: "ice" },
            { bg: "вермут", en: "vermouth" },
          ],
        },
        {
          id: "mezcal-highball",
          name: { bg: "Мескал Хайбол", en: "Mezcal Highball" },
          description: {
            bg: "Мескал, юзу, джинджифил, пушена сол и сода.",
            en: "Mezcal, yuzu, ginger, smoked salt, soda.",
          },
          price: 16,
          image: "/images/menus/cocktails/mezcal-highball.jpg",
          accent: { bg: "Пушек", en: "Smoke haze" },
          removableIngredients: [
            { bg: "джинджифил", en: "ginger" },
            { bg: "пушена сол", en: "smoked salt" },
            { bg: "лед", en: "ice" },
          ],
        },
        {
          id: "house-spritz",
          name: { bg: "Хаус Шприц", en: "House Spritz" },
          description: {
            bg: "Аперитив, пенливо вино, маракуя, сода и портокал.",
            en: "Aperitivo, sparkling wine, passion fruit, soda, orange.",
          },
          price: 13,
          image: "/images/menus/cocktails/house-spritz.jpg",
          accent: { bg: "Златен час", en: "Golden hour" },
          removableIngredients: [
            { bg: "портокал", en: "orange" },
            { bg: "маракуя", en: "passion fruit" },
            { bg: "лед", en: "ice" },
          ],
        },
        {
          id: "midnight-daiquiri",
          name: { bg: "Полунощно Дайкири", en: "Midnight Daiquiri" },
          description: {
            bg: "Отлежал ром, лайм, тъмна захар, салин и абсентова мъгла.",
            en: "Aged rum, lime, black sugar, saline, absinthe mist.",
          },
          price: 15,
          image: "/images/menus/cocktails/midnight-daiquiri.jpg",
          accent: { bg: "Бас дроп", en: "Bass drop" },
          removableIngredients: [
            { bg: "захар", en: "sugar" },
            { bg: "абсент", en: "absinthe" },
            { bg: "салин", en: "saline" },
          ],
        },
        {
          id: "french-75-remix",
          name: { bg: "Френч 75 Ремикс", en: "French 75 Remix" },
          description: {
            bg: "Джин, лимон, бъз, пенливо вино и зелен чай.",
            en: "Gin, lemon, elderflower, sparkling wine, green tea.",
          },
          price: 17,
          image: "/images/menus/cocktails/french-75-remix.jpg",
          accent: { bg: "Лазерен цвят", en: "Laser bloom" },
          removableIngredients: [
            { bg: "бъз", en: "elderflower" },
            { bg: "лимон", en: "lemon" },
            { bg: "лед", en: "ice" },
          ],
        },
      ],
    },
  ],
};

const theme: DemoMenuTheme = {
  pageClass: "min-h-screen bg-[#020307] text-white",
  shellClass: "mx-auto min-h-screen max-w-[430px] bg-[#07080b] pb-4 shadow-2xl",
  heroClass: "relative overflow-hidden border-b border-white/10 bg-[radial-gradient(circle_at_12%_18%,rgba(0,231,255,0.22),transparent_28%),radial-gradient(circle_at_82%_12%,rgba(255,61,154,0.26),transparent_30%),linear-gradient(135deg,#07080b_0%,#11131a_52%,#050608_100%)] px-4 pb-7 pt-8",
  heroEyebrowClass: "text-xs font-black uppercase tracking-[0.3em] text-[#31efff]",
  heroTitleClass: "mt-4 text-4xl font-black uppercase leading-[0.95] text-white",
  heroTextClass: "mt-4 border-l border-white/15 pl-4 text-sm leading-6 text-white/72",
  statClass: "border border-white/12 bg-white/5 px-2 py-3 text-[10px] font-black uppercase tracking-[0.14em] text-[#d7ff50]",
  contentClass: "grid gap-6 px-4 py-6",
  sectionEyebrowClass: "text-[10px] font-black uppercase tracking-[0.24em] text-[#ff63b3]",
  sectionTitleClass: "mt-1 text-3xl font-black uppercase text-white",
  sectionNoteClass: "mt-2 text-sm leading-5 text-white/58",
  cardClass: "relative overflow-hidden rounded-lg border border-white/10 bg-[#101114] text-white shadow-[0_0_0_1px_rgba(255,255,255,0.04),0_18px_50px_rgba(0,0,0,0.45)]",
  imageWrapClass: "relative aspect-[16/10] overflow-hidden bg-[#16181d]",
  imageClass: "object-contain opacity-95 saturate-125",
  accentClass: "text-[10px] font-bold uppercase tracking-[0.22em] text-[#31efff]",
  itemTitleClass: "mt-1 text-2xl font-black uppercase leading-7 text-white",
  itemDescriptionClass: "text-sm leading-5 text-white/76",
  priceClass: "shrink-0 border border-[#d7ff50]/40 bg-[#d7ff50] px-3 py-1 text-sm font-black text-[#101114]",
  addButtonClass: "h-10 w-full gap-2 rounded-none bg-[#d7ff50] text-[#101114] hover:bg-[#e4ff73]",
  panelClass: "grid gap-4 border border-white/10 bg-white/5 p-3",
  chipClass: "rounded-none border border-white/14 bg-white/5 px-2.5 py-1 text-xs font-bold uppercase tracking-[0.08em] text-white/80",
  chipActiveClass: "rounded-none border border-[#ff63b3] bg-[#ff63b3]/15 px-2.5 py-1 text-xs font-black uppercase tracking-[0.08em] text-[#ff9bcc] line-through",
  inputClass: "mt-2 resize-none border-white/10 bg-black/30 text-sm text-white placeholder:text-white/35",
  cartClass: "sticky bottom-3 z-[70] mx-4 border border-[#d7ff50]/30 bg-[#101114]/95 p-4 text-white shadow-[0_0_30px_rgba(215,255,80,0.18)] backdrop-blur",
  cartButtonClass: "flex h-8 w-8 items-center justify-center border border-white/10 bg-white/5 text-white",
};

export default function CocktailMenuPage() {
  return <DemoMenuExperience content={content} theme={theme} />;
}
