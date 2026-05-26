import type { Metadata } from "next";
import Image from "next/image";

export const metadata: Metadata = {
  title: "Bulgarian Restaurant Menu",
  description: "Traditional Bulgarian restaurant menu with ingredients and allergens.",
};

type BulgarianDish = {
  name: string;
  description: string;
  price: string;
  image: string;
  ingredients: string[];
  allergens: string[];
};

type BulgarianSection = {
  title: string;
  intro: string;
  dishes: BulgarianDish[];
};

const sections: BulgarianSection[] = [
  {
    title: "Soups & Cold Table",
    intro: "Traditional first plates with bright herbs, dairy, and village vegetables.",
    dishes: [
      {
        name: "Shkembe Chorba",
        description: "Slow-simmered tripe soup served with garlic vinegar and hot paprika.",
        price: "12 BGN",
        image: "/images/menus/bulgarian/shkembe-chorba.jpg",
        ingredients: ["beef tripe", "milk", "butter", "paprika", "garlic vinegar", "chili flakes"],
        allergens: ["milk"],
      },
      {
        name: "Tarator",
        description: "Chilled yogurt soup with cucumber, dill, walnuts, and olive oil.",
        price: "8 BGN",
        image: "/images/menus/bulgarian/tarator.jpg",
        ingredients: ["Bulgarian yogurt", "cucumber", "dill", "walnuts", "garlic", "olive oil"],
        allergens: ["milk", "tree nuts"],
      },
      {
        name: "Shopska Salad",
        description: "Tomato, cucumber, roasted pepper, onion, parsley, and grated sirene.",
        price: "11 BGN",
        image: "/images/menus/bulgarian/shopska-salad.jpg",
        ingredients: ["tomatoes", "cucumber", "roasted pepper", "red onion", "parsley", "sirene cheese"],
        allergens: ["milk"],
      },
    ],
  },
  {
    title: "From the Oven",
    intro: "Comforting baked dishes with paprika, herbs, eggs, and white cheese.",
    dishes: [
      {
        name: "Musaka",
        description: "Classic baked potatoes and minced pork with yogurt-egg topping.",
        price: "15 BGN",
        image: "/images/menus/bulgarian/musaka.jpg",
        ingredients: ["potatoes", "minced pork", "tomato", "onion", "eggs", "yogurt", "paprika"],
        allergens: ["eggs", "milk"],
      },
      {
        name: "Pulneni Chushki",
        description: "Stuffed peppers with rice, minced pork, tomato, and savory herbs.",
        price: "16 BGN",
        image: "/images/menus/bulgarian/pulneni-chushki.jpg",
        ingredients: ["bell peppers", "rice", "minced pork", "tomato", "onion", "savory", "parsley"],
        allergens: ["none"],
      },
      {
        name: "Banitsa",
        description: "Crisp filo pastry baked with sirene cheese, eggs, and yogurt.",
        price: "9 BGN",
        image: "/images/menus/bulgarian/banitsa.jpg",
        ingredients: ["filo pastry", "sirene cheese", "eggs", "yogurt", "butter"],
        allergens: ["gluten", "eggs", "milk"],
      },
    ],
  },
  {
    title: "Grill & Clay Pot",
    intro: "Rustic mains built for sharing, served with pickles and roasted peppers.",
    dishes: [
      {
        name: "Kavarma",
        description: "Clay-pot pork stew with onion, mushrooms, peppers, tomato, and wine.",
        price: "18 BGN",
        image: "/images/menus/bulgarian/kavarma.jpg",
        ingredients: ["pork shoulder", "onion", "mushrooms", "peppers", "tomato", "red wine", "savory"],
        allergens: ["sulfites"],
      },
      {
        name: "Kebapche",
        description: "Grilled minced pork and beef sausage with cumin and lyutenitsa.",
        price: "13 BGN",
        image: "/images/menus/bulgarian/kebapche.jpg",
        ingredients: ["minced pork", "minced beef", "cumin", "black pepper", "lyutenitsa", "parsley"],
        allergens: ["none"],
      },
      {
        name: "Selski Sach",
        description: "Hot iron platter with pork, chicken, peppers, mushrooms, onions, and kashkaval.",
        price: "29 BGN",
        image: "/images/menus/bulgarian/selski-sach.jpg",
        ingredients: ["pork", "chicken", "peppers", "mushrooms", "onion", "kashkaval", "thyme"],
        allergens: ["milk"],
      },
    ],
  },
  {
    title: "Sweet Finish",
    intro: "Simple village desserts with yogurt, honey, nuts, and syrup.",
    dishes: [
      {
        name: "Kiselo Mlyako with Honey",
        description: "Thick Bulgarian yogurt with mountain honey and toasted walnuts.",
        price: "8 BGN",
        image: "/images/menus/bulgarian/kiselo-mlyako-honey.jpg",
        ingredients: ["Bulgarian yogurt", "mountain honey", "walnuts"],
        allergens: ["milk", "tree nuts"],
      },
      {
        name: "Tikvenik",
        description: "Pumpkin filo pastry with cinnamon, walnuts, and sugar.",
        price: "9 BGN",
        image: "/images/menus/bulgarian/tikvenik.jpg",
        ingredients: ["filo pastry", "pumpkin", "walnuts", "cinnamon", "sugar", "sunflower oil"],
        allergens: ["gluten", "tree nuts"],
      },
    ],
  },
];

