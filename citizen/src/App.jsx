import React from "react";
import { Route, Routes } from "react-router-dom";
import { Home } from "./pages/Home";
import { Dashboard } from "./pages/Dashboard";
import RegisterComplaints from "./pages/RegisterComplaints";
import { MyComplaints } from "./pages/MyComplaints";
import { ComplaintDetails } from "./pages/ComplaintDetails";
import Auth from "./pages/Auth";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Profile from "./pages/Profile";
import ProtectedRoute from "./routes/protectedRoute";
import NotFound from "./pages/NotFounPage";

const App = () => {
  return (
    <div className="min-h-screen bg-primaryColor">
      <ToastContainer position="top-right" autoClose={3000} />
      <Navbar></Navbar>
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
        <Route
          path="/complaint-details"
          element={
            <ProtectedRoute>
              <ComplaintDetails />
            </ProtectedRoute>
          }
        />
        <Route path="/auth" element={<Auth />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
      <div>
        <Footer></Footer>
      </div>
    </div>
  );
};

export default App;
