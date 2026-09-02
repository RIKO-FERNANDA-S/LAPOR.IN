# PROMPT — FITUR PENILAIAN INFRASTRUKTUR & MOBILITAS

## 1. TUJUAN FITUR

Tambahkan fitur **Penilaian Infrastruktur dan Pelayanan Publik berbasis lokasi** ke dalam aplikasi.

Fitur ini memungkinkan pengguna yang sudah login untuk:

1. Memilih lokasi.
2. Menemukan atau memilih fasilitas/infrastruktur di lokasi tersebut.
3. Memilih bagian/aspek yang ingin dinilai.
4. Memberikan rating 1–5 bintang.
5. Menuliskan deskripsi kondisi.
6. Mengunggah foto/video sebagai bukti.
7. Mengirim penilaian.
8. Menghasilkan skor fasilitas dan skor wilayah berdasarkan akumulasi penilaian masyarakat.
9. Mengklasifikasikan kualitas suatu wilayah berdasarkan skor akhir menggunakan sistem **Adibina, Swabina, Purwabina, Rentanbina, dan Nirbina**.

Fitur harus dirancang agar data penilaian dapat divisualisasikan pada **map**, digunakan untuk analisis wilayah, serta dapat dikembangkan menjadi sistem monitoring kualitas infrastruktur publik.

---

# 2. KATEGORI INFRASTRUKTUR DAN PELAYANAN

## A. INFRASTRUKTUR JALAN DAN MOBILITAS

### 1. Jalan

Aspek yang dapat dinilai:

- Trotoar
- Rambu lalu lintas
- Lampu merah / traffic light
- Lubang jalan
- Kebersihan jalan

### 2. JPO — Jembatan Penyeberangan Orang

Aspek:

- Pagar
- Rangka/struktur
- Atap
  - Kondisi atap
  - Kebocoran
- Permukaan lantai
- Kebersihan
- Lift

### 3. Halte

Aspek:

- Kebersihan
- Kondisi bangunan
  - Tiang
  - Tembok
  - Tempat duduk
  - Papan navigasi/informasi
- Aksesibilitas
  - Kemudahan akses
  - Kemudahan bagi penyandang disabilitas

---

# 3. PUBLIC SPACE

## Taman

Aspek:

### Toilet
- Ketersediaan
- Kebersihan
- Kondisi

### Tempat Sampah
- Tersedia / tidak tersedia
- Penuh / tidak penuh
- Bersih / tidak bersih

### Kebersihan
- Kebersihan area secara umum

### Pungli
- Ada / tidak ada indikasi pungutan liar

### Kondisi Fisik
- Kondisi lantai
- Kondisi tembok
- Kondisi pepohonan

### Pedestrian
- Ketersediaan jalur pedestrian
- Kondisi jalur pedestrian
- Kemudahan digunakan untuk berjalan kaki

---

# 4. LAYANAN BIROKRASI

## Mal Pelayanan Publik / MPP

Aspek:

### Kebersihan
- Kebersihan area

### Kondisi Fisik
- Lantai
- Tembok
- Atap
- Lift
- Tangga

### Kualitas Pelayanan
- Lama waktu pelayanan
- Ketersediaan pelayanan
- Kemudahan memperoleh pelayanan

---

# 5. PENDIDIKAN

## Sekolah Negeri

Target:

- SD Negeri
- SMP Negeri
- SMA Negeri

Aspek:

### Biaya / Pungli
- Ada pembayaran tidak resmi
- Tidak ada pembayaran tidak resmi

### Ketersediaan Gedung/Fasilitas
- Perpustakaan
- Lapangan
- Ruang kelas
- Area ekstrakurikuler

### Kondisi Gedung
- Tembok
- Lantai
- Atap

### Kondisi Peralatan Pendukung
- Papan tulis
- Meja
- Kursi
- Proyektor

### Kualitas Pendidikan
- Kehadiran guru
- Performa pengajaran
- Kualitas proses pembelajaran

## Perguruan Tinggi Negeri

Penilaian minimal mencakup:

