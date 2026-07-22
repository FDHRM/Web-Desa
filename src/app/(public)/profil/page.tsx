import Image from "next/image";
import { readDb } from "@/lib/db";
import PageHeader from "@/components/PageHeader";

export const dynamic = "force-dynamic";

export const metadata = { title: "Profil Desa" };

export default async function ProfilPage() {
  const { profil, kontak, perangkat } = await readDb();
  const kepalaDesa = perangkat.find((p) => p.jabatan.toLowerCase().includes("kepala desa"));

  return (
    <div>
      <PageHeader eyebrow="Profil" title={profil.namaDesa} />

      <div className="mx-auto max-w-4xl px-5 py-16">
        {kepalaDesa && (
          <div
            className="animate-fade-up mb-10 flex items-center gap-4 rounded-lg border border-navy-700/10 bg-white p-5 shadow-sm"
            style={{ animationFillMode: "backwards" }}
          >
            <div className="relative h-20 w-20 shrink-0 overflow-hidden rounded-full bg-navy-100">
              {kepalaDesa.foto && (
                <Image src={kepalaDesa.foto} alt={kepalaDesa.nama} fill className="object-cover" />
              )}
            </div>
            <div>
              <p className="font-mono text-xs uppercase tracking-wide text-teal-500">Kepala Desa</p>
              <p className="font-display text-lg font-semibold text-ink">{kepalaDesa.nama}</p>
            </div>
          </div>
        )}

        <section className="animate-fade-up" style={{ animationFillMode: "backwards" }}>
          <h2 className="font-display text-xl font-semibold text-ink">Profil Desa</h2>
          <p className="mt-3 whitespace-pre-line leading-relaxed text-ink/80">{profil.sejarah}</p>
        </section>

        <section
          className="animate-fade-up mt-10 grid gap-8 md:grid-cols-2"
          style={{ animationDelay: "80ms", animationFillMode: "backwards" }}
        >
          <div>
            <h2 className="font-display text-xl font-semibold text-ink">Visi</h2>
            <p className="mt-3 leading-relaxed text-ink/80">{profil.visi}</p>
          </div>
          <div>
            <h2 className="font-display text-xl font-semibold text-ink">Misi</h2>
            <ol className="mt-3 list-decimal space-y-1 pl-5 text-ink/80">
              {profil.misi.map((m, i) => (
                <li key={i}>{m}</li>
              ))}
            </ol>
          </div>
        </section>
      </div>

      {/* Geografis Desa */}
      <section className="bg-navy-50/60 py-16">
        <div className="mx-auto max-w-6xl px-5">
          <div className="animate-fade-up text-center">
            <h2 className="font-display text-2xl font-semibold text-navy-700 md:text-3xl">
              Geografis Desa
            </h2>
            <p className="mt-1 text-sm text-ink/60">Kewilayahan {profil.namaDesa}</p>
          </div>

          <div className="mt-8 grid gap-4 sm:grid-cols-2">
            <div className="animate-fade-up" style={{ animationFillMode: "backwards" }}>
              <InfoCard label="Alamat Kantor" value={kontak.alamat} />
            </div>
            <div className="animate-fade-up" style={{ animationDelay: "80ms", animationFillMode: "backwards" }}>
              <InfoCard label="Luas Wilayah" value={profil.luasWilayah || "Belum diatur"} big />
            </div>
          </div>

          <div
            className="animate-fade-up mt-10 rounded-lg border border-navy-700/10 bg-white p-5 shadow-sm"
            style={{ animationDelay: "240ms", animationFillMode: "backwards" }}
          >
            <h3 className="font-display text-lg font-semibold text-ink">Peta Lokasi</h3>
            {profil.mapsEmbedUrl ? (
              <div className="mt-4 overflow-hidden rounded-lg">
                <iframe
                  src={profil.mapsEmbedUrl}
                  className="h-[400px] w-full"
                  loading="lazy"
                  title="Peta Lokasi Desa"
                />
              </div>
            ) : (
              <div className="mt-4 flex min-h-[200px] items-center justify-center rounded-lg border border-dashed border-navy-700/20 text-sm text-ink/50">
                Peta lokasi belum diatur oleh admin.
              </div>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}

function InfoCard({
  label,
  value,
  sub,
  big,
}: {
  label: string;
  value: React.ReactNode;
  sub?: string;
  big?: boolean;
}) {
  return (
    <div className="rounded-lg border border-navy-700/10 bg-white p-5 shadow-sm">
      <p className="font-mono text-xs uppercase tracking-wide text-teal-500">{label}</p>
      <div className={big ? "mt-2 font-display text-xl font-semibold text-ink" : "mt-2 text-sm text-ink/80"}>
        {value}
      </div>
      {sub && <p className="mt-1 text-xs text-ink/50">{sub}</p>}
    </div>
  );
}
