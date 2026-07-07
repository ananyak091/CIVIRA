import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";
import { useAdminContext } from "@/context/AdminContext";
import { FaShieldAlt, FaArrowLeft, FaLock } from "react-icons/fa";

const VerifyOTP = () => {
  const [otp, setOtp] = useState("");
  const [loading, setLoading] = useState(false);

  const { login } = useAdminContext();
  const navigate = useNavigate();
  const location = useLocation();

  const email = location.state?.email;

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email) {
      toast.error("Session expired. Please login again.");
      navigate("/admin");
      return;
    }

    setLoading(true);

    try {
      const res = await axios.post(
        `${import.meta.env.VITE_API_BASE_URL}/api/admin/auth/verify-otp`,
        {
          email,
          otp,
        },
      );

      login(res.data.token);

      toast.success(res.data.message);

      navigate("/admin/dashboard");
    } catch (error) {
      toast.error(error.response?.data?.message || "Invalid OTP");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative min-h-screen overflow-hidden bg-gradient-to-br from-slate-950 via-slate-900 to-emerald-950 flex items-center justify-center px-4">
      {/* Background Glow */}

      <div className="absolute -left-28 -top-28 h-96 w-96 rounded-full bg-emerald-500/20 blur-[160px]" />

      <div className="absolute bottom-0 right-0 h-96 w-96 rounded-full bg-cyan-500/20 blur-[170px]" />

      {/* Card */}

      <div className="relative z-10 w-full max-w-md rounded-3xl border border-white/10 bg-white/10 backdrop-blur-xl shadow-2xl p-8">
        <div className="flex justify-center">
          <div className="h-20 w-20 rounded-full bg-gradient-to-br from-emerald-500 to-green-600 flex items-center justify-center">
            <FaShieldAlt className="text-white text-4xl" />
          </div>
        </div>

        <h1 className="mt-6 text-center text-3xl font-bold text-white">
          Verify OTP
        </h1>

        <p className="mt-2 text-center text-slate-300">
          Enter the verification code sent to
        </p>

        <p className="text-center font-semibold text-emerald-300 mt-1 break-all">
          {email}
        </p>

        <form onSubmit={handleSubmit} className="mt-8 space-y-6">
          <div>
            <label className="mb-2 block text-sm font-medium text-slate-300">
              One-Time Password
            </label>

            <div className="relative">
              <FaLock className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />

              <input
                type="text"
                maxLength={6}
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                placeholder="Enter 6-digit OTP"
                required
                className="w-full rounded-xl border border-white/10 bg-white/5 py-3 pl-12 pr-4 text-center tracking-[10px] text-xl text-white placeholder:text-slate-500 outline-none transition focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/30"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className={`w-full rounded-xl py-3 font-semibold text-white transition ${
              loading
                ? "bg-emerald-400 cursor-not-allowed"
                : "bg-gradient-to-r from-emerald-500 to-green-600 hover:shadow-lg hover:shadow-emerald-500/30"
            }`}
          >
            {loading ? "Verifying..." : "Verify OTP"}
          </button>

          <button
            type="button"
            onClick={() => navigate("/admin")}
            className="w-full flex items-center justify-center gap-2 text-slate-300 hover:text-white transition"
          >
            <FaArrowLeft />
            Back to Login
          </button>
        </form>

        <div className="mt-8 border-t border-white/10 pt-6 text-center">
          <p className="font-medium text-white">CIVIRA Administration Portal</p>

          <p className="mt-2 text-sm text-slate-400">
            Secure Two-Factor Authentication
          </p>
        </div>
      </div>
    </div>
  );
};

export default VerifyOTP;
