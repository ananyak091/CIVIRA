import { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";

const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(
    localStorage.getItem("CIVIRA_token") || null
  );
  const [loading, setLoading] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(
    !!localStorage.getItem("CIVIRA_token")
  );

  const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

  // Axios instance
  const api = axios.create({
    baseURL: API_BASE_URL,
  });

  // Attach token automatically
  api.interceptors.request.use((config) => {
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  });

  // REGISTER
  const register = async (formData) => {
    setLoading(true);
    try {
      const res = await api.post("/api/auth/register", formData);
      return res.data;
    } finally {
      setLoading(false);
    }
  };

  // LOGIN
  const login = async (formData) => {
    setLoading(true);
    try {
      const res = await api.post("/api/auth/login", formData);
      const { token, user } = res.data;
      setToken(token);
      setUser(user);
      localStorage.setItem("CIVIRA_token", token);

      return res.data;
    } finally {
      setLoading(false);
    }
  };

  // LOGOUT
  const logout = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem("CIVIRA_token");
  };

  // When token chnages, update isLoggedIn
  useEffect(() => {
    setIsLoggedIn(!!token);
  }, [token]);

  return (
    <AppContext.Provider
      value={{
        user,
        token,
        loading,
        register,
        login,
        logout,
        isLoggedIn,
        setIsLoggedIn,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

// Custom hook
export const useAppContext = () => useContext(AppContext);
