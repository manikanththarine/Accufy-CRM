import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "./contexts/AuthContext";

const ProtectedRoute = () => {
const { isAuthenticated, isInitializing } = useAuth();
    // If you have a loading state, wait for it!
    if (isInitializing) return <div>Loading...</div>; 

    return isAuthenticated ? <Outlet /> : <Navigate to="/signin" replace />;
};

export default ProtectedRoute;