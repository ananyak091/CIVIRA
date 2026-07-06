import { Navigate, useLocation } from "react-router-dom";
import { useAppContext } from "@/context/AppContext";
import { useAdminContext } from "@/context/AdminContext";
import { useOfficerContext } from "@/context/OfficerContext";

const ProtectedRoute = ({ children, role, redirectTo = "/auth" }) => {
  const { token } = useAppContext();
  const { adminToken } = useAdminContext();
  const { officerToken } = useOfficerContext();
  const location = useLocation();

  const isAuthenticated =
    role === "admin" ? adminToken : role === "officer" ? officerToken : token;

  if (!isAuthenticated) {
    return (
      <Navigate
        to={redirectTo}
        replace
        state={{
          message: "Please login to continue",
          from: location.pathname,
        }}
      />
    );
  }

  return children;
};

export default ProtectedRoute;
