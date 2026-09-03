"use client";

import { useState } from "react";
import {
  CheckCircle2,
  Clock,
  XCircle,
  Users,
  Award,
  AlertTriangle,
  FileText,
  Search,
  Filter,
  Eye,
  MapPin,
  X,
  Check,
  Star,
  MessageSquare,
  Building,
  Activity
} from "lucide-react";
import DashboardMapWrapper from "./DashboardMapWrapper";

interface AdminStats {
  totalReports: number;
  verifiedReports: number;
  pendingReports: number;
  inProgressReports: number;
  rejectedReports: number;
  totalUsers: number;
  criticalReports: number;
  highSeverityReports: number;
  avgRating: number;
  binaScore: number;
  categoriesCount: number;
}

interface ReportItem {
  id: number;
  description: string;
  location_description?: string | null;
  latitude: number;
  longitude: number;
  rating: number;
  aspect?: string | null;
  severity_level: string;
  photo_urls: string[];
  status: string;
  reported_at: string;
  user?: { name?: string | null; email?: string | null } | null;
  sub_category?: { name: string } | null;
  region?: { village?: string; city?: string; district?: string } | null;
}

interface AdminDashboardViewProps {
  stats: AdminStats;
  reports: ReportItem[];
  onVerifyReport: (
    reportId: number,
    status: string,
    comment?: string
  ) => Promise<void>;
}

