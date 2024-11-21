// src/components/QuizPage.js
import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getQuizQuestions, submitAnswer, getQuiz } from "../services/api";
import { io } from "socket.io-client";
import Leaderboard from "./Leaderboard";
import "../styles/QuizPage.css";

const socket = io("http://localhost:3000");

const QuizPage = () => {
  const { quizId } = useParams();
  const navigate = useNavigate();
  const [quizTitle, setQuizTitle] = useState("");
  const [questions, setQuestions] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState({});
  const [loading, setLoading] = useState(true);
  const [quizCompleted, setQuizCompleted] = useState(false);
  const [, setLeaderboard] = useState([]);

  useEffect(() => {
    const initializeQuiz = async () => {
      try {
        const [questionsResponse, quizResponse] = await Promise.all([
          getQuizQuestions(quizId),
          getQuiz(quizId),
        ]);

        setQuestions(questionsResponse.data);
        setQuizTitle(quizResponse.data.title);
      } catch (error) {
        console.error("Error initializing quiz:", error);
      } finally {
        setLoading(false);
      }
    };

    const setupSocket = () => {
      if (!quizId) return;

      // Join WebSocket room
      socket.emit("joinQuiz", quizId);

      // Listen for real-time leaderboard updates
      const handleLeaderboardUpdate = (updatedLeaderboard) => {
        setLeaderboard(updatedLeaderboard);
      };

      socket.on("leaderboardUpdate", handleLeaderboardUpdate);

      // Cleanup on unmount
      return () => {
        socket.off("leaderboardUpdate", handleLeaderboardUpdate);
        socket.emit("leaveQuiz", quizId);
      };
    };

    if (quizId) {
      initializeQuiz();
      return setupSocket();
    }
  }, [quizId]);

  const handleAnswerChange = (questionId, selectedAnswer) => {
    setAnswers((prevAnswers) => ({
      ...prevAnswers,
      [questionId]: selectedAnswer,
    }));
  };

  const handleNext = async () => {
    const currentQuestion = questions[currentQuestionIndex];
    const selectedAnswer = answers[currentQuestion.id];

    if (!selectedAnswer) {
      alert("Please select an answer before proceeding.");
      return;
    }

    try {
      const questionId = currentQuestion.id;
      const userId = localStorage.getItem("userId");
      // Emit the answer submission event
      socket.emit("submitAnswer", {
        quizId,
        questionId,
        selectedAnswer,
        userId: userId, // Example: Replace with actual userId
      });
      console.log(`Answer processed for user ${userId} in quiz ${quizId}`);

      await submitAnswer(quizId, questionId, selectedAnswer);

      if (currentQuestionIndex < questions.length - 1) {
        setCurrentQuestionIndex((prevIndex) => prevIndex + 1);
      } else {
        handleSubmitQuiz();
      }
    } catch (error) {
      console.error("Error submitting answer:", error);
    }
  };

  const handleSubmitQuiz = () => {
    alert("Quiz submitted successfully! Thank you for participating.");
    setQuizCompleted(true);
  };

  if (loading) return <div>Loading...</div>;

  if (quizCompleted) {
    return (
      <div className="quiz-page">
        <h1>Quiz Completed!</h1>
        <p>Thank you for participating in the quiz.</p>
        <button onClick={() => navigate("/home")} id="back-to-home-button">
          Back to Homepage
        </button>
        <div className="leaderboard-section">
          <h2>Real-Time Leaderboard</h2>
          <Leaderboard quizId={parseInt(quizId)} quizTitle={quizTitle} />
        </div>
      </div>
    );
  }

  if (!questions.length)
    return <div>No questions available for this quiz.</div>;

  const currentQuestion = questions[currentQuestionIndex];

  return (
    <div className="quiz-page">
      <h1>
        Question {currentQuestionIndex + 1} of {questions.length}
      </h1>
      <h2 className="question-text">{currentQuestion.questionText}</h2>
      <div className="answer-options">
        {Object.entries(currentQuestion.answerList).map(([key, value]) => (
          <div key={key} className="answer-option">
            <label>
              <input
                type="radio"
                name={`question-${currentQuestion.id}`}
                value={key}
                checked={answers[currentQuestion.id] === key}
                onChange={() => handleAnswerChange(currentQuestion.id, key)}
              />
              {value}
            </label>
          </div>
        ))}
      </div>
      <div className="quiz-navigation">
        {currentQuestionIndex < questions.length - 1 && (
          <button onClick={handleNext}>Next</button>
        )}
        {currentQuestionIndex === questions.length - 1 && (
          <button onClick={handleNext}>Submit Quiz</button>
        )}
      </div>
      <div className="leaderboard-section">
        <h2>Real-Time Leaderboard</h2>
        <Leaderboard quizId={parseInt(quizId)} quizTitle={quizTitle} />
      </div>
    </div>
  );
};

export default QuizPage;
