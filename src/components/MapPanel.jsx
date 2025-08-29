import { useEffect, useState, useRef } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

/** Configuration **/
const POLL_INTERVAL_MS = 5000; // Refresh interval
const CO2_THRESHOLDS = { good: 450, warn: 800 };

// Define base values for each point according to location type
const SENSOR_POINTS = [
  { id: 1,  name: "Eva'shome", lat: 48.1353, lng: 11.5614, base: { co2: 700, temp: 23, hum: 60 } },
  { id: 2,  name: "Poccistrasse", lat: 48.1255, lng: 11.5496, base: { co2: 500, temp: 23, hum: 60 } },
  { id: 3,  name: "Schloss Nymphenburg", lat: 48.1559, lng: 11.4935, base: { co2: 370, temp: 20, hum: 65 } },
  { id: 4,  name: "Pinakothek", lat: 48.1485, lng: 11.5701, base: { co2: 450, temp: 21, hum: 50 } },
  { id: 5,  name: "OlympiaPark",    lat: 48.1758, lng: 11.5519, base: { co2: 400, temp: 22, hum: 70 } },
  { id: 6,  name: "Chandana's Home",      lat: 48.1826, lng: 11.5183, base: { co2: 800, temp: 23, hum: 54 } },
  { id: 7,  name: "Luisenstrasse",lat: 48.1505, lng: 11.5665, base: { co2: 400, temp: 20, hum: 52 } },
];

// Fix default icon paths
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
  iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
});

// Create colored circle marker
function createColoredIcon(hexColor) {
  const html = `
    <div style="
      background-color:${hexColor};
      width:22px;height:22px;border-radius:50%;
      border:3px solid #fff;box-shadow:0 2px 5px rgba(0,0,0,.3)
    "></div>`;
  return L.divIcon({
    html,
    iconSize: [22, 22],
    iconAnchor: [11, 11],
    popupAnchor: [0, -11],
    className: "custom-marker",
  });
}

// Color by CO2 level
function colorByCO2(v) {
  if (v == null) return "#999999";
  if (v <= CO2_THRESHOLDS.good) return "#00cc00"; // green
  if (v <= CO2_THRESHOLDS.warn) return "#ff9900"; // orange
  return "#cc0000";                               // red
}

// Generate small random fluctuation around base value
function fluctuate(base, range) {
  return base + (Math.random() - 0.5) * range;
}

export default function MapPanel() {
  const [points, setPoints] = useState(
    SENSOR_POINTS.map(p => ({
      ...p,
      co2: p.base.co2,
      temperature: p.base.temp,
      humidity: p.base.hum,
      ts: new Date().toISOString()
    }))
  );
  const timerRef = useRef(null);

  // Refresh all points with small random fluctuations
  const tick = () => {
    const ts = new Date().toISOString();
    setPoints(prev =>
      prev.map(p => ({
        ...p,
        co2: fluctuate(p.base.co2, 15),         // CO₂ fluctuates ±7.5 ppm
        temperature: fluctuate(p.base.temp, 1), // Temp fluctuates ±0.5°C
        humidity: fluctuate(p.base.hum, 3),     // Humidity fluctuates ±1.5%
        ts,
      }))
    );
  };

  useEffect(() => {
    tick(); // Initial load
    if (POLL_INTERVAL_MS > 0) {
      timerRef.current = setInterval(tick, POLL_INTERVAL_MS);
      return () => {
        if (timerRef.current) clearInterval(timerRef.current);
      };
    }
  }, []);

  return (
    <div style={{ padding: "1rem" }}>
      <h2>Map Panel (Mock)</h2>
      <div style={{ marginBottom: 12, color: "#666" }}>
        Auto-refresh: {POLL_INTERVAL_MS / 1000}s • CO₂ thresholds: ≤{CO2_THRESHOLDS.good} green, ≤{CO2_THRESHOLDS.warn} orange, else red
      </div>

      <div style={{ height: 600, width: "100%", border: "2px solid #e5e7eb", borderRadius: 10, overflow: "hidden" }}>
        <MapContainer
          center={[48.1374, 11.5755]}
          zoom={12}
          style={{ height: "100%", width: "100%" }}
          scrollWheelZoom
        >
          <TileLayer
            attribution="&copy; OpenStreetMap contributors"
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />

          {points.map(p => {
            const icon = createColoredIcon(colorByCO2(p.co2));
            return (
              <Marker key={p.id} position={[p.lat, p.lng]} icon={icon}>
                <Popup>
                  <div style={{ fontWeight: 700, marginBottom: 6 }}>
                    {p.name} (ID: {p.id})
                  </div>
                  <div>CO₂: {p.co2 != null ? `${p.co2.toFixed(1)} ppm` : "No data"}</div>
                  <div>Temperature: {p.temperature != null ? `${p.temperature.toFixed(1)} °C` : "No data"}</div>
                  <div>Humidity: {p.humidity != null ? `${p.humidity.toFixed(0)} %` : "No data"}</div>
                  <div style={{ color: "#666", fontSize: 12, marginTop: 6 }}>
                    Last updated: {p.ts ? new Date(p.ts).toLocaleString() : "-"}
                  </div>
                </Popup>
              </Marker>
            );
          })}
        </MapContainer>
      </div>
    </div>
  );
}
