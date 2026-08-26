import { RoadsGeoJSON } from "@/types/map";

export const roads: RoadsGeoJSON = {
  type: "FeatureCollection",

  features: [
    {
      type: "Feature",

      properties: {
        id: "road-001",
        name: "Jalan Merdeka",
        type: "primary",
        surface: "asphalt",
        rating: 4.5,
        reports: 12,
      },

      geometry: {
        type: "LineString",

        coordinates: [
          [110.3695, -7.7956],
          [110.3702, -7.7960],
          [110.3710, -7.7968],
          [110.3720, -7.7972],
        ],
      },
    },

    {
      type: "Feature",

      properties: {
        id: "road-002",
        name: "Jalan Sudirman",
        type: "secondary",
        surface: "asphalt",
        rating: 3.8,
        reports: 8,
      },

      geometry: {
        type: "LineString",

        coordinates: [
          [110.3675, -7.7940],
          [110.3685, -7.7948],
          [110.3695, -7.7956],
          [110.3705, -7.7965],
        ],
      },
    },

    {
      type: "Feature",

      properties: {
        id: "road-003",
        name: "Jalan Diponegoro",
        type: "tertiary",
        surface: "concrete",
        rating: 3.2,
        reports: 5,
      },

      geometry: {
        type: "LineString",

        coordinates: [
          [110.3720, -7.7930],
          [110.3715, -7.7940],
          [110.3710, -7.7950],
          [110.3705, -7.7960],
        ],
      },
    },
  ],
};