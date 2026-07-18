"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import ImageUploader from "@/components/ImageUploader";

type GaleriItem = { id: string; judul: string; gambar: string };

export default function AdminGaleriPage() {
  const [items, setItems] = useState<GaleriItem[]>([]);
  const [judul, setJudul] = useState("");
  const [gambar, setGambar] = useState("");
  const [saving, setSaving] = useState(false);

  function load() {
    fetch("/api/galeri")
      .then((r) => r.json())
      .then(setItems);
  }

  useEffect(load, []);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!gambar) return;
    setSaving(true);
    await fetch("/api/galeri", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ judul, gambar }),
    });
    setJudul("");
    setGambar("");
    setSaving(false);
    load();
  }

  async function handleDelete(id: string) {
    if (!confirm("Hapus foto ini?")) return;
    await fetch(`/api/galeri/${id}`, { method: "DELETE" });
    load();
  }

  return (
    <div>
      <h1 className="font-display text-2xl font-semibold text-navy-700">Galeri</h1>

      <form onSubmit={handleSubmit} className="mt-6 space-y-4 rounded-lg border border-navy-700/10 bg-white p-5 shadow-sm">
        <p className="text-sm font-medium text-ink">Tambah foto baru</p>
        <ImageUploader label="Foto" value={gambar} onChange={setGambar} />
        <div>
          <label className="mb-1 block text-sm font-medium text-ink/80">Keterangan (opsional)</label>
          <input
            value={judul}
            onChange={(e) => setJudul(e.target.value)}
            className="focus-ring w-full rounded-md border border-navy-700/20 px-3 py-2 text-sm"
          />
        </div>
        <button
          type="submit"
          disabled={saving || !gambar}
          className="focus-ring rounded-md bg-navy-700 px-5 py-2 text-sm font-medium text-kertas hover:bg-navy-600 disabled:opacity-50"
        >
          Tambah ke Galeri
        </button>
      </form>

      <div className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4">
        {items.map((item) => (
          <div key={item.id} className="group relative overflow-hidden rounded-lg border border-navy-700/10 bg-white shadow-sm">
            <div className="relative h-32 w-full bg-navy-100">
              <Image src={item.gambar} alt={item.judul} fill className="object-cover" />
            </div>
            {item.judul && <p className="p-2 text-xs text-ink/70">{item.judul}</p>}
            <button
              onClick={() => handleDelete(item.id)}
              className="focus-ring absolute right-2 top-2 rounded-md bg-ink/70 px-2 py-1 text-xs text-kertas opacity-0 transition-opacity group-hover:opacity-100"
            >
              Hapus
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
