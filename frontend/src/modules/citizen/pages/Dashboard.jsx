import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

import {
  FileText,
  CheckCircle2,
  Clock,
  AlertCircle,
  ChevronDown,
  BarChart3,
  PieChart as PieIcon,
  LineChart as LineIcon,
  Layers,
  Award,
} from "lucide-react";

import { Pie, Doughnut, Bar, Line } from "react-chartjs-2";

import {
  Chart as ChartJS,
  ArcElement,
  CategoryScale,
  LinearScale,
  BarElement,
  PointElement,
  LineElement,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  ArcElement,
  CategoryScale,
  LinearScale,
  BarElement,
  PointElement,
  LineElement,
  Tooltip,
  Legend,
);
import { useAppContext } from "../../../context/AppContext";

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

  const {
    summary,
    filters,
    setFilters,
    fetchDashboard,
    dashboardFilters,
    setDashboardFilters,
    fetchDashboardFilters,
    categoryData,
    setCategoryData,
    fetchCategoryBreakdown,
    urgencyData,
    setUrgencyData,
    fetchUrgencyDistribution,
    monthlyData,
    setMonthlyData,
    fetchMonthlyComplaints,
    resolutionTrend,
    setResolutionTrend,
    fetchResolutionTrend,
    topWards,
    setTopWards,
    fetchTopWards,
  } = useAppContext();

  useEffect(() => {
    fetchDashboard();
  }, []);

  useEffect(() => {
    fetchDashboardFilters();
  }, []);

  useEffect(() => {
    fetchCategoryBreakdown();
  }, []);
  useEffect(() => {
    fetchResolutionTrend();
  }, []);
  useEffect(() => {
    fetchTopWards();
  }, []);

  // Main KPI Statistics
  const statistics = [
    {
      label: "Total Complaints",
      value: summary.totalComplaints,
      icon: <FileText size={20} />,
      color: "bg-blue-600 ring-blue-100",
    },
    {
      label: "Resolved",
      value: summary.resolved,
      icon: <CheckCircle2 size={20} />,
      color: "bg-emerald-600 ring-emerald-100",
    },
    {
      label: "In Progress",
      value: summary.inProgress,
      icon: <Clock size={20} />,
      color: "bg-amber-600 ring-amber-100",
    },
    {
      label: "Pending",
      value: summary.pending,
      icon: <AlertCircle size={20} />,
      color: "bg-rose-600 ring-rose-100",
    },
  ];

  const pieData = {
    labels: categoryData.map((item) => item._id),

    datasets: [
      {
        data: categoryData.map((item) => item.count),

        backgroundColor: [
          "#2563eb",
          "#10b981",
          "#f59e0b",
          "#ef4444",
          "#8b5cf6",
          "#06b6d4",
          "#ec4899",
          "#14b8a6",
        ],

        borderWidth: 1,
      },
    ],
  };

  const pieOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: "bottom",
      },
    },
  };

  const doughnutData = {
    labels: urgencyData.map((item) => item._id),

    datasets: [
      {
        data: urgencyData.map((item) => item.count),

        backgroundColor: ["#ef4444", "#f59e0b", "#22c55e"],

        borderWidth: 1,
      },
    ],
  };

  const doughnutOptions = {
    responsive: true,
    maintainAspectRatio: false,

    plugins: {
      legend: {
        position: "bottom",
      },
    },
  };

  const barData = {
    labels: monthlyData.map((item) => item.month),

    datasets: [
      {
        label: "Complaints",
        data: monthlyData.map((item) => item.complaints),
        backgroundColor: "#2563eb",
      },
    ],
  };

  const lineData = {
    labels: resolutionTrend.map((item) => item.month),

    datasets: [
      {
        label: "Resolved Complaints",
        data: resolutionTrend.map((item) => item.resolved),

        borderColor: "#10b981",

        backgroundColor: "#10b981",

        tension: 0.4,

        fill: false,
      },
    ],
  };
  const lineOptions = {
    responsive: true,
    maintainAspectRatio: false,

    plugins: {
      legend: {
        position: "bottom",
      },
    },
  };

  const resolutionRate = summary.resolutionRate;

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
                value={filters.state}
                onChange={(e) =>
                  setFilters({
                    ...filters,
                    state: e.target.value,
                  })
                }
              >
                <option value="All">All States</option>
                {dashboardFilters.states.map((state) => (
                  <option key={state} value={state}>
                    {state}
                  </option>
                ))}
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
                value={filters.city}
                onChange={(e) =>
                  setFilters({
                    ...filters,
                    city: e.target.value,
                  })
                }
              >
                <option value="All">All Cities</option>
                {dashboardFilters.cities.map((city) => (
                  <option key={city} value={city}>
                    {city}
                  </option>
                ))}
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
                value={filters.ward}
                onChange={(e) =>
                  setFilters({
                    ...filters,
                    ward: e.target.value,
                  })
                }
              >
                <option value="All">All Wards</option>
                {dashboardFilters.wards.map((ward) => (
                  <option key={ward} value={ward}>
                    {ward}
                  </option>
                ))}
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
                value={filters.time}
                onChange={(e) =>
                  setFilters({
                    ...filters,
                    time: e.target.value,
                  })
                }
              >
                <option value="All">All Time</option>
                <option value="7">Last 7 Days</option>
                <option value="30">Last 30 Days</option>
                <option value="90">Last 90 Days</option>
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
            <div className="flex justify-center items-center flex-1 p-4">
              {categoryData.length > 0 ? (
                <div className="w-60 h-60">
                  <Pie data={pieData} options={pieOptions} />
                </div>
              ) : (
                <p>No Data Available</p>
              )}
            </div>
          </div>

          {/* Doughnut Chart Panel */}
          <div className="p-6 bg-white border border-slate-200 rounded-2xl shadow-sm flex flex-col justify-between min-h-[220px]">
            <div className="flex items-center gap-2 border-b border-slate-100 pb-3">
              <Layers size={18} className="text-slate-500" />
              <h3 className="font-bold text-slate-700">Urgency Distribution</h3>
            </div>
            <div className="flex justify-center items-center flex-1 p-4">
              {urgencyData.length > 0 ? (
                <div className="w-60 h-60">
                  <Doughnut data={doughnutData} options={doughnutOptions} />
                </div>
              ) : (
                <p className="text-gray-500">No Data Available</p>
              )}
            </div>
          </div>

          {/* Bar Chart Panel */}
          <div className="p-6 bg-white border border-slate-200 rounded-2xl shadow-sm">
            <div className="flex items-center gap-2 border-b border-slate-100 pb-3">
              <BarChart3 size={18} className="text-slate-500" />
              <h3 className="font-bold text-slate-700">
                Monthly Complaint Volume
              </h3>
            </div>

            <div className="h-72 p-4">
              {monthlyData.length > 0 ? (
                <Bar
                  data={barData}
                  options={{
                    responsive: true,
                    maintainAspectRatio: false,
                  }}
                />
              ) : (
                <p className="text-center mt-20 text-gray-500">
                  No Data Available
                </p>
              )}
            </div>
          </div>

          {/* Line Chart Panel */}
          <div className="p-6 bg-white border border-slate-200 rounded-2xl shadow-sm">
            <div className="flex items-center gap-2 border-b border-slate-100 pb-3">
              <LineIcon size={18} className="text-slate-500" />
              <h3 className="font-bold text-slate-700">
                Resolution Speed Velocity
              </h3>
            </div>

            <div className="h-72 p-4">
              {resolutionTrend.length > 0 ? (
                <Line data={lineData} options={lineOptions} />
              ) : (
                <p className="text-center mt-20 text-gray-500">
                  No Data Available
                </p>
              )}
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
                {(topWards || []).map((item) => (
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
                        {item.rate}%
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
