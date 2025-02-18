"use client";  
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";

export default function MapComponent() {
  return (
    <div className="flex justify-center items-center p-4">
      <div className="w-full max-w-2xl bg-white shadow-lg rounded-lg p-4">
        <h2 className="text-lg font-semibold mb-3 text-center">📍 Location Map</h2>
        <MapContainer
          center={[10.028790, 76.326424]}
          zoom={10}
          className="h-96 w-full rounded-lg"
        >
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          />
          <Marker position={[28.6139, 77.2090]}>
            <Popup>Delhi, India</Popup>
          </Marker>
        </MapContainer>
      </div>
    </div>
  );
}
