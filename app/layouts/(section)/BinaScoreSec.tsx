import React from "react";

const bars = [
  { label: "Jalan", pct: 80 },
  { label: "Ruang Publik", pct: 90 },
  { label: "Pendidikan", pct: 70 },
  { label: "Air & Sanitasi", pct: 80 },
  { label: "Listrik", pct: 90 },
  { label: "Telekomunikasi", pct: 80 },
  { label: "Kesehatan", pct: 70 },
];

const classifications = [
  { name: "ADIBINA", desc: "Unggul", range: "90–100" },
  { name: "SWABINA", desc: "Mandiri", range: "75–89" },
  { name: "PURWABINA", desc: "Dasar", range: "60–74" },
  { name: "RENTANBINA", desc: "Rentan", range: "40–59" },
  { name: "NIRBINA", desc: "Kritis", range: "0–39" },
];

export default function BinaScoreSec() {
  return (
    <section className="w-full bg-white py-32 border-t border-neutral-100">
      <div className="max-w-[1280px] mx-auto px-8 lg:px-16">

        {/* Header */}
        <div className="mb-16 flex flex-col lg:flex-row gap-8 lg:gap-24 items-start">
          <div className="lg:w-[50%]">
            <span className="text-[11px] font-semibold tracking-[0.2em] text-neutral-400 uppercase border border-neutral-200 rounded-full px-4 py-1.5 inline-block mb-6">
              BINA SCORE
            </span>
            <h2 className="font-bold text-black leading-tight tracking-tight" style={{ fontSize: "clamp(36px, 4vw, 58px)" }}>
              Satu Skor untuk<br />
              Melihat Kondisi<br />
              Wilayah.
            </h2>
          </div>
          <div className="lg:w-[50%] flex items-end pb-2">
            <p className="text-neutral-500 leading-relaxed text-base lg:text-lg">
              Penilaian dari berbagai tempat dikumpulkan untuk memberikan gambaran
              kualitas infrastruktur suatu wilayah dalam satu angka yang mudah dipahami.
            </p>
          </div>
        </div>

        <div className="flex flex-col lg:flex-row gap-12 lg:gap-20">

          {/* Score visual */}
          <div className="lg:w-[40%] flex flex-col">
            <div className="bg-neutral-50 border border-neutral-100 rounded-2xl p-10 flex flex-col items-start gap-2">
              <p className="text-[11px] text-neutral-400 uppercase tracking-widest">Contoh Wilayah</p>
              <p className="text-9xl font-bold text-black leading-none tracking-tighter">82</p>
              <span className="text-sm font-semibold text-white bg-neutral-800 px-3 py-1 rounded-full mt-2">SWABINA</span>
              <div className="flex gap-1 mt-2">
                {[1,2,3,4].map(s => (
                  <svg key={s} className="w-4 h-4 fill-black" viewBox="0 0 20 20">
                    <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
                  </svg>
                ))}
                <svg className="w-4 h-4 fill-neutral-200" viewBox="0 0 20 20">
                  <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
                </svg>
              </div>

              {/* Category bars */}
              <div className="mt-6 flex flex-col gap-3 w-full">
                {bars.map((bar, i) => (
                  <div key={i} className="flex flex-col gap-1">
                    <div className="flex justify-between items-center">
                      <span className="text-xs text-neutral-500">{bar.label}</span>
                      <span className="text-xs text-neutral-400 font-mono">{bar.pct}</span>
                    </div>
                    <div className="w-full h-1.5 bg-neutral-200 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-black rounded-full"
                        style={{ width: `${bar.pct}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Classifications */}
          <div className="lg:w-[60%] flex flex-col gap-4">
            <p className="text-sm font-semibold text-black mb-2">Klasifikasi Bina Score</p>
            {classifications.map((cls, i) => (
              <div
                key={i}
                className="flex items-center gap-6 p-6 rounded-xl border border-neutral-100 hover:border-neutral-300 hover:bg-neutral-50 transition-all duration-200 group"
              >
                <div className="flex-shrink-0 w-24">
                  <span className={`text-[10px] font-bold tracking-widest px-3 py-1 rounded-full ${
                    i === 0 ? "bg-black text-white" :
                    i === 1 ? "bg-neutral-800 text-white" :
                    i === 2 ? "bg-neutral-200 text-black" :
                    i === 3 ? "bg-neutral-100 text-neutral-600" :
                    "bg-neutral-50 text-neutral-400"
                  }`}>
                    {cls.name}
                  </span>
                </div>
                <div className="flex-1">
                  <p className="font-semibold text-black text-sm">{cls.desc}</p>
                  <p className="text-xs text-neutral-400 mt-0.5">Skor {cls.range}</p>
                </div>
                <div className="h-1 flex-1 bg-neutral-100 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-black rounded-full transition-all duration-500 group-hover:w-full"
                    style={{ width: `${100 - i * 20}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
