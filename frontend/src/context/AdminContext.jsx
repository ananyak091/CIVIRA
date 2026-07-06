import { createContext, useContext, useState } from "react";

const AdminContext = createContext();

export const AdminProvider = ({ children }) => {
  const [adminToken, setAdminToken] = useState(
    localStorage.getItem("adminToken") || "",
  );

  const login = (token) => {
    localStorage.setItem("adminToken", token);
    setAdminToken(token);
  };

  const logout = () => {
    localStorage.removeItem("adminToken");
    setAdminToken("");
  };

  return (
    <AdminContext.Provider
      value={{
        adminToken,
        login,
        logout,
      }}
    >
      {children}
    </AdminContext.Provider>
  );
};

export const useAdminContext = () => useContext(AdminContext);
