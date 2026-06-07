import React from "react";
import { testimonials } from "@/assets/asset";

export const Testimonial = () => {
  return (
    <div className="py-12">
      {/* Heading */}
      <h1 className="text-3xl text-blue-700 uppercase font-bold text-center mb-10">
        Citizen Testimonials
      </h1>

      {/*Testimonials */}
      <div className="overflow-hidden max-w-6xl mx-auto px-4">
        <div className="flex gap-6 animate-scroll hover:pause-animation">
          {[...testimonials, ...testimonials].map((testimonial, index) => (
            <div
              key={index}
              className="min-w-[300px] bg-white border border-blue-400 rounded-md p-6"
            >
              {/* Image */}
              <div className="w-14 h-14 mx-auto mb-3 flex items-center justify-center border border-slate-300 rounded-full bg-slate-50">
                <img
                  src={testimonial.image}
                  alt="Citizen"
                  className="w-10 h=10 "
                />
              </div>
              {/* Text */}

              <p className="text-sm text-slate-600 text-center">
                {testimonial.review}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
