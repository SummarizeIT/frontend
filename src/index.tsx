import { ThemeProvider } from "@/components/theme-provider.tsx";
import { AuthProvider } from "@/utils/auth/auth-context.tsx";

import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Landingpage from "./landingpage.tsx";
import Dashboard from "./layouts/Dashboard.tsx";
import SendEmail from "./pages/auth/sendEmail.tsx";
import SignInPage from "./pages/auth/signIn.tsx";
import SignUpPage from "./pages/auth/signUp.tsx";
import "./styles/index.css";


ReactDOM.createRoot(document.getElementById("root")!).render(
  
    <BrowserRouter>
      <ThemeProvider>
        <AuthProvider>
          <Routes>
            <Route path="/" element={<Landingpage />} />
            <Route path="/signin" element={<SignInPage />} />
            <Route path="/signUp" element={<SignUpPage />} />
            <Route path="/Dashboard" element={<Dashboard />} />
            <Route path="/sendemail" element={<SendEmail />} />

          </Routes>
        </AuthProvider>
      </ThemeProvider>
    </BrowserRouter>
  
);
