import React from "react";

const StepDetails = ({ formData, onChange, errors }) => {
  return (
    <div className="duration-500 animate-in fade-in slide-in-from-right-8">
      <h2 className="mb-6 text-2xl font-bold md:text-3xl text-slate-800">
        Issue Specifics
      </h2>
      <div className="flex flex-col gap-6">
        <select
          name="category"
          value={formData.category}
          onChange={onChange}
          className={`w-full h-[60px] bg-slate-50 border rounded-xl px-4 outline-none focus:border-blue-500 ${
            errors.category ? "border-red-400" : "border-slate-200"
          }`}
        >
          <option value="" disabled selected>
            Select Category
          </option>
          <option value="Roads">Potholes</option>
          <option value="Sanitation">Garbage</option>
          <option value="Electricity">Street Light / Electric</option>
          <option value="Drainage">Drainage / Sewage</option>
        </select>

        <input
          name="description"
          value={formData.description}
          onChange={onChange}
          placeholder="Short Description"
          className={`w-full bg-slate-50 border rounded-xl p-4 h-[60px] outline-none focus:border-blue-500 ${
            errors.description ? "border-red-400" : "border-slate-200"
          }`}
        />

        <textarea
          name="notes"
          value={formData.notes}
          onChange={onChange}
          placeholder="Additional Notes"
          className="w-full h-32 p-4 border outline-none resize-none bg-slate-50 border-slate-200 rounded-xl focus:border-blue-500"
        ></textarea>
      </div>
    </div>
  );
};

export default StepDetails;
