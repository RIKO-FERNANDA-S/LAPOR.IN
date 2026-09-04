# 🏙️ Bina (LAPOR.IN)
> Platform penilaian infrastruktur dan fasilitas publik berbasis laporan masyarakat.

[![Next.js](https://img.shields.io/badge/Next.js-16.2.11-black?logo=next.js)](https://nextjs.org)
[![React](https://img.shields.io/badge/React-19-61DAFB?logo=react)](https://react.dev)
[![Prisma](https://img.shields.io/badge/Prisma-7.9-2D3748?logo=prisma)](https://prisma.io)
[![TailwindCSS](https://img.shields.io/badge/Tailwind-v4-06B6D4?logo=tailwindcss)](https://tailwindcss.com)
[![License](https://img.shields.io/badge/License-ISC-green)](https://github.com/RIKO-FERNANDA-S/LAPOR.IN)

---

## 📋 Daftar Isi

1. [Penjelasan Aplikasi](#-penjelasan-aplikasi)
2. [Teknologi yang Digunakan](#-teknologi-yang-digunakan)
3. [Cara Instalasi](#-cara-instalasi)
4. [Cara Penggunaan](#-cara-penggunaan)

---

## 1. 📖 Penjelasan Aplikasi

### Latar Belakang

**Bina** (sebelumnya dikenal sebagai **Lapor.in**) lahir dari keprihatinan terhadap **ketimpangan pembangunan** dan lemahnya pengawasan terhadap infrastruktur dasar serta fasilitas publik di Indonesia. Selama ini, kinerja pemerintah di sektor infrastruktur tidak memiliki parameter yang transparan, terukur, dan berpihak pada masyarakat sipil.

Platform ini mengisi kekosongan tersebut dengan menjadikan **laporan nyata dari warga** sebagai sumber data utama penilaian kualitas infrastruktur daerah. Melalui sistem login, verifikasi OTP, dan validasi laporan, platform didesain agar lebih resisten terhadap laporan palsu.

### Tujuan

| # | Tujuan |
|---|--------|
| 1 | Menilai kualitas **pelayanan dan fasilitas publik** secara objektif |
| 2 | Menjadi **wadah terbuka** untuk pelacakan kondisi infrastruktur daerah |
| 3 | Menjadi **indikator kualitas kinerja pemerintah** terhadap daerahnya |
| 4 | Mengukur **kepuasan masyarakat** secara real-time dan terverifikasi |
| 5 | Mendorong **transparansi dan akuntabilitas** melalui data kolektif warga |

### Fokus Platform

- 🏛️ **Non-profit** — dibangun untuk kepentingan publik, bukan komersial
- 🔍 **Penilaian infrastruktur** — jalan, jembatan, sanitasi, taman, dll.
- 🌐 **Penilaian layanan publik** — fasilitas kesehatan, pendidikan, transportasi

### Dampak yang Diharapkan

- ⚡ Merangsang peningkatan kinerja pemerintah daerah
- 💼 Mempengaruhi keputusan investor melalui data infrastruktur yang sahih
- 📈 Mendukung pertumbuhan ekonomi melalui peningkatan kualitas fasilitas publik

### Fitur Utama (Keunggulan)

| Fitur | Deskripsi |
|-------|-----------|
| 🗺️ **Peta Interaktif** | Visualisasi laporan berbasis peta menggunakan Leaflet.js; pengguna bisa klik lokasi di peta untuk melaporkan |
| ⭐ **Sistem Rating Bina Score** | Setiap laporan menghasilkan rating 1–5 bintang per aspek infrastruktur; diakumulasi menjadi **Bina Score** per wilayah |
| 🔐 **Autentikasi Multi-Layer** | Login email/password + Google OAuth, dilengkapi verifikasi OTP via email untuk registrasi dan reset password |
| 👥 **Role-Based Access Control** | Dua peran: **Warga** (melapor & memverifikasi) dan **Admin** (mereview, memverifikasi, dan mengelola laporan) |
| 📊 **Dashboard Analitik** | Visualisasi data per kategori infrastruktur, tren laporan, dan skor wilayah secara periodik |
| 📸 **Upload Bukti Foto** | Setiap laporan wajib menyertakan foto sebagai bukti kondisi infrastruktur |
| 🔔 **Sistem Notifikasi** | Pengguna mendapat notifikasi real-time atas perubahan status laporan mereka |
| 🗂️ **Kategori & Sub-Kategori** | Infrastruktur diklasifikasikan secara hierarkis (kategori → sub-kategori) untuk analisis yang lebih presisi |

---

## 2. 🛠️ Teknologi yang Digunakan

### Core Framework

| Teknologi | Versi | Keterangan |
|-----------|-------|------------|
| [Next.js](https://nextjs.org) | `16.2.11` | Full-stack framework dengan App Router & Server Components |
| [React](https://react.dev) | `19.2.4` | Library UI utama |
| [TypeScript](https://www.typescriptlang.org) | `^5` | Type safety di seluruh codebase |

### Styling & UI

| Teknologi | Versi | Keterangan |
|-----------|-------|------------|
| [Tailwind CSS](https://tailwindcss.com) | `^4` | Utility-first CSS framework |
| [Lucide React](https://lucide.dev) | `^1.38` | Icon library |
| [Phosphor Icons](https://phosphoricons.com) | `^2.1` | Ikon tambahan |
| [Motion](https://motion.dev) | `^13.1` | Animasi dan transisi UI |
| [shadcn/ui](https://ui.shadcn.com) | `^4.19` | Komponen UI berbasis Radix |

### Database & ORM

| Teknologi | Versi | Keterangan |
|-----------|-------|------------|
| [Prisma ORM](https://prisma.io) | `^7.9` | Database toolkit & schema management |
| [Neon (PostgreSQL)](https://neon.tech) | `^1.1` | Serverless PostgreSQL database |
| [MongoDB / Mongoose](https://mongoosejs.com) | `^9.9` | Database sekunder (data tidak terstruktur) |

### Autentikasi

| Teknologi | Versi | Keterangan |
|-----------|-------|------------|
| [NextAuth.js v5](https://authjs.dev) | `^5.0.0-beta.32` | Autentikasi (Credentials + Google OAuth) |
| [bcryptjs](https://github.com/dcodeIO/bcrypt.js) | `^3.0` | Hashing password |
| [jsonwebtoken](https://github.com/auth0/node-jsonwebtoken) | `^9.0` | Token-based OTP reset password |
| [Nodemailer](https://nodemailer.com) | `^8.0` | Pengiriman email OTP |

### Peta & Geolokasi

| Teknologi | Versi | Keterangan |
|-----------|-------|------------|
| [Leaflet](https://leafletjs.com) | `^1.9` | Library peta interaktif |
| [React Leaflet](https://react-leaflet.js.org) | `^5.0` | Wrapper React untuk Leaflet |

### Validasi & Utilitas

| Teknologi | Versi | Keterangan |
|-----------|-------|------------|
| [Zod](https://zod.dev) | `^4.4` | Schema validation untuk form & API |
| [clsx](https://github.com/lukeed/clsx) | `^2.1` | Conditional class names |
| [class-variance-authority](https://cva.style) | `^0.7` | Variant-based component styling |

---

## 3. 📦 Cara Instalasi

### Prasyarat

Pastikan perangkat sudah terinstal:

- **Node.js** versi `18.x` atau lebih baru → [Download Node.js](https://nodejs.org)
- **npm** (sudah termasuk bersama Node.js)
- Akun **Neon Database** → [neon.tech](https://neon.tech) (untuk PostgreSQL)
- Akun **Google Cloud** (untuk Google OAuth) → [console.cloud.google.com](https://console.cloud.google.com)

### Langkah 1 — Clone Repository

```bash
git clone https://github.com/RIKO-FERNANDA-S/LAPOR.IN.git
cd LAPOR.IN
```

### Langkah 2 — Instal Dependensi

```bash
npm install
```

### Langkah 3 — Konfigurasi Environment Variables

Buat file `.env` di root project, lalu isi sesuai template berikut:

```env
# ─── DATABASE ───────────────────────────────────────────────
DATABASE_URL="postgresql://USER:PASSWORD@HOST/DATABASE?sslmode=require"

# ─── NEXTAUTH ────────────────────────────────────────────────
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="your-random-secret-string"

# ─── GOOGLE OAUTH ────────────────────────────────────────────
GOOGLE_CLIENT_ID="your-google-client-id"
GOOGLE_CLIENT_SECRET="your-google-client-secret"

# ─── EMAIL (NODEMAILER) ──────────────────────────────────────
EMAIL_USER="your-email@gmail.com"
EMAIL_PASS="your-app-password"

# ─── JWT (untuk OTP reset password) ─────────────────────────
JWT_SECRET="your-jwt-secret"
```

> **Tips:** Untuk `EMAIL_PASS` dengan Gmail, gunakan **App Password** bukan password akun biasa. Aktifkan 2FA dulu di akun Google, lalu buat App Password di [myaccount.google.com/apppasswords](https://myaccount.google.com/apppasswords).

### Langkah 4 — Setup Database

Jalankan migrasi Prisma untuk membuat semua tabel di database:

```bash
npx prisma generate
npx prisma db push
```

Opsional — lihat isi database melalui Prisma Studio:

```bash
npx prisma studio
```

---

## 4. 🚀 Cara Penggunaan

### Menjalankan Development Server

```bash
npm run dev
```

Buka browser dan akses: **[http://localhost:3000](http://localhost:3000)**

> Server development berjalan dengan flag `--max-old-space-size=4096` untuk mencegah out-of-memory pada project berskala besar.

### Perintah Lainnya

| Perintah | Fungsi |
|----------|--------|
| `npm run dev` | Menjalankan development server (hot-reload) |
| `npm run build` | Build production (generate Prisma client + Next.js build) |
| `npm run start` | Menjalankan production server (harus `build` dulu) |
| `npm run lint` | Menjalankan ESLint untuk cek kualitas kode |

### Alur Penggunaan Aplikasi

```
1. Buka http://localhost:3000
       │
       ▼
2. Daftar akun (/register)
       │  → isi Nama, Email, Password
       │  → terima kode OTP via email
       ▼
3. Verifikasi OTP (/otp)
       │  → masukkan 6 digit kode
       │  → akun aktif & otomatis login
       ▼
4. Dashboard (/dashboard)
       │
       ├── [Warga]  → lihat peta, buat laporan baru, pantau status
       └── [Admin]  → review laporan masuk, verifikasi, kelola data
```

### Struktur Direktori Penting

```
LAPOR.IN/
├── app/
│   ├── (pages)/          # Halaman publik (landing page)
│   ├── (withOutNav)/     # Halaman tanpa navbar (login, register, otp)
│   ├── (withNav)/        # Halaman dengan navbar (dashboard, ajuan)
│   ├── api/              # API Routes (auth, reports, dll)
│   └── layouts/          # Shared layouts & section components
├── prisma/
│   └── schema.prisma     # Skema database lengkap
├── public/               # Aset statis (gambar, logo)
└── noted/                # Dokumentasi & catatan proyek
```

---

## 👤 Author

**Riko Fernanda S**
GitHub: [@RIKO-FERNANDA-S](https://github.com/RIKO-FERNANDA-S)

---

## 📄 License

Proyek ini dilisensikan di bawah **ISC License**.
Lihat file [LICENSE](../LICENSE) untuk detail lengkap.