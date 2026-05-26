import type { Metadata } from "next";
import { DemoMenuExperience, type DemoMenuContent, type DemoMenuTheme } from "../_components/demo-menu-experience";

export const metadata: Metadata = {
  title: "Българско ресторантско меню",
  description: "Традиционно българско меню с английски превод, съставки, алергени, количка и бележки.",
};

const content: DemoMenuContent = {
  hero: {
    eyebrow: { bg: "Демо 3 · Българска трапеза", en: "Demo 3 · Bulgarian table" },
    title: {
      bg: "Топли класики за удобно мобилно меню.",
      en: "Rustic classics for a warm phone menu.",
    },
    description: {
      bg: "Традиционни български ястия със съставки, алергени и възможност за специални бележки.",
      en: "A rustic menu of Bulgarian classics, with ingredients and allergen labels shown for every dish.",
    },
    stats: [
      { bg: "11 ястия", en: "11 dishes" },
      { bg: "БГ класики", en: "BG classics" },
      { bg: "Алергени", en: "Allergens" },
    ],
  },
  showIngredients: true,
  showAllergens: true,
  sections: [
    {
      id: "soups-cold-table",
      eyebrow: { bg: "Раздел меню", en: "Menu section" },
      title: { bg: "Супи и студена маса", en: "Soups & Cold Table" },
      note: {
        bg: "Традиционни първи ястия със свежи билки, млечни продукти и селски зеленчуци.",
        en: "Traditional first plates with bright herbs, dairy, and village vegetables.",
      },
      items: [
        {
          id: "shkembe-chorba",
          name: { bg: "Шкембе чорба", en: "Shkembe Chorba" },
          description: {
            bg: "Бавно варена шкембе чорба с чеснов оцет и лют червен пипер.",
            en: "Slow-simmered tripe soup served with garlic vinegar and hot paprika.",
          },
          price: 6,
          image: "/images/menus/bulgarian/shkembe-chorba.jpg",
          accent: { bg: "Класическа супа", en: "Classic soup" },
          ingredients: [
            { bg: "телешко шкембе", en: "beef tripe" },
            { bg: "мляко", en: "milk" },
            { bg: "масло", en: "butter" },
            { bg: "червен пипер", en: "paprika" },
            { bg: "чеснов оцет", en: "garlic vinegar" },
            { bg: "люти люспи", en: "chili flakes" },
          ],
          allergens: [{ bg: "мляко", en: "milk" }],
          removableIngredients: [
            { bg: "люти люспи", en: "chili flakes" },
            { bg: "чеснов оцет", en: "garlic vinegar" },
            { bg: "масло", en: "butter" },
          ],
        },
        {
          id: "tarator",
          name: { bg: "Таратор", en: "Tarator" },
          description: {
            bg: "Студена супа с кисело мляко, краставица, копър, орехи и зехтин.",
            en: "Chilled yogurt soup with cucumber, dill, walnuts, and olive oil.",
          },
          price: 4,
          image: "/images/menus/bulgarian/tarator.jpg",
          accent: { bg: "Студено", en: "Chilled" },
          ingredients: [
            { bg: "кисело мляко", en: "Bulgarian yogurt" },
            { bg: "краставица", en: "cucumber" },
            { bg: "копър", en: "dill" },
            { bg: "орехи", en: "walnuts" },
            { bg: "чесън", en: "garlic" },
            { bg: "зехтин", en: "olive oil" },
          ],
          allergens: [
            { bg: "мляко", en: "milk" },
            { bg: "ядки", en: "tree nuts" },
          ],
          removableIngredients: [
            { bg: "орехи", en: "walnuts" },
            { bg: "чесън", en: "garlic" },
            { bg: "копър", en: "dill" },
          ],
        },
        {
          id: "shopska-salad",
          name: { bg: "Шопска салата", en: "Shopska Salad" },
          description: {
            bg: "Домат, краставица, печена чушка, лук, магданоз и настъргано сирене.",
            en: "Tomato, cucumber, roasted pepper, onion, parsley, and grated sirene.",
          },
          price: 6,
          image: "/images/menus/bulgarian/shopska-salad.jpg",
          accent: { bg: "Свежа салата", en: "Fresh salad" },
          ingredients: [
            { bg: "домати", en: "tomatoes" },
            { bg: "краставица", en: "cucumber" },
            { bg: "печена чушка", en: "roasted pepper" },
            { bg: "червен лук", en: "red onion" },
            { bg: "магданоз", en: "parsley" },
            { bg: "сирене", en: "sirene cheese" },
          ],
          allergens: [{ bg: "мляко", en: "milk" }],
          removableIngredients: [
            { bg: "лук", en: "onion" },
            { bg: "сирене", en: "sirene cheese" },
            { bg: "магданоз", en: "parsley" },
          ],
        },
      ],
    },
    {
      id: "from-the-oven",
      eyebrow: { bg: "Раздел меню", en: "Menu section" },
      title: { bg: "От фурната", en: "From the Oven" },
      note: {
        bg: "Домашни печени ястия с червен пипер, билки, яйца и бяло сирене.",
        en: "Comforting baked dishes with paprika, herbs, eggs, and white cheese.",
      },
      items: [
        {
          id: "musaka",
          name: { bg: "Мусака", en: "Musaka" },
          description: {
            bg: "Класическа запечена мусака с картофи, кайма и заливка от кисело мляко и яйца.",
            en: "Classic baked potatoes and minced pork with yogurt-egg topping.",
          },
          price: 8,
          image: "/images/menus/bulgarian/musaka.jpg",
          accent: { bg: "Домашно", en: "Home style" },
          ingredients: [
            { bg: "картофи", en: "potatoes" },
            { bg: "свинска кайма", en: "minced pork" },
            { bg: "домат", en: "tomato" },
            { bg: "лук", en: "onion" },
            { bg: "яйца", en: "eggs" },
            { bg: "кисело мляко", en: "yogurt" },
            { bg: "червен пипер", en: "paprika" },
          ],
          allergens: [
            { bg: "яйца", en: "eggs" },
            { bg: "мляко", en: "milk" },
          ],
          removableIngredients: [
            { bg: "лук", en: "onion" },
            { bg: "магданоз", en: "parsley" },
            { bg: "червен пипер", en: "paprika" },
          ],
        },
        {
          id: "pulneni-chushki",
          name: { bg: "Пълнени чушки", en: "Pulneni Chushki" },
          description: {
            bg: "Чушки, пълнени с ориз, свинска кайма, домат и чубрица.",
            en: "Stuffed peppers with rice, minced pork, tomato, and savory herbs.",
          },
          price: 8,
          image: "/images/menus/bulgarian/pulneni-chushki.jpg",
          accent: { bg: "Печени чушки", en: "Stuffed peppers" },
          ingredients: [
            { bg: "чушки", en: "bell peppers" },
            { bg: "ориз", en: "rice" },
            { bg: "свинска кайма", en: "minced pork" },
            { bg: "домат", en: "tomato" },
            { bg: "лук", en: "onion" },
            { bg: "чубрица", en: "savory" },
            { bg: "магданоз", en: "parsley" },
          ],
          allergens: [{ bg: "няма", en: "none" }],
          removableIngredients: [
            { bg: "лук", en: "onion" },
            { bg: "магданоз", en: "parsley" },
            { bg: "чубрица", en: "savory" },
          ],
        },
        {
          id: "banitsa",
          name: { bg: "Баница", en: "Banitsa" },
          description: {
            bg: "Хрупкави кори със сирене, яйца, кисело мляко и масло.",
            en: "Crisp filo pastry baked with sirene cheese, eggs, and yogurt.",
          },
          price: 5,
          image: "/images/menus/bulgarian/banitsa.jpg",
          accent: { bg: "Печиво", en: "Pastry" },
          ingredients: [
            { bg: "кори за баница", en: "filo pastry" },
            { bg: "сирене", en: "sirene cheese" },
            { bg: "яйца", en: "eggs" },
            { bg: "кисело мляко", en: "yogurt" },
            { bg: "масло", en: "butter" },
          ],
          allergens: [
            { bg: "глутен", en: "gluten" },
            { bg: "яйца", en: "eggs" },
            { bg: "мляко", en: "milk" },
          ],
          removableIngredients: [
            { bg: "масло", en: "butter" },
            { bg: "сирене", en: "sirene cheese" },
            { bg: "кисело мляко", en: "yogurt" },
          ],
        },
      ],
    },
    {
      id: "grill-clay-pot",
      eyebrow: { bg: "Раздел меню", en: "Menu section" },
      title: { bg: "Скара и гювеч", en: "Grill & Clay Pot" },
      note: {
        bg: "Селски основни ястия за споделяне с кисели краставички и печени чушки.",
        en: "Rustic mains built for sharing, served with pickles and roasted peppers.",
      },
      items: [
        {
          id: "kavarma",
          name: { bg: "Кавърма", en: "Kavarma" },
          description: {
            bg: "Свинско в гювеч с лук, гъби, чушки, домат и червено вино.",
            en: "Clay-pot pork stew with onion, mushrooms, peppers, tomato, and wine.",
          },
          price: 9,
          image: "/images/menus/bulgarian/kavarma.jpg",
          accent: { bg: "Гювеч", en: "Clay pot" },
          ingredients: [
            { bg: "свинско месо", en: "pork shoulder" },
            { bg: "лук", en: "onion" },
            { bg: "гъби", en: "mushrooms" },
            { bg: "чушки", en: "peppers" },
            { bg: "домат", en: "tomato" },
            { bg: "червено вино", en: "red wine" },
            { bg: "чубрица", en: "savory" },
          ],
          allergens: [{ bg: "сулфити", en: "sulfites" }],
          removableIngredients: [
            { bg: "лук", en: "onion" },
            { bg: "гъби", en: "mushrooms" },
            { bg: "чушки", en: "peppers" },
          ],
        },
        {
          id: "kebapche",
          name: { bg: "Кебапче", en: "Kebapche" },
          description: {
            bg: "Печено кебапче от свинско и телешко с кимион и лютеница.",
            en: "Grilled minced pork and beef sausage with cumin and lyutenitsa.",
          },
          price: 7,
          image: "/images/menus/bulgarian/kebapche.jpg",
          accent: { bg: "Скара", en: "Grill" },
          ingredients: [
            { bg: "свинска кайма", en: "minced pork" },
            { bg: "телешка кайма", en: "minced beef" },
            { bg: "кимион", en: "cumin" },
            { bg: "черен пипер", en: "black pepper" },
            { bg: "лютеница", en: "lyutenitsa" },
            { bg: "магданоз", en: "parsley" },
          ],
          allergens: [{ bg: "няма", en: "none" }],
          removableIngredients: [
            { bg: "лютеница", en: "lyutenitsa" },
            { bg: "магданоз", en: "parsley" },
            { bg: "кимион", en: "cumin" },
          ],
        },
        {
          id: "selski-sach",
          name: { bg: "Селски сач", en: "Selski Sach" },
          description: {
            bg: "Горещ сач със свинско, пилешко, чушки, гъби, лук и кашкавал.",
            en: "Hot iron platter with pork, chicken, peppers, mushrooms, onions, and kashkaval.",
          },
          price: 15,
          image: "/images/menus/bulgarian/selski-sach.jpg",
          accent: { bg: "За споделяне", en: "To share" },
          ingredients: [
            { bg: "свинско", en: "pork" },
            { bg: "пилешко", en: "chicken" },
            { bg: "чушки", en: "peppers" },
            { bg: "гъби", en: "mushrooms" },
            { bg: "лук", en: "onion" },
            { bg: "кашкавал", en: "kashkaval" },
            { bg: "мащерка", en: "thyme" },
          ],
          allergens: [{ bg: "мляко", en: "milk" }],
          removableIngredients: [
            { bg: "лук", en: "onion" },
            { bg: "гъби", en: "mushrooms" },
            { bg: "кашкавал", en: "kashkaval" },
          ],
        },
      ],
    },
    {
      id: "sweet-finish",
      eyebrow: { bg: "Раздел меню", en: "Menu section" },
      title: { bg: "Сладък финал", en: "Sweet Finish" },
      note: {
        bg: "Селски десерти с кисело мляко, мед, ядки и тиква.",
        en: "Simple village desserts with yogurt, honey, nuts, and syrup.",
      },
      items: [
        {
          id: "kiselo-mlyako-honey",
          name: { bg: "Кисело мляко с мед", en: "Kiselo Mlyako with Honey" },
          description: {
            bg: "Гъсто българско кисело мляко с планински мед и печени орехи.",
            en: "Thick Bulgarian yogurt with mountain honey and toasted walnuts.",
          },
          price: 4,
          image: "/images/menus/bulgarian/kiselo-mlyako-honey.jpg",
          accent: { bg: "Лек десерт", en: "Light dessert" },
          ingredients: [
            { bg: "кисело мляко", en: "Bulgarian yogurt" },
            { bg: "планински мед", en: "mountain honey" },
            { bg: "орехи", en: "walnuts" },
          ],
          allergens: [
            { bg: "мляко", en: "milk" },
            { bg: "ядки", en: "tree nuts" },
          ],
          removableIngredients: [
            { bg: "мед", en: "honey" },
            { bg: "орехи", en: "walnuts" },
            { bg: "канела", en: "cinnamon" },
          ],
        },
        {
          id: "tikvenik",
          name: { bg: "Тиквеник", en: "Tikvenik" },
          description: {
            bg: "Тиквен сладкиш с кори, канела, орехи и захар.",
            en: "Pumpkin filo pastry with cinnamon, walnuts, and sugar.",
          },
          price: 5,
          image: "/images/menus/bulgarian/tikvenik.jpg",
          accent: { bg: "Сезонно", en: "Seasonal" },
          ingredients: [
            { bg: "кори за баница", en: "filo pastry" },
            { bg: "тиква", en: "pumpkin" },
            { bg: "орехи", en: "walnuts" },
            { bg: "канела", en: "cinnamon" },
            { bg: "захар", en: "sugar" },
            { bg: "слънчогледово олио", en: "sunflower oil" },
          ],
          allergens: [
            { bg: "глутен", en: "gluten" },
            { bg: "ядки", en: "tree nuts" },
          ],
          removableIngredients: [
            { bg: "орехи", en: "walnuts" },
            { bg: "канела", en: "cinnamon" },
            { bg: "захар", en: "sugar" },
          ],
        },
      ],
    },
  ],
};

