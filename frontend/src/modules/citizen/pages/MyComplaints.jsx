import React, { useState, useMemo, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  FileText,
  AlertCircle,
  Trash2,
  Route,
  Lightbulb,
  Droplets,
  MapPin,
  Clock,
  CheckCircle2,
  Star,
  Search,
  Loader2,
} from "lucide-react";
import { useAppContext } from "@/context/AppContext";

const MyComplaints = () => {
  const {
    setComplaintsData,
    complaintsData,
    handleComplaintDetails,
    stats,
    recentComplaints,
    getMyComplaints,
  } = useAppContext();

  const navigate = useNavigate();

  // --- State ---
  const [searchTerm, setSearchTerm] = useState("");
  const [category, setCategory] = useState("All");
  const [status, setStatus] = useState("All");
  const [time, setTime] = useState("All");

  // My Complaint API

  // --- Mock Data (later replace with API) ---
  const complaints = [
    {
      id: "1033",
      title: "Garbage Overflow",
      category: "Garbage",
      status: "In Progress",
      location: "Ward 12, Street 5",
      date: "12 Jan 2025",
      icon: <Trash2 size={18} />,
    },
  ];

  // --- Status Styles ---
  const statusStyles = {
    Registered: "bg-amber-100 text-amber-700",
    Pending: "bg-red-100 text-red-700",
    Resolved: "bg-emerald-100 text-emerald-700",
    Success: "bg-emerald-600 text-white",
  };

  const statistics = [
    {
      label: "Total Complaints",
      value: complaintsData.length,
      icon: <FileText size={18} />,
      color: "bg-blue-600",
    },
    {
      label: "Registered",
      value: stats.registered,
      icon: <Clock size={18} />,
      color: "bg-amber-500",
    },
    {
      label: "Resolved",
      value: stats.resolved,
      icon: <CheckCircle2 size={18} />,
      color: "bg-emerald-500",
    },
    {
      label: "Rejected",
      value: stats.rejected,
      icon: <AlertCircle size={18} />,
      color: "bg-red-500",
    },
  ];

  useEffect(() => {
    getMyComplaints({
      category,
      status,
      time,
      search: searchTerm,
    });
  }, [category, status, time, searchTerm]);

  return (
    <div className="min-h-screen p-6 bg-slate-50 text-slate-900">
      <main className="max-w-6xl py-10 mx-auto">
        {/* Header */}
        <header className="mb-10 text-center">
          <h1 className="text-4xl font-bold md:text-5xl text-slate-800">
            My Complaints
            {console.log("My Filtered Complaints data", complaintsData)}
          </h1>
          <p className="mt-2 text-slate-500">
            View and track the status of your reported issues
          </p>
        </header>

        {/* Compact Stats Cards */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4 mb-8">
          {statistics.map((stat) => (
            <div
              key={stat.label}
              className="p-4 bg-white border border-slate-200 rounded-xl transition-all hover:shadow-md hover:-translate-y-0.5"
            >
              <div className="flex items-center gap-3 mb-3">
                <div className={`p-2.5 rounded-lg text-white ${stat.color}`}>
                  {stat.icon}
                </div>
                <p className="text-xs font-semibold tracking-wide uppercase text-slate-500">
                  {stat.label}
                </p>
              </div>

              <p className="text-3xl font-black leading-none text-slate-800">
                {stat.value}
              </p>
            </div>
          ))}
        </div>

        {/* Filters */}
        <div className="grid grid-cols-1 gap-4 p-5 mb-8 border border-blue-200 md:grid-cols-4 rounded-2xl bg-primary">
          <FilterSelect
            label="Category"
            value={category}
            onChange={setCategory}
            options={["All", "Garbage", "Potholes", "Streetlight", "Drainage"]}
          />
          <FilterSelect
            label="Status"
            value={status}
            onChange={setStatus}
            options={[
              "All",
              "Registered",
              "Pending",
              "Resolved",
              "Rejected",
              "Success",
            ]}
          />
          <FilterSelect
            label="Time"
            value={time}
            onChange={setTime}
            options={[
              { label: "All", value: "All" },
              { label: "Last 30 Days", value: "30" },
              { label: "Last 3 Months", value: "90" },
            ]}
          />

          <div className="space-y-1.5">
            <label className="text-[10px] uppercase font-bold text-slate-600 ml-1">
              Search
            </label>
            <div className="relative">
              <input
                type="text"
                placeholder="ID, Location..."
                className="w-full bg-white border border-slate-300 rounded-xl px-4 py-2.5 text-sm outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500/30"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <Search
                size={18}
                className="absolute right-3 top-2.5 text-slate-400"
              />
            </div>
          </div>
        </div>

        {/* Complaint List */}
        <div className="space-y-4">
          {complaintsData.length > 0 ? (
            complaintsData.map((item) => (
              <div
                key={item._id}
                onClick={() => handleComplaintDetails(item._id)}
                className="grid grid-cols-1 md:grid-cols-3 gap-4 p-6 bg-white border border-slate-200 rounded-xl cursor-pointer hover:shadow-md hover:-translate-y-[1px] transition-all"
              >
                <div>
                  <span className="font-mono text-xs font-semibold text-blue-600">
                    #CIV-{item._id}
                  </span>
                  <div className="flex items-center gap-2 mt-1 text-lg font-semibold">
                    <span className="text-blue-600">{item.icon}</span>
                    {item.category}
                  </div>
                </div>

                <div className="flex items-center gap-2 text-sm text-slate-500">
                  <MapPin size={16} className="text-blue-500" />
                  {item.address}
                </div>

                <div className="flex items-center justify-between gap-3 md:justify-end">
                  <span className="text-xs text-slate-500">
                    {item.createdAt}
                  </span>
                  <span
                    className={`px-3 py-1 rounded-full text-[11px] font-bold uppercase flex items-center gap-1.5 ${
                      statusStyles[item.complaint_status]
                    }`}
                  >
                    {item.complaint_status === "Registered" && (
                      <Loader2 size={12} className="animate-spin" />
                    )}
                    {item.complaint_status === "Pending" && <Clock size={12} />}
                    {item.complaint_status === "Resolved" && (
                      <CheckCircle2 size={12} />
                    )}
                    {item.complaint_status === "Success" && <Star size={12} />}
                    {item.complaint_status}
                  </span>
                </div>
              </div>
            ))
          ) : (
            <div className="py-20 text-center bg-white border border-dashed rounded-2xl border-slate-300">
              <Search size={40} className="mx-auto mb-4 text-slate-400" />
              <p className="text-slate-500">
                No complaints found matching your criteria.
              </p>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

/* ---------------- Reusable Components ---------------- */

const FilterSelect = ({ label, value, onChange, options }) => (
  <div className="space-y-1.5">
    <label className="text-[10px] uppercase font-bold text-slate-600 ml-1">
      {label}
    </label>

    <select
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="w-full bg-white border border-slate-300 rounded-xl px-4 py-2.5 text-sm outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500/30"
    >
      {options.map((opt) => {
        const optionValue = typeof opt === "string" ? opt : opt.value;
        const optionLabel = typeof opt === "string" ? opt : opt.label;

        return (
          <option key={optionValue} value={optionValue}>
            {optionLabel}
          </option>
        );
      })}
    </select>
  </div>
);

export default MyComplaints;
