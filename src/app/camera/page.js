"use client";
import { useState, useRef } from "react";

export default function ImageUploader() {
  const [image, setImage] = useState(null);
  const [location, setLocation] = useState(null);
  const [loading, setLoading] = useState(false);
  const fileInputRef = useRef(null);

  const handleFileChange = async (event) => {
    const file = event.target.files[0];
    if (file) {
      setImage(URL.createObjectURL(file));
      await uploadImage(file);
    }
  };

  const handleCapture = () => {
    fileInputRef.current.click();
  };

  const uploadImage = async (file) => {
    setLoading(true);
    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await fetch("/api/coordinates", {
        method: "POST",
        body: formData,
      });

      const data = await response.json();
      if (response.ok) {
        setLocation(data.location);
      } else {
        setLocation({ error: data.message || "No GPS data found" });
      }
    } catch (error) {
      setLocation({ error: "Error extracting GPS data" });
    }
    setLoading(false);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-green-200 p-4">
      <div className="bg-white p-6 rounded-lg shadow-lg max-w-md text-center">
        <h1 className="text-xl font-bold mb-4">Upload or Capture Image</h1>

        {/* Display image preview */}
        {image && <img src={image} alt="Uploaded" className="w-full h-48 object-cover mb-4 rounded-md" />}

        {/* File input for uploading and capturing */}
        <input
          type="file"
          accept="image/*"
          capture="environment"
          className="hidden"
          ref={fileInputRef}
          onChange={handleFileChange}
        />

        <div className="flex gap-4">
          <button
            onClick={() => fileInputRef.current.click()}
            className="bg-blue-500 text-white px-4 py-2 rounded-lg"
          >
            Upload Image
          </button>

          <button
            onClick={handleCapture}
            className="bg-green-500 text-white px-4 py-2 rounded-lg"
          >
            Take Photo
          </button>
        </div>

        {/* Loading Indicator */}
        {loading && <p className="mt-4 text-blue-500">Processing...</p>}

        {/* Display GPS Coordinates */}
        {location && (
          <div className="mt-4 p-4 bg-gray-100 rounded-lg">
            {location.error ? (
              <p className="text-red-500">{location.error}</p>
            ) : (
              <p className="text-green-700">
                Latitude: {location.latitude} <br />
                Longitude: {location.longitude}
              </p>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
