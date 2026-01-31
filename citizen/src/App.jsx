import React from "react";
import { Route, Routes } from "react-router-dom";
import { Home } from "./pages/Home";
import Dashboard from "./pages/Dashboard";
import RegisterComplaints from "./pages/RegisterComplaints";
import MyComplaints from "./pages/MyComplaints";
import ComplaintDetails from "./pages/ComplaintDetails";
import Auth from "./pages/Auth";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Profile from "./pages/Profile";
import ProtectedRoute from "./routes/protectedRoute";
import NotFound from "./pages/NotFounPage";
import Notifications from "./pages/Notifications";
import Officer from "./pages/Officer/Officer";

const App = () => {
  return (
    <div className="min-h-screen bg-primaryColor">
      <ToastContainer position="top-right" autoClose={3000} />
      <Navbar />

      <Routes>
        <Route path="/" element={<Home />} />

        <Route path="/dashboard" element={<Dashboard />} />

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
        <Route path="/officer/login" element={<Officer />} />
        <Route path="*" element={<NotFound />} />
      </Routes>

      <Footer />
    </div>
  );
};

export default App;
