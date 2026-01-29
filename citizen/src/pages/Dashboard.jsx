import React from "react";
import { useNavigate } from "react-router-dom";
import {
  FileText,
  Clock,
  CheckCircle2,
  AlertCircle,
  ArrowRight,
} from "lucide-react";

const stats = [
  {
    label: "Total Complaints",
    value: 24,
    icon: <FileText size={18} />,
    color: "bg-blue-600",
  },
  {
    label: "In Progress",
    value: 6,
    icon: <Clock size={18} />,
    color: "bg-amber-500",
  },
  {
    label: "Resolved",
    value: 14,
    icon: <CheckCircle2 size={18} />,
    color: "bg-emerald-500",
  },
  {
    label: "Pending",
    value: 4,
    icon: <AlertCircle size={18} />,
    color: "bg-red-500",
  },
];

const recentComplaints = [
  {
    id: "1033",
    title: "Garbage Overflow",
    status: "In Progress",
    date: "12 Jan 2025",
  },
  {
    id: "1031",
    title: "Pothole",
    status: "Pending",
    date: "10 Jan 2025",
  },
  {
    id: "1029",
    title: "Streetlight Failure",
    status: "Resolved",
    date: "08 Jan 2025",
  },
];

const statusStyles = {
  "In Progress": "bg-amber-100 text-amber-700 ring-1 ring-amber-200",
  Pending: "bg-red-100 text-red-700 ring-1 ring-red-200",
  Resolved: "bg-emerald-100 text-emerald-700 ring-1 ring-emerald-200",
};

export default function Dashboard() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen p-4 bg-slate-50 md:p-8">
      <div className="max-w-6xl mx-auto space-y-8">
        {/* Header */}
        <header>
          <h1 className="text-3xl font-extrabold tracking-tight md:text-4xl text-slate-900">
            Dashboard
          </h1>
          <p className="mt-2 text-sm font-medium text-slate-500">
            Track the status and progress of your submitted complaints.
          </p>
        </header>

        {/* Compact Stats Cards */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {stats.map((stat) => (
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

        {/* Recent Complaints */}
        <div className="relative">
          {/* Subtle glow */}
          <div className="absolute -inset-1 bg-gradient-to-r from-blue-100 to-slate-100 rounded-2xl blur opacity-30" />

          <div className="relative overflow-hidden bg-white border border-slate-200 rounded-2xl">
            <div className="flex items-center justify-between px-5 py-4 border-b border-slate-100">
              <h2 className="text-lg font-bold text-slate-800">
                Recent Complaints
              </h2>
              <button
                onClick={() => navigate("/my-complaints")}
                className="flex items-center gap-1 text-sm font-semibold text-blue-600 transition hover:text-blue-800"
              >
                View all
                <ArrowRight size={14} />
              </button>
            </div>

            <div className="divide-y divide-slate-100">
              {recentComplaints.map((c) => (
                <div
                  key={c.id}
                  onClick={() => navigate(`/complaints/${c.id}`)}
                  className="flex items-center justify-between px-5 py-4 transition cursor-pointer hover:bg-blue-50/40"
                >
                  <div>
                    <p className="font-semibold text-slate-800">{c.title}</p>
                    <p className="mt-1 text-xs text-slate-400">
                      #{c.id} • {c.date}
                    </p>
                  </div>

                  <span
                    className={`text-[10px] px-3 py-1 rounded-lg font-bold uppercase tracking-wide ${statusStyles[c.status]}`}
                  >
                    {c.status}
                  </span>
                </div>
              ))}
            </div>

            <div className="px-5 py-3 text-center bg-slate-50/60">
              <p className="text-xs font-medium text-slate-400">
                Showing {recentComplaints.length} of {stats[0].value} complaints
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
