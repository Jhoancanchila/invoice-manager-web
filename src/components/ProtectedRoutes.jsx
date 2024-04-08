import { Navigate, Outlet } from 'react-router-dom';
import { Cookies } from "react-cookie";

const ProtectedRoutes = () => {
  const cookies = new Cookies();
  const isAuthenticated = cookies.get("token");

 return isAuthenticated ? <Outlet /> : <Navigate to="/" replace />;
};

export default ProtectedRoutes;