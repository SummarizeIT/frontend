import { ThemeProvider } from "@/components/theme-provider.tsx";
//import { AuthProvider } from "@/utils/auth/auth-context.tsx";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Landingpage from "./landingpage.tsx";
import Dashboard from "./layouts/Dashboard.tsx";
import SendEmail from "./pages/auth/sendEmail.tsx";
import SignInPage from "./pages/auth/signIn.tsx";
import SignUpPage from "./pages/auth/signUp.tsx";
import NotFoundPage from "./pages/Page404.tsx";
import createStore from 'react-auth-kit/createStore';
import createRefresh from 'react-auth-kit/createRefresh';
import "./styles/index.css";
import { AuthService } from "./client/services.gen.ts";
import AuthProvider from 'react-auth-kit'
import AuthOutlet from '@auth-kit/react-router/AuthOutlet'
import { OpenAPI } from "./client/index.ts";

const refresh = createRefresh({
  interval: 10,
  refreshApiCallback: async (param) => {
    try {
      if(!param.refreshToken)
        throw Error("Refresh token not found. Not Refreshing..")
      const response = await AuthService.refresh({refresh: param.refreshToken});
      OpenAPI.TOKEN = response.token;
      return {
        isSuccess: true,
        newAuthToken: response.refreshToken,
        newAuthTokenExpireIn: response.expiresIn.token,
        newRefreshTokenExpiresIn: response.expiresIn.refreshToken
      }
    }
    catch(error){
      console.error(error)
      return {
        isSuccess: false,
        newAuthToken: ''
      } 
    }
  }
})

const store = createStore({
  authName:'_auth',
  authType:'localstorage',
  refresh: refresh
});

ReactDOM.createRoot(document.getElementById("root")!).render(
    <BrowserRouter>
      <ThemeProvider>
        <AuthProvider store={store}>
          <Routes>
            <Route path="/*" element={<NotFoundPage />} />
            <Route path="/" element={<Landingpage />} />
            <Route path="/signin" element={<SignInPage />} />
            <Route path="/signUp" element={<SignUpPage />} />  
            <Route element={<AuthOutlet fallbackPath='/signin' />}>
              <Route path="/Dashboard" element={<Dashboard />} />
            </Route>
            {/* <Route path="/sendemail" element={<SendEmail />} /> */}
          </Routes>
        </AuthProvider>
      </ThemeProvider>
    </BrowserRouter>
  
);
