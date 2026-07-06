import React, { useState } from "react";
import {
  FaSearch,
  FaEye,
  FaClock,
  FaCheckCircle,
  FaSpinner,
} from "react-icons/fa";

const Complaint = () => {
  // Replace with API data later
  const [complaints] = useState([
    {
      _id: "CMP1001",
      title: "Garbage Overflow",
      category: "Sanitation",
      wardNo: 12,
      status: "Pending",
      date: "17 Jun 2026",
    },
    {
      _id: "CMP1002",
      title: "Broken Street Light",
      category: "Electricity",
      wardNo: 12,
      status: "In Progress",
      date: "16 Jun 2026",
    },
    {
      _id: "CMP1003",
      title: "Water Leakage",
      category: "Water",
      wardNo: 12,
      status: "Resolved",
      date: "15 Jun 2026",
    },
  ]);

  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");

  const filteredComplaints = complaints.filter((complaint) => {
    const matchSearch =
      complaint.title.toLowerCase().includes(search.toLowerCase()) ||
      complaint._id.toLowerCase().includes(search.toLowerCase());

    const matchStatus =
      statusFilter === "All" || complaint.status === statusFilter;

    return matchSearch && matchStatus;
  });

  const statusBadge = (status) => {
    switch (status) {
      case "Pending":
        return (
          <span className="inline-flex items-center gap-2 rounded-full bg-yellow-100 px-3 py-1 text-sm font-medium text-yellow-700">
            <FaClock />
            Pending
          </span>
        );

      case "In Progress":
        return (
          <span className="inline-flex items-center gap-2 rounded-full bg-blue-100 px-3 py-1 text-sm font-medium text-blue-700">
            <FaSpinner />
            In Progress
          </span>
        );

      case "Resolved":
        return (
          <span className="inline-flex items-center gap-2 rounded-full bg-green-100 px-3 py-1 text-sm font-medium text-green-700">
            <FaCheckCircle />
            Resolved
          </span>
        );

      default:
        return status;
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-3xl font-bold text-slate-800">Complaints</h1>
          <p className="text-gray-500 mt-1">
            View and manage complaints assigned to your ward.
          </p>
        </div>

        <div className="flex gap-3">
          {/* Search */}
          <div className="relative">
            <FaSearch className="absolute left-4 top-4 text-gray-400" />

            <input
              type="text"
              placeholder="Search..."
              className="pl-11 pr-4 py-3 rounded-xl border bg-white w-72 focus:outline-none focus:ring-2 focus:ring-green-500"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>

          {/* Filter */}
          <select
            className="rounded-xl border px-4 bg-white"
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
          >
            <option>All</option>
            <option>Pending</option>
            <option>In Progress</option>
            <option>Resolved</option>
          </select>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-hidden rounded-2xl bg-white shadow border">
        <table className="w-full">
          <thead className="bg-slate-900 text-white">
            <tr>
              <th className="px-6 py-4 text-left">Complaint ID</th>
              <th className="px-6 py-4 text-left">Title</th>
              <th className="px-6 py-4 text-left">Category</th>
              <th className="px-6 py-4 text-center">Ward</th>
              <th className="px-6 py-4 text-center">Status</th>
              <th className="px-6 py-4 text-center">Date</th>
              <th className="px-6 py-4 text-center">Action</th>
            </tr>
          </thead>

          <tbody>
            {filteredComplaints.length ? (
              filteredComplaints.map((complaint) => (
                <tr key={complaint._id} className="border-b hover:bg-gray-50">
                  <td className="px-6 py-4 font-medium">{complaint._id}</td>

                  <td className="px-6 py-4">{complaint.title}</td>

                  <td className="px-6 py-4">{complaint.category}</td>

                  <td className="px-6 py-4 text-center">{complaint.wardNo}</td>

                  <td className="px-6 py-4 text-center">
                    {statusBadge(complaint.status)}
                  </td>

                  <td className="px-6 py-4 text-center">{complaint.date}</td>

                  <td className="px-6 py-4 text-center">
                    <button className="inline-flex items-center gap-2 rounded-lg bg-green-600 px-4 py-2 text-white hover:bg-green-700 transition">
                      <FaEye />
                      View
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="7" className="py-12 text-center text-gray-500">
                  No complaints found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Complaint;