function DishCard({ dish }: { dish: BulgarianDish }) {
  return (
    <article className="grid overflow-hidden rounded-lg border border-[#d8c7ae] bg-[#fffaf2] shadow-sm md:grid-cols-[220px_1fr]">
      <div className="relative aspect-[4/3] bg-[#efe2cf] md:aspect-auto">
        <span className="absolute inset-0 flex items-center justify-center px-6 text-center text-xs font-bold uppercase tracking-[0.18em] text-[#8a6c57]">
          Photo: {dish.name}
        </span>
        <Image
          src={dish.image}
          alt={dish.name}
          fill
          sizes="(min-width: 768px) 220px, 100vw"
          className="z-10 h-full w-full object-cover"
        />
      </div>
      <div className="grid gap-5 p-5">
        <div className="flex flex-col justify-between gap-3 sm:flex-row sm:items-start">
          <div>
            <h3 className="font-playfair text-3xl font-semibold text-[#4b2418]">{dish.name}</h3>
            <p className="mt-2 max-w-2xl text-sm leading-6 text-[#6c5144]">{dish.description}</p>
          </div>
          <span className="w-fit rounded-md bg-[#2f4d35] px-3 py-2 text-sm font-bold text-white">{dish.price}</span>
        </div>

        <div className="grid gap-4 lg:grid-cols-[1fr_auto] lg:items-start">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.18em] text-[#a8452a]">Ingredients</p>
            <div className="mt-2 flex flex-wrap gap-2">
              {dish.ingredients.map((ingredient) => (
                <span key={ingredient} className="rounded-md border border-[#e4d3bc] bg-white px-2.5 py-1 text-xs font-medium text-[#55392c]">
                  {ingredient}
                </span>
              ))}
            </div>
          </div>

          <div>
            <p className="text-xs font-bold uppercase tracking-[0.18em] text-[#a8452a]">Allergens</p>
            <div className="mt-2 flex flex-wrap gap-2 lg:max-w-64 lg:justify-end">
              {dish.allergens.map((allergen) => (
                <span key={allergen} className="rounded-md bg-[#f0dfca] px-2.5 py-1 text-xs font-bold text-[#4b2418]">
                  {allergen}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </article>
  );
}

export default function BulgarianMenuPage() {
  return (
    <main className="min-h-screen bg-[#f7efe2] text-[#3f2a20]">
      <section className="border-b border-[#d8c7ae] bg-[linear-gradient(135deg,#fff8ed_0%,#f5e4cd_45%,#e7efe2_100%)] px-5 py-16 sm:px-8 lg:px-12">
        <div className="mx-auto grid max-w-6xl gap-10 lg:grid-cols-[1fr_0.85fr] lg:items-end">
          <div>
            <p className="text-sm font-bold uppercase tracking-[0.3em] text-[#a8452a]">Traditional Bulgarian table</p>
            <h1 className="mt-5 max-w-3xl font-playfair text-5xl font-semibold leading-tight text-[#4b2418] sm:text-6xl lg:text-7xl">
              Warm clay pots, village herbs, and recipes made for sharing.
            </h1>
          </div>
          <div className="border-l border-[#cdb596] pl-6">
            <p className="text-lg leading-8 text-[#6c5144]">
              A rustic menu of Bulgarian classics, with ingredients and allergen labels shown for every dish.
            </p>
            <div className="mt-8 grid grid-cols-3 gap-3 text-center">
              {["11 dishes", "BG classics", "Allergens"].map((label) => (
                <span key={label} className="rounded-lg border border-[#d8c7ae] bg-[#fffaf2]/80 px-3 py-3 text-sm font-bold text-[#2f4d35]">
                  {label}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      <div className="mx-auto grid max-w-6xl gap-14 px-5 py-14 sm:px-8 lg:px-12">
        {sections.map((section) => (
          <section key={section.title}>
            <div className="mb-7 flex flex-col justify-between gap-4 border-b border-[#d8c7ae] pb-5 md:flex-row md:items-end">
              <div>
                <p className="text-xs font-bold uppercase tracking-[0.22em] text-[#a8452a]">Menu section</p>
                <h2 className="mt-2 font-playfair text-4xl font-semibold text-[#4b2418]">{section.title}</h2>
              </div>
              <p className="max-w-xl text-sm leading-6 text-[#6c5144]">{section.intro}</p>
            </div>
            <div className="grid gap-5">
              {section.dishes.map((dish) => (
                <DishCard key={dish.name} dish={dish} />
              ))}
            </div>
          </section>
        ))}
      </div>
    </main>
  );
}
