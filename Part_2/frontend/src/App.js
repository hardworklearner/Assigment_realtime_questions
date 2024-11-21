import "./App.css";
import React from "react";
import { Routes, Route } from "react-router-dom"; // Remove BrowserRouter here
import Login from "./components/Login";
import Signup from "./components/Signup";
import QuizPage from "./components/QuizPage";
import HomePage from "./components/HomePage";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/quiz/:quizId" element={<QuizPage />} />
      <Route path="/home" element={<HomePage />} />
    </Routes>
  );
}

export default App;
