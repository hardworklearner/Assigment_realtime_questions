import { io } from "socket.io-client";

const socket = io("http://localhost:3000");

export const joinQuiz = (quizId) => socket.emit("joinQuiz", quizId);
export const sendAnswer = (data) => socket.emit("submitAnswer", data);
export const onQuizUpdate = (callback) => socket.on("quizUpdates", callback);
