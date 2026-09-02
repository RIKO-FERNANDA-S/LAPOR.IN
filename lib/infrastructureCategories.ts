/**
 * KLASIFIKASI INFRASTRUKTUR DAN PELAYANAN PUBLIK
 * Berdasarkan spesifikasi file PROMPT — FITUR PENILAIAN INFRASTRUKTUR & MOBILITAS.md
 */

export interface InfrastructureAspect {
  id: string;
  name: string;
  description?: string;
}

export interface InfrastructureFacility {
  id: string;
  name: string;
  code: string;
  description?: string;
  aspects: InfrastructureAspect[];
}

export interface InfrastructureCategory {
  id: string;
  name: string;
  code: string;
  icon: string;
  facilities: InfrastructureFacility[];
}

export const INFRASTRUCTURE_CLASSIFICATION: InfrastructureCategory[] = [
  {
    id: "JALAN_MOBILITAS",
    name: "Infrastruktur Jalan & Mobilitas",
    code: "INFRA_JALAN",
    icon: "🛣️",
    facilities: [
      {
        id: "JALAN",
        name: "Jalan Utama / Lingkungan",
        code: "FAC_JALAN",
        aspects: [
          { id: "trotoar", name: "Trotoar / Jalur Pejalan Kaki" },
          { id: "rambu", name: "Rambu Lalu Lintas" },
          { id: "traffic_light", name: "Lampu Merah / Traffic Light" },
          { id: "lubang_jalan", name: "Kondisi Lubang Jalan" },
          { id: "kebersihan_jalan", name: "Kebersihan Jalan" },
        ],
      },
      {
        id: "JPO",
        name: "JPO (Jembatan Penyeberangan Orang)",
        code: "FAC_JPO",
        aspects: [
          { id: "pagar", name: "Pagar Pengaman JPO" },
          { id: "rangka", name: "Rangka & Struktur JPO" },
          { id: "atap_kondisi", name: "Kondisi Atap JPO" },
          { id: "atap_kebocoran", name: "Kebocoran Atap JPO" },
          { id: "lantai", name: "Permukaan Lantai JPO" },
          { id: "kebersihan_jpo", name: "Kebersihan Area JPO" },
          { id: "lift_jpo", name: "Ketersediaan & Kondisi Lift JPO" },
        ],
      },
      {
        id: "HALTE",
        name: "Halte / Shelter Bus",
        code: "FAC_HALTE",
        aspects: [
          { id: "kebersihan_halte", name: "Kebersihan Halte" },
          { id: "tiang_tembok", name: "Kondisi Tiang & Tembok Halte" },
          { id: "tempat_duduk", name: "Tempat Duduk Halte" },
          { id: "papan_navigasi", name: "Papan Navigasi & Informasi Rute" },
          { id: "kemudahan_akses", name: "Kemudahan Akses Masuk Halte" },
          { id: "akses_disabilitas", name: "Kemudahan Bagi Penyandang Disabilitas" },
        ],
      },
    ],
  },
  {
    id: "PUBLIC_SPACE",
    name: "Public Space & Taman Kota",
    code: "INFRA_PUBLIC_SPACE",
    icon: "🌳",
    facilities: [
      {
        id: "TAMAN",
        name: "Taman Kota & Alun-Alun",
        code: "FAC_TAMAN",
        aspects: [
          { id: "toilet_ketersediaan", name: "Toilet - Ketersediaan" },
          { id: "toilet_kebersihan", name: "Toilet - Kebersihan" },
          { id: "toilet_kondisi", name: "Toilet - Kondisi Bangunan" },
          { id: "sampah_tersedia", name: "Tempat Sampah - Ketersediaan" },
          { id: "sampah_kondisi", name: "Tempat Sampah - Kebersihan & Kapasitas" },
          { id: "kebersihan_taman", name: "Kebersihan Area Taman Umum" },
          { id: "pungli_taman", name: "Indikasi Pungli / Pungutan Liar" },
          { id: "kondisi_fisik_taman", name: "Kondisi Fisik (Lantai, Tembok, Pohon)" },
          { id: "pedestrian_taman", name: "Jalur Pedestrian & Ramah Pejalan Kaki" },
        ],
      },
    ],
  },
  {
    id: "LAYANAN_BIROKRASI",
    name: "Layanan Birokrasi & Publik",
    code: "INFRA_BIROKRASI",
    icon: "🏛️",
    facilities: [
      {
        id: "MPP",
        name: "Mal Pelayanan Publik (MPP) / Kantor Kecamatan",
        code: "FAC_MPP",
        aspects: [
          { id: "kebersihan_mpp", name: "Kebersihan Area Pelayanan" },
          { id: "fisik_mpp", name: "Kondisi Fisik (Lantai, Tembok, Atap)" },
          { id: "fasilitas_mpp", name: "Fasilitas Pendukung (Lift, Tangga, AC)" },
          { id: "waktu_layanan", name: "Kecepatan & Lama Waktu Pelayanan" },
          { id: "ketersediaan_layanan", name: "Ketersediaan & Kejelasan Informasi Layanan" },
          { id: "kemudahan_birokrasi", name: "Kemudahan Memperoleh Pelayanan" },
        ],
      },
    ],
  },
  {
    id: "PENDIDIKAN",
    name: "Fasilitas Pendidikan Negeri",
    code: "INFRA_PENDIDIKAN",
    icon: "🏫",
    facilities: [
      {
        id: "SEKOLAH_NEGERI",
        name: "Sekolah Negeri (SDN / SMPN / SMAN)",
        code: "FAC_SEKOLAH",
        aspects: [
          { id: "biaya_pungli_sekolah", name: "Transparansi Biaya / Bebas Pungli" },
          { id: "fasilitas_perpustakaan", name: "Ketersediaan Perpustakaan & Lapangan" },
          { id: "kondisi_gedung_sekolah", name: "Kondisi Gedung (Tembok, Lantai, Atap)" },
          { id: "peralatan_kelas", name: "Peralatan Kelas (Meja, Kursi, Papan, Proyektor)" },
          { id: "kualitas_pengajaran", name: "Kualitas Pendidikan & Kehadiran Guru" },
        ],
      },
      {
        id: "PTN",
        name: "Perguruan Tinggi Negeri (PTN)",
        code: "FAC_PTN",
        aspects: [
          { id: "fasilitas_ptn", name: "Ketersediaan & Kondisi Fasilitas Kampus" },
          { id: "layanan_akademik", name: "Ketersediaan & Kualitas Layanan Akademik" },
        ],
      },
    ],
  },
  {
    id: "AIR_SANITASI",
    name: "Air Bersih & Sanitasi",
    code: "INFRA_AIR",
    icon: "🚰",
    facilities: [
      {
        id: "AIR_BERSIH",
        name: "Jaringan Air Bersih & PDAM",
        code: "FAC_AIR",
        aspects: [
          { id: "kualitas_air_tanah", name: "Kualitas Air Tanah Sesuai Kelayakan" },
          { id: "akses_pdam", name: "Akses Jaringan Sambungan PDAM" },
          { id: "kelancaran_air", name: "Kelancaran Pasokan Air Bersih" },
        ],
      },
    ],
  },
  {
    id: "LISTRIK",
    name: "Ketenagalistrikan",
    code: "INFRA_LISTRIK",
    icon: "⚡",
    facilities: [
      {
        id: "PLN",
        name: "Jaringan & Stabilitas Listrik",
        code: "FAC_LISTRIK",
        aspects: [
          { id: "cakupan_listrik", name: "Cakupan Jaringan Listrik Wilayah" },
          { id: "intensitas_pemadaman", name: "Kondisi Stabilitas / Frekuensi Pemadaman" },
        ],
      },
    ],
  },
  {
    id: "TELEKOMUNIKASI",
    name: "Telekomunikasi & Jaringan Internet",
    code: "INFRA_TELEKOMUNIKASI",
    icon: "📡",
    facilities: [
      {
        id: "PROVIDER",
        name: "Jaringan Provider (Telkomsel, Indosat, XL, Tri, dll)",
        code: "FAC_TELCO",
        aspects: [
          { id: "cakupan_sinyal", name: "Cakupan Jaringan Sinyal (Bebas Blankspot)" },
          { id: "bandwidth_kecepatan", name: "Kualitas Bandwidth & Kecepatan Data" },
        ],
      },
    ],
  },
  {
    id: "KESEHATAN",
    name: "Fasilitas Kesehatan",
    code: "INFRA_KESEHATAN",
    icon: "🏥",
    facilities: [
      {
        id: "PUSKESMAS",
        name: "Puskesmas / Klinik Pratama",
        code: "FAC_PUSKESMAS",
        aspects: [
          { id: "layanan_poli", name: "Ketersediaan Layanan (Poli Umum, Gigi, KIA, Lab)" },
          { id: "farmasi_igd", name: "Ketersediaan Farmasi & IGD 24 Jam" },
          { id: "bangunan_alat_puskesmas", name: "Kondisi Bangunan & Alat Medis" },
        ],
      },
      {
        id: "RUMAH_SAKIT",
        name: "Rumah Sakit (RSUD / RSU)",
        code: "FAC_RS",
        aspects: [
          { id: "layanan_rs", name: "Ketersediaan Spesialis & Pelayanan Medis" },
          { id: "kelengkapan_alat_rs", name: "Kelengkapan & Kondisi Alat Medis RS" },
        ],
      },
    ],
  },
];
