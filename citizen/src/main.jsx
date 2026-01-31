import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { BrowserRouter } from "react-router-dom";
import { AppProvider } from "./context/AppContext.jsx";
import { AppProvider2 } from "./context/RegisterComplaintContext.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <AppProvider2>
      <AppProvider>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </AppProvider>
    </AppProvider2>
  </StrictMode>,
);
