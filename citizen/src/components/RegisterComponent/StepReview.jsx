import React from "react";
import { useRegisterComplaintContext } from "../../context/RegisterComplaintContext";

const StepReview = ({ captures }) => {
  const { formData, setFormData } = useRegisterComplaintContext();
  return (
    <div className="animate-in fade-in slide-in-from-right-8 duration-500">
      <h2 className="text-2xl md:text-3xl font-bold text-slate-800 mb-6">
        Review Submission
      </h2>

      <div className="bg-slate-50 rounded-2xl p-6 border border-slate-100 shadow-sm mb-6">
        <div className="space-y-3">
          <div className="flex justify-between border-b pb-2 border-slate-200">
            <span className="text-slate-500">Category</span>
            <span className="font-bold">{formData.category}</span>
          </div>
          <div className="flex justify-between border-b pb-2 border-slate-200">
            <span className="text-slate-500">Description</span>
            <span className="font-bold">{formData.description}</span>
          </div>
          <div className="flex justify-between border-b pb-2 border-slate-200">
            <span className="text-slate-500">Address</span>
            <span className="font-bold text-right truncate max-w-[200px]">
              {formData.landmark}, {formData.ward}, {formData.address}
              {console.log("Form Data is", formData)}
              {console.log("Images are", captures)}
            </span>
          </div>
          <div className="flex justify-between pt-2">
            <span className="text-slate-500">Photos</span>
            <div className="flex gap-1">
              {captures.map((cap, idx) => (
                <div
                  key={cap.id}
                  className={`flex items-center gap-4 bg-white p-3 rounded-xl border border-slate-200 shadow-sm `}
                >
                  <img
                    src={cap.previewUrl}
                    alt="Evidence"
                    className="w-16 h-16 rounded-lg object-cover bg-slate-100"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StepReview;
