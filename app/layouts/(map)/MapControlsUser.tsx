"use client";

import { useState } from "react";
import { Home } from "lucide-react";
import {
  Layers,
  RefreshCw,
  Search,
  Filter,
  SlidersHorizontal,
  MapPin,
  AlertTriangle,
  Building2,
  ChevronDown,
  ChevronUp,
  X,
  RotateCcw,
  Info,
  Star,
  Award,
} from "lucide-react";
import { MapFilterState, DbReport } from "./types";
import {
  calculateRegionBinaScore,
  getBinaClassification,
} from "@/lib/binaScoring";
import Link from "next/link";

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
  lastRefreshed,
  onRefresh,
  reports = [],
}: MapControlsProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [showRegionalScore, setShowRegionalScore] = useState(false);

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
    placeScores.length > 0 ? placeScores : [78, 82, 75, 80],
  );

  return (
    <div className="absolute top-4 right-4 z-1000 max-w-lg font-sans space-y-2 flex gap-4">
      {/* Top Banner: Regional Bina Score Card */}
      

      {/* Expanded Regional Bina Score Details */}
     

      {/* Main Filter Panel */}
      <div className="bg-white backdrop-blur-xl border border-slate-800 shadow-2xl rounded-2xl overflow-hidden text-slate-100">
        {/* Panel Header */}
        <div className="p-3 bg-slate-800 border-b border-slate-800 flex items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <div className="p-1.5 rounded-lg bg-indigo-500/20 text-indigo-400 border border-indigo-500/30">
              <SlidersHorizontal className="w-4 h-4" />
            </div>
            <div>
              <div>
                <div className="flex items-center gap-1.5">
                  <span className="text-xs font-bold text-slate-200">
                    Gunung Anyar
                  </span>
                  <span
                    className={`px-2 py-0.5 rounded-full text-[10px] font-black border ${regionStats.classification.bgColor} ${regionStats.classification.textColor} ${regionStats.classification.borderColor}`}
                  >
                    {regionStats.classification.starIcon}
                  </span>
                </div>
                <div className="flex gap-3 mt-1">
                  <p className="text-[11px] text-slate-400">
                    Skor Wilayah:{" "}
                    <strong className="text-white">
                      {regionStats.regionScore} / 100
                    </strong>
                  </p>
                  <p className="text-[10px] text-slate-400">
                    {totalReports} Laporan • {totalPois} POI Terdaftar
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-1">
            <button
              onClick={onRefresh}
              disabled={isRefreshing}
              title="Refresh data dari database"
              className="p-1.5 rounded-lg bg-slate-800/80 hover:bg-slate-800 text-slate-400 hover:text-white transition-colors disabled:opacity-50"
            >
              <RefreshCw
                className={`w-3.5 h-3.5 ${isRefreshing ? "animate-spin" : ""}`}
              />
            </button>
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-1.5 rounded-lg bg-slate-800/80 hover:bg-slate-800 text-slate-400 hover:text-white transition-colors"
            >
              {isOpen ? (
                <ChevronUp className="w-4 h-4" />
              ) : (
                <ChevronDown className="w-4 h-4" />
              )}
            </button>
          </div>
        </div>

        {/* Expandable Filter Body */}
        {isOpen && (
          <div className="p-3 space-y-3">
            {/* Search Input */}
            <div className="relative">
              <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                value={filterState.searchQuery}
                onChange={(e) =>
                  onFilterChange({ searchQuery: e.target.value })
                }
                placeholder="Cari lokasi, fasilitas, atau laporan..."
                className="w-full pl-8 pr-8 py-1.5 border border-slate-800 rounded-xl text-xs text-slate-800 placeholder:text-slate-500 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
              />
              {filterState.searchQuery && (
                <button
                  onClick={() => onFilterChange({ searchQuery: "" })}
                  className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              )}
            </div>

            {/* Severity Level Filter Chips */}
            <div className="space-y-1">
              <label className="text-[10px] font-bold text-slate-800 uppercase tracking-wider">
                Tingkat Kerusakan / Severity
              </label>
              <div className="flex flex-wrap gap-1">
                {[
                  { key: "ALL", label: "SEMUA" },
                  { key: "KRITIS", label: "KRITIS" },
                  { key: "TINGGI", label: "TINGGI" },
                  { key: "SEDANG", label: "SEDANG" },
                  { key: "RENDAH", label: "BAIK / RENDAH" },
                ].map((item) => (
                  <button
                    key={item.key}
                    onClick={() =>
                      onFilterChange({ selectedSeverity: item.key })
                    }
                    className={`px-2 py-1 rounded-lg text-[10px] font-semibold border transition-all ${
                      filterState.selectedSeverity === item.key
                        ? "bg-indigo-600 border-indigo-500 text-white shadow-md shadow-indigo-600/30"
                        : "text-slate-800"
                    }`}
                  >
                    {item.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Status Filter Chips */}
            <div className="space-y-1">
              <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
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
                    onClick={() => onFilterChange({ selectedStatus: item.key })}
                    className={`px-2 py-1 rounded-lg text-[10px] font-semibold border transition-all ${
                      filterState.selectedStatus === item.key
                        ? "bg-emerald-600 border-emerald-500 text-white shadow-md shadow-emerald-600/30"
                        : "text-slate-800"
                    }`}
                  >
                    {item.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Reset Filters Footer */}
            {activeFiltersCount > 0 && (
              <div className="pt-2 border-t border-slate-800/80 flex items-center justify-between">
                <span className="text-[11px] text-slate-400">
                  {activeFiltersCount} Filter Aktif
                </span>
                <button
                  onClick={handleResetFilters}
                  className="px-2.5 py-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 text-[11px] font-semibold flex items-center gap-1 transition-colors"
                >
                  <RotateCcw className="w-3 h-3 text-amber-400" />
                  <span>Reset Filter</span>
                </button>
              </div>
            )}
          </div>
        )}
      </div>

            <div className="flex justify-center items-start">
        <Link href="/" className="text-white w-max h-16 bg-slate-800 p-2 px-5 flex items-center justify-center rounded-2xl">
         <Home/>
        </Link>

      </div>

    </div>
  );
}
