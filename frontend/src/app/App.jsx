import React from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Route, Routes } from "react-router-dom";
import { Home } from "@/modules/citizen/pages/Home";
import Dashboard from "@/modules/citizen/pages/Dashboard";
import RegisterComplaints from "@/modules/citizen/pages/RegisterComplaints";
import MyComplaints from "@/modules/citizen/pages/MyComplaints";
import ComplaintDetails from "@/modules/citizen/pages/ComplaintDetails";
import Auth from "@/modules/auth/pages/Auth";
import Navbar from "@/shared/components/Navbar";
import Footer from "@/shared/components/Footer";
import Profile from "@/modules/citizen/pages/Profile";
import ProtectedRoute from "@/app/routes/protectedRoute";
import NotFound from "@/shared/NotFound";
import Notifications from "@/modules/citizen/pages/Notifications";

const App = () => {
  return (
    <div className="min-h-screen bg-primaryColor">
      <ToastContainer position="top-right" autoClose={3000} />
      <Navbar />

      <Routes>
        <Route path="/" element={<Home />} />

        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />

        <Route
          path="/profile"
          element={
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
          }
        />

        <Route
          path="/register-complaints"
          element={
            <ProtectedRoute>
              <RegisterComplaints />
            </ProtectedRoute>
          }
        />

        <Route
          path="/my-complaints"
          element={
            <ProtectedRoute>
              <MyComplaints />
            </ProtectedRoute>
          }
        />

        {/* ✅ FIXED DETAILS ROUTE */}
        <Route
          path="/complaints/:id"
          element={
            <ProtectedRoute>
              <ComplaintDetails />
            </ProtectedRoute>
          }
        />
        <Route
          path="/notifications"
          element={
            <ProtectedRoute>
              <Notifications />
            </ProtectedRoute>
          }
        />
        <Route path="/auth" element={<Auth />} />

        <Route path="*" element={<NotFound />} />
      </Routes>

      <Footer />
    </div>
  );
};

export default App;
