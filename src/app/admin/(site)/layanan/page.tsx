"use client";

import { useEffect, useState } from "react";

type Layanan = { id: string; judul: string; deskripsi: string };

const empty = { judul: "", deskripsi: "" };

export default function AdminLayananPage() {
  const [items, setItems] = useState<Layanan[]>([]);
  const [form, setForm] = useState<typeof empty>(empty);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);

  function load() {
    fetch("/api/layanan")
      .then((r) => r.json())
      .then(setItems);
  }

  useEffect(load, []);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    if (editingId) {
      await fetch(`/api/layanan/${editingId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
    } else {
      await fetch("/api/layanan", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
    }
    setForm(empty);
    setEditingId(null);
    setSaving(false);
    load();
  }

  function startEdit(item: Layanan) {
    setEditingId(item.id);
    setForm({ judul: item.judul, deskripsi: item.deskripsi });
  }

  async function handleDelete(id: string) {
    if (!confirm("Hapus jenis layanan ini?")) return;
    await fetch(`/api/layanan/${id}`, { method: "DELETE" });
    load();
  }

  return (
    <div>
      <h1 className="font-display text-2xl font-semibold text-navy-700">Layanan Publik</h1>
      <p className="mt-1 text-sm text-ink/60">
        Daftar jenis surat/keperluan warga yang tampil di halaman Layanan Publik, beserta
        persyaratan dan cara mengurusnya.
      </p>

      <form onSubmit={handleSubmit} className="mt-6 space-y-4 rounded-lg border border-navy-700/10 bg-white p-5 shadow-sm">
        <p className="text-sm font-medium text-ink">
          {editingId ? "Edit jenis layanan" : "Tambah jenis layanan baru"}
        </p>

        <div>
          <label className="mb-1 block text-sm font-medium text-ink/80">Nama Surat / Layanan</label>
          <input
            required
            value={form.judul}
            onChange={(e) => setForm({ ...form, judul: e.target.value })}
            placeholder="Surat Keterangan Domisili"
            className="focus-ring w-full rounded-md border border-navy-700/20 px-3 py-2 text-sm"
          />
        </div>

        <div>
          <label className="mb-1 block text-sm font-medium text-ink/80">
            Persyaratan &amp; Cara Mengurus
          </label>
          <textarea
            value={form.deskripsi}
            onChange={(e) => setForm({ ...form, deskripsi: e.target.value })}
            rows={5}
            placeholder="Contoh: 1. Fotokopi KTP&#10;2. Fotokopi KK&#10;3. Datang ke kantor desa jam kerja"
            className="focus-ring w-full rounded-md border border-navy-700/20 px-3 py-2 text-sm"
          />
          <p className="mt-1 text-xs text-ink/50">
            Ini yang muncul saat warga klik untuk membuka detail di halaman publik.
          </p>
        </div>

        <div className="flex gap-3">
          <button
            type="submit"
            disabled={saving}
            className="focus-ring rounded-md bg-navy-700 px-5 py-2 text-sm font-medium text-kertas hover:bg-navy-600 disabled:opacity-50"
          >
            {editingId ? "Simpan Perubahan" : "Tambah"}
          </button>
          {editingId && (
            <button
              type="button"
              onClick={() => {
                setEditingId(null);
                setForm(empty);
              }}
              className="focus-ring rounded-md border border-navy-700/20 px-5 py-2 text-sm font-medium text-ink/70"
            >
              Batal
            </button>
          )}
        </div>
      </form>

      <div className="mt-8 space-y-3">
        {items.map((item) => (
          <div
            key={item.id}
            className="flex items-center justify-between gap-4 rounded-lg border border-navy-700/10 bg-white p-4 shadow-sm"
          >
            <p className="font-medium text-ink">{item.judul}</p>
            <div className="flex shrink-0 gap-2 text-xs">
              <button onClick={() => startEdit(item)} className="focus-ring rounded-md border border-navy-700/20 px-3 py-1.5 hover:bg-navy-100">
                Edit
              </button>
              <button onClick={() => handleDelete(item.id)} className="focus-ring rounded-md border border-danger-500/30 px-3 py-1.5 text-danger-500 hover:bg-danger-500/10">
                Hapus
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
