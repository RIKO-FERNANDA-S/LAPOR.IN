"use client"

import { useEffect, useState } from "react"
import { MapContainer, TileLayer, Marker, Popup, useMapEvents } from "react-leaflet"
import "leaflet/dist/leaflet.css"
import L from "leaflet"
import { Navigation, MapPin } from "lucide-react"

// Marker Icon Fix for Leaflet in Next.js
const customMarkerIcon = new L.Icon({
  iconUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon.png",
  shadowUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
})

interface LocationPickerProps {
  latitude: number
  longitude: number
  onLocationChange: (lat: number, lng: number) => void
}

function ClickHandler({ onLocationChange }: { onLocationChange: (lat: number, lng: number) => void }) {
  useMapEvents({
    click(e) {
      onLocationChange(e.latlng.lat, e.latlng.lng)
    },
  })
  return null
}

export default function LocationPicker({
  latitude,
  longitude,
  onLocationChange,
}: LocationPickerProps) {
  const [isLocating, setIsLocating] = useState(false)

  const handleGetCurrentLocation = () => {
    if ("geolocation" in navigator) {
      setIsLocating(true)
      navigator.geolocation.getCurrentPosition(
        (position) => {
          onLocationChange(position.coords.latitude, position.coords.longitude)
          setIsLocating(false)
        },
        (error) => {
          console.error("Gagal mendapatkan lokasi GPS:", error)
          alert("Gagal mengambil lokasi GPS Anda. Silakan klik langsung pada peta.")
          setIsLocating(false)
        },
        { enableHighAccuracy: true }
      )
    } else {
      alert("Browser Anda tidak mendukung Geolocation.")
    }
  }

  return (
    <div className="relative w-full h-72 rounded-2xl overflow-hidden border border-neutral-200 shadow-2xs group bg-neutral-100">
      <MapContainer
        center={[latitude, longitude]}
        zoom={15}
        scrollWheelZoom={true}
        className="h-full w-full z-0"
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <ClickHandler onLocationChange={onLocationChange} />
        <Marker position={[latitude, longitude]} icon={customMarkerIcon}>
          <Popup>
            <div className="text-xs font-sans">
              <strong className="block font-bold text-black mb-1">Titik Penilaian Terpilih</strong>
              <span className="font-mono text-[11px] text-neutral-600">Lat: {latitude.toFixed(6)}</span><br />
              <span className="font-mono text-[11px] text-neutral-600">Lng: {longitude.toFixed(6)}</span>
            </div>
          </Popup>
        </Marker>
      </MapContainer>

      {/* Control Overlay Buttons & Info */}
      <div className="absolute bottom-3 left-3 right-3 z-10 flex flex-wrap items-center justify-between gap-2 pointer-events-none">
        <div className="pointer-events-auto bg-white/90 backdrop-blur-md px-3.5 py-1.5 rounded-xl text-xs font-mono border border-neutral-200 shadow-2xs flex items-center gap-2 text-black font-medium">
          <MapPin className="w-3.5 h-3.5 text-black shrink-0" />
          <span>
            <strong className="text-neutral-400 font-sans font-normal">Lat:</strong> {latitude.toFixed(5)},{" "}
            <strong className="text-neutral-400 font-sans font-normal">Lng:</strong> {longitude.toFixed(5)}
          </span>
        </div>

        <button
          type="button"
          onClick={handleGetCurrentLocation}
          disabled={isLocating}
          className="pointer-events-auto bg-black text-white hover:bg-neutral-800 text-xs px-3.5 py-1.5 rounded-xl font-semibold shadow-xs transition-all flex items-center gap-1.5 disabled:opacity-50"
        >
          <Navigation className={`w-3.5 h-3.5 ${isLocating ? "animate-spin" : ""}`} />
          {isLocating ? "Mencari GPS..." : "Lokasi Saya"}
        </button>
      </div>

      <div className="absolute top-3 left-3 z-10 pointer-events-none bg-white/90 backdrop-blur-md px-3 py-1 rounded-xl text-[11px] font-medium text-neutral-600 border border-neutral-200 shadow-2xs">
        Klik lokasi pada peta untuk menandai posisi
      </div>
    </div>
  )
}

