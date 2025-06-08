import { Navigate, useLocation, Outlet } from "react-router-dom";
import AppLayout from "../layout/AppLayout";

const ProtectedRoute = () => {
  const location = useLocation();
  const isAuthenticated = localStorage.getItem("token") !== null;

  if (!isAuthenticated) {
    // Redirect to login page with the return url
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return (
    <AppLayout>
      <Outlet />
    </AppLayout>
  );
};

export default ProtectedRoute;
