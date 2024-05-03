import { ThemeProvider } from "@/components/theme-provider.tsx";
import { AuthProvider } from "@/utils/auth-context";
import ProtectedRoute from "@/utils/ProtectedRoute.tsx";
import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Landingpage from "./landingpage.tsx";
import Dashboard from "./layouts/Dashboard.tsx";
import SignInPage from "./pages/auth/signIn.tsx";
import SignUpPage from "./pages/auth/signUp.tsx";
import "./styles/index.css";


ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <BrowserRouter>
      <ThemeProvider>
        <AuthProvider>
          <Routes>
            <Route path="/" element={<Landingpage />} />
            <Route path="/signIn" element={<SignInPage />} />
            <Route path="/signUp" element={<SignUpPage />} />
            <Route path="/Dashboard" element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            } />
            
          </Routes>
        </AuthProvider>
      </ThemeProvider>
    </BrowserRouter>
  </React.StrictMode>
);
