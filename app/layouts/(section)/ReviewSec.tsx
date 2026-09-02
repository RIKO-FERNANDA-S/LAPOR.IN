import React from "react";
import Link from "next/link";

const reviews = [
  {
    text: "Trotoarnya cukup nyaman, tetapi beberapa bagian masih rusak dan sulit digunakan oleh pengguna kursi roda.",
    stars: 4,
    location: "Surabaya",
    time: "2 hari lalu",
    facility: "Trotoar Jl. Pemuda",
    category: "Jalan & Mobilitas",
  },
  {
    text: "Taman sangat terawat, banyak tempat duduk. Sayangnya toilet umum kondisinya kurang bersih.",
    stars: 4,
    location: "Surabaya",
    time: "5 hari lalu",
    facility: "Taman Bungkul",
    category: "Ruang Publik",
  },
  {
    text: "Halte sudah ada atap tapi tidak ada informasi jadwal yang jelas. Perlu penerangan lebih.",
    stars: 3,
    location: "Surabaya",
    time: "1 minggu lalu",
    facility: "Halte Rajawali",
    category: "Jalan & Mobilitas",
  },
];

export default function ReviewSec() {
  return (
    <section className="w-full bg-neutral-50 py-32 border-t border-neutral-100">
      <div className="max-w-[1280px] mx-auto px-8 lg:px-16">

        {/* Header */}
        <div className="flex flex-col lg:flex-row gap-8 items-start mb-16">
          <div className="lg:w-[45%]">
            <span className="text-[11px] font-semibold tracking-[0.2em] text-neutral-400 uppercase border border-neutral-200 rounded-full px-4 py-1.5 inline-block mb-6">
              SUARA WARGA
            </span>
            <h2 className="font-bold text-black leading-tight tracking-tight" style={{ fontSize: "clamp(36px, 4vw, 56px)" }}>
              Apa Kata Warga<br />
              Tentang Kotanya?
            </h2>
          </div>
          <div className="lg:w-[55%] flex items-end pb-2">
            <p className="text-neutral-500 leading-relaxed text-base">
              Laporan nyata dari warga yang menggunakan fasilitas setiap harinya.
              Setiap suara membentuk gambaran kondisi infrastruktur yang lebih akurat.
            </p>
          </div>
        </div>

        {/* Review cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {reviews.map((r, i) => (
            <div
              key={i}
              className="bg-white border border-neutral-100 rounded-2xl p-8 shadow-sm hover:shadow-md transition-all duration-200 hover:-translate-y-1 flex flex-col gap-5"
              style={{ transform: `rotate(${i === 1 ? "0.5deg" : i === 2 ? "-0.5deg" : "0deg"})` }}
            >
              {/* Facility tag */}
              <div className="flex items-center gap-2">
                <span className="text-[10px] bg-neutral-100 text-neutral-600 px-2 py-0.5 rounded-full font-medium">
                  {r.category}
                </span>
              </div>

              {/* Stars */}
              <div className="flex gap-0.5">
                {[1,2,3,4,5].map(s => (
                  <svg key={s} className={`w-3.5 h-3.5 ${s <= r.stars ? "fill-black" : "fill-neutral-200"}`} viewBox="0 0 20 20">
                    <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
                  </svg>
                ))}
              </div>

              {/* Review text */}
              <p className="text-neutral-700 text-sm leading-relaxed flex-1">"{r.text}"</p>

              {/* Divider */}
              <div className="w-full h-px bg-neutral-100" />

              {/* Meta */}
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs font-semibold text-black">{r.facility}</p>
                  <p className="text-xs text-neutral-400 mt-0.5">{r.location} · {r.time}</p>
                </div>
                {/* Photo placeholder */}
                <div className="w-10 h-10 rounded-lg bg-neutral-100 border border-neutral-200 flex items-center justify-center">
                  <svg className="w-4 h-4 text-neutral-300" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 001.5-1.5V6a1.5 1.5 0 00-1.5-1.5H3.75A1.5 1.5 0 002.25 6v12a1.5 1.5 0 001.5 1.5zm10.5-11.25h.008v.008h-.008V8.25zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
                  </svg>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