- Ketersediaan fasilitas
- Kondisi fasilitas
- Ketersediaan layanan pendidikan

Struktur penilaian perguruan tinggi harus dibuat extensible sehingga aspek tambahan dapat ditambahkan di kemudian hari.

---

# 6. AIR BERSIH DAN SANITASI

## Ketersediaan Air Bersih

Penilaian harus mempertimbangkan kondisi sumber air dan akses terhadap jaringan air bersih.

### Kondisi 1 — Air tanah kotor

Jika air tanah tidak layak digunakan:

- Akses terhadap PDAM menjadi kebutuhan penting.
- Semakin luas area yang memiliki akses air bersih, semakin baik.

### Kondisi 2 — Air tanah bersih

Jika air tanah masih layak:

- Akses PDAM tidak menjadi indikator wajib.

### Indikator Wilayah

Gunakan konsep:

**Persentase cakupan akses air bersih =**

`Luas area yang mendapatkan akses air bersih / Luas total area × 100`

---

# 7. LISTRIK

## Ketersediaan Listrik

Indikator:

### Area Cakupan
- Persentase wilayah yang mendapatkan akses listrik.

### Intensitas Pemadaman
- Frekuensi pemadaman.
- Semakin jarang terjadi pemadaman, semakin baik.

Sistem harus dapat membedakan:

- Tidak tersedia listrik.
- Tersedia tetapi sering padam.
- Tersedia dengan kondisi relatif stabil.

---

# 8. TELEKOMUNIKASI

## Ketersediaan Jaringan Provider

Indikator:

### Cakupan Provider
- Area yang mendapatkan jaringan.
- Area blank spot.

### Bandwidth Provider
- Kualitas bandwidth.
- Kecepatan koneksi.

Sistem sebaiknya memungkinkan penilaian berdasarkan provider tertentu.

Contoh:

- Telkomsel
- Indosat
- XL
- Tri
- Provider lainnya

Struktur provider harus bersifat dinamis sehingga provider baru dapat ditambahkan tanpa mengubah struktur utama aplikasi.

---

# 9. KESEHATAN

## Fasilitas Kesehatan

Kategori:

- Puskesmas
- Rumah sakit

---

## Puskesmas

### Ketersediaan Layanan

Nilai semakin tinggi apabila semakin banyak layanan yang tersedia.

Contoh:

- Poli umum
- Poli gigi
- KIA
- Laboratorium
- Farmasi
- IGD
- Layanan lainnya

### Kondisi Fasilitas

- Kondisi bangunan
- Ketersediaan alat medis
- Kondisi alat medis

---

## Rumah Sakit

### Ketersediaan Layanan

Semakin banyak layanan yang tersedia, semakin tinggi nilai fasilitas.

### Kondisi Fasilitas

- Kondisi bangunan
- Ketersediaan alat medis
- Kondisi alat medis

Struktur layanan kesehatan harus dibuat extensible agar jenis layanan baru dapat ditambahkan.

---

# 10. SISTEM PENILAIAN

Gunakan dua level agregasi:

## A. Rating Tempat

Rating suatu tempat dihitung menggunakan:

**Rating Tempat = Jumlah Seluruh Rating / Jumlah Penilai**

Keterangan:

- **Jumlah Seluruh Rating** = akumulasi rating yang diberikan terhadap tempat.
- **Jumlah Penilai** = jumlah pengguna unik yang memberikan penilaian terhadap tempat tersebut.

Contoh:

Sebuah halte mendapatkan:

- User A → 4
- User B → 5
- User C → 3

Maka:

`Rating = (4 + 5 + 3) / 3 = 4`

Rating akhir berada pada skala:

**1–5**

---

# 11. KONVERSI RATING KE SKOR

Sistem harus menyediakan mekanisme normalisasi rating menjadi skor 0–100.

Contoh:

`Skor = (Rating / 5) × 100`

Sehingga:

| Rating | Skor |
|---|---:|
| 1 | 20 |
| 2 | 40 |
| 3 | 60 |
| 4 | 80 |
| 5 | 100 |

