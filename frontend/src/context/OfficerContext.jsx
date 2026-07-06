import { createContext, useContext, useState } from "react";

const OfficerContext = createContext();

export const OfficerProvider = ({ children }) => {
  const [officerToken, setOfficerToken] = useState(
    localStorage.getItem("officerToken") || "",
  );

  const [officer, setOfficer] = useState(
    JSON.parse(localStorage.getItem("officer")) || null,
  );

  const login = (token, officerData) => {
    localStorage.setItem("officerToken", token);
    localStorage.setItem("officer", JSON.stringify(officerData));

    setOfficerToken(token);
    setOfficer(officerData);
  };

  const logout = () => {
    localStorage.removeItem("officerToken");
    localStorage.removeItem("officer");

    setOfficerToken("");
    setOfficer(null);
  };

  return (
    <OfficerContext.Provider
      value={{
        officerToken,
        officer,
        login,
        logout,
      }}
    >
      {children}
    </OfficerContext.Provider>
  );
};

export const useOfficerContext = () => useContext(OfficerContext);
