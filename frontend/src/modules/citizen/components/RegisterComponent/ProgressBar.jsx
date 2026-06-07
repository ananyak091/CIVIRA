import React from "react";
import { Check } from "lucide-react";

const ProgressBar = ({ currentStep, totalSteps = 4 }) => {
  const progressWidth = ((currentStep - 1) / (totalSteps - 1)) * 100;
  const labels = ["Photo", "Location", "Details", "Review"];

  return (
    <div className="relative flex justify-between px-2 mb-12">
      {/* Track Lines */}
      <div className="absolute top-[15px] left-0 w-full h-[3px] bg-slate-200 -z-10 rounded-full" />
      <div
        className="absolute top-[15px] left-0 h-[3px] bg-blue-600 transition-all duration-500 ease-out -z-10 rounded-full"
        style={{ width: `${progressWidth}%` }}
      />

      {[1, 2, 3, 4].map((i) => (
        <div
          key={i}
          className="relative z-10 flex flex-col items-center gap-2 cursor-default"
        >
          <div
            className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold border-2 transition-all ${
              i < currentStep
                ? "bg-emerald-500 border-emerald-500 text-white"
                : i === currentStep
                ? "bg-blue-600 border-blue-600 text-white"
                : "bg-white border-slate-300 text-slate-400"
            }`}
          >
            {i < currentStep ? <Check size={14} strokeWidth={3} /> : i}
          </div>
          <span
            className={`text-[0.7rem] uppercase font-bold tracking-wider ${
              i === currentStep ? "text-blue-600" : "text-slate-400"
            }`}
          >
            {labels[i - 1]}
          </span>
        </div>
      ))}
    </div>
  );
};

export default ProgressBar;