const theme: DemoMenuTheme = {
  pageClass: "min-h-screen bg-[#d9c5a8] text-[#3f2a20]",
  shellClass: "mx-auto min-h-screen max-w-[430px] bg-[#f7efe2] pb-4 shadow-2xl",
  heroClass: "border-b border-[#d8c7ae] bg-[linear-gradient(135deg,#fff8ed_0%,#f5e4cd_45%,#e7efe2_100%)] px-4 pb-7 pt-8",
  heroEyebrowClass: "text-xs font-bold uppercase tracking-[0.26em] text-[#a8452a]",
  heroTitleClass: "mt-4 font-playfair text-4xl font-semibold leading-10 text-[#4b2418]",
  heroTextClass: "mt-4 border-l border-[#cdb596] pl-4 text-sm leading-6 text-[#6c5144]",
  statClass: "rounded-lg border border-[#d8c7ae] bg-[#fffaf2]/80 px-2 py-3 text-xs font-bold text-[#2f4d35]",
  contentClass: "grid gap-10 px-4 py-6",
  sectionEyebrowClass: "text-[10px] font-bold uppercase tracking-[0.22em] text-[#a8452a]",
  sectionTitleClass: "mt-1 font-playfair text-3xl font-semibold text-[#4b2418]",
  sectionNoteClass: "mt-2 text-sm leading-5 text-[#6c5144]",
  cardClass: "overflow-hidden rounded-lg border border-[#d8c7ae] bg-[#fffaf2] shadow-sm",
  imageWrapClass: "relative aspect-[16/10] bg-[#efe2cf]",
  imageClass: "object-contain",
  accentClass: "text-xs font-bold uppercase tracking-[0.18em] text-[#a8452a]",
  itemTitleClass: "mt-1 font-playfair text-2xl font-semibold leading-7 text-[#4b2418]",
  itemDescriptionClass: "text-sm leading-5 text-[#6c5144]",
  priceClass: "shrink-0 rounded-md bg-[#2f4d35] px-3 py-2 text-sm font-bold text-white",
  addButtonClass: "h-10 w-full gap-2 rounded-md bg-[#2f4d35] text-white hover:bg-[#243b29]",
  panelClass: "grid gap-4 rounded-lg border border-[#d8c7ae] bg-[#f7efe2] p-3",
  chipClass: "rounded-md border border-[#e4d3bc] bg-white px-2.5 py-1 text-xs font-medium text-[#55392c]",
  chipActiveClass: "rounded-md border border-[#a8452a] bg-[#f0dfca] px-2.5 py-1 text-xs font-bold text-[#4b2418] line-through",
  inputClass: "mt-2 resize-none border-[#d8c7ae] bg-white text-sm",
  cartClass: "sticky bottom-3 z-[70] mx-4 rounded-lg border border-[#d8c7ae] bg-[#fffaf2]/95 p-4 text-[#3f2a20] shadow-2xl backdrop-blur",
  cartButtonClass: "flex h-8 w-8 items-center justify-center rounded-md bg-[#f0dfca] text-[#4b2418]",
};

export default function BulgarianMenuPage() {
  return <DemoMenuExperience content={content} theme={theme} />;
}
