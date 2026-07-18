import Image from "next/image";
import { readDb } from "@/lib/db";
import PageHeader from "@/components/PageHeader";

export const metadata = { title: "UMKM Desa" };

export default async function UmkmPage() {
  const { umkm } = await readDb();

  return (
    <div>
      <PageHeader eyebrow="Ekonomi Warga" title="UMKM Desa" />

      <div className="mx-auto max-w-6xl px-5 py-16">
        {umkm.length === 0 ? (
          <p className="rounded-lg border border-dashed border-navy-700/20 p-8 text-center text-sm text-ink/60">
            Belum ada data UMKM.
          </p>
        ) : (
          <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3">
            {umkm.map((u, i) => (
              <div
                key={u.id}
                className="animate-fade-up rounded-lg border border-navy-700/10 bg-white p-5 shadow-sm"
                style={{ animationDelay: `${(i % 6) * 70}ms`, animationFillMode: "backwards" }}
              >
                {u.foto && (
                  <div className="relative mb-3 h-40 w-full overflow-hidden rounded-md bg-lime-100">
                    <Image src={u.foto} alt={u.nama} fill className="object-cover" />
                  </div>
                )}
                <span className="font-mono text-xs uppercase text-teal-500">{u.jenis}</span>
                <h2 className="mt-1 font-display text-lg font-semibold">{u.nama}</h2>
                <p className="mt-1 text-sm text-ink/70">{u.deskripsi}</p>
                {u.kontak && <p className="mt-2 text-xs text-ink/60">Kontak: {u.kontak}</p>}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
