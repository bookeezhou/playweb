import { Outlet } from "react-router-dom";
import Navbar from "../ui/Navbar";

export default function Home() {
  return (
    <>
      <Navbar />
      <Outlet />
    </>
  );
}
