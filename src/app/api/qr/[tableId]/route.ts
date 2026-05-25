import { NextResponse } from "next/server";

export async function GET() {
  // Will be implemented in Phase 4
  return NextResponse.json({ message: "QR generation endpoint" });
}
