// Navbar component for citizen portal --> BY SOURAV MAHATA

import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { assets } from "../assets/asset.js";
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
import { useAppContext } from "../context/AppContext.jsx";
import { toast } from "react-toastify";

const Navbar = () => {
  const [openProfile, setOpenProfile] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const { isLoggedIn, setIsLoggedIn, logout, userData } = useAppContext();
  const navigate = useNavigate();

  const navLinkClass = ({ isActive }) =>
    isActive
      ? "text-blue-200 font-semibold flex items-center gap-1"
      : "text-white hover:text-blue-100 transition flex items-center gap-1";

  return (
    <>
      {/* Navbar */}
      <nav className="bg-[#007EC5] px-6 py-4 shadow-md sticky top-0 z-50">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center gap-2">
            <img
              src={assets.logo}
              alt="CIVIRA Logo"
              className="object-contain w-10 h-10"
            />
            <NavLink to="/" className="text-2xl font-bold text-white">
              CIVIRA
            </NavLink>
          </div>

          {/* Desktop Navigation */}
          <ul className="items-center hidden gap-8 md:flex">
            <NavLink to="/" className={navLinkClass}>
              <IoIosHome /> Home
            </NavLink>
            <NavLink to="/dashboard" className={navLinkClass}>
              <RxDashboard /> Dashboard
            </NavLink>

            <NavLink to="/register-complaints" className={navLinkClass}>
              <FaRegPlusSquare /> Register Complaint
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
          <div className="relative hidden md:block">
            {isLoggedIn ? (
              <>
                <button
                  onClick={() => setOpenProfile(!openProfile)}
                  className="text-white"
                >
                  {userData ? (
                    <img
                      src={userData.image}
                      className="object-cover w-8 h-8 rounded-full"
                      alt=""
                    />
                  ) : (
                    <CgProfile size={30} />
                  )}
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
              <NavLink
                to="/auth"
                className="bg-white text-[#007EC5] px-4 py-2 rounded-lg font-semibold flex gap-2 items-center"
              >
                <IoMdLogIn />
                Login
              </NavLink>
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
        className={`fixed top-0 left-0 h-full w-64 bg-[#007EC5] z-50
  transform transition-transform duration-300 ease-in-out
  ${mobileMenuOpen ? "translate-x-0" : "-translate-x-full"}`}
      >
        {/* Drawer Header */}
        <div className="flex items-center gap-3 px-5 py-4 border-b border-blue-400">
          <img
            src={assets.logo}
            alt="CIVIRA"
            className="object-contain w-8 h-8 bg-white rounded"
          />
          <span className="text-xl font-bold text-white">CIVIRA</span>

          {/* Close button */}
          <button
            className="ml-auto text-2xl text-white"
            onClick={() => setMobileMenuOpen(false)}
          >
            <RxCrossCircled />
          </button>
        </div>

        {/* Menu Items */}
        <ul className="flex flex-col gap-5 px-6 py-6 text-white">
          <NavLink to="/" onClick={() => setMobileMenuOpen(false)}>
            <IoIosHome className="inline mr-3" /> Home
          </NavLink>
          <NavLink to="/dashboard" onClick={() => setMobileMenuOpen(false)}>
            <RxDashboard className="inline mr-3" /> Dashboard
          </NavLink>

          <NavLink
            to="/register-complaints"
            onClick={() => setMobileMenuOpen(false)}
          >
            <FaRegPlusSquare className="inline mr-3" /> Register Complaint
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
            <NavLink
              to="/auth"
              onClick={() => setMobileMenuOpen(false)}
              className={`flex gap-2 items-center`}
            >
              <IoMdLogIn />
              Login
            </NavLink>
          )}
        </ul>
      </div>
    </>
  );
};

export default Navbar;
