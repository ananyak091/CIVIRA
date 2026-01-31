import React, { useRef, useState, useEffect } from "react";
import { X, Signal } from "lucide-react";

/* ---------- Helpers ---------- */
const getGpsSignalColor = (accuracy) => {
  if (!accuracy) return "text-slate-400";
  if (accuracy < 20) return "text-emerald-400";
  if (accuracy < 50) return "text-yellow-400";
  return "text-red-400";
};

const getGpsSignalText = (accuracy) => {
  if (!accuracy) return "Searching...";
  if (accuracy < 20) return `Excellent (${accuracy}m)`;
  if (accuracy < 50) return `Fair (${accuracy}m)`;
  return `Poor (${accuracy}m) - Wait...`;
};

/* ---------- Component ---------- */
const CameraOverlay = ({ onCapture, onClose }) => {
  const videoRef = useRef(null);
  const streamRef = useRef(null);
  const [gpsStats, setGpsStats] = useState({
    accuracy: null,
    lat: null,
    lng: null,
  });

  /* 1. Initialize Camera & GPS on Mount */
  useEffect(() => {
    let watchId;

    const startResources = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({
          video: { facingMode: "environment" },
        });
        streamRef.current = stream;
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
        }
      } catch (err) {
        console.error("Camera Error:", err);
        alert("Camera permission denied or unavailable.");
        onClose();
      }

      if (navigator.geolocation) {
        watchId = navigator.geolocation.watchPosition(
          (pos) => {
            setGpsStats({
              accuracy: Math.round(pos.coords.accuracy),
              lat: pos.coords.latitude,
              lng: pos.coords.longitude,
            });
          },
          (err) => console.warn("GPS Error", err),
          { enableHighAccuracy: true, maximumAge: 0 },
        );
      }
    };

    startResources();

    return () => {
      if (streamRef.current) {
        streamRef.current.getTracks().forEach((track) => track.stop());
      }
      if (watchId) navigator.geolocation.clearWatch(watchId);
    };
  }, [onClose]);

  /* 2. Capture Logic (Updated with Time) */
  const takePhoto = () => {
    if (!videoRef.current) return;

    const canvas = document.createElement("canvas");
    canvas.width = videoRef.current.videoWidth;
    canvas.height = videoRef.current.videoHeight;
    const ctx = canvas.getContext("2d");

    ctx.drawImage(videoRef.current, 0, 0);
    const dataUrl = canvas.toDataURL("image/jpeg", 0.8);

    // --- CAPTURE EXACT TIME ---
    const now = new Date();
    // Format: "10:30:45 AM"
    const timeString = now.toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
    });
    // ISO string for backend (e.g., 2023-10-27T10:30:00.000Z)
    const isoString = now.toISOString();

    onCapture({
      id: Date.now(),
      previewUrl: dataUrl,
      lat: gpsStats.lat,
      lng: gpsStats.lng,
      accuracy: gpsStats.accuracy,
      timestamp: timeString, // For Display
      isoTime: isoString, // For Backend
    });
  };

  return (
    <div className="fixed inset-0 z-[100] bg-black flex flex-col animate-in fade-in duration-300">
      {/* Top Bar */}
      <div className="absolute top-0 left-0 z-20 flex items-start justify-between w-full p-4">
        <div className="flex flex-col gap-1">
          <div className="flex items-center gap-2 px-4 py-2 text-xs font-medium text-white border bg-black/40 backdrop-blur-md rounded-2xl border-white/10">
            <Signal
              size={16}
              className={getGpsSignalColor(gpsStats?.accuracy)}
            />
            <div className="flex flex-col">
              <span className="uppercase tracking-wider text-[10px] text-slate-400 font-bold">
                GPS Signal
              </span>
              <span>{getGpsSignalText(gpsStats?.accuracy)}</span>
            </div>
          </div>
        </div>
        <button
          onClick={onClose}
          className="p-2 text-white transition rounded-full bg-black/40 backdrop-blur-md hover:bg-white/20"
        >
          <X size={24} />
        </button>
      </div>

      {/* Camera View */}
      <div className="relative flex items-center justify-center flex-1 overflow-hidden">
        <video
          ref={videoRef}
          autoPlay
          playsInline
          className="absolute object-cover w-full h-full"
        />
        <div className="relative z-10 w-64 h-64 border-2 opacity-50 pointer-events-none border-white/50 rounded-xl">
          <div className="absolute top-0 left-0 w-4 h-4 border-t-4 border-l-4 border-white" />
          <div className="absolute top-0 right-0 w-4 h-4 border-t-4 border-r-4 border-white" />
          <div className="absolute bottom-0 left-0 w-4 h-4 border-b-4 border-l-4 border-white" />
          <div className="absolute bottom-0 right-0 w-4 h-4 border-b-4 border-r-4 border-white" />
        </div>
        <div className="absolute px-3 py-1 text-sm font-medium rounded-full bottom-10 text-white/80 bg-black/20 backdrop-blur-sm">
          {gpsStats?.accuracy && gpsStats.accuracy < 20
            ? "Target Locked. Ready."
            : "Calibrating GPS..."}
        </div>
      </div>

      {/* Capture Button */}
      <div className="flex items-center justify-center h-32 pb-6 bg-black/80 backdrop-blur-sm">
        <button
          onClick={takePhoto}
          className={`w-20 h-20 rounded-full border-4 flex items-center justify-center group active:scale-95 transition-transform ${
            gpsStats?.accuracy > 50 ? "border-yellow-500" : "border-white"
          }`}
        >
          <div
            className={`w-16 h-16 rounded-full transition-colors ${
              gpsStats?.accuracy > 50
                ? "bg-yellow-100"
                : "bg-white group-hover:bg-slate-200"
            }`}
          />
        </button>
      </div>
    </div>
  );
};

export default CameraOverlay;
