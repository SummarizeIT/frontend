import { ThemeProvider } from "@/components/theme-provider.tsx";
import React from "react";
import ReactDOM from "react-dom/client";
import SignInPage from "./pages/auth/signIn.tsx";
import "./styles/index.css";
import Landingpage from "./landingpage.tsx";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import SignUpPage from "./pages/auth/signUp.tsx";
import Dashboard from "./layouts/Dashboard.tsx"
import SendEmail from "./pages/auth/sendEmail.tsx";
import ForgotPassword from "./pages/auth/forgotPassword.tsx";
import ProfileSettings from "./pages/Settings/profile.tsx";
import ProfileNotifications from "./pages/Settings/notifications.tsx";
import Media from "./pages/Media/media.tsx";
import QuickAccess from "./pages/QuickAccess/quickaccess.tsx";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <BrowserRouter>
      <ThemeProvider>
        <Routes>
          <Route path="/" element={<Landingpage />} />
          <Route path="/signIn" element={<SignInPage />} />
          <Route path="/signUp" element={<SignUpPage />} />
          <Route path="/Dashboard" element={<Dashboard />} />
          <Route path="/sendEmail" element={<SendEmail />} />
          <Route path="/sendEmail/forgotPassword" element={<ForgotPassword />} />
          <Route path="/settings/profile" element={<ProfileSettings />} />
          <Route path="/settings/notifications" element={<ProfileNotifications />} />
          <Route path="/media" element={<Media />} />
          <Route path="/quickAccess" element={<QuickAccess />} />
        </Routes>
      </ThemeProvider>
    </BrowserRouter>

  </React.StrictMode>
);
