import { Outlet } from "react-router-dom";
import Navbar from "@/shared/components/Navbar";
import Footer from "@/shared/components/Footer";

const AuthLayout = () => {
  return (
    <>
      <Navbar />

      <main className="min-h-screen bg-primaryColor flex items-center justify-center">
        <Outlet />
      </main>
      {/* hiiiiiiiiii */}
      <Footer />
    </>
  );
};

export default AuthLayout;
