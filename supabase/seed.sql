-- ============================================================
-- MasaPay Demo Restaurant Seed Data
-- Run this AFTER creating a user in Supabase Auth
-- Replace 'OWNER_USER_ID' with the actual auth.users.id
-- ============================================================

-- You need to first create a user via Supabase Auth dashboard:
-- Email: demo@masapay.bg / Password: demo123456
-- Then get the user ID and replace below

-- For now, we'll use a function to get or create the demo data
-- You can run this after manually creating the auth user

DO $$
DECLARE
  owner_uuid UUID;
  rest_id UUID;
  cat_salads UUID;
  cat_mains UUID;
  cat_desserts UUID;
  cat_drinks UUID;
  cat_cocktails UUID;
  item_id UUID;
  table1_id UUID;
  table2_id UUID;
  table3_id UUID;
BEGIN
  -- Get the first user (you should create one first via Supabase Auth dashboard)
  SELECT id INTO owner_uuid FROM auth.users LIMIT 1;

  IF owner_uuid IS NULL THEN
    RAISE NOTICE 'No auth user found. Create a user first via Supabase Auth dashboard.';
    RETURN;
  END IF;

  -- Create demo restaurant
  INSERT INTO restaurants (id, owner_id, name, slug, description, currency, default_language, supported_languages, service_fee_percent)
  VALUES (
    gen_random_uuid(), owner_uuid, 'Ресторант Маса', 'masa-demo',
    'Модерна българска кухня в сърцето на София',
    'EUR', 'bg', ARRAY['bg', 'en'], 0
  )
  RETURNING id INTO rest_id;

  -- Create staff record for owner
  INSERT INTO staff (user_id, restaurant_id, role, display_name)
  VALUES (owner_uuid, rest_id, 'owner', 'Администратор');

  -- Opening hours
  INSERT INTO restaurant_opening_hours (restaurant_id, day, open_time, close_time) VALUES
    (rest_id, 'monday', '10:00', '23:00'),
    (rest_id, 'tuesday', '10:00', '23:00'),
    (rest_id, 'wednesday', '10:00', '23:00'),
    (rest_id, 'thursday', '10:00', '23:00'),
    (rest_id, 'friday', '10:00', '00:00'),
    (rest_id, 'saturday', '10:00', '00:00'),
    (rest_id, 'sunday', '10:00', '22:00');

  -- Tables
  INSERT INTO tables (id, restaurant_id, table_number, slug) VALUES
    (gen_random_uuid(), rest_id, '1', 'demo-t1')
  RETURNING id INTO table1_id;
  INSERT INTO tables (id, restaurant_id, table_number, slug) VALUES
    (gen_random_uuid(), rest_id, '2', 'demo-t2')
  RETURNING id INTO table2_id;
  INSERT INTO tables (id, restaurant_id, table_number, slug) VALUES
    (gen_random_uuid(), rest_id, '3', 'demo-t3')
  RETURNING id INTO table3_id;

  -- =====================
  -- CATEGORIES
  -- =====================

  INSERT INTO menu_categories (id, restaurant_id, name_bg, name_en, icon, sort_order, destination)
  VALUES (gen_random_uuid(), rest_id, 'Салати', 'Salads', '🥗', 1, 'kitchen')
  RETURNING id INTO cat_salads;

  INSERT INTO menu_categories (id, restaurant_id, name_bg, name_en, icon, sort_order, destination)
  VALUES (gen_random_uuid(), rest_id, 'Основни', 'Main Courses', '🍽️', 2, 'kitchen')
  RETURNING id INTO cat_mains;

  INSERT INTO menu_categories (id, restaurant_id, name_bg, name_en, icon, sort_order, destination)
  VALUES (gen_random_uuid(), rest_id, 'Десерти', 'Desserts', '🍰', 3, 'kitchen')
  RETURNING id INTO cat_desserts;

  INSERT INTO menu_categories (id, restaurant_id, name_bg, name_en, icon, sort_order, destination)
  VALUES (gen_random_uuid(), rest_id, 'Безалкохолни', 'Soft Drinks', '🥤', 4, 'bar')
  RETURNING id INTO cat_drinks;

  INSERT INTO menu_categories (id, restaurant_id, name_bg, name_en, icon, sort_order, destination)
  VALUES (gen_random_uuid(), rest_id, 'Коктейли', 'Cocktails', '🍹', 5, 'bar')
  RETURNING id INTO cat_cocktails;

  -- =====================
  -- SALADS
  -- =====================

  -- Shopska salad
  INSERT INTO menu_items (id, category_id, restaurant_id, name_bg, name_en, description_bg, description_en, base_price, sort_order)
  VALUES (gen_random_uuid(), cat_salads, rest_id, 'Шопска салата', 'Shopska Salad',
    'Домати, краставици, лук, чушки, сирене', 'Tomatoes, cucumbers, onions, peppers, white cheese',
    8.90, 1)
  RETURNING id INTO item_id;

  INSERT INTO menu_item_removable_ingredients (menu_item_id, name_bg, name_en, sort_order) VALUES
    (item_id, 'Лук', 'Onions', 1),
    (item_id, 'Чушки', 'Peppers', 2);

  INSERT INTO menu_item_extras (menu_item_id, name_bg, name_en, price, sort_order) VALUES
    (item_id, 'Допълнително сирене', 'Extra cheese', 2.00, 1);

  INSERT INTO menu_item_dietary_tags (menu_item_id, dietary_tag_id)
  SELECT item_id, id FROM dietary_tags WHERE code = 'vegetarian';

  -- Caesar salad
  INSERT INTO menu_items (id, category_id, restaurant_id, name_bg, name_en, description_bg, description_en, base_price, sort_order)
  VALUES (gen_random_uuid(), cat_salads, rest_id, 'Цезар салата', 'Caesar Salad',
    'Айсберг, пармезан, крутони, сос Цезар, пилешко филе', 'Iceberg, parmesan, croutons, Caesar dressing, chicken',
    12.90, 2)
  RETURNING id INTO item_id;

  INSERT INTO menu_item_variants (menu_item_id, name_bg, name_en, price_modifier, sort_order) VALUES
    (item_id, 'С пилешко', 'With chicken', 0, 1),
    (item_id, 'Със скариди', 'With shrimp', 4.00, 2);

  INSERT INTO menu_item_removable_ingredients (menu_item_id, name_bg, name_en, sort_order) VALUES
    (item_id, 'Крутони', 'Croutons', 1),
    (item_id, 'Пармезан', 'Parmesan', 2);

  INSERT INTO menu_item_allergens (menu_item_id, allergen_id)
  SELECT item_id, id FROM allergens WHERE code IN ('gluten', 'dairy', 'eggs');

  -- =====================
  -- MAIN COURSES
  -- =====================

  -- Grilled chicken
  INSERT INTO menu_items (id, category_id, restaurant_id, name_bg, name_en, description_bg, description_en, base_price, sort_order)
  VALUES (gen_random_uuid(), cat_mains, rest_id, 'Пилешко филе на скара', 'Grilled Chicken Breast',
    'Сочно пилешко филе с гарнитура по избор', 'Juicy chicken breast with side of your choice',
    16.90, 1)
  RETURNING id INTO item_id;

  INSERT INTO menu_item_variants (menu_item_id, name_bg, name_en, price_modifier, sort_order) VALUES
    (item_id, 'С пържени картофи', 'With fries', 0, 1),
    (item_id, 'С ориз', 'With rice', 0, 2),
    (item_id, 'Със задушени зеленчуци', 'With steamed vegetables', 1.50, 3);

  INSERT INTO menu_item_extras (menu_item_id, name_bg, name_en, price, sort_order) VALUES
    (item_id, 'Допълнителен сос', 'Extra sauce', 1.50, 1),
    (item_id, 'Допълнителна гарнитура', 'Extra side', 3.50, 2);

  -- Мусака
  INSERT INTO menu_items (id, category_id, restaurant_id, name_bg, name_en, description_bg, description_en, base_price, sort_order)
  VALUES (gen_random_uuid(), cat_mains, rest_id, 'Мусака', 'Moussaka',
    'Традиционна българска мусака с кайма и картофи', 'Traditional Bulgarian moussaka with minced meat and potatoes',
    14.50, 2)
  RETURNING id INTO item_id;

  INSERT INTO menu_item_allergens (menu_item_id, allergen_id)
  SELECT item_id, id FROM allergens WHERE code IN ('dairy', 'eggs');

  -- Пъстърва
  INSERT INTO menu_items (id, category_id, restaurant_id, name_bg, name_en, description_bg, description_en, base_price, sort_order)
  VALUES (gen_random_uuid(), cat_mains, rest_id, 'Пъстърва на скара', 'Grilled Trout',
    'Прясна пъстърва на скара с лимон и билки', 'Fresh grilled trout with lemon and herbs',
    18.90, 3)
  RETURNING id INTO item_id;

  INSERT INTO menu_item_allergens (menu_item_id, allergen_id)
  SELECT item_id, id FROM allergens WHERE code = 'fish';

  -- Burger
  INSERT INTO menu_items (id, category_id, restaurant_id, name_bg, name_en, description_bg, description_en, base_price, sort_order)
  VALUES (gen_random_uuid(), cat_mains, rest_id, 'Бургер „Маса"', 'Masa Burger',
    '200г телешко, чедър, карамелизиран лук, специален сос', '200g beef, cheddar, caramelized onion, special sauce',
    15.90, 4)
  RETURNING id INTO item_id;

  INSERT INTO menu_item_extras (menu_item_id, name_bg, name_en, price, sort_order) VALUES
    (item_id, 'Допълнителен кюфте', 'Extra patty', 5.00, 1),
    (item_id, 'Бекон', 'Bacon', 2.50, 2),
    (item_id, 'Яйце', 'Egg', 1.50, 3);

  INSERT INTO menu_item_removable_ingredients (menu_item_id, name_bg, name_en, sort_order) VALUES
    (item_id, 'Лук', 'Onion', 1),
    (item_id, 'Домат', 'Tomato', 2),
    (item_id, 'Маруля', 'Lettuce', 3);

  INSERT INTO menu_item_allergens (menu_item_id, allergen_id)
  SELECT item_id, id FROM allergens WHERE code IN ('gluten', 'dairy', 'eggs');

  -- =====================
  -- DESSERTS
  -- =====================

  INSERT INTO menu_items (id, category_id, restaurant_id, name_bg, name_en, description_bg, description_en, base_price, sort_order)
  VALUES (gen_random_uuid(), cat_desserts, rest_id, 'Крем карамел', 'Creme Caramel',
    'Домашен крем карамел с ванилия', 'Homemade creme caramel with vanilla',
    7.50, 1)
  RETURNING id INTO item_id;

  INSERT INTO menu_item_allergens (menu_item_id, allergen_id)
  SELECT item_id, id FROM allergens WHERE code IN ('dairy', 'eggs');

  INSERT INTO menu_items (id, category_id, restaurant_id, name_bg, name_en, description_bg, description_en, base_price, sort_order)
  VALUES (gen_random_uuid(), cat_desserts, rest_id, 'Тирамису', 'Tiramisu',
    'Класическо италианско тирамису', 'Classic Italian tiramisu',
    9.90, 2)
  RETURNING id INTO item_id;

  INSERT INTO menu_item_allergens (menu_item_id, allergen_id)
  SELECT item_id, id FROM allergens WHERE code IN ('dairy', 'eggs', 'gluten');

  INSERT INTO menu_items (category_id, restaurant_id, name_bg, name_en, description_bg, description_en, base_price, sort_order)
  VALUES (cat_desserts, rest_id, 'Палачинки', 'Pancakes',
    'Две палачинки с пълнеж по избор', 'Two pancakes with filling of your choice',
    8.50, 3);

  -- =====================
  -- SOFT DRINKS (BAR)
  -- =====================

  INSERT INTO menu_items (category_id, restaurant_id, name_bg, name_en, description_bg, base_price, sort_order)
  VALUES
    (cat_drinks, rest_id, 'Кока-Кола', 'Coca-Cola', '330мл', 3.50, 1),
    (cat_drinks, rest_id, 'Фанта', 'Fanta', '330мл', 3.50, 2),
    (cat_drinks, rest_id, 'Минерална вода', 'Mineral Water', '500мл', 2.50, 3),
    (cat_drinks, rest_id, 'Фреш портокал', 'Fresh Orange Juice', '300мл', 5.90, 4),
    (cat_drinks, rest_id, 'Еспресо', 'Espresso', NULL, 3.00, 5),
    (cat_drinks, rest_id, 'Капучино', 'Cappuccino', NULL, 4.50, 6);

  -- =====================
  -- COCKTAILS (BAR)
  -- =====================

  INSERT INTO menu_items (category_id, restaurant_id, name_bg, name_en, description_bg, description_en, base_price, sort_order)
  VALUES
    (cat_cocktails, rest_id, 'Мохито', 'Mojito', 'Ром, лайм, мента, сода', 'Rum, lime, mint, soda', 12.00, 1),
    (cat_cocktails, rest_id, 'Маргарита', 'Margarita', 'Текила, лайм, трипъл сек', 'Tequila, lime, triple sec', 13.00, 2),
    (cat_cocktails, rest_id, 'Аперол Шприц', 'Aperol Spritz', 'Аперол, просеко, сода', 'Aperol, prosecco, soda', 11.00, 3);

  RAISE NOTICE 'Demo restaurant created! Table slugs: demo-t1, demo-t2, demo-t3';
  RAISE NOTICE 'Menu URL: /m/demo-t1';
END $$;
