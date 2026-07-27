import { getSupabaseServerClient, type Json } from "@/lib/supabase";

export type Perangkat = { id: string; nama: string; jabatan: string; foto: string };
export type Berita = {
  id: string;
  judul: string;
  slug: string;
  ringkasan: string;
  isi: string;
  gambar: string;
  tanggal: string;
};
export type GaleriItem = { id: string; judul: string; gambar: string };
export type Umkm = {
  id: string;
  nama: string;
  jenis: string;
  deskripsi: string;
  foto: string;
  kontak: string;
};
export type Potensi = {
  id: string;
  nama: string;
  kategori: string;
  deskripsi: string;
  foto: string;
};
export type LayananSurat = {
  id: string;
  judul: string;
  deskripsi: string;
};
export type StatistikRow = { nama?: string; jenis?: string; rentang?: string; jumlah: number };

export type DbShape = {
  profil: {
    namaDesa: string;
    tagline: string;
    sejarah: string;
    visi: string;
    misi: string[];
    luasWilayah: string;
    mapsEmbedUrl: string;
    logoUrl: string;
    heroImageUrl: string;
  };
  perangkat: Perangkat[];
  statistik: {
    jumlahPenduduk: number;
    jumlahKK: number;
    lakiLaki: number;
    perempuan: number;
    perDusun: StatistikRow[];
    pekerjaan: StatistikRow[];
    usia: StatistikRow[];
  };
  berita: Berita[];
  galeri: GaleriItem[];
  umkm: Umkm[];
  potensi: Potensi[];
  layanan: LayananSurat[];
  kontak: {
    alamat: string;
    alamatFooter: string;
    telepon: string;
    email: string;
    jamLayanan: string;
    mapsEmbedUrl: string;
  };
};

// Used to auto-seed the Supabase row the very first time the app runs
// against a fresh database, and as the default village name per request.
const DEFAULT_DB: DbShape = {
  profil: {
    namaDesa: "Karangjaya",
    tagline: "Guyub Rukun, Mandiri, dan Sejahtera",
    sejarah: "Tuliskan sejarah desa di sini melalui halaman Admin > Profil.",
    visi: "Tuliskan visi desa di sini.",
    misi: ["Tuliskan poin misi pertama", "Tuliskan poin misi kedua"],
    luasWilayah: "",
    mapsEmbedUrl: "",
    logoUrl: "",
    heroImageUrl: "",
  },
  perangkat: [
    { id: "1", nama: "Nama Kepala Desa", jabatan: "Kepala Desa", foto: "" },
    { id: "2", nama: "Nama Sekretaris", jabatan: "Sekretaris Desa", foto: "" },
  ],
  statistik: {
    jumlahPenduduk: 0,
    jumlahKK: 0,
    lakiLaki: 0,
    perempuan: 0,
    perDusun: [
      { nama: "Dusun 1", jumlah: 0 },
      { nama: "Dusun 2", jumlah: 0 },
    ],
    pekerjaan: [
      { jenis: "Petani", jumlah: 0 },
      { jenis: "Pedagang", jumlah: 0 },
    ],
    usia: [
      { rentang: "0-14", jumlah: 0 },
      { rentang: "15-64", jumlah: 0 },
      { rentang: "65+", jumlah: 0 },
    ],
  },
  berita: [],
  galeri: [],
  umkm: [],
  potensi: [],
  layanan: [
    { id: "1", judul: "Surat Pengantar KTP / KK", deskripsi: "Tuliskan persyaratan dan cara mengurusnya di sini." },
    { id: "2", judul: "Surat Keterangan Usaha", deskripsi: "Tuliskan persyaratan dan cara mengurusnya di sini." },
    { id: "3", judul: "Surat Keterangan Domisili", deskripsi: "Tuliskan persyaratan dan cara mengurusnya di sini." },
    { id: "4", judul: "Surat Keterangan Tidak Mampu (SKTM)", deskripsi: "Tuliskan persyaratan dan cara mengurusnya di sini." },
    { id: "5", judul: "Surat Pengantar Nikah (N1-N4)", deskripsi: "Tuliskan persyaratan dan cara mengurusnya di sini." },
    { id: "6", judul: "Surat Keterangan Kelahiran / Kematian", deskripsi: "Tuliskan persyaratan dan cara mengurusnya di sini." },
    { id: "7", judul: "Surat Keterangan Waris", deskripsi: "Tuliskan persyaratan dan cara mengurusnya di sini." },
    { id: "8", judul: "Surat Pengantar Lokal", deskripsi: "Tuliskan persyaratan dan cara mengurusnya di sini." },
    { id: "9", judul: "Surat Pengantar SKCK", deskripsi: "Tuliskan persyaratan dan cara mengurusnya di sini." },
  ],
  kontak: {
    alamat: "Jl. Contoh No. 1, Desa Karangjaya",
    alamatFooter: "Jl. Contoh No. 1, Desa Karangjaya",
    telepon: "-",
    email: "-",
    jamLayanan: "Senin - Jumat, 08.00 - 15.00",
    mapsEmbedUrl: "",
  },
};

const TABLE = "site_data";
const ROW_ID = 1;

export async function readDb(): Promise<DbShape> {
  const supabase = getSupabaseServerClient();
  const { data, error } = await supabase.from(TABLE).select("data").eq("id", ROW_ID).maybeSingle();

  if (error) {
    throw new Error(`Gagal membaca data dari Supabase: ${error.message}`);
  }

  if (!data) {
    // First run against a fresh database: seed it so the app has something to show.
    const { error: insertError } = await supabase
      .from(TABLE)
      .insert({ id: ROW_ID, data: DEFAULT_DB as unknown as Json });
    if (insertError) {
      throw new Error(`Gagal membuat data awal di Supabase: ${insertError.message}`);
    }
    return DEFAULT_DB;
  }

  const result = data.data as unknown as DbShape;
  // Backward-compatible migrations: existing rows created before these fields
  // existed won't have them yet. Backfill in-memory (and persist once) so
  // older data doesn't need a manual reset.
  let needsSave = false;
  if (!Array.isArray(result.layanan)) {
    result.layanan = DEFAULT_DB.layanan;
    needsSave = true;
  }
  if (typeof result.kontak.alamatFooter !== "string") {
    // Default the new footer-only address to whatever the existing contact
    // address already is, so the footer doesn't suddenly go blank.
    result.kontak.alamatFooter = result.kontak.alamat || DEFAULT_DB.kontak.alamatFooter;
    needsSave = true;
  }
  if (needsSave) {
    await writeDb(result);
  }
  return result;
}

export async function writeDb(data: DbShape): Promise<void> {
  const supabase = getSupabaseServerClient();
  const { error } = await supabase
    .from(TABLE)
    .upsert({ id: ROW_ID, data: data as unknown as Json });
  if (error) {
    throw new Error(`Gagal menyimpan data ke Supabase: ${error.message}`);
  }
}

export function slugify(text: string) {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-");
}

export function genId() {
  return Date.now().toString(36) + Math.random().toString(36).slice(2, 8);
}
