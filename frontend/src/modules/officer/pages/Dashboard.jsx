import React from "react";
import {
  FaClipboardList,
  FaCheckCircle,
  FaClock,
  FaExclamationTriangle,
  FaArrowUp,
} from "react-icons/fa";
import { useOfficerContext } from "@/context/OfficerContext";

const Dashboard = () => {
  const { officer } = useOfficerContext();

  // Replace these with API data later
  const stats = [
    {
      title: "Total Complaints",
      value: 42,
      icon: <FaClipboardList />,
      color: "bg-primary",
    },
    {
      title: "Pending",
      value: 18,
      icon: <FaClock />,
      color: "bg-warning",
    },
    {
      title: "Resolved",
      value: 21,
      icon: <FaCheckCircle />,
      color: "bg-success",
    },
    {
      title: "High Priority",
      value: 3,
      icon: <FaExclamationTriangle />,
      color: "bg-danger",
    },
  ];

  const recentComplaints = [
    {
      id: "CMP1021",
      category: "Garbage",
      status: "Pending",
      date: "16 Jun",
    },
    {
      id: "CMP1019",
      category: "Road Damage",
      status: "In Progress",
      date: "15 Jun",
    },
    {
      id: "CMP1015",
      category: "Street Light",
      status: "Resolved",
      date: "15 Jun",
    },
    {
      id: "CMP1012",
      category: "Water Leakage",
      status: "Pending",
      date: "14 Jun",
    },
  ];

  return (
    <div className="space-y-8">
      {/* Welcome */}
      <div className="rounded-3xl bg-gradient-to-r from-primary-dark to-primary text-white p-8 shadow-xl">
        <h1 className="text-3xl font-bold">Welcome, {officer?.officerId}</h1>

        <p className="mt-3 text-blue-100">
          You are responsible for{" "}
          <span className="font-semibold">Ward {officer?.wardNo}</span> in{" "}
          {officer?.city}, {officer?.state}.
        </p>
      </div>

      {/* Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
        {stats.map((item) => (
          <div
            key={item.title}
            className="bg-white rounded-2xl border border-slate-200 shadow-sm hover:shadow-lg transition-all duration-300 p-6 flex justify-between items-center"
          >
            <div>
              <p className="text-gray-500">{item.title}</p>

              <h2 className="text-3xl font-bold mt-2">{item.value}</h2>

              <div className="flex items-center gap-1 text-primary text-sm mt-3">
                <FaArrowUp />
                <span>Updated Today</span>
              </div>
            </div>

            <div
              className={`${item.color} w-16 h-16 rounded-2xl flex items-center justify-center text-white text-2xl shadow-lg`}
            >
              {item.icon}
            </div>
          </div>
        ))}
      </div>

      {/* Bottom Section */}
      <div className="grid lg:grid-cols-3 gap-6">
        {/* Recent Complaints */}
        <div className="lg:col-span-2 bg-white rounded-2xl shadow-sm border">
          <div className="flex items-center justify-between p-6 border-b">
            <h2 className="text-xl font-semibold">Recent Complaints</h2>

            <button className="text-primary font-medium hover:text-primary-dark transition">
              View All
            </button>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-slate-50">
                <tr className="text-left">
                  <th className="p-4">Complaint ID</th>
                  <th className="p-4">Category</th>
                  <th className="p-4">Status</th>
                  <th className="p-4">Date</th>
                </tr>
              </thead>

              <tbody>
                {recentComplaints.map((item) => (
                  <tr
                    key={item.id}
                    className="border-t hover:bg-primary/5 transition"
                  >
                    <td className="p-4 font-medium">{item.id}</td>

                    <td className="p-4">{item.category}</td>

                    <td className="p-4">
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-semibold ${
                          item.status === "Resolved"
                            ? "bg-green-100 text-green-700"
                            : item.status === "Pending"
                              ? "bg-yellow-100 text-yellow-700"
                              : "bg-blue-100 text-blue-700"
                        }`}
                      >
                        {item.status}
                      </span>
                    </td>

                    <td className="p-4">{item.date}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Ward Information */}
        <div className="bg-white rounded-2xl shadow-sm border p-6">
          <h2 className="text-xl font-semibold mb-6">Assigned Area</h2>

          <div className="space-y-5">
            <div>
              <p className="text-gray-500 text-sm">Officer ID</p>
              <h3 className="font-semibold text-lg">{officer?.officerId}</h3>
            </div>

            <div>
              <p className="text-gray-500 text-sm">State</p>
              <h3 className="font-semibold">{officer?.state}</h3>
            </div>

            <div>
              <p className="text-gray-500 text-sm">City</p>
              <h3 className="font-semibold">{officer?.city}</h3>
            </div>

            <div>
              <p className="text-gray-500 text-sm">Ward</p>
              <h3 className="font-semibold text-2xl text-primary">
                {officer?.wardNo}
              </h3>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
