"use client";

import {
  Marker,
  Popup,
} from "react-leaflet";

import { Report } from "@/types/map";

import L from "leaflet";

interface Props {
  reports: Report[];
}

const reportIcon = new L.Icon({
  iconUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon.png",

  shadowUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png",

  iconSize: [25, 41],
  iconAnchor: [12, 41],
});

export default function ReportMarker({
  reports,
}: Props) {
  return (
    <>
      {reports.map((report) => (
        <Marker
          key={report.id}
          position={report.position}
          icon={reportIcon}
        >
          <Popup>
            <div style={{ minWidth: 220 }}>
              <h3
                style={{
                  fontWeight: "bold",
                  marginBottom: 8,
                }}
              >
                {report.title}
              </h3>

              <p>
                {report.description}
              </p>

              <p>
                <strong>Kategori:</strong>{" "}
                {report.category}
              </p>

              <p>
                <strong>Rating:</strong>{" "}
                ⭐ {report.rating}
              </p>
            </div>
          </Popup>
        </Marker>
      ))}
    </>
  );
}