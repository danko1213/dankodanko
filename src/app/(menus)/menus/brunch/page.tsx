import type { Metadata } from "next";
import { DemoMenuExperience, type DemoMenuContent, type DemoMenuTheme } from "../_components/demo-menu-experience";

export const metadata: Metadata = {
  title: "Брънч меню",
  description: "Елегантно брънч меню на български с английски превод, количка и бележки към ресторанта.",
};

const content: DemoMenuContent = {
  hero: {
    eyebrow: { bg: "Демо 1 · Уикенд брънч", en: "Demo 1 · Weekend brunch" },
    title: {
      bg: "Свеж брънч, направен за разглеждане от телефон.",
      en: "Bright brunch, made for morning scrolling.",
    },
    description: {
      bg: "Авокадо, поширани яйца, препечен бриош и специално кафе в чисто мобилно меню.",
      en: "Ripe avocado, poached eggs, toasted brioche, and a specialty coffee bar in a clean phone menu.",
    },
    stats: [
      { bg: "8 ястия", en: "8 dishes" },
      { bg: "3 кафета", en: "3 coffees" },
      { bg: "Цял ден", en: "All day" },
    ],
  },
  sections: [
    {
      id: "avocado-toasts",
      eyebrow: { bg: "Свежи чинии", en: "Bright plates" },
      title: { bg: "Тостове с авокадо", en: "Avocado Toasts" },
      note: {
        bg: "Върху препечен квасен хляб с пресни билки и цитрус.",
        en: "Layered on toasted sourdough with market herbs and pressed citrus.",
      },
      items: [
        {
          id: "garden-avocado-toast",
          name: { bg: "Градински тост с авокадо", en: "Garden Avocado Toast" },
          description: {
            bg: "Намачкано авокадо, лимоново олио, маринована репичка, грахови кълнове и семена.",
            en: "Smashed avocado, lemon oil, pickled radish, pea shoots, toasted seeds.",
          },
          price: 13,
          image: "/images/menus/brunch/garden-avocado-toast.jpg",
          accent: { bg: "Свежи билки", en: "Fresh herbs" },
          removableIngredients: [
            { bg: "репичка", en: "radish" },
            { bg: "семена", en: "seeds" },
            { bg: "грахови кълнове", en: "pea shoots" },
          ],
        },
        {
          id: "chili-crunch-avocado-toast",
          name: { bg: "Тост с авокадо и чили крънч", en: "Chili Crunch Avocado Toast" },
          description: {
            bg: "Авокадо, свежи билки, разбито фета сирене, чили крисп, лайм и сусам.",
            en: "Avocado, soft herbs, whipped feta, chili crisp, lime, sesame.",
          },
          price: 15,
          image: "/images/menus/brunch/chili-crunch-avocado-toast.jpg",
          accent: { bg: "Леко пикантно", en: "A little heat" },
          removableIngredients: [
            { bg: "чили крисп", en: "chili crisp" },
            { bg: "фета", en: "feta" },
            { bg: "сусам", en: "sesame" },
          ],
        },
        {
          id: "smoked-salmon-avocado-toast",
          name: { bg: "Тост с авокадо и пушена сьомга", en: "Smoked Salmon Avocado Toast" },
          description: {
            bg: "Авокадо, студено пушена сьомга, краставица, копър и крем с каперси.",
            en: "Avocado, cold-smoked salmon, cucumber ribbons, dill, caper cream.",
          },
          price: 18,
          image: "/images/menus/brunch/smoked-salmon-avocado-toast.jpg",
          accent: { bg: "Морски вкус", en: "Coastal" },
          removableIngredients: [
            { bg: "каперсов крем", en: "caper cream" },
            { bg: "копър", en: "dill" },
            { bg: "краставица", en: "cucumber" },
          ],
        },
      ],
    },
    {
      id: "eggs-benedict",
      eyebrow: { bg: "Поширани на момента", en: "Poached to order" },
      title: { bg: "Яйца Бенедикт", en: "Eggs Benedict" },
      note: {
        bg: "Сервирани върху препечен бриош с лимонов холандез и зелена салата.",
        en: "Served on toasted brioche with lemon hollandaise and dressed greens.",
      },
      items: [
        {
          id: "classic-eggs-benedict",
          name: { bg: "Класически яйца Бенедикт", en: "Classic Eggs Benedict" },
          description: {
            bg: "Поширани яйца, шунка, бриош, холандез с див лук и картофи.",
            en: "Poached eggs, ham, brioche, chive hollandaise, breakfast potatoes.",
          },
          price: 17,
          image: "/images/menus/brunch/classic-eggs-benedict.jpg",
          accent: { bg: "Класика", en: "Classic" },
          removableIngredients: [
            { bg: "шунка", en: "ham" },
            { bg: "холандез", en: "hollandaise" },
            { bg: "див лук", en: "chives" },
          ],
        },
        {
          id: "florentine-benedict",
          name: { bg: "Бенедикт Флорентин", en: "Florentine Benedict" },
          description: {
            bg: "Поширани яйца, спанак, печен домат, бриош и босилков холандез.",
            en: "Poached eggs, spinach, roasted tomato, brioche, basil hollandaise.",
          },
          price: 16,
          image: "/images/menus/brunch/florentine-benedict.jpg",
          accent: { bg: "Вегетарианско", en: "Vegetarian" },
          removableIngredients: [
            { bg: "спанак", en: "spinach" },
            { bg: "печен домат", en: "roasted tomato" },
            { bg: "босилков холандез", en: "basil hollandaise" },
          ],
        },
        {
          id: "crab-cake-benedict",
          name: { bg: "Бенедикт с краб кейк", en: "Crab Cake Benedict" },
          description: {
            bg: "Краб кейк, поширани яйца, холандез с печен лимон и билки.",
            en: "Blue crab cakes, poached eggs, charred lemon hollandaise, herbs.",
          },
          price: 22,
          image: "/images/menus/brunch/crab-cake-benedict.jpg",
          accent: { bg: "Специално", en: "Featured" },
          removableIngredients: [
            { bg: "билки", en: "herbs" },
            { bg: "холандез", en: "hollandaise" },
            { bg: "лимон", en: "lemon" },
          ],
        },
      ],
    },
    {
      id: "specialty-coffee",
      eyebrow: { bg: "Кафе бар", en: "Featured bar" },
      title: { bg: "Специално кафе", en: "Specialty Coffee" },
      note: {
        bg: "Ароматни напитки, внимателна екстракция и студени варианти за брънч.",
        en: "Soft aromatics, careful extraction, and brunch-friendly iced pours.",
      },
      featured: true,
      items: [
        {
          id: "honey-cardamom-latte",
          name: { bg: "Лате с мед и кардамон", en: "Honey Cardamom Latte" },
          description: {
            bg: "Двойно еспресо, мляко на пара, мед от диви цветя и кардамон.",
            en: "Double espresso, steamed milk, wildflower honey, cardamom dust.",
          },
          price: 6,
          image: "/images/menus/brunch/honey-cardamom-latte.jpg",
          accent: { bg: "Фирмено", en: "Signature" },
          removableIngredients: [
            { bg: "мед", en: "honey" },
            { bg: "кардамон", en: "cardamom" },
            { bg: "мляко", en: "milk" },
          ],
        },
        {
          id: "orange-blossom-cold-brew",
          name: { bg: "Колд брю с портокалов цвят", en: "Orange Blossom Cold Brew" },
          description: {
            bg: "Бавно извлечено студено кафе, сироп от портокалов цвят, цитрус и тоник.",
            en: "Slow-steeped cold brew, orange blossom syrup, citrus peel, tonic sparkle.",
          },
          price: 7,
          image: "/images/menus/brunch/orange-blossom-cold-brew.jpg",
          accent: { bg: "Студено", en: "Iced" },
          removableIngredients: [
            { bg: "сироп", en: "syrup" },
            { bg: "цитрус", en: "citrus" },
            { bg: "тоник", en: "tonic" },
          ],
        },
        {
          id: "pistachio-cortado",
          name: { bg: "Кортадо с шамфъстък", en: "Pistachio Cortado" },
          description: {
            bg: "Равни части еспресо и мляко с крем от печен шамфъстък.",
            en: "Equal parts espresso and milk with toasted pistachio cream.",
          },
          price: 5,
          image: "/images/menus/brunch/pistachio-cortado.jpg",
          accent: { bg: "Малка чаша", en: "Small cup" },
          removableIngredients: [
            { bg: "крем от шамфъстък", en: "pistachio cream" },
            { bg: "мляко", en: "milk" },
            { bg: "пяна", en: "foam" },
          ],
        },
      ],
    },
  ],
};

