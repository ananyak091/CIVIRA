import React, { useState } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import {
  FaUserShield,
  FaIdBadge,
  FaLock,
  FaEye,
  FaEyeSlash,
  FaArrowRight,
  FaCheckCircle,
} from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useOfficerContext } from "@/context/OfficerContext";

const OfficerLogin = () => {
  const navigate = useNavigate();
  const { login } = useOfficerContext();

  const [showPassword, setShowPassword] = useState(false);

  const [formData, setFormData] = useState({
    officerId: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);

    try {
      const res = await axios.post(
        `${import.meta.env.VITE_API_BASE_URL}/api/officer/auth/login`,
        formData,
      );

      login(res.data.token, res.data.officer);

      toast.success(res.data.message);

      navigate("/officer/dashboard");
    } catch (error) {
      toast.error(error.response?.data?.message || "Login Failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative min-h-screen overflow-hidden bg-gradient-to-br from-primary/10 via-background to-secondary/10">
      {/* Background Blur */}
      <div className="absolute -top-20 -left-20 w-96 h-96 bg-primary/30 rounded-full blur-[150px] opacity-40"></div>

      <div className="absolute bottom-0 right-0 w-96 h-96 bg-cyan-300 rounded-full blur-[160px] opacity-40"></div>

      <div className="absolute top-1/2 left-1/2 w-72 h-72 bg-secondary/30 rounded-full blur-[140px] opacity-20 -translate-x-1/2 -translate-y-1/2"></div>

      <div className="relative z-10 min-h-screen flex">
        {/* ================= Left Section ================= */}

        <motion.div
          initial={{ x: -80, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.7 }}
          className="hidden lg:flex w-1/2 flex-col justify-center px-20"
        >
          <div className="flex items-center gap-5">
            <div className="w-20 h-20 rounded-3xl bg-primary flex items-center justify-center shadow-2xl">
              <FaUserShield className="text-5xl text-white" />
            </div>

            <div>
              <h1 className="text-5xl font-black text-gray-800">CIVIRA</h1>

              <p className="text-lg text-gray-600 mt-2">
                Officer Management Portal
              </p>
            </div>
          </div>

          <h2 className="mt-14 text-4xl font-bold text-gray-800 leading-snug">
            Empowering officers to resolve civic complaints efficiently.
          </h2>

          <p className="mt-6 text-lg text-gray-600 leading-8">
            Securely access assigned complaints, verify reports, update
            investigation status, and collaborate with the administration in
            real time.
          </p>

          <div className="mt-14 space-y-6">
            {[
              "Secure Officer Authentication",
              "Real-time Complaint Assignment",
              "Complaint Status Management",
              "Department-wise Dashboard",
            ].map((item) => (
              <div key={item} className="flex items-center gap-4">
                <FaCheckCircle className="text-primary text-2xl" />

                <span className="text-lg text-gray-700 font-medium">
                  {item}
                </span>
              </div>
            ))}
          </div>
        </motion.div>
        {/* ================= Right Section ================= */}

        <div className="flex-1 flex items-center justify-center px-6 py-12">
          <motion.div
            initial={{ opacity: 0, y: 40, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.6 }}
            className="w-full max-w-md"
          >
            <div className="rounded-3xl border border-white/40 bg-white/80 backdrop-blur-xl shadow-2xl p-8">
              {/* Mobile Logo */}

              <div className="flex lg:hidden justify-center mb-6">
                <div className="w-20 h-20 rounded-full bg-primary flex items-center justify-center shadow-xl">
                  <FaUserShield className="text-white text-4xl" />
                </div>
              </div>

              <div className="text-center">
                <h2 className="text-3xl font-bold text-gray-800">
                  Officer Login
                </h2>

                <p className="mt-2 text-gray-500">
                  Sign in to access your assigned complaints.
                </p>
              </div>

              <form onSubmit={handleSubmit} className="mt-8 space-y-6">
                {/* Officer ID */}

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Officer ID
                  </label>

                  <div className="relative">
                    <FaIdBadge className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 text-lg" />

                    <input
                      type="text"
                      name="officerId"
                      value={formData.officerId}
                      onChange={handleChange}
                      placeholder="Enter Officer ID"
                      required
                      className="w-full rounded-xl border border-gray-300 bg-white py-3 pl-12 pr-4 text-gray-700 outline-none transition focus:border-primary
focus:ring-primary/20"
                    />
                  </div>
                </div>

                {/* Password */}

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Password
                  </label>

                  <div className="relative">
                    <FaLock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />

                    <input
                      type={showPassword ? "text" : "password"}
                      name="password"
                      value={formData.password}
                      onChange={handleChange}
                      placeholder="Enter Password"
                      required
                      className="w-full rounded-xl border border-gray-300 bg-white py-3 pl-12 pr-12 text-gray-700 outline-none transition focus:border-primary
focus:ring-primary/20"
                    />

                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 hover:text-primary"
                    >
                      {showPassword ? <FaEyeSlash /> : <FaEye />}
                    </button>
                  </div>
                </div>

                {/* Forgot Password */}

                <div className="flex justify-end">
                  <button
                    type="button"
                    className="text-sm font-medium text-primary
hover:text-primary-dark"
                  >
                    Forgot Password?
                  </button>
                </div>

                {/* Login Button */}

                <motion.button
                  whileHover={{
                    scale: 1.02,
                  }}
                  whileTap={{
                    scale: 0.97,
                  }}
                  disabled={loading}
                  type="submit"
                  className={`w-full rounded-xl py-3 font-semibold text-white shadow-lg transition-all flex items-center justify-center gap-3 ${
                    loading
                      ? "bg-primary/70 cursor-not-allowed"
                      : "bg-gradient-to-r from-primary-dark via-primary to-secondary hover:shadow-primary/40"
                  }`}
                >
                  {loading ? (
                    <>
                      <svg
                        className="h-5 w-5 animate-spin"
                        viewBox="0 0 24 24"
                        fill="none"
                      >
                        <circle
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="white"
                          strokeWidth="3"
                          opacity=".25"
                        />
                        <path
                          d="M22 12A10 10 0 0012 2"
                          stroke="white"
                          strokeWidth="3"
                        />
                      </svg>
                      Signing In...
                    </>
                  ) : (
                    <>
                      Access Dashboard
                      <FaArrowRight />
                    </>
                  )}
                </motion.button>
                {/* Security Notice */}

                <div
                  className="mt-6 rounded-2xl border border-primary/20
bg-primary/5 p-4"
                >
                  <div className="flex items-start gap-3">
                    <div className="mt-1 h-3 w-3 rounded-full bg-primary"></div>

                    <div>
                      <p className="font-semibold text-primary-dark">
                        Secure Login
                      </p>

                      <p className="mt-1 text-sm leading-6 text-gray-600">
                        This portal is exclusively for authorized CIVIRA
                        officers. All login activities are securely monitored
                        and encrypted.
                      </p>
                    </div>
                  </div>
                </div>
              </form>

              {/* Footer */}

              <div className="mt-8 border-t border-gray-200 pt-5 text-center">
                <p className="font-semibold text-gray-700">
                  CIVIRA Officer Portal
                </p>

                <p className="mt-1 text-sm text-gray-500">
                  Smart Civic Complaint Management System
                </p>

                <p className="mt-3 text-xs text-gray-400">
                  © 2026 CIVIRA. All Rights Reserved.
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default OfficerLogin;
