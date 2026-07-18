import Image from "next/image";
import { readDb } from "@/lib/db";
import PageHeader from "@/components/PageHeader";

export const metadata = { title: "Potensi Desa" };

export default async function PotensiPage() {
  const { potensi } = await readDb();

  const kategoriList = Array.from(new Set(potensi.map((p) => p.kategori).filter(Boolean)));

  return (
    <div>
      <PageHeader
        eyebrow="Sumber Daya Desa"
        title="Potensi Desa"
        description="Kekayaan alam, ekonomi, dan wisata yang menjadi keunggulan desa."
      />

      <div className="mx-auto max-w-6xl px-5 py-16">
        {potensi.length === 0 ? (
          <p className="rounded-lg border border-dashed border-navy-700/20 p-8 text-center text-sm text-ink/60">
            Belum ada data potensi desa.
          </p>
        ) : (
          <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3">
            {potensi.map((p, i) => (
              <div
                key={p.id}
                className="animate-fade-up rounded-lg border border-navy-700/10 bg-white p-5 shadow-sm"
                style={{ animationDelay: `${(i % 6) * 70}ms`, animationFillMode: "backwards" }}
              >
                {p.foto && (
                  <div className="relative mb-3 h-40 w-full overflow-hidden rounded-md bg-navy-100">
                    <Image src={p.foto} alt={p.nama} fill className="object-cover" />
                  </div>
                )}
                {p.kategori && (
                  <span className="font-mono text-xs uppercase text-teal-500">{p.kategori}</span>
                )}
                <h2 className="mt-1 font-display text-lg font-semibold">{p.nama}</h2>
                <p className="mt-1 text-sm text-ink/70">{p.deskripsi}</p>
              </div>
            ))}
          </div>
        )}

        {kategoriList.length > 0 && (
          <p className="mt-10 text-xs text-ink/40">Kategori: {kategoriList.join(" · ")}</p>
        )}
      </div>
    </div>
  );
}
