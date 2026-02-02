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
      const user = await axios.get(API_BASE_URL + "api/user/get-profile", {
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
  const getMyComplaints = async () => {
    try {
      const complaints = await axios.get(
        API_BASE_URL + "api/user/my-complaints",
        {
          headers: { authorization: `Bearer ${token}` },
        },
      );
      console.log("Get my complaints data", complaints);

      if (complaints) {
        setComplaintsData(complaints.data.complaints);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log("Get Complaints error", error);
      toast.error(error.message);
    }
  };

  const handleComplaintDetails = async (id) => {
    try {
      console.log("Before Navigate in complaint details");

      console.log("After Navigate in complaint details");
      const complaintDetails = await axios.get(
        `${API_BASE_URL}api/user/my-complaints/${id}`,
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
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

// Custom hook
export const useAppContext = () => useContext(AppContext);
