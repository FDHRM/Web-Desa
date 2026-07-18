import { NextRequest, NextResponse } from "next/server";
import { readDb, writeDb } from "@/lib/db";
import { requireAuth } from "@/lib/auth";

export async function GET() {
  const db = await readDb();
  return NextResponse.json(db.profil);
}

export async function PUT(request: NextRequest) {
  const authError = await requireAuth();
  if (authError) return authError;
  const body = await request.json();
  const db = await readDb();
  db.profil = {
    ...db.profil,
    ...body,
    misi: Array.isArray(body.misi) ? body.misi : db.profil.misi,
  };
  await writeDb(db);
  return NextResponse.json(db.profil);
}
