import React from "react";

const App = () => {
  return (
    <div className="bg-red-400">
      <ul className="hidden md:flex gap-8 text-gray-700 font-medium">
        <li className="hover:text-primaryColor cursor-pointer">CIVIRA</li>
        <li className="hover:text-primaryColor cursor-pointer">Dashboard</li>
        <li className="hover:text-primaryColor cursor-pointer">
          Register new complaint
        </li>
        <li className="hover:text-primaryColor cursor-pointer">Login</li>
      </ul>
    </div>
  );
};

export default App;
