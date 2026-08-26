"use client";

import { GeoJSON } from "react-leaflet";
import L from "leaflet";

interface Props {
  data: any;
}

export default function GeoJsonLayer({
  data,
}: Props) {
  const pointToLayer = (
    feature: any,
    latlng: L.LatLng
  ) => {
    return L.circleMarker(latlng, {
      radius: 8,
      weight: 2,
      fillOpacity: 0.9,
    });
  };

  const onEachFeature = (
    feature: any,
    layer: L.Layer
  ) => {
    const properties =
      feature.properties || {};

    const name =
      properties.name ??
      "Unnamed Location";

    const amenity =
      properties.amenity;

    const building =
      properties.building;

    const street =
      properties["addr:street"];

    const city =
      properties["addr:city"];

    const postcode =
      properties["addr:postcode"];

    layer.bindPopup(`
      <div style="
        min-width: 220px;
        font-family: sans-serif;
      ">
        <h3 style="
          font-size: 16px;
          font-weight: 700;
          margin-bottom: 10px;
        ">
          ${name}
        </h3>

        ${
          amenity
            ? `
              <p>
                <b>Amenity:</b>
                ${amenity}
              </p>
            `
            : ""
        }

        ${
          building
            ? `
              <p>
                <b>Building:</b>
                ${building}
              </p>
            `
            : ""
        }

        ${
          street
            ? `
              <p>
                <b>Jalan:</b>
                ${street}
              </p>
            `
            : ""
        }

        ${
          city
            ? `
              <p>
                <b>Kota:</b>
                ${city}
              </p>
            `
            : ""
        }

        ${
          postcode
            ? `
              <p>
                <b>Kode Pos:</b>
                ${postcode}
              </p>
            `
            : ""
        }

        <hr />

        <small>
          OSM ID:
          ${properties.id ?? "-"}
        </small>
      </div>
    `);
  };

  return (
    <GeoJSON
      data={data}
      pointToLayer={pointToLayer}
      onEachFeature={onEachFeature}
    />
  );
}