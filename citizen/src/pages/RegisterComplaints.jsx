import React, { useState } from "react";
import { Loader2, Send, ArrowRight } from "lucide-react";
import ProgressBar from "../components/RegisterComponent/ProgressBar";
import CameraOverlay from "../components/RegisterComponent/CameraOverlay";
import SuccessModal from "../components/RegisterComponent/SuccessModal";
import StepEvidence from "../components/RegisterComponent/StepEvidence";
import StepLocation from "../components/RegisterComponent/StepLocation";
import StepDetails from "../components/RegisterComponent/StepDetails";
import StepReview from "../components/RegisterComponent/StepReview";

/* ---------- Helper Utility ---------- */
const dataURLtoBlob = (dataurl) => {
  if (!dataurl) return null;

  const parts = dataurl.split(",");
  if (parts.length < 2) return null;

  const mime = parts[0].match(/:(.*?);/)?.[1];
  const binary = atob(parts[1]);
  const u8arr = new Uint8Array(binary.length);

  for (let i = 0; i < binary.length; i++) {
    u8arr[i] = binary.charCodeAt(i);
  }

  return new Blob([u8arr], { type: mime });
};

const RegisterComplaints = () => {
  /* ---------- Global State ---------- */
  const [step, setStep] = useState(1);
  const totalSteps = 4;

  const [formData, setFormData] = useState({
    ward: "",
    landmark: "",
    address: "",
    category: "",
    description: "",
    notes: "",
  });

  const [captures, setCaptures] = useState([]);
  const [errors, setErrors] = useState({});

  /* ---------- UI State ---------- */
  const [isCameraOpen, setIsCameraOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  /* ---------- Handlers ---------- */
  const handleInputChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({ ...prev, [name]: value }));

    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: null }));
    }
  };

  const handleCapture = (newCapture) => {
    const captureWithBlob = {
      ...newCapture,
      blob: dataURLtoBlob(newCapture.previewUrl),
    };

    setCaptures((prev) => [...prev, captureWithBlob]);
    setIsCameraOpen(false);
  };

  const removePhoto = (id) => {
    setCaptures((prev) => prev.filter((c) => c.id !== id));
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

  /* ---------- Navigation ---------- */
  const handleNext = () => {
    if (step < totalSteps) {
      if (validateStep(step)) {
        setStep((prev) => prev + 1);
      }
    } else {
      handleSubmit();
    }
  };

  /* ---------- Submit ---------- */
  const handleSubmit = async () => {
    try {
      setIsSubmitting(true);
      console.log("Submitting:", formData, captures);

      await new Promise((res) => setTimeout(res, 2000));
      setIsSuccess(true);
    } catch (err) {
      console.error("Submission failed:", err);
    } finally {
      setIsSubmitting(false);
    }
  };

  const resetForm = () => {
    setStep(1);
    setFormData({
      ward: "",
      landmark: "",
      address: "",
      category: "",
      description: "",
      notes: "",
    });
    setCaptures([]);
    setErrors({});
    setIsSuccess(false);
  };

  return (
    <div className="relative flex flex-col min-h-screen overflow-x-hidden font-sans bg-slate-50 text-slate-800">
      {/* Camera Overlay */}
      {isCameraOpen && (
        <CameraOverlay
          onCapture={handleCapture}
          onClose={() => setIsCameraOpen(false)}
          photoCount={captures.length}
        />
      )}

      {/* Success Modal */}
      {isSuccess && <SuccessModal onClose={resetForm} />}

      {/* Main Content */}
      <div className="relative z-10 w-full max-w-4xl px-6 mx-auto mt-10 mb-20">
        <ProgressBar currentStep={step} totalSteps={totalSteps} />

        <div className="bg-white/70 backdrop-blur-xl border border-white shadow-xl rounded-3xl p-6 md:p-10 min-h-[450px]">
          {step === 1 && (
            <StepEvidence
              captures={captures}
              onOpenCam={() => setIsCameraOpen(true)}
              onRemove={removePhoto}
            />
          )}

          {step === 2 && (
            <StepLocation
              formData={formData}
              onChange={handleInputChange}
              errors={errors}
              captures={captures}
              setFormData={setFormData}
              setErrors={setErrors}
            />
          )}

          {step === 3 && (
            <StepDetails
              formData={formData}
              onChange={handleInputChange}
              errors={errors}
            />
          )}

          {step === 4 && <StepReview formData={formData} captures={captures} />}

          {/* Navigation Buttons */}
          <div className="flex justify-between mt-10">
            <button
              onClick={() => setStep((s) => s - 1)}
              disabled={step === 1 || isSubmitting}
              className={`px-8 py-3.5 rounded-xl font-bold transition-all ${
                step === 1
                  ? "opacity-0 pointer-events-none"
                  : "text-slate-500 hover:text-slate-800 hover:bg-slate-100"
              }`}
            >
              Back
            </button>

            <button
              onClick={handleNext}
              disabled={isSubmitting}
              className={`px-8 py-3.5 rounded-xl font-bold flex items-center gap-3 shadow-lg transition-all ${
                step === totalSteps
                  ? "bg-emerald-500 hover:bg-emerald-600 text-white"
                  : "bg-blue-600 hover:bg-blue-700 text-white"
              }`}
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="animate-spin" size={18} />
                  Uploading...
                </>
              ) : step === totalSteps ? (
                <>
                  <Send size={18} />
                  Submit Report
                </>
              ) : (
                <>
                  <ArrowRight size={18} />
                  Next Step
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegisterComplaints;
