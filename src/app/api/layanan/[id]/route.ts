import { NextRequest, NextResponse } from "next/server";
import { readDb, writeDb } from "@/lib/db";
import { requireAuth } from "@/lib/auth";

export async function PUT(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const authError = await requireAuth();
  if (authError) return authError;
  const { id } = await params;
  const body = await request.json();
  const db = await readDb();
  const idx = db.layanan.findIndex((l) => l.id === id);
  if (idx === -1) return NextResponse.json({ error: "Tidak ditemukan." }, { status: 404 });
  db.layanan[idx] = { ...db.layanan[idx], ...body, id };
  await writeDb(db);
  return NextResponse.json(db.layanan[idx]);
}

export async function DELETE(_request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const authError = await requireAuth();
  if (authError) return authError;
  const { id } = await params;
  const db = await readDb();
  db.layanan = db.layanan.filter((l) => l.id !== id);
  await writeDb(db);
  return NextResponse.json({ ok: true });
}
