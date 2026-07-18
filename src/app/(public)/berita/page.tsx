import Link from "next/link";
import Image from "next/image";
import { readDb } from "@/lib/db";
import PageHeader from "@/components/PageHeader";

export const metadata = { title: "Berita Desa" };

export default async function BeritaListPage() {
  const { berita } = await readDb();
  const sorted = [...berita].sort((a, b) => (a.tanggal < b.tanggal ? 1 : -1));

  return (
    <div>
      <PageHeader eyebrow="Kabar Desa" title="Berita" />

      <div className="mx-auto max-w-5xl px-5 py-16">
        {sorted.length === 0 ? (
          <p className="rounded-lg border border-dashed border-navy-700/20 p-8 text-center text-sm text-ink/60">
            Belum ada berita.
          </p>
        ) : (
          <div className="grid gap-6 md:grid-cols-2">
            {sorted.map((b, i) => (
              <Link
                key={b.id}
                href={`/berita/${b.slug}`}
                className="animate-fade-up focus-ring block rounded-lg border border-navy-700/10 bg-white p-5 shadow-sm transition-transform hover:-translate-y-1"
                style={{ animationDelay: `${i * 70}ms`, animationFillMode: "backwards" }}
              >
                {b.gambar && (
                  <div className="relative mb-3 h-44 w-full overflow-hidden rounded-md bg-navy-100">
                    <Image src={b.gambar} alt={b.judul} fill className="object-cover" />
                  </div>
                )}
                <p className="font-mono text-xs text-teal-500">
                  {new Date(b.tanggal).toLocaleDateString("id-ID", {
                    day: "numeric",
                    month: "long",
                    year: "numeric",
                  })}
                </p>
                <h2 className="mt-1 font-display text-lg font-semibold text-ink">{b.judul}</h2>
                <p className="mt-2 line-clamp-2 text-sm text-ink/70">{b.ringkasan}</p>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
