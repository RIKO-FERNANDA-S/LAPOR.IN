"use client";

import { useState } from "react";
import {
  Layers,
  RefreshCw,
  Search,
  Filter,
  SlidersHorizontal,
  MapPin,
  AlertTriangle,
  CheckCircle2,
  Building2,
  ChevronDown,
  ChevronUp,
} from "lucide-react";
import { MapFilterState } from "./types";

interface MapControlsProps {
  filterState: MapFilterState;
  onFilterChange: (newFilters: Partial<MapFilterState>) => void;
  totalPois: number;
  totalReports: number;
  isRefreshing: boolean;
  lastRefreshed: Date | null;
  onRefresh: () => void;
}

export default function MapControls({
  filterState,
  onFilterChange,
  totalPois,
  totalReports,
  isRefreshing,
  lastRefreshed,
  onRefresh,
}: MapControlsProps) {
  const [isOpen, setIsOpen] = useState(true);

  return (
    <div className="absolute top-4 left-4 z-1000 max-w-sm w-full font-sans transition-all">
      {/* Realtime Live Header Bar */}
      <div className="bg-white backdrop-blur-md text-white p-3.5 rounded-2xl border border-slate-800 shadow-2xl space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="relative flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500"></span>
            </div>
            <div>
              <h3 className="font-bold text-xs tracking-wide uppercase text-slate-100 flex items-center gap-1.5">
                Live Database Reports
              </h3>
              <p className="text-[10px] text-slate-400">
                {lastRefreshed
                  ? `Sync: ${lastRefreshed.toLocaleTimeString("id-ID")}`
                  : "Menghubungkan..."}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-1.5">
            <button
              onClick={onRefresh}
              disabled={isRefreshing}
              title="Refresh Data Realtime"
              className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition-all disabled:opacity-50"
            >
              <RefreshCw
                className={`w-3.5 h-3.5 ${isRefreshing ? "animate-spin text-emerald-400" : ""}`}
              />
            </button>

            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition-all"
            >
              {isOpen ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
            </button>
          </div>
        </div>

        {/* Quick Stats Pill */}
        <div className="grid grid-cols-2 gap-2 text-center text-xs">
          <div className="bg-slate-800/80 p-2 rounded-xl border border-slate-700/60">
            <span className="block text-[10px] text-slate-400 font-medium">POI Gunung Anyar</span>
            <span className="font-bold text-indigo-400 text-sm">{totalPois} Tempat</span>
          </div>
          <div className="bg-slate-800/80 p-2 rounded-xl border border-slate-700/60">
            <span className="block text-[10px] text-slate-400 font-medium">Laporan Aktif</span>
            <span className="font-bold text-rose-400 text-sm">{totalReports} Laporan</span>
          </div>
        </div>

        {/* Expandable Filters & Controls */}
        {isOpen && (
          <div className="pt-2 border-t border-slate-800 space-y-3">
            {/* Search Input */}
            <div className="relative">
              <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                placeholder="Cari tempat atau laporan..."
                value={filterState.searchQuery}
                onChange={(e) => onFilterChange({ searchQuery: e.target.value })}
                className="w-full bg-slate-950/80 border border-slate-700/80 rounded-xl pl-8 pr-3 py-1.5 text-xs text-slate-100 placeholder-slate-500 focus:outline-none focus:border-indigo-500 transition-colors"
              />
            </div>

            {/* Layer Toggles */}
            <div className="space-y-1.5">
              <label className="text-[11px] font-semibold text-slate-400 flex items-center gap-1.5">
                <Layers className="w-3.5 h-3.5 text-indigo-400" /> Layer Peta
              </label>
              <div className="grid grid-cols-2 gap-2">
                <button
                  onClick={() => onFilterChange({ showPois: !filterState.showPois })}
                  className={`px-2.5 py-1.5 rounded-xl text-xs font-medium border flex items-center justify-center gap-1.5 transition-all ${
                    filterState.showPois
                      ? "bg-indigo-600/30 border-indigo-500 text-indigo-200"
                      : "bg-slate-950/40 border-slate-800 text-slate-500"
                  }`}
                >
                  <Building2 className="w-3.5 h-3.5" /> POI Tempat
                </button>

                <button
                  onClick={() => onFilterChange({ showReports: !filterState.showReports })}
                  className={`px-2.5 py-1.5 rounded-xl text-xs font-medium border flex items-center justify-center gap-1.5 transition-all ${
                    filterState.showReports
                      ? "bg-rose-600/30 border-rose-500 text-rose-200"
                      : "bg-white border-slate-800 text-slate-500"
                  }`}
                >
                  <AlertTriangle className="w-3.5 h-3.5" /> DB Reports
                </button>
              </div>
            </div>

            {/* Severity Filter */}
            <div className="space-y-1.5">
              <label className="text-[11px] font-semibold text-slate-400 flex items-center gap-1.5">
                <Filter className="w-3.5 h-3.5 text-rose-400" /> Filter Tingkat Kerusakan
              </label>
              <div className="flex flex-wrap gap-1">
                {["ALL", "KRITIS", "TINGGI", "SEDANG", "RENDAH"].map((severity) => (
                  <button
                    key={severity}
                    onClick={() => onFilterChange({ selectedSeverity: severity })}
                    className={`px-2 py-1 rounded-lg text-[10px] font-bold border transition-all ${
                      filterState.selectedSeverity === severity
                        ? "bg-rose-500 text-white border-rose-400 shadow-md shadow-rose-500/20"
                        : "bg-slate-950/60 border-slate-800 text-slate-400 hover:text-slate-200"
                    }`}
                  >
                    {severity}
                  </button>
                ))}
              </div>
            </div>

            {/* Category Filter */}
            <div className="space-y-1.5">
              <label className="text-[11px] font-semibold text-slate-400 flex items-center gap-1.5">
                <SlidersHorizontal className="w-3.5 h-3.5 text-amber-400" /> Kategori POI
              </label>
              <select
                value={filterState.selectedCategory}
                onChange={(e) => onFilterChange({ selectedCategory: e.target.value })}
                className="w-full bg-slate-950/80 border border-slate-700/80 rounded-xl px-3 py-1.5 text-xs text-slate-200 focus:outline-none focus:border-amber-500"
              >
                <option value="ALL">Semua Kategori Tempat</option>
                <option value="Pemerintahan">Pemerintahan</option>
                <option value="Pendidikan">Pendidikan</option>
                <option value="Wisata & Alam">Wisata & Alam</option>
                <option value="Hunian">Hunian</option>
                <option value="Kuliner">Kuliner</option>
                <option value="Kesehatan">Kesehatan</option>
                <option value="Perdagangan">Perdagangan</option>
                <option value="Fasilitas Umum">Fasilitas Umum</option>
              </select>
            </div>

            {/* Map Legend */}
            <div className="pt-2 border-t border-slate-800/80 text-[10px] text-slate-400 space-y-1">
              <span className="font-semibold text-slate-300 block">Petunjuk Pin Map:</span>
              <div className="grid grid-cols-2 gap-1.5">
                <span className="flex items-center gap-1">
                  <span className="w-2 h-2 rounded-full bg-red-500 animate-ping"></span> Kritis / Darurat
                </span>
                <span className="flex items-center gap-1">
                  <span className="w-2 h-2 rounded-full bg-orange-500"></span> Rusak Tinggi
                </span>
                <span className="flex items-center gap-1">
                  <span className="w-2 h-2 rounded-full bg-amber-500"></span> Rusak Sedang
                </span>
                <span className="flex items-center gap-1">
                  <span className="w-2 h-2 rounded-full bg-emerald-500"></span> Rusak Rendah
                </span>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
