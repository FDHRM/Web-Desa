import Image from "next/image";
import { notFound } from "next/navigation";
import { readDb } from "@/lib/db";

export default async function BeritaDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const { berita } = await readDb();
  const item = berita.find((b) => b.slug === slug);
  if (!item) notFound();

  return (
    <article className="mx-auto max-w-3xl px-5 py-16">
      <p className="animate-fade-up font-mono text-xs text-teal-500">
        {new Date(item.tanggal).toLocaleDateString("id-ID", {
          day: "numeric",
          month: "long",
          year: "numeric",
        })}
      </p>
      <h1
        className="animate-fade-up mt-2 font-display text-3xl font-semibold text-navy-700 md:text-4xl"
        style={{ animationDelay: "70ms", animationFillMode: "backwards" }}
      >
        {item.judul}
      </h1>

      {item.gambar && (
        <div
          className="animate-fade-up relative mt-6 h-72 w-full overflow-hidden rounded-lg bg-navy-100 md:h-96"
          style={{ animationDelay: "140ms", animationFillMode: "backwards" }}
        >
          <Image src={item.gambar} alt={item.judul} fill className="object-cover" />
        </div>
      )}

      <div
        className="animate-fade-up mt-8 whitespace-pre-line leading-relaxed text-ink/80"
        style={{ animationDelay: "210ms", animationFillMode: "backwards" }}
      >
        {item.isi}
      </div>
    </article>
  );
}
