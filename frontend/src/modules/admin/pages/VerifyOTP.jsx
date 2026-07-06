import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";
import { useAdminContext } from "@/context/AdminContext";

const VerifyOTP = () => {
  const [otp, setOtp] = useState("");

  const { login } = useAdminContext();
  const navigate = useNavigate();
  const location = useLocation();

  // Get email from AdminLogin page
  const email = location.state?.email;

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email) {
      toast.error("Session expired. Please login again.");
      navigate("/admin");
      return;
    }

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
    }
  };

  return (
    <div className="flex items-center justify-center min-h-[80vh]">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded-xl shadow-md w-full max-w-md"
      >
        <h2 className="text-2xl font-bold mb-6 text-center">Verify OTP</h2>

        <input
          type="text"
          maxLength={6}
          value={otp}
          onChange={(e) => setOtp(e.target.value)}
          placeholder="Enter 6-digit OTP"
          className="w-full border rounded-lg px-4 py-3 mb-5"
          required
        />

        <button
          type="submit"
          className="w-full bg-green-600 text-white py-3 rounded-lg"
        >
          Verify OTP
        </button>
      </form>
    </div>
  );
};

export default VerifyOTP;
