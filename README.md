# Website Desa

Website profil desa dengan **panel admin** untuk mengelola semua isi (profil, perangkat desa,
statistik penduduk, berita, potensi desa, UMKM, galeri, dan kontak) tanpa perlu mengubah kode.

Dibangun dengan Next.js 14 (App Router) + TypeScript + Tailwind CSS. Data disimpan di
**Supabase** (Postgres) dan foto yang diupload lewat admin disimpan di **Cloudinary** — keduanya
gratis untuk pemakaian skala website desa, dan datanya **permanen** (tidak hilang meski di-deploy
ulang atau di-restart), sehingga project ini bisa di-deploy gratis ke platform seperti Vercel.

## 1. Bikin akun & project yang dibutuhkan (gratis)

### Supabase (database)
1. Daftar di [supabase.com](https://supabase.com) (gratis, tanpa kartu kredit)
2. Bikin project baru, tunggu sampai selesai provisioning (~2 menit)
3. Buka **SQL Editor** di sidebar, jalankan isi file `supabase/schema.sql` (tinggal copy-paste, klik Run)
4. Buka **Project Settings > API**, catat dua nilai ini:
   - **Project URL** → nanti jadi `SUPABASE_URL`
   - **service_role key** (bukan `anon` key!) → nanti jadi `SUPABASE_SERVICE_ROLE_KEY`

### Cloudinary (penyimpanan foto)
1. Daftar di [cloudinary.com](https://cloudinary.com) (gratis)
2. Buka dashboard-nya, di halaman utama akan langsung terlihat:
   - **Cloud name** → `CLOUDINARY_CLOUD_NAME`
   - **API Key** → `CLOUDINARY_API_KEY`
   - **API Secret** → `CLOUDINARY_API_SECRET` (klik "Reveal" untuk melihatnya)

## 2. Persiapan lokal

Pastikan sudah terinstal **Node.js versi 18 ke atas**.

```bash
npm install
```

Salin file contoh env, lalu isi semua nilainya:

```bash
cp .env.local.example .env.local
```

Edit `.env.local` dan isi:
- `ADMIN_USERNAME`, `ADMIN_PASSWORD` — kredensial login admin (bebas, pilih yang kuat)
- `SESSION_SECRET` — teks acak bebas (misal hasil `openssl rand -hex 32`), dipakai untuk menandatangani cookie sesi login
- `SUPABASE_URL`, `SUPABASE_SERVICE_ROLE_KEY` — dari langkah Supabase di atas
- `CLOUDINARY_CLOUD_NAME`, `CLOUDINARY_API_KEY`, `CLOUDINARY_API_SECRET` — dari langkah Cloudinary di atas

> Jangan bagikan file `.env.local` ke orang lain atau upload ke repository publik. Terutama
> Service Role Key Supabase dan API Secret Cloudinary — siapa pun yang punya nilai itu bisa
> baca/tulis penuh ke database dan storage kamu.

## 3. Jalankan di komputer lokal

```bash
npm run dev
```

Buka:
- Website publik: http://localhost:3000
- Login admin: http://localhost:3000/admin/login

Data awal (nama desa "Karangjaya" dan contoh struktur data lainnya) otomatis dibuat di Supabase
saat pertama kali halaman diakses. Login dengan username & password dari `.env.local`, lalu isi
semua data lewat menu di sidebar admin.

## 4. Deploy gratis ke Vercel

1. Push project ini ke GitHub (repo boleh private)
2. Buka [vercel.com](https://vercel.com), login pakai akun GitHub, klik **Add New > Project**, pilih repo ini
3. Di bagian **Environment Variables**, isi semua variabel yang sama seperti di `.env.local` kamu
   (`ADMIN_USERNAME`, `ADMIN_PASSWORD`, `SESSION_SECRET`, `SUPABASE_URL`,
   `SUPABASE_SERVICE_ROLE_KEY`, `CLOUDINARY_CLOUD_NAME`, `CLOUDINARY_API_KEY`, `CLOUDINARY_API_SECRET`)
4. Klik **Deploy**

Karena semua data & foto sekarang disimpan di Supabase & Cloudinary (bukan disk lokal Vercel yang
sementara), datanya **tidak akan hilang** meski Vercel redeploy, restart, atau scale ke banyak
instance sekaligus.

## Struktur data

Seluruh data situs (profil, berita, dll) disimpan sebagai satu baris JSON di tabel `site_data` pada
Supabase — bisa dilihat langsung lewat **Table Editor** di dashboard Supabase kalau perlu dicek atau
diedit manual.

Foto yang diupload lewat admin otomatis masuk ke folder `webdesa/` di Cloudinary kamu.

## Struktur folder penting

```
src/app/(public)/     -> halaman yang dilihat pengunjung
src/app/admin/        -> panel admin (dilindungi login)
src/app/api/          -> API untuk membaca/menulis data
src/lib/db.ts         -> baca/tulis data lewat Supabase
src/lib/supabase.ts   -> koneksi ke Supabase (server-only)
src/lib/auth.ts       -> logika sesi login admin
supabase/schema.sql   -> SQL untuk membuat tabel di Supabase
```
