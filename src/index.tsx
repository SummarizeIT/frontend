import React from "react";
import ReactDOM from "react-dom/client";
import LandingPage from "./landingpage.tsx";
import { ThemeProvider } from "@/components/theme-provider.tsx";
import "./styles/index.css";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <ThemeProvider>
      <LandingPage />
    </ThemeProvider>
  </React.StrictMode>
);
