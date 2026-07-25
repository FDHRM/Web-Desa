import Link from "next/link";
import Image from "next/image";
import { readDb } from "@/lib/db";
import HeroSlideshow from "@/components/HeroSlideshow";

export const dynamic = "force-dynamic";

export default async function HomePage() {
  const db = await readDb();
  const beritaTerbaru = [...db.berita]
    .sort((a, b) => (a.tanggal < b.tanggal ? 1 : -1))
    .slice(0, 3);
  const umkmUnggulan = db.umkm.slice(0, 3);
  const galeriFotoUntukHero = db.galeri.map((g) => g.gambar).filter(Boolean).slice(0, 8);

  return (
    <div>
      {/* Hero: gapura desa */}
      <section className="relative overflow-hidden bg-navy-700 text-kertas">
        {galeriFotoUntukHero.length > 0 ? (
          <HeroSlideshow images={galeriFotoUntukHero} />
        ) : db.profil.heroImageUrl ? (
          <>
            <Image
              src={db.profil.heroImageUrl}
              alt=""
              fill
              priority
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-navy-900/80 via-navy-700/75 to-navy-700/90" />
          </>
        ) : (
          <div className="bg-noticeboard pointer-events-none absolute inset-0 opacity-10" />
        )}
        <div className="relative mx-auto max-w-6xl px-5 py-20 md:py-28">
          <div className="mx-auto max-w-3xl text-center">
            <span className="animate-fade-up font-mono text-xs uppercase tracking-[0.3em] text-lime-300">
              Situs Resmi
            </span>
            <h1
              className="animate-fade-up mt-4 font-display text-4xl font-semibold leading-tight md:text-6xl"
              style={{ animationDelay: "80ms", animationFillMode: "backwards" }}
            >
              {db.profil.namaDesa}
            </h1>
            <p
              className="animate-fade-up mt-4 text-lg text-kertas/85"
              style={{ animationDelay: "160ms", animationFillMode: "backwards" }}
            >
              {db.profil.tagline}
            </p>

            <div
              className="animate-fade-up mt-10 flex flex-wrap justify-center gap-3"
              style={{ animationDelay: "240ms", animationFillMode: "backwards" }}
            >
              {[
                { href: "/profil", label: "Profil Desa" },
                { href: "/layanan", label: "Layanan Publik" },
                { href: "/berita", label: "Berita" },
                { href: "/potensi", label: "Potensi Desa" },
                { href: "/umkm", label: "UMKM" },
                { href: "/kontak", label: "Kontak" },
              ].map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="focus-ring rounded-full border border-kertas/30 px-5 py-2 text-sm font-medium transition-colors hover:bg-kertas hover:text-navy-700"
                >
                  {item.label}
                </Link>
              ))}
            </div>
          </div>
        </div>
        {/* Gapura arch shape */}
        <svg
          viewBox="0 0 1200 60"
          className="absolute bottom-0 left-0 w-full text-kertas"
          preserveAspectRatio="none"
        >
          <path d="M0 60 L0 30 Q600 -20 1200 30 L1200 60 Z" fill="currentColor" />
        </svg>
      </section>

      {/* Stats snapshot */}
      <section className="mx-auto -mt-2 max-w-6xl px-5 pt-6">
        <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
          {[
            { label: "Jumlah Penduduk", value: db.statistik.jumlahPenduduk },
            { label: "Jumlah KK", value: db.statistik.jumlahKK },
            { label: "Laki-laki", value: db.statistik.lakiLaki },
            { label: "Perempuan", value: db.statistik.perempuan },
          ].map((stat, i) => (
            <div
              key={stat.label}
              className="animate-fade-up rounded-lg border border-navy-700/10 bg-white p-4 text-center shadow-sm"
              style={{ animationDelay: `${i * 70}ms`, animationFillMode: "backwards" }}
            >
              <p className="font-mono text-2xl font-semibold text-navy-700">
                {stat.value.toLocaleString("id-ID")}
              </p>
              <p className="mt-1 text-xs text-ink/60">{stat.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Berita: papan informasi desa */}
      <section className="mx-auto max-w-6xl px-5 py-16">
        <div className="mb-6 flex items-end justify-between">
          <h2 className="font-display text-2xl font-semibold text-navy-700">
            Papan Informasi Desa
          </h2>
          <Link href="/berita" className="focus-ring text-sm font-medium text-navy-700 underline">
            Semua berita →
          </Link>
        </div>

        {beritaTerbaru.length === 0 ? (
          <p className="rounded-lg border border-dashed border-navy-700/20 p-8 text-center text-sm text-ink/60">
            Belum ada berita. Tambahkan lewat halaman Admin &gt; Berita.
          </p>
        ) : (
          <div className="grid gap-6 md:grid-cols-3">
            {beritaTerbaru.map((b, i) => (
              <Link
                key={b.id}
                href={`/berita/${b.slug}`}
                className={`animate-fade-up focus-ring group block rounded-lg border border-navy-700/10 bg-white p-5 shadow-sm transition-transform hover:-translate-y-1 ${
                  i === 1 ? "md:rotate-0" : i === 0 ? "md:-rotate-1" : "md:rotate-1"
                }`}
                style={{ animationDelay: `${i * 90}ms`, animationFillMode: "backwards" }}
              >
                {b.gambar && (
                  <div className="relative mb-3 h-40 w-full overflow-hidden rounded-md bg-navy-100">
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
                <h3 className="mt-1 font-display text-lg font-semibold text-ink group-hover:text-navy-700">
                  {b.judul}
                </h3>
                <p className="mt-2 line-clamp-2 text-sm text-ink/70">{b.ringkasan}</p>
              </Link>
            ))}
          </div>
        )}
      </section>

      {/* UMKM unggulan */}
      {umkmUnggulan.length > 0 && (
        <section className="mx-auto max-w-6xl px-5 pb-20">
          <div className="mb-6 flex items-end justify-between">
            <h2 className="font-display text-2xl font-semibold text-navy-700">UMKM Desa</h2>
            <Link href="/umkm" className="focus-ring text-sm font-medium text-navy-700 underline">
              Lihat semua →
            </Link>
          </div>
          <div className="grid gap-6 md:grid-cols-3">
            {umkmUnggulan.map((u, i) => (
              <div
                key={u.id}
                className="animate-fade-up rounded-lg border border-navy-700/10 bg-white p-5 shadow-sm"
                style={{ animationDelay: `${i * 90}ms`, animationFillMode: "backwards" }}
              >
                {u.foto && (
                  <div className="relative mb-3 h-36 w-full overflow-hidden rounded-md bg-lime-100">
                    <Image src={u.foto} alt={u.nama} fill className="object-cover" />
                  </div>
                )}
                <span className="font-mono text-xs uppercase text-teal-500">{u.jenis}</span>
                <h3 className="mt-1 font-display text-lg font-semibold">{u.nama}</h3>
                <p className="mt-1 text-sm text-ink/70 line-clamp-2">{u.deskripsi}</p>
              </div>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
