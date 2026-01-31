import React, { useState } from "react";
import { Loader2, Send, ArrowRight } from "lucide-react";
import ProgressBar from "../components/RegisterComponent/ProgressBar";
import CameraOverlay from "../components/RegisterComponent/CameraOverlay";
import SuccessModal from "../components/RegisterComponent/SuccessModal";
import StepEvidence from "../components/RegisterComponent/StepEvidence";
import StepLocation from "../components/RegisterComponent/StepLocation";
import StepDetails from "../components/RegisterComponent/StepDetails";
import StepReview from "../components/RegisterComponent/StepReview";
import { GrValidate } from "react-icons/gr";
import { useRegisterComplaintContext } from "../context/RegisterComplaintContext";

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
  // useAppContext data is here ...
  const {
    handelImageValidation,
    captures,
    setCaptures,
    step,
    setStep,
    totalSteps,
    token,
    setToken,
    handleNext,
    validateStep,
    formData,
    setFormData,
    errors,
    setErrors,
    handleSubmit,
    isCameraOpen,
    setIsCameraOpen,
    isSubmitting,
    setIsSubmitting,
    isSuccess,
    setIsSuccess,
    validImages,
    setValidImages,
  } = useRegisterComplaintContext();

  // useState hooks can be added here ...

  /* ---------- Handlers ---------- */
  const handleInputChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({ ...prev, [name]: value }));

    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: null }));
    }
  };

  // capture photo function
  const handleCapture = (newCapture) => {
    if (validImages) return;
    const captureWithBlob = {
      ...newCapture,
      blob: dataURLtoBlob(newCapture.previewUrl),
    };

    setCaptures((prev) => [...prev, captureWithBlob]);
    setIsCameraOpen(false);
  };

  // remove photo function
  const removePhoto = (id) => {
    if (validImages) return;
    setCaptures((prev) => prev.filter((c) => c.id !== id));
  };

  // Reset Form
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
      {/* Camera Overlay means staring camera open camera  */}
      {isCameraOpen && !validImages && (
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
        {/* this is ProgressBar */}
        <ProgressBar currentStep={step} totalSteps={totalSteps} />
        {/* this is the main box */}
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
                  : step === 1 && !validImages
                    ? "bg-yellow-500 hover:bg-yellow-600 text-white"
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
              ) : step === 1 && !validImages ? (
                <>
                  <GrValidate size={18} />
                  Validate your Photos
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
