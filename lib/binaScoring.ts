/**
 * SISTEM FORMULASI SCORING & KLASIFIKASI BINA SCORE
 * Berdasarkan spesifikasi file PROMPT — FITUR PENILAIAN INFRASTRUKTUR & MOBILITAS.md
 * dan notebook metode penilaian.ipynb
 */

export type BinaPredicate = "ADIBINA" | "SWABINA" | "PURWABINA" | "RENTANBINA" | "NIRBINA";

export interface BinaClassificationInfo {
  predicate: BinaPredicate;
  badgeTitle: string;
  minScore: number;
  maxScore: number;
  starIcon: string;
  textColor: string;
  bgColor: string;
  borderColor: string;
  meaning: string;
  characteristics: string[];
}

export const BINA_CLASSIFICATION_RULES: Record<BinaPredicate, BinaClassificationInfo> = {
  ADIBINA: {
    predicate: "ADIBINA",
    badgeTitle: "ADIBINA (Unggul / Sangat Baik)",
    minScore: 85,
    maxScore: 100,
    starIcon: "⭐ ADIBINA",
    textColor: "text-emerald-400 dark:text-emerald-300",
    bgColor: "bg-emerald-500/20",
    borderColor: "border-emerald-500/40",
    meaning: "'Adi' berarti unggul/sempurna",
    characteristics: [
      "Infrastruktur berstandar tinggi / metropolitan",
      "Infrastruktur terintegrasi dengan baik",
      "Digitalisasi & aksesibilitas sangat baik",
      "Kondisi fasilitas dan jalan sangat terawat",
    ],
  },
  SWABINA: {
    predicate: "SWABINA",
    badgeTitle: "SWABINA (Mandiri / Layak)",
    minScore: 70,
    maxScore: 84.99,
    starIcon: "⭐ SWABINA",
    textColor: "text-sky-400 dark:text-sky-300",
    bgColor: "bg-sky-500/20",
    borderColor: "border-sky-500/40",
    meaning: "'Swa' berarti mandiri",
    characteristics: [
      "Infrastruktur sudah sangat layak dan berfungsi",
      "Mampu menopang aktivitas & ekonomi masyarakat",
      "Tingkat gangguan relatif rendah",
      "Fasilitas publik tersedia dengan baik",
    ],
  },
  PURWABINA: {
    predicate: "PURWABINA",
    badgeTitle: "PURWABINA (Awal / Dasar)",
    minScore: 55,
    maxScore: 69.99,
    starIcon: "⭐ PURWABINA",
    textColor: "text-amber-400 dark:text-amber-300",
    bgColor: "bg-amber-500/20",
    borderColor: "border-amber-500/40",
    meaning: "'Purwa' berarti awal/dasar",
    characteristics: [
      "Infrastruktur dasar telah dibangun & tersedia",
      "Jalan dan fasilitas dasar berfungsi standar",
      "Masih terdapat ruang untuk peningkatan",
    ],
  },
  RENTANBINA: {
    predicate: "RENTANBINA",
    badgeTitle: "RENTANBINA (Rentan / Kurang)",
    minScore: 40,
    maxScore: 54.99,
    starIcon: "⭐ RENTANBINA",
    textColor: "text-orange-400 dark:text-orange-300",
    bgColor: "bg-orange-500/20",
    borderColor: "border-orange-500/40",
    meaning: "Infrastruktur tersedia namun kondisinya rentan",
    characteristics: [
      "Infrastruktur sering mengalami kerusakan",
      "Lubang jalan atau fasilitas kurang terawat",
      "Akses pelayanan masih memiliki kendala",
    ],
  },
  NIRBINA: {
    predicate: "NIRBINA",
    badgeTitle: "NIRBINA (Kritis / Sangat Minim)",
    minScore: 0,
    maxScore: 39.99,
    starIcon: "⭐ NIRBINA",
    textColor: "text-rose-400 dark:text-rose-300",
    bgColor: "bg-rose-500/20",
    borderColor: "border-rose-500/40",
    meaning: "'Nir' berarti tanpa/tidak ada",
    characteristics: [
      "Kondisi infrastruktur kritis atau sangat berisiko",
      "Fasilitas publik sangat terbatas atau rusak berat",
      "Layanan dasar belum hadir secara memadai",
    ],
  },
};

/**
 * Mengonversi nilai rating (1-5) atau kumpulan rating menjadi Skor (0-100) dan Predikat Bina.
 * Formula dari notebook metode penilaian.ipynb:
 * Skor Tempat = (Jumlah Rating / Banyak Penilai) * 20
 */
export function calculatePlaceRatingAndScore(ratings: number[]) {
  if (!ratings || ratings.length === 0) {
    return {
      totalRatings: 0,
      totalReviewers: 0,
      avgRating: 0,
      score: 0,
      classification: getBinaClassification(0),
    };
  }

  const totalRatings = ratings.reduce((sum, r) => sum + r, 0);
  const totalReviewers = ratings.length;
  const avgRating = totalRatings / totalReviewers;
  const score = Math.round(avgRating * 20 * 10) / 10; // (avgRating / 5) * 100 = avgRating * 20

  return {
    totalRatings,
    totalReviewers,
    avgRating: Math.round(avgRating * 10) / 10,
    score,
    classification: getBinaClassification(score),
  };
}

/**
 * Mengklasifikasikan Skor (0-100) ke dalam kategori Adibina, Swabina, Purwabina, Rentanbina, Nirbina.
 */
export function getBinaClassification(score: number): BinaClassificationInfo {
  if (score >= 85) return BINA_CLASSIFICATION_RULES.ADIBINA;
  if (score >= 70) return BINA_CLASSIFICATION_RULES.SWABINA;
  if (score >= 55) return BINA_CLASSIFICATION_RULES.PURWABINA;
  if (score >= 40) return BINA_CLASSIFICATION_RULES.RENTANBINA;
  return BINA_CLASSIFICATION_RULES.NIRBINA;
}

/**
 * Menghitung Rating & Skor Wilayah (Daerah/Kecamatan) dari akumulasi tempat.
 * Formula: Skor Daerah = Jumlah Skor Seluruh Tempat / Jumlah Tempat
 */
export function calculateRegionBinaScore(placeScores: number[]) {
  if (!placeScores || placeScores.length === 0) {
    return {
      regionScore: 0,
      totalPlaces: 0,
      classification: getBinaClassification(0),
    };
  }

  const totalScore = placeScores.reduce((sum, s) => sum + s, 0);
  const regionScore = Math.round((totalScore / placeScores.length) * 10) / 10;

  return {
    regionScore,
    totalPlaces: placeScores.length,
    classification: getBinaClassification(regionScore),
  };
}