Namun, apabila file `.ipynb` dan Excel yang diberikan memiliki formula penilaian yang lebih kompleks, **gunakan formula dari dokumen tersebut sebagai sumber utama**, bukan asumsi formula sederhana di atas.

---

# 12. RATING DAERAH

Rating suatu daerah dihitung dari seluruh tempat yang terdapat pada daerah tersebut.

Formula:

**Rating Daerah = Jumlah Rating Seluruh Tempat / Jumlah Tempat**

Keterangan:

- **Jumlah Rating** = akumulasi skor/rating dari seluruh tempat yang ada di daerah tersebut.
- **Jumlah Tempat** = jumlah tempat/fasilitas yang masuk dalam wilayah tersebut.

Contoh:

Sebuah kecamatan memiliki:

- Jalan A → 80
- Halte B → 70
- Taman C → 90

Maka:

`Rating Daerah = (80 + 70 + 90) / 3 = 80`

---

# 13. KLASIFIKASI WILAYAH — BINA SCORE

Gunakan skor akhir 0–100 untuk mengklasifikasikan kondisi suatu wilayah.

## ⭐ ADIBINA

**Skor > 85**

Makna:

"Adi" berarti unggul/sempurna.

Karakteristik:

- Infrastruktur berstandar metropolitan.
- Infrastruktur terintegrasi.
- Digitalisasi tinggi.
- Jalan dalam kondisi sangat baik.
- Fasilitas publik lengkap.
- Mobilitas masyarakat sangat baik.

Contoh:

- Kawasan Manyar
- Taman Bungkul

---

## ⭐ SWABINA

**Skor 70–84**

Makna:

"Swa" berarti mandiri.

Karakteristik:

- Infrastruktur sudah sangat layak.
- Infrastruktur mampu menopang aktivitas dan ekonomi masyarakat.
- Gangguan relatif rendah.
- Fasilitas publik tersedia dengan baik.

---

## ⭐ PURWABINA

**Skor 55–69**

Makna:

"Purwa" berarti awal/dasar.

Karakteristik:

- Infrastruktur dasar sudah tersedia.
- Jalan dan fasilitas dasar telah dibangun.
- Masih terdapat banyak ruang untuk peningkatan.

Contoh:

- Jalan aspal standar.
- Akses listrik tersedia.

---

## ⭐ RENTANBINA

**Skor 40–54**

Makna:

Infrastruktur tersedia tetapi kondisinya rentan.

Karakteristik:

- Infrastruktur sering mengalami kerusakan.
- Jalan berlubang.
- Fasilitas publik kurang terawat.
- Pemadaman listrik relatif sering.
- Akses pelayanan masih memiliki banyak kendala.

---

## ⭐ NIRBINA

**Skor < 40**

Makna:

"Nir" berarti tanpa/tidak ada.

Karakteristik:

- Kondisi infrastruktur kritis.
- Infrastruktur sangat terbatas atau tidak tersedia.
- Pemerintah dianggap belum menghadirkan layanan dasar secara memadai.

Contoh:

- Jalan tanah/makadam/lumpur.
- Tidak terdapat akses jaringan telekomunikasi.
- Fasilitas publik sangat minim.

---

# 14. INPUT PENILAIAN USER

User harus sudah:

**Login → memilih lokasi → memilih fasilitas → melakukan penilaian.**

Input minimal:

### Identitas Lokasi

- Auto-detect lokasi menggunakan GPS/device location.
- Manual location sebagai alternatif.
- Alamat.
- Nama tempat.

Jika memungkinkan, nama tempat dapat diperoleh dari data lokasi/geocoding.

---

# 15. PEMILIHAN FASILITAS

Setelah menentukan lokasi:

1. Tampilkan kategori utama.
2. User memilih kategori.
3. Tampilkan daftar fasilitas yang tersedia di sekitar lokasi.
4. User memilih fasilitas.
5. Tampilkan sub-part/aspek yang dapat dinilai.

Contoh:

`Infrastruktur Jalan dan Mobilitas`