export default function AdminDashboardView({
  stats,
  reports,
  onVerifyReport,
}: AdminDashboardViewProps) {
  const [selectedReport, setSelectedReport] = useState<ReportItem | null>(null);
  const [filterStatus, setFilterStatus] = useState<string>("ALL");
  const [searchQuery, setSearchQuery] = useState<string>("");

  // Verification Form states
  const [verifyStatus, setVerifyStatus] = useState<string>("DIVERIFIKASI");
  const [adminComment, setAdminComment] = useState<string>("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [feedbackMessage, setFeedbackMessage] = useState<string | null>(null);

  // Filtered reports list
  const filteredReports = reports.filter((rep) => {
    if (filterStatus !== "ALL" && rep.status !== filterStatus) return false;
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      const descMatch = rep.description?.toLowerCase().includes(q);
      const locMatch = rep.location_description?.toLowerCase().includes(q);
      const userMatch = rep.user?.name?.toLowerCase().includes(q);
      const catMatch = rep.sub_category?.name?.toLowerCase().includes(q);
      if (!descMatch && !locMatch && !userMatch && !catMatch) return false;
    }
    return true;
  });

  const handleOpenReviewModal = (report: ReportItem) => {
    setSelectedReport(report);
    setVerifyStatus(
      report.status === "MENUNGGU" ? "DIVERIFIKASI" : report.status
    );
    setAdminComment("");
    setFeedbackMessage(null);
  };

  const handleExecuteVerification = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedReport) return;
    setIsSubmitting(true);
    try {
      await onVerifyReport(selectedReport.id, verifyStatus, adminComment);
      setFeedbackMessage(
        `Laporan #${selectedReport.id} berhasil diperbarui menjadi ${verifyStatus}.`
      );
      setTimeout(() => {
        setSelectedReport(null);
        setFeedbackMessage(null);
      }, 1200);
    } catch (err: any) {
      setFeedbackMessage("Gagal memperbarui verifikasi laporan.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="w-full max-w-7xl mx-auto flex flex-col gap-8 pb-16">
      
      {/* Admin Dashboard Hero Header */}
      <div className="bg-neutral-900 text-white rounded-3xl p-6 lg:p-8 relative overflow-hidden border border-neutral-800 shadow-xl">
        <div className="absolute right-0 top-0 w-96 h-96 bg-neutral-800/40 rounded-full blur-3xl pointer-events-none -mr-20 -mt-20"></div>

        <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="flex flex-col gap-1.5">
            <div className="flex items-center gap-2.5">
              <span className="text-[10px] font-bold tracking-widest uppercase bg-white/10 text-neutral-300 px-3 py-1 rounded-full border border-white/10 flex items-center gap-1.5">
                <Building className="w-3 h-3 text-white" /> DASHBOARD ADMINISTRATOR & VERIFIKATOR
              </span>
              <span className="text-[10px] font-semibold text-emerald-400 bg-emerald-950/80 px-2.5 py-0.5 rounded-full border border-emerald-800 flex items-center gap-1">
                <Activity className="w-3 h-3 animate-pulse" /> Live Metrics
              </span>
            </div>
            <h1 className="text-2xl lg:text-3xl font-bold tracking-tight text-white">
              Pusat Monitoring & Verifikasi Laporan Bina
            </h1>
            <p className="text-xs text-neutral-400 max-w-2xl leading-relaxed">
              Tinjau, validasi lokasi, dan evaluasi laporan kondisi kelayakan fasilitas umum kota secara langsung sebelum diverifikasi ke publik.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <div className="bg-white/10 backdrop-blur-md px-5 py-3 rounded-2xl border border-white/10 flex flex-col items-center">
              <span className="text-[10px] font-semibold text-neutral-300 uppercase tracking-widest">
                SKOR BINA KOTA
              </span>
              <span className="text-2xl font-extrabold text-white">
                {stats.binaScore} <span className="text-xs text-neutral-400 font-normal">/ 100</span>
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Metrics Section */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-5">
        
        {/* Metric 1: Total Reports */}
        <div className="bg-white border border-neutral-200 rounded-2xl p-5 shadow-sm flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-semibold uppercase tracking-wider text-neutral-400">
              Total Laporan Masuk
            </span>
            <div className="w-8 h-8 rounded-xl bg-neutral-100 flex items-center justify-center text-black">
              <FileText className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-4">
            <span className="text-3xl font-extrabold text-black">
              {stats.totalReports}
            </span>
            <p className="text-[11px] text-neutral-500 mt-1">
              Diajukan oleh warga terdaftar
            </p>
          </div>
        </div>

        {/* Metric 2: Verified Reports */}
        <div className="bg-white border border-neutral-200 rounded-2xl p-5 shadow-sm flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-semibold uppercase tracking-wider text-neutral-400">
              Terverifikasi
            </span>
            <div className="w-8 h-8 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
              <CheckCircle2 className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-4">
            <span className="text-3xl font-extrabold text-emerald-700">
              {stats.verifiedReports}
            </span>
            <p className="text-[11px] text-emerald-600 font-medium mt-1">
              {(stats.totalReports > 0
                ? Math.round((stats.verifiedReports / stats.totalReports) * 100)
                : 0)}% dari total laporan
            </p>
          </div>
        </div>

        {/* Metric 3: Pending Review */}
        <div className="bg-white border border-neutral-200 rounded-2xl p-5 shadow-sm flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-semibold uppercase tracking-wider text-neutral-400">
              Menunggu Review
            </span>
            <div className="w-8 h-8 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center">
              <Clock className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-4">
            <span className="text-3xl font-extrabold text-amber-700">
              {stats.pendingReports}
            </span>
            <p className="text-[11px] text-amber-600 font-medium mt-1">
              Perlu tindakan verifikator
            </p>
          </div>
        </div>

        {/* Metric 4: Critical & High Alerts */}
        <div className="bg-white border border-neutral-200 rounded-2xl p-5 shadow-sm flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-semibold uppercase tracking-wider text-neutral-400">
              Laporan Kritis / Bahaya
            </span>
            <div className="w-8 h-8 rounded-xl bg-rose-50 text-rose-600 flex items-center justify-center">
              <AlertTriangle className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-4">
            <span className="text-3xl font-extrabold text-rose-700">
              {stats.criticalReports + stats.highSeverityReports}
            </span>
            <p className="text-[11px] text-rose-600 font-medium mt-1">
              Perlu prioritas penanganan
            </p>
          </div>
        </div>
      </div>

      {/* Main Console Section: Reports Review & Verification */}
      <div className="bg-white border border-neutral-200 rounded-3xl p-6 lg:p-8 shadow-sm flex flex-col gap-6">
        
        {/* Controls Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-neutral-100 pb-5">
          <div>
            <span className="text-[11px] font-semibold tracking-widest text-neutral-400 uppercase">
              MODUL REVIEW LOKASI & LOKASI PELAPORAN
            </span>
            <h2 className="text-xl font-bold text-black">
              Daftar Laporan Warga untuk Diverifikasi
            </h2>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-3">
            {/* Search Input */}
            <div className="relative w-full sm:w-64">
              <Search className="w-4 h-4 absolute left-3.5 top-3.5 text-neutral-400 pointer-events-none" />
              <input
                type="text"
                placeholder="Cari lokasi/warga..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 bg-neutral-50 border border-neutral-200 rounded-xl text-xs font-medium text-black focus:outline-none focus:border-black focus:bg-white transition-all"
              />
            </div>

            {/* Filter Status Selector */}
            <div className="flex items-center bg-neutral-100 p-1 rounded-xl border border-neutral-200 text-xs w-full sm:w-auto">
              {["ALL", "MENUNGGU", "DIVERIFIKASI", "DITOLAK"].map((status) => (
                <button
                  key={status}
                  onClick={() => setFilterStatus(status)}
                  className={`px-3 py-1.5 rounded-lg font-semibold transition-all ${
                    filterStatus === status
                      ? "bg-white text-black shadow-sm"
                      : "text-neutral-500 hover:text-black"
                  }`}
                >
                  {status === "ALL"
                    ? "Semua"
                    : status === "MENUNGGU"
                    ? "Menunggu"
                    : status === "DIVERIFIKASI"
                    ? "Terverifikasi"
                    : "Ditolak"}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Reports Table / Card List */}
        {filteredReports.length === 0 ? (
          <div className="py-16 text-center flex flex-col items-center justify-center gap-3 bg-neutral-50 rounded-2xl border border-dashed border-neutral-200">
            <Filter className="w-8 h-8 text-neutral-300" />
            <h4 className="font-bold text-sm text-neutral-700">
              Tidak ada laporan sesuai filter
            </h4>
            <p className="text-xs text-neutral-400">
              Coba sesuaikan kata kunci pencarian atau ganti status filter.
            </p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-neutral-200 text-[11px] font-semibold uppercase tracking-wider text-neutral-400">
                  <th className="py-3.5 px-4">Laporan & Lokasi</th>
                  <th className="py-3.5 px-4">Pelapor</th>
                  <th className="py-3.5 px-4">Rating & Severitas</th>
                  <th className="py-3.5 px-4">Status</th>
                  <th className="py-3.5 px-4">Tanggal</th>
                  <th className="py-3.5 px-4 text-right">Aksi Review</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-neutral-100 text-xs">
                {filteredReports.map((report) => (
                  <tr key={report.id} className="hover:bg-neutral-50/80 transition-colors">
                    <td className="py-4 px-4">
                      <div className="flex flex-col gap-0.5 max-w-xs">
                        <span className="font-bold text-black text-sm line-clamp-1">
                          {report.location_description || report.sub_category?.name || "Laporan Warga"}
                        </span>
                        <span className="text-neutral-500 line-clamp-1 text-[11px]">
                          {report.description}
                        </span>
                        <span className="text-[10px] font-mono text-neutral-400 mt-0.5">
                          📍 {report.latitude.toFixed(4)}, {report.longitude.toFixed(4)}
                        </span>
                      </div>
                    </td>
                    <td className="py-4 px-4">
                      <div className="flex flex-col">
                        <span className="font-semibold text-black">
                          {report.user?.name || "Pelapor Warga"}
                        </span>
                        <span className="text-neutral-400 text-[11px]">
                          {report.user?.email || "email@lapor.in"}
                        </span>
                      </div>
                    </td>
                    <td className="py-4 px-4">
                      <div className="flex flex-col gap-1">
                        <div className="flex items-center gap-1 text-amber-500 font-bold">
                          {"★".repeat(report.rating)}
                          <span className="text-[11px] text-neutral-600 ml-1">
                            ({report.rating}/5)
                          </span>
                        </div>
                        <span
                          className={`text-[10px] font-bold w-max px-2 py-0.5 rounded ${
                            report.severity_level === "KRITIS"
                              ? "bg-rose-100 text-rose-800"
                              : report.severity_level === "TINGGI"
                              ? "bg-amber-100 text-amber-800"
                              : "bg-neutral-100 text-neutral-700"
                          }`}
                        >
                          {report.severity_level}
                        </span>
                      </div>
                    </td>
                    <td className="py-4 px-4">
                      <span
                        className={`text-[10px] font-extrabold px-2.5 py-1 rounded-full border ${
                          report.status === "DIVERIFIKASI" || report.status === "SELESAI"
                            ? "bg-emerald-50 text-emerald-800 border-emerald-200"
                            : report.status === "DITOLAK"
                            ? "bg-rose-50 text-rose-800 border-rose-200"
                            : "bg-amber-50 text-amber-800 border-amber-200"
                        }`}
                      >
                        {report.status}
                      </span>
                    </td>
                    <td className="py-4 px-4 text-neutral-500 font-mono text-[11px]">
                      {new Date(report.reported_at).toLocaleDateString("id-ID")}
                    </td>
                    <td className="py-4 px-4 text-right">
                      <button
                        onClick={() => handleOpenReviewModal(report)}
                        className="px-3.5 py-2 bg-black hover:bg-neutral-800 text-white font-semibold text-xs rounded-xl transition-all flex items-center justify-center gap-1.5 ml-auto"
                      >
                        <Eye className="w-3.5 h-3.5" />
                        <span>Review & Verifikasi</span>
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Review & Verification Modal Drawer */}
      {selectedReport && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-md flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white rounded-3xl border border-neutral-200 max-w-3xl w-full p-6 lg:p-8 shadow-2xl flex flex-col gap-6 my-8 max-h-[90vh] overflow-y-auto animate-in fade-in zoom-in duration-200">
            
            {/* Modal Header */}
            <div className="flex items-center justify-between border-b border-neutral-100 pb-4">
              <div className="flex flex-col gap-0.5">
                <span className="text-[10px] font-extrabold tracking-widest text-neutral-400 uppercase">
                  LEMBAR REVIEW & VERIFIKASI LOKASI LAPORAN #{selectedReport.id}
                </span>
                <h3 className="font-bold text-xl text-black">
                  {selectedReport.location_description || selectedReport.sub_category?.name || "Detail Laporan Warga"}
                </h3>
              </div>
              <button
                onClick={() => setSelectedReport(null)}
                className="p-1 rounded-full text-neutral-400 hover:text-black hover:bg-neutral-100"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            {/* Notification message inside modal */}
            {feedbackMessage && (
              <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-2xl text-xs text-emerald-800 flex items-center gap-2 font-medium">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                <span>{feedbackMessage}</span>
              </div>
            )}

            {/* Modal Body Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              
              {/* Left Column: Photos & Details */}
              <div className="flex flex-col gap-4">
                
                {/* Photo evidence preview */}
                {selectedReport.photo_urls && selectedReport.photo_urls.length > 0 ? (
                  <div className="w-full h-52 rounded-2xl overflow-hidden bg-neutral-100 relative border border-neutral-200">
                    <img
                      src={selectedReport.photo_urls[0]}
                      alt="Bukti Foto Laporan"
                      className="w-full h-full object-cover"
                    />
                    <span className="absolute bottom-3 left-3 bg-black/70 text-white text-[10px] px-2.5 py-1 rounded-md backdrop-blur-sm font-mono">
                      Bukti Foto Warga ({selectedReport.photo_urls.length} file)
                    </span>
                  </div>
                ) : (
                  <div className="w-full h-40 rounded-2xl bg-neutral-100 border border-dashed border-neutral-300 flex items-center justify-center text-xs text-neutral-400">
                    Tidak ada lampiran foto
                  </div>
                )}

                {/* Report Info */}
                <div className="space-y-3 bg-neutral-50 p-4 rounded-2xl border border-neutral-200/70 text-xs">
                  <div>
                    <label className="text-[10px] font-bold text-neutral-400 uppercase">
                      Deskripsi Pelaporan Warga
                    </label>
                    <p className="text-black font-medium mt-1 leading-relaxed">
                      {selectedReport.description}
                    </p>
                  </div>

                  <div className="grid grid-cols-2 gap-2 pt-2 border-t border-neutral-200/60">
                    <div>
                      <label className="text-[10px] font-bold text-neutral-400 uppercase">
                        Pelapor
                      </label>
                      <p className="font-semibold text-black">
                        {selectedReport.user?.name || "Warga Anonim"}
                      </p>
                    </div>
                    <div>
                      <label className="text-[10px] font-bold text-neutral-400 uppercase">
                        Tingkat Severitas
                      </label>
                      <p className="font-semibold text-rose-700">
                        {selectedReport.severity_level}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Right Column: Location Map & Verification Form */}
              <div className="flex flex-col gap-4">
                
                {/* Location Map Preview */}
                <div>
                  <label className="text-[10px] font-bold text-neutral-400 uppercase mb-1.5 flex items-center justify-between">
                    <span>Verifikasi Titik Peta Spasial</span>
                    <span className="font-mono text-neutral-500">
                      {selectedReport.latitude.toFixed(4)}, {selectedReport.longitude.toFixed(4)}
                    </span>
                  </label>

                  <DashboardMapWrapper
                    userLocation={{
                      lat: selectedReport.latitude,
                      lng: selectedReport.longitude,
                      name: selectedReport.location_description || "Titik Laporan",
                    }}
                    reports={[selectedReport]}
                    height="h-[180px]"
                  />
                </div>

                {/* Verification Form */}
                <form onSubmit={handleExecuteVerification} className="flex flex-col gap-4 mt-2">
                  <div>
                    <label className="text-xs font-bold text-neutral-700 uppercase tracking-widest mb-2 block">
                      Keputusan Verifikasi Status Laporan
                    </label>
                    <div className="grid grid-cols-3 gap-2">
                      <button
                        type="button"
                        onClick={() => setVerifyStatus("DIVERIFIKASI")}
                        className={`py-2.5 px-2 rounded-xl text-xs font-bold transition-all border ${
                          verifyStatus === "DIVERIFIKASI"
                            ? "bg-emerald-600 text-white border-emerald-600 shadow-md"
                            : "bg-white text-neutral-700 border-neutral-200 hover:border-emerald-400"
                        }`}
                      >
                        Verifikasi ✓
                      </button>
                      <button
                        type="button"
                        onClick={() => setVerifyStatus("DIPROSES")}
                        className={`py-2.5 px-2 rounded-xl text-xs font-bold transition-all border ${
                          verifyStatus === "DIPROSES"
                            ? "bg-amber-500 text-white border-amber-500 shadow-md"
                            : "bg-white text-neutral-700 border-neutral-200 hover:border-amber-400"
                        }`}
                      >
                        Diproses ⏳
                      </button>
                      <button
                        type="button"
                        onClick={() => setVerifyStatus("DITOLAK")}
                        className={`py-2.5 px-2 rounded-xl text-xs font-bold transition-all border ${
                          verifyStatus === "DITOLAK"
                            ? "bg-rose-600 text-white border-rose-600 shadow-md"
                            : "bg-white text-neutral-700 border-neutral-200 hover:border-rose-400"
                        }`}
                      >
                        Tolak ✕
                      </button>
                    </div>
                  </div>

                  <div>
                    <label className="text-xs font-semibold text-neutral-500 uppercase tracking-widest mb-1 block">
                      Catatan / Alasan Admin Verifikator
                    </label>
                    <textarea
                      rows={3}
                      value={adminComment}
                      onChange={(e) => setAdminComment(e.target.value)}
                      placeholder="Masukkan catatan evaluasi tempat laporan atau instruksi verifikasi..."
                      className="w-full p-3 bg-neutral-50 border border-neutral-200 rounded-xl text-xs text-black focus:outline-none focus:border-black focus:bg-white"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full py-3.5 bg-black hover:bg-neutral-800 text-white font-bold text-xs rounded-xl transition-all shadow-lg flex items-center justify-center gap-2 disabled:opacity-50"
                  >
                    {isSubmitting ? (
                      <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></span>
                    ) : (
                      <>
                        <Check className="w-4 h-4" />
                        <span>Simpan Hasil Review & Verifikasi</span>
                      </>
                    )}
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
