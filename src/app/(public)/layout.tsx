import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { readDb } from "@/lib/db";

export const dynamic = "force-dynamic";

export default async function PublicLayout({ children }: { children: React.ReactNode }) {
  const db = await readDb();
  return (
    <div className="flex min-h-screen flex-col">
      <Navbar namaDesa={db.profil.namaDesa} />
      <main className="flex-1">{children}</main>
      <Footer namaDesa={db.profil.namaDesa} alamat={db.kontak.alamatFooter} />
    </div>
  );
}
