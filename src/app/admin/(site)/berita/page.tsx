"use client";

import { useEffect, useState } from "react";
import ImageUploader from "@/components/ImageUploader";

type Berita = {
  id: string;
  judul: string;
  slug: string;
  ringkasan: string;
  isi: string;
  gambar: string;
  tanggal: string;
};

const empty = {
  judul: "",
  ringkasan: "",
  isi: "",
  gambar: "",
  tanggal: new Date().toISOString().slice(0, 10),
};

export default function AdminBeritaPage() {
  const [items, setItems] = useState<Berita[]>([]);
  const [form, setForm] = useState<typeof empty>(empty);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);

  function load() {
    fetch("/api/berita")
      .then((r) => r.json())
      .then((data: Berita[]) => setItems(data.sort((a, b) => (a.tanggal < b.tanggal ? 1 : -1))));
  }

  useEffect(load, []);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    if (editingId) {
      await fetch(`/api/berita/${editingId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
    } else {
      await fetch("/api/berita", {
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

  function startEdit(item: Berita) {
    setEditingId(item.id);
    setForm({
      judul: item.judul,
      ringkasan: item.ringkasan,
      isi: item.isi,
      gambar: item.gambar,
      tanggal: item.tanggal.slice(0, 10),
    });
  }

  async function handleDelete(id: string) {
    if (!confirm("Hapus berita ini?")) return;
    await fetch(`/api/berita/${id}`, { method: "DELETE" });
    load();
  }

  return (
    <div>
      <h1 className="font-display text-2xl font-semibold text-navy-700">Berita</h1>

      <form onSubmit={handleSubmit} className="mt-6 space-y-4 rounded-lg border border-navy-700/10 bg-white p-5 shadow-sm">
        <p className="text-sm font-medium text-ink">{editingId ? "Edit berita" : "Tulis berita baru"}</p>

        <div>
          <label className="mb-1 block text-sm font-medium text-ink/80">Judul</label>
          <input
            required
            value={form.judul}
            onChange={(e) => setForm({ ...form, judul: e.target.value })}
            className="focus-ring w-full rounded-md border border-navy-700/20 px-3 py-2 text-sm"
          />
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <label className="mb-1 block text-sm font-medium text-ink/80">Tanggal</label>
            <input
              type="date"
              value={form.tanggal}
              onChange={(e) => setForm({ ...form, tanggal: e.target.value })}
              className="focus-ring w-full rounded-md border border-navy-700/20 px-3 py-2 text-sm"
            />
          </div>
        </div>

        <ImageUploader label="Gambar Utama" value={form.gambar} onChange={(url) => setForm({ ...form, gambar: url })} />

        <div>
          <label className="mb-1 block text-sm font-medium text-ink/80">Ringkasan singkat</label>
          <textarea
            required
            value={form.ringkasan}
            onChange={(e) => setForm({ ...form, ringkasan: e.target.value })}
            rows={2}
            className="focus-ring w-full rounded-md border border-navy-700/20 px-3 py-2 text-sm"
          />
        </div>

        <div>
          <label className="mb-1 block text-sm font-medium text-ink/80">Isi Berita</label>
          <textarea
            required
            value={form.isi}
            onChange={(e) => setForm({ ...form, isi: e.target.value })}
            rows={8}
            className="focus-ring w-full rounded-md border border-navy-700/20 px-3 py-2 text-sm"
          />
        </div>

        <div className="flex gap-3">
          <button
            type="submit"
            disabled={saving}
            className="focus-ring rounded-md bg-navy-700 px-5 py-2 text-sm font-medium text-kertas hover:bg-navy-600 disabled:opacity-50"
          >
            {editingId ? "Simpan Perubahan" : "Publikasikan"}
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
          <div key={item.id} className="flex items-center justify-between rounded-lg border border-navy-700/10 bg-white p-4 shadow-sm">
            <div>
              <p className="font-medium text-ink">{item.judul}</p>
              <p className="text-xs text-ink/50">
                {new Date(item.tanggal).toLocaleDateString("id-ID", { day: "numeric", month: "long", year: "numeric" })}
              </p>
            </div>
            <div className="flex gap-2 text-xs">
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
