import Image from "next/image";
import { readDb } from "@/lib/db";
import PageHeader from "@/components/PageHeader";

export const metadata = { title: "Perangkat Desa" };

export default async function PerangkatPage() {
  const { perangkat } = await readDb();

  return (
    <div>
      <PageHeader eyebrow="Struktur Organisasi" title="Perangkat Desa" />

      <div className="mx-auto max-w-5xl px-5 py-16">
        {perangkat.length === 0 ? (
          <p className="rounded-lg border border-dashed border-navy-700/20 p-8 text-center text-sm text-ink/60">
            Belum ada data perangkat desa.
          </p>
        ) : (
          <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3">
            {perangkat.map((p, i) => (
              <div
                key={p.id}
                className="animate-fade-up rounded-lg border border-navy-700/10 bg-white p-5 text-center shadow-sm"
                style={{ animationDelay: `${i * 70}ms`, animationFillMode: "backwards" }}
              >
                <div className="relative mx-auto h-28 w-28 overflow-hidden rounded-full bg-navy-100">
                  {p.foto && <Image src={p.foto} alt={p.nama} fill className="object-cover" />}
                </div>
                <h3 className="mt-4 font-display text-lg font-semibold">{p.nama}</h3>
                <p className="text-sm text-teal-500">{p.jabatan}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
