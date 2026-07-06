import React from "react";
import { Outlet, NavLink, useNavigate, useLocation } from "react-router-dom";
import {
  FaHome,
  FaClipboardList,
  FaUserCircle,
  FaSignOutAlt,
  FaShieldAlt,
  FaBell,
} from "react-icons/fa";
import { useOfficerContext } from "@/context/OfficerContext";

const OfficerLayout = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { officer, logout } = useOfficerContext();

  const handleLogout = () => {
    logout();
    navigate("/auth-officer");
  };

  const navItems = [
    {
      name: "Dashboard",
      icon: <FaHome />,
      path: "/officer/dashboard",
    },
    {
      name: "Complaints",
      icon: <FaClipboardList />,
      path: "/officer/tasks",
    },
    {
      name: "Profile",
      icon: <FaUserCircle />,
      path: "/officer/profile",
    },
  ];

  const pageTitle =
    navItems.find((item) => item.path === location.pathname)?.name ||
    "Officer Panel";

  return (
    <div className="flex min-h-screen bg-slate-100">
      {/* ================= Sidebar ================= */}
      <aside className="w-64 bg-slate-900 text-white flex flex-col shadow-xl">
        {/* Logo */}
        <div className="h-20 flex items-center px-6 border-b border-slate-800">
          <div className="w-12 h-12 rounded-xl bg-green-600 flex items-center justify-center shadow-lg">
            <FaShieldAlt className="text-xl" />
          </div>

          <div className="ml-3">
            <h1 className="text-2xl font-bold tracking-wide">CIVIRA</h1>

            <p className="text-xs text-slate-400">Officer Portal</p>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 mt-6 px-4 space-y-2">
          {navItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) =>
                `relative flex items-center gap-4 px-4 py-3 rounded-xl transition-all duration-200 ${
                  isActive
                    ? "bg-green-600 text-white shadow-lg"
                    : "text-slate-300 hover:bg-slate-800 hover:translate-x-1"
                }`
              }
            >
              {({ isActive }) => (
                <>
                  {isActive && (
                    <span className="absolute left-0 h-8 w-1 rounded-r bg-white"></span>
                  )}

                  <span className="text-lg">{item.icon}</span>

                  <span>{item.name}</span>
                </>
              )}
            </NavLink>
          ))}
        </nav>

        {/* Logout */}
        <div className="p-5 border-t border-slate-800">
          <button
            onClick={handleLogout}
            className="w-full flex items-center justify-center gap-3 rounded-xl bg-red-600 py-3 font-medium hover:bg-red-700 transition"
          >
            <FaSignOutAlt />
            Logout
          </button>
        </div>
      </aside>

      {/* ================= Main ================= */}
      <div className="flex-1 flex flex-col">
        {/* Top Navbar */}
        <header className="sticky top-0 z-20 h-20 bg-white/90 backdrop-blur-md border-b border-slate-200 flex justify-between items-center px-8">
          {/* Left */}
          <div>
            <h1 className="text-3xl font-bold text-slate-800">{pageTitle}</h1>

            <p className="text-sm text-gray-500 mt-1">
              Manage complaints assigned to your ward
            </p>
          </div>

          {/* Right */}
          <div className="flex items-center gap-6">
            {/* Notification */}
            <button className="relative p-3 rounded-xl bg-slate-100 hover:bg-slate-200 transition">
              <FaBell className="text-slate-700 text-lg" />

              <span className="absolute top-2 right-2 w-2 h-2 rounded-full bg-red-500"></span>
            </button>

            {/* Officer */}
            <div className="flex items-center gap-3">
              <div className="text-right">
                <h3 className="font-semibold text-slate-800">
                  {officer?.officerId}
                </h3>

                <p className="text-xs text-gray-500">
                  Ward {officer?.wardNo} • {officer?.city}
                </p>
              </div>

              <div className="w-12 h-12 rounded-full bg-gradient-to-r from-green-500 to-green-700 flex items-center justify-center text-white font-bold shadow-lg">
                {officer?.wardNo}
              </div>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 overflow-y-auto bg-slate-100 p-6">
          <div className="bg-white rounded-3xl shadow-sm border border-slate-200 min-h-[calc(100vh-130px)] p-8">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
};

export default OfficerLayout;
