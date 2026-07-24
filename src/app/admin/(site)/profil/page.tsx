"use client";

import { useEffect, useState } from "react";
import ImageUploader from "@/components/ImageUploader";

type Profil = {
  namaDesa: string;
  tagline: string;
  sejarah: string;
  visi: string;
  misi: string[];
  letakGeografis: string;
  luasWilayah: string;
  mapsEmbedUrl: string;
  logoUrl: string;
  heroImageUrl: string;
};

export default function AdminProfilPage() {
  const [data, setData] = useState<Profil | null>(null);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");

  useEffect(() => {
    fetch("/api/profil")
      .then((r) => r.json())
      .then(setData);
  }, []);

  if (!data) return <p className="text-sm text-ink/60">Memuat...</p>;

  async function handleSave(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    setMessage("");
    const res = await fetch("/api/profil", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    setSaving(false);
    setMessage(res.ok ? "Tersimpan." : "Gagal menyimpan.");
  }

  function set<K extends keyof Profil>(key: K, value: Profil[K]) {
    setData((prev) => (prev ? { ...prev, [key]: value } : prev));
  }

  return (
    <div>
      <h1 className="font-display text-2xl font-semibold text-navy-700">Profil Desa</h1>
      <form onSubmit={handleSave} className="mt-6 space-y-5">
        <div>
          <label className="mb-1 block text-sm font-medium text-ink/80">Nama Desa</label>
          <input
            value={data.namaDesa}
            onChange={(e) => set("namaDesa", e.target.value)}
            className="focus-ring w-full rounded-md border border-navy-700/20 px-3 py-2 text-sm"
          />
        </div>

        <div>
          <label className="mb-1 block text-sm font-medium text-ink/80">Tagline</label>
          <input
            value={data.tagline}
            onChange={(e) => set("tagline", e.target.value)}
            className="focus-ring w-full rounded-md border border-navy-700/20 px-3 py-2 text-sm"
          />
        </div>

        <ImageUploader label="Logo Desa" value={data.logoUrl} onChange={(url) => set("logoUrl", url)} />

        <div>
          <ImageUploader
            label="Gambar Background Hero (Beranda)"
            value={data.heroImageUrl}
            onChange={(url) => set("heroImageUrl", url)}
          />
          <p className="mt-1 text-xs text-ink/50">
            Ditampilkan sebagai latar belakang bagian hero paling atas di halaman Beranda — tapi
            hanya kalau menu <strong>Galeri</strong> masih kosong. Kalau ada foto di Galeri, latar
            hero otomatis memakai foto-foto tersebut secara bergantian (slideshow), dan gambar di
            sini jadi tidak terpakai. Kosongkan keduanya untuk memakai warna polos.
          </p>
        </div>

        <div>
          <label className="mb-1 block text-sm font-medium text-ink/80">Profil Desa (Sejarah)</label>
          <textarea
            value={data.sejarah}
            onChange={(e) => set("sejarah", e.target.value)}
            rows={6}
            className="focus-ring w-full rounded-md border border-navy-700/20 px-3 py-2 text-sm"
          />
        </div>

        <div>
          <label className="mb-1 block text-sm font-medium text-ink/80">Visi</label>
          <textarea
            value={data.visi}
            onChange={(e) => set("visi", e.target.value)}
            rows={3}
            className="focus-ring w-full rounded-md border border-navy-700/20 px-3 py-2 text-sm"
          />
        </div>

        <div>
          <label className="mb-1 block text-sm font-medium text-ink/80">Misi (satu poin per baris)</label>
          <textarea
            value={data.misi.join("\n")}
            onChange={(e) => set("misi", e.target.value.split("\n").filter(Boolean))}
            rows={4}
            className="focus-ring w-full rounded-md border border-navy-700/20 px-3 py-2 text-sm"
          />
        </div>

        <div>
          <label className="mb-1 block text-sm font-medium text-ink/80">Luas Wilayah</label>
          <input
            value={data.luasWilayah}
            onChange={(e) => set("luasWilayah", e.target.value)}
            placeholder="Contoh: 545 Ha"
            className="focus-ring w-full rounded-md border border-navy-700/20 px-3 py-2 text-sm"
          />
          <p className="mt-1 text-xs text-ink/50">
            Akan ditampilkan sebagai kartu ringkas di bagian Geografis Desa pada halaman Profil.
          </p>
        </div>

        <div>
          <label className="mb-1 block text-sm font-medium text-ink/80">
            URL Embed Google Maps — Wilayah Desa (opsional)
          </label>
          <input
            value={data.mapsEmbedUrl}
            onChange={(e) => set("mapsEmbedUrl", e.target.value)}
            placeholder="https://www.google.com/maps/embed?..."
            className="focus-ring w-full rounded-md border border-navy-700/20 px-3 py-2 text-sm"
          />
          <p className="mt-1 text-xs text-ink/50">
            Peta batas/wilayah desa secara umum. Buka Google Maps → cari lokasi → Bagikan →
            Sematkan peta → salin URL dari atribut src. Tampil di bagian Geografis Desa pada
            halaman Profil. Untuk peta lokasi kantor desa, isi di menu{" "}
            <a href="/admin/kontak" className="underline hover:text-navy-700">
              Admin &gt; Kontak
            </a>
            .
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            type="submit"
            disabled={saving}
            className="focus-ring rounded-md bg-navy-700 px-5 py-2 text-sm font-medium text-kertas hover:bg-navy-600 disabled:opacity-50"
          >
            {saving ? "Menyimpan..." : "Simpan Perubahan"}
          </button>
          {message && <span className="text-sm text-ink/60">{message}</span>}
        </div>
      </form>
    </div>
  );
}
