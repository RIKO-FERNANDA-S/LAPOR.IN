import L from "leaflet";
import { SeverityLevel, ReportStatus } from "./types";

/**
 * Creates custom HTML Leaflet icon for GeoJSON POIs around Gunung Anyar.
 */
export function createPoiDivIcon(category: string, iconName?: string) {
  let bgColor = "bg-indigo-600";
  let borderColor = "border-indigo-300";
  let shadowColor = "shadow-indigo-500/40";
  let svgPath = "";

  switch (category) {
    case "Pendidikan":
      bgColor = "bg-blue-600";
      borderColor = "border-blue-300";
      shadowColor = "shadow-blue-500/40";
      // Graduation cap SVG
      svgPath = `<path d="M22 10v6M2 10l10-5 10 5-10 5z"/><path d="M6 12v5c3 3 9 3 12 0v-5"/>`;
      break;
    case "Pemerintahan":
      bgColor = "bg-purple-600";
      borderColor = "border-purple-300";
      shadowColor = "shadow-purple-500/40";
      // Building SVG
      svgPath = `<rect width="16" height="20" x="4" y="2" rx="2" ry="2"/><path d="M9 22v-4h6v4M8 6h.01M16 6h.01M8 10h.01M16 10h.01M8 14h.01M16 14h.01"/>`;
      break;
    case "Wisata & Alam":
      bgColor = "bg-emerald-600";
      borderColor = "border-emerald-300";
      shadowColor = "shadow-emerald-500/40";
      // Trees SVG
      svgPath = `<path d="M10 10v.01M7 21h10M12 21V11M4.5 11l4.5-8 4.5 8zM10.5 15l3.5-6 3.5 6z"/>`;
      break;
    case "Hunian":
      bgColor = "bg-cyan-600";
      borderColor = "border-cyan-300";
      shadowColor = "shadow-cyan-500/40";
      // Apartment building
      svgPath = `<path d="M18 20V6a2 2 0 0 0-2-2H8a2 2 0 0 0-2 2v14M2 20h20M10 12h.01M14 12h.01M10 16h.01M14 16h.01M10 8h.01M14 8h.01"/>`;
      break;
    case "Kuliner":
      bgColor = "bg-amber-600";
      borderColor = "border-amber-300";
      shadowColor = "shadow-amber-500/40";
      // Utensils SVG
      svgPath = `<path d="M18 2v20M18 8h-4V2M3 2v7c0 1.1.9 2 2 2h4a2 2 0 0 0 2-2V2M7 2v20"/>`;
      break;
    case "Kesehatan":
      bgColor = "bg-rose-600";
      borderColor = "border-rose-300";
      shadowColor = "shadow-rose-500/40";
      // Heart pulse
      svgPath = `<path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"/><path d="M12 11h.01"/>`;
      break;
    case "Perdagangan":
      bgColor = "bg-orange-600";
      borderColor = "border-orange-300";
      shadowColor = "shadow-orange-500/40";
      // Shopping bag
      svgPath = `<path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z"/><path d="M3 6h18M16 10a4 4 0 0 1-8 0"/>`;
      break;
    default:
      bgColor = "bg-indigo-600";
      borderColor = "border-indigo-300";
      shadowColor = "shadow-indigo-500/40";
      // Map pin
      svgPath = `<path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="3"/>`;
      break;
  }

  const html = `
    <div class="group relative flex items-center justify-center cursor-pointer transition-transform duration-200 hover:scale-125">
      <div class="w-8 h-8 ${bgColor} text-white rounded-full flex items-center justify-center border-2 ${borderColor} shadow-lg ${shadowColor} transition-all">
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">
          ${svgPath}
        </svg>
      </div>
      <div class="absolute -bottom-1 w-2 h-2 ${bgColor} rotate-45 border-r border-b ${borderColor}"></div>
    </div>
  `;

  return L.divIcon({
    html,
    className: "custom-poi-marker-icon",
    iconSize: [32, 36],
    iconAnchor: [16, 36],
    popupAnchor: [0, -36],
    tooltipAnchor: [0, -32]
  });
}

/**
 * Creates custom HTML Leaflet icon for Database Reports based on severity.
 */
export function createReportDivIcon(severity: SeverityLevel, status: ReportStatus) {
  let badgeColor = "bg-rose-500";
  let pulseAnimation = "animate-ping";
  let borderColor = "border-rose-200";
  let glowColor = "shadow-rose-500/50";

  switch (severity) {
    case "KRITIS":
      badgeColor = "bg-red-600";
      pulseAnimation = "animate-ping";
      borderColor = "border-red-200";
      glowColor = "shadow-red-600/60 ring-2 ring-red-400";
      break;
    case "TINGGI":
      badgeColor = "bg-orange-500";
      pulseAnimation = "animate-pulse";
      borderColor = "border-orange-200";
      glowColor = "shadow-orange-500/50";
      break;
    case "SEDANG":
      badgeColor = "bg-amber-500";
      pulseAnimation = "";
      borderColor = "border-amber-200";
      glowColor = "shadow-amber-500/40";
      break;
    case "RENDAH":
      badgeColor = "bg-emerald-500";
      pulseAnimation = "";
      borderColor = "border-emerald-200";
      glowColor = "shadow-emerald-500/40";
      break;
  }

  const isResolved = status === "SELESAI";
  if (isResolved) {
    badgeColor = "bg-sky-600";
    pulseAnimation = "";
    borderColor = "border-sky-200";
    glowColor = "shadow-sky-500/30";
  }

  const html = `
    <div class="group relative flex items-center justify-center cursor-pointer transition-transform duration-200 hover:scale-125">
      ${
        pulseAnimation
          ? `<span class="absolute inline-flex h-9 w-9 rounded-full ${badgeColor} opacity-75 ${pulseAnimation}"></span>`
          : ""
      }
      <div class="relative w-9 h-9 ${badgeColor} text-white rounded-full flex items-center justify-center border-2 ${borderColor} shadow-xl ${glowColor} transition-all">
        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
          ${
            isResolved
              ? `<path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/>`
              : `<path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/>`
          }
        </svg>
      </div>
      <div class="absolute -bottom-1 w-2.5 h-2.5 ${badgeColor} rotate-45 border-r border-b ${borderColor}"></div>
    </div>
  `;

  return L.divIcon({
    html,
    className: "custom-report-marker-icon",
    iconSize: [36, 40],
    iconAnchor: [18, 40],
    popupAnchor: [0, -40],
    tooltipAnchor: [0, -36]
  });
}

/**
 * Calculates distance in meters between two geographical points using Haversine formula.
 */
export function getDistanceInMeters(
  lat1: number,
  lon1: number,
  lat2: number,
  lon2: number
): number {
  const R = 6371e3; // Earth radius in meters
  const φ1 = (lat1 * Math.PI) / 180;
  const φ2 = (lat2 * Math.PI) / 180;
  const Δφ = ((lat2 - lat1) * Math.PI) / 180;
  const Δλ = ((lon2 - lon1) * Math.PI) / 180;

  const a =
    Math.sin(Δφ / 2) * Math.sin(Δφ / 2) +
    Math.cos(φ1) * Math.cos(φ2) * Math.sin(Δλ / 2) * Math.sin(Δλ / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

  return R * c;
}

/**
 * Formats distance in meters into human readable string (e.g. "250 m" or "1.4 km").
 */
export function formatDistance(meters: number): string {
  if (meters < 1000) {
    return `${Math.round(meters)} m`;
  }
  return `${(meters / 1000).toFixed(1)} km`;
}

