<div align="center">

# 🏙️ Bina
### *Seberapa Layak Kotamu Hari Ini?*

[![Live Demo](https://img.shields.io/badge/🚀_Live_Demo-Visit_Site-success?style=for-the-badge)](https://bina-steel.vercel.app/)
[![GitHub](https://img.shields.io/badge/GitHub-Repository-181717?style=for-the-badge&logo=github)](https://github.com/RIKO-FERNANDA-S/LAPOR.IN)
[![License](https://img.shields.io/badge/License-ISC-blue?style=for-the-badge)](LICENSE)
[![Next.js](https://img.shields.io/badge/Next.js-16.2-black?style=for-the-badge&logo=next.js)](https://nextjs.org)

**Submission for ITECHNO CUP 2026 — Web Development**

**By Riko Fernanda S**

</div>

---

## 📋 Daftar Isi

- [Tim Developer](#-tim-developer)
- [Tentang Proyek](#-tentang-proyek)
- [Fitur Unggulan](#-fitur-unggulan)
- [Demo & Screenshot](#-demo--screenshot)
- [Teknologi](#-teknologi)
- [Arsitektur Sistem](#-arsitektur-sistem)
- [Instalasi & Setup](#-instalasi--setup)
- [Cara Penggunaan](#-cara-penggunaan)
- [API Documentation](#-api-documentation)
- [Lisensi](#-lisensi)

---

## 👥 Tim Developer

| Nama | Peran | GitHub |
|------|-------|--------|
| **Riko Fernanda S** | Project Lead & Full Stack Developer | [@RIKO-FERNANDA-S](https://github.com/RIKO-FERNANDA-S) |
| **Galuh Shabani** | Documentation | - |
| **Nashwa Atika** | UX/UI Designer | - |

---

## 🎯 Tentang Proyek

### Latar Belakang

**Bina** lahir dari keprihatinan terhadap **ketimpangan pembangunan** dan lemahnya pengawasan terhadap infrastruktur dasar serta fasilitas publik di Indonesia. Selama ini, kinerja pemerintah di sektor infrastruktur tidak memiliki parameter yang transparan, terukur, dan berpihak pada masyarakat sipil.

Laporan kerusakan jalan, fasilitas publik yang terbengkalai, hingga layanan kesehatan yang tidak memadai sering kali tidak pernah sampai ke meja pengambil keputusan — atau jika sampai, tidak dapat ditelusuri kebenarannya karena tidak ada sistem verifikasi yang solid.

### Solusi yang Ditawarkan

Bina mengisi kekosongan tersebut dengan menjadikan **laporan nyata dari warga** sebagai sumber data utama penilaian kualitas infrastruktur daerah. Platform ini membangun sistem penilaian berbasis **Bina Score** yang agregat dari ribuan laporan terverifikasi, menghasilkan gambaran kondisi infrastruktur yang jujur, real-time, dan dapat dipertanggungjawabkan.

Melalui sistem login, verifikasi OTP, dan validasi komunitas, platform didesain agar lebih resisten terhadap laporan palsu dan manipulasi data.

### Tujuan Proyek

- 🎯 **Tujuan Utama** — Menjadi alat ukur kondisi infrastruktur dan layanan publik yang dikendalikan sepenuhnya oleh data laporan masyarakat
- 📊 **Target Pengguna** — Warga sipil yang ingin bersuara, pemerintah daerah yang ingin mengevaluasi diri, dan investor yang butuh data infrastruktur
- 💡 **Value Proposition** — Tidak seperti platform laporan biasa, Bina menghasilkan **skor terukur per wilayah** yang dapat dibandingkan antar daerah dan antar waktu, berbasis data terverifikasi komunitas

### Dampak yang Diharapkan

| Stakeholder | Dampak |
|-------------|--------|
| 🏛️ **Pemerintah Daerah** | Mendapat umpan balik nyata dari warga; terpacu meningkatkan kinerja infrastruktur |
| 👥 **Masyarakat** | Memiliki wadah resmi untuk menyuarakan kondisi lingkungan secara terverifikasi |
| 💼 **Investor** | Mendapat data infrastruktur berbasis lapangan yang sahih untuk keputusan investasi |
| 📈 **Ekonomi Regional** | Peningkatan kualitas infrastruktur mendorong pertumbuhan ekonomi daerah |

---

## ✨ Fitur Unggulan

### Fitur Utama

| Fitur | Deskripsi | Keunggulan |
|-------|-----------|------------|
| 🗺️ **Peta Interaktif** | Visualisasi laporan berbasis peta; klik lokasi di peta untuk melaporkan langsung | Laporan terikat koordinat GPS nyata, tidak bisa dipalsukan lokasinya |
| ⭐ **Bina Score** | Rating 1–5 bintang per aspek infrastruktur, diakumulasi menjadi skor per wilayah | Skor komparatif antar daerah yang terukur dan dapat dilacak tren-nya |
| 🔐 **Auth Multi-Layer** | Login email/password + Google OAuth + verifikasi OTP via email | Resistensi tinggi terhadap akun palsu dan laporan fiktif |
| 👥 **Role-Based Access** | Dua peran: **Warga** (melapor & upvote) dan **Admin** (review & verifikasi) | Pemisahan akses yang aman dengan dashboard terpisah per peran |

### Fitur Tambahan

- **📸 Upload Bukti Foto** — Setiap laporan wajib foto; mendukung multiple upload sebagai bukti kondisi infrastruktur
- **🗂️ Kategori Hierarkis** — Infrastruktur diklasifikasikan per kategori → sub-kategori untuk analisis yang lebih presisi
- **📊 Dashboard Analitik** — Visualisasi tren laporan, distribusi skor, dan performa wilayah secara periodik
- **🔔 Sistem Notifikasi** — Pemberitahuan real-time saat status laporan berubah (Menunggu → Diproses → Selesai)
- **🌍 GPS Auto-detect** — Deteksi lokasi otomatis saat membuat laporan baru
- **🔄 Verifikasi Komunitas** — Warga lain dapat upvote/downvote laporan untuk meningkatkan kredibilitas data

---

## 📸 Demo & Screenshot

### Live Demo

🔗 **[Kunjungi Website Bina](https://bina-steel.vercel.app/)**

### Screenshot Aplikasi

<div align="center">

**[ 🖼️ Screenshot Landing Page ]**


<img src="./public/image/landing-page.png" alt="Homepage Bina" width="800"/> 
<p><em>Landing Page — Tampilan utama platform Bina</em></p>

---

**[ 🖼️ Screenshot Peta Interaktif ]**


<img src="./public/image/peta.png" alt="Peta Interaktif" width="800"/> 
<p><em>Peta Interaktif — Visualisasi laporan infrastruktur per wilayah</em></p>

---

**[ 🖼️ Screenshot Dashboard Warga ]**


<img src="./public/image/warga.png alt="Dashboard Warga" width="800"/>
 <p><em>Dashboard Warga — Kelola laporan dan pantau status</em></p>

---

**[ 🖼️ Screenshot Dashboard Admin ]**


<img src="./public/image/warga.png" alt="Dashboard Admin" width="800"/>
<p><em>Dashboard Admin — Review dan verifikasi laporan masuk</em></p>

---

**[ 🖼️ Screenshot Form Laporan ]**


<img src="./public/image/form.png" alt="Form Laporan" width="800"/>
<p><em>Form Pelaporan — Upload foto, pilih lokasi, beri rating</em></p>

</div>



## 🛠️ Teknologi

### Tech Stack

#### Frontend
```
Framework    : Next.js 16.2.11 (App Router + Server Components)
Language     : TypeScript ^5
UI Library   : Tailwind CSS v4 + shadcn/ui
Icons        : Lucide React + Phosphor Icons
Animation    : Motion ^13.1
Maps         : Leaflet + React Leaflet
Validation   : Zod ^4.4
```

#### Backend
```
Runtime      : Node.js (via Next.js API Routes)
Database     : PostgreSQL (Neon Serverless) + MongoDB (Mongoose)
ORM          : Prisma ^7.9
Auth         : NextAuth.js v5 (Credentials + Google OAuth)
Email        : Nodemailer (OTP via Gmail)
Hashing      : bcryptjs
Token        : jsonwebtoken (JWT untuk reset password)
```

#### DevOps & Tools
```
Deployment   : Vercel
Repository   : GitHub
Version      : 0.1.0
```

### Alasan Pemilihan Teknologi

| Teknologi | Alasan Pemilihan |
|-----------|-----------------|
| **Next.js 16** | Full-stack dalam satu codebase; App Router memungkinkan Server Components untuk performa optimal dan SEO yang baik |
| **Prisma + Neon** | Neon menyediakan PostgreSQL serverless yang scalable; Prisma memberikan type-safety penuh dari schema hingga query |
| **NextAuth v5** | Integrasi mulus dengan Next.js; mendukung multiple provider (Credentials + Google OAuth) tanpa setup kompleks |
| **Leaflet + React Leaflet** | Open-source, ringan, dan sangat fleksibel untuk visualisasi geospasial berbasis laporan warga |
| **Zod** | Validasi schema yang konsisten antara frontend form dan backend API, satu sumber kebenaran untuk struktur data |

### Dependencies Utama

```json
{
  "dependencies": {
    "next": "16.2.11",
    "react": "19.2.4",
    "next-auth": "^5.0.0-beta.32",
    "@prisma/client": "^7.9.1",
    "leaflet": "^1.9.4",
    "react-leaflet": "^5.0.0",
    "nodemailer": "^8.0.11",
    "zod": "^4.4.3",
    "bcryptjs": "^3.0.3",
    "motion": "^13.1.1"
  }
}
```

---

## 🏗️ Arsitektur Sistem

### System Architecture

```
┌─────────────────────────────────────────────────────┐
│                    CLIENT BROWSER                    │
│         Next.js App Router (React 19 RSC)           │
└───────────────────────┬─────────────────────────────┘
                        │ HTTP / Server Actions
┌───────────────────────▼─────────────────────────────┐
│              NEXT.JS SERVER (Vercel Edge)            │
│  ┌─────────────┐  ┌──────────────┐  ┌────────────┐  │
│  │  API Routes │  │  NextAuth v5 │  │  Middleware │  │
│  │  /api/auth  │  │  (Sessions)  │  │  (RBAC)    │  │
│  │  /api/report│  └──────────────┘  └────────────┘  │
│  └──────┬──────┘                                     │
└─────────┼───────────────────────────────────────────┘
          │ Prisma ORM
┌─────────▼──────────────┐     ┌──────────────────────┐
│  Neon PostgreSQL (Main) │     │  MongoDB (Secondary) │
│  - Users & Auth         │     │  - Unstructured data │
│  - Reports & Ratings    │     │  - Logs & analytics  │
│  - Regions & Scores     │     └──────────────────────┘
│  - Notifications        │
└────────────────────────┘
          │
┌─────────▼──────────────┐
│   External Services     │
│  - Nodemailer (Gmail)   │  ← OTP & Notifikasi Email
│  - Google OAuth         │  ← Login Sosial
│  - Leaflet / OSM Tiles  │  ← Peta Interaktif
└────────────────────────┘
```

### Database Schema (Ringkasan)

```
users          → data akun, role, lokasi GPS, status verifikasi
roles          → master role (1=Admin, 2=Warga)
reports        → laporan infrastruktur + rating + foto + koordinat
infra_categories → kategori infrastruktur (jalan, taman, dll)
sub_categories → sub-kategori per kategori
regions        → data wilayah (provinsi, kota, kecamatan, kelurahan)
region_scores  → skor Bina per wilayah per kategori per periode
report_verifications → upvote/downvote laporan oleh pengguna lain
notifications  → sistem notifikasi per user
```

> 📄 Lihat skema lengkap di [`prisma/schema.prisma`](./prisma/schema.prisma)

### Folder Structure

```
LAPOR.IN/
├── app/
│   ├── (pages)/           # Halaman publik (landing page)
│   ├── (withOutNav)/      # Auth pages tanpa navbar
│   │   ├── login/         #   → Halaman login
│   │   ├── register/      #   → Halaman registrasi
│   │   ├── otp/           #   → Verifikasi OTP
│   │   └── resetpassword/ #   → Reset password
│   ├── (withNav)/         # Halaman dengan navbar
│   │   ├── dashboard/     #   → Dashboard (User & Admin)
│   │   └── ajuan/         #   → Form pelaporan infrastruktur
│   ├── api/               # API Routes
│   │   ├── auth/          #   → register, login, OTP, verify
│   │   └── reports/       #   → CRUD laporan
│   └── layouts/           # Shared layouts & section components
│       ├── (section)/     #   → Section landing page
│       └── (components)/  #   → Komponen reusable
├── prisma/
│   └── schema.prisma      # Skema database lengkap
├── public/                # Aset statis (gambar, logo, ikon)
├── noted/                 # Dokumentasi & catatan proyek
│   └── README.md          #   → PRD lengkap
└── auth.ts                # Konfigurasi NextAuth
```

---

## ⚙️ Instalasi & Setup

### Prerequisites

Pastikan perangkat sudah terinstal:

- **Node.js** `v18.x` atau lebih baru → [Download](https://nodejs.org)
- **npm** (sudah bundled dengan Node.js)
- Akun **Neon Database** → [neon.tech](https://neon.tech) _(PostgreSQL serverless)_
- Akun **Google Cloud Console** → [console.cloud.google.com](https://console.cloud.google.com) _(untuk OAuth)_
- **Git**

### Langkah Instalasi

#### 1️⃣ Clone Repository

```bash
git clone https://github.com/RIKO-FERNANDA-S/LAPOR.IN.git
cd LAPOR.IN
```

#### 2️⃣ Install Dependencies

```bash
npm install
```

#### 3️⃣ Setup Environment Variables

Buat file `.env` di root project:

```env
# ─── DATABASE ───────────────────────────────────────────────────
DATABASE_URL="postgresql://USER:PASSWORD@HOST/DATABASE?sslmode=require"

# ─── NEXTAUTH ───────────────────────────────────────────────────
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="your-random-secret-minimum-32-chars"

# ─── GOOGLE OAUTH ───────────────────────────────────────────────
GOOGLE_CLIENT_ID="your-google-client-id.apps.googleusercontent.com"
GOOGLE_CLIENT_SECRET="your-google-client-secret"

# ─── EMAIL (NODEMAILER via Gmail) ───────────────────────────────
EMAIL_USER="your-email@gmail.com"
EMAIL_PASS="your-16-char-app-password"

# ─── JWT ────────────────────────────────────────────────────────
JWT_SECRET="your-jwt-secret-for-otp-reset"
```

> **💡 Tips Gmail App Password:**
> Aktifkan 2FA di akun Google → buka [myaccount.google.com/apppasswords](https://myaccount.google.com/apppasswords) → buat App Password baru → gunakan sebagai `EMAIL_PASS`. **Jangan gunakan password akun Google biasa.**

#### 4️⃣ Setup Database

```bash
# Generate Prisma Client
npx prisma generate

# Push schema ke database (development)
npx prisma db push

# Opsional: buka Prisma Studio untuk inspect data
npx prisma studio
```

#### 5️⃣ Jalankan Development Server

```bash
npm run dev
```

Buka browser → **[http://localhost:3000](http://localhost:3000)** ✅

---

## 🚀 Cara Penggunaan

### Perintah yang Tersedia

```bash
# Development server (hot-reload)
npm run dev

# Production build
npm run build

# Jalankan production server (butuh build dulu)
npm run start

# Cek kualitas kode
npm run lint
```

### User Guide

#### Untuk Warga

```
1. Buka http://localhost:3000
       │
       ▼
2. Daftar akun (/register)
       │  → isi Nama, Email, Password
       │  → klik "Lanjutkan Verifikasi Email"
       ▼
3. Verifikasi OTP (/otp)
       │  → cek email, masukkan 6 digit kode
       │  → akun aktif & otomatis login
       ▼
4. Dashboard Warga (/dashboard/user)
       │
       ├── 🗺️  Lihat peta kondisi infrastruktur
       ├── ➕  Buat laporan baru (/ajuan)
       │        → pilih kategori & sub-kategori
       │        → klik lokasi di peta / aktifkan GPS
       │        → beri rating 1-5 bintang
       │        → upload foto bukti
       │        → tulis deskripsi
       └── 📋  Pantau status laporan yang sudah dikirim
```

#### Untuk Admin

```
Login sebagai Admin → Dashboard Admin (/dashboard/admin)
       │
       ├── 📥  Review laporan masuk
       ├── ✅  Verifikasi / tolak laporan
       ├── 📊  Lihat analitik & statistik wilayah
       └── 👥  Kelola data pengguna
```

---

## 📚 API Documentation

### Base URL

```
Development : http://localhost:3000/api
Production  : https://lapor-in.vercel.app/api
```

### Endpoints

#### Authentication

```http
POST  /api/auth/register       → Daftar akun baru (kirim OTP)
POST  /api/auth/verify-otp     → Verifikasi kode OTP
POST  /api/auth/send-otp       → Kirim ulang OTP
POST  /api/auth/forgot-password → Request reset password
POST  /api/auth/reset-password  → Set password baru dengan token
```

#### Reports

```http
GET    /api/reports            → Ambil semua laporan (dengan filter)
GET    /api/reports/:id        → Ambil laporan berdasarkan ID
POST   /api/reports            → Buat laporan baru (butuh auth)
PUT    /api/reports/:id        → Update status laporan (Admin only)
DELETE /api/reports/:id        → Soft delete laporan
```

### Contoh Request

```javascript
// Membuat laporan baru
const response = await fetch('/api/reports', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    sub_category_id: 3,
    region_id: 1,
    description: "Jalan berlubang parah sepanjang 10 meter",
    latitude: -6.200000,
    longitude: 106.816666,
    rating: 2,
    severity_level: "TINGGI",
    photo_urls: ["https://..."],
    report_date: "2026-09-04"
  })
});
```

---

## 👤 Author

<div align="center">

**Riko Fernanda S**

[![GitHub](https://img.shields.io/badge/GitHub-RIKO--FERNANDA--S-181717?style=for-the-badge&logo=github)](https://github.com/RIKO-FERNANDA-S)

</div>

---

## 📄 Lisensi

Proyek ini dilisensikan di bawah **ISC License**.

---

<div align="center">

**Made with ❤️ by Beli 2 Gratis 1 Team for ITECHNO CUP 2026**

*Bina — Karena setiap warga berhak tahu kondisi kotanya.*

</div>