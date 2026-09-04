import React from "react";
import Image from "next/image";
import img from "@/public/image/image1.jpeg"

export default function TentangSec() {
  return (
    <section id="tentang" className="w-full bg-white py-32">
      <div className="max-w-[1280px] mx-auto px-8 lg:px-16 flex flex-col lg:flex-row gap-16 lg:gap-24 items-center">

        {/* LEFT */}
        <div className="w-full lg:w-[50%] flex flex-col gap-6">
          <span className="text-[11px] font-semibold tracking-[0.2em] text-neutral-400 uppercase border border-neutral-200 rounded-full px-4 py-1.5 w-max">
            TENTANG BINA
          </span>

          <h2 className="font-bold text-black leading-tight tracking-tight" style={{ fontSize: "clamp(36px, 4vw, 60px)" }}>
            Suara Warga<br />
            untuk Infrastruktur.
          </h2>

          <div className="w-12 h-[2px] bg-black" />

          <p className="text-neutral-500 leading-relaxed text-base lg:text-lg">
            Infrastruktur bukan hanya tentang apa yang dibangun. Kondisi, aksesibilitas,
            kebersihan, keamanan, dan kualitas pelayanan juga menentukan apakah sebuah
            fasilitas benar-benar dapat digunakan dengan baik.
          </p>

          <p className="text-neutral-500 leading-relaxed text-base lg:text-lg">
            Bina menghadirkan ruang bagi masyarakat untuk mendokumentasikan kondisi tersebut
            dan mengubah pengalaman di lapangan menjadi informasi yang dapat dilihat bersama.
          </p>

          <div className="mt-4 p-6 bg-neutral-50 border border-neutral-100 rounded-2xl">
            <p className="text-sm font-semibold text-black mb-3">Yang bisa kamu nilai:</p>
            <div className="grid grid-cols-2 gap-2">
              {["Jalan & Mobilitas", "Ruang Publik", "Layanan Birokrasi", "Pendidikan", "Air & Sanitasi", "Listrik", "Telekomunikasi", "Kesehatan"].map((item, i) => (
                <div key={i} className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-black flex-shrink-0" />
                  <p className="text-xs text-neutral-600">{item}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* RIGHT: collage */}
        <div className="w-full lg:w-[50%] relative h-[420px] lg:h-[520px]">
          {/* Main large image placeholder */}
          <div className="absolute top-0 right-0 w-[70%] h-[75%] bg-neutral-100 rounded-2xl overflow-hidden border border-neutral-200">
            <div className="w-full h-full flex items-end justify-end p-4 bg-center bg-[url('/image/image2.jpeg')] bg-top">

              <span className="text-[10px] text-white/80 uppercase tracking-widest">JALAN KOTA</span>
            </div>
          </div>

          {/* Secondary image */}
          <div className="absolute bottom-0 left-0 w-[55%] h-[52%] bg-[url('/image/image1.jpeg')] bg-center rounded-2xl overflow-hidden border border-neutral-200"
            >
            <div className="w-full h-full flex items-end justify-start p-3">
              <span className="text-[10px] text-white/80 uppercase tracking-widest">TAMAN PUBLIK</span>
            </div>
          </div>

          {/* Accent block */}
          <div className="absolute top-[20%] left-0 w-[40%] h-[30%] bg-black rounded-2xl flex flex-col justify-center p-4">
            <p className="text-white text-3xl font-bold">40%</p>
            <p className="text-neutral-400 text-xs mt-1">Fasilitas perlu perhatian</p>
          </div>

          {/* Decorative plus */}
          <div className="absolute top-2 left-[38%] text-neutral-200 text-2xl font-thin">+</div>
          <div className="absolute bottom-[54%] right-4 text-neutral-200 text-2xl font-thin">+</div>
        </div>
      </div>
    </section>
  );
}