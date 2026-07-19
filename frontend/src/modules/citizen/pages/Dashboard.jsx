import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  FileText,
  CheckCircle2,
  Clock,
  AlertCircle,
  MapPin,
  Calendar,
  ChevronDown,
  BarChart3,
  PieChart as PieIcon,
  LineChart as LineIcon,
  Layers,
  Award,
} from "lucide-react";

// Mock Data for the filters and rankings
const initialWards = [
  {
    rank: 1,
    state: "Maharashtra",
    city: "Mumbai",
    ward: "Ward A",
    total: 450,
    resolved: 380,
    rate: "84.4%",
  },
  {
    rank: 2,
    state: "Karnataka",
    city: "Bengaluru",
    ward: "Ward 4",
    total: 320,
    resolved: 250,
    rate: "78.1%",
  },
  {
    rank: 3,
    state: "Delhi",
    city: "New Delhi",
    ward: "Zone 2",
    total: 275,
    resolved: 200,
    rate: "72.7%",
  },
  {
    rank: 4,
    state: "Tamil Nadu",
    city: "Chennai",
    ward: "Ward 12",
    total: 200,
    resolved: 100,
    rate: "50.0%",
  },
];

export default function Dashboard() {
  const navigate = useNavigate();
  const [selectedState, setSelectedState] = useState("All States");
  const [selectedCity, setSelectedCity] = useState("All Cities");
  const [selectedWard, setSelectedWard] = useState("All Wards");
  const [selectedDate, setSelectedDate] = useState("Last 30 Days");

  // Main KPI Statistics
  const statistics = [
    {
      label: "Total Complaints",
      value: 1245,
      icon: <FileText size={20} />,
      color: "bg-blue-600 ring-blue-100",
      textColor: "text-blue-600",
    },
    {
      label: "Resolved",
      value: 930,
      icon: <CheckCircle2 size={20} />,
      color: "bg-emerald-600 ring-emerald-100",
      textColor: "text-emerald-600",
    },
    {
      label: "In Progress",
      value: 105,
      icon: <Clock size={20} />,
      color: "bg-amber-600 ring-amber-100",
      textColor: "text-amber-600",
    },
    {
      label: "Pending",
      value: 210,
      icon: <AlertCircle size={20} />,
      color: "bg-rose-600 ring-rose-100",
      textColor: "text-rose-600",
    },
  ];

  const resolutionRate = 74;

  return (
    <div className="min-h-screen p-4 bg-slate-50 md:p-8">
      <div className="max-w-6xl mx-auto space-y-8">
        {/* Header Block */}
        <header className="flex flex-col justify-between gap-4 pb-4 border-b sm:flex-row sm:items-center border-slate-200">
          <div>
            <h1 className="text-3xl font-black tracking-tight uppercase md:text-4xl text-slate-900">
              Civira Public Dashboard
            </h1>
            <p className="mt-1 text-sm font-semibold tracking-wide uppercase text-slate-500">
              Real-time Civic Complaint Analytics
            </p>
          </div>

          {/* Quick Stats Summary Badge */}
          <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-white border rounded-full shadow-sm border-slate-200 text-xs font-bold text-slate-700 w-fit">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            Live Data Feed
          </div>
        </header>

        {/* Filter Toolbar Dynamic Dropdowns */}
        <section className="grid grid-cols-2 gap-3 sm:grid-cols-4 bg-white p-3 border border-slate-200 rounded-xl shadow-sm">
          <div>
            <label className="block text-[10px] font-bold text-slate-400 uppercase mb-1 px-1">
              State
            </label>
            <div className="relative">
              <select
                className="w-full pl-3 pr-8 py-2 text-sm font-semibold bg-slate-50 border border-slate-200 rounded-lg appearance-none cursor-pointer focus:outline-none focus:ring-2 focus:ring-blue-500/20 text-slate-700"
                value={selectedState}
                onChange={(e) => setSelectedState(e.target.value)}
              >
                <option>All States</option>
                <option>Maharashtra</option>
                <option>Karnataka</option>
                <option>Delhi</option>
              </select>
              <ChevronDown
                size={14}
                className="absolute pointer-events-none right-2.5 top-3 text-slate-500"
              />
            </div>
          </div>

          <div>
            <label className="block text-[10px] font-bold text-slate-400 uppercase mb-1 px-1">
              City
            </label>
            <div className="relative">
              <select
                className="w-full pl-3 pr-8 py-2 text-sm font-semibold bg-slate-50 border border-slate-200 rounded-lg appearance-none cursor-pointer focus:outline-none focus:ring-2 focus:ring-blue-500/20 text-slate-700"
                value={selectedCity}
                onChange={(e) => setSelectedCity(e.target.value)}
              >
                <option>All Cities</option>
                <option>Mumbai</option>
                <option>Bengaluru</option>
                <option>New Delhi</option>
              </select>
              <ChevronDown
                size={14}
                className="absolute pointer-events-none right-2.5 top-3 text-slate-500"
              />
            </div>
          </div>

          <div>
            <label className="block text-[10px] font-bold text-slate-400 uppercase mb-1 px-1">
              Ward
            </label>
            <div className="relative">
              <select
                className="w-full pl-3 pr-8 py-2 text-sm font-semibold bg-slate-50 border border-slate-200 rounded-lg appearance-none cursor-pointer focus:outline-none focus:ring-2 focus:ring-blue-500/20 text-slate-700"
                value={selectedWard}
                onChange={(e) => setSelectedWard(e.target.value)}
              >
                <option>All Wards</option>
                <option>Ward A</option>
                <option>Ward 4</option>
                <option>Zone 2</option>
              </select>
              <ChevronDown
                size={14}
                className="absolute pointer-events-none right-2.5 top-3 text-slate-500"
              />
            </div>
          </div>

          <div>
            <label className="block text-[10px] font-bold text-slate-400 uppercase mb-1 px-1">
              Date Range
            </label>
            <div className="relative">
              <select
                className="w-full pl-3 pr-8 py-2 text-sm font-semibold bg-slate-50 border border-slate-200 rounded-lg appearance-none cursor-pointer focus:outline-none focus:ring-2 focus:ring-blue-500/20 text-slate-700"
                value={selectedDate}
                onChange={(e) => setSelectedDate(e.target.value)}
              >
                <option>Today</option>
                <option>Last 7 Days</option>
                <option>Last 30 Days</option>
                <option>Custom Range</option>
              </select>
              <ChevronDown
                size={14}
                className="absolute pointer-events-none right-2.5 top-3 text-slate-500"
              />
            </div>
          </div>
        </section>

        {/* Analytics Key Performance Indicators (KPIs) */}
        <section className="grid grid-cols-2 gap-4 lg:grid-cols-4">
          {statistics.map((stat) => (
            <div
              key={stat.label}
              className="p-5 bg-white border border-slate-200 rounded-2xl shadow-sm transition-all hover:shadow-md"
            >
              <div className="flex items-center justify-between mb-4">
                <span className="text-xs font-bold tracking-wider uppercase text-slate-400">
                  {stat.label}
                </span>
                <div
                  className={`p-2 rounded-xl text-white shadow-inner ${stat.color} ring-4`}
                >
                  {stat.icon}
                </div>
              </div>
              <p className="text-3xl font-black tracking-tight text-slate-800">
                {stat.value.toLocaleString()}
              </p>
            </div>
          ))}
        </section>

        {/* Progress Bar Component */}
        <section className="p-6 bg-white border border-slate-200 rounded-2xl shadow-sm space-y-3">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-bold tracking-wide uppercase text-slate-500">
              Resolution Progress Rate
            </h3>
            <span className="text-2xl font-black text-emerald-600">
              {resolutionRate}%
            </span>
          </div>
          <div className="w-full h-4 bg-slate-100 rounded-full overflow-hidden p-0.5 border border-slate-200/60">
            <div
              className="h-full bg-gradient-to-r from-emerald-400 to-emerald-600 rounded-full transition-all duration-500 shadow-sm"
              style={{ width: `${resolutionRate}%` }}
            />
          </div>
        </section>

        {/* Visual Analytics Canvas Placeholders */}
        <section className="grid grid-cols-1 gap-6 md:grid-cols-2">
          {/* Pie Chart Panel */}
          <div className="p-6 bg-white border border-slate-200 rounded-2xl shadow-sm flex flex-col justify-between min-h-[220px]">
            <div className="flex items-center gap-2 border-b border-slate-100 pb-3">
              <PieIcon size={18} className="text-slate-500" />
              <h3 className="font-bold text-slate-700">Category breakdown</h3>
            </div>
            <div className="flex flex-col items-center justify-center flex-1 py-4 border-2 border-dashed border-slate-100 rounded-xl bg-slate-50/50 my-3">
              <div className="w-20 h-20 rounded-full border-8 border-blue-500 border-t-emerald-500 border-r-amber-500 animate-spin-slow mb-2 opacity-60" />
              <p className="text-xs font-semibold text-slate-400">
                Pie Chart View Ready
              </p>
            </div>
          </div>

          {/* Doughnut Chart Panel */}
          <div className="p-6 bg-white border border-slate-200 rounded-2xl shadow-sm flex flex-col justify-between min-h-[220px]">
            <div className="flex items-center gap-2 border-b border-slate-100 pb-3">
              <Layers size={18} className="text-slate-500" />
              <h3 className="font-bold text-slate-700">Urgency Distribution</h3>
            </div>
            <div className="flex flex-col items-center justify-center flex-1 py-4 border-2 border-dashed border-slate-100 rounded-xl bg-slate-50/50 my-3">
              <div className="w-20 h-20 rounded-full border-[14px] border-slate-200 border-t-rose-500 mb-2 opacity-70" />
              <p className="text-xs font-semibold text-slate-400">
                Doughnut Chart View Ready
              </p>
            </div>
          </div>

          {/* Bar Chart Panel */}
          <div className="p-6 bg-white border border-slate-200 rounded-2xl shadow-sm flex flex-col justify-between min-h-[220px]">
            <div className="flex items-center gap-2 border-b border-slate-100 pb-3">
              <BarChart3 size={18} className="text-slate-500" />
              <h3 className="font-bold text-slate-700">
                Monthly Complaint Volume
              </h3>
            </div>
            <div className="flex items-end justify-center gap-2 flex-1 py-4 border-2 border-dashed border-slate-100 rounded-xl bg-slate-50/50 my-3 h-24">
              <div className="w-4 bg-blue-400 h-12 rounded-t" />
              <div className="w-4 bg-blue-500 h-16 rounded-t" />
              <div className="w-4 bg-blue-600 h-24 rounded-t" />
              <div className="w-4 bg-slate-300 h-8 rounded-t" />
            </div>
            <p className="text-center text-xs font-semibold text-slate-400">
              Bar Chart View Ready
            </p>
          </div>

          {/* Line Chart Panel */}
          <div className="p-6 bg-white border border-slate-200 rounded-2xl shadow-sm flex flex-col justify-between min-h-[220px]">
            <div className="flex items-center gap-2 border-b border-slate-100 pb-3">
              <LineIcon size={18} className="text-slate-500" />
              <h3 className="font-bold text-slate-700">
                Resolution Speed Velocity
              </h3>
            </div>
            <div className="flex flex-col items-center justify-center flex-1 py-4 border-2 border-dashed border-slate-100 rounded-xl bg-slate-50/50 my-3">
              <svg
                className="w-28 h-12 text-emerald-500 opacity-60"
                viewBox="0 0 100 30"
                fill="none"
                stroke="currentColor"
                strokeWidth="3"
              >
                <path
                  d="M0,25 Q15,5 30,15 T60,5 T90,20"
                  strokeLinecap="round"
                />
              </svg>
              <p className="text-xs font-semibold text-slate-400 mt-2">
                Line Chart View Ready
              </p>
            </div>
          </div>
        </section>

        {/* Data Table Matrix: Top Performing Wards */}
        <section className="bg-white border border-slate-200 rounded-2xl shadow-sm overflow-hidden">
          <div className="flex items-center gap-2 px-6 py-4 border-b border-slate-100 bg-slate-50/50">
            <Award size={18} className="text-amber-500" />
            <h2 className="text-lg font-bold text-slate-800">
              Top Performing Wards
            </h2>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-slate-200 bg-slate-100/70 text-[11px] font-bold uppercase tracking-wider text-slate-500">
                  <th className="px-6 py-3 text-center w-16">Rank</th>
                  <th className="px-6 py-3">State</th>
                  <th className="px-6 py-3">City</th>
                  <th className="px-6 py-3">Ward</th>
                  <th className="px-6 py-3 text-right">Total</th>
                  <th className="px-6 py-3 text-right">Resolved</th>
                  <th className="px-6 py-3 text-right pr-8">Success Rate</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-sm font-medium text-slate-700">
                {initialWards.map((item) => (
                  <tr
                    key={item.rank}
                    className="transition hover:bg-slate-50/80"
                  >
                    <td className="px-6 py-3.5 text-center">
                      <span
                        className={`inline-flex items-center justify-center w-6 h-6 rounded-md text-xs font-black shadow-sm
                        ${item.rank === 1 ? "bg-amber-100 text-amber-800 border border-amber-200" : ""}
                        ${item.rank === 2 ? "bg-slate-200 text-slate-800" : ""}
                        ${item.rank === 3 ? "bg-orange-100 text-orange-800" : ""}
                        ${item.rank > 3 ? "bg-slate-100 text-slate-600" : ""}
                      `}
                      >
                        {item.rank}
                      </span>
                    </td>
                    <td className="px-6 py-3.5 text-slate-500">{item.state}</td>
                    <td className="px-6 py-3.5 font-bold text-slate-800">
                      {item.city}
                    </td>
                    <td className="px-6 py-3.5">{item.ward}</td>
                    <td className="px-6 py-3.5 text-right font-semibold text-slate-500">
                      {item.total}
                    </td>
                    <td className="px-6 py-3.5 text-right font-semibold text-emerald-600">
                      {item.resolved}
                    </td>
                    <td className="px-6 py-3.5 text-right font-black text-slate-800 pr-8">
                      <div className="inline-flex items-center gap-1.5">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                        {item.rate}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      </div>
    </div>
  );
}
