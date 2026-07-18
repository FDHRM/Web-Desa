import { NextRequest, NextResponse } from "next/server";
import { readDb, writeDb, genId, slugify } from "@/lib/db";
import { requireAuth } from "@/lib/auth";

export async function GET() {
  const db = await readDb();
  return NextResponse.json(db.berita);
}

export async function POST(request: NextRequest) {
  const authError = await requireAuth();
  if (authError) return authError;
  const body = await request.json();
  const db = await readDb();

  let baseSlug = slugify(body.judul ?? "berita");
  let slug = baseSlug;
  let counter = 1;
  while (db.berita.some((b) => b.slug === slug)) {
    slug = `${baseSlug}-${counter++}`;
  }

  const newItem = {
    id: genId(),
    judul: body.judul ?? "",
    slug,
    ringkasan: body.ringkasan ?? "",
    isi: body.isi ?? "",
    gambar: body.gambar ?? "",
    tanggal: body.tanggal ?? new Date().toISOString(),
  };
  db.berita.push(newItem);
  await writeDb(db);
  return NextResponse.json(newItem, { status: 201 });
}
