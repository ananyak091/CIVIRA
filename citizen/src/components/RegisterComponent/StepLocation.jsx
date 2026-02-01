import React, { useEffect, useState } from "react";
import {
  Crosshair,
  Loader2,
  MapPin,
  AlertCircle,
  RotateCcw,
} from "lucide-react";
import { MapContainer, TileLayer, Marker, useMap } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { useRegisterComplaintContext } from "../../context/RegisterComplaintContext";

/* ---------- Marker Icon (animated via global CSS) ---------- */
const dropIcon = new L.DivIcon({
  className: "custom-drop-marker",
  html: `<div class="marker-drop"></div>`,
  iconSize: [18, 18],
  iconAnchor: [9, 9],
});

const DEFAULT_CENTER = [20.5937, 78.9629]; // India
const DEFAULT_ZOOM = 4;

/* ---------- Map Controller (single responsibility) ---------- */
const MapController = ({ target }) => {
  const map = useMap();

  useEffect(() => {
    if (!target) return;

    map.flyTo(target.center, target.zoom, {
      duration: target.duration ?? 2.4,
      easeLinearity: target.easeLinearity ?? 0.25,
    });
  }, [target, map]);

  return null;
};

const StepLocation = ({
  onChange,
  errors,
  captures,

  setErrors,
}) => {
  const [isDetecting, setIsDetecting] = useState(false);
  const [detectError, setDetectError] = useState(null);

  const [mapTarget, setMapTarget] = useState(null); // controls animation
  const [markerPos, setMarkerPos] = useState(null); // controls marker
  const [locationLocked, setLocationLocked] = useState(false);

  /* ---------- Reverse Geocoding ---------- */
  const { formData, setFormData } = useRegisterComplaintContext();

  // --- 1. Real Reverse Geocoding Function ---
  const fetchAddressFromCoords = async (lat, lng) => {
    try {
      const res = await fetch(
        `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}&zoom=18&addressdetails=1`,
        {
          headers: {
            "User-Agent": "Civira-Report-App/1.0 (support@civira.app)",
          },
        },
      );

      if (!res.ok) throw new Error("Failed");

      const data = await res.json();
      const addr = data.address || {};

      return {
        ward:
          addr.neighbourhood ||
          addr.suburb ||
          addr.residential ||
          addr.village ||
          "",
        landmark: data.name || addr.amenity || addr.shop || addr.building || "",
        address: [
          `${addr.house_number || ""} ${addr.road || ""}`.trim(),
          addr.city || addr.town || addr.county || "",
        ]
          .filter(Boolean)
          .join(", "),
      };
    } catch {
      return null;
    }
  };

  /* ---------- Detect & Animate Location ---------- */
  const handleAutoFill = async () => {
    if (isDetecting || locationLocked) return;

    setIsDetecting(true);
    setDetectError(null);

    let lat, lng;

    const photoWithLoc = captures?.find(
      (c) => typeof c.lat === "number" && typeof c.lng === "number",
    );

    if (photoWithLoc) {
      lat = photoWithLoc.lat;
      lng = photoWithLoc.lng;
    } else {
      try {
        const pos = await new Promise((resolve, reject) => {
          navigator.geolocation.getCurrentPosition(resolve, reject, {
            enableHighAccuracy: true,
          });
        });
        lat = pos.coords.latitude;
        lng = pos.coords.longitude;
      } catch {
        setDetectError("GPS access denied");
        setIsDetecting(false);
        return;
      }
    }

    /* ---------- Animate only if target changed ---------- */
    if (
      !mapTarget ||
      mapTarget.center[0] !== lat ||
      mapTarget.center[1] !== lng
    ) {
      setMarkerPos([lat, lng]);
      setMapTarget({ center: [lat, lng], zoom: 16 });
    }

    const result = await fetchAddressFromCoords(lat, lng);

    if (result) {
      setFormData((prev) => ({
        ...prev,
        ward: result.ward,
        landmark: result.landmark,
        address: result.address,
      }));
      setErrors((prev) => ({ ...prev, ward: null, address: null }));
      setLocationLocked(true);
    } else {
      setDetectError("Address not found");
    }

    setIsDetecting(false);
  };

  /* ---------- Reset Location (clean & animated) ---------- */
  const resetLocation = () => {
    setMarkerPos(null);
    setMapTarget(null); // clear target first (important)

    // small delay ensures clean re-fly
    setTimeout(() => {
      setMapTarget({
        center: DEFAULT_CENTER,
        zoom: DEFAULT_ZOOM,
        duration: 1.4, // faster than forward
        easeLinearity: 0.4, // softer easing
      });
    }, 50);

    setLocationLocked(false);
    setDetectError(null);

    setFormData((prev) => ({
      ...prev,
      ward: "",
      landmark: "",
      address: "",
    }));
  };

  return (
    <div className="duration-500 animate-in fade-in slide-in-from-right-8">
      <h2 className="mb-6 text-2xl font-bold md:text-3xl text-slate-800">
        Location Data
      </h2>

      {/* ---------- MAP ---------- */}
      <div className="relative w-full h-48 mb-6 overflow-hidden border rounded-2xl bg-slate-100 border-slate-200">
        <MapContainer
          center={DEFAULT_CENTER}
          zoom={DEFAULT_ZOOM}
          scrollWheelZoom={false}
          className="w-full h-full"
        >
          <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
          <MapController target={mapTarget} />
          {markerPos && <Marker position={markerPos} icon={dropIcon} />}
        </MapContainer>

        {/* ---------- CONTROLS ---------- */}
        <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 z-[400] pointer-events-none">
          {!locationLocked && (
            <button
              type="button"
              onClick={handleAutoFill}
              disabled={isDetecting}
              className="flex items-center justify-center px-6 py-3 transition-all bg-white border rounded-full shadow-xl pointer-events-auto text-slate-700 hover:text-blue-600 active:scale-95"
            >
              {isDetecting ? (
                <Loader2 className="animate-spin" size={20} />
              ) : (
                <div className="flex items-center gap-2 text-sm font-bold">
                  <Crosshair size={18} />
                  Use Current Location
                </div>
              )}
            </button>
          )}

          {locationLocked && !isDetecting && (
            <button
              type="button"
              onClick={resetLocation}
              className="flex items-center gap-2 px-4 py-2 mt-20 text-xs font-semibold transition-all border rounded-full shadow-md pointer-events-auto text-slate-600 hover:text-red-600 bg-white/90 border-slate-100"
            >
              <RotateCcw size={14} />
              Reset
            </button>
          )}
        </div>

        {detectError && (
          <div
            className="absolute bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-2
                       text-xs text-red-500 font-medium bg-white/95 border border-red-100
                       px-3 py-2 rounded-full shadow-lg z-[401]"
          >
            <AlertCircle size={14} />
            {detectError}
          </div>
        )}
      </div>

      {/* ---------- FORM ---------- */}
      <div className="grid grid-cols-1 gap-6 mb-6 md:grid-cols-2">
        <div className="relative">
          <input
            name="ward"
            value={formData.ward}
            onChange={onChange}
            disabled={locationLocked}
            placeholder="Ward No / Area"
            className={`w-full bg-slate-50 border rounded-xl p-4 pr-12
                        focus:ring-2 focus:ring-blue-500 outline-none ${
                          errors.ward
                            ? "border-red-400 bg-red-50"
                            : "border-slate-200"
                        }`}
          />
          <span className="absolute -translate-y-1/2 right-4 top-1/2 text-slate-400">
            <MapPin size={18} />
          </span>
        </div>

        <input
          name="landmark"
          value={formData.landmark}
          onChange={onChange}
          disabled={locationLocked}
          placeholder="Nearest Landmark"
          className="w-full p-4 border bg-slate-50 border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <input
        name="address"
        value={formData.address}
        onChange={onChange}
        disabled={locationLocked}
        placeholder="Specific Street Address"
        className={`w-full bg-slate-50 border rounded-xl p-4
                    focus:ring-2 focus:ring-blue-500 outline-none ${
                      errors.address
                        ? "border-red-400 bg-red-50"
                        : "border-slate-200"
                    }`}
      />
    </div>
  );
};

export default StepLocation;
