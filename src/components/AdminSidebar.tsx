"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";

const links = [
  { href: "/admin/dashboard", label: "Dashboard" },
  { href: "/admin/profil", label: "Profil Desa" },
  { href: "/admin/perangkat", label: "Perangkat Desa" },
  { href: "/admin/statistik", label: "Statistik" },
  { href: "/admin/layanan", label: "Layanan Publik" },
  { href: "/admin/berita", label: "Berita" },
  { href: "/admin/potensi", label: "Potensi Desa" },
  { href: "/admin/umkm", label: "UMKM" },
  { href: "/admin/galeri", label: "Galeri" },
  { href: "/admin/kontak", label: "Kontak" },
];

export default function AdminSidebar() {
  const pathname = usePathname();
  const router = useRouter();

  async function handleLogout() {
    await fetch("/api/auth/logout", { method: "POST" });
    router.push("/admin/login");
    router.refresh();
  }

  return (
    <aside className="w-full shrink-0 border-b border-olive-700/10 bg-olive-700 md:min-h-screen md:w-56 md:border-b-0 md:border-r">
      <div className="px-5 py-5">
        <p className="font-mono text-xs uppercase tracking-[0.3em] text-lime-300">Admin</p>
        <p className="font-display text-lg font-semibold text-kertas">Kelola Website</p>
      </div>
      <nav className="flex flex-row flex-wrap gap-1 px-3 pb-4 md:flex-col">
        {links.map((link) => {
          const active = pathname === link.href;
          return (
            <Link
              key={link.href}
              href={link.href}
              className={`focus-ring rounded-md px-3 py-2 text-sm font-medium transition-colors ${
                active ? "bg-kertas text-olive-700" : "text-kertas/80 hover:bg-olive-600"
              }`}
            >
              {link.label}
            </Link>
          );
        })}
        <Link
          href="/"
          target="_blank"
          className="focus-ring mt-2 rounded-md px-3 py-2 text-sm font-medium text-kertas/60 hover:bg-olive-600"
        >
          Lihat situs ↗
        </Link>
        <button
          onClick={handleLogout}
          className="focus-ring mt-2 rounded-md px-3 py-2 text-left text-sm font-medium text-danger-500 hover:bg-olive-600"
        >
          Keluar
        </button>
      </nav>
    </aside>
  );
}
