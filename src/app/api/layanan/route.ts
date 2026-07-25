import { NextRequest, NextResponse } from "next/server";
import { readDb, writeDb, genId } from "@/lib/db";
import { requireAuth } from "@/lib/auth";

export const dynamic = "force-dynamic";

export async function GET() {
  const db = await readDb();
  return NextResponse.json(db.layanan);
}

export async function POST(request: NextRequest) {
  const authError = await requireAuth();
  if (authError) return authError;
  const body = await request.json();
  const db = await readDb();
  const newItem = {
    id: genId(),
    judul: body.judul ?? "",
    deskripsi: body.deskripsi ?? "",
  };
  db.layanan.push(newItem);
  await writeDb(db);
  return NextResponse.json(newItem, { status: 201 });
}
