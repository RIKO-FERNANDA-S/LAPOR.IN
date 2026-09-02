"use client"

import React, { ChangeEvent, useRef } from "react"
import { UploadCloud, Image as ImageIcon, X } from "lucide-react"

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
        className={`w-full min-h-[180px] p-6 border-2 border-dashed rounded-lg flex flex-col items-center justify-center gap-2 cursor-pointer transition-all ${
          photos.length >= maxPhotos
            ? "border-muted bg-muted/20 cursor-not-allowed"
            : "border-primary/30 hover:border-primary bg-primary/5 hover:bg-primary/10"
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

        <div className="p-3 bg-primary/10 rounded-full text-primary">
          <UploadCloud className="w-7 h-7" />
        </div>

        <div className="text-center">
          <p className="text-sm font-semibold text-foreground">
            {photos.length >= maxPhotos
              ? "Batas Maksimum Foto Tercapai"
              : "Klik atau Seret Foto Ke Sini"}
          </p>
          <p className="text-xs text-muted-foreground mt-0.5">
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
              className="relative aspect-square rounded-md overflow-hidden border border-border group shadow-xs bg-muted"
            >
              <img
                src={photo}
                alt={`Preview Bukti ${index + 1}`}
                className="w-full h-full object-cover transition-transform group-hover:scale-105"
              />
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation()
                  removePhoto(index)
                }}
                className="absolute top-1 right-1 p-1 bg-destructive/90 text-destructive-foreground rounded-full opacity-90 hover:opacity-100 hover:scale-110 transition-all shadow-md"
                title="Hapus foto"
              >
                <X className="w-3.5 h-3.5" />
              </button>
              <div className="absolute bottom-1 left-1 bg-background/80 backdrop-blur-xs px-1.5 py-0.5 rounded text-[10px] font-medium text-foreground">
                Foto #{index + 1}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
