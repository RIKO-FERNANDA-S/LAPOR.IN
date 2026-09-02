import React from "react";
import Link from "next/link";

export default function CTASec() {
  return (
    <section className="w-full bg-black py-40 relative overflow-hidden">
      {/* Decorative line-art */}
      <div className="absolute inset-0 pointer-events-none">
        <svg className="absolute top-0 left-0 w-full h-full opacity-5" viewBox="0 0 1200 500" preserveAspectRatio="xMidYMid slice">
          <circle cx="200" cy="250" r="180" stroke="white" strokeWidth="1" fill="none" />
          <circle cx="200" cy="250" r="120" stroke="white" strokeWidth="0.5" fill="none" />
          <circle cx="1000" cy="250" r="200" stroke="white" strokeWidth="1" fill="none" />
          <path d="M0 250 Q 300 100 600 250 Q 900 400 1200 250" stroke="white" strokeWidth="1" fill="none" />
          <path d="M0 300 Q 300 150 600 300 Q 900 450 1200 300" stroke="white" strokeWidth="0.5" fill="none" />
          {/* Plus signs */}
          <text x="100" y="100" fill="white" fontSize="24" opacity="0.5">+</text>
          <text x="500" y="400" fill="white" fontSize="24" opacity="0.5">+</text>
          <text x="1100" y="150" fill="white" fontSize="24" opacity="0.5">+</text>
        </svg>
      </div>

      <div className="relative max-w-[1280px] mx-auto px-8 lg:px-16 flex flex-col items-center text-center gap-8">
        <h2 className="font-bold text-white leading-tight tracking-tight" style={{ fontSize: "clamp(48px, 7vw, 96px)" }}>
          Kotamu Bukan<br />
          <span className="text-neutral-500">Sekadar Peta.</span>
        </h2>

        <p className="text-2xl lg:text-3xl font-semibold text-neutral-400 leading-tight max-w-2xl">
          Ada Kondisi di Baliknya.
        </p>

        <p className="text-neutral-500 text-base max-w-lg leading-relaxed">
          Bantu dokumentasikan kondisi infrastruktur di sekitarmu dan jadikan
          pengalaman warga sebagai data yang dapat dilihat bersama.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 mt-4 w-full sm:w-auto">
          <Link
            href="/ajuan"
            className="group inline-flex items-center justify-center gap-2 bg-white text-black font-semibold px-10 py-5 rounded-xl text-base hover:bg-neutral-100 transition-all duration-200"
          >
            Mulai Menilai
            <span className="inline-block transition-transform duration-200 group-hover:translate-x-1">↗</span>
          </Link>
          <Link
            href="#peta"
            className="inline-flex items-center justify-center gap-2 border border-neutral-700 text-neutral-400 font-semibold px-10 py-5 rounded-xl text-base hover:border-neutral-500 hover:text-white transition-all duration-200"
          >
            Jelajahi Peta
          </Link>
        </div>
      </div>
    </section>
  );
}
