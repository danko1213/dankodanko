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
        price: "€6",
        image: "/images/menus/bulgarian/shkembe-chorba.jpg",
        ingredients: ["beef tripe", "milk", "butter", "paprika", "garlic vinegar", "chili flakes"],
        allergens: ["milk"],
      },
      {
        name: "Tarator",
        description: "Chilled yogurt soup with cucumber, dill, walnuts, and olive oil.",
        price: "€4",
        image: "/images/menus/bulgarian/tarator.jpg",
        ingredients: ["Bulgarian yogurt", "cucumber", "dill", "walnuts", "garlic", "olive oil"],
        allergens: ["milk", "tree nuts"],
      },
      {
        name: "Shopska Salad",
        description: "Tomato, cucumber, roasted pepper, onion, parsley, and grated sirene.",
        price: "€6",
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
        price: "€8",
        image: "/images/menus/bulgarian/musaka.jpg",
        ingredients: ["potatoes", "minced pork", "tomato", "onion", "eggs", "yogurt", "paprika"],
        allergens: ["eggs", "milk"],
      },
      {
        name: "Pulneni Chushki",
        description: "Stuffed peppers with rice, minced pork, tomato, and savory herbs.",
        price: "€8",
        image: "/images/menus/bulgarian/pulneni-chushki.jpg",
        ingredients: ["bell peppers", "rice", "minced pork", "tomato", "onion", "savory", "parsley"],
        allergens: ["none"],
      },
      {
        name: "Banitsa",
        description: "Crisp filo pastry baked with sirene cheese, eggs, and yogurt.",
        price: "€5",
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
        price: "€9",
        image: "/images/menus/bulgarian/kavarma.jpg",
        ingredients: ["pork shoulder", "onion", "mushrooms", "peppers", "tomato", "red wine", "savory"],
        allergens: ["sulfites"],
      },
      {
        name: "Kebapche",
        description: "Grilled minced pork and beef sausage with cumin and lyutenitsa.",
        price: "€7",
        image: "/images/menus/bulgarian/kebapche.jpg",
        ingredients: ["minced pork", "minced beef", "cumin", "black pepper", "lyutenitsa", "parsley"],
        allergens: ["none"],
      },
      {
        name: "Selski Sach",
        description: "Hot iron platter with pork, chicken, peppers, mushrooms, onions, and kashkaval.",
        price: "€15",
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
        price: "€4",
        image: "/images/menus/bulgarian/kiselo-mlyako-honey.jpg",
        ingredients: ["Bulgarian yogurt", "mountain honey", "walnuts"],
        allergens: ["milk", "tree nuts"],
      },
      {
        name: "Tikvenik",
        description: "Pumpkin filo pastry with cinnamon, walnuts, and sugar.",
        price: "€5",
        image: "/images/menus/bulgarian/tikvenik.jpg",
        ingredients: ["filo pastry", "pumpkin", "walnuts", "cinnamon", "sugar", "sunflower oil"],
        allergens: ["gluten", "tree nuts"],
      },
    ],
  },
];

function DishCard({ dish }: { dish: BulgarianDish }) {
  return (
    <article className="overflow-hidden rounded-lg border border-[#d8c7ae] bg-[#fffaf2] shadow-sm">
      <div className="relative aspect-[16/10] bg-[#efe2cf]">
        <Image
          src={dish.image}
          alt={dish.name}
          fill
          sizes="430px"
          className="object-contain"
        />
      </div>
      <div className="grid gap-4 p-4">
        <div className="flex items-start justify-between gap-3">
          <div>
            <h3 className="font-playfair text-2xl font-semibold leading-7 text-[#4b2418]">{dish.name}</h3>
            <p className="mt-2 text-sm leading-5 text-[#6c5144]">{dish.description}</p>
          </div>
          <span className="shrink-0 rounded-md bg-[#2f4d35] px-3 py-2 text-sm font-bold text-white">{dish.price}</span>
        </div>

        <div className="grid gap-4">
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
            <div className="mt-2 flex flex-wrap gap-2">
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
    <main className="min-h-screen bg-[#d9c5a8] text-[#3f2a20]">
      <div className="mx-auto min-h-screen max-w-[430px] bg-[#f7efe2] shadow-2xl">
        <section className="border-b border-[#d8c7ae] bg-[linear-gradient(135deg,#fff8ed_0%,#f5e4cd_45%,#e7efe2_100%)] px-4 pb-7 pt-8">
          <div className="grid gap-5">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.26em] text-[#a8452a]">Demo 3 · Bulgarian table</p>
              <h1 className="mt-4 font-playfair text-4xl font-semibold leading-10 text-[#4b2418]">
                Rustic classics for a warm phone menu.
              </h1>
            </div>
            <div className="border-l border-[#cdb596] pl-4">
              <p className="text-sm leading-6 text-[#6c5144]">
                A rustic menu of Bulgarian classics, with ingredients and allergen labels shown for every dish.
              </p>
              <div className="mt-5 grid grid-cols-3 gap-2 text-center">
                {["11 dishes", "BG classics", "Allergens"].map((label) => (
                  <span key={label} className="rounded-lg border border-[#d8c7ae] bg-[#fffaf2]/80 px-2 py-3 text-xs font-bold text-[#2f4d35]">
                    {label}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </section>

        <div className="grid gap-10 px-4 py-6">
          {sections.map((section) => (
            <section key={section.title}>
              <div className="mb-4 border-b border-[#d8c7ae] pb-4">
                <div>
                  <p className="text-[10px] font-bold uppercase tracking-[0.22em] text-[#a8452a]">Menu section</p>
                  <h2 className="mt-1 font-playfair text-3xl font-semibold text-[#4b2418]">{section.title}</h2>
                </div>
                <p className="mt-2 text-sm leading-5 text-[#6c5144]">{section.intro}</p>
              </div>
              <div className="grid gap-4">
                {section.dishes.map((dish) => (
                  <DishCard key={dish.name} dish={dish} />
                ))}
              </div>
            </section>
          ))}
        </div>
      </div>
    </main>
  );
}
