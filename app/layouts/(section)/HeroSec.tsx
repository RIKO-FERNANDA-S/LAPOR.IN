"use client";
import React, { useEffect, useRef } from "react";
import Link from "next/link";

export default function HeroSec() {
  const floatRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const cards = document.querySelectorAll(".hero-float-card");
    cards.forEach((card, i) => {
      const el = card as HTMLElement;
      el.style.animationDelay = `${i * 0.4}s`;
    });
  }, []);

  return (
    <section className="relative w-full min-h-screen flex items-center overflow-hidden bg-white pt-24 pb-20">
      {/* Subtle grid background */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage:
            "linear-gradient(rgba(0,0,0,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(0,0,0,0.03) 1px, transparent 1px)",
          backgroundSize: "60px 60px",
        }}
      />

      {/* Decorative starburst */}
      <div className="absolute top-32 left-[48%] pointer-events-none opacity-20">
        <svg width="60" height="60" viewBox="0 0 60 60" fill="none">
          {[0, 30, 60, 90, 120, 150].map((angle, i) => (
            <line
              key={i}
              x1="30" y1="30"
              x2={30 + 28 * Math.cos((angle * Math.PI) / 180)}
              y2={30 + 28 * Math.sin((angle * Math.PI) / 180)}
              stroke="#111" strokeWidth="1.5"
            />
          ))}
        </svg>
      </div>

      {/* Decorative curved line */}
      <div className="absolute bottom-40 left-10 pointer-events-none opacity-10">
        <svg width="200" height="120" viewBox="0 0 200 120" fill="none">
          <path d="M0 100 Q 100 0 200 60" stroke="#111" strokeWidth="1.5" fill="none" />
        </svg>
      </div>

      {/* Dotted vertical line decoration */}
      <div className="absolute top-1/4 left-[52%] h-40 pointer-events-none opacity-20">
        <svg width="2" height="160" viewBox="0 0 2 160">
          <line x1="1" y1="0" x2="1" y2="160" stroke="#111" strokeWidth="1.5" strokeDasharray="4 6" />
        </svg>
      </div>

      <div className="relative w-full max-w-[1280px] mx-auto px-8 lg:px-16 flex flex-col lg:flex-row items-center gap-16">

        {/* LEFT: Text Content */}
        <div className="w-full lg:w-[52%] flex flex-col gap-7 z-10">
          <span className="inline-block text-[11px] font-semibold tracking-[0.2em] text-neutral-500 uppercase border border-neutral-200 rounded-full px-4 py-1.5 w-max">
            INFRASTRUKTUR KOTA, DILIHAT DARI LAPANGAN
          </span>

          <h1
            className="font-bold text-black leading-[1.05] tracking-tight"
            style={{ fontSize: "clamp(48px, 6vw, 88px)" }}
          >
            Seberapa Layak<br />
            <span className="relative">
              Kotamu
              <svg className="absolute -bottom-1 left-0 w-full" height="6" viewBox="0 0 200 6" preserveAspectRatio="none">
                <path d="M0 5 Q 50 0 100 5 Q 150 10 200 5" stroke="#111" strokeWidth="1.5" fill="none" />
              </svg>
            </span>{" "}
            Hari Ini?
          </h1>

          <p className="text-neutral-500 text-lg leading-relaxed max-w-[480px]">
            Bina membantu masyarakat melihat, menilai, dan memahami kondisi infrastruktur serta
            fasilitas publik berdasarkan apa yang benar-benar terjadi di lapangan.
          </p>

          <div className="flex flex-col sm:flex-row gap-3 mt-2">
            <Link
              href="/ajuan"
              className="group inline-flex items-center gap-2 bg-black text-white font-semibold px-8 py-4 rounded-xl text-base hover:bg-neutral-800 transition-all duration-200 w-max"
            >
              Mulai Menilai
              <span className="inline-block transition-transform duration-200 group-hover:translate-x-1">↗</span>
            </Link>
            <Link
              href="#peta"
              className="inline-flex items-center gap-2 border border-neutral-200 text-black font-semibold px-8 py-4 rounded-xl text-base hover:border-neutral-400 hover:bg-neutral-50 transition-all duration-200 w-max"
            >
              Jelajahi Kota
            </Link>
          </div>

          <p className="text-xs text-neutral-400 max-w-sm leading-relaxed">
            Nilai berdasarkan kondisi nyata. Sertakan bukti. Bangun gambaran kotamu bersama.
          </p>
        </div>

        {/* RIGHT: Map Visual Composition */}
        <div className="w-full lg:w-[48%] relative h-[500px] lg:h-[580px]" ref={floatRef}>

          {/* Base map placeholder */}
          <div className="absolute inset-4 rounded-2xl overflow-hidden border border-neutral-100 shadow-xl bg-neutral-50">
            {/* SVG Map of Surabaya simplified */}
            <svg width="100%" height="100%" viewBox="0 0 500 500" className="opacity-20">
              <defs>
                <pattern id="grid" width="30" height="30" patternUnits="userSpaceOnUse">
                  <path d="M 30 0 L 0 0 0 30" fill="none" stroke="#aaa" strokeWidth="0.5" />
                </pattern>
              </defs>
              <rect width="500" height="500" fill="url(#grid)" />
              {/* Simplified road lines */}
              <path d="M50 250 L450 250" stroke="#888" strokeWidth="2" />
              <path d="M250 50 L250 450" stroke="#888" strokeWidth="2" />
              <path d="M50 150 Q 200 130 350 180 L 450 150" stroke="#888" strokeWidth="1.5" fill="none" />
              <path d="M50 350 Q 150 330 300 370 L 450 350" stroke="#888" strokeWidth="1.5" fill="none" />
              <path d="M150 50 Q 160 200 140 350 L 150 450" stroke="#888" strokeWidth="1" fill="none" />
              <path d="M350 50 Q 360 250 340 450" stroke="#888" strokeWidth="1" fill="none" />
              <path d="M80 100 Q 200 80 400 120" stroke="#aaa" strokeWidth="0.8" fill="none" />
              <path d="M80 400 Q 250 380 420 420" stroke="#aaa" strokeWidth="0.8" fill="none" />
              {/* Blocks */}
              <rect x="70" y="70" width="60" height="50" rx="4" fill="#ddd" opacity="0.5" />
              <rect x="160" y="80" width="70" height="40" rx="4" fill="#ddd" opacity="0.5" />
              <rect x="270" y="60" width="50" height="60" rx="4" fill="#ddd" opacity="0.5" />
              <rect x="370" y="75" width="65" height="45" rx="4" fill="#ddd" opacity="0.5" />
              <rect x="70" y="290" width="55" height="55" rx="4" fill="#ddd" opacity="0.5" />
              <rect x="160" y="280" width="75" height="45" rx="4" fill="#ddd" opacity="0.5" />
              <rect x="280" y="295" width="60" height="50" rx="4" fill="#ddd" opacity="0.5" />
              <rect x="380" y="285" width="55" height="55" rx="4" fill="#ddd" opacity="0.5" />
            </svg>

            {/* Location pins */}
            <div className="absolute top-[28%] left-[38%] flex flex-col items-center">
              <div className="w-4 h-4 rounded-full bg-black shadow-lg animate-ping-slow ring-4 ring-black/10" />
            </div>
            <div className="absolute top-[55%] left-[62%] flex flex-col items-center">
              <div className="w-3 h-3 rounded-full bg-neutral-600 shadow ring-3 ring-neutral-400/20" />
            </div>
            <div className="absolute top-[40%] left-[20%] flex flex-col items-center">
              <div className="w-3 h-3 rounded-full bg-neutral-600 shadow ring-3 ring-neutral-400/20" />
            </div>
          </div>

          {/* Floating Card: Main */}
          <div
            className="hero-float-card absolute top-8 right-0 lg:-right-4 bg-white border border-neutral-100 rounded-2xl p-5 shadow-2xl w-48 z-20"
            style={{ animation: "floatY 4s ease-in-out infinite", transform: "rotate(2deg)" }}
          >
            <div className="flex items-start justify-between mb-2">
              <p className="text-xs text-neutral-400 font-medium">Taman Bungkul</p>
              <span className="text-[10px] bg-black text-white px-2 py-0.5 rounded-full font-semibold">ADIBINA</span>
            </div>
            <p className="text-4xl font-bold text-black leading-none">88</p>
            <p className="text-[10px] text-neutral-400 mt-1">/ 100</p>
            <div className="flex gap-0.5 mt-2">
              {[1,2,3,4,5].map(s => (
                <svg key={s} className="w-3 h-3 fill-black" viewBox="0 0 20 20">
                  <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
                </svg>
              ))}
            </div>
          </div>

          {/* Floating Card: Secondary */}
          <div
            className="hero-float-card absolute bottom-16 left-0 lg:-left-4 bg-white border border-neutral-100 rounded-xl p-4 shadow-xl w-44 z-20"
            style={{ animation: "floatY 5s ease-in-out infinite", animationDelay: "1s", transform: "rotate(-1.5deg)" }}
          >
            <p className="text-xs text-neutral-500 font-medium mb-1">Jalan Darmo</p>
            <p className="text-2xl font-bold text-black">74</p>
            <span className="text-[10px] text-neutral-500">SWABINA</span>
            <div className="flex gap-0.5 mt-2">
              {[1,2,3,4].map(s => (
                <svg key={s} className="w-2.5 h-2.5 fill-black" viewBox="0 0 20 20">
                  <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
                </svg>
              ))}
              <svg className="w-2.5 h-2.5 fill-neutral-200" viewBox="0 0 20 20">
                <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
              </svg>
            </div>
          </div>

          {/* Floating data label */}
          <div
            className="hero-float-card absolute bottom-8 right-12 bg-neutral-900 text-white rounded-xl px-4 py-3 shadow-xl z-20"
            style={{ animation: "floatY 6s ease-in-out infinite", animationDelay: "0.6s" }}
          >
            <p className="text-[10px] text-neutral-400 font-medium">Halte Rajawali</p>
            <p className="text-lg font-bold">61 <span className="text-xs text-neutral-400 font-normal">PURWABINA</span></p>
          </div>

          {/* Small plus decorations */}
          <div className="absolute top-20 left-12 text-neutral-300 text-xl font-thin pointer-events-none">+</div>
          <div className="absolute bottom-32 right-8 text-neutral-300 text-xl font-thin pointer-events-none">+</div>
        </div>
      </div>

      <style jsx>{`
        @keyframes floatY {
          0%, 100% { transform: translateY(0) rotate(var(--rotate, 0deg)); }
          50% { transform: translateY(-12px) rotate(var(--rotate, 0deg)); }
        }
        @keyframes ping-slow {
          0%, 100% { opacity: 1; transform: scale(1); }
          50% { opacity: 0.4; transform: scale(1.6); }
        }
        .animate-ping-slow { animation: ping-slow 2s ease-in-out infinite; }
      `}</style>
    </section>
  );
}