"use client";

import { useState, useRef, useEffect, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { signIn } from "next-auth/react";
import Link from "next/link";
import Logo from "@/app/layouts/(components)/Logo";
import { Mail, CheckCircle2, AlertCircle, RefreshCw, ArrowLeft, KeyRound } from "lucide-react";

function OTPContent() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const email = searchParams.get("email") || "";
  const type = (searchParams.get("type") as "register" | "reset_password") || "register";
  const initialDevOtp = searchParams.get("devOtp") || "";

  const [otp, setOtp] = useState<string[]>(["", "", "", "", "", ""]);
  const [error, setError] = useState("");
  const [successMsg, setSuccessMsg] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [devOtp, setDevOtp] = useState(initialDevOtp);

  // Resend Timer
  const [countdown, setCountdown] = useState(60);
  const [canResend, setCanResend] = useState(false);
  const [isResending, setIsResending] = useState(false);

  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  useEffect(() => {
    // Timer countdown
    if (countdown > 0) {
      const timer = setInterval(() => {
        setCountdown((prev) => prev - 1);
      }, 1000);
      return () => clearInterval(timer);
    } else {
      setCanResend(true);
    }
  }, [countdown]);

  // Handle single digit input
  const handleChange = (index: number, value: string) => {
    if (!/^\d*$/.test(value)) return;

    const newOtp = [...otp];
    newOtp[index] = value.slice(-1);
    setOtp(newOtp);

    // Auto focus next input
    if (value && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  // Handle backspace
  const handleKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  // Handle paste full code
  const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData("text").trim();
    if (/^\d{6}$/.test(pastedData)) {
      const digits = pastedData.split("");
      setOtp(digits);
      inputRefs.current[5]?.focus();
    }
  };

  // Submit OTP Verification
  const handleVerify = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    const code = otp.join("");
    if (code.length < 6) {
      setError("Silakan masukkan 6 digit kode OTP secara lengkap.");
      return;
    }

    setError("");
    setIsLoading(true);

    try {
      // Get pending credentials if register
      let pendingPassword = "";
      if (type === "register" && typeof window !== "undefined") {
        pendingPassword = sessionStorage.getItem("pending_login_password") || "";
      }

      const res = await fetch("/api/auth/verify-otp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email,
          code,
          type,
          password: pendingPassword,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.message || "Gagal memverifikasi OTP.");
        setIsLoading(false);
        return;
      }

      setSuccessMsg(data.message || "Verifikasi berhasil!");

      if (type === "register") {
        // Perform auto sign-in if password was cached
        if (pendingPassword) {
          const loginResult = await signIn("credentials", {
            redirect: false,
            email,
            password: pendingPassword,
          });

          if (typeof window !== "undefined") {
            sessionStorage.removeItem("pending_login_email");
            sessionStorage.removeItem("pending_login_password");
          }

          if (!loginResult?.error) {
            router.push("/dashboard");
            router.refresh();
            return;
          }
        }
        router.push("/login?verified=true");
      } else if (type === "reset_password") {
        // Redirect to new password form with reset token
        const resetParams = new URLSearchParams({
          email,
          token: data.resetToken || "",
        });
        router.push(`/resetpassword?${resetParams.toString()}`);
      }
    } catch (err: any) {
      setError("Terjadi kesalahan jaringan.");
      setIsLoading(false);
    }
  };

  // Resend OTP
  const handleResend = async () => {
    if (!canResend || isResending) return;
    setIsResending(true);
    setError("");

    try {
      const res = await fetch("/api/auth/send-otp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, type }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.message || "Gagal mengirim ulang OTP.");
        setIsResending(false);
        return;
      }

      setCountdown(60);
      setCanResend(false);
      if (data.devOtp) {
        setDevOtp(data.devOtp);
      }
      setSuccessMsg("Kode OTP baru telah dikirim ke email Anda.");
    } catch (err: any) {
      setError("Gagal menghubungi server.");
    } finally {
      setIsResending(false);
    }
  };

  const isReset = type === "reset_password";

  return (
    <div className="w-full min-h-screen flex flex-col items-center justify-between bg-slate-950 text-slate-100 font-sans p-6 md:p-12 relative overflow-hidden">
      {/* Background Orbs */}
      <div className="absolute top-1/4 left-1/3 w-96 h-96 bg-indigo-600/15 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute bottom-1/4 right-1/3 w-96 h-96 bg-purple-600/15 rounded-full blur-3xl pointer-events-none"></div>

      {/* Header */}
      <header className="w-full max-w-6xl flex justify-between items-center z-10">
        <Logo />
        <Link
          href={isReset ? "/resetpassword" : "/register"}
          className="text-xs md:text-sm text-slate-400 hover:text-white flex items-center gap-1.5 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Kembali</span>
        </Link>
      </header>

      {/* Main Glassmorphic Card */}
      <main className="w-full max-w-md my-auto z-10">
        <div className="bg-slate-900/90 backdrop-blur-xl border border-slate-800/90 rounded-3xl p-8 md:p-10 shadow-2xl shadow-indigo-950/40">
          <div className="text-center space-y-3 mb-8">
            <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 mb-1">
              <KeyRound className="w-7 h-7" />
            </div>
            <h1 className="text-2xl md:text-3xl font-bold tracking-tight text-white">
              {isReset ? "Verifikasi Reset Password" : "Verifikasi Kode OTP"}
            </h1>
            <p className="text-xs md:text-sm text-slate-400 leading-relaxed">
              Masukkan 6 digit kode OTP yang telah kami kirimkan ke email:
            </p>
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-slate-800/80 border border-slate-700/60 text-xs font-mono text-indigo-300">
              <Mail className="w-3.5 h-3.5" />
              <span>{email || "email@domain.com"}</span>
            </div>
          </div>

          {/* Dev Mode Notification Pill */}
          {devOtp && (
            <div className="mb-6 p-3 rounded-2xl bg-indigo-500/10 border border-indigo-500/30 text-indigo-300 text-xs text-center font-mono animate-pulse">
              ⚡ [DEV MODE OTP]: <strong className="text-white tracking-widest text-sm font-bold">{devOtp}</strong>
            </div>
          )}

          {error && (
            <div className="mb-6 p-3.5 rounded-2xl bg-rose-500/10 border border-rose-500/30 text-rose-400 text-xs flex items-center gap-2">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{error}</span>
            </div>
          )}

          {successMsg && !error && (
            <div className="mb-6 p-3.5 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 shrink-0" />
              <span>{successMsg}</span>
            </div>
          )}

          <form onSubmit={handleVerify} className="space-y-6">
            {/* 6 Digit Input Boxes */}
            <div className="flex justify-between items-center gap-2 md:gap-3">
              {otp.map((digit, idx) => (
                <input
                  key={idx}
                  ref={(el) => { inputRefs.current[idx] = el; }}
                  type="text"
                  inputMode="numeric"
                  maxLength={1}
                  value={digit}
                  onChange={(e) => handleChange(idx, e.target.value)}
                  onKeyDown={(e) => handleKeyDown(idx, e)}
                  onPaste={handlePaste}
                  className="w-12 h-14 md:w-14 md:h-16 text-center text-xl md:text-2xl font-bold font-mono bg-slate-950/90 border border-slate-800 rounded-2xl text-white focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/30 transition-all shadow-inner"
                />
              ))}
            </div>

            {/* Verify Submit Button */}
            <button
              type="submit"
              disabled={isLoading || otp.some((d) => !d)}
              className="w-full py-3.5 px-4 bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 text-white font-semibold rounded-2xl transition-all duration-200 shadow-lg shadow-indigo-500/25 active:scale-[0.98] disabled:opacity-50 text-sm flex items-center justify-center gap-2 cursor-pointer"
            >
              {isLoading ? (
                <span className="inline-block w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></span>
              ) : (
                <span>Verifikasi Kode OTP</span>
              )}
            </button>
          </form>

          {/* Resend Timer & Action */}
          <div className="mt-8 pt-6 border-t border-slate-800/80 text-center space-y-2">
            <p className="text-xs text-slate-400">Tidak menerima kode OTP?</p>
            {canResend ? (
              <button
                type="button"
                onClick={handleResend}
                disabled={isResending}
                className="text-xs font-semibold text-indigo-400 hover:text-indigo-300 flex items-center justify-center gap-1.5 mx-auto transition-colors cursor-pointer"
              >
                <RefreshCw className={`w-3.5 h-3.5 ${isResending ? "animate-spin" : ""}`} />
                <span>Kirim Ulang Kode</span>
              </button>
            ) : (
              <p className="text-xs text-slate-500 font-mono">
                Kirim ulang dalam <span className="text-indigo-400 font-bold">{countdown}s</span>
              </p>
            )}
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="w-full max-w-6xl flex justify-between items-center text-xs text-slate-500 z-10 pt-6 border-t border-slate-800/40">
        <p>&copy; 2026 Lapor.in. Verifikasi Keamanan Akun.</p>
        <Link href="/login" className="hover:text-slate-400">Ke Halaman Login</Link>
      </footer>
    </div>
  );
}

export default function OTPPage() {
  return (
    <Suspense
      fallback={
        <div className="w-full min-h-screen bg-slate-950 flex items-center justify-center text-slate-400 text-sm">
          Memuat halaman verifikasi OTP...
        </div>
      }
    >
      <OTPContent />
    </Suspense>
  );
}
