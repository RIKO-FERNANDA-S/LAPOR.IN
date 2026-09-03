"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  Home,
  RefreshCw,
  Search,
  SlidersHorizontal,
  ChevronDown,
  ChevronUp,
  X,
  RotateCcw,
  PlusCircle,
} from "lucide-react";
import { MapFilterState, DbReport } from "./types";
import { calculateRegionBinaScore } from "@/lib/binaScoring";

interface MapControlsProps {
  filterState: MapFilterState;
  onFilterChange: (newFilters: Partial<MapFilterState>) => void;
  totalPois: number;
  totalReports: number;
  isRefreshing: boolean;
  lastRefreshed: Date | null;
  onRefresh: () => void;
  reports?: DbReport[];
  visible?: boolean;
  onSelectReport?: (report: DbReport) => void;
}

export default function MapControls({
  filterState,
  onFilterChange,
  totalPois,
  totalReports,
  isRefreshing,
  onRefresh,
  reports = [],
}: MapControlsProps) {
  const [isOpen, setIsOpen] = useState(false);

  // Calculate active filter count for UX indicator
  const activeFiltersCount =
    (filterState.selectedSeverity !== "ALL" ? 1 : 0) +
    (filterState.selectedStatus !== "ALL" ? 1 : 0) +
    (filterState.selectedCategory !== "ALL" ? 1 : 0) +
    (filterState.searchQuery.trim() ? 1 : 0);

  // Reset all filters to default
  const handleResetFilters = () => {
    onFilterChange({
      selectedSeverity: "ALL",
      selectedStatus: "ALL",
      selectedCategory: "ALL",
      searchQuery: "",
    });
  };

  // Calculate Regional Bina Score from reports
  const placeScores = reports.map((r) => ((r.rating || 4) / 5) * 100);
  const regionStats = calculateRegionBinaScore(
    placeScores.length > 0 ? placeScores : [78, 82, 75, 80]
  );

  return (
    <div className="absolute top-4 left-4 right-4 z-1000 font-sans pointer-events-none flex flex-col md:flex-row items-start md:items-center justify-between gap-3">
      {/* LEFT: Branding & Region Bina Score Badge */}
      <div className="pointer-events-auto bg-white/90 backdrop-blur-md border border-neutral-200/80 shadow-md rounded-2xl px-4 py-2.5 flex items-center gap-3">
        <Link href="/" className="flex items-center gap-2 font-bold text-sm text-black tracking-tight group">
          <Image src="/logo/logo.png" alt="Bina logo" width={22} height={22} className="w-5 h-5 object-contain" />
          <span>bina.</span>
        </Link>

        <div className="h-4 w-px bg-neutral-200" />

        <div className="flex items-center gap-2">
          <span className="text-xs font-bold text-black tracking-tight hidden sm:inline">
            Gunung Anyar
          </span>
          <span className="text-[10px] uppercase font-bold px-2 py-0.5 rounded-full bg-black text-white">
            Skor: {regionStats.regionScore}/100
          </span>
          <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-neutral-100 text-neutral-700 border border-neutral-200">
            {regionStats.classification.predicate}
          </span>
        </div>
      </div>

      {/* RIGHT: Quick Action Bar & Filter Toggle */}
      <div className="pointer-events-auto relative flex items-center gap-2">
        {/* Quick Create Report CTA */}
        <Link
          href="/ajuan"
          className="bg-black hover:bg-neutral-800 text-white rounded-xl px-3.5 py-2 text-xs font-bold transition-all shadow-xs flex items-center gap-1.5 cursor-pointer"
        >
          <PlusCircle className="w-3.5 h-3.5" />
          <span className="hidden sm:inline">Buat Penilaian</span>
        </Link>

        {/* Filter Toggle Button */}
        <button
          type="button"
          onClick={() => setIsOpen(!isOpen)}
          className={`bg-white/90 backdrop-blur-md border border-neutral-200 hover:border-neutral-300 rounded-xl px-3 py-2 text-xs font-semibold text-black transition-all shadow-xs flex items-center gap-2 cursor-pointer ${
            isOpen ? "ring-1 ring-black bg-white" : ""
          }`}
        >
          <SlidersHorizontal className="w-3.5 h-3.5" />
          <span className="hidden sm:inline">Filter</span>
          {activeFiltersCount > 0 && (
            <span className="w-4 h-4 rounded-full bg-black text-white text-[9px] font-bold flex items-center justify-center">
              {activeFiltersCount}
            </span>
          )}
          {isOpen ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
        </button>

        {/* Refresh Data Button */}
        <button
          type="button"
          onClick={onRefresh}
          disabled={isRefreshing}
          title="Refresh Data"
          className="bg-white/90 backdrop-blur-md border border-neutral-200 hover:border-neutral-300 rounded-xl p-2.5 text-black transition-all shadow-xs disabled:opacity-50 cursor-pointer"
        >
          <RefreshCw className={`w-3.5 h-3.5 ${isRefreshing ? "animate-spin" : ""}`} />
        </button>

        {/* Home Navigation Button */}
        <Link
          href="/"
          title="Kembali ke Beranda"
          className="bg-white/90 backdrop-blur-md border border-neutral-200 hover:border-neutral-300 rounded-xl p-2.5 text-black transition-all shadow-xs cursor-pointer"
        >
          <Home className="w-3.5 h-3.5" />
        </Link>

        {/* Expandable Filter Menu Dropdown */}
        {isOpen && (
          <div className="absolute top-12 right-0 w-80 sm:w-96 bg-white/95 backdrop-blur-md border border-neutral-200/90 shadow-xl rounded-2xl p-4 text-neutral-900 z-50 animate-in fade-in slide-in-from-top-2">
            <div className="flex items-center justify-between pb-3 border-b border-neutral-100 mb-3">
              <span className="text-xs font-bold text-black tracking-tight flex items-center gap-1.5">
                <SlidersHorizontal className="w-3.5 h-3.5 text-black" />
                Filter & Pencarian Peta
              </span>
              <button
                type="button"
                onClick={() => setIsOpen(false)}
                className="text-neutral-400 hover:text-black p-1 rounded-lg transition-colors cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="space-y-3.5">
              {/* Search Box */}
              <div className="relative">
                <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-neutral-400" />
                <input
                  type="text"
                  value={filterState.searchQuery}
                  onChange={(e) => onFilterChange({ searchQuery: e.target.value })}
                  placeholder="Cari lokasi, fasilitas, atau laporan..."
                  className="w-full bg-neutral-50/70 border border-neutral-200 rounded-xl pl-8 pr-8 py-2 text-xs font-medium text-black focus:outline-none focus:ring-1 focus:ring-black focus:bg-white transition-all placeholder:text-neutral-400"
                />
                {filterState.searchQuery && (
                  <button
                    type="button"
                    onClick={() => onFilterChange({ searchQuery: "" })}
                    className="absolute right-2.5 top-1/2 -translate-y-1/2 text-neutral-400 hover:text-black cursor-pointer"
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>
                )}
              </div>

              {/* Severity Level Filter */}
              <div className="space-y-1.5">
                <label className="text-[10px] font-bold text-neutral-400 uppercase tracking-wider">
                  Tingkat Kerusakan / Severity
                </label>
                <div className="flex flex-wrap gap-1">
                  {[
                    { key: "ALL", label: "SEMUA" },
                    { key: "KRITIS", label: "KRITIS" },
                    { key: "TINGGI", label: "TINGGI" },
                    { key: "SEDANG", label: "SEDANG" },
                    { key: "RENDAH", label: "BAIK" },
                  ].map((item) => (
                    <button
                      key={item.key}
                      type="button"
                      onClick={() => onFilterChange({ selectedSeverity: item.key })}
                      className={`px-2.5 py-1 rounded-lg text-[10px] font-bold border transition-all cursor-pointer ${
                        filterState.selectedSeverity === item.key
                          ? "bg-black border-black text-white"
                          : "bg-neutral-50 text-neutral-700 hover:bg-neutral-100 border-neutral-200"
                      }`}
                    >
                      {item.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Status Filter */}
              <div className="space-y-1.5">
                <label className="text-[10px] font-bold text-neutral-400 uppercase tracking-wider">
                  Status Laporan Warga
                </label>
                <div className="flex flex-wrap gap-1">
                  {[
                    { key: "ALL", label: "SEMUA" },
                    { key: "MENUNGGU", label: "MENUNGGU" },
                    { key: "DIPROSES", label: "DIPROSES" },
                    { key: "DIVERIFIKASI", label: "VERIFIKASI" },
                    { key: "SELESAI", label: "SELESAI" },
                  ].map((item) => (
                    <button
                      key={item.key}
                      type="button"
                      onClick={() => onFilterChange({ selectedStatus: item.key })}
                      className={`px-2.5 py-1 rounded-lg text-[10px] font-bold border transition-all cursor-pointer ${
                        filterState.selectedStatus === item.key
                          ? "bg-black border-black text-white"
                          : "bg-neutral-50 text-neutral-700 hover:bg-neutral-100 border-neutral-200"
                      }`}
                    >
                      {item.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Stats Summary & Reset Footer */}
              <div className="pt-3 border-t border-neutral-100 flex items-center justify-between text-xs text-neutral-500">
                <span className="text-[11px] text-neutral-500">
                  {totalReports} Laporan • {totalPois} POI
                </span>
                {activeFiltersCount > 0 && (
                  <button
                    type="button"
                    onClick={handleResetFilters}
                    className="px-2.5 py-1 rounded-lg bg-neutral-100 hover:bg-neutral-200 text-black text-[11px] font-bold flex items-center gap-1 transition-all cursor-pointer"
                  >
                    <RotateCcw className="w-3 h-3" />
                    <span>Reset Filter</span>
                  </button>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

