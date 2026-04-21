import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "./assets/vite.svg";
import heroImg from "./assets/hero.png";
import "./App.css";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import AppLayout from "./ui/AppLayout";
import ScoreList from "./features/score/ScoreList";
import StudentList from "./features/student/StudentList";
import Login from "./features/auth/Login";
import Signup from "./features/auth/Signup";
import Home from "./pages/Home";
import Info from "./features/user/Info";
import ScoreEdit from "./features/score/ScoreEdit";
import StudentEdit from "./features/student/StudentEdit";
import ScoreUpload from "./features/score/ScoreUpload";
import StudentCreate from "./features/student/StudentCreate";
import { Toaster } from "sonner";
import { DevTools } from "jotai-devtools";
import "jotai-devtools/styles.css";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<AppLayout />}>
            <Route path="" element={<Navigate to="/home/score" />} />
            <Route path="home" element={<Home />}>
              <Route path="score">
                <Route path="" element={<ScoreList />} />
                <Route path=":id" element={<ScoreEdit />} />
                <Route path="upload" element={<ScoreUpload />} />
              </Route>

              <Route path="student">
                <Route path="" element={<StudentList />} />
                <Route path=":id" element={<StudentEdit />} />
                <Route path="create" element={<StudentCreate />} />
              </Route>
              <Route path="info" element={<Info />} />
            </Route>
            <Route path="login" element={<Login />} />
            <Route path="signup" element={<Signup />} />
          </Route>
        </Routes>
      </BrowserRouter>
      <Toaster position="top-right" />
      <DevTools />
    </>
  );
}

export default App;
