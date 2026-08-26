"use client";

import { useMapEvents } from "react-leaflet";

export default function MapClickHandler() {
  useMapEvents({
    click(event) {
      const { lat, lng } = event.latlng;

      console.log("Latitude:", lat);
      console.log("Longitude:", lng);
    },
  });

  return null;
}