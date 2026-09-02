"use client";

import { useEffect, useState, useCallback } from "react";
import { MapContainer, TileLayer } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import Link from "next/link";
import { Home } from "lucide-react";

import GeoJsonLayer from "./GeoJsonLayer";
import ReportMarker from "./ReportMarker";
import MapControls from "./MapControlsUser";
import MapClickHandler from "./MapClickHandler";
import LocationReviewsDrawer, { ClickedLocation } from "./LocationReviewsDrawer";
import { GeoJsonCollection, GeoJsonFeature, DbReport, MapFilterState } from "./types";

export default function PetaClient() {
  const [geoJsonData, setGeoJsonData] = useState<GeoJsonCollection | null>(null);
  const [reports, setReports] = useState<DbReport[]>([]);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [lastRefreshed, setLastRefreshed] = useState<Date | null>(null);
  const [selectedPoi, setSelectedPoi] = useState<GeoJsonFeature | null>(null);
  const [selectedReport, setSelectedReport] = useState<DbReport | null>(null);
  const [clickedLocation, setClickedLocation] = useState<ClickedLocation | null>(null);

  const [filterState, setFilterState] = useState<MapFilterState>({
    showPois: true,
    showReports: true,
    selectedCategory: "ALL",
    selectedSeverity: "ALL",
    selectedStatus: "ALL",
    searchQuery: "",
  });

  // Load GeoJSON data for Gunung Anyar
  useEffect(() => {
    const fetchGeoJson = async () => {
      try {
        let res = await fetch("/data/gunung_anyar.geojson");
        if (!res.ok) {
          res = await fetch("/data/surabaya.geojson");
        }
        if (res.ok) {
          const data = await res.json();
          setGeoJsonData(data);
        }
      } catch (err) {
        console.error("Gagal memuat GeoJSON Gunung Anyar:", err);
      }
    };
    fetchGeoJson();
  }, []);

  // Fetch Live DB Reports with polling
  const fetchDbReports = useCallback(async () => {
    setIsRefreshing(true);
    try {
      const res = await fetch("/api/reports?t=" + Date.now());
      if (res.ok) {
        const json = await res.json();
        if (Array.isArray(json.reports)) {
          setReports(json.reports);
          setLastRefreshed(new Date());
        }
      }
    } catch (err) {
      console.error("Gagal mengambil data laporan dari database:", err);
    } finally {
      setIsRefreshing(false);
    }
  }, []);

  // Realtime polling every 5 seconds
  useEffect(() => {
    fetchDbReports();
    const interval = setInterval(() => {
      fetchDbReports();
    }, 5000);
    return () => clearInterval(interval);
  }, [fetchDbReports]);

  const handleFilterChange = (newFilters: Partial<MapFilterState>) => {
    setFilterState((prev) => ({ ...prev, ...newFilters }));
  };

  // Map Click Handler -> Open Location Reviews Drawer for clicked spot
  const handleMapClick = (lat: number, lng: number) => {
    setClickedLocation({
      lat,
      lng,
      title: `Titik Lokasi (${lat.toFixed(4)}, ${lng.toFixed(4)})`,
      address: "Kecamatan Gunung Anyar, Kota Surabaya",
    });
  };

  // POI Click Handler -> Open Location Reviews Drawer for clicked POI
  const handleSelectPoi = (feature: GeoJsonFeature) => {
    setSelectedPoi(feature);
    const coords = feature.geometry?.coordinates;
    if (coords && coords.length >= 2) {
      setClickedLocation({
        lat: coords[1],
        lng: coords[0],
        title: feature.properties?.name || "Tempat POI",
        category: feature.properties?.category,
        address: feature.properties?.address || "Gunung Anyar, Surabaya",
      });
    }
  };

  // Report Click Handler -> Open Location Reviews Drawer focused on clicked report
  const handleSelectReport = (report: DbReport) => {
    setSelectedReport(report);
    setClickedLocation({
      lat: report.latitude,
      lng: report.longitude,
      title: report.location_description || report.sub_category?.name || "Lokasi Laporan Warga",
      category: report.sub_category?.name || "Laporan Warga",
      address: report.region?.district ? `Kec. ${report.region.district}, Surabaya` : "Gunung Anyar, Surabaya",
    });
  };

  // Filter DB Reports based on UI controls
  const filteredReports = reports.filter((rep) => {
    // Severity filter
    if (
      filterState.selectedSeverity !== "ALL" &&
      rep.severity_level !== filterState.selectedSeverity
    ) {
      return false;
    }
    // Status filter
    if (
      filterState.selectedStatus !== "ALL" &&
      rep.status !== filterState.selectedStatus
    ) {
      return false;
    }
    // Search query filter
    if (filterState.searchQuery.trim()) {
      const q = filterState.searchQuery.toLowerCase();
      const descMatch = rep.description?.toLowerCase().includes(q);
      const locMatch = rep.location_description?.toLowerCase().includes(q);
      const userMatch = rep.user?.name?.toLowerCase().includes(q);
      const catMatch = rep.sub_category?.name?.toLowerCase().includes(q);
      if (!descMatch && !locMatch && !userMatch && !catMatch) {
        return false;
      }
    }
    return true;
  });

  // Filter GeoJSON features based on search query
  const filteredGeoJson = geoJsonData
    ? {
        ...geoJsonData,
        features: geoJsonData.features.filter((feat) => {
          if (!filterState.searchQuery.trim()) return true;
          const q = filterState.searchQuery.toLowerCase();
          const nameMatch = feat.properties?.name?.toLowerCase().includes(q);
          const descMatch = feat.properties?.description?.toLowerCase().includes(q);
          const catMatch = feat.properties?.category?.toLowerCase().includes(q);
          const addrMatch = feat.properties?.address?.toLowerCase().includes(q);
          return nameMatch || descMatch || catMatch || addrMatch;
        }),
      }
    : null;

  return (
    <div className="relative w-full h-full overflow-hidden bg-slate-950 font-sans">
      {/* Leaflet Interactive Map Container */}
      <MapContainer
        center={[-7.3361, 112.7872]}
        zoom={15}
        zoomControl={false}
        scrollWheelZoom={true}
        className="w-full h-full z-0"
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors | Lapor.in Gunung Anyar'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        {/* Map Click Listener */}
        <MapClickHandler onMapClick={handleMapClick} />

        {/* POI Layer (Gunung Anyar GeoJSON) */}
        <GeoJsonLayer
          data={filteredGeoJson}
          visible={filterState.showPois}
          filterCategory={filterState.selectedCategory}
          onSelectPoi={handleSelectPoi}
        />

        {/* Realtime DB Reports Layer */}
        <ReportMarker
          reports={filteredReports}
          visible={filterState.showReports}
          onSelectReport={handleSelectReport}
        />
      </MapContainer>

      {/* Floating Control Toolbar & Realtime Indicator */}
      <MapControls
        filterState={filterState}
        onFilterChange={handleFilterChange}
        totalPois={filteredGeoJson?.features?.length || 0}
        totalReports={filteredReports.length}
        isRefreshing={isRefreshing}
        lastRefreshed={lastRefreshed}
        onRefresh={fetchDbReports}
        reports={reports}
        onSelectReport={handleSelectReport}
      />
 

      {/* Location Click & Reviews Drawer Overlay */}
      <LocationReviewsDrawer
        location={clickedLocation}
        reports={reports}
        onClose={() => setClickedLocation(null)}
        onSelectReport={handleSelectReport}
      />

      {/* Region Badge Overlay Bottom Left */}
      {/* <div className="absolute bottom-6 left-6 z-1000 pointer-events-none hidden md:block">
        <div className="pointer-events-auto bg-slate-900/90 backdrop-blur-md px-4 py-2.5 rounded-2xl border border-slate-800 shadow-2xl text-white flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-indigo-600/30 border border-indigo-500/50 flex items-center justify-center text-indigo-400">
            📍
          </div>
          <div>
            <h4 className="font-bold text-xs text-slate-100">Kecamatan Gunung Anyar</h4>
            <p className="text-[11px] text-slate-400 font-mono">Kota Surabaya, Jawa Timur</p>
          </div>
        </div>
      </div> */}
    </div>
  );
}
