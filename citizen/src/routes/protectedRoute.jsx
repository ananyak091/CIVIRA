import { Navigate, useLocation } from "react-router-dom";
import { useAppContext } from "../context/AppContext";

const ProtectedRoute = ({ children }) => {
  const { token } = useAppContext();
  const location = useLocation();

  if (!token) {
    return (
      <Navigate
        to="/auth"
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
