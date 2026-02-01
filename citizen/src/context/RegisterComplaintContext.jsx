import { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

const RegisterComplaintContext = createContext();

export const AppProvider2 = ({ children }) => {
  const [token, setToken] = useState(
    localStorage.getItem("CIVIRA_token") || null
  );
  const [captures, setCaptures] = useState([]);
  const [step, setStep] = useState(1);
  const totalSteps = 4;
  /* ---------- UI State ---------- */
  const [isCameraOpen, setIsCameraOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [validImages, setValidImages] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  /* ---------- Global State ---------- */

  const [formData, setFormData] = useState({
    ward: "",
    landmark: "",
    address: "",
    category: "",
    description: "",
    notes: "",
  });

  const [errors, setErrors] = useState({});

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

  // handel image validation api call function

  const handelImageValidation = async () => {
    try {
      if (captures.length === 0) {
        toast.error("Please add at least one photo as evidence.");
        return false;
      }
      setIsLoading(true);

      const formData = new FormData();
      captures.forEach((capture, index) => {
        formData.append(`images`, capture.blob, `capture_${index}.jpg`);
      });
      const response = await api.post(
        "/api/images/validate/ml/model/validation",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      console.log("All images valid:", response.data);
      setValidImages(response.data.allValid);
      setIsLoading(false);

      if (response.data.allValid) {
        toast.success("Images validated successfully.");
      } else {
        toast.error("Some images are invalid. Please retake the photos.");
      }
    } catch (error) {
      console.log("Image validation error", error);
      toast.error("Error validating images. Please try again.");
      return false;
    }
  };

  /* ---------- Validation ---------- */
  const validateStep = (currentStep) => {
    const newErrors = {};

    switch (currentStep) {
      case 2:
        if (!formData.ward) newErrors.ward = true;
        if (!formData.address) newErrors.address = true;
        break;

      case 3:
        if (!formData.category) newErrors.category = true;
        if (!formData.description) newErrors.description = true;
        break;

      default:
        break;
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return false;
    }

    return true;
  };

  /* ---------- Submit ---------- */
  const handleSubmit = async () => {
    try {
      setIsSubmitting(true);
      console.log("Submitting:", formData, captures);

      const fd = new FormData();

      /* ----------------------------------
       1️⃣ Add JSON data from formData
    ----------------------------------- */
      fd.append("data", JSON.stringify(formData));

      /* ----------------------------------
       2️⃣ Add metadata for each image
    ----------------------------------- */
      const metaData = captures.map((c) => ({
        lat: c.lat,
        lng: c.lng,
        accuracy: c.accuracy,
        timestamp: c.timestamp,
        isoTime: c.isoTime,
      }));

      fd.append("meta", JSON.stringify(metaData));

      /* ----------------------------------
       3️⃣ Add images (Blob files)
    ----------------------------------- */
      captures.forEach((item, index) => {
        fd.append("images", item.blob, `evidence_${index}.jpg`);
      });

      /* ----------------------------------
       4️⃣ API Submission
    ----------------------------------- */
      const response = await api.post(`/api/user/register-complaint`, fd, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      console.log("Response:", response.data);
      if (response.success) {
        toast.success(response.message);
      } else {
        toast.error(response.error);
      }
      setIsSuccess(true);
    } catch (err) {
      console.error("Submission failed:", err);
    } finally {
      setIsSubmitting(false);
    }
  };
  /* ---------- Navigation ---------- */
  const handleNext = () => {
    if (step === 1 && !validImages) {
      console.log("Validating images...");
      handelImageValidation();

      return;
    } // true
    if (step === 1 && captures.length === 0) {
      return;
    }
    if (step < totalSteps) {
      if (validateStep(step)) {
        setStep((prev) => prev + 1);
      }
    } else {
      handleSubmit();
    }
  };

  return (
    <RegisterComplaintContext.Provider
      value={{
        token,
        setToken,
        captures,
        setCaptures,
        formData,
        setFormData,
        errors,
        setErrors,
        step,
        setStep,
        totalSteps,

        handelImageValidation,
        validateStep,
        handleSubmit,

        validImages,
        setValidImages,

        isCameraOpen,
        setIsCameraOpen,
        isSubmitting,
        isSuccess,
        setIsSuccess,
        handleNext,

        isLoading,
        setIsLoading,
      }}
    >
      {children}
    </RegisterComplaintContext.Provider>
  );
};

// Custom hook
export const useRegisterComplaintContext = () =>
  useContext(RegisterComplaintContext);
