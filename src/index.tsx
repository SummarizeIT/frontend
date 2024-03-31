import { ThemeProvider } from "@/components/theme-provider.tsx";
import React from "react";
import ReactDOM from "react-dom/client";
import SignInPage from "./pages/auth/signIn.tsx";
import SignUpPage from "./pages/auth/signUp.tsx";
import "./styles/index.css";
import Landingpage from "./landingpage.tsx";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <ThemeProvider>
      <SignUpPage />
      <SignInPage />
      <Landingpage />
    </ThemeProvider>
  </React.StrictMode>
);
