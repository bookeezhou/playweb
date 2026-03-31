import { Outlet, useLocation } from "react-router-dom";
import Navbar from "../ui/Navbar";
import Toolbar from "../ui/Toolbar";

export default function Home() {
  const location = useLocation();

  return (
    <>
      <Navbar />
      {(location.pathname === "/home/score" ||
        location.pathname === "/home/student") && <Toolbar />}
      <Outlet />
    </>
  );
}
