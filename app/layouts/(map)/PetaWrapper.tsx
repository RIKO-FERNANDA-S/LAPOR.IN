"use client";

import dynamic from "next/dynamic";
import { MapPin } from "lucide-react";

const PetaClient = dynamic(() => import("./PetaClient"), {
  ssr: false,
  loading: () => (
    <div className="w-full h-full min-h-screen flex flex-col items-center justify-center bg-white text-neutral-900 gap-4 font-sans">
      <div className="relative flex items-center justify-center">
        <div className="w-14 h-14 rounded-full border-4 border-neutral-200 border-t-black animate-spin"></div>
        <MapPin className="w-5 h-5 text-black absolute animate-bounce" />
      </div>
      <div className="text-center space-y-1">
        <h3 className="font-bold text-sm text-black tracking-tight">Memuat Peta Spasial</h3>
        <p className="text-xs text-neutral-500">Menghubungkan ke Database Reports & GeoJSON Gunung Anyar...</p>
      </div>
    </div>
  ),
});

export default function PetaWrapper() {
  return (
    <div className="w-full h-full relative">
      <PetaClient />
    </div>
  );
}

