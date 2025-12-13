import React from "react";
import { Route, Routes } from "react-router-dom";
import { Home } from "./pages/Home";
import { Dashboard } from "./pages/Dashboard";
import { RegisterComplaints } from "./pages/RegisterComplaints";
import { MyComplaints } from "./pages/MyComplaints";
import { ComplaintDetails } from "./pages/ComplaintDetails";
import { Auth } from "./pages/Auth";
import Navbar from "./components/Navbar";
import { Footer } from "./components/Footer";

const App = () => {
  return (
    <div className="min-h-screen bg-primaryColor">
      <Navbar></Navbar>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/register-complaints" element={<RegisterComplaints />} />
        <Route path="/my-complaints" element={<MyComplaints />} />
        <Route path="/complaint-details" element={<ComplaintDetails />} />
        <Route path="/auth" element={<Auth />} />
      </Routes>
      <Footer></Footer>
    </div>
  );
};

export default App;
