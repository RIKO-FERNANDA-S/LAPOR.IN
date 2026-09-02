import React from "react";
import Link from "next/link";

const filters = ["Semua", "Jalan", "Ruang Publik", "Pendidikan", "Kesehatan", "Air & Sanitasi", "Listrik"];

const locations = [
  { name: "Taman Bungkul", score: 88, class: "ADIBINA", x: "42%", y: "38%" },
  { name: "Jalan Darmo", score: 74, class: "SWABINA", x: "28%", y: "55%" },
  { name: "Halte Rajawali", score: 61, class: "PURWABINA", x: "65%", y: "45%" },
  { name: "SD Negeri 01", score: 79, class: "SWABINA", x: "55%", y: "65%" },
  { name: "Puskesmas Gubeng", score: 83, class: "SWABINA", x: "70%", y: "30%" },
];

export default function PetaSec() {
  return (
    <section id="peta" className="w-full bg-white py-32 border-t border-neutral-100">
      <div className="max-w-[1280px] mx-auto px-8 lg:px-16">

        {/* Header */}
        <div className="flex flex-col lg:flex-row gap-8 items-end mb-12">
          <div className="lg:w-[55%]">
            <span className="text-[11px] font-semibold tracking-[0.2em] text-neutral-400 uppercase border border-neutral-200 rounded-full px-4 py-1.5 inline-block mb-6">
              JELAJAHI
            </span>
            <h2 className="font-bold text-black leading-tight tracking-tight" style={{ fontSize: "clamp(36px, 4vw, 56px)" }}>
              Jelajahi Kondisi Kotamu.
            </h2>
            <p className="text-neutral-500 mt-4 text-base leading-relaxed">
              Lihat bagaimana kualitas infrastruktur berbeda dari satu tempat ke tempat lainnya.
            </p>
          </div>
          <div className="lg:w-[45%] flex justify-end">
            <Link
              href="/peta"
              className="group inline-flex items-center gap-2 border border-black text-black font-semibold px-8 py-4 rounded-xl text-base hover:bg-black hover:text-white transition-all duration-200"
            >
              Jelajahi Peta
              <span className="inline-block transition-transform duration-200 group-hover:translate-x-1">↗</span>
            </Link>
          </div>
        </div>

        {/* Filter strip */}
        <div className="flex gap-2 overflow-x-auto pb-2 mb-6 scrollbar-hide">
          {filters.map((f, i) => (
            <button
              key={f}
              className={`flex-shrink-0 text-xs font-medium px-4 py-2 rounded-full border transition-all duration-150 ${
                i === 0
                  ? "bg-black text-white border-black"
                  : "bg-white text-neutral-500 border-neutral-200 hover:border-neutral-400"
              }`}
            >
              {f}
            </button>
          ))}
        </div>

        {/* Map visualization */}
        <div className="relative w-full rounded-2xl overflow-hidden border border-neutral-100 shadow-lg" style={{ aspectRatio: "16/7", minHeight: "340px" }}>
          {/* Map base */}
          <div className="absolute inset-0 bg-neutral-50">
            <svg width="100%" height="100%" viewBox="0 0 1200 500" className="opacity-20" preserveAspectRatio="xMidYMid slice">
              <defs>
                <pattern id="mapgrid" width="40" height="40" patternUnits="userSpaceOnUse">
                  <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#999" strokeWidth="0.5" />
                </pattern>
              </defs>
              <rect width="1200" height="500" fill="url(#mapgrid)" />
              {/* Roads */}
              <path d="M0 250 L1200 250" stroke="#888" strokeWidth="3" />
              <path d="M600 0 L600 500" stroke="#888" strokeWidth="3" />
              <path d="M0 150 Q300 120 600 180 Q900 240 1200 150" stroke="#888" strokeWidth="2" fill="none" />
              <path d="M0 380 Q 400 350 700 400 L 1200 380" stroke="#888" strokeWidth="2" fill="none" />
              <path d="M200 0 Q 220 250 200 500" stroke="#aaa" strokeWidth="1.5" fill="none" />
              <path d="M400 0 Q 420 250 400 500" stroke="#aaa" strokeWidth="1.5" fill="none" />
              <path d="M800 0 Q 820 250 800 500" stroke="#aaa" strokeWidth="1.5" fill="none" />
              <path d="M1000 0 Q 1020 250 1000 500" stroke="#aaa" strokeWidth="1.5" fill="none" />
              {/* Blocks */}
              {[
                [60, 60, 100, 60], [220, 50, 140, 70], [420, 60, 120, 60], [640, 55, 100, 65],
                [820, 65, 130, 55], [1020, 60, 110, 60],
                [60, 290, 100, 60], [220, 280, 140, 70], [420, 295, 120, 60],
                [640, 285, 100, 65], [820, 295, 130, 55], [1020, 285, 110, 60],
              ].map(([x, y, w, h], i) => (
                <rect key={i} x={x} y={y} width={w} height={h} rx="6" fill="#ccc" opacity="0.5" />
              ))}
            </svg>
          </div>

          {/* Location pins & floating cards */}
          {locations.map((loc, i) => (
            <div
              key={i}
              className="absolute group"
              style={{ left: loc.x, top: loc.y, transform: "translate(-50%, -50%)" }}
            >
              {/* Pin */}
              <div className="relative flex flex-col items-center">
                <div className="w-3 h-3 rounded-full bg-black ring-4 ring-black/10 animate-pulse cursor-pointer" />
                {/* Tooltip card */}
                <div className="absolute bottom-6 left-1/2 -translate-x-1/2 bg-white border border-neutral-100 rounded-xl px-4 py-3 shadow-xl whitespace-nowrap z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none">
                  <p className="text-xs font-semibold text-black">{loc.name}</p>
                  <p className="text-xs text-neutral-500 mt-0.5">
                    {loc.score} — <span className="font-medium">{loc.class}</span>
                  </p>
                </div>
              </div>
            </div>
          ))}

          {/* Static visible card (main) */}
          <div className="absolute top-6 left-6 bg-white border border-neutral-100 rounded-xl px-5 py-4 shadow-xl">
            <p className="text-xs font-semibold text-black">Taman Bungkul</p>
            <p className="text-xs text-neutral-500 mt-0.5">88 — <span className="font-medium">ADIBINA</span></p>
          </div>
          <div className="absolute bottom-6 right-6 bg-neutral-900 text-white rounded-xl px-5 py-4 shadow-xl">
            <p className="text-xs text-neutral-400">Halte Rajawali</p>
            <p className="text-sm font-bold">61 <span className="text-xs text-neutral-400 font-normal">PURWABINA</span></p>
          </div>
        </div>
      </div>
    </section>
  );
}