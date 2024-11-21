// src/components/HomePage.js
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Leaderboard from "./Leaderboard";
import { getQuizzes, joinQuiz } from "../services/api";
import UserInfo from "./UserInfo";
import "../styles/HomePage.css";

const HomePage = () => {
  const [quizzes, setQuizzes] = useState([]);
  const [selectedQuizId, setSelectedQuizId] = useState(null);
  const [selectedQuizTitle, setSelectedQuizTitle] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch the list of available quizzes when the page loads
    const fetchQuizzes = async () => {
      try {
        const response = await getQuizzes();
        setQuizzes(response.data);
        if (response.data.length > 0) {
          setSelectedQuizId(response.data[0].id); // Default to first quiz
          setSelectedQuizTitle(response.data[0].title);
        }
      } catch (error) {
        console.error("Error fetching quizzes:", error);
      }
    };

    fetchQuizzes();
  }, []);

  const handleQuizSelect = (quizId) => {
    setSelectedQuizId(quizId);
    setSelectedQuizTitle(quizzes.find((quiz) => quiz.id === quizId).title);
  };

  const handleJoinQuiz = async (quizId) => {
    try {
      await joinQuiz(quizId);
      navigate(`/quiz/${quizId}`);
    } catch (error) {
      console.error("Error joining quiz:", error);
      alert(`Failed to join quiz ${quizId}`);
    }
  };

  return (
    <div className="home-page">
      <h1>Welcome to the Quiz Platform</h1>
      {/* Add the Logout button to the homepage */}
      <div className="user-info-container">
        <UserInfo /> {/* Display user info and logout button here */}
      </div>
      {/* Quiz Selection */}
      <div className="quiz-selection">
        <h2>Select a Quiz to display leaderboard</h2>
        <ul>
          {quizzes.map((quiz) => (
            <li key={quiz.id}>
              <button onClick={() => handleQuizSelect(quiz.id)}>
                {quiz.title}
              </button>
              <button onClick={() => handleJoinQuiz(quiz.id)}>
                Start Quiz
              </button>
            </li>
          ))}
        </ul>
      </div>

      {/* Leaderboard Section */}
      {selectedQuizId && (
        <div className="leaderboard-section">
          <h2>Real-Time Leaderboard</h2>
          <Leaderboard quizId={selectedQuizId} quizTitle={selectedQuizTitle} />
        </div>
      )}
    </div>
  );
};

export default HomePage;
