import React from "react";
import {
  FaUserShield,
  FaIdBadge,
  FaMapMarkerAlt,
  FaCity,
  FaGlobeAsia,
} from "react-icons/fa";
import { useOfficerContext } from "@/context/OfficerContext";

const OfficerProfile = () => {
  const { officer } = useOfficerContext();

  return (
    <div className="max-w-4xl mx-auto">
      {/* Header */}
      <div className="bg-white rounded-2xl shadow-sm border p-8">
        <div className="flex flex-col md:flex-row items-center gap-8">
          {/* Avatar */}
          <div className="w-28 h-28 rounded-full bg-gradient-to-r from-primary-dark to-primary flex items-center justify-center text-white text-4xl font-bold shadow-xl">
            {officer?.officerId?.charAt(0) || <FaUserShield />}
          </div>

          {/* Basic Info */}
          <div className="flex-1">
            <h1 className="text-3xl font-bold text-slate-800">
              {officer?.officerId}
            </h1>

            <p className="text-gray-500 mt-2">
              Municipal Officer assigned to Ward {officer?.wardNo}
            </p>
          </div>
        </div>
      </div>

      {/* Details */}
      <div className="grid md:grid-cols-2 gap-6 mt-8">
        <div className="bg-white rounded-2xl border shadow-sm p-6">
          <div className="flex items-center gap-3 mb-2">
            <FaIdBadge className="text-primary text-xl" />
            <h2 className="font-semibold text-lg">Officer ID</h2>
          </div>

          <p className="text-gray-700 text-lg">{officer?.officerId}</p>
        </div>

        <div className="bg-white rounded-2xl border shadow-sm p-6">
          <div className="flex items-center gap-3 mb-2">
            <FaMapMarkerAlt className="text-primary text-xl" />
            <h2 className="font-semibold text-lg">Assigned Ward</h2>
          </div>

          <p className="text-gray-700 text-lg">Ward {officer?.wardNo}</p>
        </div>

        <div className="bg-white rounded-2xl border shadow-sm p-6">
          <div className="flex items-center gap-3 mb-2">
            <FaCity className="text-primary text-xl" />
            <h2 className="font-semibold text-lg">City</h2>
          </div>

          <p className="text-gray-700 text-lg">{officer?.city}</p>
        </div>

        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm hover:shadow-lg transition-all duration-300 p-6">
          <div className="flex items-center gap-3 mb-2">
            <FaGlobeAsia className="text-primary text-xl" />
            <h2 className="font-semibold text-lg">State</h2>
          </div>

          <p className="text-gray-700 text-lg">{officer?.state}</p>
        </div>
      </div>

      {/* Assignment Summary */}
      <div className="mt-8 rounded-2xl border border-primary/20 bg-primary/5 p-6">
        <h2 className="text-xl font-semibold text-primary-dark mb-3">
          Assignment
        </h2>

        <p className="text-gray-700 leading-7">
          You are currently assigned to <strong>Ward {officer?.wardNo}</strong>{" "}
          in <strong>{officer?.city}</strong>, <strong>{officer?.state}</strong>
          . All complaints from this ward will appear in your dashboard for
          review and resolution.
        </p>
      </div>
    </div>
  );
};

export default OfficerProfile;
