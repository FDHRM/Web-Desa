import { NextRequest, NextResponse } from "next/server";
import { readDb, writeDb } from "@/lib/db";
import { requireAuth } from "@/lib/auth";

export const dynamic = "force-dynamic";

export async function GET() {
  const db = await readDb();
  return NextResponse.json(db.kontak);
}

export async function PUT(request: NextRequest) {
  const authError = await requireAuth();
  if (authError) return authError;
  const body = await request.json();
  const db = await readDb();
  db.kontak = { ...db.kontak, ...body };
  await writeDb(db);
  return NextResponse.json(db.kontak);
}
