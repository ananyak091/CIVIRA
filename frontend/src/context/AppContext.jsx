import { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { Navigate, useNavigate } from "react-router-dom";

const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(
    localStorage.getItem("CIVIRA_token") || null,
  );
  const [loading, setLoading] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(
    !!localStorage.getItem("CIVIRA_token"),
  );

  const [userData, setUserData] = useState(false);
  const [unreadCount, setUnreadCount] = useState(0);

  const [complaintsData, setComplaintsData] = useState([]);
  const [stats, setStats] = useState({
    registered: 1,
    resolved: 0,
    pending: 0,
    rejected: 0,
  });
  const [recentComplaints, setRecentComplaints] = useState([]);
  const [complaintDetails, setComplaintDetails] = useState([]);
  const [evidence, setEvidence] = useState([]);

  // For Dashboard
  const [summary, setSummary] = useState({
    totalComplaints: 0,
    pending: 0,
    resolved: 0,
    inProgress: 0,
    resolutionRate: 0,
  });

  const [filters, setFilters] = useState({
    state: "All",
    city: "All",
    ward: "All",
    time: "All",
  });

  const [dashboardFilters, setDashboardFilters] = useState({
    states: [],
    cities: [],
    wards: [],
  });
  const [categoryData, setCategoryData] = useState([]);
  const [urgencyData, setUrgencyData] = useState([]);
  const [monthlyData, setMonthlyData] = useState([]);
  const [resolutionTrend, setResolutionTrend] = useState([]);
  const [topWards, setTopWards] = useState([]);

  const navigate = useNavigate();

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

  // <==== Authentication start ====>

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
  const forgetPasswordHandler = async () => {
    if (!email) {
      toast.error("Please enter your email to reset password");
      return;
    }
    try {
    } catch (error) {}
  };

  // LOGOUT
  const logout = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem("CIVIRA_token");
  };

  // <==== Authentication ends ====>

  // <==== Profile & Others ====>

  // GET PROFILE
  const getProfile = async () => {
    try {
      const user = await axios.get(API_BASE_URL + "/api/user/get-profile", {
        headers: { authorization: `Bearer ${token}` },
      });
      console.log("Get profile user data", user);

      if (user) {
        setUserData(user.data.user);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log("Get profile error", error);
      toast.error(error.message);
    }
  };

  // GET MY COMPLAINTS
  const getMyComplaints = async ({
    category = "All",
    status = "All",
    time = "All",
    search = "",
  } = {}) => {
    try {
      const response = await axios.get(
        `${API_BASE_URL}/api/user/my-complaints`,
        {
          headers: {
            authorization: `Bearer ${token}`,
          },
          params: {
            category,
            status,
            time,
            search,
          },
        },
      );

      if (response.data.success) {
        setComplaintsData(response.data.complaints);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleComplaintDetails = async (id) => {
    try {
      console.log("Before Navigate in complaint details");

      console.log("After Navigate in complaint details");
      const complaintDetails = await axios.get(
        `${API_BASE_URL}/api/user/my-complaints/${id}`,
        {
          headers: {
            authorization: `Bearer ${token}`,
          },
        },
      );
      console.log("API Called", complaintDetails);

      if (complaintDetails.data.success) {
        console.log("Get my complaints data", complaintDetails);
        setComplaintDetails(complaintDetails.data.complaint);
        setEvidence(complaintDetails.data.evidence);
        navigate(`/complaints/${id}`);
      } else {
        toast.error(complaintDetails.message);
      }
    } catch (error) {
      console.log("Get Complaints error", error);
      toast.error(error.message);
    }
  };

  // const calCulateComplaintsData = () => {};
  useEffect(() => {
    console.log("complaintsData =", complaintsData);
    console.log("Is array?", Array.isArray(complaintsData));

    console.log("Calculating complaints data");
    let registered = 0;
    let resolved = 0;
    let pending = 0;
    let rejected = 0;

    for (let i = 0; i < complaintsData.length; i++) {
      if (complaintsData[i].complaint_status === "Registered") registered++;
      else if (complaintsData[i].complaint_status === "Resolved") resolved++;
      else if (complaintsData[i].complaint_status === "Pending") pending++;
      else rejected++;
    }
    console.log("Calculating complaints data........................");

    console.log("Registered:", complaintsData.length);

    setStats({ registered, resolved, pending, rejected });
  }, [complaintsData]);

  useEffect(() => {
    if (complaintsData.length > 0) {
      const recents = complaintsData
        .slice()
        .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
        .slice(0, 3)
        .map((item) => ({
          id: item._id,
          title: item.category,
          status: item.complaint_status,
          date: new Date(item.createdAt).toLocaleDateString("en-GB", {
            day: "2-digit",
            month: "short",
            year: "numeric",
          }),
        }));

      setRecentComplaints(recents);
    }
  }, [complaintsData]);

  // When token chnages, update isLoggedIn
  useEffect(() => {
    setIsLoggedIn(!!token);
  }, [token]);

  useEffect(() => {
    if (token) {
      getProfile();
      getMyComplaints();
    } else {
      setUserData(false);
    }
  }, [token]);

  const fetchUnreadCount = async () => {
    try {
      const token = localStorage.getItem("CIVIRA_token");

      console.log("Fetching unread count with token:", token);
      const response = await axios.get(
        `${API_BASE_URL}/api/notification/unread-count`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );
      console.log("Unread count response:", response);
      if (response.data.success) {
        setUnreadCount(response.data.count);
      }
    } catch (error) {
      console.log(error);
    }
  };

  // ------ ------  Dashboard ------- ------- //
  const fetchDashboard = async () => {
    try {
      const response = await api.get("/api/dashboard/stats", {
        params: filters,
      });

      if (response.data.success) {
        setSummary(response.data.summary);
      }
      console.log(response.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchDashboard();
  }, [filters]);

  const fetchDashboardFilters = async () => {
    try {
      const response = await api.get("/api/dashboard/filters", {
        params: {
          state: filters.state,
          city: filters.city,
        },
      });

      if (response.data.success) {
        setDashboardFilters(response.data.filters);
      }
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    fetchDashboardFilters();
  }, [filters.state, filters.city]);

  const fetchCategoryBreakdown = async () => {
    try {
      const response = await api.get("/api/dashboard/category-breakdown", {
        params: filters,
      });

      if (response.data.success) {
        setCategoryData(response.data.categoryData);
      }
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    fetchCategoryBreakdown();
  }, [filters]);

  const fetchUrgencyDistribution = async () => {
    try {
      const response = await api.get("/api/dashboard/urgency-distribution", {
        params: filters,
      });

      if (response.data.success) {
        setUrgencyData(response.data.urgencyData);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchUrgencyDistribution();
  }, [filters]);

  const fetchMonthlyComplaints = async () => {
    try {
      const response = await api.get("/api/dashboard/monthly", {
        params: filters,
      });

      if (response.data.success) {
        setMonthlyData(response.data.monthlyData);
      }
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchMonthlyComplaints();
  }, [filters]);

  const fetchResolutionTrend = async () => {
    try {
      const response = await api.get("/api/dashboard/resolution-trend", {
        params: filters,
      });

      if (response.data.success) {
        setResolutionTrend(response.data.result);
      }

      console.log(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchTopWards = async () => {
    try {
      const response = await api.get("/api/dashboard/top-wards", {
        params: filters,
      });

      console.log(response.data);

      if (response.data.success) {
        setTopWards(response.data.topWards || []);
      } else {
        setTopWards([]);
      }
    } catch (err) {
      console.error(err);
      setTopWards([]);
    }
  };
  useEffect(() => {
    fetchTopWards();
  }, [filters]);

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
        userData,
        setUserData,
        getProfile,
        setComplaintsData,
        complaintsData,
        handleComplaintDetails,
        complaintDetails,
        setComplaintDetails,
        evidence,
        setEvidence,
        stats,
        recentComplaints,
        forgetPasswordHandler,
        setToken,
        setUser,
        getMyComplaints,
        unreadCount,
        setUnreadCount,
        fetchUnreadCount,
        summary,
        setSummary,
        filters,
        setFilters,
        fetchDashboard,
        dashboardFilters,
        setDashboardFilters,
        fetchDashboardFilters,
        categoryData,
        setCategoryData,
        fetchCategoryBreakdown,
        urgencyData,
        setUrgencyData,
        fetchUrgencyDistribution,
        monthlyData,
        setMonthlyData,
        fetchMonthlyComplaints,
        resolutionTrend,
        setResolutionTrend,
        fetchResolutionTrend,
        topWards,
        setTopWards,
        fetchTopWards,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

// Custom hook
export const useAppContext = () => useContext(AppContext);
