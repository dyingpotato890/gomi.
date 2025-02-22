"use client";
import { useState, useRef } from "react";

export default function CameraUpload() {
  const [image, setImage] = useState(null);
  const [coordinates, setCoordinates] = useState(null);
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const [isCameraOpen, setIsCameraOpen] = useState(false);

  // Open Camera
  const startCamera = async () => {
    setIsCameraOpen(true);
    const stream = await navigator.mediaDevices.getUserMedia({ video: true });
    if (videoRef.current) {
      videoRef.current.srcObject = stream;
    }
  };

  // Capture Image
  const takePhoto = () => {
    const canvas = canvasRef.current;
    const video = videoRef.current;
    if (!canvas || !video) return;

    const context = canvas.getContext("2d");
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    context.drawImage(video, 0, 0, canvas.width, canvas.height);

    // Stop the camera stream
    const stream = video.srcObject;
    const tracks = stream.getTracks();
    tracks.forEach((track) => track.stop());

    setImage(canvas.toDataURL("image/jpeg"));
    setIsCameraOpen(false);
  };

  // Handle file selection
  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setImage(URL.createObjectURL(file));
    }
  };

  // Upload Image to API
  const handleUpload = async () => {
    if (!image) return alert("Please select or capture an image");

    const formData = new FormData();
    
    if (image.startsWith("data:image")) {
      // Convert base64 to file
      const res = await fetch(image);
      const blob = await res.blob();
      formData.append("image", new File([blob], "photo.jpg", { type: "image/jpeg" }));
    } else {
      // File from input
      const fileInput = document.getElementById("fileInput");
      if (fileInput.files.length > 0) {
        formData.append("image", fileInput.files[0]);
      }
    }

    const response = await fetch("/api/ecoordinates", {
      method: "POST",
      body: formData,
    });

    const data = await response.json();
    if (data.latitude && data.longitude) {
      setCoordinates({ lat: data.latitude, lng: data.longitude });
    } else {
      alert("No GPS data found in image.");
    }
  };

  return (
    <div className="flex flex-col items-center gap-4 p-4">
      {!isCameraOpen ? (
        <>
          <button onClick={startCamera} className="bg-green-500 text-white px-4 py-2 rounded">
            Open Camera
          </button>
          <input id="fileInput" type="file" accept="image/*" onChange={handleFileChange} />
        </>
      ) : (
        <>
          <video ref={videoRef} autoPlay className="w-64 h-48 bg-black"></video>
          <button onClick={takePhoto} className="bg-red-500 text-white px-4 py-2 rounded">
            Capture Photo
          </button>
          <canvas ref={canvasRef} className="hidden"></canvas>
        </>
      )}

      {image && <img src={image} alt="Captured" className="w-40 h-40 object-cover" />}

      <button onClick={handleUpload} className="bg-blue-500 text-white px-4 py-2 rounded">
        Extract Coordinates
      </button>

      {coordinates && (
        <p>
          <strong>Latitude:</strong> {coordinates.lat} <br />
          <strong>Longitude:</strong> {coordinates.lng}
        </p>
      )}
    </div>
  );
}
