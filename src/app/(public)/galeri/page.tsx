import Image from "next/image";
import { readDb } from "@/lib/db";
import PageHeader from "@/components/PageHeader";

export const dynamic = "force-dynamic";

export const metadata = { title: "Galeri Desa" };

export default async function GaleriPage() {
  const { galeri } = await readDb();

  return (
    <div>
      <PageHeader eyebrow="Dokumentasi" title="Galeri" />

      <div className="mx-auto max-w-6xl px-5 py-16">
        {galeri.length === 0 ? (
          <p className="rounded-lg border border-dashed border-navy-700/20 p-8 text-center text-sm text-ink/60">
            Belum ada foto di galeri.
          </p>
        ) : (
          <div className="columns-2 gap-4 md:columns-3">
            {galeri.map((g, i) => (
              <div
                key={g.id}
                className="animate-fade-up relative mb-4 break-inside-avoid overflow-hidden rounded-lg bg-navy-100"
                style={{ animationDelay: `${(i % 6) * 60}ms`, animationFillMode: "backwards" }}
              >
                <Image
                  src={g.gambar}
                  alt={g.judul}
                  width={500}
                  height={500}
                  className="h-auto w-full object-cover"
                />
                {g.judul && (
                  <p className="bg-ink/60 p-2 text-xs text-kertas absolute bottom-0 w-full">{g.judul}</p>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
