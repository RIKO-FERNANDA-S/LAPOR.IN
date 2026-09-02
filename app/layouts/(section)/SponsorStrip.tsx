"use client";
import React from "react";
import Image from "next/image";

const sponsors = [
  { src: "/logo/sponsor/sponsor1.jpeg", alt: "Sponsor 1" },
  { src: "/logo/sponsor/sponsor2.jpeg", alt: "Sponsor 2" },
  { src: "/logo/sponsor/sponsor3.jpeg", alt: "Sponsor 3" },
  { src: "/logo/sponsor/sponsor4.jpeg", alt: "Sponsor 4" },
  { src: "/logo/sponsor/sponsor5.jpeg", alt: "Sponsor 5" },
  { src: "/logo/sponsor/sponsor6.jpeg", alt: "Sponsor 6" },
];

export default function SponsorStrip() {
  return (
    <section className="w-full border-t border-b border-neutral-100 bg-white py-10 overflow-hidden">
      <div className="max-w-[1280px] mx-auto px-8 lg:px-16 mb-6">
        <p className="text-[11px] font-semibold tracking-[0.2em] text-neutral-400 uppercase">
          DIDUKUNG OLEH
        </p>
      </div>

      {/* Infinite scroll track */}
      <div className="relative w-full overflow-hidden">
        <div className="flex gap-16 items-center sponsor-track">
          {/* Render twice for seamless loop */}
          {[...sponsors, ...sponsors].map((s, i) => (
            <div
              key={i}
              className="flex-shrink-0 flex items-center justify-center"
              style={{ minWidth: "160px", height: "56px" }}
            >
              <Image
                src={s.src}
                alt={s.alt}
                width={140}
                height={48}
                className="object-contain grayscale opacity-60 hover:grayscale-0 hover:opacity-100 transition-all duration-300"
              />
            </div>
          ))}
        </div>
      </div>

      <style jsx>{`
        .sponsor-track {
          width: max-content;
          animation: scrollLeft 28s linear infinite;
        }
        .sponsor-track:hover {
          animation-play-state: paused;
        }
        @keyframes scrollLeft {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
      `}</style>
    </section>
  );
}
