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
    <div className="relative w-full h-72 rounded-lg overflow-hidden border border-border shadow-inner group">
      <MapContainer
        center={[latitude, longitude]}
        zoom={15}
        scrollWheelZoom={true}
        className="h-full w-full z-0"
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <ClickHandler onLocationChange={onLocationChange} />
        <Marker position={[latitude, longitude]} icon={customMarkerIcon}>
          <Popup>
            <div className="text-xs">
              <strong className="block font-semibold text-primary">Titik Lokasi Terpilih</strong>
              <span>Lat: {latitude.toFixed(6)}</span><br />
              <span>Lng: {longitude.toFixed(6)}</span>
            </div>
          </Popup>
        </Marker>
      </MapContainer>

      {/* Control Overlay Buttons & Info */}
      <div className="absolute bottom-3 left-3 right-3 z-10 flex flex-wrap items-center justify-between gap-2 pointer-events-none">
        <div className="pointer-events-auto bg-background/90 backdrop-blur-md px-3 py-1.5 rounded-md text-xs font-mono border border-border shadow-sm flex items-center gap-2 text-foreground">
          <MapPin className="w-3.5 h-3.5 text-primary shrink-0" />
          <span>
            <strong className="text-muted-foreground">Lat:</strong> {latitude.toFixed(5)},{" "}
            <strong className="text-muted-foreground">Lng:</strong> {longitude.toFixed(5)}
          </span>
        </div>

        <button
          type="button"
          onClick={handleGetCurrentLocation}
          disabled={isLocating}
          className="pointer-events-auto bg-primary text-primary-foreground hover:bg-primary/90 text-xs px-3 py-1.5 rounded-md font-medium shadow-sm transition-all flex items-center gap-1.5 disabled:opacity-50"
        >
          <Navigation className={`w-3.5 h-3.5 ${isLocating ? "animate-spin" : ""}`} />
          {isLocating ? "Mencari Lokasi..." : "Lokasi Saya"}
        </button>
      </div>

      <div className="absolute top-3 left-3 z-10 pointer-events-none bg-background/80 backdrop-blur-sm px-2.5 py-1 rounded text-[11px] font-medium text-muted-foreground border border-border shadow-xs">
        Klik di mana saja pada peta untuk menandai titik lokasi
      </div>
    </div>
  )
}
