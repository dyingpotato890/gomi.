"use client";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

const customIcon = new L.Icon({
  iconUrl: "trash.png", // Path to the custom marker image
  iconSize: [54, 40], // Size of the icon [width, height]
  iconAnchor: [20, 40], // Anchor point (center-bottom)
  popupAnchor: [0, -35], // Popup position relative to the icon
});

const locations = [
  { position: [28.6139, 77.209], name: "Delhi, India" },
  { position: [12.9716, 77.5946], name: "Bangalore, India" },
  { position: [19.076, 72.8777], name: "Mumbai, India" },
  { position: [13.0827, 80.2707], name: "Chennai, India" },
  { position: [10.8505, 76.2711], name: "Kerala, India" },
];

export default function MapComponent() {
  return (
    <div className="flex justify-center items-center p-4">
      <div className="w-full max-w-2xl bg-white shadow-lg rounded-lg p-4">
        <h2 className="text-lg font-semibold mb-3 text-center">
          📍 Location Map
        </h2>
        <MapContainer
          center={[10.02879, 76.326424]}
          zoom={10}
          className="h-96 w-full rounded-lg"
        >
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          />
          {locations.map((location, index) => (
            <Marker key={index} position={location.position} icon={customIcon}>
              <Popup>{location.name}</Popup>
            </Marker>
          ))}
        </MapContainer>
      </div>
    </div>
  );
}
