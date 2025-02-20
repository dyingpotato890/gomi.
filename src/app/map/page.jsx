"use client";
import dynamic from "next/dynamic";

const Map = dynamic(() => import("@/app/maprelated/Map"), {
  loading: () => <p>Loading map...</p>,
  ssr: false, // ✅ Disable SSR
});

export default function MyPage() {
  return (
    <div>
      <h1>My Map</h1>
      <Map />
    </div>
  );
}
