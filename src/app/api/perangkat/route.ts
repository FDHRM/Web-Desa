import { NextRequest, NextResponse } from "next/server";
import { readDb, writeDb, genId } from "@/lib/db";
import { requireAuth } from "@/lib/auth";

export const dynamic = "force-dynamic";

export async function GET() {
  const db = await readDb();
  return NextResponse.json(db.perangkat);
}

export async function POST(request: NextRequest) {
  const authError = await requireAuth();
  if (authError) return authError;
  const body = await request.json();
  const db = await readDb();
  const newItem = {
    id: genId(),
    nama: body.nama ?? "",
    jabatan: body.jabatan ?? "",
    foto: body.foto ?? "",
  };
  db.perangkat.push(newItem);
  await writeDb(db);
  return NextResponse.json(newItem, { status: 201 });
}
