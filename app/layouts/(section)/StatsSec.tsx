import React from "react";

const stats = [
  { value: "12K+", label: "Laporan Warga" },
  { value: "300+", label: "Tempat Dinilai" },
  { value: "30+", label: "Wilayah" },
  { value: "8", label: "Kategori Infrastruktur" },
];

export default function StatsSec() {
  return (
    <section className="w-full bg-white py-20 border-b border-neutral-100">
      <div className="max-w-[1280px] mx-auto px-8 lg:px-16">
        <p className="text-[11px] font-semibold tracking-[0.2em] text-neutral-400 uppercase mb-12">
          DATA DARI KONDISI NYATA
        </p>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-16">
          {stats.map((s, i) => (
            <div key={i} className="flex flex-col gap-2">
              <p className="text-5xl lg:text-6xl font-bold text-black tracking-tight">{s.value}</p>
              <p className="text-sm text-neutral-500 font-medium">{s.label}</p>
              <div className="w-8 h-[2px] bg-black mt-1" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
