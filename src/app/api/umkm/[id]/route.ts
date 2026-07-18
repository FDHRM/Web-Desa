import { NextRequest, NextResponse } from "next/server";
import { readDb, writeDb } from "@/lib/db";
import { requireAuth } from "@/lib/auth";

export async function PUT(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const authError = await requireAuth();
  if (authError) return authError;
  const { id } = await params;
  const body = await request.json();
  const db = await readDb();
  const idx = db.umkm.findIndex((u) => u.id === id);
  if (idx === -1) return NextResponse.json({ error: "Tidak ditemukan." }, { status: 404 });
  db.umkm[idx] = { ...db.umkm[idx], ...body, id };
  await writeDb(db);
  return NextResponse.json(db.umkm[idx]);
}

export async function DELETE(_request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const authError = await requireAuth();
  if (authError) return authError;
  const { id } = await params;
  const db = await readDb();
  db.umkm = db.umkm.filter((u) => u.id !== id);
  await writeDb(db);
  return NextResponse.json({ ok: true });
}
