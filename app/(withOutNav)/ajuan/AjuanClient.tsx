"use client"

import React, { useState } from "react"
import dynamic from "next/dynamic"
import { useRouter, useSearchParams } from "next/navigation"
import Link from "next/link"
import Image from "next/image"
import AddTag from "@/app/layouts/(components)/addTag"
import PhotoUploader from "@/app/layouts/(components)/PhotoUploader"
import {
  MapPin,
  Send,
  AlertCircle,
  CheckCircle2,
  ArrowLeft,
  Star,
  Building2,
  Sliders,
  Sparkles,
  Camera,
  FileText,
  ChevronRight,
  Info,
} from "lucide-react"
import { INFRASTRUCTURE_CLASSIFICATION } from "@/lib/infrastructureCategories"
import { getBinaClassification } from "@/lib/binaScoring"

// Dynamically import Leaflet Map to avoid SSR hydration issues
const LocationPicker = dynamic(
  () => import("@/app/layouts/(map)/LocationPicker"),
  {
    ssr: false,
    loading: () => (
      <div className="w-full h-72 bg-neutral-100 rounded-2xl border border-neutral-200 flex flex-col items-center justify-center gap-2 text-xs text-neutral-400 animate-pulse">
        <MapPin className="w-6 h-6 animate-bounce text-neutral-400" />
        <span className="font-medium">Memuat Peta Interaktif...</span>
      </div>
    ),
  }
)

