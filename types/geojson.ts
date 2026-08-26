export interface GeoJsonProperties {
  id?: string;
  name?: string;
  amenity?: string;
  building?: string;

  "addr:city"?: string;
  "addr:postcode"?: string;
  "addr:street"?: string;

  [key: string]: unknown;
}

export interface GeoJsonFeature {
  type: "Feature";

  geometry: {
    type: "Point" | "LineString" | "Polygon";

    coordinates: any;
  };

  properties: GeoJsonProperties;
}

export interface GeoJsonData {
  type: "FeatureCollection";
  features: GeoJsonFeature[];
}