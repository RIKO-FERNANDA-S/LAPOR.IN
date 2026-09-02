"use client";

import dynamic from "next/dynamic";
import { Loader2, MapPin } from "lucide-react";

const PetaClient = dynamic(() => import("./PetaClient"), {
  ssr: false,
  loading: () => (
    <div className="w-full h-full min-h-150 flex flex-col items-center justify-center bg-slate-950 text-white gap-4 font-sans">
      <div className="relative flex items-center justify-center">
        <div className="w-16 h-16 rounded-full border-4 border-indigo-500/20 border-t-indigo-500 animate-spin"></div>
        <MapPin className="w-6 h-6 text-indigo-400 absolute animate-pulse" />
      </div>
      <div className="text-center space-y-1">
        <h3 className="font-bold text-base text-slate-100">Memuat Peta Spasial</h3>
        <p className="text-xs text-slate-400">Menghubungkan ke Database Reports & GeoJSON Gunung Anyar...</p>
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
