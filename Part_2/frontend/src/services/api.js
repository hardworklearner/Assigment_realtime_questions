import axios from "axios";

// Create an axios instance with the base URL
const api = axios.create({
  baseURL: "http://localhost:3000/api",
});

// Interceptor to automatically add the token to headers if available
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Authentication functions
export const signup = (data) => api.post("/auth/signup", data);
export const login = (credentials) => api.post("/auth/login", credentials);

// Fetch all quizzes with participation status
export const getQuizzes = () => api.get("/quizzes");

// Fetch leaderboard data for a specific quiz
export const getLeaderboard = (quizId) => api.get(`/leaderboard/${quizId}`);

// Join a specific quiz
export const joinQuiz = (quizId) =>
  api.post(`/quizzes/join/${quizId}`, {
    userId: localStorage.getItem("userId"), // Assume userId is stored in localStorage
  });

// Fetch questions for a specific quiz
export const getQuizQuestions = (quizId) =>
  api.get(`/quizzes/${quizId}/questions`);

// Submit answer for a quiz
export const submitAnswer = (quizId, questionId, answer) =>
  api.post(`/quizzes/${quizId}/questions/${questionId}/answer`, {
    userAnswer: answer,
  });

export const getQuiz = async (quizId) => {
  return await api.get(`/quizzes/${quizId}`);
};
