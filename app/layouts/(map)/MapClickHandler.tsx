"use client";

import { useMapEvents } from "react-leaflet";

interface MapClickHandlerProps {
  onMapClick?: (lat: number, lng: number) => void;
}

export default function MapClickHandler({ onMapClick }: MapClickHandlerProps) {
  useMapEvents({
    click(event) {
      const { lat, lng } = event.latlng;
      if (onMapClick) {
        onMapClick(lat, lng);
      }
    },
  });

  return null;
}