import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { isAuthenticated } from "../hooks/useAuth";

export default function AppLayout() {
  const location = useLocation();
  const navigate = useNavigate();

  async function isLogin() {
    const isAuth = await isAuthenticated();
    if (!isAuth) {
      navigate("/login");
    }
  }
  if (location.pathname !== "/login" && location.pathname != "/signup") {
    isLogin();
  }
  return (
    <>
      <Outlet />
    </>
  );
}
