import React from "react";
import { FaMobileAlt, FaMapMarkedAlt } from "react-icons/fa";
import { FaListCheck } from "react-icons/fa6";

const HowItWork = () => {
  const steps = [
    {
      icon: <FaMobileAlt className="text-5xl text-blue-600" />,
      title: "1. Upload Photo",
      desc: "Take a photo of the issue. Our system automatically detects the GPS location.",
    },
    {
      icon: <FaMapMarkedAlt className="text-5xl text-blue-600" />,
      title: "2. Pin & Submit",
      desc: "Confirm the exact location on the map, add details, and submit your report.",
    },
    {
      icon: <FaListCheck className="text-5xl text-blue-600" />,
      title: "3. Track Status",
      desc: "Watch the progress: Assigned → In-Progress → Resolved with proof.",
    },
  ];

  return (
    <section className="py-16 bg-blue-50" id="how-it-works">
      <div className="max-w-6xl px-4 mx-auto">
        <h2 className="text-3xl font-bold tracking-wide text-center text-blue-700 uppercase">
          How It Works
        </h2>

        <div className="w-16 h-1 mx-auto mt-3 mb-12 bg-green-500"></div>

        <div className="grid gap-10 md:grid-cols-3">
          {steps.map((step, index) => (
            <div
              key={index}
              className="p-8 text-center transition-all duration-300 transform bg-white shadow-lg rounded-xl hover:-translate-y-2 hover:shadow-xl"
            >
              <div className="flex justify-center mb-6">{step.icon}</div>

              <h3 className="mb-3 text-xl font-semibold text-gray-800">
                {step.title}
              </h3>

              <p className="text-gray-600">{step.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWork;
