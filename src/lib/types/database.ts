export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

export type UserRole = "owner" | "admin" | "manager" | "waiter" | "kitchen" | "bar";
export type OrderStatus = "new" | "preparing" | "ready" | "served" | "completed" | "cancelled";
export type PaymentStatus = "pending" | "simulated_paid" | "paid_online" | "pay_cash" | "failed";
export type PaymentMethod = "simulated" | "online" | "cash";
export type InvitationStatus = "pending" | "accepted" | "expired";
export type DayOfWeek = "monday" | "tuesday" | "wednesday" | "thursday" | "friday" | "saturday" | "sunday";
export type AnalyticsEventType = "qr_scan" | "menu_view" | "item_view" | "add_to_cart" | "order_placed" | "payment_completed";
export type OrderItemDestination = "kitchen" | "bar";

export interface Database {
  public: {
    Tables: {
      restaurants: {
        Row: {
          id: string;
          owner_id: string;
          name: string;
          slug: string;
          description: string | null;
          logo_url: string | null;
          cover_image_url: string | null;
          currency: string;
          default_language: string;
          supported_languages: string[];
          service_fee_percent: number;
          service_fee_fixed: number;
          is_active: boolean;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          owner_id: string;
          name: string;
          slug: string;
          description?: string | null;
          logo_url?: string | null;
          cover_image_url?: string | null;
          currency?: string;
          default_language?: string;
          supported_languages?: string[];
          service_fee_percent?: number;
          service_fee_fixed?: number;
          is_active?: boolean;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          owner_id?: string;
          name?: string;
          slug?: string;
          description?: string | null;
          logo_url?: string | null;
          cover_image_url?: string | null;
          currency?: string;
          default_language?: string;
          supported_languages?: string[];
          service_fee_percent?: number;
          service_fee_fixed?: number;
          is_active?: boolean;
          updated_at?: string;
        };
      };
      restaurant_opening_hours: {
        Row: {
          id: string;
          restaurant_id: string;
          day: DayOfWeek;
          open_time: string;
          close_time: string;
          is_closed: boolean;
        };
        Insert: {
          id?: string;
          restaurant_id: string;
          day: DayOfWeek;
          open_time: string;
          close_time: string;
          is_closed?: boolean;
        };
        Update: {
          restaurant_id?: string;
          day?: DayOfWeek;
          open_time?: string;
          close_time?: string;
          is_closed?: boolean;
        };
      };
      tables: {
        Row: {
          id: string;
          restaurant_id: string;
          table_number: string;
          slug: string;
          qr_code_url: string | null;
          is_active: boolean;
          created_at: string;
        };
        Insert: {
          id?: string;
          restaurant_id: string;
          table_number: string;
          slug: string;
          qr_code_url?: string | null;
          is_active?: boolean;
          created_at?: string;
        };
        Update: {
          restaurant_id?: string;
          table_number?: string;
          slug?: string;
          qr_code_url?: string | null;
          is_active?: boolean;
        };
      };
      staff: {
        Row: {
          id: string;
          user_id: string;
          restaurant_id: string;
          role: UserRole;
          display_name: string;
          is_active: boolean;
          created_at: string;
        };
        Insert: {
          id?: string;
          user_id: string;
          restaurant_id: string;
          role?: UserRole;
          display_name: string;
          is_active?: boolean;
          created_at?: string;
        };
        Update: {
          user_id?: string;
          restaurant_id?: string;
          role?: UserRole;
          display_name?: string;
          is_active?: boolean;
        };
      };
      staff_invitations: {
        Row: {
          id: string;
          restaurant_id: string;
          email: string;
          role: UserRole;
          invited_by: string;
          token: string;
          status: InvitationStatus;
          expires_at: string;
          created_at: string;
        };
        Insert: {
          id?: string;
          restaurant_id: string;
          email: string;
          role?: UserRole;
          invited_by: string;
          token?: string;
          status?: InvitationStatus;
          expires_at?: string;
          created_at?: string;
        };
        Update: {
          status?: InvitationStatus;
        };
      };
      menu_categories: {
        Row: {
          id: string;
          restaurant_id: string;
          name_bg: string;
          name_en: string | null;
          description_bg: string | null;
          description_en: string | null;
          icon: string | null;
          image_url: string | null;
          sort_order: number;
          is_active: boolean;
          destination: OrderItemDestination;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          restaurant_id: string;
          name_bg: string;
          name_en?: string | null;
          description_bg?: string | null;
          description_en?: string | null;
          icon?: string | null;
          image_url?: string | null;
          sort_order?: number;
          is_active?: boolean;
          destination?: OrderItemDestination;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          name_bg?: string;
          name_en?: string | null;
          description_bg?: string | null;
          description_en?: string | null;
          icon?: string | null;
          image_url?: string | null;
          sort_order?: number;
          is_active?: boolean;
          destination?: OrderItemDestination;
          updated_at?: string;
        };
      };
      allergens: {
        Row: {
          id: string;
          code: string;
          name_bg: string;
          name_en: string;
          icon: string | null;
        };
        Insert: {
          id?: string;
          code: string;
          name_bg: string;
          name_en: string;
          icon?: string | null;
        };
        Update: {
          code?: string;
          name_bg?: string;
          name_en?: string;
          icon?: string | null;
        };
      };
      dietary_tags: {
        Row: {
          id: string;
          code: string;
          name_bg: string;
          name_en: string;
          icon: string | null;
          color: string | null;
        };
        Insert: {
          id?: string;
          code: string;
          name_bg: string;
          name_en: string;
          icon?: string | null;
          color?: string | null;
        };
        Update: {
          code?: string;
          name_bg?: string;
          name_en?: string;
          icon?: string | null;
          color?: string | null;
        };
      };
      menu_items: {
        Row: {
          id: string;
          category_id: string;
          restaurant_id: string;
          name_bg: string;
          name_en: string | null;
          description_bg: string | null;
          description_en: string | null;
          base_price: number;
          image_url: string | null;
          sort_order: number;
          is_available: boolean;
          is_active: boolean;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          category_id: string;
          restaurant_id: string;
          name_bg: string;
          name_en?: string | null;
          description_bg?: string | null;
          description_en?: string | null;
          base_price: number;
          image_url?: string | null;
          sort_order?: number;
          is_available?: boolean;
          is_active?: boolean;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          category_id?: string;
          name_bg?: string;
          name_en?: string | null;
          description_bg?: string | null;
          description_en?: string | null;
          base_price?: number;
          image_url?: string | null;
          sort_order?: number;
          is_available?: boolean;
          is_active?: boolean;
          updated_at?: string;
        };
      };
      menu_item_allergens: {
        Row: {
          menu_item_id: string;
          allergen_id: string;
        };
        Insert: {
          menu_item_id: string;
          allergen_id: string;
        };
        Update: {
          menu_item_id?: string;
          allergen_id?: string;
        };
      };
      menu_item_dietary_tags: {
        Row: {
          menu_item_id: string;
          dietary_tag_id: string;
        };
        Insert: {
          menu_item_id: string;
          dietary_tag_id: string;
        };
        Update: {
          menu_item_id?: string;
          dietary_tag_id?: string;
        };
      };
      menu_item_variants: {
        Row: {
          id: string;
          menu_item_id: string;
          name_bg: string;
          name_en: string | null;
          price_modifier: number;
          sort_order: number;
          is_available: boolean;
          is_active: boolean;
        };
        Insert: {
          id?: string;
          menu_item_id: string;
          name_bg: string;
          name_en?: string | null;
          price_modifier?: number;
          sort_order?: number;
          is_available?: boolean;
          is_active?: boolean;
        };
        Update: {
          name_bg?: string;
          name_en?: string | null;
          price_modifier?: number;
          sort_order?: number;
          is_available?: boolean;
          is_active?: boolean;
        };
      };
      menu_item_extras: {
        Row: {
          id: string;
          menu_item_id: string;
          name_bg: string;
          name_en: string | null;
          price: number;
          sort_order: number;
          is_available: boolean;
          is_active: boolean;
        };
        Insert: {
          id?: string;
          menu_item_id: string;
          name_bg: string;
          name_en?: string | null;
          price?: number;
          sort_order?: number;
          is_available?: boolean;
          is_active?: boolean;
        };
        Update: {
          name_bg?: string;
          name_en?: string | null;
          price?: number;
          sort_order?: number;
          is_available?: boolean;
          is_active?: boolean;
        };
      };
      menu_item_removable_ingredients: {
        Row: {
          id: string;
          menu_item_id: string;
          name_bg: string;
          name_en: string | null;
          sort_order: number;
        };
        Insert: {
          id?: string;
          menu_item_id: string;
          name_bg: string;
          name_en?: string | null;
          sort_order?: number;
        };
        Update: {
          name_bg?: string;
          name_en?: string | null;
          sort_order?: number;
        };
      };
      orders: {
        Row: {
          id: string;
          restaurant_id: string;
          table_id: string;
          order_number: number;
          status: OrderStatus;
          general_note: string | null;
          subtotal: number;
          service_fee: number;
          tip_amount: number;
          tip_percent: number | null;
          total: number;
          payment_status: PaymentStatus;
          payment_method: PaymentMethod | null;
          customer_session_id: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          restaurant_id: string;
          table_id: string;
          order_number?: number;
          status?: OrderStatus;
          general_note?: string | null;
          subtotal: number;
          service_fee?: number;
          tip_amount?: number;
          tip_percent?: number | null;
          total: number;
          payment_status?: PaymentStatus;
          payment_method?: PaymentMethod | null;
          customer_session_id?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          status?: OrderStatus;
          payment_status?: PaymentStatus;
          payment_method?: PaymentMethod | null;
          updated_at?: string;
        };
      };
      order_items: {
        Row: {
          id: string;
          order_id: string;
          menu_item_id: string;
          variant_id: string | null;
          quantity: number;
          unit_price: number;
          item_total: number;
          note: string | null;
          destination: OrderItemDestination;
          item_name_bg: string;
          item_name_en: string | null;
          variant_name_bg: string | null;
          variant_name_en: string | null;
          created_at: string;
        };
        Insert: {
          id?: string;
          order_id: string;
          menu_item_id: string;
          variant_id?: string | null;
          quantity?: number;
          unit_price: number;
          item_total: number;
          note?: string | null;
          destination?: OrderItemDestination;
          item_name_bg: string;
          item_name_en?: string | null;
          variant_name_bg?: string | null;
          variant_name_en?: string | null;
          created_at?: string;
        };
        Update: {
          quantity?: number;
          note?: string | null;
        };
      };
      order_item_extras: {
        Row: {
          id: string;
          order_item_id: string;
          extra_id: string;
          price: number;
          name_bg: string;
          name_en: string | null;
        };
        Insert: {
          id?: string;
          order_item_id: string;
          extra_id: string;
          price: number;
          name_bg: string;
          name_en?: string | null;
        };
        Update: {};
      };
      order_item_removed_ingredients: {
        Row: {
          id: string;
          order_item_id: string;
          ingredient_id: string;
          name_bg: string;
          name_en: string | null;
        };
        Insert: {
          id?: string;
          order_item_id: string;
          ingredient_id: string;
          name_bg: string;
          name_en?: string | null;
        };
        Update: {};
      };
      payments: {
        Row: {
          id: string;
          order_id: string;
          amount: number;
          method: PaymentMethod;
          status: PaymentStatus;
          provider_reference: string | null;
          metadata: Json;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          order_id: string;
          amount: number;
          method: PaymentMethod;
          status?: PaymentStatus;
          provider_reference?: string | null;
          metadata?: Json;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          status?: PaymentStatus;
          provider_reference?: string | null;
          metadata?: Json;
          updated_at?: string;
        };
      };
      analytics_events: {
        Row: {
          id: string;
          restaurant_id: string;
          table_id: string | null;
          event_type: AnalyticsEventType;
          metadata: Json;
          session_id: string | null;
          created_at: string;
        };
        Insert: {
          id?: string;
          restaurant_id: string;
          table_id?: string | null;
          event_type: AnalyticsEventType;
          metadata?: Json;
          session_id?: string | null;
          created_at?: string;
        };
        Update: {};
      };
      contact_submissions: {
        Row: {
          id: string;
          name: string;
          email: string;
          phone: string | null;
          restaurant_name: string | null;
          message: string;
          is_read: boolean;
          created_at: string;
        };
        Insert: {
          id?: string;
          name: string;
          email: string;
          phone?: string | null;
          restaurant_name?: string | null;
          message: string;
          is_read?: boolean;
          created_at?: string;
        };
        Update: {
          is_read?: boolean;
        };
      };
    };
    Functions: {
      get_user_restaurant_ids: {
        Args: Record<string, never>;
        Returns: string[];
      };
    };
    Enums: {
      user_role: UserRole;
      order_status: OrderStatus;
      payment_status: PaymentStatus;
      payment_method: PaymentMethod;
      invitation_status: InvitationStatus;
      day_of_week: DayOfWeek;
      analytics_event_type: AnalyticsEventType;
      order_item_destination: OrderItemDestination;
    };
  };
}
