"use client"

import React, { useState, useEffect } from "react"
import dynamic from "next/dynamic"
import { useRouter, useSearchParams } from "next/navigation"
import AddTag from "@/app/layouts/(components)/addTag"
import PhotoUploader from "@/app/layouts/(components)/PhotoUploader"
import { Field, FieldGroup, FieldLabel } from "@/components/ui/field"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { MapPin, Send, AlertCircle, CheckCircle2, ArrowLeft, Star, Building2, Sliders } from "lucide-react"
import { INFRASTRUCTURE_CLASSIFICATION } from "@/lib/infrastructureCategories"
import { getBinaClassification } from "@/lib/binaScoring"

// Dynamically import Leaflet Map to avoid SSR hydration issues
const LocationPicker = dynamic(
  () => import("@/app/layouts/(map)/LocationPicker"),
  {
    ssr: false,
    loading: () => (
      <div className="w-full h-72 bg-muted/40 rounded-lg border border-border flex flex-col items-center justify-center gap-2 text-xs text-muted-foreground animate-pulse">
        <MapPin className="w-6 h-6 animate-bounce text-muted-foreground/60" />
        <span>Memuat Peta Interaktif...</span>
      </div>
    ),
  }
)

export default function AjuanPage() {
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

    // Mandatory photo upload validation according to prompt section 17
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
    <main className="w-full min-h-screen bg-background py-8 px-4 sm:px-6 lg:px-8 flex flex-col items-center font-sans">
      {/* Header Navigation */}
      <div className="w-full max-w-5xl flex items-center justify-between mb-6">
        <button
          type="button"
          onClick={() => router.back()}
          className="inline-flex items-center gap-2 text-xs font-medium text-muted-foreground hover:text-foreground transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Kembali ke Peta
        </button>
      </div>

      {/* Header Section */}
      <div className="w-full max-w-3xl text-center flex flex-col items-center gap-2 mb-8">
        <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-foreground flex items-center justify-center gap-2">
          <span>Penilaian Infrastruktur & Mobilitas</span>
        </h1>
        <p className="text-sm text-muted-foreground max-w-xl">
          Berikan rating 1–5 bintang dan deskripsi kondisi infrastruktur publik. Penilaian Anda akan mengkalkulasi Skor Wilayah dan Klasifikasi Bina (Adibina, Swabina, Purwabina, Rentanbina, Nirbina).
        </p>
      </div>

      {/* Alert Banners */}
      {errorMsg && (
        <div className="w-full max-w-5xl mb-6 p-4 rounded-xl bg-destructive/10 border border-destructive/30 text-destructive flex items-start gap-3 animate-in fade-in slide-in-from-top-2">
          <AlertCircle className="w-5 h-5 shrink-0 mt-0.5" />
          <div className="text-xs font-semibold">{errorMsg}</div>
        </div>
      )}

      {successMsg && (
        <div className="w-full max-w-5xl mb-6 p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-600 dark:text-emerald-400 flex items-center justify-between gap-3 animate-in fade-in slide-in-from-top-2">
          <div className="flex items-center gap-3">
            <CheckCircle2 className="w-5 h-5 shrink-0 text-emerald-500" />
            <span className="text-xs font-semibold">{successMsg}</span>
          </div>
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={() => router.push("/peta")}
            className="text-xs border-emerald-500/30 hover:bg-emerald-500/10"
          >
            Lihat di Peta Spasial
          </Button>
        </div>
      )}

      {/* Main Form Container */}
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-5xl grid grid-cols-1 lg:grid-cols-12 gap-8 items-start"
      >
        {/* Left Column: Media & Map (5 Cols) */}
        <div className="lg:col-span-5 flex flex-col gap-6">
          {/* Upload Foto (WAJIB) */}
          <div className="bg-card border border-border rounded-2xl p-5 shadow-xs flex flex-col gap-3">
            <div className="flex items-center justify-between">
              <h2 className="text-base font-semibold text-foreground flex items-center gap-2">
                <span>Bukti Foto / Video Pendukung</span>
              </h2>
              <span className="px-2 py-0.5 text-[10px] font-bold uppercase rounded-md bg-rose-500/20 text-rose-400 border border-rose-500/30">
                Wajib (Min 1 Foto)
              </span>
            </div>
            <p className="text-xs text-muted-foreground">
              Unggah minimal 1 foto/video kondisi fisik sebagai bukti validitas laporan.
            </p>
            <PhotoUploader photos={photos} onChange={setPhotos} maxPhotos={5} />
          </div>

          {/* Penanda Lokasi Peta */}
          <div className="bg-card border border-border rounded-2xl p-5 shadow-xs flex flex-col gap-3">
            <div className="flex items-center justify-between">
              <h2 className="text-base font-semibold text-foreground flex items-center gap-2">
                <MapPin className="w-4 h-4 text-primary" />
                <span>Penanda Lokasi Peta GPS</span>
              </h2>
            </div>
            <p className="text-xs text-muted-foreground">
              Klik pada titik peta tempat infrastruktur/fasilitas berada.
            </p>

            <LocationPicker
              latitude={latitude}
              longitude={longitude}
              onLocationChange={handleLocationChange}
            />

            <Field className="mt-2">
              <FieldLabel className="text-xs text-muted-foreground">
                Detail Alamat / Nama Tempat / Landmark
              </FieldLabel>
              <Input
                type="text"
                value={locationDesc}
                onChange={(e) => setLocationDesc(e.target.value)}
                placeholder="Contoh: Halte Bus Unair Kampus C / Jl. Gunung Anyar Timur"
              />
            </Field>
          </div>
        </div>

        {/* Right Column: Rating & Classification Form Inputs (7 Cols) */}
        <div className="lg:col-span-7 bg-card border border-border rounded-2xl p-6 shadow-xs">
          <FieldGroup className="space-y-6">
            {/* 1. Klasifikasi Kategori & Fasilitas */}
            <div className="space-y-4 p-4 rounded-xl bg-accent/30 border border-border">
              <h3 className="font-bold text-sm text-foreground flex items-center gap-2">
                <Building2 className="w-4 h-4 text-indigo-400" />
                <span>1. Klasifikasi Kategori Infrastruktur</span>
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Select Kategori Utama */}
                <Field>
                  <FieldLabel className="text-xs font-semibold">Kategori Utama</FieldLabel>
                  <select
                    value={selectedCategoryCode}
                    onChange={(e) => handleCategoryChange(e.target.value)}
                    className="w-full bg-background border border-input rounded-lg px-3 py-2 text-xs font-medium text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                  >
                    {INFRASTRUCTURE_CLASSIFICATION.map((cat) => (
                      <option key={cat.id} value={cat.id}>
                        {cat.icon} {cat.name}
                      </option>
                    ))}
                  </select>
                </Field>

                {/* Select Fasilitas / Tempat */}
                <Field>
                  <FieldLabel className="text-xs font-semibold">Fasilitas / Tempat</FieldLabel>
                  <select
                    value={selectedFacilityId}
                    onChange={(e) => handleFacilityChange(e.target.value)}
                    className="w-full bg-background border border-input rounded-lg px-3 py-2 text-xs font-medium text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                  >
                    {currentCategory.facilities.map((fac) => (
                      <option key={fac.id} value={fac.id}>
                        {fac.name}
                      </option>
                    ))}
                  </select>
                </Field>
              </div>

              {/* Select Sub-Part / Aspek Penilaian */}
              <Field>
                <FieldLabel className="text-xs font-semibold flex items-center gap-1.5">
                  <Sliders className="w-3.5 h-3.5 text-amber-400" />
                  <span>Sub-Part / Aspek Penilaian Spesifik</span>
                </FieldLabel>
                <select
                  value={selectedAspect}
                  onChange={(e) => setSelectedAspect(e.target.value)}
                  className="w-full bg-background border border-input rounded-lg px-3 py-2 text-xs font-medium text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                >
                  {currentFacility.aspects.map((asp) => (
                    <option key={asp.id} value={asp.name}>
                      {asp.name}
                    </option>
                  ))}
                </select>
              </Field>
            </div>

            {/* 2. Rating 1 - 5 Bintang ⭐ */}
            <div className="space-y-3 p-4 rounded-xl bg-accent/40 border border-border">
              <div className="flex items-center justify-between">
                <FieldLabel className="text-sm font-bold flex items-center gap-2">
                  <span>2. Penilaian Rating (1 – 5 Bintang)</span>
                </FieldLabel>

                {/* Live Skor Conversion & Bina Predicate */}
                <span
                  className={`px-3 py-1 rounded-full text-xs font-extrabold border ${activeBinaClassification.bgColor} ${activeBinaClassification.textColor} ${activeBinaClassification.borderColor}`}
                >
                  Skor: {rating * 20}/100 • {activeBinaClassification.predicate}
                </span>
              </div>

              {/* Interactive Star Buttons */}
              <div className="flex items-center gap-2 py-2">
                {[1, 2, 3, 4, 5].map((star) => {
                  const active = (hoverRating || rating) >= star
                  return (
                    <button
                      key={star}
                      type="button"
                      onClick={() => setRating(star)}
                      onMouseEnter={() => setHoverRating(star)}
                      onMouseLeave={() => setHoverRating(0)}
                      className="p-1 rounded-lg transition-transform hover:scale-125 focus:outline-none"
                    >
                      <Star
                        className={`w-8 h-8 ${
                          active
                            ? "fill-amber-400 text-amber-400 drop-shadow-md"
                            : "text-muted-foreground/40"
                        }`}
                      />
                    </button>
                  )
                })}
                <span className="ml-3 font-bold text-sm text-foreground">
                  {rating === 1 && "⭐ 1 (Sangat Buruk / Nirbina)"}
                  {rating === 2 && "⭐⭐ 2 (Buruk / Rentanbina)"}
                  {rating === 3 && "⭐⭐⭐ 3 (Sedang / Purwabina)"}
                  {rating === 4 && "⭐⭐⭐⭐ 4 (Baik / Swabina)"}
                  {rating === 5 && "⭐⭐⭐⭐⭐ 5 (Sangat Baik / Adibina)"}
                </span>
              </div>
            </div>

            {/* 3. Judul Laporan */}
            <Field>
              <FieldLabel className="text-sm font-semibold">Judul Ringkas Laporan / Penilaian *</FieldLabel>
              <Input
                id="judul-laporan"
                type="text"
                required
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Contoh: Kondisi Trotoar Rusak dan Berlubang di Depan Halte"
              />
            </Field>

            {/* 4. Deskripsi Detail Kondisi */}
            <Field>
              <FieldLabel className="text-sm font-semibold">Deskripsi Detail Kondisi *</FieldLabel>
              <Textarea
                required
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Jelaskan secara rinci kondisi fisik, kendala pelayanan, atau masalah yang Anda temukan pada aspek fasilitas tersebut..."
                className="min-h-32 resize-y text-xs"
              />
            </Field>

            {/* Tag Laporan */}
            <Field>
              <FieldLabel className="text-sm font-semibold">Tag Laporan (Opsional)</FieldLabel>
              <AddTag tags={tags} setTags={setTags} />
            </Field>

            {/* Form Submit Button */}
            <div className="pt-4 border-t border-border flex justify-end">
              <Button
                type="submit"
                disabled={isSubmitting}
                className="w-full sm:w-auto px-6 py-2.5 text-xs font-semibold flex items-center justify-center gap-2 bg-indigo-600 hover:bg-indigo-500 text-white"
              >
                {isSubmitting ? (
                  <>
                    <span className="w-3.5 h-3.5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    Kirim Penilaian...
                  </>
                ) : (
                  <>
                    <Send className="w-3.5 h-3.5" />
                    Kirim Penilaian & Laporan
                  </>
                )}
              </Button>
            </div>
          </FieldGroup>
        </div>
      </form>
    </main>
  )
}