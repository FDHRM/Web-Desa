import { NextRequest, NextResponse } from "next/server";
import { readDb, writeDb } from "@/lib/db";
import { requireAuth } from "@/lib/auth";

export async function GET() {
  const db = await readDb();
  return NextResponse.json(db.statistik);
}

export async function PUT(request: NextRequest) {
  const authError = await requireAuth();
  if (authError) return authError;
  const body = await request.json();
  const db = await readDb();
  db.statistik = { ...db.statistik, ...body };
  await writeDb(db);
  return NextResponse.json(db.statistik);
}