export default function AjuanClient() {
  const router = useRouter()
  const searchParams = useSearchParams()

  // Pre-fill latitude and longitude from URL searchParams if provided
  const initialLat = searchParams.get("lat") ? parseFloat(searchParams.get("lat")!) : -7.3361
  const initialLng = searchParams.get("lng") ? parseFloat(searchParams.get("lng")!) : 112.7872

  // Form State
  const [title, setTitle] = useState("")
  const [selectedCategoryCode, setSelectedCategoryCode] = useState(INFRASTRUCTURE_CLASSIFICATION[0].id)
  const [selectedFacilityId, setSelectedFacilityId] = useState(INFRASTRUCTURE_CLASSIFICATION[0].facilities[0].id)
  const [selectedAspect, setSelectedAspect] = useState(INFRASTRUCTURE_CLASSIFICATION[0].facilities[0].aspects[0].name)

  // Rating 1-5 Stars State
  const [rating, setRating] = useState<number>(4) // Default 4 stars (Swabina)
  const [hoverRating, setHoverRating] = useState<number>(0)

  const [description, setDescription] = useState("")
  const [locationDesc, setLocationDesc] = useState("")
  const [tags, setTags] = useState<string[]>([])
  const [photos, setPhotos] = useState<string[]>([])
  const [latitude, setLatitude] = useState<number>(initialLat)
  const [longitude, setLongitude] = useState<number>(initialLng)

  // Status & Feedback State
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [errorMsg, setErrorMsg] = useState<string | null>(null)
  const [successMsg, setSuccessMsg] = useState<string | null>(null)

  // Current selected category object
  const currentCategory = INFRASTRUCTURE_CLASSIFICATION.find((c) => c.id === selectedCategoryCode) || INFRASTRUCTURE_CLASSIFICATION[0]
  // Current selected facility object
  const currentFacility = currentCategory.facilities.find((f) => f.id === selectedFacilityId) || currentCategory.facilities[0]

  // Update facilities and aspects when category changes
  const handleCategoryChange = (catId: string) => {
    setSelectedCategoryCode(catId)
    const cat = INFRASTRUCTURE_CLASSIFICATION.find((c) => c.id === catId)
    if (cat && cat.facilities.length > 0) {
      setSelectedFacilityId(cat.facilities[0].id)
      if (cat.facilities[0].aspects.length > 0) {
        setSelectedAspect(cat.facilities[0].aspects[0].name)
      }
    }
  }

  // Update aspects when facility changes
  const handleFacilityChange = (facId: string) => {
    setSelectedFacilityId(facId)
    const fac = currentCategory.facilities.find((f) => f.id === facId)
    if (fac && fac.aspects.length > 0) {
      setSelectedAspect(fac.aspects[0].name)
    }
  }

  const handleLocationChange = (lat: number, lng: number) => {
    setLatitude(lat)
    setLongitude(lng)
  }

  const activeBinaClassification = getBinaClassification(rating * 20)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setErrorMsg(null)
    setSuccessMsg(null)

    if (!title.trim()) {
      setErrorMsg("Judul Laporan / Penilaian wajib diisi.")
      return
    }

    if (!description.trim()) {
      setErrorMsg("Deskripsi detail wajib diisi.")
      return
    }

    // Mandatory photo upload validation
    if (photos.length === 0) {
      setErrorMsg("Upload bukti foto/video wajib dilampirkan sebagai bukti penilaian.")
      return
    }

    setIsSubmitting(true)

    try {
      const response = await fetch("/api/reports", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title: title.trim(),
          description: description.trim(),
          rating,
          aspect: selectedAspect,
          category_name: currentCategory.name,
          facility_name: currentFacility.name,
          location_description: locationDesc.trim() || undefined,
          latitude,
          longitude,
          photo_urls: photos,
          tags,
        }),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.message || "Gagal mengirimkan penilaian")
      }

      setSuccessMsg("Penilaian & laporan infrastruktur Anda berhasil tersimpan di database!")
      // Reset form fields
      setTitle("")
      setDescription("")
      setLocationDesc("")
      setTags([])
      setPhotos([])
    } catch (err: any) {
      console.error("Submission error:", err)
      setErrorMsg(err.message || "Terjadi kesalahan saat mengirim laporan.")
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="min-h-screen bg-white text-neutral-900 font-sans relative overflow-x-hidden">
      {/* Background Subtle Grid Pattern */}
      <div
        className="absolute inset-0 pointer-events-none z-0 opacity-40"
        style={{
          backgroundImage:
            "linear-gradient(rgba(0,0,0,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(0,0,0,0.03) 1px, transparent 1px)",
          backgroundSize: "60px 60px",
        }}
      />

      {/* Top Header Navbar */}
      <header className="sticky top-0 z-40 bg-white/90 backdrop-blur-md border-b border-neutral-100 h-16 transition-all">
        <div className="max-w-[1280px] mx-auto px-6 lg:px-16 h-full flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2.5 font-bold text-lg text-black tracking-tight group">
            <Image src="/logo/logo.png" alt="Bina logo" width={28} height={28} className="w-7 h-7 object-contain transition-transform group-hover:scale-105" />
            <span>bina.</span>
          </Link>

          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => router.back()}
              className="inline-flex items-center gap-2 text-xs font-semibold text-neutral-700 bg-neutral-50 hover:bg-neutral-100 border border-neutral-200 hover:border-neutral-300 px-4 py-2 rounded-xl transition-all shadow-2xs"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Kembali</span>
            </button>
          </div>
        </div>
      </header>

      {/* Main Page Container */}
      <main className="relative z-10 max-w-[1280px] mx-auto px-6 lg:px-16 py-10 lg:py-14">
        {/* Page Hero Header */}
        <div className="mb-10 flex flex-col lg:flex-row lg:items-end justify-between gap-6 border-b border-neutral-100 pb-8">
          <div className="max-w-2xl">
            <span className="inline-flex items-center gap-2 text-[11px] font-semibold tracking-[0.2em] text-neutral-500 uppercase border border-neutral-200 rounded-full px-4 py-1.5 bg-neutral-50/80 mb-4 shadow-2xs">
              <span className="w-1.5 h-1.5 rounded-full bg-black" />
              FORM PENILAIAN INFRASTRUKTUR & MOBILITAS
            </span>

            <h1
              className="font-bold text-black leading-[1.1] tracking-tight text-3xl sm:text-4xl lg:text-5xl"
            >
              Seberapa Layak{" "}
              <span className="relative inline-block">
                Kotamu
                <svg className="absolute -bottom-1 left-0 w-full" height="6" viewBox="0 0 200 6" preserveAspectRatio="none">
                  <path d="M0 5 Q 50 0 100 5 Q 150 10 200 5" stroke="#111" strokeWidth="1.5" fill="none" />
                </svg>
              </span>{" "}
              Hari Ini?
            </h1>

            <p className="text-neutral-500 text-sm sm:text-base leading-relaxed mt-3">
              Berikan rating 1–5 bintang, foto bukti lapangan, dan lokasi presisi. Penilaian Anda langsung mengkalkulasi Skor Wilayah dan Klasifikasi Bina.
            </p>
          </div>

          {/* Live Dynamic Score Preview Card */}
          <div className="bg-neutral-50 border border-neutral-200/80 rounded-2xl p-4 sm:p-5 flex items-center gap-5 min-w-[280px] shadow-2xs">
            <div className="flex flex-col items-center justify-center bg-black text-white rounded-xl p-3.5 min-w-[70px]">
              <span className="text-2xl font-black tracking-tight leading-none">{rating * 20}</span>
              <span className="text-[9px] text-neutral-400 uppercase font-semibold mt-0.5">/ 100</span>
            </div>
            <div className="flex flex-col gap-1">
              <span className="text-[10px] uppercase font-bold tracking-widest text-neutral-400">Predikat Terkalkulasi</span>
              <span className="text-sm font-extrabold text-black tracking-tight flex items-center gap-1.5">
                {activeBinaClassification.predicate}
              </span>
              <div className="flex gap-0.5 mt-0.5">
                {[1, 2, 3, 4, 5].map((s) => (
                  <Star
                    key={s}
                    className={`w-3.5 h-3.5 ${
                      s <= rating ? "fill-black text-black" : "text-neutral-200 fill-neutral-200"
                    }`}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Alert Notifications */}
        {errorMsg && (
          <div className="mb-8 p-4 rounded-2xl bg-red-50 border border-red-200 text-red-700 flex items-start gap-3 text-xs font-semibold animate-in fade-in slide-in-from-top-2">
            <AlertCircle className="w-5 h-5 shrink-0 mt-0.5 text-red-600" />
            <div className="leading-relaxed">{errorMsg}</div>
          </div>
        )}

        {successMsg && (
          <div className="mb-8 p-4 sm:p-5 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-900 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 animate-in fade-in slide-in-from-top-2">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-emerald-600 text-white rounded-full">
                <CheckCircle2 className="w-5 h-5 shrink-0" />
              </div>
              <div className="text-xs font-bold leading-relaxed">{successMsg}</div>
            </div>
            <button
              type="button"
              onClick={() => router.push("/peta")}
              className="text-xs font-bold bg-emerald-900 text-white hover:bg-emerald-800 px-4 py-2.5 rounded-xl transition-all flex items-center gap-1.5 shrink-0"
            >
              Lihat di Peta Spasial ↗
            </button>
          </div>
        )}

        {/* Main Form Grid */}
        <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* LEFT COLUMN: Photos & Interactive Map (5 Cols) */}
          <div className="lg:col-span-5 flex flex-col gap-6">
            {/* 1. Bukti Foto / Video (Wajib) */}
            <div className="bg-white border border-neutral-200/80 rounded-2xl p-6 shadow-2xs hover:border-neutral-300 transition-all flex flex-col gap-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Camera className="w-4 h-4 text-black" />
                  <h2 className="text-sm font-bold text-black tracking-tight">Bukti Foto / Video Pendukung</h2>
                </div>
                <span className="px-2.5 py-0.5 text-[10px] font-bold uppercase rounded-full bg-black text-white">
                  Wajib
                </span>
              </div>
              <p className="text-xs text-neutral-500 leading-relaxed">
                Unggah minimal 1 foto/video kondisi fisik sebagai bukti validitas penilaian di lapangan.
              </p>
              <PhotoUploader photos={photos} onChange={setPhotos} maxPhotos={5} />
            </div>

            {/* 2. Penanda Lokasi GPS */}
            <div className="bg-white border border-neutral-200/80 rounded-2xl p-6 shadow-2xs hover:border-neutral-300 transition-all flex flex-col gap-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-black" />
                  <h2 className="text-sm font-bold text-black tracking-tight">Penanda Lokasi Peta GPS</h2>
                </div>
                <span className="px-2.5 py-0.5 text-[10px] font-semibold uppercase rounded-full bg-neutral-100 text-neutral-600 border border-neutral-200 font-mono">
                  Presisi Spasial
                </span>
              </div>
              <p className="text-xs text-neutral-500 leading-relaxed">
                Klik pada titik peta di mana fasilitas atau infrastruktur tersebut berada.
              </p>

              <LocationPicker
                latitude={latitude}
                longitude={longitude}
                onLocationChange={handleLocationChange}
              />

              <div className="flex flex-col gap-1.5 mt-1">
                <label className="text-xs font-semibold text-neutral-700">
                  Detail Alamat / Nama Tempat / Landmark
                </label>
                <input
                  type="text"
                  value={locationDesc}
                  onChange={(e) => setLocationDesc(e.target.value)}
                  placeholder="Contoh: Halte Bus Unair Kampus C / Jl. Darmo No. 42"
                  className="w-full bg-neutral-50/50 border border-neutral-200 rounded-xl px-3.5 py-2.5 text-xs font-medium text-black focus:outline-none focus:ring-1 focus:ring-black focus:bg-white transition-all placeholder:text-neutral-400"
                />
              </div>
            </div>
          </div>

          {/* RIGHT COLUMN: Classification, Rating & Details (7 Cols) */}
          <div className="lg:col-span-7 flex flex-col gap-6">
            {/* Card Form Block */}
            <div className="bg-white border border-neutral-200/80 rounded-2xl p-6 sm:p-8 shadow-2xs hover:border-neutral-300 transition-all flex flex-col gap-6">
              
              {/* SECTION 1: Klasifikasi Kategori */}
              <div className="flex flex-col gap-4 pb-6 border-b border-neutral-100">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] font-bold tracking-widest text-neutral-400 uppercase border border-neutral-200 rounded-md px-2 py-0.5 bg-neutral-50">
                      01
                    </span>
                    <h3 className="font-bold text-sm text-black tracking-tight flex items-center gap-2">
                      <Building2 className="w-4 h-4 text-black" />
                      <span>Klasifikasi Kategori Infrastruktur</span>
                    </h3>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Select Kategori Utama */}
                  <div className="flex flex-col gap-1.5">
                    <label className="text-xs font-semibold text-neutral-700">Kategori Utama</label>
                    <select
                      value={selectedCategoryCode}
                      onChange={(e) => handleCategoryChange(e.target.value)}
                      className="w-full bg-neutral-50/50 border border-neutral-200 rounded-xl px-3.5 py-2.5 text-xs font-semibold text-neutral-900 focus:outline-none focus:ring-1 focus:ring-black focus:bg-white transition-all cursor-pointer"
                    >
                      {INFRASTRUCTURE_CLASSIFICATION.map((cat) => (
                        <option key={cat.id} value={cat.id}>
                          {cat.icon} {cat.name}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Select Fasilitas / Tempat */}
                  <div className="flex flex-col gap-1.5">
                    <label className="text-xs font-semibold text-neutral-700">Fasilitas / Tempat</label>
                    <select
                      value={selectedFacilityId}
                      onChange={(e) => handleFacilityChange(e.target.value)}
                      className="w-full bg-neutral-50/50 border border-neutral-200 rounded-xl px-3.5 py-2.5 text-xs font-semibold text-neutral-900 focus:outline-none focus:ring-1 focus:ring-black focus:bg-white transition-all cursor-pointer"
                    >
                      {currentCategory.facilities.map((fac) => (
                        <option key={fac.id} value={fac.id}>
                          {fac.name}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* Select Sub-Part / Aspek Penilaian */}
                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-semibold text-neutral-700 flex items-center gap-1.5">
                    <Sliders className="w-3.5 h-3.5 text-black" />
                    <span>Sub-Part / Aspek Penilaian Spesifik</span>
                  </label>
                  <select
                    value={selectedAspect}
                    onChange={(e) => setSelectedAspect(e.target.value)}
                    className="w-full bg-neutral-50/50 border border-neutral-200 rounded-xl px-3.5 py-2.5 text-xs font-semibold text-neutral-900 focus:outline-none focus:ring-1 focus:ring-black focus:bg-white transition-all cursor-pointer"
                  >
                    {currentFacility.aspects.map((asp) => (
                      <option key={asp.id} value={asp.name}>
                        {asp.name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* SECTION 2: Rating 1 - 5 Bintang */}
              <div className="flex flex-col gap-4 pb-6 border-b border-neutral-100">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] font-bold tracking-widest text-neutral-400 uppercase border border-neutral-200 rounded-md px-2 py-0.5 bg-neutral-50">
                      02
                    </span>
                    <h3 className="font-bold text-sm text-black tracking-tight flex items-center gap-2">
                      <Star className="w-4 h-4 text-black fill-black" />
                      <span>Penilaian Rating (1 – 5 Bintang)</span>
                    </h3>
                  </div>

                  <span className="px-3 py-1 rounded-full text-xs font-bold bg-black text-white tracking-wide">
                    Skor: {rating * 20}/100 • {activeBinaClassification.predicate}
                  </span>
                </div>

                {/* Interactive Stars */}
                <div className="bg-neutral-50/70 border border-neutral-200/60 rounded-2xl p-4 flex flex-col sm:flex-row items-center justify-between gap-4">
                  <div className="flex items-center gap-2">
                    {[1, 2, 3, 4, 5].map((star) => {
                      const active = (hoverRating || rating) >= star
                      return (
                        <button
                          key={star}
                          type="button"
                          onClick={() => setRating(star)}
                          onMouseEnter={() => setHoverRating(star)}
                          onMouseLeave={() => setHoverRating(0)}
                          className="p-1 rounded-xl transition-all duration-150 hover:scale-125 focus:outline-none"
                        >
                          <Star
                            className={`w-7 h-7 ${
                              active
                                ? "fill-black text-black drop-shadow-xs"
                                : "text-neutral-300 fill-neutral-200"
                            }`}
                          />
                        </button>
                      )
                    })}
                  </div>

                  <div className="text-xs font-bold text-neutral-800 text-center sm:text-right bg-white px-3 py-1.5 rounded-xl border border-neutral-200/80 shadow-2xs">
                    {rating === 1 && "⭐ 1 • NIRBINA (Kritis)"}
                    {rating === 2 && "⭐⭐ 2 • RENTANBINA (Rentan)"}
                    {rating === 3 && "⭐⭐⭐ 3 • PURWABINA (Dasar)"}
                    {rating === 4 && "⭐⭐⭐⭐ 4 • SWABINA (Mandiri)"}
                    {rating === 5 && "⭐⭐⭐⭐⭐ 5 • ADIBINA (Unggul)"}
                  </div>
                </div>
              </div>

              {/* SECTION 3: Detail Laporan */}
              <div className="flex flex-col gap-4">
                <div className="flex items-center gap-2">
                  <span className="text-[10px] font-bold tracking-widest text-neutral-400 uppercase border border-neutral-200 rounded-md px-2 py-0.5 bg-neutral-50">
                    03
                  </span>
                  <h3 className="font-bold text-sm text-black tracking-tight flex items-center gap-2">
                    <FileText className="w-4 h-4 text-black" />
                    <span>Detail & Keterangan Laporan</span>
                  </h3>
                </div>

                {/* Judul Ringkas */}
                <div className="flex flex-col gap-1.5">
                  <label htmlFor="judul-laporan" className="text-xs font-semibold text-neutral-700">
                    Judul Ringkas Laporan / Penilaian <span className="text-red-500">*</span>
                  </label>
                  <input
                    id="judul-laporan"
                    type="text"
                    required
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="Contoh: Kondisi Trotoar Rusak dan Berlubang di Depan Halte"
                    className="w-full bg-neutral-50/50 border border-neutral-200 rounded-xl px-3.5 py-2.5 text-xs font-medium text-black focus:outline-none focus:ring-1 focus:ring-black focus:bg-white transition-all placeholder:text-neutral-400"
                  />
                </div>

                {/* Deskripsi Detail */}
                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-semibold text-neutral-700">
                    Deskripsi Detail Kondisi <span className="text-red-500">*</span>
                  </label>
                  <textarea
                    required
                    rows={4}
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="Jelaskan secara rinci kondisi fisik, kendala pelayanan, atau masalah yang Anda temukan pada aspek fasilitas tersebut..."
                    className="w-full bg-neutral-50/50 border border-neutral-200 rounded-xl p-3.5 text-xs font-medium text-black focus:outline-none focus:ring-1 focus:ring-black focus:bg-white transition-all placeholder:text-neutral-400 min-h-[120px] resize-y"
                  />
                </div>

                {/* Tag Laporan */}
                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-semibold text-neutral-700">Tag Laporan (Opsional)</label>
                  <AddTag tags={tags} setTags={setTags} />
                </div>
              </div>

              {/* Submit Action CTA */}
              <div className="pt-4 border-t border-neutral-100 flex flex-col gap-3">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-black text-white hover:bg-neutral-800 disabled:bg-neutral-400 rounded-xl py-4 px-8 text-sm font-bold tracking-tight transition-all duration-200 shadow-md hover:shadow-lg flex items-center justify-center gap-2 group cursor-pointer"
                >
                  {isSubmitting ? (
                    <>
                      <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      <span>Mengirim Penilaian...</span>
                    </>
                  ) : (
                    <>
                      <span>Kirim Penilaian & Laporan</span>
                      <span className="inline-block transition-transform duration-200 group-hover:translate-x-1">↗</span>
                    </>
                  )}
                </button>

                <p className="text-[11px] text-neutral-400 text-center leading-relaxed">
                  Dengan mengirimkan form ini, data Anda akan diverifikasi & dikalkulasikan secara real-time pada peta spasial Bina.
                </p>
              </div>
            </div>
          </div>
        </form>
      </main>
    </div>
  )
}
