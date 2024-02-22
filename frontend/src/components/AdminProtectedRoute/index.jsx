import Cookies from "js-cookie";
import { Navigate, Outlet } from "react-router-dom";

const AdminProtectedRoute = () => {
  const jwtToken = Cookies.get("admin_jwt_token");

  if (!jwtToken) {
    return <Navigate to="/admin/login" replace />;
  }

  return <Outlet />;
};

export default AdminProtectedRoute;
