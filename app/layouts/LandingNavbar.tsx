"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";

const navLinks = [
  { label: "Beranda", href: "/" },
  { label: "Jelajahi", href: "#peta" },
  { label: "Kategori", href: "#kategori" },
  { label: "Cara Kerja", href: "#cara-kerja" },
  { label: "Tentang Bina", href: "#tentang" },
];

export default function LandingNavbar({ user }: { user?: { name?: string | null } | null }) {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled
            ? "bg-white/90 backdrop-blur-md border-b border-neutral-100 shadow-sm"
            : "bg-transparent"
        }`}
        style={{ height: "76px" }}
      >
        <div className="max-w-[1280px] mx-auto px-6 lg:px-16 h-full flex items-center justify-between">

          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 font-bold text-xl text-black tracking-tight">
            <Image src="/logo/logo.png" alt="Bina logo" width={32} height={32} className="w-8 h-8 object-contain" />
            <span>bina.</span>
          </Link>

          {/* Desktop nav */}
          <nav className="hidden lg:flex items-center gap-8">
            {navLinks.map(l => (
              <Link
                key={l.label}
                href={l.href}
                className="text-sm text-neutral-600 hover:text-black transition-colors duration-150 font-medium"
              >
                {l.label}
              </Link>
            ))}
          </nav>

          {/* Desktop CTA */}
          <div className="hidden lg:flex items-center gap-3">
            {user ? (
              <Link
                href="/dashboard"
                className="text-sm font-semibold text-black border border-neutral-200 px-5 py-2.5 rounded-xl hover:border-neutral-400 hover:bg-neutral-50 transition-all duration-150"
              >
                Dashboard
              </Link>
            ) : (
              <>
                <Link
                  href="/login"
                  className="text-sm font-medium text-neutral-600 hover:text-black transition-colors duration-150"
                >
                  Masuk
                </Link>
                <Link
                  href="/ajuan"
                  className="group text-sm font-semibold bg-black text-white px-5 py-2.5 rounded-xl hover:bg-neutral-800 transition-all duration-150 flex items-center gap-1"
                >
                  Nilai Sekarang
                  <span className="inline-block transition-transform duration-150 group-hover:translate-x-0.5">↗</span>
                </Link>
              </>
            )}
          </div>

          {/* Mobile hamburger */}
          <button
            className="lg:hidden p-2 rounded-lg hover:bg-neutral-100 transition-colors duration-150"
            onClick={() => setMenuOpen(v => !v)}
            aria-label="Toggle menu"
          >
            <div className="w-5 flex flex-col gap-1.5">
              <span className={`block h-px bg-black transition-all duration-200 ${menuOpen ? "rotate-45 translate-y-2" : ""}`} />
              <span className={`block h-px bg-black transition-all duration-200 ${menuOpen ? "opacity-0" : ""}`} />
              <span className={`block h-px bg-black transition-all duration-200 ${menuOpen ? "-rotate-45 -translate-y-2" : ""}`} />
            </div>
          </button>
        </div>
      </header>

      {/* Mobile menu */}
      <div
        className={`fixed top-[76px] left-0 right-0 z-40 bg-white border-b border-neutral-100 shadow-lg transition-all duration-300 lg:hidden ${
          menuOpen ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-4 pointer-events-none"
        }`}
      >
        <div className="max-w-[1280px] mx-auto px-6 py-6 flex flex-col gap-4">
          {navLinks.map(l => (
            <Link
              key={l.label}
              href={l.href}
              className="text-sm font-medium text-neutral-700 hover:text-black py-2 border-b border-neutral-50"
              onClick={() => setMenuOpen(false)}
            >
              {l.label}
            </Link>
          ))}
          <div className="pt-2">
            <Link
              href="/ajuan"
              className="w-full inline-flex items-center justify-center gap-2 bg-black text-white font-semibold py-4 rounded-xl text-sm"
              onClick={() => setMenuOpen(false)}
            >
              Nilai Sekarang ↗
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
