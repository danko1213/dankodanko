-- ============================================================
-- MasaPay Database Schema for Supabase (PostgreSQL)
-- ============================================================

CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- ============================================================
-- ENUMS
-- ============================================================

CREATE TYPE user_role AS ENUM ('owner', 'admin', 'manager', 'waiter', 'kitchen', 'bar');
CREATE TYPE order_status AS ENUM ('new', 'preparing', 'ready', 'served', 'completed', 'cancelled');
CREATE TYPE payment_status AS ENUM ('pending', 'simulated_paid', 'paid_online', 'pay_cash', 'failed');
CREATE TYPE payment_method AS ENUM ('simulated', 'online', 'cash');
CREATE TYPE invitation_status AS ENUM ('pending', 'accepted', 'expired');
CREATE TYPE day_of_week AS ENUM ('monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday');
CREATE TYPE analytics_event_type AS ENUM ('qr_scan', 'menu_view', 'item_view', 'add_to_cart', 'order_placed', 'payment_completed');
CREATE TYPE order_item_destination AS ENUM ('kitchen', 'bar');

-- ============================================================
-- RESTAURANTS & LOCATIONS
-- ============================================================

CREATE TABLE restaurants (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  owner_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  slug TEXT NOT NULL UNIQUE,
  description TEXT,
  logo_url TEXT,
  cover_image_url TEXT,
  currency TEXT NOT NULL DEFAULT 'EUR',
  default_language TEXT NOT NULL DEFAULT 'bg',
  supported_languages TEXT[] NOT NULL DEFAULT ARRAY['bg'],
  service_fee_percent DECIMAL(5,2) DEFAULT 0,
  service_fee_fixed DECIMAL(10,2) DEFAULT 0,
  is_active BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE restaurant_opening_hours (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  restaurant_id UUID NOT NULL REFERENCES restaurants(id) ON DELETE CASCADE,
  day day_of_week NOT NULL,
  open_time TIME NOT NULL,
  close_time TIME NOT NULL,
  is_closed BOOLEAN NOT NULL DEFAULT false,
  UNIQUE(restaurant_id, day)
);

CREATE TABLE tables (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  restaurant_id UUID NOT NULL REFERENCES restaurants(id) ON DELETE CASCADE,
  table_number TEXT NOT NULL,
  slug TEXT NOT NULL UNIQUE,
  qr_code_url TEXT,
  is_active BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  UNIQUE(restaurant_id, table_number)
);

-- ============================================================
-- STAFF & ROLES
-- ============================================================

CREATE TABLE staff (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  restaurant_id UUID NOT NULL REFERENCES restaurants(id) ON DELETE CASCADE,
  role user_role NOT NULL DEFAULT 'waiter',
  display_name TEXT NOT NULL,
  is_active BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  UNIQUE(user_id, restaurant_id)
);

CREATE TABLE staff_invitations (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  restaurant_id UUID NOT NULL REFERENCES restaurants(id) ON DELETE CASCADE,
  email TEXT NOT NULL,
  role user_role NOT NULL DEFAULT 'waiter',
  invited_by UUID NOT NULL REFERENCES auth.users(id),
  token TEXT NOT NULL UNIQUE DEFAULT encode(gen_random_bytes(32), 'hex'),
  status invitation_status NOT NULL DEFAULT 'pending',
  expires_at TIMESTAMPTZ NOT NULL DEFAULT (NOW() + INTERVAL '7 days'),
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- ============================================================
-- MENU STRUCTURE
-- ============================================================

CREATE TABLE menu_categories (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  restaurant_id UUID NOT NULL REFERENCES restaurants(id) ON DELETE CASCADE,
  name_bg TEXT NOT NULL,
  name_en TEXT,
  description_bg TEXT,
  description_en TEXT,
  icon TEXT,
  image_url TEXT,
  sort_order INTEGER NOT NULL DEFAULT 0,
  is_active BOOLEAN NOT NULL DEFAULT true,
  destination order_item_destination NOT NULL DEFAULT 'kitchen',
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE allergens (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  code TEXT NOT NULL UNIQUE,
  name_bg TEXT NOT NULL,
  name_en TEXT NOT NULL,
  icon TEXT
);

CREATE TABLE dietary_tags (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  code TEXT NOT NULL UNIQUE,
  name_bg TEXT NOT NULL,
  name_en TEXT NOT NULL,
  icon TEXT,
  color TEXT
);

CREATE TABLE menu_items (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  category_id UUID NOT NULL REFERENCES menu_categories(id) ON DELETE CASCADE,
  restaurant_id UUID NOT NULL REFERENCES restaurants(id) ON DELETE CASCADE,
  name_bg TEXT NOT NULL,
  name_en TEXT,
  description_bg TEXT,
  description_en TEXT,
  base_price DECIMAL(10,2) NOT NULL,
  image_url TEXT,
  sort_order INTEGER NOT NULL DEFAULT 0,
  is_available BOOLEAN NOT NULL DEFAULT true,
  is_active BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE menu_item_allergens (
  menu_item_id UUID NOT NULL REFERENCES menu_items(id) ON DELETE CASCADE,
  allergen_id UUID NOT NULL REFERENCES allergens(id) ON DELETE CASCADE,
  PRIMARY KEY (menu_item_id, allergen_id)
);

CREATE TABLE menu_item_dietary_tags (
  menu_item_id UUID NOT NULL REFERENCES menu_items(id) ON DELETE CASCADE,
  dietary_tag_id UUID NOT NULL REFERENCES dietary_tags(id) ON DELETE CASCADE,
  PRIMARY KEY (menu_item_id, dietary_tag_id)
);

CREATE TABLE menu_item_variants (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  menu_item_id UUID NOT NULL REFERENCES menu_items(id) ON DELETE CASCADE,
  name_bg TEXT NOT NULL,
  name_en TEXT,
  price_modifier DECIMAL(10,2) NOT NULL DEFAULT 0,
  sort_order INTEGER NOT NULL DEFAULT 0,
  is_available BOOLEAN NOT NULL DEFAULT true,
  is_active BOOLEAN NOT NULL DEFAULT true
);

CREATE TABLE menu_item_extras (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  menu_item_id UUID NOT NULL REFERENCES menu_items(id) ON DELETE CASCADE,
  name_bg TEXT NOT NULL,
  name_en TEXT,
  price DECIMAL(10,2) NOT NULL DEFAULT 0,
  sort_order INTEGER NOT NULL DEFAULT 0,
  is_available BOOLEAN NOT NULL DEFAULT true,
  is_active BOOLEAN NOT NULL DEFAULT true
);

CREATE TABLE menu_item_removable_ingredients (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  menu_item_id UUID NOT NULL REFERENCES menu_items(id) ON DELETE CASCADE,
  name_bg TEXT NOT NULL,
  name_en TEXT,
  sort_order INTEGER NOT NULL DEFAULT 0
);

-- ============================================================
-- ORDERS
-- ============================================================

CREATE TABLE orders (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  restaurant_id UUID NOT NULL REFERENCES restaurants(id) ON DELETE CASCADE,
  table_id UUID NOT NULL REFERENCES tables(id),
  order_number SERIAL,
  status order_status NOT NULL DEFAULT 'new',
  general_note TEXT,
  subtotal DECIMAL(10,2) NOT NULL DEFAULT 0,
  service_fee DECIMAL(10,2) NOT NULL DEFAULT 0,
  tip_amount DECIMAL(10,2) NOT NULL DEFAULT 0,
  tip_percent DECIMAL(5,2),
  total DECIMAL(10,2) NOT NULL DEFAULT 0,
  payment_status payment_status NOT NULL DEFAULT 'pending',
  payment_method payment_method,
  customer_session_id TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE order_items (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  order_id UUID NOT NULL REFERENCES orders(id) ON DELETE CASCADE,
  menu_item_id UUID NOT NULL REFERENCES menu_items(id),
  variant_id UUID REFERENCES menu_item_variants(id),
  quantity INTEGER NOT NULL DEFAULT 1 CHECK (quantity > 0),
  unit_price DECIMAL(10,2) NOT NULL,
  item_total DECIMAL(10,2) NOT NULL,
  note TEXT,
  destination order_item_destination NOT NULL DEFAULT 'kitchen',
  item_name_bg TEXT NOT NULL,
  item_name_en TEXT,
  variant_name_bg TEXT,
  variant_name_en TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE order_item_extras (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  order_item_id UUID NOT NULL REFERENCES order_items(id) ON DELETE CASCADE,
  extra_id UUID NOT NULL REFERENCES menu_item_extras(id),
  price DECIMAL(10,2) NOT NULL,
  name_bg TEXT NOT NULL,
  name_en TEXT
);

CREATE TABLE order_item_removed_ingredients (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  order_item_id UUID NOT NULL REFERENCES order_items(id) ON DELETE CASCADE,
  ingredient_id UUID NOT NULL REFERENCES menu_item_removable_ingredients(id),
  name_bg TEXT NOT NULL,
  name_en TEXT
);

-- ============================================================
-- PAYMENTS
-- ============================================================

CREATE TABLE payments (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  order_id UUID NOT NULL REFERENCES orders(id) ON DELETE CASCADE,
  amount DECIMAL(10,2) NOT NULL,
  method payment_method NOT NULL,
  status payment_status NOT NULL DEFAULT 'pending',
  provider_reference TEXT,
  metadata JSONB DEFAULT '{}',
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- ============================================================
-- ANALYTICS
-- ============================================================

CREATE TABLE analytics_events (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  restaurant_id UUID NOT NULL REFERENCES restaurants(id) ON DELETE CASCADE,
  table_id UUID REFERENCES tables(id),
  event_type analytics_event_type NOT NULL,
  metadata JSONB DEFAULT '{}',
  session_id TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- ============================================================
-- CONTACT FORM
-- ============================================================

CREATE TABLE contact_submissions (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT,
  restaurant_name TEXT,
  message TEXT NOT NULL,
  is_read BOOLEAN NOT NULL DEFAULT false,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- ============================================================
-- INDEXES
-- ============================================================

CREATE INDEX idx_tables_restaurant ON tables(restaurant_id);
CREATE INDEX idx_tables_slug ON tables(slug);
CREATE INDEX idx_staff_user ON staff(user_id);
CREATE INDEX idx_staff_restaurant ON staff(restaurant_id);
CREATE INDEX idx_menu_categories_restaurant ON menu_categories(restaurant_id);
CREATE INDEX idx_menu_items_category ON menu_items(category_id);
CREATE INDEX idx_menu_items_restaurant ON menu_items(restaurant_id);
CREATE INDEX idx_orders_restaurant ON orders(restaurant_id);
CREATE INDEX idx_orders_table ON orders(table_id);
CREATE INDEX idx_orders_status ON orders(status);
CREATE INDEX idx_orders_created ON orders(created_at DESC);
CREATE INDEX idx_orders_restaurant_created ON orders(restaurant_id, created_at DESC);
CREATE INDEX idx_order_items_order ON order_items(order_id);
CREATE INDEX idx_order_items_destination ON order_items(destination);
CREATE INDEX idx_analytics_restaurant ON analytics_events(restaurant_id);
CREATE INDEX idx_analytics_type ON analytics_events(event_type);
CREATE INDEX idx_analytics_created ON analytics_events(created_at DESC);
CREATE INDEX idx_payments_order ON payments(order_id);

-- ============================================================
-- UPDATED_AT TRIGGERS
-- ============================================================

CREATE OR REPLACE FUNCTION update_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER set_updated_at BEFORE UPDATE ON restaurants
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();
CREATE TRIGGER set_updated_at BEFORE UPDATE ON menu_categories
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();
CREATE TRIGGER set_updated_at BEFORE UPDATE ON menu_items
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();
CREATE TRIGGER set_updated_at BEFORE UPDATE ON orders
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();
CREATE TRIGGER set_updated_at BEFORE UPDATE ON payments
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();

-- ============================================================
-- ROW LEVEL SECURITY
-- ============================================================

ALTER TABLE restaurants ENABLE ROW LEVEL SECURITY;
ALTER TABLE tables ENABLE ROW LEVEL SECURITY;
ALTER TABLE staff ENABLE ROW LEVEL SECURITY;
ALTER TABLE staff_invitations ENABLE ROW LEVEL SECURITY;
ALTER TABLE menu_categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE menu_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE menu_item_variants ENABLE ROW LEVEL SECURITY;
ALTER TABLE menu_item_extras ENABLE ROW LEVEL SECURITY;
ALTER TABLE menu_item_removable_ingredients ENABLE ROW LEVEL SECURITY;
ALTER TABLE menu_item_allergens ENABLE ROW LEVEL SECURITY;
ALTER TABLE menu_item_dietary_tags ENABLE ROW LEVEL SECURITY;
ALTER TABLE orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE order_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE order_item_extras ENABLE ROW LEVEL SECURITY;
ALTER TABLE order_item_removed_ingredients ENABLE ROW LEVEL SECURITY;
ALTER TABLE payments ENABLE ROW LEVEL SECURITY;
ALTER TABLE analytics_events ENABLE ROW LEVEL SECURITY;
ALTER TABLE allergens ENABLE ROW LEVEL SECURITY;
ALTER TABLE dietary_tags ENABLE ROW LEVEL SECURITY;
ALTER TABLE restaurant_opening_hours ENABLE ROW LEVEL SECURITY;
ALTER TABLE contact_submissions ENABLE ROW LEVEL SECURITY;

-- Public read policies (anonymous customers)
CREATE POLICY "Public can read active restaurants" ON restaurants
  FOR SELECT USING (is_active = true);
CREATE POLICY "Public can read active tables" ON tables
  FOR SELECT USING (is_active = true);
CREATE POLICY "Public can read active categories" ON menu_categories
  FOR SELECT USING (is_active = true);
CREATE POLICY "Public can read active items" ON menu_items
  FOR SELECT USING (is_active = true);
CREATE POLICY "Public can read variants" ON menu_item_variants
  FOR SELECT USING (is_active = true);
CREATE POLICY "Public can read extras" ON menu_item_extras
  FOR SELECT USING (is_active = true);
CREATE POLICY "Public can read removable ingredients" ON menu_item_removable_ingredients
  FOR SELECT USING (true);
CREATE POLICY "Public can read allergens" ON allergens
  FOR SELECT USING (true);
CREATE POLICY "Public can read dietary tags" ON dietary_tags
  FOR SELECT USING (true);
CREATE POLICY "Public can read item allergens" ON menu_item_allergens
  FOR SELECT USING (true);
CREATE POLICY "Public can read item dietary tags" ON menu_item_dietary_tags
  FOR SELECT USING (true);
CREATE POLICY "Public can read opening hours" ON restaurant_opening_hours
  FOR SELECT USING (true);

-- Customer insert policies
CREATE POLICY "Anyone can insert orders" ON orders
  FOR INSERT WITH CHECK (true);
CREATE POLICY "Anyone can read orders" ON orders
  FOR SELECT USING (true);
CREATE POLICY "Anyone can insert order items" ON order_items
  FOR INSERT WITH CHECK (true);
CREATE POLICY "Anyone can read order items" ON order_items
  FOR SELECT USING (true);
CREATE POLICY "Anyone can insert order item extras" ON order_item_extras
  FOR INSERT WITH CHECK (true);
CREATE POLICY "Anyone can read order item extras" ON order_item_extras
  FOR SELECT USING (true);
CREATE POLICY "Anyone can insert order item removed ingredients" ON order_item_removed_ingredients
  FOR INSERT WITH CHECK (true);
CREATE POLICY "Anyone can read order item removed ingredients" ON order_item_removed_ingredients
  FOR SELECT USING (true);
CREATE POLICY "Anyone can insert payments" ON payments
  FOR INSERT WITH CHECK (true);
CREATE POLICY "Anyone can read payments" ON payments
  FOR SELECT USING (true);
CREATE POLICY "Anyone can insert analytics" ON analytics_events
  FOR INSERT WITH CHECK (true);
CREATE POLICY "Anyone can insert contact submissions" ON contact_submissions
  FOR INSERT WITH CHECK (true);

-- Staff helper function
CREATE OR REPLACE FUNCTION get_user_restaurant_ids()
RETURNS SETOF UUID AS $$
  SELECT restaurant_id FROM staff WHERE user_id = auth.uid() AND is_active = true
  UNION
  SELECT id FROM restaurants WHERE owner_id = auth.uid();
$$ LANGUAGE sql SECURITY DEFINER STABLE;

-- Staff management policies
CREATE POLICY "Staff can manage own restaurant" ON restaurants
  FOR ALL USING (id IN (SELECT get_user_restaurant_ids()));
CREATE POLICY "Staff can manage tables" ON tables
  FOR ALL USING (restaurant_id IN (SELECT get_user_restaurant_ids()));
CREATE POLICY "Staff can manage categories" ON menu_categories
  FOR ALL USING (restaurant_id IN (SELECT get_user_restaurant_ids()));
CREATE POLICY "Staff can manage items" ON menu_items
  FOR ALL USING (restaurant_id IN (SELECT get_user_restaurant_ids()));
CREATE POLICY "Staff can manage variants" ON menu_item_variants
  FOR ALL USING (menu_item_id IN (
    SELECT id FROM menu_items WHERE restaurant_id IN (SELECT get_user_restaurant_ids())
  ));
CREATE POLICY "Staff can manage extras" ON menu_item_extras
  FOR ALL USING (menu_item_id IN (
    SELECT id FROM menu_items WHERE restaurant_id IN (SELECT get_user_restaurant_ids())
  ));
CREATE POLICY "Staff can manage removable ingredients" ON menu_item_removable_ingredients
  FOR ALL USING (menu_item_id IN (
    SELECT id FROM menu_items WHERE restaurant_id IN (SELECT get_user_restaurant_ids())
  ));
CREATE POLICY "Staff can manage orders" ON orders
  FOR ALL USING (restaurant_id IN (SELECT get_user_restaurant_ids()));
CREATE POLICY "Staff can manage order items" ON order_items
  FOR ALL USING (order_id IN (
    SELECT id FROM orders WHERE restaurant_id IN (SELECT get_user_restaurant_ids())
  ));
CREATE POLICY "Staff can manage order item extras" ON order_item_extras
  FOR ALL USING (order_item_id IN (
    SELECT oi.id FROM order_items oi
    JOIN orders o ON oi.order_id = o.id
    WHERE o.restaurant_id IN (SELECT get_user_restaurant_ids())
  ));
CREATE POLICY "Staff can manage staff" ON staff
  FOR ALL USING (restaurant_id IN (SELECT get_user_restaurant_ids()));
CREATE POLICY "Staff can manage invitations" ON staff_invitations
  FOR ALL USING (restaurant_id IN (SELECT get_user_restaurant_ids()));
CREATE POLICY "Staff can read analytics" ON analytics_events
  FOR SELECT USING (restaurant_id IN (SELECT get_user_restaurant_ids()));
CREATE POLICY "Staff can manage payments" ON payments
  FOR ALL USING (order_id IN (
    SELECT id FROM orders WHERE restaurant_id IN (SELECT get_user_restaurant_ids())
  ));
CREATE POLICY "Staff can manage opening hours" ON restaurant_opening_hours
  FOR ALL USING (restaurant_id IN (SELECT get_user_restaurant_ids()));
CREATE POLICY "Staff can manage item allergens" ON menu_item_allergens
  FOR ALL USING (menu_item_id IN (
    SELECT id FROM menu_items WHERE restaurant_id IN (SELECT get_user_restaurant_ids())
  ));
CREATE POLICY "Staff can manage item dietary tags" ON menu_item_dietary_tags
  FOR ALL USING (menu_item_id IN (
    SELECT id FROM menu_items WHERE restaurant_id IN (SELECT get_user_restaurant_ids())
  ));

-- ============================================================
-- SEED DATA: Allergens & Dietary Tags
-- ============================================================

INSERT INTO allergens (code, name_bg, name_en, icon) VALUES
  ('gluten', 'Глутен', 'Gluten', '🌾'),
  ('dairy', 'Млечни продукти', 'Dairy', '🥛'),
  ('eggs', 'Яйца', 'Eggs', '🥚'),
  ('fish', 'Риба', 'Fish', '🐟'),
  ('shellfish', 'Ракообразни', 'Shellfish', '🦐'),
  ('nuts', 'Ядки', 'Tree Nuts', '🥜'),
  ('peanuts', 'Фъстъци', 'Peanuts', '🥜'),
  ('soy', 'Соя', 'Soy', '🫘'),
  ('celery', 'Целина', 'Celery', '🥬'),
  ('mustard', 'Горчица', 'Mustard', '🟡'),
  ('sesame', 'Сусам', 'Sesame', '⚪'),
  ('sulphites', 'Сулфити', 'Sulphites', '🧪'),
  ('lupin', 'Лупина', 'Lupin', '🌸'),
  ('molluscs', 'Мекотели', 'Molluscs', '🐚');

INSERT INTO dietary_tags (code, name_bg, name_en, icon, color) VALUES
  ('vegan', 'Веган', 'Vegan', '🌱', '#22c55e'),
  ('vegetarian', 'Вегетарианско', 'Vegetarian', '🥬', '#16a34a'),
  ('spicy', 'Люто', 'Spicy', '🌶️', '#ef4444'),
  ('gluten_free', 'Без глутен', 'Gluten Free', '🚫', '#f59e0b');

-- ============================================================
-- SUPABASE REALTIME
-- ============================================================

ALTER PUBLICATION supabase_realtime ADD TABLE orders;
ALTER PUBLICATION supabase_realtime ADD TABLE order_items;
