import { notFound } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { MenuBrowser } from "@/components/customer/menu-browser";
import type { MenuCategory, MenuItem, RestaurantInfo } from "@/lib/types/menu";

export default async function MenuPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const supabase = await createClient();

  // Fetch table
  const { data: tableData } = await supabase
    .from("tables")
    .select("id, restaurant_id, table_number")
    .eq("slug", slug)
    .eq("is_active", true)
    .single();

  const table = tableData as { id: string; restaurant_id: string; table_number: string } | null;
  if (!table) notFound();

  // Fetch restaurant
  const { data: restData } = await supabase
    .from("restaurants")
    .select("id, name, slug, logo_url, service_fee_percent, service_fee_fixed, default_language, supported_languages")
    .eq("id", table.restaurant_id)
    .eq("is_active", true)
    .single();

  const restaurant = restData as RestaurantInfo | null;
  if (!restaurant) notFound();

  // Fetch categories
  const { data: catsData } = await supabase
    .from("menu_categories")
    .select("id, name_bg, name_en, description_bg, description_en, icon, image_url, destination")
    .eq("restaurant_id", restaurant.id)
    .eq("is_active", true)
    .order("sort_order");

  type CatRow = { id: string; name_bg: string; name_en: string | null; description_bg: string | null; description_en: string | null; icon: string | null; image_url: string | null; destination: "kitchen" | "bar" };
  const cats = (catsData || []) as CatRow[];
  const catIds = cats.map((c) => c.id);

  // Fetch items with variants, extras, removable ingredients
  let itemRows: any[] = [];
  if (catIds.length > 0) {
    const { data } = await supabase
      .from("menu_items")
      .select("id, category_id, name_bg, name_en, description_bg, description_en, base_price, image_url, is_available")
      .in("category_id", catIds)
      .eq("is_active", true)
      .order("sort_order");
    itemRows = data || [];
  }

  const itemIds = itemRows.map((i: any) => i.id);

  // Fetch related data in parallel
  const [variantsRes, extrasRes, removableRes, allergensRes, dietaryRes] = itemIds.length > 0
    ? await Promise.all([
        supabase.from("menu_item_variants").select("*").in("menu_item_id", itemIds).eq("is_active", true).order("sort_order"),
        supabase.from("menu_item_extras").select("*").in("menu_item_id", itemIds).eq("is_active", true).order("sort_order"),
        supabase.from("menu_item_removable_ingredients").select("*").in("menu_item_id", itemIds).order("sort_order"),
        supabase.from("menu_item_allergens").select("menu_item_id, allergen_id").in("menu_item_id", itemIds),
        supabase.from("menu_item_dietary_tags").select("menu_item_id, dietary_tag_id").in("menu_item_id", itemIds),
      ])
    : [{ data: [] }, { data: [] }, { data: [] }, { data: [] }, { data: [] }];

  // Fetch allergen and dietary tag definitions
  const [allergenDefs, dietaryDefs] = await Promise.all([
    supabase.from("allergens").select("*"),
    supabase.from("dietary_tags").select("*"),
  ]);

  const allergenMap = new Map((allergenDefs.data || []).map((a: any) => [a.id, a]));
  const dietaryMap = new Map((dietaryDefs.data || []).map((d: any) => [d.id, d]));

  const variants = (variantsRes.data || []) as any[];
  const extras = (extrasRes.data || []) as any[];
  const removable = (removableRes.data || []) as any[];
  const itemAllergens = (allergensRes.data || []) as any[];
  const itemDietary = (dietaryRes.data || []) as any[];

  // Assemble items
  const items: Map<string, MenuItem> = new Map();
  for (const row of itemRows) {
    items.set(row.id, {
      ...row,
      base_price: Number(row.base_price),
      variants: [],
      extras: [],
      removableIngredients: [],
      allergens: [],
      dietaryTags: [],
    });
  }

  for (const v of variants) {
    const item = items.get(v.menu_item_id);
    if (item) item.variants.push({ ...v, price_modifier: Number(v.price_modifier) });
  }
  for (const e of extras) {
    const item = items.get(e.menu_item_id);
    if (item) item.extras.push({ ...e, price: Number(e.price) });
  }
  for (const r of removable) {
    const item = items.get(r.menu_item_id);
    if (item) item.removableIngredients.push(r);
  }
  for (const a of itemAllergens) {
    const item = items.get(a.menu_item_id);
    const allergen = allergenMap.get(a.allergen_id);
    if (item && allergen) item.allergens.push(allergen);
  }
  for (const d of itemDietary) {
    const item = items.get(d.menu_item_id);
    const tag = dietaryMap.get(d.dietary_tag_id);
    if (item && tag) item.dietaryTags.push(tag);
  }

  // Assemble categories
  const categories: MenuCategory[] = cats.map((cat) => ({
    ...cat,
    items: Array.from(items.values()).filter((i) => i.category_id === cat.id),
  }));

  return (
    <MenuBrowser
      restaurant={restaurant}
      categories={categories}
      tableSlug={slug}
    />
  );
}
