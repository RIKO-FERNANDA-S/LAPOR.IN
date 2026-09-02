import { Metadata } from "next";
import Navbar from "@/app/layouts/Navbar";
import PetaWrapper from "@/app/layouts/(map)/PetaWrapper";

export const metadata: Metadata = {
  title: "Peta Interaktif Spasial - Lapor.in Gunung Anyar",
  description:
    "Pemetaan spasial dan pemantauan realtime laporan infrastruktur serta titik penting (POI) Kecamatan Gunung Anyar, Kota Surabaya.",
};

export default function PetaPage() {
  return (
    <div className="flex flex-col h-screen w-screen overflow-hidden bg-slate-950 text-slate-100 font-sans">

      {/* Main Interactive Map Canvas */}
      <main className="flex-1 relative w-full h-[calc(100vh-4rem)] overflow-hidden">
        <PetaWrapper />
      </main>
    </div>
  );
}