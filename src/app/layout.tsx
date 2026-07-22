import type { Metadata } from "next";
import { Fraunces, Plus_Jakarta_Sans, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { readDb } from "@/lib/db";

const fraunces = Fraunces({
  subsets: ["latin"],
  variable: "--font-fraunces",
  weight: ["500", "600", "700"],
});

const jakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-jakarta",
  weight: ["400", "500", "600", "700"],
});

const jetbrains = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains",
  weight: ["400", "500"],
});

export const dynamic = "force-dynamic";

export async function generateMetadata(): Promise<Metadata> {
  const { profil } = await readDb();
  return {
    title: profil.namaDesa || "Website Desa",
    description: profil.tagline || "Situs resmi informasi dan layanan desa",
    // Pakai logo yang diupload lewat Admin > Profil Desa sebagai favicon (ikon tab
    // browser). Kalau logo belum diisi, browser otomatis fallback ke ikon default.
    icons: profil.logoUrl ? [{ url: profil.logoUrl }] : undefined,
  };
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="id">
      <body
        className={`${fraunces.variable} ${jakarta.variable} ${jetbrains.variable} font-body antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
