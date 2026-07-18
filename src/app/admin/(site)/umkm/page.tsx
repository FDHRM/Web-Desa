"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import ImageUploader from "@/components/ImageUploader";

type Umkm = {
  id: string;
  nama: string;
  jenis: string;
  deskripsi: string;
  foto: string;
  kontak: string;
};

const empty = { nama: "", jenis: "", deskripsi: "", foto: "", kontak: "" };

export default function AdminUmkmPage() {
  const [items, setItems] = useState<Umkm[]>([]);
  const [form, setForm] = useState<typeof empty>(empty);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);

  function load() {
    fetch("/api/umkm")
      .then((r) => r.json())
      .then(setItems);
  }

  useEffect(load, []);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    if (editingId) {
      await fetch(`/api/umkm/${editingId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
    } else {
      await fetch("/api/umkm", {
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

  function startEdit(item: Umkm) {
    setEditingId(item.id);
    setForm({
      nama: item.nama,
      jenis: item.jenis,
      deskripsi: item.deskripsi,
      foto: item.foto,
      kontak: item.kontak,
    });
  }

  async function handleDelete(id: string) {
    if (!confirm("Hapus data UMKM ini?")) return;
    await fetch(`/api/umkm/${id}`, { method: "DELETE" });
    load();
  }

  return (
    <div>
      <h1 className="font-display text-2xl font-semibold text-navy-700">UMKM Desa</h1>

      <form onSubmit={handleSubmit} className="mt-6 space-y-4 rounded-lg border border-navy-700/10 bg-white p-5 shadow-sm">
        <p className="text-sm font-medium text-ink">{editingId ? "Edit UMKM" : "Tambah UMKM baru"}</p>

        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <label className="mb-1 block text-sm font-medium text-ink/80">Nama Usaha</label>
            <input
              required
              value={form.nama}
              onChange={(e) => setForm({ ...form, nama: e.target.value })}
              className="focus-ring w-full rounded-md border border-navy-700/20 px-3 py-2 text-sm"
            />
          </div>
          <div>
            <label className="mb-1 block text-sm font-medium text-ink/80">Jenis Usaha</label>
            <input
              required
              value={form.jenis}
              onChange={(e) => setForm({ ...form, jenis: e.target.value })}
              placeholder="Kuliner, Kerajinan, dll"
              className="focus-ring w-full rounded-md border border-navy-700/20 px-3 py-2 text-sm"
            />
          </div>
        </div>

        <ImageUploader label="Foto Produk" value={form.foto} onChange={(url) => setForm({ ...form, foto: url })} />

        <div>
          <label className="mb-1 block text-sm font-medium text-ink/80">Deskripsi</label>
          <textarea
            value={form.deskripsi}
            onChange={(e) => setForm({ ...form, deskripsi: e.target.value })}
            rows={3}
            className="focus-ring w-full rounded-md border border-navy-700/20 px-3 py-2 text-sm"
          />
        </div>

        <div>
          <label className="mb-1 block text-sm font-medium text-ink/80">Kontak (WhatsApp/telepon)</label>
          <input
            value={form.kontak}
            onChange={(e) => setForm({ ...form, kontak: e.target.value })}
            className="focus-ring w-full rounded-md border border-navy-700/20 px-3 py-2 text-sm"
          />
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

      <div className="mt-8 grid gap-4 sm:grid-cols-2">
        {items.map((item) => (
          <div key={item.id} className="flex items-center gap-4 rounded-lg border border-navy-700/10 bg-white p-4 shadow-sm">
            <div className="relative h-14 w-14 shrink-0 overflow-hidden rounded-md bg-lime-100">
              {item.foto && <Image src={item.foto} alt={item.nama} fill className="object-cover" />}
            </div>
            <div className="flex-1">
              <p className="font-medium text-ink">{item.nama}</p>
              <p className="text-xs text-teal-500">{item.jenis}</p>
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
