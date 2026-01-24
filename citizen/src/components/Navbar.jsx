// Navbar component for citizen portal --> BY SOURAV MAHATA

import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { assets } from "../assets/asset.js";
import { FaRegPlusSquare } from "react-icons/fa";
import { IoMdNotifications } from "react-icons/io";
import { RxDashboard } from "react-icons/rx";
import { CgProfile } from "react-icons/cg";
import { GiHamburgerMenu } from "react-icons/gi";
import { RxCrossCircled } from "react-icons/rx";
import { useAppContext } from "../context/AppContext.jsx";
import { toast } from "react-toastify";
import { FaClipboardList } from "react-icons/fa";
const Navbar = () => {
  // TEMP: replace later with auth state (context / redux)

  const [openProfile, setOpenProfile] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { isLoggedIn, setIsLoggedIn, logout, userData, setUserData } =
    useAppContext();

  const navigate = useNavigate();

  const navLinkClass = ({ isActive }) =>
    isActive
      ? "text-blue-200 font-semibold border-blue-200 flex items-center gap-1 justify-center"
      : "text-white hover:text-blue-100 transition flex items-center gap-1 justify-center";

  return (
    <nav className="bg-[#007EC5] px-6 py-4 shadow-md sticky top-0 z-50">
      <div className="flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center gap-2">
          <img
            src={assets.logo}
            alt="CIVIRA Logo"
            className="h-10 w-10 object-contain"
          />
          <NavLink to="/" className="text-2xl font-bold text-white">
            CIVIRA
          </NavLink>
        </div>

        {/* Desktop --> */}

        {/* Navigation Links */}
        <ul className="hidden md:flex items-center gap-8">
          <li>
            <NavLink to="/dashboard" className={navLinkClass}>
              <RxDashboard />
              Dashboard
            </NavLink>
          </li>

          <li>
            <NavLink to="/register-complaints" className={navLinkClass}>
              <FaRegPlusSquare />
              Register Complaint
            </NavLink>
          </li>

          {isLoggedIn && (
            <li>
              <NavLink to="/notifications" className={navLinkClass}>
                <IoMdNotifications />
                Notifications
              </NavLink>
            </li>
          )}

          {isLoggedIn && (
            <li>
              <NavLink
                to="/my-complaints"
                className={navLinkClass}
                onClick={() => setOpenProfile(false)}
              >
                <FaClipboardList />
                My Complaints
              </NavLink>
            </li>
          )}
        </ul>

        {/* Auth Section */}
        <div className="hidden md:block relative">
          {isLoggedIn ? (
            <>
              {/* Profile Button */}
              <button
                onClick={() => setOpenProfile(!openProfile)}
                className="text-white hover:text-blue-100 font-medium flex items-center gap-1 justify-center"
              >
                {userData ? (
                  <img
                    className="w-8 h-8 rounded-full object-cover"
                    src={userData.image}
                    alt=""
                    srcset=""
                  />
                ) : (
                  <CgProfile size={32} />
                )}
              </button>

              {/* Profile Dropdown */}
              {openProfile && (
                <div className="absolute right-0 mt-3 w-48 bg-white rounded-lg shadow-lg overflow-hidden">
                  <NavLink
                    to="/profile"
                    className="block px-4 py-2 text-gray-700 hover:bg-blue-50"
                    onClick={() => setOpenProfile(false)}
                  >
                    Your Profile
                  </NavLink>

                  <hr />

                  <button
                    onClick={() => {
                      setOpenProfile(false);
                      setIsLoggedIn(false);
                      logout();
                      navigate("/auth");
                      toast.success("Logged out successfully");
                    }}
                    className="w-full text-left px-4 py-2 text-red-600 hover:bg-red-50"
                  >
                    Logout
                  </button>
                </div>
              )}
            </>
          ) : (
            <NavLink
              to="/auth"
              className="bg-white text-[#007EC5] px-4 py-2 rounded-lg font-semibold hover:bg-blue-50 transition"
            >
              Login
            </NavLink>
          )}
        </div>

        {/* Mobile Hamburger */}
        <button
          className="md:hidden text-white text-3xl"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          {mobileMenuOpen ? <RxCrossCircled /> : <GiHamburgerMenu />}
        </button>
      </div>
      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden mt-4 bg-[#007EC5] rounded-lg shadow-lg">
          <ul className="flex flex-col gap-4 px-6 py-4">
            <NavLink to="/dashboard" onClick={() => setMobileMenuOpen(false)}>
              <RxDashboard className="inline mr-2" /> Dashboard
            </NavLink>

            <NavLink
              to="/register-complaints"
              onClick={() => setMobileMenuOpen(false)}
            >
              <FaRegPlusSquare className="inline mr-2" /> Register Complaint
            </NavLink>

            {isLoggedIn && (
              <NavLink
                to="/notifications"
                onClick={() => setMobileMenuOpen(false)}
              >
                <IoMdNotifications className="inline mr-2" /> Notifications
              </NavLink>
            )}

            {isLoggedIn ? (
              <>
                <NavLink to="/profile">Your Profile</NavLink>
                <NavLink to="/my-complaints">Your Complaints</NavLink>
                <button
                  className="text-left text-red-200"
                  onClick={() => {
                    setOpenProfile(false);
                    setIsLoggedIn(false);
                    logout();
                    navigate("/auth");
                    toast.success("Logged out successfully");
                  }}
                >
                  Logout
                </button>
              </>
            ) : (
              <NavLink to="/auth">Login</NavLink>
            )}
          </ul>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
