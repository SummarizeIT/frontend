import { createContext, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { MeResponse, AccountService } from "@/client";
import useSignOut from "react-auth-kit/hooks/useSignOut";
import useAuthHeader from "react-auth-kit/hooks/useAuthHeader";
import useIsAuthenticated from "react-auth-kit/hooks/useIsAuthenticated";
import { OpenAPI } from "@/client";

interface UserContextType {
  getUser: () => Promise<MeResponse | null>;
  resetUser: () => Promise<void>;
}

const UserContext = createContext<UserContextType>(null!);

export const UserProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const signOut = useSignOut();
  const navigate = useNavigate();
  const isAuthenticated = useIsAuthenticated();
  const authHeader = useAuthHeader();
  const [user, setUser] = useState<MeResponse | null>(null);

  const getUser = async () => {
    if (user) return user;
    let currentUser = null;
    try {
      if (isAuthenticated) OpenAPI.TOKEN = authHeader!.substring(7);
      currentUser = await AccountService.me();
      setUser(currentUser);
    } catch (err) {
      console.log("Failed to get user info, logging out..", err);
      resetUser();
    }
    return currentUser;
  };

  const resetUser = async () => {
    setUser(null);
    signOut();
    navigate("/signin");
  }

  return (
    <UserContext.Provider value={{ getUser, resetUser }}>{children}</UserContext.Provider>
  );
};

export const useUserContext = () => useContext(UserContext);