→ `Jalan`

→ `Trotoar`

→ Rating 1–5

→ Deskripsi

→ Foto/video

---

# 16. PENILAIAN SUB-PART

User dapat memilih bagian tertentu dari sebuah fasilitas.

Contoh:

**JPO**

- Pagar
- Rangka
- Atap
- Permukaan lantai
- Kebersihan
- Lift

User dapat memberikan penilaian terhadap aspek tersebut.

Setiap penilaian harus menyimpan:

- User
- Lokasi
- Fasilitas
- Kategori
- Sub-part
- Rating
- Deskripsi
- Foto/video
- Timestamp
- Koordinat GPS

---

# 17. BUKTI FOTO/VIDEO

Lampiran foto/video **WAJIB**.

User tidak dapat melakukan submit apabila tidak memberikan bukti.

Minimal:

- 1 foto atau video.

Metadata yang sebaiknya disimpan:

- File
- Tipe file
- Ukuran
- Waktu upload
- Lokasi pengambilan jika tersedia
- User yang mengunggah

Bukti digunakan sebagai pendukung validitas laporan.

---

# 18. DESKRIPSI KONDISI

User wajib/diutamakan memberikan deskripsi kondisi.

Contoh:

> "Trotoar di sisi jalan mengalami kerusakan dan beberapa bagian permukaannya berlubang."

Deskripsi harus berkaitan dengan aspek yang dinilai.

---

# 19. TEMPAT/FASILITAS YANG BELUM TERDAFTAR

Jika user menemukan fasilitas yang belum tersedia dalam database:

User dapat memilih:

**"Tempat/Fasilitas belum tersedia"**

Kemudian laporan tidak langsung dianggap sebagai fasilitas resmi.

Laporan tersebut menjadi:

**Pelaporan Kehadiran Tempat Baru**

Input tetap menggunakan mekanisme yang sama:

- Lokasi
- Nama tempat
- Kategori
- Subkategori jika ada
- Rating
- Deskripsi
- Foto/video
- Koordinat

---

# 20. VALIDASI TEMPAT BARU

Tempat baru belum langsung masuk ke daftar fasilitas resmi.

Sistem mengumpulkan laporan dari masyarakat.

Sebuah tempat baru akan menjadi **entry/fasilitas resmi** apabila telah mendapatkan:

**minimal 30 laporan pengguna berbeda yang menyatakan tempat tersebut benar-benar ada.**

Contoh:

Hari pertama:

`1 laporan → belum menjadi entry resmi`

Setelah:

`30 pengguna berbeda → tempat tervalidasi`

Setelah tervalidasi:

- Tempat masuk database fasilitas.
- Muncul pada map.
- Dapat dinilai seperti fasilitas lainnya.
- Memiliki rating agregat sendiri.

Sistem harus mencegah satu user membuat 30 laporan untuk tempat yang sama.

Gunakan mekanisme:

`1 user = 1 validasi keberadaan untuk 1 tempat`

---

# 21. ALUR UTAMA USER

Implementasikan flow:

**Buka Aplikasi**

↓

**Login**

↓

**Pilih Lokasi**

↓

**Deteksi lokasi otomatis / pilih manual**

↓

**Tampilkan fasilitas di sekitar lokasi**

↓

**Pilih Kategori**

↓

**Pilih Fasilitas**

↓

**Pilih Sub-Part**

↓

**Berikan Rating 1–5 ⭐**

↓

**Tulis Deskripsi**

↓

**Upload Foto/Video**

↓

**Validasi Form**

↓

**Submit**

↓

**Simpan Penilaian**

↓

**Update Rating Fasilitas**

↓

**Update Score Wilayah**

↓

**Update Klasifikasi Bina**

---

# 22. MAP INTEGRATION

Fitur harus dirancang agar setiap fasilitas memiliki koordinat:

```text
latitude
longitude
```

Fasilitas dapat ditampilkan pada map sebagai marker.

Marker dapat menampilkan:

