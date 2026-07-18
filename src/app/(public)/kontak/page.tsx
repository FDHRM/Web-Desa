import { readDb } from "@/lib/db";
import PageHeader from "@/components/PageHeader";

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
      <PageHeader
        eyebrow="Hubungi Kami"
        title="Kontak"
        description={
          <>
            Peta lokasi kantor desa bisa dilihat di halaman{" "}
            <a href="/profil" className="underline hover:text-kertas">
              Profil Desa
            </a>
            .
          </>
        }
      />

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
      </div>
    </div>
  );
}
