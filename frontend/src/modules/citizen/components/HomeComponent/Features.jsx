import React from "react";
import {
  FaCameraRetro,
  FaLocationCrosshairs,
  FaBell,
  FaBroom,
  FaChartPie,
  FaUserShield,
} from "react-icons/fa6";

const Features = () => {
  const features = [
    {
      icon: <FaCameraRetro />,
      title: "Photo-based Reporting",
      desc: "Just snap a picture to start the reporting process.",
    },
    {
      icon: <FaLocationCrosshairs />,
      title: "Auto Location Detection",
      desc: "Automatically grabs precise GPS coordinates.",
    },
    {
      icon: <FaBell />,
      title: "Real-time Notifications",
      desc: "Get SMS/Email updates on status changes.",
    },
    {
      icon: <FaBroom />,
      title: "Before/After Verification",
      desc: "Issues are closed only with visual proof.",
    },
    {
      icon: <FaChartPie />,
      title: "Public Dashboard",
      desc: "Transparent view of city-wide complaint statistics.",
    },
    {
      icon: <FaUserShield />,
      title: "Officer Assignment System",
      desc: "Auto-routing to the correct municipality department.",
    },
  ];

  return (
    // CHANGED: py-16 is big for mobile. Used py-12 for mobile, md:py-20 for desktop
    <section id="features" className="py-12 bg-gray-100 md:py-20">
      <div className="max-w-6xl px-4 mx-auto sm:px-6 lg:px-8">
        {/* Title Section */}
        <div className="mb-12 text-center md:mb-16">
          {/* CHANGED: Text scales from 2xl (mobile) to 4xl (desktop) */}
          <h2 className="text-2xl font-bold tracking-wide text-blue-700 uppercase md:text-3xl lg:text-4xl">
            Key Features
          </h2>
          <div className="w-16 h-1 mx-auto mt-3 bg-green-500 rounded-full"></div>
        </div>

        {/* Grid Layout */}
        {/* CHANGED: 
            1. gap-6 on mobile, gap-8 on desktop for better breathing room.
            2. Switched sm:grid-cols-2 to md:grid-cols-2. 
               (Sometimes 2 cols on small phones looks cramped, md is safer for tablets).
        */}
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 md:gap-10">
          {features.map((feature, index) => (
            <div
              key={index}
              // CHANGED: p-6 for mobile to save space, p-8 for desktop
              className="p-6 text-center transition-all duration-300 bg-white border border-transparent shadow-md rounded-xl md:p-8 hover:-translate-y-2 hover:shadow-xl hover:border-blue-100"
            >
              {/* Icon */}
              {/* CHANGED: Icon size 4xl for mobile, 5xl for desktop */}
              <div className="flex justify-center mb-4 text-4xl text-blue-600 md:text-5xl md:mb-6">
                {feature.icon}
              </div>

              {/* Title */}
              <h4 className="mb-2 text-lg font-semibold text-gray-800 md:text-xl md:mb-3">
                {feature.title}
              </h4>

              {/* Description */}
              <p className="text-sm leading-relaxed text-gray-600 md:text-base">
                {feature.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
