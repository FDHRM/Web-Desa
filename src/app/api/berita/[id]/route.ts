import { NextRequest, NextResponse } from "next/server";
import { readDb, writeDb, slugify } from "@/lib/db";
import { requireAuth } from "@/lib/auth";

export async function PUT(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const authError = await requireAuth();
  if (authError) return authError;
  const { id } = await params;
  const body = await request.json();
  const db = await readDb();
  const idx = db.berita.findIndex((b) => b.id === id);
  if (idx === -1) return NextResponse.json({ error: "Tidak ditemukan." }, { status: 404 });

  let slug = db.berita[idx].slug;
  if (body.judul && body.judul !== db.berita[idx].judul) {
    let baseSlug = slugify(body.judul);
    slug = baseSlug;
    let counter = 1;
    while (db.berita.some((b) => b.slug === slug && b.id !== id)) {
      slug = `${baseSlug}-${counter++}`;
    }
  }

  db.berita[idx] = { ...db.berita[idx], ...body, id, slug };
  await writeDb(db);
  return NextResponse.json(db.berita[idx]);
}

export async function DELETE(_request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const authError = await requireAuth();
  if (authError) return authError;
  const { id } = await params;
  const db = await readDb();
  db.berita = db.berita.filter((b) => b.id !== id);
  await writeDb(db);
  return NextResponse.json({ ok: true });
}
