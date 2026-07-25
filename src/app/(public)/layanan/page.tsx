import { readDb } from "@/lib/db";
import PageHeader from "@/components/PageHeader";
import LayananAccordion from "@/components/LayananAccordion";

export const dynamic = "force-dynamic";

export const metadata = { title: "Layanan Publik" };

export default async function LayananPage() {
  const { layanan } = await readDb();

  return (
    <div>
      <PageHeader
        eyebrow="Layanan Publik"
        title="Mengurus Surat & Keperluan Warga"
        description="Klik salah satu jenis surat di bawah untuk melihat persyaratan dan cara mengurusnya."
      />

      <div className="mx-auto max-w-3xl px-5 py-16">
        {layanan.length === 0 ? (
          <p className="rounded-lg border border-dashed border-navy-700/20 p-8 text-center text-sm text-ink/60">
            Belum ada data layanan publik.
          </p>
        ) : (
          <LayananAccordion items={layanan} />
        )}
      </div>
    </div>
  );
}
