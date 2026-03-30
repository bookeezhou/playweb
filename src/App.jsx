import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "./assets/vite.svg";
import heroImg from "./assets/hero.png";
import "./App.css";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import AppLayout from "./ui/AppLayout";
import ScoreList from "./features/score/ScoreList";
import StudentList from "./features/student/StudentList";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<AppLayout />}>
            <Route path="" element={<Navigate to="/score" />} />
            <Route path="/score" element={<ScoreList />} />
            <Route path="/student" element={<StudentList />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