const theme: DemoMenuTheme = {
  pageClass: "min-h-screen bg-[#e9dfd0] text-[#232323]",
  shellClass: "mx-auto min-h-screen max-w-[430px] bg-[#fbf8f2] pb-4 shadow-2xl",
  heroClass: "border-b border-[#eadfd0] bg-[linear-gradient(135deg,#fffdf8_0%,#f7efe3_52%,#eff7f1_100%)] px-5 pb-7 pt-8",
  heroEyebrowClass: "text-xs font-semibold uppercase tracking-[0.26em] text-[#c46f4d]",
  heroTitleClass: "mt-4 font-playfair text-4xl font-semibold leading-10 text-[#1f2b22]",
  heroTextClass: "mt-4 text-sm leading-6 text-[#5d6259]",
  statClass: "rounded-lg border border-[#e5d6c5] bg-white/70 px-2 py-3 text-xs font-semibold text-[#526b55]",
  contentClass: "grid gap-10 px-4 py-6",
  sectionEyebrowClass: "text-[10px] font-semibold uppercase tracking-[0.22em] text-[#c46f4d]",
  sectionTitleClass: "mt-1 font-playfair text-3xl font-semibold text-[#1f2b22]",
  sectionNoteClass: "mt-2 text-sm leading-5 text-[#6f675f]",
  sectionFeaturedClass: "rounded-lg bg-[#1f2b22] px-4 py-5 text-white",
  cardClass: "overflow-hidden rounded-lg border border-[#eadfd0] bg-white shadow-sm",
  cardFeaturedClass: "border-[#d4a373]/40 bg-[#fffaf0] text-[#232323]",
  imageWrapClass: "relative aspect-[16/10] overflow-hidden bg-[#f3eadf]",
  imageClass: "object-contain",
  accentClass: "text-[10px] font-semibold uppercase tracking-[0.18em] text-[#c46f4d]",
  itemTitleClass: "mt-1 font-playfair text-xl font-semibold leading-6 text-[#232323]",
  itemDescriptionClass: "text-sm leading-5 text-[#67615b]",
  priceClass: "shrink-0 rounded-full bg-[#edf5ee] px-3 py-1 text-sm font-semibold text-[#35533d]",
  addButtonClass: "h-10 w-full gap-2 rounded-full bg-[#35533d] text-white hover:bg-[#263d2d]",
  panelClass: "grid gap-4 rounded-lg border border-[#eadfd0] bg-[#fbf8f2] p-3",
  chipClass: "rounded-md border border-[#e4d3bc] bg-white px-2.5 py-1 text-xs font-medium text-[#55392c]",
  chipActiveClass: "rounded-md border border-[#c46f4d] bg-[#fff0e8] px-2.5 py-1 text-xs font-bold text-[#9f3d20] line-through",
  inputClass: "mt-2 resize-none border-[#e4d3bc] bg-white text-sm",
  cartClass: "sticky bottom-3 z-[70] mx-4 rounded-lg border border-[#d7c4ad] bg-white/95 p-4 text-[#232323] shadow-2xl backdrop-blur",
  cartButtonClass: "flex h-8 w-8 items-center justify-center rounded-full bg-[#edf5ee] text-[#35533d]",
};

export default function BrunchMenuPage() {
  return <DemoMenuExperience content={content} theme={theme} />;
}
