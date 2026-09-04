"use client";

import { useState, useRef, useEffect, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { signIn } from "next-auth/react";
import Link from "next/link";
import Image from "next/image";

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
    <div className="min-h-screen w-full bg-white flex flex-col font-sans">
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
          href={isReset ? "/resetpassword" : "/register"}
          className="text-sm font-medium text-neutral-600 hover:text-black border border-neutral-200 hover:border-neutral-400 px-5 py-2 rounded-xl transition-all duration-150 flex items-center gap-2"
        >
          <span>← Kembali</span>
        </Link>
      </header>

      {/* Main content */}
      <main className="relative z-10 flex-1 flex items-center justify-center px-6 py-16">
        <div className="w-full max-w-[440px] flex flex-col gap-8">
          {/* Heading block */}
          <div className="flex flex-col gap-3">
            <span className="text-[11px] font-semibold tracking-[0.2em] text-neutral-400 uppercase border border-neutral-200 rounded-full px-4 py-1.5 w-max">
              VERIFIKASI KEAMANAN
            </span>
            <h1 className="text-4xl font-bold text-black leading-tight tracking-tight">
              {isReset ? "Reset Kata Sandi" : "Kode Verifikasi"}<br />
              <span className="text-neutral-400">OTP.</span>
            </h1>
            <p className="text-sm text-neutral-500 leading-relaxed">
              Masukkan 6 digit kode OTP yang telah kami kirimkan ke email:{" "}
              <span className="font-semibold text-black break-all">{email || "email Anda"}</span>.
            </p>
          </div>

          {/* Dev Mode Notification Pill */}
          {devOtp && (
            <div className="p-4 rounded-xl bg-neutral-50 border border-neutral-200 text-xs font-mono text-neutral-700 flex items-center justify-between">
              <span className="text-neutral-500 font-semibold uppercase tracking-wider">⚡ DEV MODE OTP:</span>
              <span className="text-black font-bold text-base tracking-widest bg-white px-3 py-1 rounded-lg border border-neutral-200 shadow-sm">
                {devOtp}
              </span>
            </div>
          )}

          {/* Error alert */}
          {error && (
            <div className="flex items-start gap-3 p-4 bg-neutral-50 border border-neutral-200 rounded-xl text-sm text-neutral-700">
              <svg className="w-4 h-4 mt-0.5 flex-shrink-0 text-neutral-500" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
              </svg>
              <span>{error}</span>
            </div>
          )}

          {/* Success alert */}
          {successMsg && !error && (
            <div className="flex items-start gap-3 p-4 bg-neutral-50 border border-neutral-200 rounded-xl text-sm text-neutral-700">
              <svg className="w-4 h-4 mt-0.5 flex-shrink-0 text-emerald-600" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span>{successMsg}</span>
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleVerify} className="flex flex-col gap-6">
            <div className="flex justify-between items-center gap-2 sm:gap-3">
              {otp.map((digit, idx) => (
                <input
                  key={idx}
                  ref={(el) => {
                    inputRefs.current[idx] = el;
                  }}
                  type="text"
                  inputMode="numeric"
                  maxLength={1}
                  value={digit}
                  onChange={(e) => handleChange(idx, e.target.value)}
                  onKeyDown={(e) => handleKeyDown(idx, e)}
                  onPaste={handlePaste}
                  className="w-12 h-14 sm:w-14 sm:h-16 text-center text-xl sm:text-2xl font-bold bg-white border border-neutral-200 rounded-xl text-black placeholder-neutral-400 focus:outline-none focus:border-black focus:ring-2 focus:ring-black/5 transition-all duration-150 shadow-sm"
                />
              ))}
            </div>

            <button
              type="submit"
              disabled={isLoading || otp.some((d) => !d)}
              className="w-full py-4 bg-black text-white font-semibold rounded-xl text-sm hover:bg-neutral-800 active:scale-[0.98] transition-all duration-150 disabled:opacity-50 disabled:pointer-events-none flex items-center justify-center gap-2 mt-1"
            >
              {isLoading ? (
                <svg className="animate-spin h-4 w-4 text-white" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                </svg>
              ) : (
                <>
                  <span>Verifikasi Kode OTP</span>
                  <span>→</span>
                </>
              )}
            </button>
          </form>

          {/* Resend section */}
          <div className="flex flex-col items-center justify-center gap-2 pt-6 border-t border-neutral-100 text-center">
            <p className="text-xs text-neutral-500">Tidak menerima kode OTP?</p>
            {canResend ? (
              <button
                type="button"
                onClick={handleResend}
                disabled={isResending}
                className="text-xs font-semibold text-black hover:underline transition-all flex items-center gap-1.5 cursor-pointer"
              >
                {isResending ? (
                  <svg className="animate-spin h-3.5 w-3.5 text-black" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                  </svg>
                ) : (
                  <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182m0-4.991v4.99" />
                  </svg>
                )}
                <span>Kirim Ulang Kode</span>
              </button>
            ) : (
              <p className="text-xs text-neutral-400 font-medium">
                Kirim ulang dalam <span className="text-black font-semibold">{countdown}s</span>
              </p>
            )}
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

export default function OTPPage() {
  return (
    <Suspense
      fallback={
        <div className="w-full min-h-screen bg-white flex items-center justify-center text-neutral-400 text-sm">
          Memuat halaman verifikasi OTP...
        </div>
      }
    >
      <OTPContent />
    </Suspense>
  );
}

