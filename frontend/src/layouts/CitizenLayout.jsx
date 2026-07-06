import { Outlet } from "react-router-dom";
import Navbar from "@/shared/components/Navbar";
import Footer from "@/shared/components/Footer";

const CitizenLayout = () => {
  return (
    <>
      <Navbar />

      <main className="min-h-screen bg-primaryColor">
        <Outlet />
      </main>

      <Footer />
    </>
  );
};

export default CitizenLayout;
