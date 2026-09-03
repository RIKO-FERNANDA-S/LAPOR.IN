"use client";

import { useState } from "react";
import {
  X,
  Clock,
  PlusCircle,
  Eye,
  Navigation,
  MessageSquareText,
  Building2,
  Star,
  Sliders,
} from "lucide-react";
import { DbReport } from "./types";
import { getDistanceInMeters, formatDistance } from "./markerUtils";
import { calculatePlaceRatingAndScore } from "@/lib/binaScoring";
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
        return "bg-red-50 text-red-700 border-red-200 font-bold";
      case "TINGGI":
        return "bg-orange-50 text-orange-700 border-orange-200 font-bold";
      case "SEDANG":
        return "bg-amber-50 text-amber-700 border-amber-200 font-bold";
      default:
        return "bg-emerald-50 text-emerald-700 border-emerald-200 font-bold";
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "SELESAI":
        return "bg-sky-50 text-sky-700 border-sky-200 font-semibold";
      case "DIPROSES":
        return "bg-purple-50 text-purple-700 border-purple-200 font-semibold";
      case "DIVERIFIKASI":
        return "bg-neutral-900 text-white border-neutral-900 font-semibold";
      case "DITOLAK":
        return "bg-neutral-100 text-neutral-500 border-neutral-200 font-semibold";
      default:
        return "bg-amber-50 text-amber-700 border-amber-200 font-semibold";
    }
  };

  return (
    <>
      {/* Lightbox photo viewer */}
      {selectedPhoto && (
        <div
          className="fixed inset-0 z-5000 bg-black/80 backdrop-blur-md flex items-center justify-center p-4"
          onClick={() => setSelectedPhoto(null)}
        >
          <div className="relative max-w-4xl max-h-[90vh] w-full flex flex-col items-center">
            <button
              type="button"
              onClick={() => setSelectedPhoto(null)}
              className="absolute -top-10 right-0 p-2 text-white/80 hover:text-white bg-black/60 rounded-full cursor-pointer"
            >
              <X className="w-6 h-6" />
            </button>
            <img
              src={selectedPhoto}
              alt="Foto Dokumentasi Laporan"
              className="max-h-[85vh] w-auto object-contain rounded-2xl shadow-2xl border border-neutral-800"
            />
          </div>
        </div>
      )}

      {/* Floating Side Drawer */}
      <div className="absolute left-4 top-20 bottom-6 z-1000 w-full max-w-sm sm:max-w-md bg-white/95 backdrop-blur-md border border-neutral-200/90 shadow-2xl rounded-3xl flex flex-col overflow-hidden text-neutral-900 font-sans transition-all animate-in fade-in slide-in-from-left-4">
        {/* Drawer Header */}
        <div className="p-4 border-b border-neutral-100 bg-neutral-50/80 flex items-start justify-between gap-3">
          <div className="flex items-start gap-3">
            <div className="p-2.5 rounded-2xl bg-neutral-100 border border-neutral-200 text-black shrink-0 mt-0.5">
              <Building2 className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2 mb-1">
                {location.category && (
                  <span className="px-2 py-0.5 text-[10px] font-bold uppercase bg-black text-white rounded-full">
                    {location.category}
                  </span>
                )}
                <span className="text-[10px] text-neutral-400 font-mono">
                  📍 {location.lat.toFixed(4)}, {location.lng.toFixed(4)}
                </span>
              </div>
              <h2 className="font-bold text-base text-black leading-snug tracking-tight">
                {location.title}
              </h2>
              <p className="text-xs text-neutral-500 mt-0.5">
                {location.address || "Kecamatan Gunung Anyar, Kota Surabaya"}
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="p-1.5 rounded-xl bg-neutral-100 hover:bg-neutral-200 text-neutral-600 border border-neutral-200 transition-colors cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Aggregated Place Score & Bina Classification Card */}
        {nearbyReports.length > 0 && (
          <div className="p-3.5 mx-4 mt-3 bg-neutral-50 border border-neutral-200/80 rounded-2xl flex items-center justify-between gap-3 shadow-2xs">
            <div className="flex items-center gap-3">
              <div className="flex flex-col items-center justify-center p-2 bg-black text-white rounded-xl min-w-16">
                <div className="flex items-center gap-1 text-sm font-black">
                  <Star className="w-3.5 h-3.5 fill-white text-white" />
                  <span>{placeStats.avgRating}</span>
                </div>
                <span className="text-[9px] text-neutral-400 font-medium">
                  {placeStats.totalReviewers} Penilai
                </span>
              </div>

              <div>
                <div className="flex items-center gap-1.5">
                  <span className="text-xs font-semibold text-neutral-600">
                    Skor Fasilitas:
                  </span>
                  <span className="text-sm font-extrabold text-black">
                    {placeStats.score} / 100
                  </span>
                </div>
                <p className="text-[11px] text-neutral-500 line-clamp-1">
                  {placeStats.classification.meaning}
                </p>
              </div>
            </div>

            {/* Bina Classification Badge */}
            <span className="px-3 py-1.5 rounded-full text-xs font-extrabold bg-black text-white shrink-0">
              {placeStats.classification.starIcon}
            </span>
          </div>
        )}

        {/* Action Header / Add Report Button */}
        <div className="p-3.5 px-4 border-y border-neutral-100 flex items-center justify-between gap-2 mt-3 bg-white">
          <div className="flex items-center gap-1.5 text-xs text-neutral-700 font-semibold">
            <MessageSquareText className="w-4 h-4 text-black" />
            <span>
              {nearbyReports.length > 0
                ? `${nearbyReports.length} Ulasan & Laporan Warga`
                : "Belum Ada Laporan"}
            </span>
          </div>

          <Link
            href={`/ajuan?lat=${location.lat}&lng=${location.lng}`}
            className="px-3.5 py-2 rounded-xl bg-black hover:bg-neutral-800 text-white text-xs font-bold flex items-center gap-1.5 transition-all shadow-xs cursor-pointer"
          >
            <PlusCircle className="w-3.5 h-3.5" />
            <span>Lapor Tempat Ini</span>
          </Link>
        </div>

        {/* Reports / Reviews List Content */}
        <div className="flex-1 overflow-y-auto p-4 space-y-3.5 no-scrollbar">
          {nearbyReports.length === 0 ? (
            <div className="py-12 px-4 text-center flex flex-col items-center gap-3">
              <div className="w-12 h-12 rounded-2xl bg-neutral-100 border border-neutral-200 flex items-center justify-center text-neutral-400">
                <MessageSquareText className="w-6 h-6" />
              </div>
              <div className="space-y-1">
                <h4 className="font-bold text-sm text-black">
                  Belum ada ulasan di tempat ini
                </h4>
                <p className="text-xs text-neutral-500 max-w-xs leading-relaxed">
                  Jadilah warga pertama yang memberikan rating bintang 1–5 dan ulasan kondisi infrastruktur di lokasi ini.
                </p>
              </div>
              <Link
                href={`/ajuan?lat=${location.lat}&lng=${location.lng}`}
                className="mt-2 px-4 py-2.5 rounded-xl bg-black hover:bg-neutral-800 text-white text-xs font-bold flex items-center gap-2 transition-all shadow-sm"
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
                  className="bg-white border border-neutral-200/80 rounded-2xl p-4 flex flex-col gap-2.5 hover:border-neutral-300 transition-all shadow-2xs"
                >
                  {/* Reporter & Star Rating header */}
                  <div className="flex items-start justify-between gap-2">
                    <div className="flex items-center gap-2.5">
                      <div className="w-7 h-7 rounded-full bg-black text-white font-bold text-xs flex items-center justify-center">
                        {reporterName.charAt(0).toUpperCase()}
                      </div>
                      <div>
                        <h4 className="font-bold text-xs text-black">
                          {reporterName}
                        </h4>
                        <div className="flex items-center gap-1">
                          {/* Render Rating Stars */}
                          <div className="flex items-center">
                            {[1, 2, 3, 4, 5].map((star) => (
                              <Star
                                key={star}
                                className={`w-3 h-3 ${
                                  star <= repRating
                                    ? "fill-black text-black"
                                    : "text-neutral-200 fill-neutral-200"
                                }`}
                              />
                            ))}
                          </div>
                          <span className="text-[10px] text-neutral-400 font-semibold">
                            • {repRating * 20}/100
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Proximity Pill */}
                    <div className="px-2.5 py-0.5 rounded-full bg-neutral-50 border border-neutral-200 text-[10px] font-semibold text-neutral-600 flex items-center gap-1">
                      <Navigation className="w-3 h-3 text-neutral-400" />
                      <span>{formatDistance(distance)}</span>
                    </div>
                  </div>

                  {/* Sub-Part / Aspect & Category Badges */}
                  <div className="flex flex-wrap items-center gap-1 text-[10px]">
                    {rep.aspect && (
                      <span className="px-2 py-0.5 rounded-md bg-neutral-100 text-neutral-800 font-semibold border border-neutral-200 flex items-center gap-1">
                        <Sliders className="w-2.5 h-2.5" />
                        {rep.aspect}
                      </span>
                    )}
                    <span className="px-2 py-0.5 rounded-md bg-neutral-50 text-neutral-600 font-medium border border-neutral-200">
                      {subCategoryName}
                    </span>
                    <span className={`px-2 py-0.5 rounded-md border ${getSeverityBadge(rep.severity_level)}`}>
                      {rep.severity_level}
                    </span>
                    <span className={`px-2 py-0.5 rounded-md border ${getStatusBadge(rep.status)}`}>
                      {rep.status}
                    </span>
                  </div>

                  {/* Report Description / Review text */}
                  <p className="text-xs text-neutral-700 leading-relaxed font-normal bg-neutral-50/70 p-3 rounded-xl border border-neutral-100">
                    "{rep.description}"
                  </p>

                  {/* Photo Thumbnails */}
                  {hasPhotos && (
                    <div className="flex items-center gap-2 pt-1 overflow-x-auto">
                      {rep.photo_urls.map((photo, pIdx) => (
                        <button
                          key={pIdx}
                          type="button"
                          onClick={() => setSelectedPhoto(photo)}
                          className="relative w-14 h-14 rounded-xl overflow-hidden border border-neutral-200 bg-neutral-100 shrink-0 group/img hover:border-black transition-all cursor-pointer"
                        >
                          <img
                            src={photo}
                            alt={`Foto Penilaian ${pIdx + 1}`}
                            className="w-full h-full object-cover group-hover/img:scale-105 transition-transform duration-200"
                          />
                          <div className="absolute inset-0 bg-black/20 opacity-0 group-hover/img:opacity-100 flex items-center justify-center text-white transition-opacity">
                            <Eye className="w-3.5 h-3.5" />
                          </div>
                        </button>
                      ))}
                    </div>
                  )}

                  {/* Date & focus trigger */}
                  <div className="flex items-center justify-between pt-1 text-[10px] text-neutral-400 border-t border-neutral-100">
                    <span className="flex items-center gap-1">
                      <Clock className="w-3 h-3 text-neutral-400" />
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
                        type="button"
                        onClick={() => onSelectReport(rep)}
                        className="font-semibold text-black hover:underline flex items-center gap-1 transition-colors cursor-pointer"
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
    </>
  );
}

