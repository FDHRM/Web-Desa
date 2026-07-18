"use client";

import { useEffect, useState } from "react";

type Row = { nama?: string; jenis?: string; rentang?: string; jumlah: number };
type Statistik = {
  jumlahPenduduk: number;
  jumlahKK: number;
  lakiLaki: number;
  perempuan: number;
  perDusun: Row[];
  pekerjaan: Row[];
  usia: Row[];
};

function RowEditor({
  title,
  keyName,
  rows,
  setRows,
}: {
  title: string;
  keyName: "nama" | "jenis" | "rentang";
  rows: Row[];
  setRows: (rows: Row[]) => void;
}) {
  return (
    <div className="rounded-lg border border-navy-700/10 bg-white p-5 shadow-sm">
      <div className="flex items-center justify-between">
        <p className="text-sm font-medium text-ink">{title}</p>
        <button
          type="button"
          onClick={() => setRows([...rows, { [keyName]: "", jumlah: 0 } as Row])}
          className="focus-ring rounded-md border border-navy-700/20 px-2 py-1 text-xs hover:bg-navy-100"
        >
          + Tambah baris
        </button>
      </div>
      <div className="mt-3 space-y-2">
        {rows.map((row, i) => (
          <div key={i} className="flex gap-2">
            <input
              value={(row[keyName] as string) ?? ""}
              onChange={(e) => {
                const next = [...rows];
                next[i] = { ...next[i], [keyName]: e.target.value };
                setRows(next);
              }}
              placeholder="Label"
              className="focus-ring flex-1 rounded-md border border-navy-700/20 px-2 py-1.5 text-sm"
            />
            <input
              type="number"
              value={row.jumlah}
              onChange={(e) => {
                const next = [...rows];
                next[i] = { ...next[i], jumlah: Number(e.target.value) };
                setRows(next);
              }}
              className="focus-ring w-28 rounded-md border border-navy-700/20 px-2 py-1.5 text-sm"
            />
            <button
              type="button"
              onClick={() => setRows(rows.filter((_, idx) => idx !== i))}
              className="focus-ring rounded-md px-2 text-xs text-danger-500"
            >
              Hapus
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function AdminStatistikPage() {
  const [data, setData] = useState<Statistik | null>(null);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");

  useEffect(() => {
    fetch("/api/statistik")
      .then((r) => r.json())
      .then(setData);
  }, []);

  if (!data) return <p className="text-sm text-ink/60">Memuat...</p>;

  async function handleSave(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    setMessage("");
    const res = await fetch("/api/statistik", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    setSaving(false);
    setMessage(res.ok ? "Tersimpan." : "Gagal menyimpan.");
  }

  return (
    <div>
      <h1 className="font-display text-2xl font-semibold text-navy-700">Statistik Penduduk</h1>

      <form onSubmit={handleSave} className="mt-6 space-y-5">
        <div className="grid grid-cols-2 gap-4 rounded-lg border border-navy-700/10 bg-white p-5 shadow-sm md:grid-cols-4">
          {(
            [
              ["jumlahPenduduk", "Jumlah Penduduk"],
              ["jumlahKK", "Jumlah KK"],
              ["lakiLaki", "Laki-laki"],
              ["perempuan", "Perempuan"],
            ] as const
          ).map(([key, label]) => (
            <div key={key}>
              <label className="mb-1 block text-xs font-medium text-ink/60">{label}</label>
              <input
                type="number"
                value={data[key]}
                onChange={(e) => setData({ ...data, [key]: Number(e.target.value) })}
                className="focus-ring w-full rounded-md border border-navy-700/20 px-2 py-1.5 text-sm"
              />
            </div>
          ))}
        </div>

        <RowEditor
          title="Per Dusun"
          keyName="nama"
          rows={data.perDusun}
          setRows={(rows) => setData({ ...data, perDusun: rows })}
        />
        <RowEditor
          title="Per Jenis Pekerjaan"
          keyName="jenis"
          rows={data.pekerjaan}
          setRows={(rows) => setData({ ...data, pekerjaan: rows })}
        />
        <RowEditor
          title="Per Kelompok Usia"
          keyName="rentang"
          rows={data.usia}
          setRows={(rows) => setData({ ...data, usia: rows })}
        />

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
