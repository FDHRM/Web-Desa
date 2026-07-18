"use client";

import Link from "next/link";
import { useState } from "react";
import { usePathname } from "next/navigation";

const links = [
  { href: "/", label: "Beranda" },
  { href: "/profil", label: "Profil" },
  { href: "/statistik", label: "Statistik" },
  { href: "/berita", label: "Berita" },
  { href: "/potensi", label: "Potensi Desa" },
  { href: "/umkm", label: "UMKM" },
  { href: "/galeri", label: "Galeri" },
  { href: "/kontak", label: "Kontak" },
];

export default function Navbar({ namaDesa }: { namaDesa: string }) {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-40 border-b border-navy-700/10 bg-kertas/95 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-5 py-3">
        <Link href="/" className="font-display text-lg font-semibold text-navy-700">
          {namaDesa}
        </Link>

        <nav className="hidden gap-1 md:flex">
          {links.map((link) => {
            const active = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`focus-ring rounded-md px-3 py-2 text-sm font-medium transition-colors ${
                  active
                    ? "bg-navy-700 text-kertas"
                    : "text-ink/80 hover:bg-navy-100 hover:text-navy-700"
                }`}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>

        <button
          className="focus-ring relative z-10 h-8 w-8 md:hidden"
          onClick={() => setOpen(!open)}
          aria-label={open ? "Tutup menu" : "Buka menu"}
          aria-expanded={open}
        >
          <span
            className={`absolute left-1/2 top-1/2 h-0.5 w-6 -translate-x-1/2 rounded-full bg-ink transition-all duration-300 ease-in-out ${
              open ? "translate-y-0 rotate-45" : "-translate-y-2"
            }`}
          />
          <span
            className={`absolute left-1/2 top-1/2 h-0.5 w-6 -translate-x-1/2 -translate-y-1/2 rounded-full bg-ink transition-opacity duration-200 ease-in-out ${
              open ? "opacity-0" : "opacity-100"
            }`}
          />
          <span
            className={`absolute left-1/2 top-1/2 h-0.5 w-6 -translate-x-1/2 rounded-full bg-ink transition-all duration-300 ease-in-out ${
              open ? "translate-y-0 -rotate-45" : "translate-y-2"
            }`}
          />
        </button>
      </div>

      <div
        className={`overflow-hidden transition-[max-height,opacity] duration-300 ease-in-out md:hidden ${
          open ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <nav className="flex flex-col gap-1 border-t border-navy-700/10 px-5 py-3">
          {open &&
            links.map((link, i) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className="focus-ring animate-fade-up rounded-md px-3 py-2 text-sm font-medium text-ink/80 hover:bg-navy-100"
                style={{ animationDelay: `${i * 40}ms`, animationFillMode: "backwards" }}
              >
                {link.label}
              </Link>
            ))}
        </nav>
      </div>
    </header>
  );
}
