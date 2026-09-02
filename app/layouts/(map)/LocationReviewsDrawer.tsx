"use client";

import { useState } from "react";
import {
  MapPin,
  X,
  User,
  Clock,
  PlusCircle,
  Eye,
  Navigation,
  MessageSquareText,
  Building2,
  Star,
  Sliders,
  CheckCircle2,
  AlertTriangle,
} from "lucide-react";
import { DbReport } from "./types";
import { getDistanceInMeters, formatDistance } from "./markerUtils";
import { calculatePlaceRatingAndScore, getBinaClassification } from "@/lib/binaScoring";
import Link from "next/link";

export interface ClickedLocation {
  lat: number;
  lng: number;
  title: string;
  category?: string;
  address?: string;
}

interface LocationReviewsDrawerProps {
  location: ClickedLocation | null;
  reports: DbReport[];
  onClose: () => void;
  onSelectReport?: (report: DbReport) => void;
}

export default function LocationReviewsDrawer({
  location,
  reports,
  onClose,
  onSelectReport,
}: LocationReviewsDrawerProps) {
  const [selectedPhoto, setSelectedPhoto] = useState<string | null>(null);

  if (!location) return null;

  // Calculate distance for all reports and filter nearby / sort by distance
  const reportsWithDistance = reports
    .map((rep) => {
      const distance = getDistanceInMeters(
        location.lat,
        location.lng,
        rep.latitude,
        rep.longitude
      );
      return { report: rep, distance };
    })
    .sort((a, b) => a.distance - b.distance);

  // Consider reports within ~2.5km radius as relevant to the location
  const nearbyReports = reportsWithDistance.filter(
    (item) => item.distance <= 2500
  );

  // Extract ratings for aggregated place score calculation
  const placeRatings = nearbyReports.map((item) => item.report.rating || 4);
  const placeStats = calculatePlaceRatingAndScore(placeRatings);

  const getSeverityBadge = (severity: string) => {
    switch (severity) {
      case "KRITIS":
        return "text-rose-600 border-rose-500";
      case "TINGGI":
        return "text-orange-600 border-orange-500";
      case "SEDANG":
        return " text-amber-600 border-amber-500";
      default:
        return "text-emerald-600 border-emerald-500";
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "SELESAI":
        return "bg-sky-500/20 text-sky-300 border-sky-500/40";
      case "DIPROSES":
        return "bg-purple-500/20 text-purple-300 border-purple-500/40";
      case "DIVERIFIKASI":
        return "bg-indigo-500/20 text-indigo-300 border-indigo-500/40";
      case "DITOLAK":
        return "bg-slate-500/20 text-slate-300 border-slate-500/40";
      default:
        return "bg-amber-500/20 text-amber-300 border-amber-500/40";
    }
  };

  return (
    <div  className="absolute top-1 left-4 z-5000 max-w-md w-full min-h-[98vh] font-sans ml-5">
      {/* Lightbox photo viewer */}
      {selectedPhoto && (
        <div
          className="absolute inset-0 z-3000 bg-black/90 backdrop-blur-md flex items-center justify-center p-4"
          onClick={() => setSelectedPhoto(null)}
        >
          <div className="relative max-w-4xl max-h-[90vh] w-full flex flex-col items-center">
            <button
              onClick={() => setSelectedPhoto(null)}
              className="absolute -top-10 right-0 p-2 text-white/80 hover:text-white bg-slate-800/80 rounded-full"
            >
              <X className="w-6 h-6" />
            </button>
            <img
              src={selectedPhoto}
              alt="Foto Dokumentasi Laporan"
              className="max-h-[85vh] w-auto object-contain rounded-xl shadow-2xl border border-slate-800"
            />
          </div>
        </div>
      )}

      {/* Floating Side Drawer */}
      <div className="absolute right-4 top-4 bottom-4 z-1000 w-full max-w-md bg-white backdrop-blur-xl border border-slate-800 shadow-2xl rounded-3xl flex flex-col overflow-hidden text-slate-100 font-sans transition-all animate-in fade-in slide-in-from-left-4 slide-out-to-left-4">
        {/* Drawer Header */}
        <div className="p-4 border-b border-slate-800/80 bg-slate-800 flex items-start justify-between gap-3">
          <div className="flex items-start gap-3">
            <div className="p-2.5 rounded-2xl bg-indigo-500/20 border border-indigo-500/30 text-indigo-400 shrink-0 mt-0.5">
              <Building2 className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2 mb-0.5">
                {location.category && (
                  <span className="px-2 py-0.5 text-[10px] font-bold tracking-wide uppercase bg-indigo-600/30 text-indigo-300 rounded-full border border-indigo-500/30">
                    {location.category}
                  </span>
                )}
                <span className="text-[10px] text-slate-400 font-mono">
                  📍 {location.lat.toFixed(4)}, {location.lng.toFixed(4)}
                </span>
              </div>
              <h2 className="font-extrabold text-base text-slate-100 leading-snug">
                {location.title}
              </h2>
              <p className="text-xs text-slate-400 mt-0.5">
                {location.address || "Kecamatan Gunung Anyar, Kota Surabaya"}
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-xl bg-slate-800/80 hover:bg-slate-800 text-slate-400 hover:text-white transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Aggregated Place Score & Bina Classification Card */}
        {nearbyReports.length > 0 && (
          <div className="p-3.5 mx-4 mt-3 flex items-center justify-between gap-3">
            <div className="flex items-center gap-3">
              <div className="flex flex-col items-center justify-center p-2 rounded-xl border border-slate-800 min-w-16">
                <div className="flex items-center text-amber-400 gap-1 text-sm font-black">
                  <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
                  <span>{placeStats.avgRating}</span>
                </div>
                <span className="text-[9px] text-slate-800 font-medium">
                  {placeStats.totalReviewers} Penilai
                </span>
              </div>

              <div>
                <div className="flex items-center gap-1.5">
                  <span className="text-xs font-semibold text-slate-800">
                    Skor Fasilitas:
                  </span>
                  <span className="text-sm font-extrabold text-slate-500">
                    {placeStats.score} / 100
                  </span>
                </div>
                <p className="text-[11px] text-slate-500 line-clamp-1">
                  {placeStats.classification.meaning}
                </p>
              </div>
            </div>

            {/* Bina Classification Badge */}
            <span
              className={`px-3 py-1.5 rounded-full text-xs font-black border ${placeStats.classification.bgColor} ${placeStats.classification.textColor} ${placeStats.classification.borderColor} shrink-0`}
            >
              {placeStats.classification.starIcon}
            </span>
          </div>
        )}

        {/* Action Header / Add Report Button */}
        <div className="p-5 px-4 border-y border-slate-800/60 flex items-center justify-between gap-2 mt-2">
          <div className="flex items-center gap-1.5 text-xs text-slate-300 font-medium">
            <MessageSquareText className="w-4 h-4 text-emerald-600" />
            <span className="text-slate-700">
              {nearbyReports.length > 0
                ? `${nearbyReports.length} Ulasan & Laporan Warga`
                : "Belum Ada Laporan"}
            </span>
          </div>

          <Link
            href={`/ajuan?lat=${location.lat}&lng=${location.lng}`}
            className="px-3 py-1.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold flex items-center gap-1.5 transition-all shadow-sm shadow-slate-800/30"
          >
            <PlusCircle className="w-3.5 h-3.5" />
            <span>Lapor Tempat Ini</span>
          </Link>
        </div>

        {/* Reports / Reviews List Content */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4 divide-y divide-slate-800/50 no-scrollbar">
          {nearbyReports.length === 0 ? (
            <div className="py-12 px-4 text-center flex flex-col items-center gap-3">
              <div className="w-12 h-12 rounded-full bg-slate-800/80 border border-slate-700 flex items-center justify-center text-slate-400">
                <MessageSquareText className="w-6 h-6" />
              </div>
              <div className="space-y-1">
                <h4 className="font-bold text-sm text-slate-200">
                  Belum ada ulasan di tempat ini
                </h4>
                <p className="text-xs text-slate-400 max-w-xs">
                  Jadilah warga pertama yang memberikan rating bintang 1–5 dan ulasan kondisi infrastruktur di lokasi ini.
                </p>
              </div>
              <Link
                href={`/ajuan?lat=${location.lat}&lng=${location.lng}`}
                className="mt-2 px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-semibold flex items-center gap-2 transition-all shadow-lg shadow-emerald-600/30"
              >
                <PlusCircle className="w-4 h-4" />
                <span>Buat Penilaian Pertama</span>
              </Link>
            </div>
          ) : (
            nearbyReports.map(({ report: rep, distance }, index) => {
              const reporterName = rep.user?.name || "Warga Anonim";
              const subCategoryName = rep.sub_category?.name || "Laporan Umum";
              const hasPhotos = rep.photo_urls && rep.photo_urls.length > 0;
              const repRating = rep.rating || 4;

              return (
                <div
                  key={rep.id || index}
                  className={`${
                    index > 0 ? "pt-4" : ""
                  } space-y-2.5 group transition-colors`}
                >
                  {/* Reporter & Star Rating header */}
                  <div className="flex items-start justify-between gap-2">
                    <div className="flex items-center gap-2.5">
                      <div className="w-8 h-8 rounded-full bg-slate-800 border border-slate-700 flex items-center justify-center text-indigo-400 font-bold text-xs">
                        {reporterName.charAt(0).toUpperCase()}
                      </div>
                      <div>
                        <h4 className="font-bold text-xs text-slate-800 flex items-center gap-1.5">
                          {reporterName}
                        </h4>
                        <div className="flex items-center gap-1">
                          {/* Render Rating Stars */}
                          <div className="flex items-center text-amber-400">
                            {[1, 2, 3, 4, 5].map((star) => (
                              <Star
                                key={star}
                                className={`w-3 h-3 ${
                                  star <= repRating
                                    ? "fill-amber-400 text-amber-400"
                                    : "text-slate-700"
                                }`}
                              />
                            ))}
                          </div>
                          <span className="text-[10px] text-slate-400 font-medium">
                            • {repRating * 20}/100
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Proximity Pill */}
                    <div className="px-2.5 py-1 rounded-full  border border-slate-700 text-[10px] font-semibold text-slate-800 flex items-center gap-1">
                      <Navigation className="w-3 h-3 text-slate-500" />
                      <span>{formatDistance(distance)}</span>
                    </div>
                  </div>

                  {/* Sub-Part / Aspect & Category Badges */}
                  <div className="flex flex-wrap items-center gap-1.5 text-[10px]">
                    {rep.aspect && (
                      <span className="px-2 py-0.5 rounded-md border-indigo-700 text-indigo-600 font-semibold border flex items-center gap-1">
                        <Sliders className="w-2.5 h-2.5" />
                        {rep.aspect}
                      </span>
                    )}
                    <span className="px-2 py-0.5 rounded-md border-slate-800 text-slate-700 font-medium border ">
                      {subCategoryName}
                    </span>
                    <span
                      className={`px-2 py-0.5 font-bold rounded-md border ${getSeverityBadge(
                        rep.severity_level
                      )}`}
                    >
                      {rep.severity_level}
                    </span>
                    <span
                      className={`px-2 py-0.5 font-medium rounded-md border ${getStatusBadge(
                        rep.status
                      )}`}
                    >
                      {rep.status}
                    </span>
                  </div>

                  {/* Report Description / Review text */}
                  <p className="text-xs text-slate-800 leading-relaxed font-normal p-3 rounded-xl border border-slate-800/80">
                    "{rep.description}"
                  </p>

                  {/* Photo Thumbnails */}
                  {hasPhotos && (
                    <div className="flex items-center gap-2 pt-1 overflow-x-auto">
                      {rep.photo_urls.map((photo, pIdx) => (
                        <button
                          key={pIdx}
                          onClick={() => setSelectedPhoto(photo)}
                          className="relative w-16 h-16 rounded-xl overflow-hidden border border-slate-700/80 bg-slate-950 shrink-0 group/img hover:border-indigo-500 transition-all"
                        >
                          <img
                            src={photo}
                            alt={`Foto Penilaian ${pIdx + 1}`}
                            className="w-full h-full object-cover group-hover/img:scale-110 transition-transform duration-300"
                          />
                          <div className="absolute inset-0 bg-black/30 opacity-0 group-hover/img:opacity-100 flex items-center justify-center text-white transition-opacity">
                            <Eye className="w-4 h-4" />
                          </div>
                        </button>
                      ))}
                    </div>
                  )}

                  {/* Date & focus trigger */}
                  <div className="flex items-center justify-between pt-1 text-[10px] text-slate-400">
                    <span className="flex items-center gap-1">
                      <Clock className="w-3 h-3 text-slate-500" />
                      {new Date(
                        rep.reported_at || rep.report_date
                      ).toLocaleDateString("id-ID", {
                        day: "numeric",
                        month: "short",
                        year: "numeric",
                      })}
                    </span>

                    {onSelectReport && (
                      <button
                        onClick={() => onSelectReport(rep)}
                        className="font-medium text-indigo-400 hover:text-indigo-300 flex items-center gap-1 transition-colors"
                      >
                        <span>Lihat Penanda</span>
                        <Navigation className="w-3 h-3" />
                      </button>
                    )}
                  </div>
                </div>
              );
            })
          )}
        </div>
      </div>
    </div>
  );
}
