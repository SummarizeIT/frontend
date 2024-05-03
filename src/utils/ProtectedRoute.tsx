import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from "@/utils/auth-context";

interface ProtectedRouteProps {
    children: React.ReactNode;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
    const auth = useAuth();
    const location = useLocation();
    if (!auth || !auth.isAuthenticated) {
        return <Navigate to="/signIn" state={{ from: location }} replace />;
    }

    return <>{children}</>;
};

export default ProtectedRoute;
