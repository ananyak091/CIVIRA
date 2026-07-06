import React from "react";
import { Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// Layouts
import CitizenLayout from "@/layouts/CitizenLayout";
import AuthLayout from "@/layouts/AuthLayout";
import OfficerLayout from "@/layouts/OfficerLayout";
import AdminLayout from "@/layouts/AdminLayout";

// Protected Route
import ProtectedRoute from "@/app/routes/protectedRoute";

// Citizen Pages
import { Home } from "@/modules/citizen/pages/Home";
import Dashboard from "@/modules/citizen/pages/Dashboard";
import Profile from "@/modules/citizen/pages/Profile";
import RegisterComplaints from "@/modules/citizen/pages/RegisterComplaints";
import MyComplaints from "@/modules/citizen/pages/MyComplaints";
import ComplaintDetails from "@/modules/citizen/pages/ComplaintDetails";
import Notifications from "@/modules/citizen/pages/Notifications";

// Auth Pages
import Auth from "@/modules/auth/pages/Auth";
import OfficerLogin from "@/modules/auth/pages/OfficerLogin";
import AdminLogin from "@/modules/auth/pages/AdminLogin";

// Officer Pages
import OfficerDashboard from "@/modules/officer/pages/Dashboard";

// Admin Pages
import AdminDashboard from "@/modules/admin/pages/Dashboard";
import CreateOfficer from "@/modules/admin/pages/CreateOfficer";
import ManageOfficers from "@/modules/admin/pages/ManageOfficers";

// Shared
import NotFound from "@/shared/NotFound";
import VerifyOTP from "@/modules/admin/pages/VerifyOtp";
import Complaint from "@/modules/officer/pages/Complaint";
import OfficerProfile from "@/modules/officer/pages/OfficerProfile";

const App = () => {
  return (
    <>
      <ToastContainer position="top-right" autoClose={3000} />

      <Routes>
        {/* Citizen */}
        {/* Citizen */}
        <Route element={<CitizenLayout />}>
          <Route path="/" element={<Home />} />

          <Route
            path="/dashboard"
            element={
              <ProtectedRoute role="citizen" redirectTo="/auth">
                <Dashboard />
              </ProtectedRoute>
            }
          />

          <Route
            path="/profile"
            element={
              <ProtectedRoute role="citizen" redirectTo="/auth">
                <Profile />
              </ProtectedRoute>
            }
          />

          <Route
            path="/register-complaints"
            element={
              <ProtectedRoute role="citizen" redirectTo="/auth">
                <RegisterComplaints />
              </ProtectedRoute>
            }
          />

          <Route
            path="/my-complaints"
            element={
              <ProtectedRoute role="citizen" redirectTo="/auth">
                <MyComplaints />
              </ProtectedRoute>
            }
          />

          <Route
            path="/complaints/:id"
            element={
              <ProtectedRoute role="citizen" redirectTo="/auth">
                <ComplaintDetails />
              </ProtectedRoute>
            }
          />

          <Route
            path="/notifications"
            element={
              <ProtectedRoute role="citizen" redirectTo="/auth">
                <Notifications />
              </ProtectedRoute>
            }
          />
        </Route>

        {/* Citizen Login */}
        <Route element={<AuthLayout />}>
          <Route path="/auth" element={<Auth />} />
        </Route>

        {/* Officer Login */}
        <Route element={<AuthLayout />}>
          <Route path="/auth-officer" element={<OfficerLogin />} />
        </Route>

        {/* Officer Panel */}
        <Route
          path="/officer"
          element={
            <ProtectedRoute role="officer" redirectTo="/auth-officer">
              <OfficerLayout />
            </ProtectedRoute>
          }
        >
          <Route path="dashboard" element={<OfficerDashboard />} />
          <Route path="tasks" element={<Complaint />} />
          <Route path="profile" element={<OfficerProfile />} />
        </Route>

        {/* Admin Login */}
        <Route element={<AdminLayout />}>
          <Route path="/admin" element={<AdminLogin />} />
          <Route path="/admin/verify-otp" element={<VerifyOTP />} />
        </Route>

        {/* Admin Panel */}
        <Route
          path="/admin"
          element={
            <ProtectedRoute role="admin" redirectTo="/admin">
              <AdminLayout />
            </ProtectedRoute>
          }
        >
          <Route path="dashboard" element={<AdminDashboard />} />
          <Route path="create-officer" element={<CreateOfficer />} />
          <Route path="manage-officers" element={<ManageOfficers />} />
        </Route>
        {/* 404 */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
};

export default App;
