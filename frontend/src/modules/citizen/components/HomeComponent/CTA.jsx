import React from "react";
import { useNavigate } from "react-router-dom";

export const CTA = () => {
  const navigate = useNavigate();
  return (
    <div className="max-w-6xl mx-auto px-4 py-4 text-center text-white bg-blue-800">
      <h2 className="text-2xl md:text-3xl font-semibold mb-6">
        See a civic issue arround you?
        <br className="hidden sm:block" />
        Report it now and be the change!
      </h2>

      {/* CTA Button */}
      <button
        onClick={() => navigate("/register-complaints")}
        className="bg-white text-blue-700 font-semibold px-8 py-3 rounded-md hover:bg-blue-100 transition"
      >
        Register New Complaint
      </button>
    </div>
  );
};
