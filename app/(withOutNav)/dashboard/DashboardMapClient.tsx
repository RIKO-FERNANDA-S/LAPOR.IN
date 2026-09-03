"use client";

import { useEffect, useRef } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

interface DashboardMapProps {
  userLocation: {
    lat: number;
    lng: number;
    name?: string;
  };
  reports?: Array<{
    id: number;
    latitude: number;
    longitude: number;
    description: string;
    location_description?: string | null;
    status: string;
    severity_level?: string;
    rating?: number;
    sub_category?: { name: string } | null;
  }>;
  selectedReportId?: number | null;
  onSelectReport?: (reportId: number) => void;
  height?: string;
}

// Controller to auto-center map when user location or focus changes
function MapRecenter({ lat, lng }: { lat: number; lng: number }) {
  const map = useMap();
  useEffect(() => {
    map.flyTo([lat, lng], map.getZoom(), { animate: true, duration: 1.2 });
  }, [lat, lng, map]);
  return null;
}

// Custom SVG Icons for User Location Pin & Report Marker Pins
const createUserIcon = () =>
  L.divIcon({
    className: "custom-user-pin",
    html: `
      <div class="relative flex items-center justify-center">
        <span class="absolute w-8 h-8 rounded-full bg-blue-500/30 animate-ping"></span>
        <div class="w-7 h-7 bg-blue-600 border-2 border-white rounded-full flex items-center justify-center shadow-lg text-white font-bold text-xs">
          📍
        </div>
      </div>
    `,
    iconSize: [28, 28],
    iconAnchor: [14, 14],
  });

const createReportIcon = (status: string, severity?: string) => {
  let bgColor = "bg-amber-500";
  let border = "border-amber-200";
  let symbol = "⚠️";

  if (status === "DIVERIFIKASI" || status === "SELESAI") {
    bgColor = "bg-emerald-600";
    border = "border-emerald-200";
    symbol = "✓";
  } else if (status === "DITOLAK") {
    bgColor = "bg-rose-600";
    border = "border-rose-200";
    symbol = "✕";
  } else if (severity === "KRITIS") {
    bgColor = "bg-red-600 animate-pulse";
    border = "border-red-300";
    symbol = "🔥";
  }

  return L.divIcon({
    className: "custom-report-pin",
    html: `
      <div class="w-6 h-6 ${bgColor} ${border} border-2 rounded-full flex items-center justify-center shadow-md text-white text-[10px] font-bold">
        ${symbol}
      </div>
    `,
    iconSize: [24, 24],
    iconAnchor: [12, 12],
  });
};

export default function DashboardMapClient({
  userLocation,
  reports = [],
  selectedReportId,
  onSelectReport,
  height = "h-[340px]",
}: DashboardMapProps) {
  const userIcon = useRef(createUserIcon());

  return (
    <div className={`w-full ${height} rounded-2xl overflow-hidden border border-neutral-200 shadow-sm relative z-0`}>
      <MapContainer
        center={[userLocation.lat, userLocation.lng]}
        zoom={14}
        zoomControl={true}
        scrollWheelZoom={true}
        className="w-full h-full"
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        <MapRecenter lat={userLocation.lat} lng={userLocation.lng} />

        {/* User Location Marker */}
        <Marker position={[userLocation.lat, userLocation.lng]} icon={userIcon.current}>
          <Popup>
            <div className="p-1 font-sans">
              <span className="text-[10px] font-bold uppercase tracking-wider text-blue-600 bg-blue-50 px-2 py-0.5 rounded">
                Lokasi Anda
              </span>
              <h4 className="font-semibold text-sm text-black mt-1">
                {userLocation.name || "Titik Pengguna Saat Ini"}
              </h4>
              <p className="text-xs text-neutral-500 font-mono mt-0.5">
                {userLocation.lat.toFixed(5)}, {userLocation.lng.toFixed(5)}
              </p>
            </div>
          </Popup>
        </Marker>

        {/* Reports Markers */}
        {reports.map((rep) => (
          <Marker
            key={rep.id}
            position={[rep.latitude, rep.longitude]}
            icon={createReportIcon(rep.status, rep.severity_level)}
            eventHandlers={{
              click: () => {
                if (onSelectReport) onSelectReport(rep.id);
              },
            }}
          >
            <Popup>
              <div className="p-1 font-sans max-w-[220px]">
                <div className="flex items-center gap-1.5 mb-1">
                  <span
                    className={`text-[10px] font-semibold px-2 py-0.5 rounded ${
                      rep.status === "DIVERIFIKASI" || rep.status === "SELESAI"
                        ? "bg-emerald-100 text-emerald-800"
                        : rep.status === "DITOLAK"
                        ? "bg-rose-100 text-rose-800"
                        : "bg-amber-100 text-amber-800"
                    }`}
                  >
                    {rep.status}
                  </span>
                  {rep.rating && (
                    <span className="text-xs text-amber-500 font-bold">
                      {"★".repeat(rep.rating)}
                    </span>
                  )}
                </div>
                <h5 className="font-bold text-xs text-black">
                  {rep.location_description || rep.sub_category?.name || "Laporan Infrastruktur"}
                </h5>
                <p className="text-xs text-neutral-600 line-clamp-2 mt-1">
                  {rep.description}
                </p>
              </div>
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
}