- Nama fasilitas
- Kategori
- Rating
- Jumlah penilai
- Bina Score jika relevan
- Status fasilitas
- Jumlah laporan
- Kondisi terakhir

User dapat memilih marker untuk melihat detail.

---

# 23. DETAIL FASILITAS

Halaman detail fasilitas minimal menampilkan:

### Informasi

- Nama
- Kategori
- Lokasi
- Alamat
- Koordinat

### Rating

- Rating rata-rata
- Jumlah penilai
- Score 0–100
- Klasifikasi Bina

### Aspek Penilaian

Contoh:

```text
Trotoar       ⭐⭐⭐⭐
Rambu         ⭐⭐⭐
Lampu Merah   ⭐⭐⭐⭐⭐
Kebersihan    ⭐⭐
Lubang Jalan  ⭐⭐
```

### Riwayat Laporan

Tampilkan:

- Rating
- Deskripsi
- Foto/video
- Waktu laporan
- Status laporan

---

# 24. DATA MODEL YANG DISARANKAN

Gunakan struktur data yang fleksibel.

Entitas utama:

```text
User
Location
Region
Category
Facility
FacilityPart
Rating
RatingEvidence
NewPlaceReport
Provider
HealthService
Validation
```

Relasi konseptual:

```text
User
 └── Rating
      ├── Facility
      ├── FacilityPart
      ├── Location
      └── Evidence

Category
 └── Facility
      └── FacilityPart

Region
 └── Facility
      └── Rating
```

Jangan hard-code kategori dan sub-part langsung di frontend.

Kategori, fasilitas, dan aspek penilaian harus berasal dari database/API agar administrator dapat menambahkan kategori baru tanpa mengubah source code frontend.

---

# 25. VALIDASI DAN ANTI-FRAUD

Sistem harus mempertimbangkan validitas laporan.

Minimal:

- User harus login.
- Satu user tidak boleh memberikan rating berulang pada aspek yang sama secara bebas.
- Foto/video wajib.
- Koordinat harus tersedia atau lokasi harus dipilih manual.
- Laporan tempat baru harus berasal dari user berbeda.
- Satu user hanya dihitung satu kali dalam validasi keberadaan tempat baru.
- Simpan timestamp setiap laporan.

Pertimbangkan status:

```text
PENDING
VERIFIED
REJECTED
```

untuk laporan yang membutuhkan moderasi.

---

# 26. ADMIN / MODERATION

Sediakan kemungkinan bagi admin untuk:

- Melihat laporan.
- Memverifikasi laporan.
- Menolak laporan.
- Memverifikasi tempat baru.
- Melihat bukti foto/video.
- Mengelola kategori.
- Mengelola sub-part.
- Mengelola fasilitas.
- Mengoreksi data fasilitas.
- Melihat statistik wilayah.

---

# 27. ANALYTICS WILAYAH

Sistem harus dapat menghitung skor pada beberapa level wilayah.

Contoh:

```text
Tempat
   ↓
Kelurahan
   ↓
Kecamatan
   ↓
Kota
```

Setiap wilayah dapat memiliki:

- Total fasilitas.
- Total laporan.
- Rating rata-rata.
- Score 0–100.
- Klasifikasi Bina.

Contoh tampilan:

```text
Kecamatan Gunung Anyar

Bina Score : 78
Kategori   : SWABINA ⭐

Infrastruktur Jalan : 82
Public Space        : 75
Pendidikan          : 80
Kesehatan           : 77
Listrik             : 79
Telekomunikasi      : 76
Air Bersih          : 81
```

---

# 28. SUMBER FORMULA PENILAIAN

Terdapat referensi perhitungan penilaian dalam:

1. File Jupyter Notebook `.ipynb`
2. File Excel

Gunakan kedua file tersebut sebagai **referensi utama untuk implementasi formula scoring**.

Jangan mengubah formula scoring berdasarkan asumsi apabila formula resmi tersedia di kedua dokumen tersebut.

Referensi:

- Jupyter Notebook:
  https://drive.google.com/file/d/1pCS8X27v_ULck8IvqN9TYujIGHT6ML7T/view?usp=share_link

