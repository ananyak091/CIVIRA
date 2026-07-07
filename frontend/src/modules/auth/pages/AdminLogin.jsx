import axios from "axios";
import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  FaUserShield,
  FaEnvelope,
  FaLock,
  FaEye,
  FaEyeSlash,
  FaArrowRight,
  FaCheckCircle,
} from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const Feature = ({ text }) => (
  <div className="flex items-center gap-4">
    <FaCheckCircle className="text-emerald-400 text-xl" />
    <span className="text-slate-300 text-lg">{text}</span>
  </div>
);

const AdminLogin = () => {
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);

  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

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
        `${import.meta.env.VITE_API_BASE_URL}/api/admin/auth/login`,
        {
          email: formData.email,
          password: formData.password,
        },
      );

      toast.success(res.data.message);

      navigate("/admin/verify-otp", {
        state: {
          email: formData.email,
        },
      });
    } catch (error) {
      toast.error(error.response?.data?.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative min-h-screen overflow-hidden bg-gradient-to-br from-slate-950 via-slate-900 to-emerald-950">
      {/* Background Glow */}

      <div className="absolute -left-32 -top-32 h-[450px] w-[450px] rounded-full bg-emerald-500/20 blur-[180px]" />

      <div className="absolute bottom-0 right-0 h-[420px] w-[420px] rounded-full bg-cyan-500/20 blur-[170px]" />

      <div className="absolute left-1/2 top-1/2 h-[280px] w-[280px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-green-500/10 blur-[130px]" />

      <div className="relative z-10 flex min-h-screen">
        {/* ================= LEFT PANEL ================= */}

        <motion.div
          initial={{ x: -80, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.7 }}
          className="hidden w-1/2 flex-col justify-center px-20 lg:flex"
        >
          <div className="flex items-center gap-5">
            <div className="flex h-20 w-20 items-center justify-center rounded-3xl bg-gradient-to-br from-emerald-500 to-green-600 shadow-2xl">
              <FaUserShield className="text-5xl text-white" />
            </div>

            <div>
              <h1 className="text-5xl font-black tracking-wide text-white">
                CIVIRA
              </h1>

              <p className="mt-2 text-lg text-emerald-300">
                Administration Portal
              </p>
            </div>
          </div>

          <h2 className="mt-14 text-5xl font-bold leading-tight text-white">
            Securely manage officers, monitor complaints and control the
            platform.
          </h2>

          <p className="mt-8 max-w-xl text-lg leading-8 text-slate-300">
            Welcome to the CIVIRA Administration Portal. Manage officers, verify
            complaint workflows, monitor analytics and supervise the entire
            civic complaint ecosystem from one secure dashboard.
          </p>
        </motion.div>

        {/* ================= LOGIN CARD ================= */}

        <div className="flex flex-1 items-center justify-center px-6 py-10">
          <motion.div
            initial={{ opacity: 0, y: 40, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.6 }}
            className="w-full max-w-md"
          >
            <div className="rounded-3xl border border-white/10 bg-white/10 p-10 shadow-2xl backdrop-blur-2xl">
              {/* Mobile Logo */}

              <div className="mb-6 flex justify-center lg:hidden">
                <div className="flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-br from-emerald-500 to-green-600">
                  <FaUserShield className="text-4xl text-white" />
                </div>
              </div>

              <div className="text-center">
                <h2 className="text-3xl font-bold text-white">Admin Login</h2>

                <p className="mt-2 text-slate-300">
                  Sign in to access the CIVIRA Control Center
                </p>
              </div>
              <form onSubmit={handleSubmit} className="mt-8 space-y-6">
                {/* Email */}

                <div>
                  <label className="mb-2 block text-sm font-medium text-slate-300">
                    Admin Email
                  </label>

                  <div className="relative">
                    <FaEnvelope className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />

                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="admin@civira.com"
                      required
                      className="w-full rounded-xl border border-white/10 bg-white/5 py-3 pl-12 pr-4 text-white placeholder:text-slate-400 outline-none transition focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/30"
                    />
                  </div>
                </div>

                {/* Password */}

                <div>
                  <label className="mb-2 block text-sm font-medium text-slate-300">
                    Password
                  </label>

                  <div className="relative">
                    <FaLock className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />

                    <input
                      type={showPassword ? "text" : "password"}
                      name="password"
                      value={formData.password}
                      onChange={handleChange}
                      placeholder="Enter your password"
                      required
                      className="w-full rounded-xl border border-white/10 bg-white/5 py-3 pl-12 pr-12 text-white placeholder:text-slate-400 outline-none transition focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/30"
                    />

                    <button
                      type="button"
                      onClick={() => setShowPassword((prev) => !prev)}
                      className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white transition"
                    >
                      {showPassword ? <FaEyeSlash /> : <FaEye />}
                    </button>
                  </div>
                </div>

                {/* Login Button */}

                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.97 }}
                  disabled={loading}
                  type="submit"
                  className={`flex w-full items-center justify-center gap-3 rounded-xl py-3 font-semibold text-white transition-all ${
                    loading
                      ? "cursor-not-allowed bg-emerald-400"
                      : "bg-gradient-to-r from-emerald-500 to-green-600 shadow-lg hover:shadow-emerald-500/30"
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
                      Login to Dashboard
                      <FaArrowRight />
                    </>
                  )}
                </motion.button>
              </form>

              {/* Security Notice */}

              <div className="mt-8 rounded-2xl border border-emerald-500/20 bg-emerald-500/10 p-4">
                <div className="flex items-start gap-3">
                  <FaUserShield className="mt-1 text-emerald-400" />

                  <div>
                    <p className="font-semibold text-emerald-300">
                      Secure Administrator Access
                    </p>

                    <p className="mt-1 text-sm leading-6 text-slate-300">
                      This portal is restricted to authorized administrators
                      only. All login attempts are monitored and protected using
                      encrypted authentication.
                    </p>
                  </div>
                </div>
              </div>

              {/* Footer */}

              <div className="mt-8 border-t border-white/10 pt-6 text-center">
                <p className="font-semibold text-white">
                  CIVIRA Administration Portal
                </p>

                <p className="mt-2 text-sm text-slate-400">
                  Smart Civic Complaint Management System
                </p>

                <p className="mt-3 text-xs text-slate-500">
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

export default AdminLogin;
