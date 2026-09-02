import React from "react";
import Link from "next/link";

export default function ReportSec() {
  const progress = 12;
  const total = 30;
  const pct = (progress / total) * 100;

  return (
    <section className="w-full bg-white py-32 border-t border-neutral-100">
      <div className="max-w-[1280px] mx-auto px-8 lg:px-16">
        <div className="flex flex-col lg:flex-row gap-16 items-center">

          {/* LEFT: Text */}
          <div className="w-full lg:w-[50%] flex flex-col gap-6">
            <span className="text-[11px] font-semibold tracking-[0.2em] text-neutral-400 uppercase border border-neutral-200 rounded-full px-4 py-1.5 w-max">
              TEMPAT BARU
            </span>
            <h2 className="font-bold text-black leading-tight tracking-tight" style={{ fontSize: "clamp(36px, 4vw, 58px)" }}>
              Tidak Menemukan<br />
              Fasilitasnya?
            </h2>

            <div className="w-12 h-[2px] bg-black" />

            <p className="text-neutral-500 leading-relaxed text-base lg:text-lg">
              Jika sebuah tempat atau fasilitas belum tersedia di Bina, masyarakat dapat
              melaporkan keberadaannya dan membantu membuatnya tersedia untuk dinilai.
            </p>

            <p className="text-xs text-neutral-400 leading-relaxed">
              Tempat baru akan tersedia setelah memenuhi jumlah laporan validasi yang ditentukan.
            </p>

            <Link
              href="/ajuan"
              className="group inline-flex items-center gap-2 bg-black text-white font-semibold px-8 py-4 rounded-xl text-base hover:bg-neutral-800 transition-all duration-200 w-max mt-2"
            >
              Laporkan Tempat
              <span className="inline-block transition-transform duration-200 group-hover:translate-x-1">↗</span>
            </Link>
          </div>

          {/* RIGHT: Flow visual */}
          <div className="w-full lg:w-[50%]">
            <div className="bg-neutral-50 border border-neutral-100 rounded-2xl p-8 flex flex-col gap-4">

              {/* Flow steps */}
              {[
                { label: "Tidak ditemukan", active: true, done: true },
                { label: "Laporkan Tempat", active: true, done: true },
                { label: "30 laporan warga", active: false, done: false },
                { label: "Validasi", active: false, done: false },
                { label: "Tempat tersedia", active: false, done: false },
              ].map((step, i) => (
                <React.Fragment key={i}>
                  <div className={`flex items-center gap-4 rounded-xl px-5 py-4 transition-all duration-200 ${
                    step.done
                      ? "bg-black text-white"
                      : "bg-white border border-neutral-200 text-neutral-400"
                  }`}>
                    <div className={`w-5 h-5 rounded-full flex-shrink-0 flex items-center justify-center text-[10px] font-bold ${
                      step.done ? "bg-white text-black" : "bg-neutral-100 text-neutral-400"
                    }`}>
                      {step.done ? "✓" : i + 1}
                    </div>
                    <span className="text-sm font-medium">{step.label}</span>
                  </div>
                  {i < 4 && (
                    <div className="flex justify-center">
                      <div className={`w-px h-4 ${step.done ? "bg-neutral-800" : "bg-neutral-200"}`} />
                    </div>
                  )}
                </React.Fragment>
              ))}

              {/* Progress bar */}
              <div className="mt-4 bg-white border border-neutral-100 rounded-xl p-5">
                <div className="flex justify-between items-center mb-3">
                  <p className="text-xs font-semibold text-black">Progress Validasi</p>
                  <span className="text-xs font-mono text-neutral-500">{progress} / {total} laporan</span>
                </div>
                <div className="w-full h-2 bg-neutral-100 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-black rounded-full transition-all duration-700"
                    style={{ width: `${pct}%` }}
                  />
                </div>
                <p className="text-[10px] text-neutral-400 mt-2">
                  Butuh {total - progress} laporan lagi untuk validasi
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
