import React from "react";
import { categories } from "@/assets/asset";

export const Category = () => {
  return (
    <div className="py-12 ">
      {/* Heading */}
      <h1 className="text-3xl text-blue-700 uppercase font-bold text-center mb-10">
        Categories We Solve
      </h1>

      {/* Catgories Grid */}
      <div className="max-w-6xl mx-auto px-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5">
        {categories.map((categories) => (
          <div
            key={categories.id}
            className="flex flex-col items-center text-center bg-white border border-slate-300 p-6 rounded-xl shadow-md hover:border-slate-600 hover:shadow-lg transition"
          >
            <img
              className="w-22 h-22 mb-4 rounded-lg"
              src={categories.image}
              alt={categories.title}
            />
            <div>
              <p className="text-lg font-semibold text-slate-800">
                {categories.title}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
