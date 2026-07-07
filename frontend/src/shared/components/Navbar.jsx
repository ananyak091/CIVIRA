// Navbar component for citizen portal --> BY SOURAV MAHATA

import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { assets } from "@/assets/asset.js";
import { FaRegPlusSquare, FaClipboardList } from "react-icons/fa";
import {
  IoIosHome,
  IoMdLogIn,
  IoMdLogOut,
  IoMdNotifications,
} from "react-icons/io";
import { RxDashboard, RxCrossCircled } from "react-icons/rx";
import { CgProfile } from "react-icons/cg";
import { GiHamburgerMenu } from "react-icons/gi";
import { useAppContext } from "@/context/AppContext.jsx";
import { toast } from "react-toastify";
import { GrUserAdmin } from "react-icons/gr";

const Navbar = () => {
  const [openProfile, setOpenProfile] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const { isLoggedIn, setIsLoggedIn, logout, userData } = useAppContext();
  const navigate = useNavigate();

  const navLinkClass = ({ isActive }) =>
    isActive
      ? "text-white bg-white/15 font-semibold flex items-center gap-2 px-3 py-2 rounded-full"
      : "text-white/90 hover:text-white hover:bg-white/10 transition flex items-center gap-2 px-3 py-2 rounded-full";

  return (
    <>
      {/* Navbar */}
      <nav className="bg-gradient-to-r from-primary-dark via-primary to-secondary px-4 md:px-6 py-4 shadow-md sticky top-0 z-50 border-b border-white/10">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          {/* Logo */}
          <NavLink to="/" className="flex items-center gap-3">
            <img
              src={assets.logo}
              alt="CIVIRA Logo"
              className="object-contain w-10 h-10 bg-white/90 rounded-lg p-1"
            />
            <div className="leading-tight">
              <p className="text-2xl font-bold text-white">CIVIRA</p>
              <p className="text-[11px] tracking-wide text-white/80 uppercase">
                Civic Issue Reporting
              </p>
            </div>
          </NavLink>

          {/* Desktop Navigation */}
          <ul className="items-center hidden gap-2 md:flex">
            <NavLink to="/" className={navLinkClass}>
              <IoIosHome /> Home
            </NavLink>
            <NavLink to="/dashboard" className={navLinkClass}>
              <RxDashboard /> Dashboard
            </NavLink>

            {isLoggedIn && (
              <NavLink to="/notifications" className={navLinkClass}>
                <IoMdNotifications /> Notifications
              </NavLink>
            )}

            {isLoggedIn && (
              <NavLink to="/my-complaints" className={navLinkClass}>
                <FaClipboardList /> My Complaints
              </NavLink>
            )}
          </ul>

          {/* Desktop Auth */}
          <div className="relative hidden md:flex items-center gap-3">
            <NavLink
              to="/register-complaints"
              className="bg-white text-[#007EC5] px-4 py-2 rounded-full font-semibold flex gap-2 items-center shadow-sm hover:bg-blue-50 transition"
            >
              <FaRegPlusSquare />
              Report Issue
            </NavLink>
            {isLoggedIn ? (
              <>
                <button
                  onClick={() => setOpenProfile(!openProfile)}
                  className="text-white flex items-center gap-2 bg-white/10 px-2 py-1 rounded-full hover:bg-white/15 transition"
                >
                  {userData ? (
                    <img
                      src={userData.image}
                      className="object-cover w-8 h-8 rounded-full ring-2 ring-white/40"
                      alt=""
                    />
                  ) : (
                    <CgProfile size={30} />
                  )}
                  <span className="text-sm text-white/90 hidden lg:inline">
                    {userData?.name ? userData.name.split(" ")[0] : "Profile"}
                  </span>
                </button>

                {openProfile && (
                  <div className="absolute right-0 w-48 mt-3 bg-white rounded-lg shadow-lg">
                    <NavLink
                      to="/profile"
                      className=" px-4 py-2 hover:bg-blue-50 flex gap-2 items-center"
                      onClick={() => setOpenProfile(false)}
                    >
                      <CgProfile />
                      My Profile
                    </NavLink>

                    <hr />

                    <button
                      className="w-full px-4 py-2 text-left text-red-600 hover:bg-red-50 flex gap-2 items-center"
                      onClick={() => {
                        setOpenProfile(false);
                        setIsLoggedIn(false);
                        logout();
                        navigate("/auth");
                        toast.success("Logged out successfully");
                      }}
                    >
                      <IoMdLogOut />
                      Logout
                    </button>
                  </div>
                )}
              </>
            ) : (
              <>
                <NavLink
                  to="/auth"
                  className="bg-white text-[#007EC5] px-4 py-2 rounded-full font-semibold flex gap-2 items-center shadow-sm hover:bg-blue-50 transition"
                >
                  <IoMdLogIn />
                  Citizen Login
                </NavLink>

                <NavLink
                  to="/auth-officer"
                  className="bg-white text-[#007EC5] px-4 py-2 rounded-full font-semibold flex gap-2 items-center shadow-sm hover:bg-blue-50 transition"
                >
                  <GrUserAdmin />
                  Officer Login
                </NavLink>
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            className="text-3xl text-white md:hidden"
            onClick={() => setMobileMenuOpen(true)}
            aria-label="Open menu"
          >
            <GiHamburgerMenu />
          </button>
        </div>
      </nav>

      {/* Overlay */}
      {mobileMenuOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/40"
          onClick={() => setMobileMenuOpen(false)}
        />
      )}

      {/* Mobile Side Drawer */}
      <div
        className={`fixed top-0 left-0 h-full w-72 bg-gradient-to-b from-[#007EC5] to-[#045b8f] z-50
  transform transition-transform duration-300 ease-in-out
  ${mobileMenuOpen ? "translate-x-0" : "-translate-x-full"}`}
      >
        {/* Drawer Header */}
        <div className="flex items-center gap-3 px-5 py-4 border-b border-white/20">
          <img
            src={assets.logo}
            alt="CIVIRA"
            className="object-contain w-9 h-9 bg-white rounded-lg p-1"
          />
          <div className="leading-tight">
            <p className="text-xl font-bold text-white">CIVIRA</p>
            <p className="text-[10px] uppercase tracking-wide text-white/80">
              Citizen Portal
            </p>
          </div>

          {/* Close button */}
          <button
            className="ml-auto text-2xl text-white"
            onClick={() => setMobileMenuOpen(false)}
          >
            <RxCrossCircled />
          </button>
        </div>

        {/* Menu Items */}
        <div className="px-6 pt-6">
          <NavLink
            to="/register-complaints"
            onClick={() => setMobileMenuOpen(false)}
            className="bg-white text-[#007EC5] px-4 py-3 rounded-xl font-semibold flex gap-2 items-center justify-center shadow-sm"
          >
            <FaRegPlusSquare />
            Report an Issue
          </NavLink>
        </div>

        {/* Menu Items */}
        <ul className="flex flex-col gap-4 px-6 py-6 text-white">
          <NavLink to="/" onClick={() => setMobileMenuOpen(false)}>
            <IoIosHome className="inline mr-3" /> Home
          </NavLink>
          <NavLink to="/dashboard" onClick={() => setMobileMenuOpen(false)}>
            <RxDashboard className="inline mr-3" /> Dashboard
          </NavLink>

          {isLoggedIn && (
            <NavLink
              to="/notifications"
              onClick={() => setMobileMenuOpen(false)}
            >
              <IoMdNotifications className="inline mr-3" /> Notifications
            </NavLink>
          )}

          {isLoggedIn ? (
            <>
              <NavLink
                to="/profile"
                onClick={() => setMobileMenuOpen(false)}
                className={`flex gap-2 items-center`}
              >
                <CgProfile />
                My Profile
              </NavLink>

              <NavLink
                to="/my-complaints"
                onClick={() => setMobileMenuOpen(false)}
                className={`flex gap-2 items-center`}
              >
                <FaClipboardList />
                My Complaints
              </NavLink>

              <button
                className="text-left text-red-200 flex gap-2 items-center"
                onClick={() => {
                  setMobileMenuOpen(false);
                  logout();
                  navigate("/auth");
                }}
              >
                <IoMdLogOut />
                Logout
              </button>
            </>
          ) : (
            <>
              <NavLink
                to="/auth"
                onClick={() => setMobileMenuOpen(false)}
                className={`flex gap-2 items-center`}
              >
                <IoMdLogIn />
                Citizen Login
              </NavLink>
              <NavLink
                to="/auth"
                onClick={() => setMobileMenuOpen(false)}
                className={`flex gap-2 items-center`}
              >
                <IoMdLogIn />
                Officer Login
              </NavLink>
            </>
          )}
        </ul>
      </div>
    </>
  );
};

export default Navbar;
