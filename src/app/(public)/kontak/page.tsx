import { readDb } from "@/lib/db";
import PageHeader from "@/components/PageHeader";

export const dynamic = "force-dynamic";

export const metadata = { title: "Kontak Desa" };

export default async function KontakPage() {
  const { kontak } = await readDb();

  const items = [
    { label: "Alamat", value: kontak.alamat },
    { label: "Telepon", value: kontak.telepon },
    { label: "Email", value: kontak.email },
    { label: "Jam Layanan", value: kontak.jamLayanan },
  ];

  return (
    <div>
      <PageHeader eyebrow="Hubungi Kami" title="Kontak" />

      <div className="mx-auto max-w-3xl px-5 py-16">
        <div className="animate-fade-up rounded-lg border border-navy-700/10 bg-white p-6 shadow-sm">
          <dl className="grid gap-6 sm:grid-cols-2">
            {items.map((item, i) => (
              <div
                key={item.label}
                className="animate-fade-up"
                style={{ animationDelay: `${i * 80}ms`, animationFillMode: "backwards" }}
              >
                <dt className="font-mono text-xs uppercase text-teal-500">{item.label}</dt>
                <dd className="mt-1 text-ink/80">{item.value}</dd>
              </div>
            ))}
          </dl>
        </div>

        <div
          className="animate-fade-up mt-8 rounded-lg border border-navy-700/10 bg-white p-5 shadow-sm"
          style={{ animationDelay: "160ms", animationFillMode: "backwards" }}
        >
          <h3 className="font-display text-lg font-semibold text-ink">Peta Lokasi Kantor Desa</h3>
          {kontak.mapsEmbedUrl ? (
            <div className="mt-4 overflow-hidden rounded-lg">
              <iframe
                src={kontak.mapsEmbedUrl}
                className="h-[350px] w-full"
                loading="lazy"
                title="Peta Lokasi Kantor Desa"
              />
            </div>
          ) : (
            <div className="mt-4 flex min-h-[180px] items-center justify-center rounded-lg border border-dashed border-navy-700/20 text-sm text-ink/50">
              Peta lokasi kantor desa belum diatur oleh admin.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
