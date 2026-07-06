import React from "react";
import {
  FaUsers,
  FaUserPlus,
  FaClipboardList,
  FaChartLine,
} from "react-icons/fa";
import { Link } from "react-router-dom";

const Dashboard = () => {
  const stats = [
    {
      title: "Total Officers",
      value: 12,
      icon: <FaUsers size={28} />,
      color: "bg-blue-500",
    },
    {
      title: "Total Complaints",
      value: 248,
      icon: <FaClipboardList size={28} />,
      color: "bg-green-500",
    },
    {
      title: "Pending Complaints",
      value: 37,
      icon: <FaChartLine size={28} />,
      color: "bg-yellow-500",
    },
    {
      title: "Resolved Complaints",
      value: 211,
      icon: <FaClipboardList size={28} />,
      color: "bg-purple-500",
    },
  ];

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800">Admin Dashboard</h1>

        <p className="text-gray-500 mt-2">
          Welcome to the CIVIRA Administration Panel
        </p>
      </div>

      {/* Statistics */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6 mb-10">
        {stats.map((item, index) => (
          <div
            key={index}
            className="bg-white rounded-xl shadow-md p-6 flex items-center justify-between"
          >
            <div>
              <p className="text-gray-500">{item.title}</p>

              <h2 className="text-3xl font-bold mt-2">{item.value}</h2>
            </div>

            <div
              className={`${item.color} w-16 h-16 rounded-full flex items-center justify-center text-white`}
            >
              {item.icon}
            </div>
          </div>
        ))}
      </div>

      {/* Quick Actions */}
      <div className="grid md:grid-cols-2 gap-6 mb-10">
        <Link
          to="/admin/create-officer"
          className="bg-white rounded-xl shadow-md p-6 hover:shadow-xl transition"
        >
          <div className="flex items-center gap-4">
            <FaUserPlus className="text-3xl text-green-600" />

            <div>
              <h2 className="font-bold text-xl">Create Officer</h2>

              <p className="text-gray-500">
                Register a new officer for a ward.
              </p>
            </div>
          </div>
        </Link>

        <Link
          to="/admin/manage-officers"
          className="bg-white rounded-xl shadow-md p-6 hover:shadow-xl transition"
        >
          <div className="flex items-center gap-4">
            <FaUsers className="text-3xl text-blue-600" />

            <div>
              <h2 className="font-bold text-xl">Manage Officers</h2>

              <p className="text-gray-500">View, edit and remove officers.</p>
            </div>
          </div>
        </Link>
      </div>

      {/* Recent Activity */}
      <div className="bg-white rounded-xl shadow-md p-6">
        <h2 className="text-2xl font-bold mb-4">Recent Activity</h2>

        <div className="text-gray-500 text-center py-12">
          No recent activity available.
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
