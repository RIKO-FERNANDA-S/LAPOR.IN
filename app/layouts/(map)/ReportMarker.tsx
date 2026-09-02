"use client";

import { Marker, Popup, Tooltip } from "react-leaflet";
import { DbReport } from "./types";
import { createReportDivIcon } from "./markerUtils";

interface ReportMarkerProps {
  reports: DbReport[];
  visible?: boolean;
  onSelectReport?: (report: DbReport) => void;
}

export default function ReportMarker({
  reports,
  visible = true,
  onSelectReport,
}: ReportMarkerProps) {
  if (!visible || !Array.isArray(reports) || reports.length === 0) {
    return null;
  }

  const getSeverityBadgeClass = (severity: string) => {
    switch (severity) {
      case "KRITIS":
        return "bg-red-500/20 text-red-400 border-red-500/40";
      case "TINGGI":
        return "bg-orange-500/20 text-orange-400 border-orange-500/40";
      case "SEDANG":
        return "bg-amber-500/20 text-amber-400 border-amber-500/40";
      default:
        return "bg-emerald-500/20 text-emerald-400 border-emerald-500/40";
    }
  };

  const getStatusBadgeClass = (status: string) => {
    switch (status) {
      case "SELESAI":
        return "bg-sky-500/20 text-sky-400 border-sky-500/40";
      case "DIPROSES":
        return "bg-purple-500/20 text-purple-400 border-purple-500/40";
      case "DIVERIFIKASI":
        return "bg-blue-500/20 text-blue-400 border-blue-500/40";
      case "DITOLAK":
        return "bg-slate-500/20 text-slate-400 border-slate-500/40";
      default:
        return "bg-amber-500/20 text-amber-400 border-amber-500/40";
    }
  };

  return (
    <>
      {reports.map((report) => {
        if (typeof report.latitude !== "number" || typeof report.longitude !== "number") {
          return null;
        }

        const position: [number, number] = [report.latitude, report.longitude];
        const markerIcon = createReportDivIcon(report.severity_level, report.status);
        const reporterName = report.user?.name || "Warga Anonim";
        const subCatName = report.sub_category?.name || "Laporan Fasilitas";
        const photoUrl = report.photo_urls && report.photo_urls.length > 0 ? report.photo_urls[0] : null;

        return (
          <Marker
            key={`report-${report.id}`}
            position={position}
            icon={markerIcon}
            eventHandlers={{
              click: () => {
                if (onSelectReport) onSelectReport(report);
              },
            }}
          >
            {/* HOVER TOOLTIP (DATA REALTIME LAPORAN) */}
            <Tooltip
              direction="top"
              offset={[0, -36]}
              opacity={0.98}
              className="custom-leaflet-tooltip"
            >
              <div className="p-3.5 max-w-xs bg-white backdrop-blur-md text-slate-800 rounded-xl shadow-2xl border border-slate-800 font-sans">
                <div className="flex items-center justify-between gap-2 mb-2">
                  <span
                    className={`px-2 py-0.5 text-[10px] font-bold tracking-wide uppercase rounded-full border ${getSeverityBadgeClass(
                      report.severity_level
                    )}`}
                  >
                    🚨 {report.severity_level}
                  </span>
                  <span
                    className={`px-2 py-0.5 text-[10px] font-medium rounded-full border ${getStatusBadgeClass(
                      report.status
                    )}`}
                  >
                    {report.status}
                  </span>
                </div>

                <h4 className="font-bold text-sm text-slate-800 line-clamp-1 leading-snug">
                  {report.description}
                </h4>

                {photoUrl && (
                  <div className="mt-2 relative w-full h-24 rounded-lg overflow-hidden border border-slate-800 bg-slate-900">
                    <img
                      src={photoUrl}
                      alt="Pratinjau Laporan"
                      className="w-full h-full object-cover"
                    />
                  </div>
                )}

                <div className="mt-2.5 pt-2 border-t border-slate-800/80 space-y-1 text-[11px] text-slate-300">
                  <div className="flex justify-between items-center text-slate-400">
                    <span>Pelapor: <strong className="text-slate-700">{reporterName}</strong></span>
                    <span className="text-[10px] font-mono">
                      {new Date(report.reported_at || report.report_date).toLocaleDateString("id-ID", {
                        day: "numeric",
                        month: "short",
                      })}
                    </span>
                  </div>
                  <div className="text-slate-400 truncate">
                    📍 {report.location_description || `${report.region?.district || "Gunung Anyar"}, Surabaya`}
                  </div>
                </div>

                <div className="mt-2 text-center text-[10px] font-medium text-emerald-400">
                  ⚡ Terhubung Realtime DB • Klik untuk detail
                </div>
              </div>
            </Tooltip>

            {/* POPUP CARD ON CLICK */}
            <Popup className="custom-leaflet-popup">
              <div className="p-4 max-w-sm rounded-lg shadow-xl font-sans">
                <div className="flex items-center justify-between gap-2 mb-2">
                  <span
                    className={`px-2.5 py-0.5 text-xs font-bold rounded-md border ${getSeverityBadgeClass(
                      report.severity_level
                    )}`}
                  >
                    Tingkat: {report.severity_level}
                  </span>
                  <span
                    className={`px-2.5 py-0.5 text-xs font-semibold rounded-md border ${getStatusBadgeClass(
                      report.status
                    )}`}
                  >
                    {report.status}
                  </span>
                </div>

                <h3 className="font-bold text-base text-slate-900 mb-2 leading-snug">
                  {report.description}
                </h3>

                {photoUrl && (
                  <div className="mb-3 w-full h-36 rounded-lg overflow-hidden border border-slate-200 dark:border-slate-800 bg-slate-100 dark:bg-slate-800">
                    <img
                      src={photoUrl}
                      alt="Foto Laporan Warga"
                      className="w-full h-full object-cover"
                    />
                  </div>
                )}

                <div className="space-y-1.5 text-xs text-slate-600 dark:text-slate-800 p-3 rounded-lg border border-slate-100 dark:border-slate-800/80 mb-3">
                  <div>
                    <strong className="text-slate-900 ">Kategori:</strong>{" "}
                    {subCatName}
                  </div>
                  <div>
                    <strong className="text-slate-900 ">Pelapor:</strong>{" "}
                    {reporterName}
                  </div>
                  <div>
                    <strong className="text-slate-900 ">Lokasi:</strong>{" "}
                    {report.location_description || "Lokasi terpilih"}
                  </div>
                  <div className="font-mono text-[11px] text-slate-500 dark:text-slate-400">
                    GPS: {report.latitude.toFixed(5)}, {report.longitude.toFixed(5)}
                  </div>
                </div>

                <div className="flex items-center justify-between text-xs text-slate-500 dark:text-slate-400 pt-2 border-t border-slate-100 dark:border-slate-800">
                  <span>Waktu: {new Date(report.reported_at).toLocaleString("id-ID")}</span>
                </div>
              </div>
            </Popup>
          </Marker>
        );
      })}
    </>
  );
}