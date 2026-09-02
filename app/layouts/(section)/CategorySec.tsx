import React from "react";

const categories = [
  { num: "01", title: "Jalan & Mobilitas", desc: "Jalan, trotoar, JPO, halte, rambu, marka, dan akses mobilitas." },
  { num: "02", title: "Ruang Publik", desc: "Taman, pedestrian, toilet, tempat sampah, kebersihan, dan fasilitas umum." },
  { num: "03", title: "Layanan Birokrasi", desc: "Fasilitas MPP, akses layanan, kondisi bangunan, dan kualitas pelayanan." },
  { num: "04", title: "Pendidikan", desc: "Sekolah, fasilitas belajar, kondisi bangunan, peralatan, dan kualitas pendidikan." },
  { num: "05", title: "Air & Sanitasi", desc: "Ketersediaan air bersih dan akses terhadap layanan air." },
  { num: "06", title: "Listrik", desc: "Cakupan listrik dan kualitas layanan berdasarkan intensitas gangguan." },
  { num: "07", title: "Telekomunikasi", desc: "Cakupan jaringan, ketersediaan provider, dan kualitas konektivitas." },
  { num: "08", title: "Kesehatan", desc: "Puskesmas, rumah sakit, layanan kesehatan, bangunan, dan peralatan medis." },
];

const icons: Record<string, React.ReactNode> = {
  "01": (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l9-5 9 5v8l-9 5-9-5V8z" />
    </svg>
  ),
  "02": (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 21h16.5M4.5 3h15M5.25 3v18m13.5-18v18M9 6.75h1.5m-1.5 3h1.5m-1.5 3h1.5m3-6H15m-1.5 3H15m-1.5 3H15M9 21v-3.375c0-.621.504-1.125 1.125-1.125h3.75c.621 0 1.125.504 1.125 1.125V21" />
    </svg>
  ),
  "03": (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 21v-8.25M15.75 21v-8.25M8.25 21v-8.25M3 9l9-6 9 6m-1.5 12V10.332A48.36 48.36 0 0012 9.75c-2.551 0-5.056.2-7.5.582V21M3 21h18M12 6.75h.008v.008H12V6.75z" />
    </svg>
  ),
  "04": (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" d="M4.26 10.147a60.436 60.436 0 00-.491 6.347A48.627 48.627 0 0112 20.904a48.627 48.627 0 018.232-4.41 60.46 60.46 0 00-.491-6.347m-15.482 0a50.57 50.57 0 00-2.658-.813A59.905 59.905 0 0112 3.493a59.902 59.902 0 0110.399 5.84c-.896.248-1.783.52-2.658.814m-15.482 0A50.697 50.697 0 0112 13.489a50.702 50.702 0 017.74-3.342M6.75 15a.75.75 0 100-1.5.75.75 0 000 1.5zm0 0v-3.675A55.378 55.378 0 0112 8.443m-7.007 11.55A5.981 5.981 0 006.75 15.75v-1.5" />
    </svg>
  ),
  "05": (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v2.25m6.364.386l-1.591 1.591M21 12h-2.25m-.386 6.364l-1.591-1.591M12 18.75V21m-4.773-4.227l-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636" />
    </svg>
  ),
  "06": (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z" />
    </svg>
  ),
  "07": (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" d="M8.288 15.038a5.25 5.25 0 017.424 0M5.106 11.856c3.807-3.808 9.98-3.808 13.788 0M1.924 8.674c5.565-5.565 14.587-5.565 20.152 0M12.53 18.22l-.53.53-.53-.53a.75.75 0 011.06 0z" />
    </svg>
  ),
  "08": (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z" />
    </svg>
  ),
};

export default function CategorySec() {
  return (
    <section id="kategori" className="w-full bg-black py-32">
      <div className="max-w-[1280px] mx-auto px-8 lg:px-16">

        {/* Header */}
        <div className="mb-16 max-w-2xl">
          <h2 className="font-bold text-white leading-tight tracking-tight mb-6" style={{ fontSize: "clamp(36px, 4vw, 58px)" }}>
            Kami Tidak Hanya<br />
            Menilai Tempat.<br />
            <span className="text-neutral-500">Kami Menilai Kondisinya.</span>
          </h2>
          <p className="text-neutral-400 leading-relaxed text-base lg:text-lg">
            Bina mencakup berbagai aspek yang membentuk kualitas hidup masyarakat,
            dari jalan yang digunakan setiap hari hingga akses air, listrik, telekomunikasi,
            pendidikan, dan kesehatan.
          </p>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-px bg-neutral-800 border border-neutral-800 rounded-2xl overflow-hidden">
          {categories.map((cat, i) => (
            <div
              key={i}
              className="bg-black p-8 flex flex-col gap-4 hover:bg-neutral-900 transition-colors duration-200 group cursor-pointer"
            >
              <div className="flex items-center justify-between">
                <span className="text-[11px] text-neutral-600 font-mono">{cat.num}</span>
                <span className="text-neutral-600 group-hover:text-white transition-colors duration-200">
                  {icons[cat.num]}
                </span>
              </div>
              <h3 className="text-white font-semibold text-base">{cat.title}</h3>
              <p className="text-neutral-500 text-xs leading-relaxed">{cat.desc}</p>
              <div className="mt-auto pt-4 flex items-center gap-2 text-neutral-600 group-hover:text-white transition-colors duration-200 text-xs">
                <span>Jelajahi</span>
                <span className="transition-transform duration-200 group-hover:translate-x-1">→</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
