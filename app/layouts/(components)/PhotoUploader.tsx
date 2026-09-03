"use client"

import React, { ChangeEvent, useRef } from "react"
import { UploadCloud, Image as ImageIcon, X, AlertCircle } from "lucide-react"

interface PhotoUploaderProps {
  photos: string[]
  onChange: (photos: string[]) => void
  maxPhotos?: number
}

export default function PhotoUploader({
  photos = [],
  onChange,
  maxPhotos = 5,
}: PhotoUploaderProps) {
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files
    if (!files || files.length === 0) return

    const selectedFiles = Array.from(files)
    const remainingSlots = maxPhotos - photos.length
    const filesToProcess = selectedFiles.slice(0, remainingSlots)

    const newPhotoPromises = filesToProcess.map((file) => {
      return new Promise<string>((resolve, reject) => {
        const reader = new FileReader()
        reader.onload = () => resolve(reader.result as string)
        reader.onerror = (err) => reject(err)
        reader.readAsDataURL(file)
      })
    })

    Promise.all(newPhotoPromises)
      .then((base64Photos) => {
        onChange([...photos, ...base64Photos])
        if (fileInputRef.current) {
          fileInputRef.current.value = ""
        }
      })
      .catch((err) => console.error("Gagal membaca file gambar:", err))
  }

  const removePhoto = (indexToRemove: number) => {
    const updated = photos.filter((_, index) => index !== indexToRemove)
    onChange(updated)
  }

  return (
    <div className="w-full flex flex-col gap-3">
      {/* Upload Drop Area */}
      <div
        onClick={() => fileInputRef.current?.click()}
        className={`w-full min-h-[160px] p-6 border-2 border-dashed rounded-2xl flex flex-col items-center justify-center gap-2 cursor-pointer transition-all duration-200 ${
          photos.length >= maxPhotos
            ? "border-neutral-200 bg-neutral-50/50 cursor-not-allowed"
            : "border-neutral-300 hover:border-black bg-neutral-50/50 hover:bg-neutral-100/50"
        }`}
      >
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          multiple
          disabled={photos.length >= maxPhotos}
          onChange={handleFileChange}
          className="hidden"
        />

        <div className="p-3 bg-white border border-neutral-200 rounded-full text-black shadow-2xs">
          <UploadCloud className="w-6 h-6" />
        </div>

        <div className="text-center">
          <p className="text-xs font-bold text-black tracking-tight">
            {photos.length >= maxPhotos
              ? "Batas Maksimum Foto Tercapai"
              : "Klik atau Seret Foto Ke Sini"}
          </p>
          <p className="text-[11px] text-neutral-400 mt-0.5">
            PNG, JPG, WEBP hingga 5MB ({photos.length}/{maxPhotos} foto)
          </p>
        </div>
      </div>

      {/* Photo Previews */}
      {photos.length > 0 && (
        <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-3 mt-1">
          {photos.map((photo, index) => (
            <div
              key={index}
              className="relative aspect-square rounded-xl overflow-hidden border border-neutral-200 group shadow-2xs bg-neutral-100"
            >
              <img
                src={photo}
                alt={`Preview Bukti ${index + 1}`}
                className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
              />
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation()
                  removePhoto(index)
                }}
                className="absolute top-1.5 right-1.5 p-1 bg-black/80 hover:bg-black text-white rounded-full transition-all shadow-md"
                title="Hapus foto"
              >
                <X className="w-3 h-3" />
              </button>
              <div className="absolute bottom-1.5 left-1.5 bg-black/70 backdrop-blur-md px-1.5 py-0.5 rounded-md text-[9px] font-bold text-white uppercase tracking-wider">
                Foto #{index + 1}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

