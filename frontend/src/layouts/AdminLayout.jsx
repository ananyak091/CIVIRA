import React from "react";
import { Outlet, NavLink, useNavigate } from "react-router-dom";
import {
  FaHome,
  FaUserPlus,
  FaUsers,
  FaSignOutAlt,
  FaShieldAlt,
} from "react-icons/fa";

const AdminLayout = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("adminToken");
    navigate("/admin", { replace: true });
  };

  const navItems = [
    {
      name: "Dashboard",
      icon: <FaHome />,
      path: "/admin/dashboard",
    },
    {
      name: "Create Officer",
      icon: <FaUserPlus />,
      path: "/admin/create-officer",
    },
    {
      name: "Manage Officers",
      icon: <FaUsers />,
      path: "/admin/manage-officers",
    },
  ];

  return (
    <div className="flex min-h-screen bg-slate-100">
      {/* Sidebar */}
      <aside className="w-64 bg-slate-900 text-white flex flex-col shadow-xl">
        {/* Logo */}
        <div className="h-20 flex items-center px-6 border-b border-slate-800">
          <div className="w-12 h-12 rounded-xl bg-green-600 flex items-center justify-center">
            <FaShieldAlt className="text-xl" />
          </div>

          <div className="ml-3">
            <h1 className="text-xl font-bold">CIVIRA</h1>
            <p className="text-xs text-slate-400">Admin Portal</p>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-5 space-y-2">
          {navItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) =>
                `flex items-center gap-4 px-4 py-3 rounded-xl transition-all ${
                  isActive
                    ? "bg-green-600 text-white shadow"
                    : "text-slate-300 hover:bg-slate-800 hover:text-white"
                }`
              }
            >
              <span className="text-lg">{item.icon}</span>
              <span>{item.name}</span>
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

      {/* Right Section */}
      <div className="flex-1 flex flex-col">
        {/* Top Navbar */}
        <header className="h-20 bg-white border-b shadow-sm flex items-center justify-between px-8">
          <div>
            <h1 className="text-2xl font-bold text-slate-800">
              Admin Dashboard
            </h1>
            <p className="text-sm text-gray-500">
              Manage officers and monitor the system.
            </p>
          </div>

          <div className="flex items-center gap-4">
            <div className="text-right">
              <p className="font-semibold text-slate-700">Administrator</p>
              <p className="text-sm text-gray-500">System Admin</p>
            </div>

            <div className="w-12 h-12 rounded-full bg-green-600 flex items-center justify-center text-white font-bold text-lg">
              A
            </div>
          </div>
        </header>

        {/* Main */}
        <main className="flex-1 p-6 overflow-y-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;
