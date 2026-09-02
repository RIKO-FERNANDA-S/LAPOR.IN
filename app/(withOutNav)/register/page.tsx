"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";

export default function RegisterPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    try {
      const response = await fetch("/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, email, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.message || "Gagal membuat akun.");
        setIsLoading(false);
        return;
      }

      // Store temp register credentials in sessionStorage if needed for auto-login after OTP
      if (typeof window !== "undefined") {
        sessionStorage.setItem("pending_login_email", email);
        sessionStorage.setItem("pending_login_password", password);
      }

      // Redirect to OTP Verification Page
      const searchParams = new URLSearchParams({
        email: email,
        type: "register",
      });
      if (data.devOtp) {
        searchParams.set("devOtp", data.devOtp);
      }

      router.push(`/otp?${searchParams.toString()}`);
    } catch (err: any) {
      setError("Terjadi kesalahan jaringan. Silakan coba lagi.");
      setIsLoading(false);
    }
  };

  const handleGoogleLogin = () => {
    signIn("google", { callbackUrl: "/dashboard" });
  };

  return (
    <div className="min-h-screen w-full bg-white flex flex-col">

      {/* Subtle grid background */}
      <div
        className="fixed inset-0 pointer-events-none z-0"
        style={{
          backgroundImage:
            "linear-gradient(rgba(0,0,0,0.025) 1px, transparent 1px), linear-gradient(90deg, rgba(0,0,0,0.025) 1px, transparent 1px)",
          backgroundSize: "56px 56px",
        }}
      />

      {/* Top bar */}
      <header className="relative z-10 w-full flex items-center justify-between px-8 lg:px-16 h-[72px] border-b border-neutral-100 bg-white/80 backdrop-blur-sm">
        <Link href="/" className="flex items-center gap-3 font-bold text-xl text-black tracking-tight">
          <Image src="/logo/logo.png" alt="Bina logo" width={32} height={32} className="w-8 h-8 object-contain" />
          <span>bina.</span>
        </Link>
        <Link
          href="/login"
          className="text-sm font-medium text-neutral-600 hover:text-black border border-neutral-200 hover:border-neutral-400 px-5 py-2 rounded-xl transition-all duration-150"
        >
          Masuk
        </Link>
      </header>

      {/* Main content */}
      <main className="relative z-10 flex-1 flex items-center justify-center px-6 py-16">
        <div className="w-full max-w-[440px] flex flex-col gap-8">

          {/* Heading block */}
          <div className="flex flex-col gap-3">
            <span className="text-[11px] font-semibold tracking-[0.2em] text-neutral-400 uppercase border border-neutral-200 rounded-full px-4 py-1.5 w-max">
              BERGABUNG DENGAN BINA
            </span>
            <h1 className="text-4xl font-bold text-black leading-tight tracking-tight">
              Buat Akun<br />
              <span className="text-neutral-400">Gratis.</span>
            </h1>
            <p className="text-sm text-neutral-500 leading-relaxed">
              Daftar dan mulai berkontribusi dalam menilai kondisi infrastruktur kotamu bersama warga lainnya.
            </p>
          </div>

          {/* Error */}
          {error && (
            <div className="flex items-start gap-3 p-4 bg-neutral-50 border border-neutral-200 rounded-xl text-sm text-neutral-700">
              <svg className="w-4 h-4 mt-0.5 flex-shrink-0 text-neutral-500" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
              </svg>
              <span>{error}</span>
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit} className="flex flex-col gap-5">
            {/* Name */}
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-semibold text-neutral-500 uppercase tracking-widest">
                Nama Lengkap
              </label>
              <div className="relative">
                <span className="absolute inset-y-0 left-4 flex items-center pointer-events-none text-neutral-400">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
                  </svg>
                </span>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Nama Lengkap Anda"
                  className="w-full pl-11 pr-4 py-3.5 bg-white border border-neutral-200 rounded-xl text-sm text-black placeholder-neutral-400 focus:outline-none focus:border-black focus:ring-2 focus:ring-black/5 transition-all duration-150"
                />
              </div>
            </div>

            {/* Email */}
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-semibold text-neutral-500 uppercase tracking-widest">
                Alamat Email
              </label>
              <div className="relative">
                <span className="absolute inset-y-0 left-4 flex items-center pointer-events-none text-neutral-400">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
                  </svg>
                </span>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="nama@email.com"
                  className="w-full pl-11 pr-4 py-3.5 bg-white border border-neutral-200 rounded-xl text-sm text-black placeholder-neutral-400 focus:outline-none focus:border-black focus:ring-2 focus:ring-black/5 transition-all duration-150"
                />
              </div>
            </div>

            {/* Password */}
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-semibold text-neutral-500 uppercase tracking-widest">
                Kata Sandi
              </label>
              <div className="relative">
                <span className="absolute inset-y-0 left-4 flex items-center pointer-events-none text-neutral-400">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z" />
                  </svg>
                </span>
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Minimal 6 karakter"
                  className="w-full pl-11 pr-4 py-3.5 bg-white border border-neutral-200 rounded-xl text-sm text-black placeholder-neutral-400 focus:outline-none focus:border-black focus:ring-2 focus:ring-black/5 transition-all duration-150"
                />
              </div>
              <p className="text-[11px] text-neutral-400 mt-0.5 pl-1">
                Kata sandi minimal 6 karakter
              </p>
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-4 bg-black text-white font-semibold rounded-xl text-sm hover:bg-neutral-800 active:scale-[0.98] transition-all duration-150 disabled:opacity-50 disabled:pointer-events-none flex items-center justify-center gap-2 mt-1"
            >
              {isLoading ? (
                <span className="inline-block w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              ) : (
                <>
                  <span>Lanjutkan Verifikasi Email</span>
                  <span>→</span>
                </>
              )}
            </button>
          </form>

          {/* Divider */}
          <div className="relative flex items-center gap-4">
            <div className="flex-1 h-px bg-neutral-100" />
            <span className="text-[11px] font-semibold text-neutral-400 uppercase tracking-widest flex-shrink-0">atau</span>
            <div className="flex-1 h-px bg-neutral-100" />
          </div>

          {/* Google OAuth */}
          <button
            type="button"
            onClick={handleGoogleLogin}
            className="w-full py-3.5 px-4 bg-white border border-neutral-200 hover:border-neutral-400 text-black font-medium rounded-xl text-sm flex items-center justify-center gap-3 transition-all duration-150 hover:bg-neutral-50 active:scale-[0.98]"
          >
            <svg className="w-4 h-4" viewBox="0 0 24 24">
              <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
              <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
              <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z" />
              <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
            </svg>
            <span>Lanjutkan dengan Google</span>
          </button>

          {/* Login link */}
          <p className="text-center text-xs text-neutral-500">
            Sudah punya akun?{" "}
            <Link href="/login" className="text-black font-semibold hover:underline underline-offset-2 transition-colors duration-150">
              Masuk di sini
            </Link>
          </p>

          {/* OTP notice */}
          <div className="flex items-start gap-3 p-4 bg-neutral-50 border border-neutral-100 rounded-xl">
            <svg className="w-4 h-4 mt-0.5 flex-shrink-0 text-neutral-400" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />
            </svg>
            <p className="text-[11px] text-neutral-500 leading-relaxed">
              Setelah mendaftar, kamu akan menerima kode verifikasi melalui email untuk mengaktifkan akun.
            </p>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="relative z-10 border-t border-neutral-100 px-8 lg:px-16 py-5 flex flex-col sm:flex-row items-center justify-between gap-3">
        <p className="text-xs text-neutral-400">© 2026 Bina. Semua hak dilindungi.</p>
        <div className="flex gap-6">
          <Link href="#" className="text-xs text-neutral-400 hover:text-black transition-colors duration-150">Privasi</Link>
          <Link href="#" className="text-xs text-neutral-400 hover:text-black transition-colors duration-150">Ketentuan</Link>
        </div>
      </footer>
    </div>
  );
}
