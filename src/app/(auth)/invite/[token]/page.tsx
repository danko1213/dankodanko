"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function InvitePage() {
  const [displayName, setDisplayName] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  async function handleAcceptInvite(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      // Will be implemented with actual invitation logic
      router.push("/dashboard");
    } catch {
      setError("Грешка при приемане на поканата");
    } finally {
      setLoading(false);
    }
  }

  return (
    <Card>
      <CardHeader className="text-center">
        <div className="font-playfair text-2xl font-bold text-amber-900">MasaPay</div>
        <CardTitle className="mt-2 text-lg">Приемане на покана</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleAcceptInvite} className="space-y-4">
          <div>
            <Label htmlFor="displayName">Вашето име</Label>
            <Input
              id="displayName"
              value={displayName}
              onChange={(e) => setDisplayName(e.target.value)}
              required
              className="mt-1"
            />
          </div>
          <div>
            <Label htmlFor="password">Парола</Label>
            <Input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              minLength={6}
              className="mt-1"
            />
          </div>
          {error && <p className="text-sm text-red-600">{error}</p>}
          <Button
            type="submit"
            disabled={loading}
            className="w-full bg-amber-900 hover:bg-amber-800"
          >
            {loading ? "Създаване на акаунт..." : "Създай акаунт"}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
