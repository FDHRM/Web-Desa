import Link from "next/link";
import { readDb } from "@/lib/db";

export const dynamic = "force-dynamic";

export default async function DashboardPage() {
  const db = await readDb();

  const cards = [
    { label: "Berita", value: db.berita.length, href: "/admin/berita" },
    { label: "Potensi Desa", value: db.potensi.length, href: "/admin/potensi" },
    { label: "Perangkat Desa", value: db.perangkat.length, href: "/admin/perangkat" },
    { label: "UMKM", value: db.umkm.length, href: "/admin/umkm" },
    { label: "Foto Galeri", value: db.galeri.length, href: "/admin/galeri" },
  ];

  return (
    <div>
      <h1 className="font-display text-2xl font-semibold text-navy-700">
        Selamat datang di panel admin
      </h1>
      <p className="mt-1 text-sm text-ink/60">
        Kelola seluruh konten website {db.profil.namaDesa} dari sini.
      </p>

      <div className="mt-8 grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-5">
        {cards.map((c) => (
          <Link
            key={c.label}
            href={c.href}
            className="focus-ring rounded-lg border border-navy-700/10 bg-white p-5 text-center shadow-sm transition-transform hover:-translate-y-0.5"
          >
            <p className="font-mono text-2xl font-semibold text-navy-700">{c.value}</p>
            <p className="mt-1 text-xs text-ink/60">{c.label}</p>
          </Link>
        ))}
      </div>

      <div className="mt-10 rounded-lg border border-dashed border-navy-700/20 p-6 text-sm text-ink/70">
        <p className="font-medium text-ink">Langkah awal yang disarankan:</p>
        <ol className="mt-2 list-decimal space-y-1 pl-5">
          <li>Isi <strong>Profil Desa</strong> (sejarah, visi misi, luas wilayah).</li>
          <li>Tambahkan <strong>Perangkat Desa</strong> beserta foto.</li>
          <li>Perbarui angka di halaman <strong>Statistik</strong>.</li>
          <li>Tulis <strong>Berita</strong> pertama.</li>
          <li>Lengkapi <strong>Kontak</strong> dan lokasi peta.</li>
        </ol>
      </div>
    </div>
  );
}
