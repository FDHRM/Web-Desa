"use client";

import { useState } from "react";
import Image from "next/image";

export default function ImageUploader({
  value,
  onChange,
  label = "Gambar",
}: {
  value: string;
  onChange: (url: string) => void;
  label?: string;
}) {
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState("");

  async function handleFile(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploading(true);
    setError("");
    try {
      const formData = new FormData();
      formData.append("file", file);
      const res = await fetch("/api/upload", { method: "POST", body: formData });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error ?? "Gagal mengunggah gambar.");
      onChange(data.url);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Gagal mengunggah gambar.");
    } finally {
      setUploading(false);
    }
  }

  return (
    <div>
      <label className="mb-1 block text-sm font-medium text-ink/80">{label}</label>
      <div className="flex items-center gap-3">
        {value ? (
          <div className="relative h-16 w-16 overflow-hidden rounded-md border border-navy-700/20 bg-navy-100">
            <Image src={value} alt="" fill className="object-cover" />
          </div>
        ) : (
          <div className="flex h-16 w-16 items-center justify-center rounded-md border border-dashed border-navy-700/30 text-xs text-ink/40">
            Kosong
          </div>
        )}
        <div className="flex-1">
          <input
            type="file"
            accept="image/png,image/jpeg,image/webp,image/gif"
            onChange={handleFile}
            className="block w-full text-xs text-ink/70 file:mr-3 file:rounded-md file:border-0 file:bg-navy-700 file:px-3 file:py-1.5 file:text-xs file:font-medium file:text-kertas hover:file:bg-navy-600"
          />
          {uploading && <p className="mt-1 text-xs text-ink/50">Mengunggah...</p>}
          {error && <p className="mt-1 text-xs text-danger-500">{error}</p>}
          <input
            type="text"
            placeholder="atau tempel URL gambar"
            value={value}
            onChange={(e) => onChange(e.target.value)}
            className="focus-ring mt-1 w-full rounded-md border border-navy-700/20 px-2 py-1 text-xs"
          />
        </div>
      </div>
    </div>
  );
}
