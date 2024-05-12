import PublicView from "@/components/mediaPage/publicview.tsx";
import { ThemeProvider } from "@/components/theme-provider.tsx";
import AuthOutlet from '@auth-kit/react-router/AuthOutlet';
import AuthProvider from 'react-auth-kit';
import createRefresh from 'react-auth-kit/createRefresh';
import createStore from 'react-auth-kit/createStore';
import ReactDOM from "react-dom/client";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { OpenAPI } from "./client/index.ts";
import { AuthService } from "./client/services.gen.ts";
import Landingpage from "./landingpage.tsx";
import Dashboard from "./layouts/Dashboard.tsx";
import Media from "./pages/Media/media.tsx";
import Mediaview from "./pages/Media/mediaview.tsx";
import NotFoundPage from "./pages/Page404.tsx";
import NotificationsSettings from "./pages/Settings/notifications.tsx";
import ProfileSettings from "./pages/Settings/profile.tsx";
import ForgotPassword from "./pages/auth/forgotPassword.tsx";
import SendEmail from "./pages/auth/sendEmail.tsx";
import SignInPage from "./pages/auth/signIn.tsx";
import SignUpPage from "./pages/auth/signUp.tsx";
import "./styles/index.css";
import { UserProvider } from './utils/user/user-context';
import EditMedia from "./pages/Media/editMedia.tsx";
const refresh = createRefresh({
  interval: 10,
  refreshApiCallback: async (param) => {
    try {
      if (!param.refreshToken)
        throw Error("Refresh token not found. Not Refreshing..")
      const response = await AuthService.refresh({ refresh: param.refreshToken });
      OpenAPI.TOKEN = response.token;
      return {
        isSuccess: true,
        newAuthToken: response.refreshToken,
        newAuthTokenExpireIn: response.expiresIn.token,
        newRefreshTokenExpiresIn: response.expiresIn.refreshToken
      }
    }
    catch (error) {
      console.error(error)
      return {
        isSuccess: false,
        newAuthToken: ''
      }
    }
  }
})

const store = createStore({
  authName: 'token',
  authType: 'localstorage',
  refresh: refresh
});

ReactDOM.createRoot(document.getElementById("root")!).render(
  <BrowserRouter>
    <ThemeProvider>
      <AuthProvider store={store}>
        <UserProvider>
          <Routes>
            <Route path="/*" element={<NotFoundPage />} />
            <Route path="/" element={<Landingpage />} />
            <Route path="/signin" element={<SignInPage />} />
            <Route path="/signUp" element={<SignUpPage />} />
            <Route path="/sendemail" element={<SendEmail />} />
            <Route path="/sendEmail/forgotPassword/:token" element={<ForgotPassword />} />
            <Route path="/publicview/:id" element={<PublicView />} />



            <Route element={<AuthOutlet fallbackPath='/signin' />}>
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/Media" element={<Media />} />
              <Route path="/settings/profile" element={<ProfileSettings />} />
              <Route path="/settings/notifications" element={<NotificationsSettings />} />
              <Route path="/view/:id" element={<Mediaview />} />
              <Route path="/edit/:id" element={<EditMedia />} />
            </Route>

          </Routes>
        </UserProvider>
      </AuthProvider>
    </ThemeProvider>
  </BrowserRouter>

);
