export interface RoadProperties {
  id: string;
  name: string;
  type: string;
  surface: string;
  rating: number;
  reports: number;
}

export interface RoadFeature {
  type: "Feature";
  properties: RoadProperties;
  geometry: {
    type: "LineString";
    coordinates: [number, number][];
  };
}

export interface RoadsGeoJSON {
  type: "FeatureCollection";
  features: RoadFeature[];
}

export interface Report {
  id: string;
  title: string;
  description: string;
  rating: number;
  category: string;
  position: [number, number];
}