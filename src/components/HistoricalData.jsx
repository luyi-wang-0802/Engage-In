// src/pages/HistoricalData.jsx
import React from "react";
import { MapContainer, TileLayer, Marker, Popup, Tooltip } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import iconUrl from "leaflet/dist/images/marker-icon.png";
import iconRetinaUrl from "leaflet/dist/images/marker-icon-2x.png";
import shadowUrl from "leaflet/dist/images/marker-shadow.png";

L.Icon.Default.mergeOptions({ iconUrl, iconRetinaUrl, shadowUrl });

// ===== Unified credentials (for demo only, not recommended for production) =====
const GRAFANA_USER = "gi3-student";
const GRAFANA_PASS = "geoSensorWeb2023!";

// ===== Use the full Grafana share link directly=====
const MARKERS = [
  { 
    id: "POINT_1", 
    label: "Eva's Home", 
    lat: 48.1353, 
    lng: 11.5614,
    grafanaUrl: "https://gi3.gis.lrg.tum.de/grafana/d/a3569ee4-c1b0-4f61-a824-d723502ccbf2/eva-s-home?orgId=1&from=1755264426309&to=1755279655362"
  },
  { 
    id: "POINT_2", 
    label: "Poccistrasse", 
    lat: 48.1255, 
    lng: 11.5496,
    grafanaUrl: "https://gi3.gis.lrg.tum.de/grafana/d/de8144f4-7770-49e1-a62e-791f71470fdb/poccistr?orgId=1&from=1755283127125&to=1755288069089"
  },
  { 
    id: "POINT_3", 
    label: "Schloss Nymphenburg", 
    lat: 48.1559, 
    lng: 11.4935,
    grafanaUrl: "https://gi3.gis.lrg.tum.de/grafana/d/fd09378f-de1b-4f80-a7e3-c98c64f7ec04/schloss-nymphenburg?orgId=1&from=1755962955689&to=1755969121010"
  },
  { 
    id: "POINT_4", 
    label: "Pinakothek", 
    lat: 48.1485, 
    lng: 11.5701,
    grafanaUrl: "https://gi3.gis.lrg.tum.de/grafana/d/ea5e8478-4685-4b57-82ec-3dab2e1fd28d/alte-pinakotheke?orgId=1&from=1756036863443&to=1756040474801"
  },
  { 
    id: "POINT_5", 
    label: "OlympiaPark", 
    lat: 48.1758, 
    lng: 11.5519,
    grafanaUrl: "https://gi3.gis.lrg.tum.de/grafana/d/b91421f3-2561-481b-a55e-d73fe0e222f7/olympia-park?orgId=1&from=1756120169000&to=1756122949000"
  },
  { 
    id: "POINT_6", 
    label: "Chandana's Home", 
    lat: 48.1826,
    lng: 11.5183,
    grafanaUrl: "https://gi3.gis.lrg.tum.de/grafana/d/d595ed38-46ff-4d9d-97ad-cef6e06159eb/chandana-s-home?orgId=1&from=1756071120167&to=1756078608405"
  },
  { 
    id: "POINT_7", 
    label: "Luisenstrasse", 
    lat: 48.1500, 
    lng: 11.5500,
    grafanaUrl: "https://gi3.gis.lrg.tum.de/grafana/d/dashboard7-id/point7-dashboard"
  },
];

function copy(text) {
  if (navigator.clipboard?.writeText) return navigator.clipboard.writeText(text);
  const ta = document.createElement("textarea");
  ta.value = text; document.body.appendChild(ta); ta.select();
  try { document.execCommand("copy"); } finally { document.body.removeChild(ta); }
}

export default function HistoricalData() {
  const center = [48.1495, 11.5675];
  const zoom = 16;

  return (
    <div style={{ width: "100%", height: "100vh" }}>
      <MapContainer center={center} zoom={zoom} style={{ width: "100%", height: "100%" }}>
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution="&copy; OpenStreetMap"
        />

        {MARKERS.map((m) => (
          <Marker key={m.id} position={[m.lat, m.lng]}>
            <Tooltip direction="top" offset={[0, -10]} opacity={1} sticky>
              {m.label ?? m.id}
            </Tooltip>

            <Popup closeButton autoPan>
              <div style={{ minWidth: 260 }}>
                <div style={{ fontWeight: 600, marginBottom: 8 }}>
                  {m.label ?? m.id}
                </div>

                <div style={{ marginBottom: 8 }}>
                  <a
                    href={m.grafanaUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{ textDecoration: "underline" }}
                  >
                    Open Grafana to View Historical Data
                  </a>
                </div>

                <div style={{ fontSize: 12, color: "#555", marginBottom: 6 }}>
                  Login Required:
                </div>
                <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
                  <button
                    onClick={() => copy(GRAFANA_USER)}
                    style={{ padding: "4px 8px", cursor: "pointer" }}
                    title="Copy Username"
                  >
                    Copy Username
                  </button>
                  <button
                    onClick={() => copy(GRAFANA_PASS)}
                    style={{ padding: "4px 8px", cursor: "pointer" }}
                    title="Copy Password"
                  >
                    Copy Password
                  </button>
                </div>
              </div>
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
}
