import React, { useState } from "react";
import axios from "axios";
import { FaUserShield } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useOfficerContext } from "@/context/OfficerContext";

const OfficerLogin = () => {
  const navigate = useNavigate();
  const { login } = useOfficerContext();

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
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-blue-50 flex items-center justify-center px-4">
      <div className="w-full max-w-md bg-white rounded-3xl shadow-2xl p-8 border border-gray-100">
        {/* Icon */}
        <div className="flex justify-center">
          <div className="w-20 h-20 rounded-full bg-green-100 flex items-center justify-center shadow">
            <FaUserShield className="text-4xl text-green-600" />
          </div>
        </div>

        {/* Heading */}
        <div className="text-center mt-6">
          <h1 className="text-3xl font-bold text-gray-800">Officer Login</h1>

          <p className="text-gray-500 mt-2">
            Sign in to access your assigned complaints.
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="mt-8 space-y-5">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Officer ID
            </label>

            <input
              type="text"
              name="officerId"
              value={formData.officerId}
              onChange={handleChange}
              placeholder="e.g. OFF-1024"
              required
              className="w-full rounded-xl border border-gray-300 px-4 py-3 focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none transition"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Password
            </label>

            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Enter your password"
              required
              className="w-full rounded-xl border border-gray-300 px-4 py-3 focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none transition"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className={`w-full rounded-xl py-3 font-semibold text-white transition duration-200 ${
              loading
                ? "bg-green-400 cursor-not-allowed"
                : "bg-green-600 hover:bg-green-700 active:scale-[0.98]"
            }`}
          >
            {loading ? "Signing In..." : "Sign In"}
          </button>
        </form>

        <div className="mt-8 border-t pt-4 text-center text-sm text-gray-400">
          CIVIRA Officer Portal
        </div>
      </div>
    </div>
  );
};

export default OfficerLogin;
