"use client";

import { useEffect, useState } from "react";

type Kontak = {
  alamat: string;
  alamatFooter: string;
  telepon: string;
  email: string;
  jamLayanan: string;
  mapsEmbedUrl: string;
};

export default function AdminKontakPage() {
  const [data, setData] = useState<Kontak | null>(null);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");

  useEffect(() => {
    fetch("/api/kontak")
      .then((r) => r.json())
      .then(setData);
  }, []);

  if (!data) return <p className="text-sm text-ink/60">Memuat...</p>;

  async function handleSave(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    setMessage("");
    const res = await fetch("/api/kontak", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    setSaving(false);
    setMessage(res.ok ? "Tersimpan." : "Gagal menyimpan.");
  }

  return (
    <div>
      <h1 className="font-display text-2xl font-semibold text-navy-700">Kontak</h1>

      <form onSubmit={handleSave} className="mt-6 space-y-4 rounded-lg border border-navy-700/10 bg-white p-5 shadow-sm">
        <div>
          <label className="mb-1 block text-sm font-medium text-ink/80">
            Alamat (tampil di halaman Kontak)
          </label>
          <textarea
            value={data.alamat}
            onChange={(e) => setData({ ...data, alamat: e.target.value })}
            rows={2}
            className="focus-ring w-full rounded-md border border-navy-700/20 px-3 py-2 text-sm"
          />
        </div>
        <div>
          <label className="mb-1 block text-sm font-medium text-ink/80">
            Alamat (tampil di footer semua halaman)
          </label>
          <textarea
            value={data.alamatFooter}
            onChange={(e) => setData({ ...data, alamatFooter: e.target.value })}
            rows={2}
            className="focus-ring w-full rounded-md border border-navy-700/20 px-3 py-2 text-sm"
          />
          <p className="mt-1 text-xs text-ink/50">
            Terpisah dari alamat di atas — boleh diisi sama, atau versi lebih singkat khusus untuk
            footer.
          </p>
        </div>
        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <label className="mb-1 block text-sm font-medium text-ink/80">Telepon</label>
            <input
              value={data.telepon}
              onChange={(e) => setData({ ...data, telepon: e.target.value })}
              className="focus-ring w-full rounded-md border border-navy-700/20 px-3 py-2 text-sm"
            />
          </div>
          <div>
            <label className="mb-1 block text-sm font-medium text-ink/80">Email</label>
            <input
              value={data.email}
              onChange={(e) => setData({ ...data, email: e.target.value })}
              className="focus-ring w-full rounded-md border border-navy-700/20 px-3 py-2 text-sm"
            />
          </div>
        </div>
        <div>
          <label className="mb-1 block text-sm font-medium text-ink/80">Jam Layanan</label>
          <input
            value={data.jamLayanan}
            onChange={(e) => setData({ ...data, jamLayanan: e.target.value })}
            className="focus-ring w-full rounded-md border border-navy-700/20 px-3 py-2 text-sm"
          />
        </div>
        <div>
          <label className="mb-1 block text-sm font-medium text-ink/80">
            URL Embed Google Maps — Lokasi Kantor Desa (opsional)
          </label>
          <input
            value={data.mapsEmbedUrl}
            onChange={(e) => setData({ ...data, mapsEmbedUrl: e.target.value })}
            placeholder="https://www.google.com/maps/embed?..."
            className="focus-ring w-full rounded-md border border-navy-700/20 px-3 py-2 text-sm"
          />
          <p className="mt-1 text-xs text-ink/50">
            Peta titik lokasi kantor desa (beda dari peta wilayah/batas desa). Buka Google Maps →
            cari lokasi kantor → Bagikan → Sematkan peta → salin URL dari atribut src. Tampil di
            halaman Kontak.
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
