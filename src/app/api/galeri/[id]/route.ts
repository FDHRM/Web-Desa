import { NextRequest, NextResponse } from "next/server";
import { readDb, writeDb } from "@/lib/db";
import { requireAuth } from "@/lib/auth";

export async function DELETE(_request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const authError = await requireAuth();
  if (authError) return authError;
  const { id } = await params;
  const db = await readDb();
  db.galeri = db.galeri.filter((g) => g.id !== id);
  await writeDb(db);
  return NextResponse.json({ ok: true });
}
