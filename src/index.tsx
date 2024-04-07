import { ThemeProvider } from "@/components/theme-provider.tsx";
import React from "react";
import ReactDOM from "react-dom/client";
import SignInPage from "./pages/auth/signIn.tsx";
import "./styles/index.css";
import Landingpage from "./landingpage.tsx";
import { BrowserRouter, Routes,Route} from "react-router-dom";
import SignUpPage from "./pages/auth/signUp.tsx";
import Dashboard from "./layouts/Dashboard.tsx"

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <BrowserRouter>
    <ThemeProvider>
      <Routes>
        <Route path="/" element={<Landingpage/>} />
        <Route path="/signIn" element={<SignInPage />} />
        <Route path="/signUp" element={<SignUpPage />} />
        <Route path="/Dashboard" element={<Dashboard/>}/>
      </Routes>
      </ThemeProvider>
    </BrowserRouter>
    
  </React.StrictMode>
);
