"use client";

import { useEffect, useState } from "react";
import { createClient } from "@/lib/supabase/client";

interface RestaurantContext {
  restaurantId: string;
  restaurantName: string;
  role: string;
}

export function useRestaurant() {
  const [data, setData] = useState<RestaurantContext | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      const supabase = createClient();
      const { data: { user } } = await supabase.auth.getUser();

      if (!user) {
        setLoading(false);
        return;
      }

      // Check if user is owner of any restaurant
      const { data: ownedRestaurant } = await supabase
        .from("restaurants")
        .select("id, name")
        .eq("owner_id", user.id)
        .limit(1)
        .single();

      if (ownedRestaurant) {
        setData({
          restaurantId: (ownedRestaurant as any).id,
          restaurantName: (ownedRestaurant as any).name,
          role: "owner",
        });
        setLoading(false);
        return;
      }

      // Check staff membership
      const { data: staffRecord } = await supabase
        .from("staff")
        .select("restaurant_id, role, restaurants(name)")
        .eq("user_id", user.id)
        .eq("is_active", true)
        .limit(1)
        .single();

      if (staffRecord) {
        setData({
          restaurantId: (staffRecord as any).restaurant_id,
          restaurantName: (staffRecord as any).restaurants?.name || "",
          role: (staffRecord as any).role,
        });
      }

      setLoading(false);
    }

    load();
  }, []);

  return { ...data, loading };
}
