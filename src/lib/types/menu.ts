export interface Allergen {
  id: string;
  code: string;
  name_bg: string;
  name_en: string;
  icon: string | null;
}

export interface DietaryTag {
  id: string;
  code: string;
  name_bg: string;
  name_en: string;
  icon: string | null;
  color: string | null;
}

export interface MenuItemVariant {
  id: string;
  menu_item_id: string;
  name_bg: string;
  name_en: string | null;
  price_modifier: number;
  sort_order: number;
  is_available: boolean;
}

export interface MenuItemExtra {
  id: string;
  menu_item_id: string;
  name_bg: string;
  name_en: string | null;
  price: number;
  sort_order: number;
  is_available: boolean;
}

export interface RemovableIngredient {
  id: string;
  menu_item_id: string;
  name_bg: string;
  name_en: string | null;
  sort_order: number;
}

export interface MenuItem {
  id: string;
  category_id: string;
  name_bg: string;
  name_en: string | null;
  description_bg: string | null;
  description_en: string | null;
  base_price: number;
  image_url: string | null;
  is_available: boolean;
  variants: MenuItemVariant[];
  extras: MenuItemExtra[];
  removableIngredients: RemovableIngredient[];
  allergens: Allergen[];
  dietaryTags: DietaryTag[];
}

export interface MenuCategory {
  id: string;
  name_bg: string;
  name_en: string | null;
  description_bg: string | null;
  description_en: string | null;
  icon: string | null;
  image_url: string | null;
  destination: "kitchen" | "bar";
  items: MenuItem[];
}

export interface RestaurantInfo {
  id: string;
  name: string;
  slug: string;
  logo_url: string | null;
  service_fee_percent: number;
  service_fee_fixed: number;
  default_language: string;
  supported_languages: string[];
}
