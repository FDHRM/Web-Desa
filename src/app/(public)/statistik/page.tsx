import { readDb } from "@/lib/db";
import StatBar from "@/components/StatBar";
import PageHeader from "@/components/PageHeader";

export const dynamic = "force-dynamic";

export const metadata = { title: "Statistik Penduduk" };

export default async function StatistikPage() {
  const { statistik } = await readDb();

  return (
    <div>
      <PageHeader eyebrow="Data" title="Statistik Kependudukan" />

      <div className="mx-auto max-w-5xl px-5 py-16">
        <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
          {[
            { label: "Jumlah Penduduk", value: statistik.jumlahPenduduk },
            { label: "Jumlah KK", value: statistik.jumlahKK },
            { label: "Laki-laki", value: statistik.lakiLaki },
            { label: "Perempuan", value: statistik.perempuan },
          ].map((s, i) => (
            <div
              key={s.label}
              className="animate-fade-up rounded-lg border border-navy-700/10 bg-white p-4 text-center shadow-sm"
              style={{ animationDelay: `${i * 70}ms`, animationFillMode: "backwards" }}
            >
              <p className="font-mono text-2xl font-semibold text-navy-700">
                {s.value.toLocaleString("id-ID")}
              </p>
              <p className="mt-1 text-xs text-ink/60">{s.label}</p>
            </div>
          ))}
        </div>

        <div className="mt-10 grid gap-6 md:grid-cols-3">
          <div className="animate-fade-up" style={{ animationFillMode: "backwards" }}>
            <StatBar
              title="Per Dusun"
              rows={statistik.perDusun.map((r) => ({ label: r.nama ?? "", jumlah: r.jumlah }))}
            />
          </div>
          <div className="animate-fade-up" style={{ animationDelay: "90ms", animationFillMode: "backwards" }}>
            <StatBar
              title="Per Jenis Pekerjaan"
              rows={statistik.pekerjaan.map((r) => ({ label: r.jenis ?? "", jumlah: r.jumlah }))}
            />
          </div>
          <div className="animate-fade-up" style={{ animationDelay: "180ms", animationFillMode: "backwards" }}>
            <StatBar
              title="Per Kelompok Usia"
              rows={statistik.usia.map((r) => ({ label: r.rentang ?? "", jumlah: r.jumlah }))}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
