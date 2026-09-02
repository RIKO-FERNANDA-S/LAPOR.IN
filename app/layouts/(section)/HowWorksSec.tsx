import React from "react";
import Link from "next/link";

const steps = [
  {
    num: "01",
    title: "Temukan",
    desc: "Temukan lokasi dan fasilitas publik yang ingin kamu nilai.",
  },
  {
    num: "02",
    title: "Nilai",
    desc: "Berikan penilaian berdasarkan kondisi yang kamu temukan.",
  },
  {
    num: "03",
    title: "Buktikan",
    desc: "Tambahkan deskripsi serta foto atau video sebagai bukti kondisi.",
  },
  {
    num: "04",
    title: "Kirim",
    desc: "Kirim laporan dan jadikan pengalamanmu bagian dari data Bina.",
  },
];

export default function HowWorksSec() {
  return (
    <section id="cara-kerja" className="w-full bg-white py-32 border-t border-neutral-100">
      <div className="max-w-[1280px] mx-auto px-8 lg:px-16">

        {/* Header */}
        <div className="flex flex-col lg:flex-row gap-8 lg:gap-24 mb-20">
          <div className="lg:w-[45%]">
            <span className="text-[11px] font-semibold tracking-[0.2em] text-neutral-400 uppercase border border-neutral-200 rounded-full px-4 py-1.5 inline-block mb-6">
              CARA KERJA
            </span>
            <h2 className="font-bold text-black leading-tight tracking-tight" style={{ fontSize: "clamp(36px, 4vw, 58px)" }}>
              Dari Kondisi Lapangan<br />
              Menjadi Data.
            </h2>
          </div>
          <div className="lg:w-[55%] flex items-end">
            <p className="text-neutral-500 leading-relaxed text-base lg:text-lg">
              Setiap warga dapat ikut membangun gambaran kondisi infrastruktur di sekitarnya.
              Proses simpel, dampak nyata.
            </p>
          </div>
        </div>

        {/* Process cards - diagonal staggered layout */}
        <div className="relative">
          {/* Connecting dotted path (desktop only) */}
          <div className="hidden lg:block absolute left-[12%] right-[12%] top-[30%] pointer-events-none">
            <svg width="100%" height="40" viewBox="0 0 800 40" preserveAspectRatio="none">
              <path
                d="M 0 20 C 200 0 250 40 400 20 C 550 0 600 40 800 20"
                stroke="#ddd" strokeWidth="1.5" strokeDasharray="6 6" fill="none"
              />
            </svg>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {steps.map((step, i) => (
              <div
                key={i}
                className="relative bg-white border border-neutral-100 rounded-2xl p-8 shadow-sm hover:shadow-lg transition-all duration-300 hover:-translate-y-2"
                style={{
                  transform: `rotate(${i % 2 === 0 ? "-1" : "1"}deg)`,
                  marginTop: i % 2 === 1 ? "32px" : "0",
                }}
              >
                {/* Pin dot */}
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-6 h-6 rounded-full bg-neutral-900 border-2 border-white shadow-md flex items-center justify-center">
                  <div className="w-2 h-2 rounded-full bg-white" />
                </div>

                <p className="text-[11px] text-neutral-300 font-mono font-medium mb-4">{step.num}</p>
                <h3 className="text-2xl font-bold text-black mb-3">{step.title}</h3>
                <p className="text-sm text-neutral-500 leading-relaxed">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom CTA */}
        <div className="mt-24 text-center flex flex-col items-center gap-4">
          <p className="text-neutral-400 text-sm tracking-widest italic">— Siap ikut membangun data kotamu? —</p>
          <Link
            href="/ajuan"
            className="group inline-flex items-center gap-2 bg-black text-white font-semibold px-10 py-4 rounded-xl text-base hover:bg-neutral-800 transition-all duration-200"
          >
            Mulai Menilai
            <span className="inline-block transition-transform duration-200 group-hover:translate-x-1">↗</span>
          </Link>
        </div>
      </div>
    </section>
  );
}
