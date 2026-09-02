import React from "react";

const problems = [
  "Jalan rusak",
  "Fasilitas tidak terawat",
  "Aksesibilitas terbatas",
  "Data kondisi lapangan belum terlihat",
];

export default function ProblemSec() {
  return (
    <section className="w-full bg-neutral-50 py-32 border-t border-neutral-100">
      <div className="max-w-[1280px] mx-auto px-8 lg:px-16">
        <div className="flex flex-col lg:flex-row gap-16 items-start">

          {/* LEFT */}
          <div className="w-full lg:w-[50%] flex flex-col gap-6">
            <h2 className="font-bold text-black leading-tight tracking-tight" style={{ fontSize: "clamp(36px, 4vw, 60px)" }}>
              Infrastruktur Ada.<br />
              <span className="text-neutral-400">Tapi Apakah Layak?</span>
            </h2>

            <div className="w-12 h-[2px] bg-black" />

            <p className="text-neutral-500 leading-relaxed text-base lg:text-lg">
              Jalan bisa saja tersedia, tetapi apakah masih nyaman dilalui?
              Taman bisa saja dibangun, tetapi apakah fasilitasnya terawat?
              Halte bisa saja berdiri, tetapi apakah mudah diakses?
            </p>

            <p className="text-neutral-500 leading-relaxed text-base">
              Bina mencoba melihat kondisi tersebut dari sudut pandang masyarakat
              yang menggunakannya setiap hari.
            </p>
          </div>

          {/* RIGHT: Problem cards */}
          <div className="w-full lg:w-[50%] flex flex-col gap-4">
            {problems.map((p, i) => (
              <div
                key={i}
                className="flex items-center gap-4 bg-white border border-neutral-100 rounded-xl px-6 py-5 shadow-sm hover:shadow-md transition-all duration-200 hover:-translate-y-0.5"
                style={{ transform: i % 2 === 0 ? "rotate(0.5deg)" : "rotate(-0.5deg)" }}
              >
                <span className="text-xs text-neutral-300 font-mono font-medium">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <div className="w-px h-6 bg-neutral-100" />
                <p className="text-sm font-semibold text-black">{p}</p>
                <div className="ml-auto w-2 h-2 rounded-full bg-neutral-200" />
              </div>
            ))}

            <div className="mt-4 bg-black text-white rounded-xl p-6 relative overflow-hidden">
              <div
                className="absolute inset-0 opacity-5"
                style={{
                  backgroundImage: "repeating-linear-gradient(45deg, white 0, white 1px, transparent 0, transparent 50%)",
                  backgroundSize: "16px 16px",
                }}
              />
              <p className="text-xs text-neutral-400 uppercase tracking-widest mb-2">Solusi Bina</p>
              <p className="text-white font-semibold text-lg leading-snug">
                Dokumentasikan kondisi nyata. Jadikan data yang bisa dilihat semua orang.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
