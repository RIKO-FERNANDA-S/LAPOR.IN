"use client";

import { useEffect, useState } from "react";

import {
  MapContainer,
  TileLayer,
} from "react-leaflet";

import "leaflet/dist/leaflet.css";

import GeoJsonLayer from "./GeoJsonLayer";

export default function Map() {
  const [geoJson, setGeoJson] = useState<any>(null);

  useEffect(() => {
    const loadGeoJson = async () => {
      try {
        const response = await fetch(
          "/data/surabaya.geojson"
        );

        if (!response.ok) {
          throw new Error(
            `HTTP error: ${response.status}`
          );
        }

        const data = await response.json();

        setGeoJson(data);
      } catch (error) {
        console.error(
          "Gagal mengambil GeoJSON:",
          error
        );
      }
    };

    loadGeoJson();
  }, []);

  return (
    <MapContainer
      center={[-7.3325, 112.7855]}
      zoom={17}
      zoomControl={false}
      scrollWheelZoom={true}
      className="h-full w-full"
    >
      <TileLayer
        attribution='&copy; OpenStreetMap contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />

      {geoJson && (
        <GeoJsonLayer data={geoJson} />
      )}
    </MapContainer>
  );
}