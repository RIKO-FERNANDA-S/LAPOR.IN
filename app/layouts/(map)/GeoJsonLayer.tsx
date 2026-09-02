"use client";

import { Marker, Popup, Tooltip } from "react-leaflet";
import { GeoJsonCollection, GeoJsonFeature } from "./types";
import { createPoiDivIcon } from "./markerUtils";

interface GeoJsonLayerProps {
  data: GeoJsonCollection | null;
  visible?: boolean;
  filterCategory?: string;
  onSelectPoi?: (feature: GeoJsonFeature) => void;
}

export default function GeoJsonLayer({
  data,
  visible = true,
  filterCategory = "ALL",
  onSelectPoi,
}: GeoJsonLayerProps) {
  if (!visible || !data || !Array.isArray(data.features)) {
    return null;
  }

  const filteredFeatures = data.features.filter((feature) => {
    if (!filterCategory || filterCategory === "ALL") return true;
    const cat = feature.properties?.category;
    return cat?.toLowerCase() === filterCategory.toLowerCase();
  });

  return (
    <>
      {filteredFeatures.map((feature, idx) => {
        const props = feature.properties || {};
        const coords = feature.geometry?.coordinates;
        if (!coords || coords.length < 2) return null;

        // Leaflet takes [latitude, longitude], GeoJSON is [longitude, latitude]
        const position: [number, number] = [coords[1], coords[0]];
        const name = props.name || "Lokasi Gunung Anyar";
        const category = props.category || "Fasilitas Umum";
        const address = props.address || "Kecamatan Gunung Anyar, Surabaya";
        const description = props.description || "Fasilitas & tempat penting di wilayah Gunung Anyar";
        const iconKey = props.icon || "map-pin";
        const markerIcon = createPoiDivIcon(category, iconKey);

        return (
          <Marker
            key={props.id || `poi-${idx}`}
            position={position}
            icon={markerIcon}
            eventHandlers={{
              click: () => {
                if (onSelectPoi) onSelectPoi(feature);
              },
            }}
          >
            {/* HOVER TOOLTIP */}
            <Tooltip
              direction="top"
              offset={[0, -32]}
              opacity={0.98}
              className="custom-leaflet-tooltip"
            >
              <div className="p-3 max-w-xs bg-slate-900/95 backdrop-blur-md text-white rounded-xl shadow-2xl border border-slate-700/80 font-sans">
                <div className="flex items-center gap-2 mb-1.5">
                  <span className="px-2 py-0.5 text-[10px] font-semibold tracking-wide uppercase bg-indigo-500/20 text-indigo-300 rounded-full border border-indigo-500/30">
                    {category}
                  </span>
                  <span className="text-[10px] text-slate-400 font-mono">
                    Gunung Anyar
                  </span>
                </div>
                <h4 className="font-bold text-sm text-slate-100 leading-snug">
                  {name}
                </h4>
                <p className="text-xs text-slate-300 mt-1 line-clamp-2 leading-normal">
                  {description}
                </p>
                <div className="mt-2 pt-2 border-t border-slate-800 flex items-center justify-between text-[10px] text-slate-400">
                  <span className="truncate max-w-42.5">📍 {address}</span>
                  <span className="text-indigo-400 font-medium hover:underline">Klik detail</span>
                </div>
              </div>
            </Tooltip>

            {/* POPUP ON CLICK */}
            <Popup className="custom-leaflet-popup">
              <div className="p-4 max-w-sm bg-white dark:bg-slate-900 rounded-xl shadow-xl border border-slate-200 dark:border-slate-800 font-sans">
                <div className="flex items-center justify-between gap-2 mb-2">
                  <span className="px-2.5 py-1 text-xs font-semibold bg-indigo-100 dark:bg-indigo-950 text-indigo-700 dark:text-indigo-300 rounded-md">
                    {category}
                  </span>
                  <span className="text-xs text-slate-500 font-mono">
                    ID: {props.id || "POI"}
                  </span>
                </div>
                <h3 className="font-bold text-base text-slate-900 dark:text-white mb-1.5">
                  {name}
                </h3>
                <p className="text-xs text-slate-600 dark:text-slate-300 mb-3 leading-relaxed">
                  {description}
                </p>

                <div className="space-y-1.5 text-xs text-slate-600 dark:text-slate-400 bg-slate-50 dark:bg-slate-800/50 p-2.5 rounded-lg border border-slate-100 dark:border-slate-800">
                  <div className="flex items-start gap-1.5">
                    <span className="font-medium text-slate-900 dark:text-slate-200 shrink-0">Alamat:</span>
                    <span className="truncate">{address}</span>
                  </div>
                  <div className="flex items-center gap-1.5 font-mono text-[11px]">
                    <span className="font-medium text-slate-900 dark:text-slate-200">Koordinat:</span>
                    <span>{position[0].toFixed(5)}, {position[1].toFixed(5)}</span>
                  </div>
                </div>
              </div>
            </Popup>
          </Marker>
        );
      })}
    </>
  );
}