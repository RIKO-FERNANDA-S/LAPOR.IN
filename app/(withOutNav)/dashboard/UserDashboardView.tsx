"use client";

import { useState } from "react";
import { 
  MapPin, 
  Navigation, 
  Edit3, 
  CheckCircle2, 
  Clock, 
  Star, 
  AlertTriangle, 
  Layers, 
  X, 
  Save, 
  ExternalLink,
  ChevronRight,
  User as UserIcon,
  Mail,
  Building
} from "lucide-react";
import DashboardMapWrapper from "./DashboardMapWrapper";

interface UserProfile {
  id: string;
  name?: string | null;
  email?: string | null;
  village?: string | null;
  city?: string | null;
  province?: string | null;
  latitude?: number | null;
  longitude?: number | null;
  is_verified?: boolean;
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
  sub_category?: { name: string } | null;
}

interface UserDashboardViewProps {
  user: UserProfile;
  reports: ReportItem[];
  onUpdateProfile: (updated: Partial<UserProfile>) => Promise<void>;
}

export default function UserDashboardView({
  user,
  reports,
  onUpdateProfile,
}: UserDashboardViewProps) {
  const [activeTab, setActiveTab] = useState<"verified" | "unverified">("verified");
  const [isEditingLocation, setIsEditingLocation] = useState(false);
  const [isLocatingGps, setIsLocatingGps] = useState(false);
  const [gpsSuccessMessage, setGpsSuccessMessage] = useState<string | null>(null);
  const [gpsErrorMessage, setGpsErrorMessage] = useState<string | null>(null);

  // Form states for manual profile/location edit
  const [editName, setEditName] = useState(user.name || "");
  const [editVillage, setEditVillage] = useState(user.village || "Gunung Anyar");
  const [editCity, setEditCity] = useState(user.city || "Surabaya");
  const [editProvince, setEditProvince] = useState(user.province || "Jawa Timur");
  const [editLat, setEditLat] = useState(user.latitude || -7.3361);
  const [editLng, setEditLng] = useState(user.longitude || 112.7872);

  // Center coordinate for map (defaults to user lat/lng or Surabaya center)
  const currentLat = user.latitude || -7.3361;
  const currentLng = user.longitude || 112.7872;

  // Filter user reports into Verified and Unverified
  const verifiedReports = reports.filter(
    (r) => r.status === "DIVERIFIKASI" || r.status === "SELESAI"
  );
  const unverifiedReports = reports.filter(
    (r) => r.status === "MENUNGGU" || r.status === "DIPROSES" || r.status === "DITOLAK"
  );

  // Request browser location permission & update
  const handleGetGpsLocation = () => {
    setGpsErrorMessage(null);
    setGpsSuccessMessage(null);

    if (!navigator.geolocation) {
      setGpsErrorMessage("Browser Anda tidak mendukung layanan Geolocation GPS.");
      return;
    }

    setIsLocatingGps(true);
    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const { latitude, longitude } = position.coords;
        try {
          // Attempt reverse geocoding via OSM Nominatim (optional)
          let detectedVillage = editVillage;
          let detectedCity = editCity;
          let detectedProvince = editProvince;

          try {
            const res = await fetch(
              `https://nominatim.openstreetmap.org/reverse?lat=${latitude}&lon=${longitude}&format=json`
            );
            if (res.ok) {
              const data = await res.json();
              if (data.address) {
                detectedVillage =
                  data.address.village ||
                  data.address.suburb ||
                  data.address.neighbourhood ||
                  detectedVillage;
                detectedCity =
                  data.address.city || data.address.county || detectedCity;
                detectedProvince = data.address.state || detectedProvince;
              }
            }
          } catch (e) {
            // ignore reverse geocode network fail fallback to existing
          }

          await onUpdateProfile({
            latitude,
            longitude,
            village: detectedVillage,
            city: detectedCity,
            province: detectedProvince,
          });

          setEditLat(latitude);
          setEditLng(longitude);
          setEditVillage(detectedVillage);
          setEditCity(detectedCity);
          setEditProvince(detectedProvince);
          setGpsSuccessMessage("Lokasi GPS berhasil ditemukan dan disimpan secara realtime!");
        } catch (err: any) {
          setGpsErrorMessage("Gagal memperbarui posisi lokasi dari GPS.");
        } finally {
          setIsLocatingGps(false);
        }
      },
      (error) => {
        setIsLocatingGps(false);
        if (error.code === error.PERMISSION_DENIED) {
          setGpsErrorMessage(
            "Izin akses lokasi ditolak oleh browser. Anda dapat memasukkan lokasi secara manual."
          );
        } else {
          setGpsErrorMessage("Tidak dapat menemukan lokasi GPS Anda saat ini.");
        }
      },
      { enableHighAccuracy: true, timeout: 10000 }
    );
  };

  // Submit manual profile & location edit
  const handleSaveManualLocation = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await onUpdateProfile({
        name: editName,
        village: editVillage,
        city: editCity,
        province: editProvince,
        latitude: parseFloat(editLat as any) || currentLat,
        longitude: parseFloat(editLng as any) || currentLng,
      });
      setIsEditingLocation(false);
      setGpsSuccessMessage("Data profil dan lokasi manual berhasil disimpan.");
    } catch (err: any) {
      setGpsErrorMessage("Gagal menyimpan perubahan lokasi manual.");
    }
  };

  return (
    <div className="w-full max-w-7xl mx-auto flex flex-col gap-8 pb-16">
      
      {/* Top Banner & User Profile Hero */}
      <div className="bg-neutral-900 text-white rounded-3xl p-6 lg:p-8 relative overflow-hidden border border-neutral-800 shadow-xl">
        <div className="absolute right-0 top-0 w-96 h-96 bg-neutral-800/40 rounded-full blur-3xl pointer-events-none -mr-20 -mt-20"></div>

        <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="flex items-center gap-5">
            <div className="w-16 h-16 rounded-2xl bg-white text-black font-extrabold text-2xl flex items-center justify-center border-2 border-neutral-200 shadow-inner flex-shrink-0">
              {user.name
                ? user.name
                    .split(" ")
                    .map((n) => n[0])
                    .slice(0, 2)
                    .join("")
                    .toUpperCase()
                : "U"}
            </div>
            <div className="flex flex-col gap-1">
              <div className="flex items-center gap-2.5">
                <span className="text-[10px] font-bold tracking-widest uppercase bg-white/10 text-neutral-300 px-3 py-1 rounded-full border border-white/10">
                  DASHBOARD WARGA
                </span>
                {user.is_verified && (
                  <span className="text-[10px] font-semibold text-emerald-400 bg-emerald-950/80 px-2.5 py-0.5 rounded-full border border-emerald-800 flex items-center gap-1">
                    <CheckCircle2 className="w-3 h-3" /> Akun Terverifikasi
                  </span>
                )}
              </div>
              <h1 className="text-2xl lg:text-3xl font-bold tracking-tight text-white">
                {user.name || "Warga Lapor.in"}
              </h1>
              <div className="flex flex-wrap items-center gap-4 text-xs text-neutral-400 mt-0.5">
                <span className="flex items-center gap-1.5">
                  <Mail className="w-3.5 h-3.5 text-neutral-400" />
                  {user.email || "email@lapor.in"}
                </span>
                <span className="text-neutral-600">•</span>
                <span className="flex items-center gap-1.5 text-neutral-200">
                  <MapPin className="w-3.5 h-3.5 text-emerald-400" />
                  {user.village ? `${user.village}, ${user.city || ""}` : "Lokasi Belum Diset"}
                </span>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-3 w-full md:w-auto">
            <button
              onClick={() => setIsEditingLocation(true)}
              className="flex-1 md:flex-initial px-4 py-2.5 bg-neutral-800 hover:bg-neutral-700 text-white font-medium text-xs rounded-xl border border-neutral-700 transition-all flex items-center justify-center gap-2"
            >
              <Edit3 className="w-3.5 h-3.5" />
              <span>Edit Lokasi & Profil</span>
            </button>
            <button
              onClick={handleGetGpsLocation}
              disabled={isLocatingGps}
              className="flex-1 md:flex-initial px-4 py-2.5 bg-white text-black font-semibold text-xs rounded-xl hover:bg-neutral-200 transition-all flex items-center justify-center gap-2 shadow-lg disabled:opacity-50"
            >
              <Navigation className={`w-3.5 h-3.5 ${isLocatingGps ? "animate-spin" : ""}`} />
              <span>{isLocatingGps ? "Mencari GPS..." : "Deteksi GPS"}</span>
            </button>
          </div>
        </div>
      </div>

      {/* Notifications / Alerts */}
      {gpsSuccessMessage && (
        <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-2xl text-xs text-emerald-800 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0" />
            <span>{gpsSuccessMessage}</span>
          </div>
          <button onClick={() => setGpsSuccessMessage(null)} className="text-emerald-600 hover:text-emerald-900">
            <X className="w-4 h-4" />
          </button>
        </div>
      )}
      {gpsErrorMessage && (
        <div className="p-4 bg-rose-50 border border-rose-200 rounded-2xl text-xs text-rose-800 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <AlertTriangle className="w-4 h-4 text-rose-600 flex-shrink-0" />
            <span>{gpsErrorMessage}</span>
          </div>
          <button onClick={() => setGpsErrorMessage(null)} className="text-rose-600 hover:text-rose-900">
            <X className="w-4 h-4" />
          </button>
        </div>
      )}

      {/* Section 1: User Location Details & Real-Time Map */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* User Location Info Box */}
        <div className="lg:col-span-1 bg-white border border-neutral-200 rounded-3xl p-6 flex flex-col justify-between shadow-sm">
          <div className="space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-neutral-100">
              <span className="text-[11px] font-semibold tracking-widest text-neutral-400 uppercase flex items-center gap-1.5">
                <Building className="w-3.5 h-3.5 text-black" /> INFORMASI LOKASI SAYA
              </span>
              <span className="text-[10px] font-semibold text-neutral-500 bg-neutral-100 px-2 py-0.5 rounded-full">
                Realtime Sync
              </span>
            </div>

            <div className="space-y-3">
              <div>
                <label className="text-[10px] font-semibold text-neutral-400 uppercase tracking-wider">
                  Kelurahan / Desa
                </label>
                <p className="text-base font-bold text-black">
                  {user.village || "Gunung Anyar"}
                </p>
              </div>

              <div>
                <label className="text-[10px] font-semibold text-neutral-400 uppercase tracking-wider">
                  Kota / Kabupaten
                </label>
                <p className="text-sm font-semibold text-neutral-800">
                  {user.city || "Kota Surabaya"}
                </p>
              </div>

              <div>
                <label className="text-[10px] font-semibold text-neutral-400 uppercase tracking-wider">
                  Provinsi
                </label>
                <p className="text-sm font-medium text-neutral-700">
                  {user.province || "Jawa Timur"}
                </p>
              </div>

              <div className="pt-2 border-t border-neutral-100">
                <label className="text-[10px] font-semibold text-neutral-400 uppercase tracking-wider">
                  Koordinat Spasial GPS
                </label>
                <p className="text-xs font-mono font-medium text-neutral-800 mt-0.5 bg-neutral-50 p-2.5 rounded-xl border border-neutral-100 flex items-center justify-between">
                  <span>Lat: {currentLat.toFixed(5)}</span>
                  <span>Lng: {currentLng.toFixed(5)}</span>
                </p>
              </div>
            </div>
          </div>

          <div className="mt-6 pt-4 border-t border-neutral-100 flex flex-col gap-2">
            <button
              onClick={handleGetGpsLocation}
              disabled={isLocatingGps}
              className="w-full py-3 bg-black hover:bg-neutral-800 text-white font-medium text-xs rounded-xl transition-all flex items-center justify-center gap-2"
            >
              <Navigation className="w-3.5 h-3.5 text-blue-400" />
              <span>Perbarui Koordinat GPS Presisi</span>
            </button>
          </div>
        </div>

        {/* Real-time Map Box */}
        <div className="lg:col-span-2 bg-white border border-neutral-200 rounded-3xl p-6 shadow-sm flex flex-col gap-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <MapPin className="w-4 h-4 text-black" />
              <h3 className="font-bold text-sm text-black">
                Peta Spasial Realtime Pengguna
              </h3>
            </div>
            <span className="text-xs text-neutral-500 font-medium">
              Menyesuaikan lokasi secara otomatis
            </span>
          </div>

          {/* Interactive Map */}
          <DashboardMapWrapper
            userLocation={{
              lat: currentLat,
              lng: currentLng,
              name: user.name || "Lokasi Anda",
            }}
            reports={reports}
            height="h-[320px]"
          />
        </div>
      </div>

      {/* Section 2: User Location Reports (Sudah Terverifikasi vs Belum Terverifikasi) */}
      <div className="bg-white border border-neutral-200 rounded-3xl p-6 lg:p-8 shadow-sm flex flex-col gap-6">
        
        {/* Header & Tabs */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-neutral-100 pb-5">
          <div className="flex flex-col gap-1">
            <span className="text-[11px] font-semibold tracking-widest text-neutral-400 uppercase">
              REKAPITULASI PELAPORAN INSFRASTRUKTUR
            </span>
            <h2 className="text-xl font-bold text-black">
              Laporan Fasilitas Publik Anda
            </h2>
          </div>

          {/* Tabs */}
          <div className="flex items-center bg-neutral-100 p-1 rounded-2xl border border-neutral-200/60 w-full sm:w-auto">
            <button
              onClick={() => setActiveTab("verified")}
              className={`flex-1 sm:flex-initial px-5 py-2 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-2 ${
                activeTab === "verified"
                  ? "bg-white text-black shadow-sm"
                  : "text-neutral-500 hover:text-black"
              }`}
            >
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
              <span>Sudah Terverifikasi</span>
              <span className="text-[10px] bg-emerald-100 text-emerald-800 font-semibold px-2 py-0.5 rounded-full">
                {verifiedReports.length}
              </span>
            </button>

            <button
              onClick={() => setActiveTab("unverified")}
              className={`flex-1 sm:flex-initial px-5 py-2 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-2 ${
                activeTab === "unverified"
                  ? "bg-white text-black shadow-sm"
                  : "text-neutral-500 hover:text-black"
              }`}
            >
              <Clock className="w-3.5 h-3.5 text-amber-600" />
              <span>Belum Terverifikasi</span>
              <span className="text-[10px] bg-amber-100 text-amber-800 font-semibold px-2 py-0.5 rounded-full">
                {unverifiedReports.length}
              </span>
            </button>
          </div>
        </div>

        {/* Tab Contents */}
        {activeTab === "verified" ? (
          <div>
            {verifiedReports.length === 0 ? (
              <div className="py-16 text-center flex flex-col items-center justify-center gap-3 bg-neutral-50 rounded-2xl border border-dashed border-neutral-200">
                <CheckCircle2 className="w-10 h-10 text-neutral-300" />
                <h4 className="font-bold text-sm text-neutral-700">
                  Belum ada laporan terverifikasi
                </h4>
                <p className="text-xs text-neutral-400 max-w-sm">
                  Laporan yang telah ditinjau dan disetujui oleh tim verifikator admin akan ditampilkan di sini.
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                {verifiedReports.map((report) => (
                  <ReportCard key={report.id} report={report} isVerified={true} />
                ))}
              </div>
            )}
          </div>
        ) : (
          <div>
            {unverifiedReports.length === 0 ? (
              <div className="py-16 text-center flex flex-col items-center justify-center gap-3 bg-neutral-50 rounded-2xl border border-dashed border-neutral-200">
                <Clock className="w-10 h-10 text-neutral-300" />
                <h4 className="font-bold text-sm text-neutral-700">
                  Tidak ada laporan menunggu verifikasi
                </h4>
                <p className="text-xs text-neutral-400 max-w-sm">
                  Semua laporan Anda telah berhasil diverifikasi atau belum ada laporan baru yang diajukan.
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                {unverifiedReports.map((report) => (
                  <ReportCard key={report.id} report={report} isVerified={false} />
                ))}
              </div>
            )}
          </div>
        )}
      </div>

      {/* Manual Location Edit Modal */}
      {isEditingLocation && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl border border-neutral-200 max-w-md w-full p-6 shadow-2xl flex flex-col gap-5 animate-in fade-in zoom-in duration-200">
            <div className="flex items-center justify-between border-b border-neutral-100 pb-4">
              <div className="flex items-center gap-2">
                <Edit3 className="w-4 h-4 text-black" />
                <h3 className="font-bold text-base text-black">
                  Ubah Lokasi & Profil Manual
                </h3>
              </div>
              <button
                onClick={() => setIsEditingLocation(false)}
                className="p-1 rounded-full text-neutral-400 hover:text-black hover:bg-neutral-100"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveManualLocation} className="flex flex-col gap-4">
              <div>
                <label className="text-xs font-semibold text-neutral-500 uppercase tracking-widest mb-1.5 block">
                  Nama Lengkap
                </label>
                <input
                  type="text"
                  required
                  value={editName}
                  onChange={(e) => setEditName(e.target.value)}
                  className="w-full px-4 py-3 bg-neutral-50 border border-neutral-200 rounded-xl text-sm font-medium text-black focus:bg-white focus:outline-none focus:border-black"
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-neutral-500 uppercase tracking-widest mb-1.5 block">
                  Desa / Kelurahan
                </label>
                <input
                  type="text"
                  required
                  value={editVillage}
                  onChange={(e) => setEditVillage(e.target.value)}
                  className="w-full px-4 py-3 bg-neutral-50 border border-neutral-200 rounded-xl text-sm font-medium text-black focus:bg-white focus:outline-none focus:border-black"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-semibold text-neutral-500 uppercase tracking-widest mb-1.5 block">
                    Kota / Kabupaten
                  </label>
                  <input
                    type="text"
                    required
                    value={editCity}
                    onChange={(e) => setEditCity(e.target.value)}
                    className="w-full px-4 py-3 bg-neutral-50 border border-neutral-200 rounded-xl text-sm font-medium text-black focus:bg-white focus:outline-none focus:border-black"
                  />
                </div>
                <div>
                  <label className="text-xs font-semibold text-neutral-500 uppercase tracking-widest mb-1.5 block">
                    Provinsi
                  </label>
                  <input
                    type="text"
                    required
                    value={editProvince}
                    onChange={(e) => setEditProvince(e.target.value)}
                    className="w-full px-4 py-3 bg-neutral-50 border border-neutral-200 rounded-xl text-sm font-medium text-black focus:bg-white focus:outline-none focus:border-black"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3 pt-1">
                <div>
                  <label className="text-xs font-semibold text-neutral-500 uppercase tracking-widest mb-1.5 block">
                    Latitude GPS
                  </label>
                  <input
                    type="number"
                    step="any"
                    required
                    value={editLat}
                    onChange={(e) => setEditLat(parseFloat(e.target.value) || 0)}
                    className="w-full px-4 py-3 bg-neutral-50 border border-neutral-200 rounded-xl text-sm font-mono text-black focus:bg-white focus:outline-none focus:border-black"
                  />
                </div>
                <div>
                  <label className="text-xs font-semibold text-neutral-500 uppercase tracking-widest mb-1.5 block">
                    Longitude GPS
                  </label>
                  <input
                    type="number"
                    step="any"
                    required
                    value={editLng}
                    onChange={(e) => setEditLng(parseFloat(e.target.value) || 0)}
                    className="w-full px-4 py-3 bg-neutral-50 border border-neutral-200 rounded-xl text-sm font-mono text-black focus:bg-white focus:outline-none focus:border-black"
                  />
                </div>
              </div>

              <div className="flex items-center gap-3 pt-3">
                <button
                  type="button"
                  onClick={() => setIsEditingLocation(false)}
                  className="flex-1 py-3 bg-neutral-100 hover:bg-neutral-200 text-neutral-700 text-xs font-semibold rounded-xl"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="flex-1 py-3 bg-black hover:bg-neutral-800 text-white text-xs font-bold rounded-xl flex items-center justify-center gap-2"
                >
                  <Save className="w-3.5 h-3.5" />
                  <span>Simpan Perubahan</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

// Sub-component for individual Report Card
function ReportCard({
  report,
  isVerified,
}: {
  report: ReportItem;
  isVerified: boolean;
}) {
  const photo = report.photo_urls && report.photo_urls.length > 0 ? report.photo_urls[0] : null;

  return (
    <div className="bg-white border border-neutral-200 rounded-2xl p-5 hover:border-neutral-400 transition-all flex flex-col justify-between gap-4 shadow-sm group">
      <div className="flex flex-col gap-3">
        
        {/* Photo or Category Header */}
        {photo ? (
          <div className="w-full h-40 rounded-xl overflow-hidden bg-neutral-100 relative">
            <img
              src={photo}
              alt="Bukti Laporan"
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            />
            <span
              className={`absolute top-3 right-3 text-[10px] font-bold px-2.5 py-1 rounded-full border shadow-sm ${
                isVerified
                  ? "bg-emerald-500 text-white border-emerald-400"
                  : report.status === "DITOLAK"
                  ? "bg-rose-500 text-white border-rose-400"
                  : "bg-amber-500 text-white border-amber-400"
              }`}
            >
              {report.status}
            </span>
          </div>
        ) : (
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-bold uppercase tracking-wider text-neutral-500 bg-neutral-100 px-3 py-1 rounded-full">
              {report.sub_category?.name || "Infrastruktur"}
            </span>
            <span
              className={`text-[10px] font-bold px-2.5 py-0.5 rounded-full border ${
                isVerified
                  ? "bg-emerald-50 text-emerald-800 border-emerald-200"
                  : report.status === "DITOLAK"
                  ? "bg-rose-50 text-rose-800 border-rose-200"
                  : "bg-amber-50 text-amber-800 border-amber-200"
              }`}
            >
              {report.status}
            </span>
          </div>
        )}

        {/* Title & Rating */}
        <div>
          <div className="flex items-center gap-1.5 mb-1 text-amber-500 text-xs">
            {Array.from({ length: 5 }).map((_, idx) => (
              <Star
                key={idx}
                className={`w-3.5 h-3.5 ${
                  idx < report.rating ? "fill-amber-400 text-amber-400" : "text-neutral-200"
                }`}
              />
            ))}
            <span className="text-[11px] font-semibold text-neutral-600 ml-1">
              {report.rating}.0 / 5.0
            </span>
          </div>

          <h4 className="font-bold text-sm text-black leading-snug">
            {report.location_description || report.sub_category?.name || "Laporan Warga"}
          </h4>

          <p className="text-xs text-neutral-500 line-clamp-2 mt-1 leading-relaxed">
            {report.description}
          </p>
        </div>
      </div>

      {/* Footer details */}
      <div className="pt-3 border-t border-neutral-100 flex items-center justify-between text-[11px] text-neutral-400">
        <span className="flex items-center gap-1">
          <MapPin className="w-3 h-3 text-neutral-400" />
          {report.latitude.toFixed(4)}, {report.longitude.toFixed(4)}
        </span>
        <span>{new Date(report.reported_at).toLocaleDateString("id-ID")}</span>
      </div>
    </div>
  );
}
