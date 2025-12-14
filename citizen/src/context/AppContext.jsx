import { createContext } from "react";

import { toast } from "react-toastify";
import axios from "axios";
import { useState } from "react";
import { useEffect } from "react";
export const AppContext = createContext();

const AppContextProvider = ({ children }) => {
  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

export default AppContextProvider;