- Excel:
  https://docs.google.com/spreadsheets/d/1ya_bsPutthsGNQO7CbNNUbsM9caFf1kk/edit?usp=share_link&ouid=111928532134461055908&rtpof=true&sd=true

Jika formula dari `.ipynb` dan Excel berbeda, identifikasi perbedaannya terlebih dahulu dan jangan memilih salah satunya secara diam-diam.

---

# 29. REQUIREMENT TEKNIS

Saat mengimplementasikan fitur:

### Frontend

Buat UI yang:

- Mobile friendly.
- Desktop friendly.
- Mudah digunakan.
- Berbasis lokasi.
- Memiliki rating bintang 1–5.
- Mendukung upload foto/video.
- Terintegrasi dengan map.

### Backend

Backend harus menangani:

- Authentication.
- User.
- Facility.
- Category.
- FacilityPart.
- Rating.
- Evidence.
- NewPlaceReport.
- Validation.
- Region aggregation.
- Scoring.
- Bina classification.

### Database

Hindari struktur database yang terlalu hard-coded.

Gunakan struktur relasional yang memungkinkan:

- Penambahan kategori.
- Penambahan fasilitas.
- Penambahan aspek.
- Penambahan provider.
- Penambahan layanan kesehatan.
- Penambahan jenis wilayah.

---

# 30. OUTPUT YANG DIHARAPKAN DARI IMPLEMENTASI

Ketika mengembangkan fitur ini, hasil akhirnya harus mencakup:

### User

- Login.
- Pilih lokasi.
- Cari fasilitas.
- Rating.
- Review.
- Upload bukti.
- Submit laporan.

### Facility

- Detail fasilitas.
- Rating agregat.
- Score.
- Bina classification.
- Riwayat laporan.

### Map

- Marker fasilitas.
- Detail marker.
- Filter kategori.
- Filter berdasarkan score.
- Visualisasi kondisi wilayah.

### Region

- Score wilayah.
- Bina classification.
- Statistik fasilitas.
- Statistik kategori.
- Ranking wilayah.

### Admin

- Moderasi laporan.
- Validasi tempat baru.
- CRUD kategori.
- CRUD fasilitas.
- CRUD sub-part.
- Monitoring laporan.

---

# 31. PRINSIP IMPLEMENTASI

Prioritaskan:

1. **Data-driven architecture**
2. **Extensible category system**
3. **Location-based reporting**
4. **Evidence-based rating**
5. **Anti-duplicate reporting**
6. **Transparent scoring**
7. **Regional aggregation**
8. **Map visualization**
9. **Moderation**
10. **Mobile-first user experience**

Jangan membuat kategori, sub-part, atau scoring logic yang sulit dikembangkan di kemudian hari.

Struktur sistem harus memungkinkan penambahan kategori baru tanpa melakukan perubahan besar pada frontend maupun database.

---

# 32. USER EXPERIENCE SINGKAT

Flow utama harus sesederhana:

**Login**

→ **Pilih lokasi**

→ **Pilih fasilitas**

→ **Pilih aspek**

→ **⭐ Rating 1–5**

→ **Deskripsi**

→ **📷 Upload bukti**

→ **Submit**

→ **Rating & score diperbarui**

→ **Tampilkan hasil pada map**

---

# 33. HASIL AKHIR YANG DIINGINKAN

Fitur ini pada akhirnya menjadi sebuah sistem **Citizen-Based Infrastructure Monitoring & Rating Platform**, di mana masyarakat dapat melaporkan dan menilai kondisi:

- Infrastruktur jalan
- Mobilitas
- Public space
- Pelayanan birokrasi
- Pendidikan
- Air bersih
- Sanitasi
- Listrik
- Telekomunikasi
- Kesehatan

Seluruh data kemudian dikumpulkan menjadi **rating fasilitas → score wilayah → Bina Classification**, sehingga dapat digunakan untuk memberikan gambaran kondisi infrastruktur dan pelayanan publik secara berbasis data dan lokasi.