import React from "react";
import { Check } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useRegisterComplaintContext } from "../../context/RegisterComplaintContext";

const SuccessModal = ({ onClose }) => {
  const navigate = useNavigate();

  const handleSubmitAnother = () => {
    onClose();
    navigate("/register-complaints");
  };
  const handleMyComplaints = () => {
    onClose();
    navigate("/my-complaints");
  };
  return (
    <div className="fixed inset-0 z-[100] bg-slate-900/20 backdrop-blur-md flex items-center justify-center p-4">
      <div className="w-full max-w-sm p-12 text-center bg-white shadow-2xl rounded-3xl animate-in zoom-in-95">
        <div className="flex items-center justify-center w-20 h-20 mx-auto mb-6 text-4xl border-2 rounded-full bg-emerald-50 text-emerald-500 border-emerald-500">
          <Check size={40} />
        </div>
        <h2 className="mb-2 text-2xl font-black text-slate-900">
          Report Submitted!
        </h2>
        <p className="mb-8 text-slate-500">
          Data successfully uploaded via FormData.
        </p>
        <button
          onClick={handleMyComplaints}
          className="w-full py-3.5 rounded-xl font-bold bg-slate-900 text-white"
        >
          View My Complaints
        </button>
        <button
          onClick={handleSubmitAnother}
          className="w-full py-3.5 rounded-xl font-bold bg-slate-900 text-white"
        >
          Submit Another Report
        </button>
      </div>
    </div>
  );
};

export default SuccessModal;
