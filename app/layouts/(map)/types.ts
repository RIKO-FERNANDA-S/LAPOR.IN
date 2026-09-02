export type SeverityLevel = "RENDAH" | "SEDANG" | "TINGGI" | "KRITIS";
export type ReportStatus = "MENUNGGU" | "DIPROSES" | "DIVERIFIKASI" | "SELESAI" | "DITOLAK";

export interface GeoJsonProperties {
  id: string;
  name: string;
  category: string;
  icon?: string;
  address?: string;
  district?: string;
  city?: string;
  postcode?: string;
  description?: string;
  amenity?: string;
  building?: string;
  [key: string]: any;
}

export interface GeoJsonFeature {
  type: "Feature";
  geometry: {
    type: "Point" | "Polygon" | "LineString";
    coordinates: [number, number] | any;
  };
  properties: GeoJsonProperties;
}

export interface GeoJsonCollection {
  type: "FeatureCollection";
  metadata?: {
    title?: string;
    district?: string;
    city?: string;
    province?: string;
    center?: [number, number];
    total_features?: number;
  };
  features: GeoJsonFeature[];
}

export interface DbReportUser {
  name: string | null;
  email: string | null;
}

export interface DbReportSubCategory {
  id: number;
  name: string;
  code: string;
}

export interface DbReportRegion {
  id: number;
  province: string;
  city: string;
  district: string;
  village: string;
}

export interface DbReport {
  id: number;
  user_id: string;
  user?: DbReportUser;
  sub_category_id: number;
  sub_category?: DbReportSubCategory;
  region_id: number;
  region?: DbReportRegion;
  report_date: string;
  location_description: string | null;
  latitude: number;
  longitude: number;
  description: string;
  rating?: number; // Rating 1-5 bintang
  aspect?: string; // Sub-part / aspek yang dinilai
  severity_level: SeverityLevel;
  status: ReportStatus;
  photo_urls: string[];
  reported_at: string;
}

export interface MapFilterState {
  showPois: boolean;
  showReports: boolean;
  selectedCategory: string;
  selectedSeverity: string;
  selectedStatus: string;
  searchQuery: string;
}
