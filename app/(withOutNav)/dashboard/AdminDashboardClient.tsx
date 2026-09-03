"use client";

import { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowLeft, ShieldCheck, RefreshCw } from "lucide-react";

import AdminDashboardView from "./AdminDashboardView";
import SignOutButton from "@/app/layouts/(components)/SignOutButton";

interface AdminDashboardClientProps {
  initialUser: {
    id: string;
    name?: string | null;
    email?: string | null;
    image?: string | null;
    role_id?: number | null;
    village?: string | null;
    city?: string | null;
    province?: string | null;
    latitude?: number | null;
    longitude?: number | null;
    is_verified?: boolean;
  };
}

export default function AdminDashboardClient({ initialUser }: AdminDashboardClientProps) {
  const [user, setUser] = useState(initialUser);
  const [reports, setReports] = useState<any[]>([]);
  const [adminStats, setAdminStats] = useState<any>({
    totalReports: 0,
    verifiedReports: 0,
    pendingReports: 0,
    inProgressReports: 0,
    rejectedReports: 0,
    totalUsers: 0,
    criticalReports: 0,
    highSeverityReports: 0,
    avgRating: 4.5,
    binaScore: 88,
    categoriesCount: 5,
  });

  const [isLoading, setIsLoading] = useState(true);
  const [isRefreshing, setIsRefreshing] = useState(false);

  // Fetch full admin profile
  const fetchUserProfile = useCallback(async () => {
    try {
      const res = await fetch("/api/user/profile");
      if (res.ok) {
        const json = await res.json();
        if (json.user) {
          setUser(json.user);
        }
      }
    } catch (err) {
      console.error("Gagal mengambil data profil admin:", err);
    }
  }, []);

  // Fetch DB Reports
  const fetchReports = useCallback(async () => {
    try {
      const res = await fetch("/api/reports?t=" + Date.now());
      if (res.ok) {
        const json = await res.json();
        if (Array.isArray(json.reports)) {
          setReports(json.reports);
        }
      }
    } catch (err) {
      console.error("Gagal mengambil data laporan:", err);
    }
  }, []);

  // Fetch Admin Stats
  const fetchAdminStats = useCallback(async () => {
    try {
      const res = await fetch("/api/admin/stats?t=" + Date.now());
      if (res.ok) {
        const json = await res.json();
        if (json.stats) {
          setAdminStats(json.stats);
        }
      }
    } catch (err) {
      console.error("Gagal mengambil statistik admin:", err);
    }
  }, []);

  // Refresh all admin data
  const refreshAllData = useCallback(async () => {
    setIsRefreshing(true);
    await Promise.all([fetchUserProfile(), fetchReports(), fetchAdminStats()]);
    setIsRefreshing(false);
    setIsLoading(false);
  }, [fetchUserProfile, fetchReports, fetchAdminStats]);

  useEffect(() => {
    refreshAllData();
  }, [refreshAllData]);

  // Verify report handler (Admin)
  const handleVerifyReport = async (
    reportId: number,
    status: string,
    comment?: string
  ) => {
    const res = await fetch(`/api/admin/reports/${reportId}/verify`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status, comment }),
    });

    if (!res.ok) {
      const json = await res.json();
      throw new Error(json.message || "Gagal memverifikasi laporan.");
    }

    await refreshAllData();
  };

  return (
    <div className="min-h-screen w-full bg-white text-black font-sans flex flex-col relative selection:bg-black selection:text-white">
      {/* Background Subtle Grid Pattern */}
      <div
        className="fixed inset-0 pointer-events-none z-0 opacity-60"
        style={{
          backgroundImage:
            "linear-gradient(rgba(0,0,0,0.025) 1px, transparent 1px), linear-gradient(90deg, rgba(0,0,0,0.025) 1px, transparent 1px)",
          backgroundSize: "56px 56px",
        }}
      />

      {/* Admin Top Navbar Container */}
      <header className="sticky top-0 z-40 w-full flex items-center justify-between px-6 lg:px-12 h-[72px] border-b border-neutral-200/80 bg-white/90 backdrop-blur-md">
        {/* Left: Back & Logo */}
        <div className="flex items-center gap-6">
          <Link
            href="/"
            className="p-2 rounded-xl text-neutral-500 hover:text-black hover:bg-neutral-100 transition-all"
            title="Kembali ke Beranda"
          >
            <ArrowLeft className="w-5 h-5" />
          </Link>
          <Link href="/" className="flex items-center gap-3 font-extrabold text-xl text-black tracking-tight">
            <Image
              src="/logo/logo.png"
              alt="Bina Logo"
              width={32}
              height={32}
              className="w-8 h-8 object-contain"
            />
            <span>bina.</span>
          </Link>
        </div>

        {/* Center: Admin Role Title Badge */}
        <div className="flex items-center gap-2 bg-black text-white px-4 py-2 rounded-2xl border border-neutral-900 text-xs font-bold shadow-sm">
          <ShieldCheck className="w-4 h-4 text-blue-400" />
          <span>Dashboard Admin (Verifikator)</span>
          <span className="w-2 h-2 rounded-full bg-blue-400 animate-pulse"></span>
        </div>

        {/* Right: Refresh & SignOut */}
        <div className="flex items-center gap-3">
          <button
            onClick={refreshAllData}
            disabled={isRefreshing}
            className="p-2.5 rounded-xl text-neutral-500 hover:text-black hover:bg-neutral-100 border border-neutral-200 transition-all disabled:opacity-50"
            title="Refresh Data"
          >
            <RefreshCw className={`w-4 h-4 ${isRefreshing ? "animate-spin" : ""}`} />
          </button>
          <SignOutButton />
        </div>
      </header>

      {/* Main View Area */}
      <main className="relative z-10 flex-1 px-4 sm:px-6 lg:px-12 py-8 max-w-7xl w-full mx-auto">
        {isLoading ? (
          <div className="min-h-[60vh] flex flex-col items-center justify-center gap-3 text-neutral-400">
            <span className="w-8 h-8 border-2 border-neutral-300 border-t-black rounded-full animate-spin"></span>
            <span className="text-xs font-semibold tracking-wider uppercase">
              Memuat Dashboard Admin...
            </span>
          </div>
        ) : (
          <AdminDashboardView
            stats={adminStats}
            reports={reports}
            onVerifyReport={handleVerifyReport}
          />
        )}
      </main>

      {/* Footer */}
      <footer className="relative z-10 border-t border-neutral-200 px-8 lg:px-16 py-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-neutral-400 bg-white">
        <p>© 2026 Bina Civic-Tech Platform. Semua Hak Dilindungi.</p>
        <div className="flex items-center gap-4">
          <span className="text-neutral-300">•</span>
          <span>Sistem Spasial Evaluasi Infrastruktur Publik</span>
        </div>
      </footer>
    </div>
  );
}
