import React from "react";
import { Camera, MapPin, AlertTriangle, X, Clock } from "lucide-react";
import { useRegisterComplaintContext } from "../../context/RegisterComplaintContext";
import { GrValidate } from "react-icons/gr";
import { RiRobot2Fill } from "react-icons/ri";

const StepEvidence = ({ captures, onOpenCam, onRemove }) => {
  const { validImages, setValidImages } = useRegisterComplaintContext();
  return (
    <div className="animate-in fade-in slide-in-from-right-8 duration-500">
      {validImages ? (
        <h2 className="text-2xl md:text-3xl font-bold text-slate-800 mb-8">
          Image verified By AI <RiRobot2Fill className="inline-block" />
        </h2>
      ) : (
        <>
          <h2 className="text-2xl md:text-3xl font-bold text-slate-800 mb-2">
            Capture Evidence
          </h2>
          <p className="text-slate-500 mb-8">
            Click clear photos. Location & Time will be auto-tagged.
          </p>
        </>
      )}

      {/* Trigger Button */}
      <div
        onClick={() => {
          captures.length < 3 && onOpenCam();
        }}
        className={`group border-2 border-dashed ${validImages ? "border-green-700 " : "border-slate-300 hover:border-blue-500"} bg-slate-50 hover:bg-blue-50 rounded-2xl p-12 text-center cursor-pointer transition-all active:scale-[0.99] ${
          captures.length >= 3 ? "opacity-50 cursor-not-allowed" : ""
        }`}
      >
        <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mx-auto mb-4 shadow-sm group-hover:scale-110 transition-transform">
          {validImages ? (
            <GrValidate size={32} className="text-emerald-500" />
          ) : (
            <Camera
              className="text-slate-400 group-hover:text-blue-600"
              size={28}
            />
          )}
          {/* <div>{captures.length}</div> */}
        </div>

        {captures.length < 3 ? (
          <h3 className="text-slate-900 font-bold text-lg mb-1">
            {validImages ? (
              <span className="text-green-700">Photos validated !! </span>
            ) : (
              <span>Add Photos</span>
            )}
          </h3>
        ) : (
          <h3 className="text-red-600 font-bold text-lg mb-1">
            Maximum of 3 photos reached
            {validImages && " - Photos validated"}
          </h3>
        )}

        {validImages ? (
          <p className="text-sm text-slate-500 font-serif italic">
            "Thanks for being a responsible citizen."
          </p>
        ) : (
          <p className="text-sm text-slate-500">Auto-tags GPS & Time</p>
        )}
      </div>

      {/* List of Photos */}
      {captures.length > 0 && (
        <div className="flex flex-col gap-3 mt-8">
          <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">
            Attached Evidence
          </h4>
          {captures.map((cap, idx) => (
            <div
              key={cap.id}
              className={`flex items-center gap-4 bg-white p-3 rounded-xl border border-slate-200 shadow-sm ${
                validImages ? " bg-green-500 border-green-600" : ""
              }`}
            >
              <img
                src={cap.previewUrl}
                alt="Evidence"
                className="w-16 h-16 rounded-lg object-cover bg-slate-100"
              />
              <div className="flex-1 min-w-0">
                <span className="font-bold text-slate-700 text-sm block mb-1">
                  Image {idx + 1}
                </span>

                {/* Location Tag */}
                {cap.lat ? (
                  <div className="flex items-center gap-1.5 text-xs text-emerald-600 font-medium mb-1">
                    <MapPin size={12} /> {cap.lat.toFixed(5)},{" "}
                    {cap.lng.toFixed(5)}
                  </div>
                ) : (
                  <div className="flex items-center gap-1.5 text-xs text-amber-600 font-medium mb-1">
                    <AlertTriangle size={12} /> No Location Data
                  </div>
                )}

                {/* Time Tag (NEW) */}
                <div className="flex items-center gap-1.5 text-xs text-slate-500 font-medium">
                  <Clock size={12} /> {cap.timestamp || "--:--"}
                </div>
              </div>

              {validImages ? (
                <div className="p-2 text-slate-400">
                  <GrValidate size={18} className="text-emerald-500" />
                </div>
              ) : (
                <button
                  onClick={() => onRemove(cap.id)}
                  className="p-2 text-slate-400 hover:text-red-500"
                >
                  <X size={18} />
                </button>
              )}
            </div>
          ))}

          {captures.length < 3 && !validImages && (
            <button
              onClick={onOpenCam}
              className="w-full py-3 rounded-xl border border-dashed border-slate-300 text-slate-500 text-sm font-medium hover:bg-slate-50 hover:text-blue-600 transition-all flex items-center justify-center gap-2"
            >
              <Camera size={16} /> Add another photo
            </button>
          )}
        </div>
      )}
    </div>
  );
};

export default StepEvidence;
