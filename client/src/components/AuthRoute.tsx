import { Navigate, Outlet } from "react-router-dom";

interface AuthRouteProps {
  redirectPath?: string;
}

const AuthRoute: React.FC<AuthRouteProps> = ({ redirectPath = "/login" }) => {
  const isAuthenticated = localStorage.getItem("token") !== null;

  if (!isAuthenticated) {
    return <Navigate to={redirectPath} replace />;
  }

  return <Outlet />;
};

export default AuthRoute;
