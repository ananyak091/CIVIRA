import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  MapPin,
  Clock,
  CheckCircle2,
  Loader2,
  ArrowLeft,
  User,
  Building2,
  Image,
} from "lucide-react";

/* ---------------- MOCK DATA ---------------- */

const COMPLAINTS = [
  {
    id: "1033",
    title: "Garbage Overflow",
    category: "Garbage",
    priority: "High",
    status: "In Progress",
    location: "Ward 12, Street 5",
    date: "12 Jan 2025",
    submittedBy: "Citizen (You)",
    department: "Sanitation Department",
    officer: "Mr. R. Kumar",
    description:
      "Garbage overflowing near the community gate for 2 days. Attracting stray dogs and causing bad odor.",
    images: ["/garbage1.jpeg", "/garbage2.jpeg"],
    // mock
    timeline: [
      { key: "Registered", label: "Complaint Registered", date: "12 Jan 2025" },
      {
        key: "Assigned",
        label: "Assigned to Sanitation Dept.",
        date: "12 Jan 2025",
      },
      {
        key: "In Progress",
        label: "Cleaning Work In Progress",
        date: "13 Jan 2025",
      },
      {
        key: "Resolved",
        label: "Complaint Resolved",
        date: "—",
      },
    ],
  },
];

/* ---------------- STATUS STYLES ---------------- */

const statusStyles = {
  "In Progress": "bg-amber-100 text-amber-700",
  Pending: "bg-red-100 text-red-700",
  Resolved: "bg-emerald-100 text-emerald-700",
  Success: "bg-emerald-600 text-white",
};

/* ---------------- COMPONENT ---------------- */

export default function ComplaintDetails() {
  const { id } = useParams();
  const navigate = useNavigate();

  const complaint = COMPLAINTS.find((c) => c.id === id);
  if (!complaint) return null;

  const currentIndex = complaint.timeline.findIndex(
    (t) => t.key === complaint.status
  );

  return (
    <div className="min-h-screen p-6 bg-slate-50">
      <div className="max-w-5xl mx-auto space-y-8">
        {/* Back */}
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 font-medium text-blue-600"
        >
          <ArrowLeft size={18} />
          Back to My Complaints
        </button>

        {/* Status Banner */}
        <div className="bg-[#eff6ff] border border-blue-200 rounded-xl p-5">
          <p className="text-sm font-medium text-slate-700">
            This complaint is currently{" "}
            <span className="font-bold">{complaint.status}</span> by the{" "}
            <span className="font-bold">{complaint.department}</span>.
          </p>
        </div>

        {/* Main Card */}
        <div className="p-8 space-y-8 bg-white border border-slate-200 rounded-2xl">
          {/* Header */}
          <div className="flex items-start justify-between">
            <div>
              <p className="font-mono text-xs font-bold text-blue-600">
                #CIV-{complaint.id}
              </p>
              <h1 className="mt-1 text-2xl font-bold text-slate-800">
                {complaint.title}
              </h1>
              <p className="mt-1 text-sm text-slate-500">
                Category: {complaint.category}
              </p>
            </div>

            <span
              className={`px-3 py-1 rounded-full text-xs font-bold uppercase ${
                statusStyles[complaint.status]
              }`}
            >
              {complaint.status}
            </span>
          </div>

          {/* Meta Grid */}
          <div className="grid gap-4 md:grid-cols-2 text-slate-600">
            <div className="flex items-center gap-2">
              <MapPin size={18} className="text-blue-500" />
              {complaint.location}
            </div>
            <div className="flex items-center gap-2">
              <Clock size={18} className="text-blue-500" />
              {complaint.date}
            </div>
            <div className="flex items-center gap-2">
              <User size={18} className="text-blue-500" />
              {complaint.submittedBy}
            </div>
            <div className="flex items-center gap-2">
              <Building2 size={18} className="text-blue-500" />
              {complaint.department} (Officer: {complaint.officer})
            </div>
          </div>

          {/* Description */}
          <div className="bg-[#eff6ff] border border-blue-200 rounded-xl p-5">
            <p className="text-[11px] uppercase font-bold text-slate-600 mb-2">
              Description
            </p>
            <p className="leading-relaxed text-slate-700">
              {complaint.description}
            </p>
          </div>

          {/* Evidence */}
          <div>
            <p className="mb-3 text-sm font-bold text-slate-700">
              Evidence Uploaded
            </p>

            <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
              {complaint.images.map((img, i) => (
                <img
                  key={i}
                  src={img}
                  alt={`Evidence ${i + 1}`}
                  className="object-cover w-full h-32 border rounded-xl border-slate-200"
                  onError={(e) => {
                    e.target.style.display = "none";
                    console.error("Image failed to load:", img);
                  }}
                />
              ))}
            </div>
          </div>

          {/* Timeline */}
          <div>
            <p className="mb-4 text-sm font-bold text-slate-700">
              Complaint Timeline
            </p>

            <div className="relative pl-6">
              <div className="absolute left-[10px] top-0 bottom-0 w-px bg-slate-300" />

              {complaint.timeline.map((step, index) => {
                const isCompleted = index < currentIndex;
                const isCurrent = index === currentIndex;

                return (
                  <div key={step.key} className="flex gap-4 mb-6">
                    <div
                      className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                        isCompleted
                          ? "bg-blue-600 border-blue-600"
                          : isCurrent
                          ? "bg-white border-blue-600"
                          : "bg-white border-slate-300"
                      }`}
                    >
                      {isCompleted && (
                        <CheckCircle2 size={12} className="text-white" />
                      )}
                      {isCurrent && (
                        <Loader2
                          size={12}
                          className="text-blue-600 animate-spin"
                        />
                      )}
                    </div>

                    <div className="bg-[#eff6ff] border border-blue-200 rounded-xl px-4 py-3 w-full">
                      <p className="text-sm font-semibold text-slate-800">
                        {step.label}
                      </p>
                      <p className="text-xs text-slate-500">{step.date}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
