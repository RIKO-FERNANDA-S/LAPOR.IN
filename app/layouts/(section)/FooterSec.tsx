import React from "react";
import Link from "next/link";

export default function FooterSec() {
  return (
    <footer className="w-full bg-neutral-950 text-white pt-20 pb-10">
      <div className="max-w-[1280px] mx-auto px-8 lg:px-16">

        {/* Top row */}
        <div className="flex flex-col lg:flex-row gap-12 lg:gap-24 mb-16">

          {/* Brand */}
          <div className="lg:w-[35%] flex flex-col gap-4">
            <p className="text-2xl font-bold tracking-tight">bina.</p>
            <p className="text-neutral-500 text-sm leading-relaxed max-w-xs">
              Platform informasi dan penilaian infrastruktur serta fasilitas publik berbasis masyarakat.
            </p>
          </div>

          {/* Links */}
          <div className="lg:w-[65%] grid grid-cols-2 sm:grid-cols-3 gap-8">
            <div className="flex flex-col gap-3">
              <p className="text-xs font-semibold tracking-widest text-neutral-500 uppercase mb-1">Jelajahi</p>
              {["Peta", "Infrastruktur", "Fasilitas Publik", "Wilayah"].map(l => (
                <Link key={l} href="#" className="text-sm text-neutral-400 hover:text-white transition-colors duration-150">{l}</Link>
              ))}
            </div>
            <div className="flex flex-col gap-3">
              <p className="text-xs font-semibold tracking-widest text-neutral-500 uppercase mb-1">Tentang</p>
              {["Tentang Bina", "Cara Kerja", "Metodologi"].map(l => (
                <Link key={l} href="#" className="text-sm text-neutral-400 hover:text-white transition-colors duration-150">{l}</Link>
              ))}
            </div>
            <div className="flex flex-col gap-3">
              <p className="text-xs font-semibold tracking-widest text-neutral-500 uppercase mb-1">Komunitas</p>
              {["Nilai Sekarang", "Laporkan Tempat", "Panduan"].map(l => (
                <Link key={l} href="#" className="text-sm text-neutral-400 hover:text-white transition-colors duration-150">{l}</Link>
              ))}
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="w-full h-px bg-neutral-800 mb-8" />

        {/* Bottom */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <p className="text-xs text-neutral-600">© 2026 Bina. Semua hak dilindungi.</p>
          <div className="flex gap-4">
            <Link href="#" className="text-xs text-neutral-600 hover:text-neutral-400 transition-colors duration-150">Privasi</Link>
            <Link href="#" className="text-xs text-neutral-600 hover:text-neutral-400 transition-colors duration-150">Ketentuan</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
